# 🚀 Startup India - Submission Platform

A full-stack web application built with **Next.js**, **Sanity CMS**, and **Tailwind CSS**, allowing aspiring entrepreneurs to submit, showcase, and discover innovative startup ideas. This platform serves as a central hub for the next generation of Indian startups.

![alt text](https://user-images.githubusercontent.com/1234567/your-screenshot-url.png)
<!-- It's highly recommended to replace this with an actual screenshot of your app -->

---

## 📦 Features

- 🔐 **Secure User Authentication**: Robust authentication system using **NextAuth.js**, allowing users to sign up, log in, and manage their submissions.
- 📝 **Intuitive Submission Form**:
  - Title & Tagline
  - Detailed Description
  - Category (e.g., FinTech, EdTech, SaaS)
  - Founder Information
  - Cover Image URL
- ✍️ **Rich Markdown Pitch Editor**: Beautiful WYSIWYG editor (`@uiw/react-md-editor`) for crafting compelling startup pitches.
- 🧠 **Headless CMS with Sanity**: Manage all startup data, categories, and authors using **Sanity.io** Studio.
- 🔍 **Dynamic Browsing & Filtering**: Browse all submissions and filter by category or search term.
- 📄 **Dynamic Startup Pages**: SEO-friendly URLs for each startup (e.g., `/startup/[id]`).
- ✅ **Robust Form Validation**: End-to-end type-safe validation using `zod`.
- ⚙️ **Modern Server-Side Logic**: Uses **Next.js Server Actions** for interactive submission without reloads.
- 🎨 **Sleek & Responsive UI**: Fully responsive and styled with **Tailwind CSS**.

---

## 🛠️ Tech Stack

| Category        | Tech                     |
|----------------|--------------------------|
| Framework      | Next.js (App Router)     |
| Styling        | Tailwind CSS             |
| CMS            | Sanity.io                |
| Authentication | NextAuth.js              |
| Validation     | Zod                      |
| Editor         | @uiw/react-md-editor     |
| Deployment     | Vercel                   |

---

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js (v18 or later)
- npm or yarn
- A Sanity.io account

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/STARTUP-INDIA.git
cd STARTUP-INDIA
```

---

### 2️⃣ Install Dependencies

Install dependencies for both the **Next.js app** and the **Sanity Studio**:

```bash
# Install root dependencies (Next.js)
npm install

# Install Sanity dependencies
cd sanity
npm install
cd ..
```

---

### 3️⃣ Set Up Sanity Studio

```bash
cd sanity
npx sanity init
```

- Choose "Connect to an existing project" or create a new one.
- Use the default dataset (`production`) or create your own.
- Start the Sanity Studio locally:

```bash
npm run dev
```

Visit `http://localhost:3333` in your browser to open the CMS studio.

📝 Tip: Add some categories like `FinTech`, `HealthTech`, `AgriTech` in the Studio UI so they show up in the app.

---

### 4️⃣ Configure Environment Variables

Create a `.env.local` file at the project root:

```env
# .env.local

# NextAuth
AUTH_SECRET=your_auth_secret
AUTH_URL=http://localhost:3000
AUTH_GITHUB_ID=your_github_oauth_id
AUTH_GITHUB_SECRET=your_github_oauth_secret

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-05-01
SANITY_API_WRITE_TOKEN=your_sanity_write_token
```

---

### 5️⃣ Run the Development Server

Start the app in development mode:

```bash
npm run dev
```

Now open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 📁 Folder Structure

```
/
├── app/
│   ├── (root)/
│   │   ├── startup/
│   │   │   ├── [id]/
│   │   │   └── Create/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Searchbtn.tsx
│   │   ├── Searchform.tsx
│   │   ├── Startform.tsx
│   │   └── StartupCard.tsx
│   ├── fonts/
│   ├── lib/
│   │   ├── actions.ts
│   │   ├── utils.ts
│   │   └── Validation.ts
│   ├── studio/
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx
│
├── Hooks/
├── public/
├── sanity/
├── .env.local
├── .gitignore
├── auth.ts
├── components.json
├── next-auth.d.ts
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```
