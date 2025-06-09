export function generateSecureWord(username: string) {
  return Buffer.from(username + Date.now()).toString('base64').slice(0, 8);
}