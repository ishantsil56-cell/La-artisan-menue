import type { NextApiRequest, NextApiResponse } from 'next';
import { orderStore, Order } from '@/data/menu';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Order[] | Order | { error: string }>
) {
  if (req.method === 'GET') {
    const orders = orderStore.getAll();
    res.status(200).json(orders);
  } else if (req.method === 'POST') {
    const { items, customerName } = req.body;
    
    if (!items || items.length === 0) {
      res.status(400).json({ error: 'No items in order' });
      return;
    }

    const newOrder = orderStore.create(items, customerName);
    res.status(201).json(newOrder);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
