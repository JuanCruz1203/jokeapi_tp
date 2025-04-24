import express from 'express';
import https from 'https';
import cors from 'cors';
import {isValidSearch} from './utils/search_validator'
import { saveFavourite, deleteFavourite, getFavourites} from './utils/file_manager';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/joke', (req, res) => {
  const search: string | undefined = req.query.contains as string | undefined; 
  let url: string = 'https://v2.jokeapi.dev/joke/Any?lang=es&safe-mode';

  if (search && isValidSearch(search)) {
    url += `&contains=${encodeURIComponent(search.trim())}`;
  } else if (search) {
    return res.status(400).json({ error: 'Parámetro "contains" inválido. Mínimo 3 caracteres alfanuméricos.' });
  }

  https.get(url, (apiRes) => {
    let data: string = '';
    apiRes.on('data', chunk => data += chunk);
    apiRes.on('end', () => {
      try {
        const dataJson = JSON.parse(data);
        res.json(dataJson); 
      } catch {
        res.status(500).send('Error al parsear el chiste');
      }
    });
  }).on('error', () => {
    res.status(500).send('API error.');
  });
});

app.listen(3001, () => {
  console.log('Servidor backend corriendo en http://localhost:3001');
});

app.post('/joke/save', async(req, res) => {
  try {
    const savedJoke = await saveFavourite(req.body);
    res.json({ mensaje: 'Chiste guardado como favorito', joke: savedJoke });
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.get('/joke/favourites', async (req, res) => {
  try {
    const favourites = await getFavourites();
    res.json(favourites);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los favoritos' });
  }
});

app.delete('/joke/favourites/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await deleteFavourite(id);
    res.json({ mensaje: 'Chiste eliminado de favoritos' });
  } catch (error) {
    res.status(400).json({ error });
  }
});
