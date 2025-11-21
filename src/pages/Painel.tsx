import { useState, useEffect } from 'react';
import { History, Trash2, Eye, FileText, Code } from 'lucide-react';

const Painel = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('nfeHistory')) || [];
    setHistory(savedHistory.sort((a, b) => new Date(b.date) - new Date(a.date))); // Sort by most recent
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem('nfeHistory');
    setHistory([]);
  };

  const handleDownloadXml = (xmlText, chave) => {
    const blob = new Blob([xmlText], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chave}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = (pdfBase64, chave) => {
    const byteCharacters = atob(pdfBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chave}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <section className="text-center py-12 bg-[#161b22] rounded-lg">
        <h1 className="text-4xl font-bold text-white">Painel de Controle</h1>
        <p className="mt-4 text-lg text-gray-400">Seu histórico de consultas de NF-e.</p>
      </section>

      {/* History Section */}
      <section className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Histórico de Consultas</h2>
          {history.length > 0 && (
            <button onClick={handleClearHistory} className="flex items-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-800 transition-transform transform hover:scale-105">
              <Trash2 className="w-5 h-5 mr-2" />
              Limpar Histórico
            </button>
          )}
        </div>

        {history.length > 0 ? (
          <div className="bg-[#0d1117] rounded-lg shadow-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-[#161b22]">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Chave de Acesso</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Emitente</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Destinatário</th>
                  </tr>
                </thead>
                <tbody className="bg-[#0d1117] divide-y divide-gray-700">
                  {history.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-sm font-semibold rounded-full bg-green-600 text-green-100">
                          Ok
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          {item.danfeUrl && (
                            <a href={item.danfeUrl} target="_blank" rel="noopener noreferrer" title="Visualizar DANFE" className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-transform transform hover:scale-110">
                              <Eye className="w-5 h-5" />
                            </a>
                          )}
                          {item.pdfBase64 && (
                            <button onClick={() => handleDownloadPdf(item.pdfBase64, item.chave)} title="Baixar PDF" className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-transform transform hover:scale-110">
                              <FileText className="w-5 h-5" />
                            </button>
                          )}
                          {item.xmlText && (
                            <button onClick={() => handleDownloadXml(item.xmlText, item.chave)} title="Baixar XML" className="p-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-transform transform hover:scale-110">
                              <Code className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-300">{item.chave}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.emitente}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.destinatario}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-20 bg-[#0d1117] rounded-lg border border-gray-700">
            <History className="w-16 h-16 mx-auto text-gray-600" />
            <p className="mt-6 text-xl">Nenhuma consulta no histórico.</p>
            <p className="mt-2 text-gray-400">As chaves que você consultar aparecerão aqui.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Painel;