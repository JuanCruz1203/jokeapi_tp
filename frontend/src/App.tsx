import React, { useState, useEffect } from 'react';
import { Joke } from '@shared/types';
import { JokeCard } from './components/joke_card/joke_card';
import { getJoke, saveJoke, getFavJokes } from './services/joke_service';
import './pages/home/home.css';
import './index.css';
import { FavouritesPage } from './pages/favourites/FavouritesPage';

function App() {
  const [view, setView] = useState<'home' | 'favourites'>('home'); // <-- ACÁ VA
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchNewJoke = async () => {
    try {
      setError(null);
      const joke = await getJoke();
      setCurrentJoke(joke);
    } catch (err) {
      setError('Error al obtener el chiste');
    }
  };

  const handleSaveJoke = async (joke: Joke) => {
    try {
      await saveJoke(joke);
    } catch {
      alert('Error al guardar el chiste');
    }
  };

  useEffect(() => {
    fetchNewJoke();
  }, []);

  if (view === 'favourites') {
    return <FavouritesPage goBack={() => setView('home')} />;
  }

  return (
    <div className="App">
      <h1>GENERADOR DE CHISTES</h1>
      
      {error && <div className="error">{error}</div>}
      
      {currentJoke && (
        <JokeCard 
          joke={currentJoke} 
          onSave={handleSaveJoke}
        />
      )}
      <button 
        className="new-joke-button"
        onClick={() => fetchNewJoke()}
      >
        Obtener nuevo chiste
      </button>
      <button 
        className="new-joke-button"
        onClick={() => setView('favourites')}
      >
        Mostrar chistes favoritos
      </button>
    </div>
  );
}

export default App
