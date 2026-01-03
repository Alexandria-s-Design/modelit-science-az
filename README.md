# ModelIt Readers

**See the Systems in Everything** - A K-12 systems thinking subscription platform.

## Quick Start



The app runs in **demo mode** without credentials - all features work with sample data.

---

## Project Structure

| Section | Files | Status |
|---------|-------|--------|
| 1. Landing Page | src/app/page.tsx | Complete |
| 2. Authentication | src/lib/supabase/ | Complete |
| 3. Payments | src/lib/stripe.ts | Complete |
| 4. Teacher Dashboard | src/app/dashboard/ | Complete |
| 5. Student Portal | src/app/student/ | Complete |
| 6. Content System | src/content/ | Pending |

---

## 1. Landing Page

**Files:** src/app/page.tsx, src/app/pricing/page.tsx

- Hero section with tagline and CTAs
- Pricing cards (Teacher 9/yr, School 99/yr)
- Topic preview (4 topics)

---

## 2. Authentication (Supabase)

**Files:** src/lib/supabase/, src/app/(auth)/

- Email/password + Google SSO
- Student join codes
- Role-based access

**Setup:** Add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local

---

## 3. Payments (Stripe)

**Files:** src/lib/stripe.ts, src/app/api/checkout/

| Tier | Price | Seats |
|------|-------|-------|
| Teacher | 9/year | 36 |
| School | 99/year | Unlimited |

**Setup:** Add STRIPE_SECRET_KEY, STRIPE_PRICE_TEACHER, STRIPE_PRICE_SCHOOL to .env.local

---

## 4. Teacher Dashboard

**Files:** src/app/dashboard/

- /dashboard - Overview
- /dashboard/classrooms - Manage classes
- /dashboard/content - Content library
- /dashboard/assign - Assignments
- /dashboard/progress - Student progress
- /dashboard/account - Billing

---

## 5. Student Portal

**Files:** src/app/student/

- /student - Dashboard
- /student/read/[id] - Reader view
- /student/activity/[id] - Quiz view

---

## 6. Content System (MDX) - PENDING

**Topics:** Ecosystems, Human Body, Economics, Climate

**Reading Levels:** Low, Mid, High

---

## Roadmap

**Phase 1 (Complete):** Platform scaffold
**Phase 2 (In Progress):** MDX content system
**Phase 3:** Supabase integration
**Phase 4:** Polish and launch

---

## Tech Stack

Next.js 16 | TypeScript | Tailwind 4 | shadcn/ui | Supabase | Stripe | Vercel

---

**License:** Private - ModelIt / Discovery Collective