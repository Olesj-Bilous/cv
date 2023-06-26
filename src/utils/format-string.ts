

export const toKebabCase = (text: string) => text.replaceAll(/[^a-zA-Z\s]+/g, '').replaceAll(/\s+/g, '-').toLowerCase();
