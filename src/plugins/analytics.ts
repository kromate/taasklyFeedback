import VueGtag, { trackRouter } from 'vue-gtag-next'
import { initializeAnalytics, GA_ID } from '@/composables/core/analytics'


export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: GA_ID
    }
  })
  trackRouter(useRouter())
})
