<script setup lang="ts">
import { PhXCircle, PhWarning, PhCheckCircle } from '@phosphor-icons/vue'
import ScrollFade from './ScrollFade.vue'
</script>

<template>
  <section class="py-16 bg-gray-950 border-t border-white/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollFade>
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-white mb-4">{{ $t('beforeAfter.title') }}</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="p-8 rounded-3xl bg-gray-900/40 border border-white/5 backdrop-blur-sm group">
            <div class="flex items-center space-x-3 mb-6 transition-transform group-hover:scale-105">
              <div class="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20"><PhXCircle class="w-5 h-5 text-red-500"/></div>
              <h3 class="text-xl font-bold text-slate-400 uppercase tracking-wider text-sm">{{ $t('beforeAfter.before.title') }}</h3>
            </div>
            <ul class="space-y-4">
              <li v-for="(item, index) in ($tm('beforeAfter.before.items') as any[])" :key="index" class="flex items-start text-slate-500">
                <PhWarning class="w-5 h-5 text-slate-600 mr-3 shrink-0" /> {{ $rt(item) }}
              </li>
            </ul>
          </div>
          
          <div class="p-8 rounded-3xl bg-indigo-950/40 text-white relative overflow-hidden shadow-2xl border border-indigo-500/20 backdrop-blur-md group">
            <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[60px] group-hover:bg-indigo-500/20 transition-all duration-700"></div>
            <div class="flex items-center space-x-3 mb-6 relative z-10 transition-transform group-hover:scale-105">
              <div class="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shadow-lg shadow-indigo-500/10"><PhCheckCircle class="w-5 h-5 text-indigo-400"/></div>
              <h3 class="text-xl font-bold text-white uppercase tracking-wider text-sm">{{ $t('beforeAfter.after.title') }}</h3>
            </div>
            <ul class="space-y-4 relative z-10">
              <li v-for="(item, index) in ($tm('beforeAfter.after.items') as any[])" :key="index" class="flex items-start text-indigo-200/80 font-medium">
                <PhCheckCircle class="w-5 h-5 text-indigo-400 mr-3 shrink-0" /> {{ $rt(item) }}
              </li>
            </ul>
          </div>
        </div>
      </ScrollFade>
    </div>
  </section>
</template>
