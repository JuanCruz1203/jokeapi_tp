import express from 'express';
import https from 'https';

const app = express();

app.get('/joke', (req, res) => {
  const url = 'https://v2.jokeapi.dev/joke/Any?lang=es&safe-mode';

  https.get(url, (apiRes) => {
    let data = '';
    apiRes.on('data', chunk => data += chunk);
    apiRes.on('end', () => {
      try {
        const json = JSON.parse(data);
        res.json(json); 
      } catch {
        res.status(500).send('Error al parsear el chiste');
      }
    });
  }).on('error', () => {
    res.status(500).send('Error al contactar la API');
  });
});

app.listen(3001, () => {
  console.log('Servidor backend corriendo en http://localhost:3001');
});
