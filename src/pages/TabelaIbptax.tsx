import { useState } from 'react';
import { getTabelasIbptax } from '../services/api';

interface TabelaData {
  uf: string;
  nomeArquivo: string;
  vigencia: string;
  urlDownload: string;
}

const TabelaIbptax = () => {
  const [uf, setUf] = useState('');
  const [dataVigencia, setDataVigencia] = useState('');
  const [tabelas, setTabelas] = useState<TabelaData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConsultar = async () => {
    setLoading(true);
    setError(null);
    setTabelas([]);

    try {
      const resultados = await getTabelasIbptax(uf, dataVigencia);
      setTabelas(resultados);
    } catch (err) {
      setError('Erro ao consultar as tabelas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tabela IBPTax</h1>
        <p className="text-gray-500">Consulte e baixe as tabelas de impostos do IBPT.</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label htmlFor="uf" className="block text-sm font-medium text-gray-700 mb-2">UF</label>
            <select
              id="uf"
              value={uf}
              onChange={(e) => setUf(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas</option>
              <option value="SP">São Paulo</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="MG">Minas Gerais</option>
            </select>
          </div>
          <div>
            <label htmlFor="dataVigencia" className="block text-sm font-medium text-gray-700 mb-2">Data de Vigência</label>
            <input
              type="date"
              id="dataVigencia"
              value={dataVigencia}
              onChange={(e) => setDataVigencia(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleConsultar}
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Consultando...' : 'Consultar'}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {loading && <p className="text-center">Carregando...</p>}

        {!loading && !error && tabelas.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UF</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome do Arquivo</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vigência</th>
                  <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tabelas.map((tabela, index) => (
                  <tr key={index}>
                    <td className="py-4 px-6 whitespace-nowrap">{tabela.uf}</td>
                    <td className="py-4 px-6 whitespace-nowrap">{tabela.nomeArquivo}</td>
                    <td className="py-4 px-6 whitespace-nowrap">{tabela.vigencia}</td>
                    <td className="py-4 px-6 text-center">
                      <a
                        href={tabela.urlDownload}
                        download
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && tabelas.length === 0 && (
          <p className="text-center text-gray-500">Nenhuma tabela encontrada para os filtros selecionados.</p>
        )}
      </div>
    </div>
  );
};

export default TabelaIbptax;