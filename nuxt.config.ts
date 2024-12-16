// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  nitro: {
    preset: "cloudflare-pages"
  },

  modules: [
    "nitro-cloudflare-dev",
    "@nuxtjs/google-fonts",
    "@nuxt/ui"
  ],
  googleFonts: {
    families: {
      "Open Sans": [400, 700]
    }
  }
})