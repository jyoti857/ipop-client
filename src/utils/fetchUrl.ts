export const uri = 'http://localhost:3003';

export const customFetch = async(uri: any, options: any) => {
  const response = await fetch(uri, options)
  return await response.json();
}