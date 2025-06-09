import { NextApiRequest, NextApiResponse } from 'next';
import { generateSecureWord } from '../../lib/auth';
import { store } from '../../lib/memoryStore';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'No username' });

  const now = Date.now();
  const entry = store.get(username);
  if (entry && now - entry.issuedAt < 10000)
    return res.status(429).json({ error: 'Rate limit' });

  const secureWord = generateSecureWord(username);
  store.set(username, { secureWord, issuedAt: now, attempts: 0 });
  res.status(200).json({ secureWord });
}