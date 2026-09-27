# Personalized Meal Delivery App

A mobile-app-style food delivery UI that blends a regular food-ordering experience with **personalized healthy eating recommendations**. Browse categories and restaurants, view dishes with health tags (e.g. "High Protein", "Low Calorie") and discount badges, open restaurant detail dialogs, and track health achievements — all in one client-rendered page.

> Built by Girish Lade — https://ladestack.in

## Features

- **Food discovery feed** — horizontal scroll cards of recommended dishes with images, prices, discounts, and health tags
- **Categories grid** — cuisine/meal categories with item counts
- **Restaurant cards** — restaurant listings that open rich detail dialogs (menu, ratings, info)
- **Tabbed navigation** — switch between healthy recommendations and regular menu sections
- **Health achievements** — gamified healthy-eating progress section
- **Mobile-app chrome** — bottom navigation bar (Home, Explore, Search, Cart, Profile) for an app-like feel
- **Dark/light theme** — via next-themes
- **Modern UI** — shadcn/ui + Radix primitives (dialogs, tabs, badges, scroll areas, avatars), Tailwind CSS, lucide-react icons
- **Client-side only** — all dish/restaurant data is inline mock data in `app/page.tsx`; no backend, no database, no accounts

## Tech Stack

- Next.js 15 (App Router, static export)
- React 19, TypeScript
- Tailwind CSS
- shadcn/ui + Radix UI primitives
- next-themes (light/dark mode)
- lucide-react icons

## Quick Start

Prerequisites: Node.js 18+ and npm (or pnpm).

```bash
npm install
npm run dev
```

Open http://localhost:3000 to browse the meal-delivery UI.

### Production build (static export)

```bash
npm run build
```

This generates a static site in the `out/` directory (`output: 'export'` in `next.config.mjs`), deployable to any static host — GitHub Pages, Vercel, Netlify, Cloudflare Pages.

> Note: `basePath: '/personalized-meal-delivery-app'` in `next.config.mjs` is set for GitHub Pages subpath deployment. Remove it if deploying to a root domain or Vercel.

## Project Structure

```
app/
  page.tsx            # Entire app UI + mock data (dishes, categories, restaurants, achievements)
  layout.tsx          # Root layout + theme provider
  globals.css         # Tailwind global styles
  loading.tsx         # Loading state
components/
  ui/                 # shadcn/ui primitives (avatar, badge, button, card, dialog, tabs, scroll-area)
  theme-provider.tsx  # next-themes wrapper
lib/
  utils.ts            # cn() class-merging helper
public/               # Static assets (placeholder images)
```

## Environment Variables

None — the app needs no API keys, database URLs, or secrets. All data is bundled mock data.

## Deployment

1. Build with `npm run build` → outputs to `out/`
2. Deploy the `out/` folder to GitHub Pages (this repo's live deploy), Vercel, Netlify, or Cloudflare Pages

The project was originally generated with [v0.app](https://v0.app) and may stay in sync with v0 deployments.

## Extending

To connect a real backend, replace the inline mock arrays in `app/page.tsx` (`healthFoodItems`, `regularFoodItems`, `categories`, `restaurants`, `healthAchievements`) with `fetch` calls to your API in the `"use client"` page component.
