# EngNovate - AI-Powered IELTS Mock Test Platform

🚀 **Live Demo**: [Coming Soon]

A complete, production-ready IELTS preparation platform with AI-powered scoring, built with Next.js 15, TypeScript, and modern web technologies.

## ✨ Features

### For Students
- 📖 **Reading Tests** - Interactive comprehension exercises
- ✍️ **Writing Tests** - AI-powered essay scoring with detailed feedback
- 🎤 **Speaking Tests** - Audio recording with pronunciation analysis
- 🎧 **Listening Tests** - Coming soon
- 📊 **Progress Tracking** - Monitor your improvement over time
- 🎯 **Instant AI Feedback** - Get band scores and suggestions immediately

### For Admins
- 👥 **User Management** - Full CRUD operations
- 📝 **Test Management** - Create, edit, and organize tests
- 📤 **Bulk Import** - Upload tests via DOCX, CSV, or ZIP
- 📈 **Analytics Dashboard** - Track platform usage and performance

### Pricing
- 💰 **Free Tier** - 3 tests per day
- ⭐ **Pro Plan** - Unlimited tests with advanced AI
- 👑 **Premium Plan** - Personal coaching and custom features

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **State**: Zustand + React Query
- **AI**: Google Gemini API (optional)
- **Storage**: localStorage (MVP) / Supabase (production)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/engnovate.git
cd engnovate

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo Credentials

**User Account:**
- Email: Any email (e.g., `demo@test.com`)
- Password: Any password

**Admin Panel:**
- URL: `/admin/login`
- Username: `admin`
- Password: `admin123`

## 📁 Project Structure

```
engnovate/
├── app/
│   ├── (auth)/              # Authentication pages
│   ├── (dashboard)/         # User dashboard
│   ├── admin/               # Admin panel with CRUD
│   ├── pricing/             # Pricing page
│   └── page.tsx             # Landing page
├── components/
│   ├── layout/              # Navbar, Footer
│   ├── test/                # Test components
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── gemini.ts            # AI client (optional)
│   └── supabase/            # Database clients (optional)
└── public/                  # Static assets
```

## 🎯 Key Pages

- `/` - Landing page
- `/pricing` - Pricing tiers
- `/login` - User login
- `/register` - User registration
- `/dashboard` - User dashboard
- `/tests` - Available tests
- `/tests/[id]` - Test interface
- `/admin` - Admin dashboard
- `/admin/users` - User management (CRUD)
- `/admin/tests` - Test management (CRUD)
- `/admin/import` - Bulk import

## 🔧 Configuration

### Environment Variables (Optional)

Create `.env.local` for production features:

```env
# Supabase (optional - for production database)
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Gemini AI (optional - for real AI scoring)
GEMINI_API_KEY=your-gemini-api-key
```

**Note**: The app works perfectly without these! It uses localStorage and mock AI by default.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/engnovate)

Or manually:

```bash
# Build the project
npm run build

# Deploy to Vercel
npx vercel
```

### Deploy to Netlify

```bash
npm run build
npx netlify deploy --prod
```

## 📊 Features Overview

### CRUD Operations
- ✅ Create, Read, Update, Delete users
- ✅ Create, Read, Update, Delete tests
- ✅ Search and filter functionality
- ✅ Bulk import capabilities

### AI Scoring (Simulated by default)
- ✅ Writing: Band scores + detailed feedback
- ✅ Speaking: Pronunciation + fluency analysis
- ✅ Instant results
- ✅ Upgrade to real AI with Gemini API

### Authentication
- ✅ Email/password login
- ✅ Session management
- ✅ Protected routes
- ✅ Admin role separation

## 🧪 Testing

```bash
# Run tests (coming soon)
npm test

# Build for production
npm run build

# Check for errors
npm run lint
```

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For issues and questions:
- Open an issue on GitHub
- Email: support@engnovate.com (demo)

## 🎓 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- AI powered by [Google Gemini](https://ai.google.dev/)

---

**Made with ❤️ for IELTS learners worldwide**

⭐ Star this repo if you find it helpful!
