Here’s a README for your Wild Oasis cabin rental admin dashboard, following the ByteShop structure and style, complete with emojis and badges:

---

# 🏕️ Wild Oasis – Cabin Rental Admin Dashboard

![Nuxt](https://img.shields.io/badge/Nuxt-4.0.1-00DC82?logo=nuxt.js)
![Vue](https://img.shields.io/badge/Vue-3.5.16-4FC08D?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.8-38bdf8?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-2.50.0-3ECF8E?logo=supabase)

**Wild Oasis** is a modern admin dashboard for managing cabin rentals. Built with Nuxt 4, Vue 3, Supabase, and TailwindCSS, it’s designed for property managers to handle bookings, cabins, guests, and settings, with authentication and a gorgeous dark/light UI.

---

## 🚀 Features

### 🏕️ **Cabin Management**
- Add, edit, and delete cabins
- Adjust cabin settings: max booking days, minimum price, capacity, discounts
- Upload cabin images

### 📅 **Booking System**
- Create/update/delete bookings
- Set check-in/check-out status
- Price calculation: base, discounts, breakfast extras
- View booking history per cabin and guest

### 👤 **Guest Management**
- Register and manage guests
- Track booking records for each guest

### 🔒 **Authentication**
- Register, log in, log out (Supabase Auth)
- Secure admin-only actions

### 🎨 **Modern UI/UX**
- Responsive design for mobile, tablet, and desktop
- Dark and light mode toggle
- Toast notifications for user feedback
- Interactive tables, modals, and charts

### 📊 **Analytics & Charts**
- Booking stats and trends
- Revenue visualization

---

## 🛠️ Tech Stack

- **Framework**: Nuxt 4 (Vue 3)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Nuxt UI, Heroicons
- **Charts**: Chart.js, nuxt-charts
- **Database & Auth**: Supabase
- **Linting**: ESLint
- **Formatting**: Prettier + Prettier Tailwind plugin

---

## 📦 Getting Started

### **Prerequisites**
- Node.js 18+
- Supabase Project (with `cabins`, `guests`, `bookings` tables)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

### **Installation**

1. **Clone the repo**
   ```bash
   git clone https://github.com/viktorasatiani/wild-oasis.git
   cd wild-oasis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Supabase**
   - Create a Supabase project
   - Set up tables: `cabins`, `guests`, `bookings`
   - Add a storage bucket named `images`
   - Copy your Supabase URL and anon key to `.env`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
wild-oasis/
├── components/             # Reusable Vue components
│   ├── cabins/             # Cabin tables and modals
│   ├── forms/              # Form components for cabins/bookings
│   ├── SupabaseUploader.vue# Bulk data upload
│   └── ...                 # Other UI components
├── pages/                  # App pages (cabins, bookings, auth, etc.)
├── composables/            # Vue composables (data fetching, logic)
├── types/                  # TypeScript types
├── public/                 # Static assets
├── nuxt.config.ts          # Nuxt configuration
└── ...                     # Other configuration and setup files
```

---

## 🎯 Key Features Details

### **Cabin & Booking Management**
- Add new cabins, set capacity, price, and discounts
- Edit and delete cabins
- Book cabins for guests, manage check-in/out
- Price calculation with extras

### **Authentication**
- Secure register/login/logout flow
- Only authenticated admins can manage data

### **User Experience**
- Dark/light mode switch
- Toast notifications for all actions
- Data tables with sorting, filtering, and actions

### **Analytics**
- Charts for bookings and revenue
- Stats per cabin, guest, and booking

---

## 🚦 Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run generate     # Generate static files
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## 🙏 Acknowledgments

- [Nuxt.js](https://nuxt.com/)
- [Vue.js](https://vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Chart.js](https://www.chartjs.org/)
- [Nuxt UI](https://ui.nuxt.com/)
- [Heroicons](https://heroicons.com/)

---

Let me know if you want the file pushed directly to your repo or need extra sections (e.g., environment config example, API schema)!
