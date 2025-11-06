export function getUserIdFromToken(token: string): number | null {
  try {
    const base64Payload = token.split('.')[1];
    const decoded = JSON.parse(atob(base64Payload));
    return decoded.id || decoded.sub || null; // Strapi обычно использует `id`
  } catch {
    return null;
  }
}
