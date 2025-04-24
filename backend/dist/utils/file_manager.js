"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFavourite = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const FAVORITES_PATH = path_1.default.join(__dirname, '../../data', 'favourite_jopkes.json');
function saveFavourite(joke) {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(FAVORITES_PATH, 'utf-8', (err, data) => {
            if (err && err.code !== 'ENOENT')
                return reject('Error leyendo favoritos');
            let favourites = [];
            if (data) {
                try {
                    favourites = JSON.parse(data);
                }
                catch (_a) {
                    return reject('Error al parsear favoritos');
                }
            }
            if (joke.type === 'single' && !joke.joke) {
                return reject('Falta el chiste');
            }
            else if (joke.type === 'twopart' && (!joke.setup || !joke.delivery)) {
                return reject('Faltan partes del chiste');
            }
            joke.id = (0, uuid_1.v4)();
            favourites.push(joke);
            fs_1.default.writeFile(FAVORITES_PATH, JSON.stringify(favourites, null, 2), err => {
                if (err) {
                    return reject('Error escribiendo archivo');
                }
                else {
                    resolve(joke);
                }
            });
        });
    });
}
exports.saveFavourite = saveFavourite;
