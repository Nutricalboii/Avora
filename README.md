# Avora Launch MVP

Welcome to the Avora Minimalist Launch MVP. This repository contains the highly-optimized, single-page Next.js application designed to capture leads directly into Google Sheets, alongside a fully architected enterprise dashboard sitting securely in the background.

## 🚀 Quick Start

Ensure you have Node.js 18+ installed.

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

This project utilizes the **Next.js App Router** architecture.

- `src/app/page.tsx` - The main entry point for the public-facing landing page MVP.
- `src/components/` - Reusable UI components (Navbar, Hero, Services, Contact, etc.).
- `src/actions/` - Secure Server Actions for the backend dashboard operations.
- `prisma/` - Database schema (MongoDB).
- `ai-processor/` - A separate Python FastAPI microservice scaffolding for future AI workloads.

## 🔗 Configuration & Secure Lead Capture

The Contact Form (`src/components/Contact.tsx`) passes submissions securely through the `/api/contact` server route. The destination Google Apps Script URL and authentication configurations are loaded dynamically via environment variables on the host.

Copy `.env.example` to `.env` and configure:

```bash
# Database
DATABASE_URL="your-mongodb-connection-string"

# NextAuth credentials (used by the dashboard)
ADMIN_EMAIL="admin@avora.io"
ADMIN_PASSWORD="your-strong-password"
NEXTAUTH_SECRET="your-32-character-secret"

# Webhook URLs (hidden from the client bundle)
GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/.../exec"
```

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript
- **Database**: MongoDB & Prisma (for Dashboard routes)
- **Validation**: Zod (Client & Server-side verification)

## 🌐 Deployment

The fastest way to deploy this application is via [Vercel](https://vercel.com).
1. Set up the environment variables in your Vercel project settings dashboard.
2. Push this repository to GitHub to trigger the automatic build.

