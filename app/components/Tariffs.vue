<script setup lang="ts">
import { PhGlobe, PhShieldCheck, PhCheckCircle } from '@phosphor-icons/vue'
import ScrollFade from './ScrollFade.vue'
import { useI18n } from '#imports'

const { tm, rt } = useI18n()

const tariffsInternet = computed(() => tm('tariffs.plans') as any[])
</script>

<template>
  <section id="tariffs" class="py-24 bg-gray-950 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
        <ScrollFade direction="right" class="md:w-1/2">
          <div>
            <h2 class="text-4xl md:text-5xl font-sans font-bold text-white mb-6 tracking-tight">{{ $t('tariffs.title') }}</h2>
            <p class="text-slate-400 text-lg">{{ $t('tariffs.subtitle') }}</p>
          </div>
        </ScrollFade>
        
        <ScrollFade direction="left" class="md:w-1/2 flex justify-center md:justify-end gap-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="p-6 bg-gray-900/50 rounded-2xl border border-white/5 shadow-lg hover:bg-gray-950 transition-colors">
              <PhGlobe class="w-8 h-8 text-indigo-500 mb-4" />
              <span class="font-bold text-slate-200 block text-sm sm:text-base">{{ $t('tariffs.features.internet') }}</span>
            </div>
            <div class="p-6 bg-gray-950/50 rounded-2xl border border-white/5 shadow-lg hover:bg-gray-950 transition-colors">
              <PhShieldCheck class="w-8 h-8 text-indigo-500 mb-4" />
              <span class="font-bold text-slate-200 block text-sm sm:text-base">{{ $t('tariffs.features.guarantee') }}</span>
            </div>
          </div>
        </ScrollFade>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ScrollFade v-for="(tariff, idx) in tariffsInternet" :key="idx" :delay="idx * 100" class="h-full">
          <div class="bg-gray-900/40 rounded-3xl p-8 border border-white/5 shadow-2xl h-full flex flex-col group hover:bg-gray-900/60 transition-colors relative overflow-hidden backdrop-blur-sm">
            <div class="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl -mr-8 -mt-8"></div>
            
            <div class="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold rounded-lg mb-4 tracking-widest uppercase">{{ $t('tariffs.type.internet') }}</div>
            <h3 class="text-xl font-bold text-white mb-6 leading-tight">{{ rt(tariff.name) }}</h3>
            
            <div class="mb-8">
              <div class="text-4xl font-black text-white mb-2">{{ tariff.mbps }}<span class="text-lg text-indigo-500 ml-1">{{ $t('tariffs.speed_unit') }}</span></div>
              <p class="text-slate-500 text-xs">{{ $t('tariffs.speed_desc') }}</p>
            </div>
            
            <ul class="space-y-3 mb-8 flex-grow">
              <li class="flex items-center text-sm text-slate-400">
                <PhCheckCircle class="w-4 h-4 text-emerald-400 mr-2 shrink-0" />
                <span>{{ $t('tariffs.items.traffic') }}</span>
              </li>
              <li class="flex items-center text-sm text-slate-400">
                <PhCheckCircle class="w-4 h-4 text-emerald-400 mr-2 shrink-0" />
                <span>{{ $t('tariffs.items.ip') }}</span>
              </li>
              <li class="flex items-center text-sm text-slate-400">
                <PhCheckCircle class="w-4 h-4 text-emerald-400 mr-2 shrink-0" />
                <span>{{ $t('tariffs.items.support') }}</span>
              </li>
            </ul>
            
            <a href="#contact" class="w-full py-4 bg-white/5 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-all border border-white/5 hover:border-indigo-400 flex items-center justify-center group-hover:scale-[1.02]">
              {{ $t('tariffs.button') }}
            </a>
          </div>
        </ScrollFade>
      </div>
    </div>
  </section>
</template>
