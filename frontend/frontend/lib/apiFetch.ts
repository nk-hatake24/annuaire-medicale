import { FetchOptions } from "./utils";


  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  
  export async function apiFetch<T>(
    endpoint: string,
    { method = 'GET', headers = {}, body = null, isSSR = false }: FetchOptions = {}
  ): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
  
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body,
    };
  
    try {
      const response = isSSR
        ? await fetch(url, { ...fetchOptions, cache: 'no-store' })  // Pour SSR, désactiver le cache
        : await fetch(url, fetchOptions);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Une erreur est survenue lors de la requête.');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de l’appel API :', error);
      throw error;
    }
  }
  