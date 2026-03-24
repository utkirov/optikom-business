<script setup lang="ts">
import { PhTreeStructure, PhWifiHigh, PhMonitor, PhVideoCamera, PhShieldCheck } from '@phosphor-icons/vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '../stores/settings'
import ScrollFade from './ScrollFade.vue'

const store = useSettingsStore()
const { settings } = storeToRefs(store)
</script>

<template>
  <header class="relative pt-32 pb-48 bg-indigo-950 overflow-hidden bg-vertical-rays">
    <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
    <div class="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-indigo-500/20 rounded-full blur-[150px] pointer-events-none"></div>
    
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center pt-10">
      
      <ScrollFade>
        <div class="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-900/50 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-8 backdrop-blur-sm shadow-xl mx-auto">
          <span>{{ $t('hero.badge') || 'Управляемые IT и телеком решения' }}</span>
        </div>
      </ScrollFade>

      <ScrollFade :delay="100">
        <div class="text-center max-w-5xl mb-12 relative z-10 w-full">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white mb-6 tracking-tight leading-[1.1]">
            <span v-html="$t('hero.title')"></span>
          </h1>
          <p class="text-lg md:text-xl text-indigo-200/90 max-w-3xl mx-auto mt-6 leading-relaxed">
            {{ $t('hero.description') }}
          </p>
          
          <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a :href="settings?.hero?.buttonLink" class="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white rounded-full font-bold transition-all shadow-[0_0_30px_-5px_rgba(84,99,255,0.4)] hover:-translate-y-1">
              <span>{{ $t('hero.button') }}</span>
            </a>
            <a href="#tariffs" class="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-bold transition-all backdrop-blur-md hover:-translate-y-1">
              {{ $t('hero.calc') }}
            </a>
          </div>
        </div>
      </ScrollFade>

      <div class="absolute left-4 lg:left-6 top-40 px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl animate-float z-10 hidden md:block">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center"><PhTreeStructure class="w-4 h-4 text-white" /></div>
          <div>
            <div class="text-xs text-indigo-200 font-medium tracking-wider uppercase">{{ $t('hero.cards.infrastructure.label') }}</div>
            <div class="text-white font-bold text-sm">{{ $t('hero.cards.infrastructure.desc') }}</div>
          </div>
        </div>
      </div>

      <div class="absolute left-10 bottom-32 px-5 py-3 bg-indigo-600/30 backdrop-blur-xl border border-indigo-400/30 rounded-2xl shadow-xl animate-float-delayed z-10 hidden lg:block">
        <div class="flex items-center space-x-3">
           <div class="w-8 h-8 rounded-full bg-indigo-400/20 flex items-center justify-center"><PhWifiHigh class="w-4 h-4 text-indigo-300" /></div>
           <div>
            <div class="text-xs text-indigo-300 font-medium tracking-wider uppercase">{{ $t('hero.cards.wifi.label') }}</div>
            <div class="text-white font-bold text-sm text-[10px] leading-tight">{{ $t('hero.cards.wifi.desc') }}</div>
          </div>
        </div>
      </div>

      <div class="absolute right-4 lg:right-10 bottom-40 px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl animate-float z-10 hidden md:block">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center"><PhMonitor class="w-4 h-4 text-white" /></div>
          <div>
            <div class="text-xs text-indigo-200 font-medium tracking-wider uppercase">{{ $t('hero.cards.it.label') }}</div>
            <div class="text-white font-bold text-sm text-[10px] leading-tight">{{ $t('hero.cards.it.desc') }}</div>
          </div>
        </div>
      </div>

      <div class="absolute right-20 top-44 px-5 py-3 bg-indigo-600/30 backdrop-blur-xl border border-indigo-400/30 rounded-2xl shadow-xl animate-float-delayed z-10 hidden lg:block">
        <div class="flex items-center space-x-3">
           <div class="w-8 h-8 rounded-full bg-indigo-400/20 flex items-center justify-center"><PhVideoCamera class="w-4 h-4 text-indigo-300" /></div>
           <div>
            <div class="text-xs text-indigo-300 font-medium tracking-wider uppercase">{{ $t('hero.cards.cctv.label') }}</div>
            <div class="text-white font-bold text-sm text-[10px] leading-tight">{{ $t('hero.cards.cctv.desc') }}</div>
          </div>
        </div>
      </div>

      <div class="absolute right-4 lg:right-6 bottom-16 px-5 py-3 bg-indigo-600/30 backdrop-blur-xl border border-indigo-400/30 rounded-2xl shadow-[0_0_40px_rgba(84,99,255,0.2)] animate-float-delayed z-10 hidden md:block">
        <div class="flex items-center space-x-3">
           <div class="w-8 h-8 rounded-full bg-indigo-400/20 flex items-center justify-center"><PhShieldCheck class="w-4 h-4 text-indigo-300" /></div>
           <div>
            <div class="text-xs text-indigo-300 font-medium tracking-wider uppercase">{{ $t('hero.cards.sla.label') }}</div>
            <div class="text-white font-bold text-sm">{{ $t('hero.cards.sla.desc') }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-[0]">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" class="relative block w-full h-24 sm:h-32 translate-y-1">
          <path d="M1200 0L0 120V120H1200V0Z" class="fill-gray-950"></path>
          <path d="M0 60L600 120L1200 60L1200 120L0 120V60Z" class="fill-gray-950 opacity-10"></path>
      </svg>
    </div>
  </header>
</template>
