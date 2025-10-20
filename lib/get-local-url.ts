export function getLocalUrl(url: string) {
    const localUrl = url.split('://')[1];
    return `${localUrl}`;
}