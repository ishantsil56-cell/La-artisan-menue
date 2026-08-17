import type { NextApiRequest, NextApiResponse } from 'next';
import { orderStore, Order } from '@/data/menu';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Order | { error: string }>
) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    res.status(400).json({ error: 'Invalid order ID' });
    return;
  }

  if (req.method === 'PATCH') {
    const { status } = req.body;

    if (!['confirmed', 'declined', 'pending'].includes(status)) {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }

    const updatedOrder = orderStore.updateStatus(id, status);
    
    if (!updatedOrder) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    res.status(200).json(updatedOrder);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
