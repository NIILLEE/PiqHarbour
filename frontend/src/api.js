/* Shariff Muhammad 23611732 */

export const SERVER_URL = 'http://localhost:3000';
export const API_URL = `${SERVER_URL}/api`;

export function imageSrc(path){

  if (!path){
    return '';
  }
  
  return path.startsWith('http') ? path : `${SERVER_URL}${path}`;
}

export async function sendJson(path, method, body){

  try {
    const response = await fetch(`${API_URL}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    return data.success ? null : data.message;
  } catch {
    return 'Something went wrong. Please try again.';
  }

}