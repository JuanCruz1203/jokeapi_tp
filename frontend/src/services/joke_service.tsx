import { Joke } from '@shared/types';
const API_URL = 'http://localhost:3001';
export const getJoke = async (searchTerm?: string): Promise<Joke> => {
  const url = searchTerm 
    ? `${API_URL}/joke?contains=${encodeURIComponent(searchTerm)}`
    : `${API_URL}/joke`;
    
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error al obtener el chiste');
  }
  return response.json();
};
export const saveJoke = async (joke: Joke): Promise<Joke> => {
  const response = await fetch(`${API_URL}/joke/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(joke),
  });
  
  if (!response.ok) {
    throw new Error('Error al guardar el chiste');
  }
  return response.json();
};