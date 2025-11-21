import { useState } from 'react';
import { Search, Loader, AlertCircle, Eye, FileText, Code } from 'lucide-react';
import {
  startNfeSearch,
  checkNfeStatus,
  getNfeData,
  getNfePdfData, // Import the new function
} from '../services/api.ts';

const Download = () => {
  const [chave, setChave] = useState('');
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const addToHistory = (item) => {
    const history = JSON.parse(localStorage.getItem('nfeHistory')) || [];
    const updatedHistory = [item, ...history];
    localStorage.setItem('nfeHistory', JSON.stringify(updatedHistory));
  };

  const pollStatus = async (chave) => {
    setPolling(true);
    const intervalId = setInterval(async () => {
      try {
        const statusData = await checkNfeStatus(chave);
        setStatusMessage(`Status: ${statusData.statusMessage || statusData.status}`);
        if (statusData.status === 'OK') {
          clearInterval(intervalId);

          // Fetch XML and PDF data in parallel
          const [xmlData, pdfData] = await Promise.all([
            getNfeData(chave),
            getNfePdfData(chave),
          ]);

          const xmlText = xmlData && xmlData.data;
          const pdfBase64 = pdfData && pdfData.data;

          if (xmlText) {
            // Parse XML to extract additional data
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");

            const getTagValue = (tag) => xmlDoc.getElementsByTagName(tag)[0]?.textContent || '';

            const nfeData = {
              emitente: getTagValue('xNome'),
              destinatario: getTagValue('xNome'), // Note: This will get the first xNome, which is the issuer. We need to refine this.
              valor: `R$ ${parseFloat(getTagValue('vNF')).toFixed(2)}`,
              emissao: new Date(getTagValue('dhEmi')).toLocaleDateString(),
              numero: getTagValue('nNF'),
              cnpj: getTagValue('CNPJ'),
            };

            // Refined logic to get issuer and recipient names correctly
            const emitNode = xmlDoc.getElementsByTagName('emit')[0];
            const destNode = xmlDoc.getElementsByTagName('dest')[0];
            nfeData.emitente = emitNode ? emitNode.getElementsByTagName('xNome')[0]?.textContent : '';
            nfeData.destinatario = destNode ? destNode.getElementsByTagName('xNome')[0]?.textContent : '';

            const newResult = {
              danfeUrl: pdfBase64 ? `data:application/pdf;base64,${pdfBase64}` : null,
              xmlText: xmlText,
              pdfBase64: pdfBase64,
            };
            setResult(newResult);
            addToHistory({ 
              chave, 
              date: new Date(),
              ...newResult, // Save all result data to history
              ...nfeData, // Save extracted NFe data
            });
          } else {
            setError(`Erro: A API não retornou os dados do XML como esperado. Resposta: ${JSON.stringify(xmlData)}`);
          }

          setPolling(false);
          setLoading(false);
        } else if (statusData.status === 'NOT_FOUND' || statusData.status === 'ERROR') {
          clearInterval(intervalId);
          setPolling(false);
          setError(`Erro: ${statusData.statusMessage}`);
          setLoading(false);
        }
      } catch (err) {
        clearInterval(intervalId);
        setPolling(false);
        setError('Erro ao verificar o status da NF-e.');
        setLoading(false);
      }
    }, 2000); // Poll every 2 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setStatusMessage('');

    try {
      await startNfeSearch(chave);
      pollStatus(chave);
    } catch (err) {
      if (err.response && err.response.status === 402) {
        setError('Pagamento necessário: A chave de NFe pode ser muito antiga.');
      } else if (err.response && err.response.status === 400) {
        setError('Erro na requisição: Verifique se a chave de acesso é válida e possui 44 dígitos.');
      } else {
        setError('Erro ao iniciar a busca da NF-e.');
      }
      setLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    if (result && result.danfeUrl) {
      fetch(result.danfeUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${chave}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        });
    }
  };

  const handleDownloadXml = () => {
    if (result && result.xmlText) {
      const blob = new Blob([result.xmlText], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${chave}.xml`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <section className="text-center py-12 bg-[#161b22] rounded-lg">
        <h1 className="text-4xl font-bold text-white">Consultar e Baixar XML</h1>
        <p className="mt-4 text-lg text-gray-400">Informe a chave de acesso da NF-e.</p>
      </section>

      {/* Form */}
      <section className="max-w-2xl mx-auto bg-[#0d1117] p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="chave" className="block text-sm font-medium text-gray-300">Chave de Acesso da NF-e</label>
            <input type="text" id="chave" value={chave} onChange={(e) => setChave(e.target.value)} required maxLength="44" className="mt-1 block w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="44 dígitos da chave de acesso" />
          </div>
          <button type="submit" disabled={loading} className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-600">
            {loading || polling ? <Loader className="w-5 h-5 mr-2 animate-spin" /> : <Search className="w-5 h-5 mr-2" />}
            {loading || polling ? 'Consultando...' : 'Consultar'}
          </button>
        </form>
      </section>

      {/* Status and Result Section */}
      {(loading || polling || error || result) && (
        <section className="max-w-2xl mx-auto p-4 rounded-lg">
          {statusMessage && (
            <div className="p-4 bg-blue-900 text-blue-300 rounded-lg flex items-center">
              {statusMessage}
            </div>
          )}
          {error && (
            <div className="mt-4 p-4 bg-red-900 text-red-300 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-3" />
              {error}
            </div>
          )}
        </section>
      )}

      {result && (
        <section className="max-w-4xl mx-auto bg-[#0d1117] p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-white mb-6">Resultado da Consulta</h2>
          <div className="flex items-center space-x-4 p-4 bg-[#161b22] rounded-lg">
            <span className="inline-flex items-center px-4 py-1 rounded-full text-md font-bold bg-green-700 text-white">
              Ok
            </span>

            {result.danfeUrl && (
              <a href={result.danfeUrl} target="_blank" rel="noopener noreferrer" title="Visualizar DANFE" className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-transform transform hover:scale-110">
                <Eye className="w-6 h-6" />
              </a>
            )}

            {result.danfeUrl && (
              <button onClick={handleDownloadPdf} title="Baixar DANFE (PDF)" className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-transform transform hover:scale-110">
                <FileText className="w-6 h-6" />
              </button>
            )}

            <button onClick={handleDownloadXml} title="Baixar XML" className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-600 hover:bg-orange-700 text-white transition-transform transform hover:scale-110">
              <Code className="w-6 h-6" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Download;