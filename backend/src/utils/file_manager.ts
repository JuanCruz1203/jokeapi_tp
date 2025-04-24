import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Joke } from '../types';

const FAVORITES_PATH = path.join(__dirname, '../../data', 'favourite_jokes.json');

export function saveFavourite(joke: Joke): Promise<Joke> {
  return new Promise((resolve, reject) => {
    fs.readFile(FAVORITES_PATH, 'utf-8', (err, data) => {
      if (err && err.code !== 'ENOENT') return reject('Error leyendo favoritos');

      let favourites: Joke[] = [];
      if (data) {
        try {
          favourites = JSON.parse(data);
        } catch {
          return reject('Error al parsear favoritos');
        }
      }

      if (joke.type === 'single' && !joke.joke){
        return reject('Falta el chiste');
      } 
      else if (joke.type === 'twopart' && (!joke.setup || !joke.delivery)){
        return reject('Faltan partes del chiste');
      } 

      joke.id = uuidv4();
      favourites.push(joke);

      fs.writeFile(FAVORITES_PATH, JSON.stringify(favourites, null, 2), err => {
        if (err){
            return reject('Error escribiendo archivo');
        }else{
            resolve(joke);
        }
      });
    });
  });
}
