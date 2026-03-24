<script setup lang="ts">
const trustLogos = [
  'Salam School', 'Durable Beton', 'Nest One', 'Ozguven', 'Grand Pharm', 'Mercedes Benz', 'PDP University', 'Jetour', 'Tayota', 'Land House', 'China House',
  'Salam School', 'Durable Beton', 'Nest One', 'Ozguven', 'Grand Pharm', 'Mercedes Benz', 'PDP University', 'Jetour', 'Tayota', 'Land House', 'China House'
]
</script>

<template>
  <section class="py-10 bg-gray-950 relative z-20 border-b border-white/5 overflow-hidden">
    <div class="text-center mb-6">
      <p class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">{{ $t('logos.title') }}</p>
    </div>
    <div class="overflow-hidden w-full">
    <div class="flex w-[200%] animate-scroll-left opacity-30 hover:opacity-100 transition-opacity duration-500" style="will-change: transform;">
      <div class="w-1/2 flex justify-around items-center px-4">
        <span v-for="(logo, i) in trustLogos.slice(0, 7)" :key="i" class="text-xl font-bold font-serif text-slate-400 brightness-75 hover:brightness-100 transition-all">{{ logo }}</span>
      </div>
      <div class="w-1/2 flex justify-around items-center px-4">
        <span v-for="(logo, i) in trustLogos.slice(7)" :key="i" class="text-xl font-bold font-serif text-slate-400 brightness-75 hover:brightness-100 transition-all">{{ logo }}</span>
      </div>
    </div>
    </div>
  </section>
</template>
