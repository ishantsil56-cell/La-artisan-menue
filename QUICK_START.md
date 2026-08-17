# 🍽️ La Artisan Bistro - Quick Start Guide

Your complete restaurant ordering system is ready to deploy!

## What You Got

✅ **Customer Menu App** - Browse & order with live cart
✅ **Admin Dashboard** - Confirm/decline orders in real-time
✅ **API Backend** - Order management system
✅ **Responsive Design** - Works on mobile & desktop
✅ **Ready for Vercel** - Deploy in 5 minutes

## Project Structure

```
la-artisan-menu/
├── src/
│   ├── pages/
│   │   ├── api/menu.ts              # Menu items
│   │   ├── api/orders.ts            # Order management
│   │   ├── api/orders/[id].ts       # Update status
│   │   ├── index.tsx                # Customer menu (HOME PAGE)
│   │   ├── admin.tsx                # Admin dashboard
│   │   └── _app.tsx                 # App setup
│   ├── data/menu.ts                 # Menu items & prices
│   └── styles/                      # CSS styling
├── README.md                         # Full documentation
├── DEPLOYMENT.md                     # Vercel deployment guide
├── QUICK_START.md                    # This file
├── package.json                      # Dependencies
└── tsconfig.json                     # TypeScript config
```

## Local Testing (Before Deployment)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```

### 3. Test Both Interfaces
- **Customer Menu**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin

### 4. Test Flow
1. Add items to cart
2. Enter name & place order
3. Go to admin dashboard
4. Confirm or decline order
5. See status update on customer page

## Deploy to Vercel (5 Minutes)

### Quick Method:

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "La Artisan Bistro"
git remote add origin https://github.com/YOUR_USERNAME/la-artisan-menu.git
git push -u origin main
```

2. **Deploy**
   - Go to https://vercel.com/new
   - Import from GitHub
   - Select `la-artisan-menu` repo
   - Click Deploy
   - Wait for completion (2-3 min)

3. **You get a live URL!** 🎉
   - Customer: `https://your-project.vercel.app`
   - Admin: `https://your-project.vercel.app/admin`

### Detailed Guide:
See `DEPLOYMENT.md` for step-by-step with screenshots

## Menu Items Included

All items from your restaurant image:

- **Small Plates**: Croquettes, Nachos, Tacos, Fish & Chips, Soups
- **Burgers**: Veg Mexican, Chipotle Chicken, Fried Chicken, Pulled Pork
- **Pizza**: 5 varieties (Margherita, White Pizza, Italian Summer, etc.)
- **Pasta**: 3 Penne varieties
- **Desserts**: Cheesecake, Tiramisu, Brownie, Churros, etc.
- **Beverages**: 11 coffee & cold brew options

**All prices in ₹** (Indian Rupees)

## How to Use

### For Customers 👤
1. Go to home page
2. Browse menu by category
3. Click items to add to cart
4. Adjust quantities
5. Enter name
6. Click "Place Order"
7. Wait for confirmation (admin will confirm/decline)

### For Restaurant Staff 👨‍💼
1. Go to `/admin`
2. See pending orders
3. Click ✅ to confirm order
4. Click ❌ to decline (shows "not available" to customer)
5. Dashboard auto-updates every second

## Customization

### Change Prices
Edit `src/data/menu.ts`:
```typescript
{ id: 'b1', name: 'Veg Mexican', category: 'Burgers', price: 320 }, // Change 320
```

### Change Colors/Styling
- Customer theme: `src/styles/menu.module.css`
- Admin theme: `src/styles/admin.module.css`

### Change Menu Items
Add/remove items in `src/data/menu.ts` and they automatically appear on the menu

### Change Currency
Replace ₹ with $ or € throughout (use find & replace)

## Key Features

✨ **Real-Time Updates**
- Admin dashboard auto-refreshes every 1 second
- Customer sees order status changes instantly
- No manual refresh needed

✨ **One-Click Ordering**
- Simple click to add to cart
- Easy quantity adjustment
- Clear total calculation

✨ **Order Management**
- Pending order queue
- One-click confirm/decline
- Order history tracking

✨ **Mobile Responsive**
- Works perfectly on phones
- Touch-friendly buttons
- Full menu browsing on mobile

## Important Notes

⚠️ **In-Memory Storage**
- Orders are stored in memory
- They reset when server restarts (acceptable for testing)
- For production: Add database (Vercel Postgres recommended)

✅ **Free Forever**
- No cost to host on Vercel
- No credit card needed
- Unlimited deployments

## Troubleshooting

### Q: Orders disappeared after page refresh?
A: This is expected! In-memory storage. For persistence, add database.

### Q: Admin dashboard not updating?
A: Check you're on `/admin` page. Dashboard auto-refreshes every 1 sec.

### Q: Styles look weird on mobile?
A: Clear cache (Ctrl+Shift+Delete) and refresh

### Q: Can't deploy to Vercel?
A: Check you've pushed to GitHub first. See DEPLOYMENT.md for details.

## Next Steps

### Phase 1: Launch (What you have now)
- ✅ Customer ordering
- ✅ Admin confirmation
- ✅ Live URL on Vercel

### Phase 2: Enhance (Optional)
- Add payment processing (Razorpay)
- Add database (Vercel Postgres)
- Add email notifications
- Add order history

### Phase 3: Scale (Future)
- Multi-location support
- Kitchen display system (KDS)
- Detailed analytics
- Customer accounts

## Support Resources

- **Full Docs**: README.md
- **Deployment Steps**: DEPLOYMENT.md
- **API Reference**: See comments in `src/pages/api/`
- **Next.js Docs**: https://nextjs.org/docs

## Video Demo Flow

1. Open menu page → Add items → Place order
2. Open admin page → See pending order
3. Click confirm → See status update on menu
4. Refresh menu → Shows "Order Confirmed"

## Credits

- Built with Next.js & TypeScript
- Hosted on Vercel
- Styled with CSS Modules
- Data from your La Artisan Bistro menu

---

## Ready to Launch? 🚀

1. **Test locally**: `npm run dev`
2. **Push to GitHub**: Follow deployment guide
3. **Deploy to Vercel**: Click one button
4. **Share your URL**: Send to customers & staff

**Questions?** Check README.md or DEPLOYMENT.md

**Let's go!** ⭐
