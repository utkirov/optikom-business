<script setup lang="ts">
import { PhGear, PhGlobe, PhHardDrive, PhShieldCheck, PhInfinity } from '@phosphor-icons/vue'
import { computed } from 'vue'
import ScrollFade from './ScrollFade.vue'
import { useI18n } from '#imports'

const { tm, rt } = useI18n()

const connectionSteps = computed(() => tm('process.steps') as any[])
</script>

<template>
  <section id="process" class="py-24 bg-gray-950 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="flex flex-col items-center mb-16">
        <ScrollFade>
          <div class="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-400/20 rounded-full text-indigo-400 text-xs font-black tracking-widest uppercase mb-6">{{ $t('process.badge') }}</div>
        </ScrollFade>
        <ScrollFade :delay="100">
          <h2 class="text-3xl md:text-5xl font-sans font-bold text-white text-center tracking-tight mb-4">{{ $t('process.title') }}</h2>
        </ScrollFade>
        <ScrollFade :delay="200">
          <p class="text-slate-400 text-center max-w-xl">{{ $t('process.subtitle') }}</p>
        </ScrollFade>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-20 px-4">
        <ScrollFade :delay="100" class="flex flex-col items-center group">
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20 mb-4 shadow-lg shadow-indigo-500/10">
              <PhGear class="w-8 h-8 text-indigo-400 animate-spin-slow" />
            </div>
            <span class="font-bold text-white text-lg tracking-tight text-center">{{ $t('process.features.solutions.title') }}</span>
            <p class="text-xs text-slate-500 mt-1 max-w-[120px] text-center">{{ $t('process.features.solutions.desc') }}</p>
          </div>
        </ScrollFade>
        <ScrollFade :delay="200" class="flex flex-col items-center group">
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-4">
              <PhGlobe class="w-8 h-8 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            </div>
            <span class="font-bold text-white text-lg tracking-tight text-center">{{ $t('process.features.transit.title') }}</span>
            <p class="text-xs text-slate-500 mt-1 max-w-[120px] text-center">{{ $t('process.features.transit.desc') }}</p>
          </div>
        </ScrollFade>
        <ScrollFade :delay="300" class="flex flex-col items-center group">
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-4">
              <PhHardDrive class="w-8 h-8 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            </div>
            <span class="font-bold text-white text-lg tracking-tight text-center">{{ $t('process.features.hardware.title') }}</span>
            <p class="text-xs text-slate-500 mt-1 max-w-[120px] text-center">{{ $t('process.features.hardware.desc') }}</p>
          </div>
        </ScrollFade>
        <ScrollFade :delay="400" class="flex flex-col items-center group">
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-4">
              <PhShieldCheck class="w-8 h-8 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            </div>
            <span class="font-bold text-white text-lg tracking-tight text-center">{{ $t('process.features.security.title') }}</span>
            <p class="text-xs text-slate-500 mt-1 max-w-[120px] text-center">{{ $t('process.features.security.desc') }}</p>
          </div>
        </ScrollFade>
        <ScrollFade :delay="500" class="flex flex-col items-center group col-span-2 md:col-span-1">
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-4">
              <PhInfinity class="w-8 h-8 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            </div>
            <span class="font-bold text-white text-lg tracking-tight text-center">{{ $t('process.features.support.title') }}</span>
            <p class="text-xs text-slate-500 mt-1 max-w-[120px] text-center">{{ $t('process.features.support.desc') }}</p>
          </div>
        </ScrollFade>
      </div>

      <div class="relative">
        <div class="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <ScrollFade v-for="(step, idx) in connectionSteps" :key="idx" :delay="idx * 150">
            <div class="relative z-10 group">
              <div class="w-20 h-20 bg-gray-900 border border-white/5 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:border-indigo-500/50 transition-all shadow-2xl relative">
                <div class="absolute -inset-2 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition-all"></div>
                <span class="text-3xl font-black text-indigo-500 group-hover:text-white transition-colors">{{ idx + 1 }}</span>
              </div>
              <h3 class="text-xl font-bold text-white text-center mb-2">{{ rt(step.title) }}</h3>
              <p class="text-sm text-slate-500 text-center leading-relaxed">{{ rt(step.desc) }}</p>
            </div>
          </ScrollFade>
        </div>
      </div>
    </div>
  </section>
</template>
