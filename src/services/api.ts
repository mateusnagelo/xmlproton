import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Api-Key': import.meta.env.VITE_MEUDANFE_API_TOKEN,
  },
});

export const startNfeSearch = async (chave: string) => {
  try {
    const response = await api.post(`/fd/add/${chave}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao iniciar a busca da NF-e:', error);
    throw error;
  }
};

export const checkNfeStatus = async (chave: string) => {
  try {
    // Corrigido para usar GET e um endpoint que provavelmente busca o status/resultado.
    const response = await api.get(`/fd/get/${chave}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao verificar o status da NF-e:', error);
    throw error;
  }
};

export const getNfeData = async (chave: string) => {
  const response = await api.get(`/fd/get/xml/${chave}`);
  return response.data;
};

export const getNfePdfData = async (chave: string) => {
  const response = await api.get(`/fd/get/da/${chave}`);
  return response.data;
};

export const validateXml = async (file: File): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (file.name.includes('invalid')) {
        resolve({ success: false, message: 'Erro: Estrutura do XML inválida.' });
      } else {
        resolve({ success: true, message: 'XML válido e assinado corretamente.' });
      }
    }, 1500);
  });
};

export const getTabelasIbptax = async (uf: string, dataVigencia: string): Promise<any[]> => {
  console.log('Buscando tabelas para:', { uf, dataVigencia });
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = [
        {
          uf: 'SP',
          nomeArquivo: 'IBPT_SP_23.2.A.csv',
          vigencia: '01/10/2023',
          urlDownload: '#',
        },
        {
          uf: 'RJ',
          nomeArquivo: 'IBPT_RJ_23.2.A.csv',
          vigencia: '01/10/2023',
          urlDownload: '#',
        },
        {
          uf: 'MG',
          nomeArquivo: 'IBPT_MG_23.2.A.csv',
          vigencia: '01/10/2023',
          urlDownload: '#',
        },
      ];

      const filteredData = mockData.filter(tabela => {
        let match = true;
        if (uf && tabela.uf !== uf) {
          match = false;
        }
        // A lógica de dataVigencia pode ser mais complexa
        return match;
      });

      resolve(filteredData);
    }, 1000);
  });
};

export const searchNfe = async (chave: string): Promise<any> => {
  console.log('Simulando busca para a chave:', chave);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (chave.startsWith('41')) { // Simula sucesso para chaves que começam com 41
        resolve({
          chave_acesso: chave,
          emissor: { nome: 'Empresa Fictícia LTDA' },
          data_emissao: new Date().toISOString(),
          valor_total: '1234.56'
        });
      } else { // Simula erro para outras chaves
        reject(new Error('Nota Fiscal não encontrada'));
      }
    }, 1500);
  });
};