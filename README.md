# 🛒 NextCart — Full-Stack E-Commerce Platform

**NextCart** is a modern, full-stack **Next.js 16** e-commerce application powered by **Sanity CMS** for content management, **Stripe** for secure payments, and **Clerk** for authentication.  
It provides a seamless shopping experience — from browsing dynamic, CMS-driven products to secure checkout and order tracking — all built with best practices in scalability, accessibility, and design consistency.

---

## 🚀 Features at a Glance

- 🛍️ **Dynamic Storefront**
  - Products, categories, brands, and deals — all fetched from Sanity CMS
  - Smart filters (category, brand, price range)
  - Featured, sale, and hot-deal highlights
- 🧾 **Cart + Wishlist Management**
  - Global cart and favorites handled by Zustand + local persistence
  - Add, remove, reset, or move items between cart and wishlist
- 💳 **Stripe Checkout Integration**
  - Secure checkout session creation
  - Stripe Webhook → Sanity Order Creation + Stock Adjustment
- 👤 **User Authentication with Clerk**
  - Sign in / Sign up / User profile via Clerk SDK
  - Route protection middleware (`proxy.ts`)
- 📰 **Blog System**
  - Sanity-driven blog posts, authors, and categories
  - Portable Text rendering for rich blog content
- 📦 **Order History**
  - View detailed order records (with invoice links)
  - Track order status from pending → delivered
- 🎨 **Modern UI**
  - Built with Tailwind CSS v4 + ShadCN UI (“new-york” style)
  - Lucide icons + Motion animations + responsive layout
  - Clean dark/light-ready design system
- ⚙️ **Admin-Friendly Sanity Studio**
  - Mounted at `/studio`
  - Manage products, brands, orders, blogs, authors, and categories
- 🧠 **Full Type Safety**
  - Generated `sanity.types.ts` using Sanity CLI Typegen
  - Strongly typed Zustand store and API actions

---

## 🧩 Tech Stack

| Layer                     | Technology                               | Purpose                                |
|---------------------------|------------------------------------------|----------------------------------------|
| **Frontend**              | Next.js 16 (App Router, TypeScript)      | Hybrid SSR + ISR + Client components |
| **CMS / Database**        | Sanity v4                                | Structured content + media storage |
| **Payments**              | Stripe (v19 API)                         | Checkout + Webhook orders |
| **Auth**                  | Clerk v6                                 | Authentication + user management |
| **State Management**      | Zustand v5                               | Persistent cart and favorites |
| **UI / Styling**          | Tailwind v4 + ShadCN UI                  | Design system + components |
| **Animation**             | Motion (v12)                             | Smooth transitions |
| **Toast / Feedback**      | React Hot Toast                          | Lightweight notifications |
| **Icons**                 | Lucide-React                             | Modern SVG icons |
| **Backend Runtime**       | Next.js API Routes                       | Webhooks + checkout actions |
| **Deployment**            | Vercel                                   | Hosting for App + API + Studio |

---

## 📂 Project Structure

NEXT-CART
│
├── actions/ # Server actions (Stripe checkout)
│ └── createCheckoutSession.ts
│
├── app/ # App Router pages & APIs
│ ├── (client)/... # Client-side routes (cart, blog, shop, etc.)
│ ├── api/webhook/route.ts # Stripe Webhook
│ ├── studio/[[...tool]]/page.tsx # Sanity Studio mount
│ ├── layout.tsx # Root layout & providers
│ └── globals.css # Tailwind CSS v4 global styles
│
├── components/ # Reusable UI components (ShadCN + custom)
│ ├── ui/ # ShadCN UI primitives (button, card, dialog)
│ ├── ProductCard.tsx
│ ├── OrdersComponent.tsx
│ ├── AddToCartButton.tsx
│ ├── WishListProducts.tsx
│ └── ...etc
│
├── sanity/ # Sanity CMS configuration
│ ├── schemaTypes/ # Schemas (product, brand, order, blog, etc.)
│ ├── env.ts # Project & dataset env validation
│ ├── structure.ts # Custom Studio sidebar
│ └── config.ts # Main Studio config
│
├── store.ts # Zustand persistent store
├── lib/ # Helpers (stripe, utils, image, live)
├── constants/data.ts # Site data (nav, categories, brands)
├── package.json
├── next.config.ts
├── tsconfig.json
└── .env # Environment variables

