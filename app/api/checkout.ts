import { NextApiRequest, NextApiResponse } from 'next';
import { Connection, PublicKey } from '@solana/web3.js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { transactionSignature } = req.query;

  if (!transactionSignature) {
    return res.status(400).json({ error: 'Missing transaction signature' });
  }

  const connection = new Connection('https://api.devnet.solana.com');
  const tx = await connection.getConfirmedTransaction(transactionSignature as string);

  if (tx) {
    return res.status(200).json({ message: 'Payment Confirmed', tx });
  } else {
    return res.status(404).json({ message: 'Transaction not found' });
  }
}
