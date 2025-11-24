import { useState } from 'react';
import { Search, Loader, AlertCircle, Eye, ArrowDown, Code, Zap, DownloadCloud, History } from 'lucide-react';
import {
  startNfeSearch,
  checkNfeStatus,
  getNfeData,
  getNfePdfData,
} from '../services/api.ts';

interface NFeData {
  emitente: string;
  destinatario: string;
  valor: string;
  emissao: string;
  numero: string;
  cnpj: string;
}

interface Result {
  danfeUrl: string | null;
  xmlText: string;
  pdfBase64: string;
}

const Download = () => {
  const [chave, setChave] = useState('');
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addToHistory = (item: any) => {
    let history = JSON.parse(localStorage.getItem('nfeHistory') || '[]');
    // Remove a nota antiga, se existir
    history = history.filter((h: any) => h.chave !== item.chave);
    const updatedHistory = [item, ...history];
    localStorage.setItem('nfeHistory', JSON.stringify(updatedHistory));
    window.dispatchEvent(new Event('storage')); // Notifica outras abas
  };

  const pollStatus = async (chave: string) => {
    setPolling(true);
    const intervalId = setInterval(async () => {
      try {
        const statusData = await checkNfeStatus(chave);
        setStatusMessage(`Status: ${statusData.statusMessage || statusData.status}`);
        if (statusData.status === 'OK') {
          clearInterval(intervalId);

          const [xmlData, pdfData] = await Promise.all([
            getNfeData(chave),
            getNfePdfData(chave),
          ]);

          const xmlText = xmlData && xmlData.data;
          const pdfBase64 = pdfData && pdfData.data;

          if (xmlText) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");

            const getTagValue = (tag: string) => xmlDoc.getElementsByTagName(tag)[0]?.textContent || '';

            const nfeData: NFeData = {
              emitente: '',
              destinatario: '',
              valor: `R$ ${parseFloat(getTagValue('vNF')).toFixed(2)}`,
              emissao: new Date(getTagValue('dhEmi')).toLocaleDateString(),
              numero: getTagValue('nNF'),
              cnpj: getTagValue('CNPJ'),
            };

            const emitNode = xmlDoc.getElementsByTagName('emit')[0];
            const destNode = xmlDoc.getElementsByTagName('dest')[0];
            nfeData.emitente = emitNode ? emitNode.getElementsByTagName('xNome')[0]?.textContent || '' : '';
            nfeData.destinatario = destNode ? destNode.getElementsByTagName('xNome')[0]?.textContent || '' : '';

            const newResult: Result = {
              danfeUrl: pdfBase64 ? `data:application/pdf;base64,${pdfBase64}` : null,
              xmlText: xmlText,
              pdfBase64: pdfBase64,
            };
            setResult(newResult);
            addToHistory({ 
              chave, 
              date: new Date(),
              ...newResult,
              ...nfeData,
            });
          } else {
            setError(`Erro: A API não retornou os dados do XML. Resposta: ${JSON.stringify(xmlData)}`);
          }

          setPolling(false);
          setLoading(false);
        } else if (statusData.status === 'NOT_FOUND' || statusData.status === 'ERROR') {
          clearInterval(intervalId);
          setPolling(false);
          setError(`Erro: ${statusData.statusMessage}`);
          setLoading(false);
        }
      } catch (err: any) {
        clearInterval(intervalId);
        setPolling(false);
        setError('Erro ao verificar o status da NF-e.');
        setLoading(false);
      }
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setStatusMessage('');

    try {
      await startNfeSearch(chave);
      pollStatus(chave);
    } catch (err: any) {
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

  const handleDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    if (result && result.danfeUrl) {
      fetch(result.danfeUrl)
        .then((res) => res.blob())
        .then((blob) => handleDownload(blob, `${chave}.pdf`));
    }
  };

  const handleDownloadXml = () => {
    if (result && result.xmlText) {
      const blob = new Blob([result.xmlText], { type: 'application/xml' });
      handleDownload(blob, `${chave}.xml`);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Consulta de NF-e</h1>
        <p className="text-gray-500">Insira a chave de acesso de 44 dígitos para começar.</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input 
              type="text" 
              id="chave" 
              value={chave} 
              onChange={(e) => setChave(e.target.value)} 
              required 
              maxLength={44} 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
              placeholder="Digite a chave de acesso da NF-e"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading || polling} 
            className="w-full flex justify-center items-center px-6 py-3 font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading || polling ? <Loader className="w-5 h-5 mr-2 animate-spin" /> : <Search className="w-5 h-5 mr-2" />}
            {loading || polling ? 'Consultando...' : 'Consultar'}
          </button>
        </form>

        {(loading || polling || error || result) && (
          <div className="mt-8">
            {statusMessage && !result && !error && (
              <div className="p-4 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center">
                <Loader className="w-5 h-5 mr-3 animate-spin" />
                <span>{statusMessage}</span>
              </div>
            )}
            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {result && (
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Download Disponível</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {result.danfeUrl && (
                    <a href={result.danfeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-transform transform hover:scale-105">
                      <Eye className="w-5 h-5" />
                      <span>DANFE</span>
                    </a>
                  )}
                  <button onClick={handleDownloadPdf} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-transform transform hover:scale-105">
                    <ArrowDown className="w-5 h-5" />
                    <span>PDF</span>
                  </button>
                  <button onClick={handleDownloadXml} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-medium transition-transform transform hover:scale-105">
                    <Code className="w-5 h-5" />
                    <span>XML</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Funcionalidades</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
            <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Consulta Rápida</h3>
            <p className="text-gray-500 mt-2">Obtenha os dados da sua NF-e em segundos.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
            <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
              <DownloadCloud className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Download de XML e DANFE</h3>
            <p className="text-gray-500 mt-2">Baixe o XML original e o DANFE em PDF com um clique.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
            <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
              <History className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Histórico Integrado</h3>
            <p className="text-gray-500 mt-2">Acesse suas consultas anteriores no Painel de Controle.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;