// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  typescript: {
    shim: false
  },
  $development: {
    runtimeConfig: {
      public: {
        serverUrl: 'http://localhost:4000'
      }
    }
  },
  $production: {
    runtimeConfig: {
      public: {
        serverUrl: 'https://kisi-mosaic-server.onrender.com'
      }
    }
  }
})
