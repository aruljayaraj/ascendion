import { store } from '../../lib/memoryStore';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, code } = req.body;

    const user = store.get(username); 
    console.log("User from store:", user);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (!user.mfaCode) {
      return res.status(400).json({ error: 'MFA code not set' });
    }

    user.attempts = (user.attempts || 0) + 1;

    if (user.attempts > 3) {
      return res.status(403).json({ error: 'Account locked after 3 failed attempts' });
    }

    if (code === user.mfaCode) {
      // store.delete(username); // optional: clear after success
      return res.status(200).json({ success: true, token: 'mock-jwt-token' });
    } else {
      return res.status(401).json({ error: 'Invalid MFA code' });
    }
  } else {
    res.status(405).end();
  }
}

