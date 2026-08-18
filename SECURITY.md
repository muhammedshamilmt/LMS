# Security Guide — Herald Group

## Pre-Deploy Checklist

Run through this before every production deployment.

### Secrets & Environment
- [ ] `.env.local` is NOT committed to git (verify with `git status`)
- [ ] All secrets are set in the hosting platform's environment variable config (Vercel dashboard, etc.)
- [ ] `ADMIN_PASSWORD` is set to a strong random string (min 32 chars) — **never** `NEXT_PUBLIC_ADMIN_PASSWORD`
- [ ] `MONGODB_URI` and `MONGODB_DB_NAME` are set server-side only
- [ ] `EMAIL_USER` and `EMAIL_PASS` are set server-side only
- [ ] `ALLOWED_ORIGIN` is set to your production domain(s)

### Build & Runtime
- [ ] `NODE_ENV=production` is set in the hosting environment
- [ ] Debug logging is OFF (no `console.log` with PII in production code)
- [ ] HTTPS is enforced — no HTTP in production

### Database
- [ ] MongoDB Atlas IP allowlist is restricted (not `0.0.0.0/0`)
- [ ] DB user has least-privilege permissions (read/write only, no admin)
- [ ] `/api/channels/seed` is only called once during initial setup

### Dependencies
- [ ] Run `npm audit` and fix any high/critical vulnerabilities before shipping
- [ ] All dependencies are pinned in `package-lock.json`

---

## Security Architecture

### Rate Limiting
Implemented in `src/lib/rateLimit.ts` using an in-memory sliding-window counter.

| Endpoint type         | Limit              |
|-----------------------|--------------------|
| Auth (login, OTP)     | 5 req / 15 min     |
| OTP request           | 3 req / 15 min     |
| Form submissions      | 10 req / min       |
| General API           | 60 req / min       |
| Admin operations      | 30 req / min       |

For multi-instance or edge deployments, replace the in-memory `Map` in `rateLimit.ts` with a Redis/Upstash-backed counter.

### Input Validation
All API routes validate input with Zod schemas defined in `src/lib/validation.ts`. Client-side validation is UX only — server-side is the security boundary.

### Admin Authentication
Admin password is verified server-side via `src/lib/adminAuth.ts` using `process.env.ADMIN_PASSWORD` only. The `NEXT_PUBLIC_ADMIN_PASSWORD` variable must NOT be used — it would be inlined into the client bundle.

### Security Headers
Set in two places for defence-in-depth:
- `src/middleware.ts` — Edge middleware (CSP, CORS, HSTS, X-Frame-Options, etc.)
- `next.config.ts` — Next.js headers config

### CORS
Configured in `src/middleware.ts`. In production, only origins listed in `ALLOWED_ORIGIN` are permitted. In development, all origins are allowed.

### Password Storage
All passwords are hashed with bcrypt (cost factor 12). Passwords are never returned in API responses (excluded via MongoDB projection).

### XSS Prevention
- No `dangerouslySetInnerHTML` usage
- No `eval()` or `new Function()` with user input
- CSP header restricts inline script execution

---

## Reporting a Vulnerability

Please report security issues privately to the admin email configured in your settings rather than opening a public GitHub issue.
