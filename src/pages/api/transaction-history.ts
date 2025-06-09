import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json([
    {
      date: '2025-06-07',
      referenceId: 'TXN123456',
      to: 'John Doe',
      transactionType: 'Credit',
      amount: 100.5,
    },
    {
      date: '2025-06-06',
      referenceId: 'TXN123457',
      to: 'Jane Smith',
      transactionType: 'Debit',
      amount: 50,
    },
    {
      date: '2025-06-05',
      referenceId: 'TXN123458',
      to: 'Acme Corp',
      transactionType: 'Credit',
      amount: 200,
    },
  ]);
}