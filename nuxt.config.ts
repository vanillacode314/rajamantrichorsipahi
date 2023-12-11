// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/styles/index.css"],
  modules: ["@nuxt/ui", "@nuxtjs/google-fonts", "@vueuse/nuxt", "@pinia/nuxt"],
  googleFonts: {
    families: {
      "DM Sans": [400, 500, 600, 700, 800, 900],
    },
  },
  ui: {
    global: true,
    icons: ["mdi", "simple-icons"],
    safelistColors: ["red", "green", "purple", "rose"],
  },
  devtools: { enabled: true },
});
