# Deployment Guide - La Artisan Bistro to Vercel

This guide walks you through deploying your restaurant ordering system to Vercel (live URL).

## Prerequisites

- GitHub account (free)
- Vercel account (free)
- Git installed on your computer

## Step-by-Step Deployment

### Step 1: Push Code to GitHub

1. **Initialize Git repository**
```bash
cd la-artisan-menu
git init
git add .
git commit -m "Initial commit - La Artisan Bistro Menu System"
```

2. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Create a new public repository named `la-artisan-menu`
   - Don't initialize with README (we already have one)

3. **Connect local repo to GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/la-artisan-menu.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using GitHub Integration (Easiest)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New" → "Project"

2. **Import from GitHub**
   - Select "Continue with GitHub"
   - Search for "la-artisan-menu" repository
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Project Name: `la-artisan-menu`
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

4. **Click "Deploy"**
   - Wait 2-3 minutes for deployment to complete
   - You'll see a success message with your live URL

#### Option B: Using Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
cd la-artisan-menu
vercel
```

4. **Follow the prompts:**
   - Link to existing project? → `No` (first time)
   - Project name? → `la-artisan-menu`
   - Which directory? → `./`
   - Want to modify settings? → `No`

5. **Your live URL will be displayed**

## Your Live URLs

Once deployed, you'll get URLs like:

- **Customer Menu**: `https://la-artisan-menu.vercel.app`
- **Admin Dashboard**: `https://la-artisan-menu.vercel.app/admin`

Share these with your team!

## Verification Checklist

After deployment, verify everything works:

- [ ] Customer menu loads at `/`
- [ ] All menu items display correctly
- [ ] Can add items to cart
- [ ] Can place an order
- [ ] Admin dashboard loads at `/admin`
- [ ] Pending orders appear in admin
- [ ] Can confirm orders from admin
- [ ] Can decline orders from admin
- [ ] Customer sees status updates

## Continuous Deployment

Once connected to GitHub:

1. Make changes locally
2. Commit and push to GitHub
```bash
git add .
git commit -m "Description of changes"
git push origin main
```

3. **Vercel automatically deploys** within 30 seconds!
4. Check deployment status at: https://vercel.com/dashboard/la-artisan-menu

## Environment & Settings

**No environment variables needed** for basic functionality.

If you add payment integration or database later:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add your keys there
3. Redeploy

## Troubleshooting Deployment

### Build Fails
- Check build logs on Vercel Dashboard
- Ensure all dependencies in `package.json`
- Verify `tsconfig.json` and `next.config.js` are correct

### Orders Not Showing
- This is normal! Orders are in-memory
- They reset when the server restarts
- For persistent storage, upgrade database

### Styles Look Wrong
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Check Vercel build logs for CSS errors

### Git Push Fails
- Ensure you've run `git remote add origin` correctly
- Check your GitHub repository name matches

## Performance & Monitoring

After deployment, monitor:

1. **Vercel Analytics**
   - Dashboard → Settings → Analytics
   - Check response times and error rates

2. **Speed Insights**
   - Dashboard → Monitoring → Speed Insights
   - Should load in < 1 second

3. **Function Logs**
   - Dashboard → Functions
   - Monitor API endpoint performance

## Cost

**All FREE!** 🎉

- Vercel: Free tier includes unlimited deployments
- GitHub: Free public repositories
- No credit card required for hobby/learning use

## Scaling for Production

If your restaurant gets busy:

1. **Add Database**
   - Vercel Postgres (built-in)
   - Or MongoDB Atlas
   - Update `src/data/menu.ts` to use database

2. **Add Payment Processing**
   - Razorpay (Indian restaurants)
   - Stripe
   - PayPal

3. **Enable Authentication**
   - NextAuth.js
   - Protect admin dashboard

4. **Analytics**
   - Vercel Analytics
   - Custom dashboards

## Support & Next Steps

### Need Help?
- Check deployment logs: Dashboard → Deployments
- Review README.md in project
- Check Next.js documentation: https://nextjs.org/docs

### Want to Add Features?
1. Make changes locally
2. Test with `npm run dev`
3. Push to GitHub
4. Vercel deploys automatically

### Production Checklist
- [ ] Database connected
- [ ] Payment processing added
- [ ] Admin password protected
- [ ] Email notifications set up
- [ ] Domain connected (optional)
- [ ] SSL certificate (automatic with Vercel)
- [ ] Analytics enabled

## Database Migration (Optional)

To add persistent storage instead of in-memory:

1. **Get Vercel Postgres Connection String**
   - Dashboard → Storage → Create → Postgres
   - Copy connection string

2. **Update src/data/menu.ts**
```typescript
// Replace orderStore with database queries
import { sql } from '@vercel/postgres';

export const orderStore = {
  getAll: async () => {
    const result = await sql`SELECT * FROM orders`;
    return result.rows;
  },
  // ... etc
};
```

3. **Push changes**
```bash
git add .
git commit -m "Add Vercel Postgres"
git push origin main
```

That's it! Your restaurant ordering system is now live! 🚀

---

**Live URL**: Your Vercel dashboard will show your unique deployment URL
**Auto-deploy**: Changes to GitHub automatically deploy to Vercel
**Monitoring**: Vercel provides built-in performance analytics
