import express from 'express';
import https from 'https';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/joke', (req, res) => {
  const search: string | undefined = req.query.contains as string | undefined; 
  let url: string = 'https://v2.jokeapi.dev/joke/Any?lang=es&safe-mode';

  const isValidSearch = (text: string): boolean => {
    const trimmed = text.trim();
    return trimmed.length >= 3 && /^[\w\sáéíóúÁÉÍÓÚñÑ.,!?-]+$/.test(trimmed);
  };

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
