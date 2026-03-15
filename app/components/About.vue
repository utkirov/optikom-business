<script setup lang="ts">
import { PhArrowRight, PhGlobe, PhUsers, PhMonitor, PhVideoCamera } from '@phosphor-icons/vue'
import ScrollFade from './ScrollFade.vue'
</script>

<template>
  <section id="about" class="pt-24 pb-12 bg-gray-950 relative z-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollFade>
        <div class="bg-gray-900/50 rounded-[2.5rem] p-8 md:p-16 shadow-2xl border border-white/5 flex flex-col md:flex-row items-center gap-12 group hover:border-indigo-500/20 transition-all duration-500 backdrop-blur-sm">
          <div class="md:w-1/2">
            <div class="inline-block px-4 py-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">{{ $t('about.badge') }}</div>
            <h2 class="text-3xl md:text-5xl font-sans font-bold text-white mb-6 tracking-tight leading-tight">{{ $t('about.title') }}</h2>
            <p class="text-slate-400 text-lg mb-8 leading-relaxed">
              {{ $t('about.description') }}
            </p>
            <a href="#process" class="inline-flex items-center text-indigo-400 font-bold hover:text-indigo-300 transition-colors group/link">
              {{ $t('about.link') }} <PhArrowRight class="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform" />
            </a>
          </div>
          <div class="md:w-1/2 w-full grid grid-cols-2 gap-4">
            <div class="p-6 bg-gray-950/50 rounded-2xl border border-white/5 shadow-lg group-hover:bg-gray-950 transition-colors">
              <PhGlobe class="w-8 h-8 text-indigo-500 mb-4" />
              <span class="font-bold text-slate-200 block text-sm sm:text-base">{{ $t('about.services.network') }}</span>
            </div>
            <div class="p-6 bg-gray-950/50 rounded-2xl border border-white/5 shadow-lg group-hover:bg-gray-950 transition-colors">
              <PhUsers class="w-8 h-8 text-indigo-500 mb-4" />
              <span class="font-bold text-slate-200 block text-sm sm:text-base">{{ $t('about.services.support') }}</span>
            </div>
            <div class="p-6 bg-gray-950/50 rounded-2xl border border-white/5 shadow-lg group-hover:bg-gray-950 transition-colors">
              <PhMonitor class="w-8 h-8 text-indigo-500 mb-4" />
              <span class="font-bold text-slate-200 block text-sm sm:text-base">{{ $t('about.services.pc') }}</span>
            </div>
            <div class="p-6 bg-gray-950/50 rounded-2xl border border-white/5 shadow-lg group-hover:bg-gray-950 transition-colors">
              <PhVideoCamera class="w-8 h-8 text-indigo-500 mb-4" />
              <span class="font-bold text-slate-200 block text-sm sm:text-base">{{ $t('about.services.cctv') }}</span>
            </div>
          </div>
        </div>
      </ScrollFade>
    </div>
  </section>
</template>
