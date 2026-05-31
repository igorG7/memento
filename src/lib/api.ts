export const API_BASE_URL =
  process.env.NEXT_PUBLIC_MEMENTO_API_URL ?? 'https://memento-api-pcpg.onrender.com';

export function apiUrl(path: string) {
  return new URL(path, API_BASE_URL).toString();
}
