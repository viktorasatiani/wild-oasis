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
  appConfig: {
    title: "Wild Oasis",
  },
});
