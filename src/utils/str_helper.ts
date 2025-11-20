export function ucFirst(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function lcFirst(str: string): string {
    if (!str) return str;
    return str.charAt(0).toLowerCase() + str.slice(1);
}

export function ucWords(str: string): string {
    if (!str) return str;
    return str
        .split(/\s+/)
        .map((w) => ucFirst(w.toLowerCase()))
        .join(' ');
}

export function slugify(str: string): string {
    return (str || '')
        .toString()
        .normalize('NFKD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export default { ucFirst, lcFirst, ucWords, slugify };
