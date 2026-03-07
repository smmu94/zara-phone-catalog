# Zara Phone Catalog

A web application to browse, search and manage a catalog of mobile phones. Built as part of a frontend challenge.

Live demo: https://zara-phone-catalog-ashy.vercel.app/

---

## Getting started

You'll need Node 18+ and pnpm installed.

1. Clone the repository and install dependencies:

```bash
pnpm install
```

2. Create a `.env.local` file in the root with the following variables:

```
NEXT_PUBLIC_API_BASE_URL=https://prueba-tecnica-api-tienda-moviles.onrender.com
API_KEY=your_api_key_here
```

3. Start the development server:

```bash
pnpm dev
```
Development mode serves assets unminified for easier debugging.

4. For production build:

```bash
pnpm build
pnpm start
```
Production build concatenates and minifies all assets automatically via Next.js.


## Project structure

```
src/
├── app/                  # Next.js app router pages
│   ├── cart/             # Cart page
│   ├── phones/[id]/      # Phone detail page
│   ├── layout.tsx
│   └── page.tsx
├── features/             # Feature-based modules
│   ├── cart/             # Cart context and cart item component
│   └── phones/           # Phone list and detail components
├── lib/                  # Shared utilities
│   ├── data.ts           # API fetch functions
│   ├── types.ts          # TypeScript types
│   ├── constants.ts      # App constants and routes
│   └── testMocks.ts      # Mocks for testing
├── shared/               # Reusable components (Navbar, Button)
└── styles/               # Global styles and CSS variables
```

The project follows a feature-based architecture. Each feature owns its components, and only truly shared pieces (like the navbar or the button) live in `shared/`. Types and API calls are centralized in `lib/` to keep things consistent across the app.

---

## Tech stack

- **Next.js 16** with App Router and SSR
- **TypeScript**
- **CSS Modules** with CSS variables
- **React Context API** for cart state management
- **localStorage** for cart persistence
- **Jest + React Testing Library** for testing
- **ESLint** for linting

---

## Features

- Phone catalog with search and real-time filtering via API
- Phone detail page with color and storage selectors
- Dynamic price updates based on selected storage
- Add to cart with color and storage selection required
- Cart with item removal and total price
- Persistent cart using localStorage
- Similar products carousel on detail page
- Fully responsive (mobile, tablet, desktop)