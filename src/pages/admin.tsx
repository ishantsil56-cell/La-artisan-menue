import React, { useState, useEffect } from 'react';
import { Order } from '@/data/menu';
import styles from '@/styles/admin.module.css';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      setError('Failed to load orders');
    }
  };

  const updateOrderStatus = async (orderId: string, status: 'confirmed' | 'declined') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        await fetchOrders();
      } else {
        setError('Failed to update order');
      }
    } catch (err) {
      setError('Error updating order');
    } finally {
      setLoading(false);
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const completedOrders = orders.filter(o => o.status !== 'pending');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>LA ARTISAN BISTRO - Admin Dashboard</h1>
        <p>Manage Orders & Confirmations</p>
      </header>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Total Orders:</span>
          <span className={styles.statValue}>{orders.length}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Pending:</span>
          <span className={styles.statValue} style={{ color: '#ff9800' }}>{pendingOrders.length}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Completed:</span>
          <span className={styles.statValue} style={{ color: '#4caf50' }}>{completedOrders.length}</span>
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>⏳ Pending Orders ({pendingOrders.length})</h2>
          {pendingOrders.length === 0 ? (
            <p className={styles.noOrders}>No pending orders</p>
          ) : (
            <div className={styles.ordersList}>
              {pendingOrders.map((order) => (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <h3>{order.id}</h3>
                    <span className={styles.timestamp}>
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                  </div>

                  <p className={styles.customerName}>
                    <strong>Customer:</strong> {order.customerName || 'Unknown'}
                  </p>

                  <div className={styles.items}>
                    <strong>Items:</strong>
                    <ul>
                      {order.items.map((item) => (
                        <li key={item.menuItemId}>
                          {item.name} <span>x{item.quantity}</span> - <span className={styles.price}>₹{item.price * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.orderFooter}>
                    <div className={styles.total}>
                      <strong>Total: ₹{order.totalPrice}</strong>
                    </div>
                    <div className={styles.actions}>
                      <button
                        className={`${styles.btn} ${styles.confirmBtn}`}
                        onClick={() => updateOrderStatus(order.id, 'confirmed')}
                        disabled={loading}
                      >
                        ✅ Confirm
                      </button>
                      <button
                        className={`${styles.btn} ${styles.declineBtn}`}
                        onClick={() => updateOrderStatus(order.id, 'declined')}
                        disabled={loading}
                      >
                        ❌ Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className={styles.section}>
          <h2>✅ Completed Orders ({completedOrders.length})</h2>
          {completedOrders.length === 0 ? (
            <p className={styles.noOrders}>No completed orders</p>
          ) : (
            <div className={styles.ordersList}>
              {completedOrders.map((order) => (
                <div key={order.id} className={`${styles.orderCard} ${styles[order.status]}`}>
                  <div className={styles.orderHeader}>
                    <h3>{order.id}</h3>
                    <span className={`${styles.statusBadge} ${styles[order.status]}`}>
                      {order.status === 'confirmed' ? '✅ Confirmed' : '❌ Declined'}
                    </span>
                  </div>

                  <p className={styles.customerName}>
                    <strong>Customer:</strong> {order.customerName || 'Unknown'}
                  </p>

                  <div className={styles.items}>
                    <strong>Items:</strong>
                    <ul>
                      {order.items.map((item) => (
                        <li key={item.menuItemId}>
                          {item.name} <span>x{item.quantity}</span> - <span className={styles.price}>₹{item.price * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.total}>
                    <strong>Total: ₹{order.totalPrice}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
