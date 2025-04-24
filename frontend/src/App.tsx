import React, { useState, useEffect } from 'react';
import { Joke } from '@shared/types';
import { JokeCard } from './components/joke_card/joke_card';
import { getJoke, saveJoke } from './services/joke_service';
import './pages/home/home.css';
import './index.css';
function App() {
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
      alert('¡Chiste guardado con éxito!');
    } catch (err) {
      alert('Error al guardar el chiste');
    }
  };
  useEffect(() => {
    fetchNewJoke();
  }, []);
  return (
    <div className="App">
      <h1>Generador de Chistes</h1>
      
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
    </div>
  );
}
export default App;