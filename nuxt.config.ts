// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./app/components/ui"
     */
    componentDir: "./app/components/ui",
  },
  colorMode: {
    preference: "system", // Default theme (system, light, or dark)
    fallback: "light", // If system is not available
    classSuffix: "", // This gives you `class="dark"` instead of `dark-mode`
  },

  nitro: {
    routeRules: {
      "/api/**": { cors: true },
    },
  },
});
