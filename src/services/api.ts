import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Api-Key': import.meta.env.VITE_MEUDANFE_API_TOKEN,
  },
});

export const startNfeSearch = async (chave) => {
  try {
    const response = await api.put(`/fd/add/${chave}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao iniciar a busca da NF-e:', error);
    throw error;
  }
};

export const checkNfeStatus = async (chave) => {
  try {
    const response = await api.put(`/fd/add/${chave}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao verificar o status da NF-e:', error);
    throw error;
  }
};

export const getNfeData = async (chave) => {
  const response = await api.get(`/fd/get/xml/${chave}`);
  return response.data;
};

export const getNfePdfData = async (chave) => {
  const response = await api.get(`/fd/get/da/${chave}`);
  return response.data;
};