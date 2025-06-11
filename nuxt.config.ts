import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/supabase",
  ],

  typescript: {
    builder: "vite",
    typeCheck: true,
    strict: true,
  },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
    },
    clientOptions: {
      auth: {
        persistSession: false,
      },
    },
    cookieOptions: {
      maxAge: 5,
    },
  },
  fonts: {
    families: [
      {
        name: "Poppins",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        provider: "google",
      },
    ],
  },
  icon: {
    mode: "css",
    cssLayer: "base",
  },
  app: {
    head: {
      title: "Wild Oasis",
    },
  },
});
