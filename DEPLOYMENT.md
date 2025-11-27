# Deployment Guide

## 🚀 Deploy to Vercel (Recommended - 5 minutes)

### Option 1: One-Click Deploy

1. Click the button below:
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

2. Import your GitHub repository
3. Click "Deploy"
4. Done! Your app is live

### Option 2: CLI Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? engnovate
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

Your app will be live at: `https://engnovate.vercel.app`

## 🌐 Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy
netlify deploy --prod

# Follow prompts:
# - Publish directory: .next
```

## 📦 Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "next build && next export && gh-pages -d out"

# Deploy
npm run deploy
```

## 🐳 Deploy with Docker

```dockerfile
# Create Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Build image
docker build -t engnovate .

# Run container
docker run -p 3000:3000 engnovate
```

## ⚙️ Environment Variables

For production, set these in your deployment platform:

### Optional (for enhanced features):
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
GEMINI_API_KEY=your-gemini-key
```

**Note**: App works without these using localStorage and mock AI!

## 🔍 Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify login/register works
- [ ] Test CRUD operations in admin panel
- [ ] Check mobile responsiveness
- [ ] Test AI scoring features
- [ ] Verify pricing page displays correctly

## 🌟 Custom Domain (Vercel)

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your custom domain
5. Update DNS records as instructed

## 📊 Analytics (Optional)

Add to `app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## 🚨 Troubleshooting

### Build fails
```bash
# Clear cache
rm -rf .next
npm run build
```

### Environment variables not working
- Ensure they start with `NEXT_PUBLIC_` for client-side
- Restart dev server after adding variables
- Check Vercel/Netlify dashboard for correct values

### 404 errors
- Check `next.config.js` for correct output settings
- Verify all routes are properly defined

---

**Your app is ready to deploy!** 🎉
