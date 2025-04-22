"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/joke', (req, res) => {
    const search = req.query.contains;
    let url = 'https://v2.jokeapi.dev/joke/Any?lang=es&safe-mode';
    const isValidSearch = (text) => {
        const trimmed = text.trim();
        return trimmed.length >= 3 && /^[\w\sáéíóúÁÉÍÓÚñÑ.,!?-]+$/.test(trimmed);
    };
    if (search && isValidSearch(search)) {
        url += `&contains=${encodeURIComponent(search.trim())}`;
    }
    else if (search) {
        return res.status(400).json({ error: 'Parámetro "contains" inválido. Mínimo 3 caracteres alfanuméricos.' });
    }
    https_1.default.get(url, (apiRes) => {
        let data = '';
        apiRes.on('data', chunk => data += chunk);
        apiRes.on('end', () => {
            try {
                const dataJson = JSON.parse(data);
                res.json(dataJson);
            }
            catch (_a) {
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
