import React, { useState, useEffect } from 'react';
import { MenuItem, Order } from '@/data/menu';
import styles from '@/styles/menu.module.css';

export default function Menu() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<{ menuItemId: string; name: string; quantity: number; price: number }[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMenu();
    // Poll for order status updates
    const interval = setInterval(() => {
      if (selectedOrder) {
        checkOrderStatus(selectedOrder.id);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [selectedOrder]);

  const fetchMenu = async () => {
    try {
      const res = await fetch('/api/menu');
      const data = await res.json();
      setMenu(data);
    } catch (err) {
      setError('Failed to load menu');
    }
  };

  const checkOrderStatus = async (orderId: string) => {
    try {
      const res = await fetch('/api/orders');
      const orders: Order[] = await res.json();
      const order = orders.find(o => o.id === orderId);
      if (order) {
        setSelectedOrder(order);
      }
    } catch (err) {
      console.error('Failed to check order status');
    }
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.menuItemId === item.id);
      if (existing) {
        return prev.map(c =>
          c.menuItemId === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { menuItemId: item.id, name: item.name, quantity: 1, price: item.price }];
    });
  };

  const removeFromCart = (menuItemId: string) => {
    setCart(prev => {
      const existing = prev.find(c => c.menuItemId === menuItemId);
      if (existing && existing.quantity > 1) {
        return prev.map(c =>
          c.menuItemId === menuItemId ? { ...c, quantity: c.quantity - 1 } : c
        );
      }
      return prev.filter(c => c.menuItemId !== menuItemId);
    });
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      setError('Cart is empty');
      return;
    }
    if (!customerName.trim()) {
      setError('Please enter your name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, customerName }),
      });

      if (res.ok) {
        const order = await res.json();
        setSelectedOrder(order);
        setCart([]);
        setCustomerName('');
      } else {
        setError('Failed to place order');
      }
    } catch (err) {
      setError('Error placing order');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Small Plates', 'Burgers', 'Pizza', 'Pasta', 'Desserts', 'Coffee & Cold Brew'];

  if (selectedOrder) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>LA ARTISAN BISTRO</h1>
          <p>Rooftop • Artisan Cuisine • New Town</p>
        </header>

        <div className={styles.orderStatus}>
          <div className={styles.statusCard}>
            <h2>Order #{selectedOrder.id}</h2>
            <p className={styles.customerName}>Customer: {selectedOrder.customerName}</p>
            
            <div className={styles.statusBadge} data-status={selectedOrder.status}>
              {selectedOrder.status === 'pending' && '⏳ Order Pending'}
              {selectedOrder.status === 'confirmed' && '✅ Order Confirmed'}
              {selectedOrder.status === 'declined' && '❌ Not Available At The Moment'}
            </div>

            <div className={styles.orderDetails}>
              <h3>Order Items:</h3>
              <ul>
                {selectedOrder.items.map((item) => (
                  <li key={item.menuItemId}>
                    {item.name} x{item.quantity} - ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p className={styles.total}>Total: ₹{selectedOrder.totalPrice}</p>
            </div>

            <button
              className={styles.newOrderBtn}
              onClick={() => setSelectedOrder(null)}
            >
              Place New Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>LA ARTISAN BISTRO</h1>
        <p>Rooftop • Artisan Cuisine • New Town</p>
      </header>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.mainContent}>
        <div className={styles.menuSection}>
          <div className={styles.menuGrid}>
            {categories.map((category) => (
              <div key={category} className={styles.categorySection}>
                <h2 className={styles.categoryTitle}>{category.toUpperCase()}</h2>
                <div className={styles.itemsGrid}>
                  {menu
                    .filter(item => item.category === category)
                    .map((item) => (
                      <button
                        key={item.id}
                        className={styles.menuItem}
                        onClick={() => addToCart(item)}
                        title="Click to add to cart"
                      >
                        <span className={styles.itemName}>{item.name}</span>
                        <span className={styles.itemPrice}>₹{item.price}</span>
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className={styles.cartSection}>
          <div className={styles.cart}>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p className={styles.emptyCart}>No items in cart</p>
            ) : (
              <>
                <div className={styles.cartItems}>
                  {cart.map((item) => (
                    <div key={item.menuItemId} className={styles.cartItem}>
                      <div className={styles.cartItemInfo}>
                        <span className={styles.cartItemName}>{item.name}</span>
                        <span className={styles.cartItemPrice}>₹{item.price}</span>
                      </div>
                      <div className={styles.quantityControl}>
                        <button onClick={() => removeFromCart(item.menuItemId)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => addToCart({ id: item.menuItemId, name: item.name, category: '', price: item.price })}>+</button>
                      </div>
                      <span className={styles.subtotal}>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.cartTotal}>
                  <strong>Total: ₹{calculateTotal()}</strong>
                </div>

                <div className={styles.customerInput}>
                  <label htmlFor="name">Your Name:</label>
                  <input
                    id="name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>

                <button
                  className={styles.orderBtn}
                  onClick={placeOrder}
                  disabled={loading}
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
