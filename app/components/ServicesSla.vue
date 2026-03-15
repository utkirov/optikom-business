<script setup lang="ts">
import { PhUsers, PhMonitor, PhPrinter, PhDesktop, PhWifiHigh, PhVideoCamera, PhActivity, PhClock, PhHeadset, PhShieldCheck } from '@phosphor-icons/vue'
import ScrollFade from './ScrollFade.vue'
import { useI18n } from '#imports'

const { tm, rt } = useI18n()

const serviceItems = [
  { key: 'users', icon: PhUsers },
  { key: 'pc', icon: PhMonitor },
  { key: 'printers', icon: PhPrinter },
  { key: 'servers', icon: PhDesktop },
  { key: 'wifi', icon: PhWifiHigh },
  { key: 'cctv', icon: PhVideoCamera },
  { key: 'monitoring', icon: PhActivity }
]
</script>

<template>
  <section class="py-24 bg-gray-950 border-t border-white/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        <ScrollFade direction="right">
          <div>
            <h2 class="text-3xl font-bold text-white mb-8">{{ $t('sla.title') }}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="srv in serviceItems" :key="srv.key" class="flex items-center p-4 bg-gray-900/40 rounded-2xl border border-white/5 shadow-2xl hover:bg-gray-900/60 transition-colors backdrop-blur-sm group">
                <div class="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center mr-4 shrink-0 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                  <component :is="srv.icon" class="w-5 h-5 text-indigo-400" />
                </div>
                <span class="text-sm font-semibold text-slate-300 leading-tight">{{ $t(`sla.items.${srv.key}`) }}</span>
              </div>
            </div>
          </div>
        </ScrollFade>

        <ScrollFade direction="left">
          <div class="bg-indigo-950/40 rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden w-full h-full border border-indigo-500/20 backdrop-blur-md group">
            <div class="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-[60px] group-hover:bg-indigo-500/30 transition-all duration-700"></div>
            <div class="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold rounded-lg mb-6 tracking-widest uppercase">{{ $t('sla.badge') }}</div>
            <h3 class="text-3xl font-bold mb-8">{{ $t('sla.subtitle') }}</h3>
            <ul class="space-y-6 relative z-10">
              <li class="flex items-start">
                <PhClock class="w-6 h-6 text-indigo-400 mr-4 shrink-0 mt-1" />
                <div>
                  <strong class="block text-lg mb-1">{{ $t('sla.features.reaction.title') }}</strong>
                  <span class="text-sm text-indigo-200/60 leading-relaxed block">{{ $t('sla.features.reaction.desc') }}</span>
                </div>
              </li>
              <li class="flex items-start">
                <PhHeadset class="w-6 h-6 text-indigo-400 mr-4 shrink-0 mt-1" />
                <div>
                  <strong class="block text-lg mb-1">{{ $t('sla.features.support.title') }}</strong>
                  <span class="text-sm text-indigo-200/60 leading-relaxed block">{{ $t('sla.features.support.desc') }}</span>
                </div>
              </li>
              <li class="flex items-start">
                <PhShieldCheck class="w-6 h-6 text-indigo-400 mr-4 shrink-0 mt-1" />
                <div>
                  <strong class="block text-lg mb-1">{{ $t('sla.features.engineers.title') }}</strong>
                  <span class="text-sm text-indigo-200/60 leading-relaxed block">{{ $t('sla.features.engineers.desc') }}</span>
                </div>
              </li>
            </ul>
          </div>
        </ScrollFade>

      </div>
    </div>
  </section>
</template>
