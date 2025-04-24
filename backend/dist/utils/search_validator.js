"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidSearch = void 0;
function isValidSearch(text) {
    const trimmed = text.trim();
    return trimmed.length >= 3 && /^[\w\sáéíóúÁÉÍÓÚñÑ.,!?-]+$/.test(trimmed);
}
exports.isValidSearch = isValidSearch;
;
