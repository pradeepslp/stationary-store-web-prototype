<<<<<<< HEAD
# stationary-store-web-prototype
=======
# Kavya Fancy Store – Stationary Store

A Next.js catalog site for a small stationery store with a public product list and an owner dashboard for managing products.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env` and set:

   - `DATABASE_URL` – Prisma SQLite path (default: `file:./dev.db`)
   - `NEXTAUTH_SECRET` – random string (e.g. `openssl rand -base64 32`)
   - `NEXTAUTH_URL` – app URL (e.g. `http://localhost:3000`)
   - `OWNER_EMAIL` / `OWNER_PASSWORD` – owner login (used by seed)

3. **Database**

   ```bash
   npx prisma db push
   npx prisma db seed
   ```

4. **Run**

   ```bash
   npm run dev
   ```

   - Store: [http://localhost:3000](http://localhost:3000)  
   - Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard) (log in with `OWNER_EMAIL` / `OWNER_PASSWORD`)

## Features

- **Public**: Homepage, product list (paginated, filter by category), product detail. Catalog only; no cart or payments.
- **Dashboard**: Owner login, product CRUD, publish/unpublish, paginated product list.
- **Scalable**: Pagination (12 products per page) on both public and dashboard product lists.

## If you see "Connection failed"

1. **Dev server not running** – Start it with `npm run dev` and open http://localhost:3000.
2. **Database not set up** – Run `npx prisma db push` then `npx prisma db seed`.
3. **Missing .env** – Copy `.env.example` to `.env` and set `NEXTAUTH_SECRET` (e.g. `openssl rand -base64 32`), `OWNER_EMAIL`, and `OWNER_PASSWORD`. A default `.env` is included for local dev; change the owner password before going live.

## Create as your repository

1. **Install Git** (if needed): [git-scm.com](https://git-scm.com/download/win)

2. **Initialize and commit locally**

   ```bash
   cd stationary-store
   git init
   git add .
   git commit -m "Initial commit: Kavya Fancy Store stationery store"
   ```

3. **Create a new repo on GitHub**  
   Go to [github.com/new](https://github.com/new), name it (e.g. `stationary-store`), leave “Add a README” unchecked, then create.

4. **Push this project to GitHub**

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/stationary-store.git
   git branch -M main
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` and `stationary-store` with your GitHub username and repo name.

## Tech

- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Prisma + SQLite
- NextAuth.js (credentials)
>>>>>>> fc0659f (Initial commit)
