<script setup lang="ts">
import { PhGlobe, PhShieldCheck, PhLightning, PhMapPin } from '@phosphor-icons/vue'
import { ref, computed } from 'vue'
const mapLoaded = ref(false)
import ScrollFade from './ScrollFade.vue'
import { useI18n } from '#imports'

const { t } = useI18n()

const regions = computed(() => [
  { id: 'tashkent', name: t('map.regions.tashkent'), coords: { x: '50%', y: '40%' }, active: true },
  { id: 'samarkand', name: t('map.regions.samarkand'), coords: { x: '35%', y: '55%' }, active: true },
  { id: 'bukhara', name: t('map.regions.bukhara'), coords: { x: '25%', y: '60%' }, active: true },
  { id: 'andijan', name: t('map.regions.andijan'), coords: { x: '85%', y: '25%' }, active: true },
])

const stats = computed(() => [
  { id: 'reach', value: '1000+', label: t('map.stats.reach'), icon: PhGlobe },
  { id: 'sla', value: '99.9%', label: t('map.stats.sla'), icon: PhShieldCheck },
  { id: 'zap', value: '< 15м', label: t('map.stats.zap'), icon: PhLightning }
])
</script>

<template>
  <section class="py-24 bg-gray-950 border-t border-white/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row items-center gap-16">
        
        <ScrollFade direction="right" class="lg:w-1/2">
          <div>
            <h2 class="text-4xl font-bold text-white mb-6">{{ $t('map.title') }}</h2>
            <p class="text-slate-400 text-lg mb-10">{{ $t('map.subtitle') }}</p>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div v-for="stat in stats" :key="stat.id" class="p-6 bg-gray-900/40 rounded-3xl border border-white/5 hover:bg-gray-900 transition-colors group">
                <div class="flex items-center space-x-3 mb-4">
                  <div class="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center border border-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors">
                    <component :is="stat.icon" class="w-4 h-4 text-indigo-400" />
                  </div>
                  <div class="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">{{ stat.value }}</div>
                </div>
                <div class="text-xs font-bold text-slate-500 uppercase tracking-widest">{{ stat.label }}</div>
              </div>
            </div>
            
            <div class="flex items-center space-x-3 text-slate-400 text-sm">
              <PhMapPin class="w-4 h-4 text-indigo-500" />
              <span>{{ $t('map.location') }}</span>
            </div>
          </div>
        </ScrollFade>

        <ScrollFade direction="left" class="lg:w-1/2 w-full">
          <div class="relative bg-gray-900/40 rounded-[2.5rem] p-3 border border-indigo-500/20 backdrop-blur-sm shadow-2xl overflow-hidden aspect-video group">
            <div v-if="!mapLoaded" class="absolute inset-0 bg-gray-900/80 flex items-center justify-center z-10">
              <div class="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
            <div class="absolute inset-0 opacity-80 group-hover:opacity-100 transition-all duration-700 pointer-events-auto">
               <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.589882200508!2d69.28258287659556!3d41.331454699569654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b50e7b4e339%3A0x6bba3bc3f136696b!2zMTI3INC60LLQsDRQsCwgQXNzaWJvZWwgU3RyZWV0LCBUYXNoa2VudCwgVXpiZWtpc3Rhbg!5e0!3m2!1sen!2s!4v1710475000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style="border:0; filter: contrast(1.1) brightness(0.7) saturate(0.5);"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                @load="mapLoaded = true"
              ></iframe>
            </div>
            
            <div class="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"></div>
            <div class="absolute inset-0 pointer-events-none border-[12px] border-gray-900/50 rounded-[2.5rem]"></div>
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="relative flex flex-col items-center">
                <div class="absolute w-24 h-24 bg-indigo-500/20 rounded-full animate-ping"></div>
                <div class="w-12 h-12 bg-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/50 rotate-45 border-2 border-white/20">
                  <component :is="PhMapPin" class="w-6 h-6 text-white -rotate-45" />
                </div>
                <div class="mt-4 bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-indigo-500/30 text-white font-bold text-sm shadow-2xl">
                  {{ $t('map.hq_label') }}
                </div>
              </div>
            </div>
          </div>
        </ScrollFade>

      </div>
    </div>
  </section>
</template>
