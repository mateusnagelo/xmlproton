import { Handler } from '@netlify/functions';
import axios from 'axios';

const handler: Handler = async (event) => {
  const { path, httpMethod, headers, body } = event;
  const externalApiUrl = 'https://api.meudanfe.com.br/v2';
  const apiPath = path.replace('/.netlify/functions/proxy', '');

  try {
    const response = await axios({
      method: httpMethod as any,
      url: `${externalApiUrl}${apiPath}`,
      headers: {
        'Api-Key': process.env.VITE_MEUDANFE_API_TOKEN || '',
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
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export { handler };