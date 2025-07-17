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

  runtimeConfig: {
    // Private keys (only available on server-side)
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,

    // Public keys (exposed to client-side)
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },

  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  supabase: {
    clientOptions: {
      auth: {
        persistSession: false,
      },
    },
    cookieOptions: {
      maxAge: 0,
    },
    cookiePrefix: "nekot",
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
      titleTemplate: "%s - Wild Oasis",
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    layoutTransition: {
      name: "layout",
      mode: "out-in",
    },
  },
});
