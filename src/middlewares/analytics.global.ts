import { initializeAnalytics, GA_ID } from '@/composables/core/analytics'

let initializedClicks = false


export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log('1')

    if (process.client) {
          await initializeAnalytics()
      try {
        console.log(to)

        trackPageView(to)
        if (!initializedClicks) {
            trackClicks()
            initializedClicks = true
        }
    } catch (error) {
      console.error('Google Analytics initialization failed', error)
    }
  }
})


const trackPageView = (to) => {
      window.gtag('config', GA_ID, {
        page_path: to.fullPath
      })
}

const trackClicks = () => {
      document.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement
        const label = target.getAttribute('data-ga-label') || target.innerText || target.tagName

        window.gtag('event', 'click', {
          event_category: 'engagement',
          event_label: label
        })
      })
}
