import { Handler, HandlerEvent } from '@netlify/functions';
import axios, { Method } from 'axios';

const handler: Handler = async (event: HandlerEvent) => {
  const { path, httpMethod, headers, body } = event;
  const externalApiUrl = 'https://api.meudanfe.com.br/v2';
  const apiPath = path.replace('/.netlify/functions/proxy', '');

  // Garante que o token da API seja lido corretamente das variáveis de ambiente
  const apiKey = process.env.MEUDANFE_API_TOKEN;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'API token is not configured.' }),
    };
  }

  try {
    const response = await axios({
      method: httpMethod as Method,
      url: `${externalApiUrl}${apiPath}`,
      headers: {
        'Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
      data: body ? JSON.parse(body) : undefined,
    });

    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error: any) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ message: error.response?.data?.message || error.message }),
    };
  }
};

export { handler };