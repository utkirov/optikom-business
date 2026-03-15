import * as PhosphorIcons from '@phosphor-icons/vue'

export default defineNuxtPlugin((nuxtApp) => {
  // Register all icons starting with Ph
  for (const [name, component] of Object.entries(PhosphorIcons)) {
    if (name.startsWith('Ph')) {
      nuxtApp.vueApp.component(name, component)
    }
  }
})
