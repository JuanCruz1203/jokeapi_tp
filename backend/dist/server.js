"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const cors_1 = __importDefault(require("cors"));
const search_validator_1 = require("./utils/search_validator");
const file_manager_1 = require("./utils/file_manager");
const file_manager_2 = require("./utils/file_manager");
const file_manager_3 = require("./utils/file_manager");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/joke', (req, res) => {
    const search = req.query.contains;
    let url = 'https://v2.jokeapi.dev/joke/Any?lang=es&safe-mode';
    if (search && (0, search_validator_1.isValidSearch)(search)) {
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
app.post('/joke/save', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedJoke = yield (0, file_manager_1.saveFavourite)(req.body);
        res.json({ mensaje: 'Chiste guardado como favorito', joke: savedJoke });
    }
    catch (error) {
        res.status(400).json({ error });
    }
}));
app.get('/joke/favourites', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favourites = yield (0, file_manager_2.getFavourites)();
        res.json(favourites);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los favoritos' });
    }
}));
app.delete('/joke/favourites/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, file_manager_3.deleteFavourite)(id);
        res.json({ mensaje: 'Chiste eliminado de favoritos' });
    }
    catch (error) {
        res.status(400).json({ error });
    }
}));
