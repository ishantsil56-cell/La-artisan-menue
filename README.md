# La Artisan Bistro - Restaurant Menu & Order Management System

A full-stack web application for managing restaurant orders with separate customer and admin interfaces.

## Features

### 🍽️ Customer Menu App
- Browse menu items organized by category
- Click items to add to cart with quantity control
- Real-time cart management
- Place orders with customer name
- Live order status tracking (Pending → Confirmed/Declined)
- Responsive mobile-friendly design

### 👨‍💼 Admin Dashboard
- View all pending orders in real-time
- Confirm or decline orders
- Track order history
- Order statistics and metrics
- Auto-refreshing order list

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **CSS Modules** - Styled components
- **Vercel** - Hosting & deployment

## Project Structure

```
la-artisan-menu/
├── src/
│   ├── pages/
│   │   ├── api/
│   │   │   ├── menu.ts           # Menu items API
│   │   │   ├── orders.ts         # Orders management API
│   │   │   └── orders/[id].ts    # Update order status
│   │   ├── index.tsx             # Customer menu page
│   │   ├── admin.tsx             # Admin dashboard
│   │   └── _app.tsx              # App wrapper
│   ├── data/
│   │   └── menu.ts               # Menu data & types
│   └── styles/
│       ├── menu.module.css       # Customer menu styles
│       └── admin.module.css      # Admin dashboard styles
├── next.config.js
├── tsconfig.json
├── package.json
└── .gitignore
```

## Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Access the App
- **Customer Menu**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin

## Deployment to Vercel

### Option 1: Deploy via CLI (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy from project directory**
```bash
vercel
```

3. **Follow prompts:**
   - Link to existing Vercel project or create new
   - Confirm project settings
   - Wait for deployment to complete

### Option 2: Deploy via GitHub (GitHub Sync)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/la-artisan-menu.git
git branch -M main
git push -u origin main
```

2. **Connect to Vercel**
   - Go to https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Your live URL will be generated automatically**

## Environment Variables

No environment variables needed for basic setup. All data is stored in-memory (persists during session).

**Future enhancement**: Add database support (Vercel Postgres, MongoDB, etc.) for persistent data.

## How to Use

### For Customers

1. Go to home page (http://yoursite.com)
2. Browse menu items by category
3. Click any item to add to cart
4. Adjust quantities with +/- buttons
5. Enter your name
6. Click "Place Order"
7. Wait for admin confirmation or decline notification

### For Restaurant Staff

1. Go to admin dashboard (http://yoursite.com/admin)
2. View pending orders with item details
3. Click "✅ Confirm" to accept order
4. Click "❌ Decline" if item not available
5. Confirmed orders move to "Completed Orders" section
6. Dashboard auto-refreshes every second

## API Endpoints

### GET `/api/menu`
Returns all menu items

### GET `/api/orders`
Returns all orders

### POST `/api/orders`
Create new order
```json
{
  "items": [
    { "menuItemId": "b1", "name": "Veg Mexican", "quantity": 2, "price": 320 }
  ],
  "customerName": "John"
}
```

### PATCH `/api/orders/[id]`
Update order status
```json
{
  "status": "confirmed" | "declined"
}
```

## Customization

### Change Menu Items
Edit `src/data/menu.ts`:
```typescript
export const menuItems: MenuItem[] = [
  { id: 'b1', name: 'Veg Mexican', category: 'Burgers', price: 320 },
  // Add more items...
];
```

### Change Styling
Modify CSS variables in:
- `src/styles/menu.module.css` - Customer menu theme
- `src/styles/admin.module.css` - Admin dashboard theme

### Change Currency
Search for "₹" in the codebase and replace with your currency symbol.

## Pricing (Food Items)

All prices are in Indian Rupees (₹):

**Small Plates**: ₹120-280
**Burgers**: ₹320-360
**Pizza**: ₹420-480
**Pasta**: ₹380-400
**Desserts**: ₹180-240
**Beverages**: ₹80-150

## Production Notes

⚠️ **Important**: Current implementation stores orders in-memory, which means:
- Orders are lost when server restarts
- No persistent data storage
- Single-server deployment only

**For production**, consider upgrading to:
- Vercel Postgres (native support)
- MongoDB Atlas
- Supabase
- Firebase Realtime Database

## Troubleshooting

### Orders not persisting
- This is expected! Orders are stored in-memory. Refresh or restart to see them reset.

### Admin dashboard not updating
- Ensure you're on the correct URL (`/admin`)
- Dashboard auto-refreshes every 1 second

### CSS not loading
- Clear browser cache
- Check that CSS modules are imported correctly

## Performance Tips

- Menu loads in < 1s
- API responses < 100ms
- Real-time order updates every 1-2 seconds
- Fully responsive mobile design

## Future Enhancements

- [ ] Persistent database integration
- [ ] Payment gateway (Razorpay, Stripe)
- [ ] Email/SMS order notifications
- [ ] Order history & customer profiles
- [ ] Menu photos/descriptions
- [ ] Kitchen display system (KDS)
- [ ] Multi-location support
- [ ] Analytics dashboard

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review deployment logs on Vercel dashboard
3. Check browser console for errors

## License

Open source - Use freely for your restaurant or business.

---

**Deployed on Vercel** ✨
Live URL: `https://your-project.vercel.app`
