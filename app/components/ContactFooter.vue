<script setup lang="ts">
import { PhWifiHigh, PhShieldCheck, PhCircleNotch, PhPaperPlaneTilt, PhCheckCircle, PhWarningCircle, PhPhoneCall } from '@phosphor-icons/vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '../stores/settings'
import { useI18n } from 'vue-i18n'
import ScrollFade from './ScrollFade.vue'

const { locale, t } = useI18n()

const store = useSettingsStore()
const { settings } = storeToRefs(store)

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMessage = ref('')
const gdprConsent = ref(false)
const form = ref({
  name: '',
  company: '',
  phone: '',
  message: '',
  tariffDetails: {}
})
const cpFile = ref<{ data: string, name: string } | null>(null)

const downloadCP = () => {
  if (!cpFile.value) return
  try {
    const binary = atob(cpFile.value.data)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    const blob = new Blob([bytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = cpFile.value.name || 'proposal.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  } catch {
    window.open(`data:application/pdf;base64,${cpFile.value.data}`, '_blank')
  }
}

const handlePhoneInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  
  // Keep +998 or add if empty
  if (!value.startsWith('998')) {
    value = '998' + value
  }
  
  value = value.substring(0, 12) // +998 XX XXX XX XX
  
  let formatted = '+' + value.substring(0, 3) 
  if (value.length > 3) formatted += ' (' + value.substring(3, 5)
  if (value.length > 5) formatted += ') ' + value.substring(5, 8)
  if (value.length > 8) formatted += '-' + value.substring(8, 10)
  if (value.length > 10) formatted += '-' + value.substring(10, 12)
  
  form.value.phone = formatted
}

const submitForm = async () => {
  // Validate phone completeness (must be +998 XX XXX XX XX = 12 digits)
  const digits = form.value.phone.replace(/\D/g, '')
  if (digits.length < 12) {
    status.value = 'error'
    errorMessage.value = t('contact.form.phone_error')
    return
  }

  status.value = 'loading'
  cpFile.value = null
  errorMessage.value = ''
  
  // Get latest tariff data from localStorage if available
  const savedData = localStorage.getItem('last_tariff_calculation')
  if (savedData) {
    try {
      form.value.tariffDetails = JSON.parse(savedData)
    } catch (e) {
      console.warn('Calculating tariff data failed to parse:', e)
    }
  }

  try {
    const response = await $fetch<any>('/api/leads', {
      method: 'POST',
      body: {
        ...form.value,
        locale: locale.value
      }
    })
    
    if (response.success) {
      status.value = 'success'
      if (response.pdf) {
        cpFile.value = { data: response.pdf, name: response.fileName }
      }
      form.value = { name: '', company: '', phone: '', message: '', tariffDetails: {} }
      gdprConsent.value = false
      setTimeout(() => { if (status.value === 'success') status.value = 'idle' }, 10000)
    }
  } catch (e: any) {
    status.value = 'error'
    errorMessage.value = e.data?.statusMessage || e.message || 'Unknown error'
    setTimeout(() => { status.value = 'idle' }, 8000)
  }
}
</script>

<template>
  <footer id="contact" class="bg-gray-950 pt-24 pb-12 border-t border-white/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        <ScrollFade direction="right">
          <div>
            <div class="flex items-center space-x-2 group cursor-pointer mb-8">
              <div class="p-1.5 bg-indigo-500 rounded-lg group-hover:scale-110 transition-transform">
                <PhWifiHigh class="w-5 h-5 text-white" />
              </div>
              <span class="text-xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">Optikom<span class="text-indigo-500">.Biz</span></span>
            </div>
            
            <h2 class="text-4xl font-bold text-white mb-6">{{ $t('contact.title') }}</h2>
            <p class="text-slate-400 text-lg mb-10 max-w-lg">{{ $t('contact.description') }}</p>
            
            <div class="space-y-6">
              <div class="flex items-center space-x-4 bg-gray-900/40 p-5 rounded-2xl border border-white/5 shadow-2xl hover:bg-gray-900 transition-colors">
                <div class="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
                  <PhShieldCheck class="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <div class="text-sm font-bold text-slate-300 uppercase tracking-widest leading-none mb-1">{{ $t('contact.features.security.title') }}</div>
                  <div class="text-xs text-slate-500 leading-tight">{{ $t('contact.features.security.desc') }}</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollFade>

        <ScrollFade direction="left">
          <div class="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-indigo-500/10 transition-colors"></div>
            
            <form @submit.prevent="submitForm" class="space-y-4 relative z-10">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="reveal-up" style="animation-delay: 100ms">
                  <input v-model="form.name" type="text" :placeholder="$t('contact.form.name')" required class="bg-gray-950/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all font-medium placeholder:text-slate-600 block w-full outline-none" />
                </div>
                <div class="reveal-up" style="animation-delay: 200ms">
                  <input v-model="form.company" type="text" :placeholder="$t('contact.form.company')" class="bg-gray-950/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all font-medium placeholder:text-slate-600 block w-full outline-none" />
                </div>
              </div>
              <div class="reveal-up" style="animation-delay: 300ms">
                <input 
                  v-model="form.phone" 
                  type="tel" 
                  :placeholder="$t('contact.form.phone')" 
                  required 
                  @input="handlePhoneInput"
                  class="bg-gray-950/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all font-medium placeholder:text-slate-600 block w-full outline-none" 
                />
              </div>
              <div class="reveal-up" style="animation-delay: 400ms">
                <textarea v-model="form.message" :placeholder="$t('contact.form.message')" rows="4" class="bg-gray-950/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all font-medium placeholder:text-slate-600 block w-full outline-none"></textarea>
              </div>
              
              <label class="flex items-start gap-3 cursor-pointer group">
                <input v-model="gdprConsent" type="checkbox" required class="mt-1 w-4 h-4 accent-indigo-500 shrink-0 rounded border-white/10" />
                <span class="text-xs text-slate-500 group-hover:text-slate-400 transition-colors leading-relaxed">
                  {{ $t('contact.form.gdpr') }}
                  <a href="/privacy" class="text-indigo-400 hover:text-indigo-300 underline underline-offset-2" target="_blank">{{ $t('contact.form.gdpr_link') }}</a>
                </span>
              </label>

              <button type="submit" :disabled="status === 'loading' || !gdprConsent" class="w-full py-5 bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-500/50 disabled:cursor-not-allowed text-white rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all shadow-xl shadow-indigo-500/20 btn-hover-scale">
                <PhCircleNotch v-if="status === 'loading'" class="w-5 h-5 animate-spin" />
                <PhPaperPlaneTilt v-else class="w-5 h-5" />
                <span>{{ status === 'loading' ? $t('contact.form.sending') : $t('contact.form.submit') }}</span>
              </button>
              
              <transition name="fade">
                <div v-if="status === 'success'" class="mt-4 p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                  <div class="flex items-center space-x-3 mb-4">
                    <PhCheckCircle class="w-5 h-5 text-emerald-500 shrink-0" />
                    <p class="text-emerald-400 text-sm font-medium">{{ $t('contact.form.success') }}</p>
                  </div>
                  <button
                    v-if="cpFile"
                    @click="downloadCP"
                    type="button"
                    class="w-full py-4 bg-indigo-500 hover:bg-indigo-400 text-white rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all shadow-xl shadow-indigo-500/20 active:scale-[0.98] animate-glow-pulse"
                  >
                    <PhPaperPlaneTilt class="w-5 h-5 rotate-180" />
                    <span>{{ $t('contact.form.pdf_download') }}</span>
                  </button>
                </div>
                <div v-else-if="status === 'error'" class="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                  <div class="flex items-center space-x-3">
                    <PhWarningCircle class="w-5 h-5 text-red-500 shrink-0" />
                    <p class="text-red-400 text-sm font-medium">{{ $t('contact.form.error') }}</p>
                  </div>
                  <div v-if="errorMessage" class="mt-2 text-[10px] text-red-400/60 font-mono break-all uppercase border-t border-red-500/10 pt-2">
                    {{ errorMessage }}
                  </div>
                </div>
              </transition>
            </form>
          </div>
        </ScrollFade>
      </div>

      <div class="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="flex flex-col items-center md:items-start">
          <div class="flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors font-bold text-lg mb-2">
            <PhPhoneCall class="w-5 h-5" />
            <a :href="`tel:${(settings?.contacts?.phone || '').replace(/\D/g, '').replace(/^/, '+')}`">{{ settings?.contacts?.phone || '+998 (71) 000-00-00' }}</a>
          </div>
          <p class="text-slate-600 text-sm font-medium">{{ $t('contact.address') }}</p>
        </div>
        
        <div class="flex items-center space-x-6">
          <a v-if="settings?.social?.telegram" :href="settings.social.telegram" target="_blank" rel="noopener" class="w-10 h-10 rounded-full bg-white/5 hover:bg-indigo-500 flex items-center justify-center transition-all border border-white/5 font-bold text-white text-xs">TG</a>
          <a v-if="settings?.social?.facebook" :href="settings.social.facebook" target="_blank" rel="noopener" class="w-10 h-10 rounded-full bg-white/5 hover:bg-indigo-500 flex items-center justify-center transition-all border border-white/5 font-bold text-white text-xs">FB</a>
          <a v-if="settings?.social?.instagram" :href="settings.social.instagram" target="_blank" rel="noopener" class="w-10 h-10 rounded-full bg-white/5 hover:bg-indigo-500 flex items-center justify-center transition-all border border-white/5 font-bold text-white text-xs">IN</a>
        </div>
        
        <p class="text-slate-600 text-xs font-bold uppercase tracking-widest">{{ $t('contact.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>