---

## 🧾 Environment Variables (`.env`)

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

NEXT_PUBLIC_SANITY_PROJECT_ID=n0bva0w8
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=skxxxxxx

STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx


---

💡 Core Features Explained
🛒 Cart & Wishlist

Global state handled by Zustand with persist middleware.
Supports item quantity changes, subtotal, total, and grouped items.
Wishlist (favorites) stored in local storage; add/remove toggles via toast feedback.

💳 Stripe Checkout
actions/createCheckoutSession.ts creates checkout sessions.
Webhook (api/webhook/route.ts) verifies signatures, records order in Sanity, and updates stock.
Each order stores invoice URL, payment intent, customer info, and address.

🧠 Sanity CMS
Schemas for product, brand, category, order, blog, author, address.
Typegen (npm run typegen) produces sanity.types.ts.
Vision tool & Structure Builder enabled in Studio.

👤 Clerk Auth
Authentication middleware in proxy.ts.
Protects /api and restricted client routes.
UserButton, SignIn, SignUp available UI components.

📦 Orders & Invoices
Orders queried from Sanity via GROQ.
Detailed dialog view (OrderDetailDialog.tsx) includes:
Product list with images & quantities
Discount, subtotal, total, and invoice link

📰 Blog System
GROQ queries (getAllBlogs, getSingleBlog, etc.)
Portable Text rendering with custom components.
Sidebar categories and latest blogs shown on post pages.


---

⚙️ Installation & Setup

1️⃣ Clone the repository
git clone https://github.com/yourusername/next-cart.git
cd next-cart

2️⃣ Install dependencies
npm install

3️⃣ Set up environment variables

Create .env in the project root and add your Clerk, Sanity, and Stripe keys.

4️⃣ Run Sanity Studio (optional)
npm run dev
# Visit http://localhost:3000/studio

5️⃣ Start development server
npm run dev
# App runs at http://localhost:3000

6️⃣ Typegen (optional)
npm run typegen
# Regenerates sanity.types.ts from schemas




| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start development server                     |
| `npm run build`   | Build Next.js app                            |
| `npm start`       | Run production server                        |
| `npm run lint`    | Run ESLint                                   |
| `npm run typegen` | Extract schema and generate TypeScript types |



| Schema           | Purpose                                                          |
| ---------------- | ---------------------------------------------------------------- |
| **product**      | Core product info (name, price, discount, brand, variant, stock) |
| **brand**        | Brand logo, slug, description                                    |
| **category**     | Product categories with image + featured flag                    |
| **order**        | Stripe order records and invoice data                            |
| **address**      | Customer shipping addresses                                      |
| **blog**         | Blog content linked to author + categories                       |
| **blogcategory** | Blog category taxonomy                                           |
| **author**       | Author bio + image                                               |
| **blockContent** | Portable Text blocks                                             |


---

🧠 Developer Notes
Uses Tailwind CSS v4.1 syntax (@import in globals.css).
@/ path alias set in tsconfig.json.
ESLint configured for Next core-web-vitals.
Persistent cart and wishlist via Zustand.
Seed data (seed.tar.gz) contains NDJSON exports for Sanity dataset.
Fully deployed on Vercel.


🧾 License
This project is licensed under the MIT License — free to use, modify, and distribute with attribution.



👨‍💻 Author
Md. Jakir Hossain
MERN Stack Web Developer
🌐 Portfolio
 | 💼 LinkedIn
 | 🐙 GitHub


⭐ If you find this project useful, please give it a star on GitHub!
 

