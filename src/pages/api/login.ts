/*import { store } from '../../lib/memoryStore';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, secureWord, hashedPassword } = req.body; 
  console.log("Received:", { username, secureWord, hashedPassword });
  if (!username || !secureWord) {
    return res.status(400).json({ error: 'Missing username or secure word' });
  }

  const record = store.get(username);
  console.log("Record in memory:", record);
  if (!record || record.secureWord !== secureWord || Date.now() - record.issuedAt > 60000)
    return res.status(401).json({ error: 'Invalid secure word' });

  record.mfaCode = '123456';
  res.status(200).json({ token: 'fake-jwt' });
}*/
import { store } from '../../lib/memoryStore';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, secureWord, hashedPassword } = req.body;
  console.log("Received username:", username);
  console.log("Current store state:");
  for (const [key, value] of store.entries()) {
    console.log(key, value);
  }

  if (!username) {
    return res.status(400).json({ error: 'Missing username' });
  }

  const record = store.get(username);
  console.log("Record in memory:", record);

  if (!record || record.secureWord !== secureWord || Date.now() - record.issuedAt > 60000)
    return res.status(401).json({ error: 'Invalid secure word' });

  record.mfaCode = '123456';
  res.status(200).json({ token: 'fake-jwt' });
}