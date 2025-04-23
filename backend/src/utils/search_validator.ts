export function isValidSearch(text: string): boolean{
    const trimmed = text.trim();
    return trimmed.length >= 3 && /^[\w\sáéíóúÁÉÍÓÚñÑ.,!?-]+$/.test(trimmed);
};