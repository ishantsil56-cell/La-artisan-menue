  name: string;
  category: string;
  price: number;
}

export interface Order {
  id: string;
  items: { menuItemId: string; name: string; quantity: number; price: number }[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'declined';
  createdAt: string;
  customerName?: string;
}

export const menuItems: MenuItem[] = [
  // SMALL PLATES
  { id: 'sp1', name: 'Cheese Croquettes', category: 'Small Plates', price: 180 },
  { id: 'sp2', name: 'Loaded Nachos', category: 'Small Plates', price: 220 },
  { id: 'sp3', name: 'Chicken Tacos', category: 'Small Plates', price: 240 },
  { id: 'sp4', name: 'Fish & Chips', category: 'Small Plates', price: 280 },
  { id: 'sp5', name: 'Mushroom Soup', category: 'Small Plates', price: 120 },
  { id: 'sp6', name: 'Tomato Basil Soup', category: 'Small Plates', price: 120 },

  // BURGERS
  { id: 'b1', name: 'Veg Mexican', category: 'Burgers', price: 320 },
  { id: 'b2', name: 'Chipotle Chicken', category: 'Burgers', price: 350 },
  { id: 'b3', name: 'Fried Chicken', category: 'Burgers', price: 340 },
  { id: 'b4', name: 'Pulled Pork', category: 'Burgers', price: 360 },

  // PIZZA
  { id: 'p1', name: 'Argentine Margherita', category: 'Pizza', price: 420 },
  { id: 'p2', name: 'Funghi di Artigiano', category: 'Pizza', price: 450 },
  { id: 'p3', name: 'White Pizza', category: 'Pizza', price: 440 },
  { id: 'p4', name: 'Italian Summer', category: 'Pizza', price: 460 },
  { id: 'p5', name: 'Paprika Flare', category: 'Pizza', price: 480 },

  // PASTA
  { id: 'pa1', name: 'Penne in Roasted Tomato Sauce', category: 'Pasta', price: 380 },
  { id: 'pa2', name: 'Penne in Pink Sauce', category: 'Pasta', price: 390 },
  { id: 'pa3', name: 'Penne in White Sauce', category: 'Pasta', price: 400 },

  // DESSERTS
  { id: 'd1', name: 'Biscoff Cheesecake', category: 'Desserts', price: 220 },
  { id: 'd2', name: 'Pistachio Tres Leches', category: 'Desserts', price: 240 },
  { id: 'd3', name: 'Mille Feuille', category: 'Desserts', price: 200 },
  { id: 'd4', name: 'Tiramisu', category: 'Desserts', price: 210 },
  { id: 'd5', name: 'Churros', category: 'Desserts', price: 180 },
  { id: 'd6', name: 'Sizzling Brownie', category: 'Desserts', price: 230 },

  // COFFEE & COLD BREW
  { id: 'c1', name: 'Espresso', category: 'Coffee & Cold Brew', price: 80 },
  { id: 'c2', name: 'Americano', category: 'Coffee & Cold Brew', price: 100 },
  { id: 'c3', name: 'Cappuccino', category: 'Coffee & Cold Brew', price: 120 },
  { id: 'c4', name: 'Latte', category: 'Coffee & Cold Brew', price: 120 },
  { id: 'c5', name: 'Flat White', category: 'Coffee & Cold Brew', price: 130 },
  { id: 'c6', name: 'Mocha', category: 'Coffee & Cold Brew', price: 140 },
  { id: 'c7', name: 'Iced Americano', category: 'Coffee & Cold Brew', price: 110 },
  { id: 'c8', name: 'Cold Brew', category: 'Coffee & Cold Brew', price: 120 },
  { id: 'c9', name: 'Café Frappe', category: 'Coffee & Cold Brew', price: 130 },
  { id: 'c10', name: 'Mocha Frappe', category: 'Coffee & Cold Brew', price: 150 },
  { id: 'c11', name: 'Iced Latte', category: 'Coffee & Cold Brew', price: 130 },
];

// In-memory orders storage
let orders: Order[] = [];
let orderIdCounter = 1;

export const orderStore = {
  getAll: () => orders,
  getById: (id: string) => orders.find(o => o.id === id),
  create: (items: Order['items'], customerName?: string): Order => {
    const id = `ORD-${orderIdCounter++}`;
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newOrder: Order = {
      id,
      items,
      totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
      customerName
    };
    orders.push(newOrder);
    return newOrder;
  },
  updateStatus: (id: string, status: Order['status']) => {
    const order = orders.find(o => o.id === id);
    if (order) {
      order.status = status;
    }
    return order;
  }
};
