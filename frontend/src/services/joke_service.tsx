import { Joke } from '@shared/types';
const API_URL = 'http://localhost:3001';

export const getJoke = async (searchTerm?: string): Promise<Joke> => {
  const url = searchTerm 
    ? `${API_URL}/joke?contains=${encodeURIComponent(searchTerm)}`
    : `${API_URL}/joke`;
    
  console.log('Requesting joke from:', url);
  const response = await fetch(url);
  console.log('Response status:', response.status);
  if (!response.ok) {
    if (response.status === 500) {
      throw new Error('Error interno del servidor. Por favor, intente nuevamente más tarde.');
    }
    throw new Error(`Error al obtener el chiste: ${response.status} ${response.statusText}`);
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

export const getFavJokes = async (): Promise<Joke[]> => {
  const url: string= `${API_URL}/joke/favourites`
  console.log('Requesting favourite jokes from:', url);
  const response = await fetch(url);
  console.log('Response status:', response.status);

  if (!response.ok) {
    if (response.status === 500) {
      throw new Error('Error interno del servidor. Por favor, intente nuevamente más tarde.');
    }
    throw new Error(`Error al obtener los chistes: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export const deleteFavJoke = async (id: string): Promise<void> => {
  const url = `${API_URL}/joke/favourites/${id}`;
  console.log('Deleting favourite joke from:', url);
  const response = await fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el chiste favorito');
  }
};
