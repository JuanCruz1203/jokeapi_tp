import React, { useState, useEffect } from 'react';
import { Joke } from '@shared/types';
import { JokeCard } from './components/joke_card/joke_card';
import { getJoke, saveJoke, getFavJokes } from './services/joke_service';
import './pages/home/home.css';
import './index.css';
function App() {
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchNewJoke = async () => {
    try {
      setError(null);
      console.log('Fetching new joke...');
      const joke = await getJoke();
      console.log('Received joke:', joke);
      setCurrentJoke(joke);
    } catch (err) {
      console.error('Error fetching joke:', err);
      setError('Error al obtener el chiste');
    }
  };

  const fetchFavJokes = async () => {
    try {
      setError(null);
      console.log('Fetching favourite jokes...');
      const joke: Joke[] = await getFavJokes();
      console.log('Received jokes:', joke);
    } catch (err) {
      console.error('Error fetching joke:', err);
      setError('Error al obtener el chiste');
    }
  };

  const handleSaveJoke = async (joke: Joke) => {
    try {
      await saveJoke(joke);
    } catch (err) {
      alert('Error al guardar el chiste');
    }
  };

  useEffect(() => {
    fetchNewJoke();
  }, []);

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
        onClick={() => fetchFavJokes()}
      >
        Mostrar chistes favoritos
      </button>
    </div>
  );
}
export default App;