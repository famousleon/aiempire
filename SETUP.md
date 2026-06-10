# AI Empire — Setup Guide

## Quick Start

Your AI Empire website is ready to deploy. The marketplace feature requires two services: **Supabase** (free) and **Stripe** (free to set up).

---

## 1. Supabase Setup (User Auth + Database)

1. Go to [supabase.com](https://supabase.com) → Sign up / Log in
2. Create a new project
3. Go to **Settings → API**, copy:
   - `Project URL` → paste into `js/supabase.js` as `SUPABASE_URL`
   - `anon public` key → paste as `SUPABASE_ANON_KEY`
4. Go to **SQL Editor**, paste the contents of `supabase-setup.sql` and run it
5. Go to **Authentication → Providers**, make sure **Email** is enabled

---

## 2. Stripe Setup (Payments)

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com) → Log in / Sign up
2. Go to **Developers → API keys**, copy your **Publishable key**
3. Paste it into `js/payment.js` as `STRIPE_PUBLISHABLE_KEY`
4. Create **Payment Links** for common amounts ($5, $10, $20, $50, $100):
   - Dashboard → **Payment Links** → Create New
   - Set amount, description
   - Set success redirect to: `https://aiempire.today/?payment_success=true&task_id=TASK_ID`
   - Copy the link and update the URLs in `js/payment.js` (`paymentLinks` object)

> **Note**: For a production setup with custom amounts, you'll need a backend (Stripe requires a secret key to create checkout sessions). For MVP, Payment Links work fine.

---

## 3. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → Import your GitHub repo `famousleon/aiempire`
2. Click **Deploy** (no build config needed — it's a static site)
3. After deploy, go to **Settings → Domains** → Add `aiempire.today`
4. Vercel will show DNS records. Go to **Spaceship → DNS Management** and add:
   - A record: `76.76.21.21` → `@`
   - CNAME: `cname.vercel-dns.com` → `www`

---

## 4. Test

- Visit `https://aiempire.today`
- Navigate to the **Marketplace** section
- Try creating a task (you'll see demo mode if Supabase is not configured)
- Try accepting a task

---

## File Structure

```
AiEmpire/
├── index.html          # Main page
├── css/
│   └── style.css       # All styles
├── js/
│   ├── app.js          # Main application
│   ├── i18n.js         # 6-language translations
│   ├── tasks.js        # Daily tasks
│   ├── news.js         # News-based tasks
│   ├── proof.js        # Proof submission
│   ├── stats.js        # Stats & achievements
│   ├── supabase.js     # ⭐ Database & Auth (needs config)
│   ├── payment.js      # ⭐ Stripe payments (needs config)
│   └── market.js       # ⭐ Task marketplace
├── assets/
│   └── logo.svg        # Logo
├── supabase-setup.sql  # Database setup SQL
└── SETUP.md            # This file
```
