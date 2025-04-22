"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const app = (0, express_1.default)();
app.get('/joke', (req, res) => {
    const url = 'https://v2.jokeapi.dev/joke/Any?lang=es&safe-mode';
    https_1.default.get(url, (apiRes) => {
        let data = '';
        apiRes.on('data', chunk => data += chunk);
        apiRes.on('end', () => {
            try {
                const json = JSON.parse(data);
                res.json(json);
            }
            catch (_a) {
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
