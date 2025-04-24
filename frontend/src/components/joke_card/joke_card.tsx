import React from 'react';
import { Joke } from '@shared/types';
import './joke_card.css';
import FavoriteButton from "../heartbutton/heart_button";
interface JokeCardProps {
  joke: Joke;
  onSave?: (joke: Joke) => void;
}
export const JokeCard: React.FC<JokeCardProps> = ({ joke, onSave }) => {
  const handleSave = () => {
    if (onSave) {
      onSave(joke);
    }
  };
  return (
    <div className="joke-card">
      <div className="favorite-button-container">
        <FavoriteButton onClick={handleSave} />
      </div>
      {joke.type === 'single' ? (
        <div className="joke-content">
          <p>{joke.joke}</p>
        </div>
      ) : (
        <div className="joke-content">
          <p className="setup">{joke.setup}</p>
          <p className="delivery">{joke.delivery}</p>
        </div>
      )}
    </div>
  );
};