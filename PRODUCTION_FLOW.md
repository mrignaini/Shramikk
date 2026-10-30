# SHRAMIKK — Complete Production Readiness Flow & Deployment Guide

This document outlines the step-by-step roadmap and standard operating procedure (SOP) to take **SHRAMIKK** (लेबर चौक से डिजिटल पहचान तक) from local development to a secure, scalable, and highly available **Production Release**.

---

## 1. System Architecture Overview

```mermaid
flowchart TD
    subgraph Client["Edge & Client Tier"]
        Users["Workers / Contractors / Admins"]
        CDN["Vercel Edge Network / Cloudflare CDN"]
        SPA["React 19 + Vite SPA (Code-Split)"]
    end

    subgraph API["Backend API Tier"]
        LB["Load Balancer / Reverse Proxy"]
        ExpressApp["Node.js Express + TypeScript API"]
        PrismaORM["Prisma Client ORM"]
    end

    subgraph Data["Database & Services"]
        NeonDB[("Neon Managed PostgreSQL (SSL)")]
        Groq["Groq AI Cloud (AI Saathi)"]
        Stripe["Stripe Escrow Payment Gateway"]
    end

    Users --> CDN
    CDN --> SPA
    SPA -->|HTTPS / REST API| LB
    LB --> ExpressApp
    ExpressApp --> PrismaORM
    PrismaORM --> NeonDB
    ExpressApp --> Groq
    ExpressApp --> Stripe
```

---

## 2. Phase-by-Phase Production Flow

### Phase 1: Codebase & Asset Optimization (Completed)
- **Zero Horizontal Overflow**: Navbar, headers, and root viewport containers refactored with responsive clamps (`overflow-x-hidden`, adaptive logo sizing, compact action pills on 1024px–1366px screens).
- **Route-Level Code Splitting**: Converted monolithic 901 kB bundle into on-demand asynchronous chunks using `React.lazy` and `Suspense` with branded fallback loaders. Initial load bundle reduced to **~79 kB**.
- **Vendor Splitting**: Configured manual chunks in `vite.config.ts` separating React core and external dependencies for long-term browser cacheability.
- **Strict Lint & Typechecking**: Clean builds with `tsc -b` and zero errors in `oxlint`.

---

### Phase 2: Environment Configuration

#### 1. Frontend (`/Shramikk/.env.production`)
Create a production environment file:
```bash
# Production API Gateway URL
VITE_API_URL="https://api.shramikk.in"
```

#### 2. Backend (`/Shramikk/backend/.env`)
Ensure all secrets are provisioned in your hosting environment (e.g. Railway, Render, or AWS Parameter Store):
```bash
# Database (Neon PostgreSQL with connection pooling)
DATABASE_URL="postgresql://shramikk_prod_user:SECRET_PASSWORD@ep-sample-123.ap-southeast-1.aws.neon.tech/shramikk_db?sslmode=require"

# Server Port & Mode
PORT=5000
NODE_ENV=production

# CORS Restriction (whitelist frontend domains only)
FRONTEND_URL="https://shramikk.in,https://www.shramikk.in"

# JWT Authentication
JWT_SECRET="generate-a-strong-64-character-random-hex-key"
JWT_EXPIRES_IN="7d"

# Payment Gateway (Live credentials)
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."

# Groq AI Saathi
GROQ_API_KEY="gsk_..."
```

---

### Phase 3: Database Migration Pipeline (Prisma + Neon PostgreSQL)

In production, **never** run `prisma migrate dev`. Follow this exact pipeline:

1. **Verify Connection**:
   ```bash
   cd backend
   npx prisma db pull --print
   ```

2. **Deploy Pending Migrations**:
   ```bash
   npx prisma migrate deploy
   ```

3. **Seed Master Data (Govt Schemes, Skill Categories, Default Admin)**:
   ```bash
   npm run prisma:seed
   ```

---

### Phase 4: Production Deployment Steps

#### Option A: Deploying Frontend on Vercel
1. Import repository in **Vercel**.
2. Root Directory: `Shramikk` (or `./`).
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Environment Variables:
   - `VITE_API_URL` = `https://api.shramikk.in`
6. Single Page App routing rewrite is already configured in `vercel.json`:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

#### Option B: Deploying Backend on Railway / Render
1. Root Directory: `Shramikk/backend`.
2. Build Command: `npm ci && npx prisma generate && tsc`.
3. Start Command: `npm start` (`node dist/server.js`).
4. Set Health Check Path: `/health` or `/api/health`.
5. Attach custom domain (e.g., `api.shramikk.in`) with automated SSL.

---

### Phase 5: Security & Reliability Hardening

1. **Security Headers (Backend Express)**:
   Add `helmet` middleware in `src/server.ts`:
   - Enforce HSTS (`Strict-Transport-Security`).
   - Content Security Policy (CSP).
   - Prevent clickjacking (`X-Frame-Options: DENY`).
2. **Rate Limiting**:
   Apply `express-rate-limit` on sensitive endpoints:
   - `/api/auth/*`: 10 requests / 15 minutes per IP.
   - `/api/payments/*`: 30 requests / 15 minutes per IP.
3. **Escrow Idempotency**:
   Guarantee that payment initiation requests pass an `Idempotency-Key` header to prevent duplicate bank debits.

---

### Phase 6: Monitoring, Logging & Smoke Testing

1. **Uptime Monitoring**:
   - Set up ping monitors on `https://shramikk.in` and `https://api.shramikk.in/health` via UptimeRobot / BetterStack.
2. **Post-Deployment Verification Matrix**:
   - [ ] Visit home page on 375px mobile, 768px tablet, and 1280px desktop — ensure zero horizontal scrolling.
   - [ ] Switch language between English and Hindi — verify all labels switch smoothly.
   - [ ] Test Mobile Menu Drawer — ensure menu opens/closes without layout jumps.
   - [ ] Test Escrow Payment Simulation — ensure status transitions from Escrow Locked -> Work Completed -> Funds Released.
   - [ ] Verify AI Saathi chat responses via Groq API.
   - [ ] Access Worker Dashboard & Hirer Hub.

