import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: null as any,
    loading: false,
    error: null as string | null
  }),
  actions: {
    async fetchSettings() {
      if (this.settings) return
      this.loading = true
      try {
        const data = await $fetch('/api/settings')
        this.settings = data
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async updateSettings(newSettings: any) {
      try {
        await $fetch('/api/settings', {
          method: 'POST',
          body: newSettings
        })
        this.settings = JSON.parse(JSON.stringify(newSettings))
      } catch (err: any) {
        this.error = err.message
        throw err
      }
    }
  }
})
