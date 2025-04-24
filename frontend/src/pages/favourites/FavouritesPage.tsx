import React, { useEffect, useState } from 'react';
import { Joke } from '@shared/types';
import { getFavJokes, deleteFavJoke } from '../../services/joke_service';
import './favourites.css';

interface FavouritesPageProps {
    goBack: () => void; 
}

export const FavouritesPage: React.FC<FavouritesPageProps> = ({ goBack }) => {
  const [favourites, setFavourites] = useState<Joke[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchFavourites = async () => {
    try {
      setError(null);
      const jokes = await getFavJokes();
      setFavourites(jokes);
    } catch (err) {
      setError('No se pudieron obtener los chistes favoritos.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFavJoke(id);
      setFavourites(prev => prev.filter(j => j.id !== id));
    } catch {
      alert('Error al eliminar el chiste');
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  return (
    <div className="favourites-page">
      <h2>Chistes Favoritos</h2>
      {error && <div className="error">{error}</div>}
      {favourites.map(joke => (
        <div key={joke.id} className="joke-card">
          <p>{joke.type === 'single' ? joke.joke : `${joke.setup} - ${joke.delivery}`}</p>
          <button className="delete-button" onClick={() => handleDelete(joke.id!)}>
            Eliminar
          </button>
        </div>
      ))}
      <button onClick={goBack}>Volver</button>
    </div>
  );
};
