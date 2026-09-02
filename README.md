# shibili-webstarter

> A personal, production-ready **Next.js + TypeScript + Tailwind CSS** starter template by [@shibilikds133-spec](https://github.com/shibilikds133-spec).

Use this template as the starting point for any new web project — everything you need is already configured.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + CSS variables |
| **Dark Mode** | `next-themes` — system / manual toggle |
| **Forms** | React Hook Form + Zod validation |
| **Toast Notifications** | `react-hot-toast` |
| **SEO** | `buildMetadata()` helper (Open Graph + Twitter card) |
| **Contact API** | `/api/contact` — validated, rate-limited |
| **UI Components** | Button, Badge, Card, Alert, Spinner, ThemeToggle |
| **Error Handling** | `error.tsx` (global) + `not-found.tsx` (404) |
| **Testing** | Jest + React Testing Library |
| **Linting** | ESLint + Prettier |
| **DevContainer** | VS Code Dev Container for zero-setup onboarding |
| **Deployment** | Cloudflare Pages ready |

---

## 🚀 Quick Start

### Use this template
Click **"Use this template"** on GitHub to create a new repo from this starter.

### Local setup
```bash
git clone https://github.com/shibilikds133-spec/shibili-webstarter.git my-project
cd my-project
pnpm install
cp .env.example .env        # fill in your values
pnpm dev
```

Visit `http://localhost:3000`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/contact/        ← Contact API route
│   ├── contact/            ← Contact page
│   ├── error.tsx           ← Global error boundary
│   ├── not-found.tsx       ← 404 page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── Alert.tsx
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Spinner.tsx
│   │   └── ThemeToggle.tsx
│   ├── form/
│   │   ├── TextField.tsx
│   │   └── TextArea.tsx
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
└── lib/
    ├── contact.ts
    ├── env.ts
    ├── rateLimit.ts
    └── seo.ts              ← buildMetadata() helper
```

---

## 🔧 Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | ESLint (zero warnings) |
| `pnpm format` | Prettier formatting |
| `pnpm typecheck` | TypeScript type check |
| `pnpm preflight` | Validate env variables |
| `pnpm test` | Run Jest tests |
| `pnpm build:pages` | Build for Cloudflare Pages |

---

## 🌍 Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
TENANT_ID=your-tenant-id
RAISUITE_API_BASE=https://api.example.com
RAISUITE_API_KEY=your-secret-key
TURNSTILE_SECRET=           # Optional — Cloudflare Turnstile CAPTCHA
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

---

## 🎨 UI Components

### Button
```tsx
<Button variant="primary">Submit</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger">Delete</Button>
```

### Badge
```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Error</Badge>
```

### Card
```tsx
<Card padding="md">
  <p>Your content here</p>
</Card>
```

### Alert
```tsx
<Alert variant="success" title="Done!">Your message was sent.</Alert>
<Alert variant="danger">Something went wrong.</Alert>
```

### Spinner
```tsx
<Spinner size="md" />
```

### Toast (via react-hot-toast)
```tsx
import toast from 'react-hot-toast';

toast.success('Saved!');
toast.error('Something went wrong.');
```

---

## 🔍 SEO

Use `buildMetadata()` in any page:

```tsx
// app/about/page.tsx
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About',
  description: 'Learn more about us.'
});
```

---

## ☁️ Deployment (Cloudflare Pages)

| Setting | Value |
|---|---|
| Build command | `npx @cloudflare/next-on-pages@latest` |
| Output directory | `.vercel/output/static` |
| Node compatibility | Enable `nodejs_compat` |

---

## 🗺️ Roadmap

- [ ] Cloudflare Turnstile CAPTCHA integration
- [ ] Multi-tenant theme mapping
- [ ] CMS data fetching example
- [ ] Production-safe rate limiting (KV / Redis)
- [ ] Playwright E2E tests
- [ ] Husky pre-commit hooks

---

## 📄 License

MIT — feel free to use and modify.