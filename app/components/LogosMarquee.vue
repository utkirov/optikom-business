<script setup lang="ts">
interface LogoItem {
  name: string
  image: string
}

const trustLogos: LogoItem[] = [
  { name: 'Salam School', image: '/images/logos/salam.png' },
  { name: 'Durable Beton', image: '/images/logos/durable.PNG' },
  { name: 'Nest One', image: '/images/logos/nestone.png' },
  { name: 'Ozguven', image: '/images/logos/ozguven.png' },
  { name: 'Grand Pharm', image: '/images/logos/grandpharm.png' },
  { name: 'PDP University', image: '/images/logos/pdp.png' },
  { name: 'Land House', image: '/images/logos/land.png' },
  { name: 'Jetour', image: '/images/logos/jetour.png' },
  { name: 'BTS', image: '/images/logos/bts.png' },
  { name: 'Salam School', image: '/images/logos/salam.png' },
  { name: 'Durable Beton', image: '/images/logos/durable.PNG' },
  { name: 'Nest One', image: '/images/logos/nestone.png' },
  { name: 'Ozguven', image: '/images/logos/ozguven.png' },
  { name: 'Grand Pharm', image: '/images/logos/grandpharm.png' },
  { name: 'PDP University', image: '/images/logos/pdp.png' },
  { name: 'Land House', image: '/images/logos/land.png' },
  { name: 'Jetour', image: '/images/logos/jetour.png' },
  { name: 'BTS', image: '/images/logos/bts.png' }
]
</script>

<template>
  <section class="py-10 bg-gray-950 relative z-20 border-b border-white/5 overflow-hidden">
    <div class="text-center mb-6">
      <p class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">{{ $t('logos.title') }}</p>
    </div>
    <div class="overflow-hidden w-full">
      <div class="flex min-w-max animate-scroll-left opacity-50 hover:opacity-100 transition-opacity duration-500" style="will-change: transform;">
        <div class="flex items-center gap-12 px-6">
          <img v-for="(logo, i) in trustLogos.slice(0, 9)" :key="i" :src="logo.image" :alt="logo.name" class="h-[24px] max-w-[100px] object-contain brightness-75 hover:brightness-100 transition-all duration-300 flex-shrink-0" />
        </div>
        <div class="flex items-center gap-12 px-6">
          <img v-for="(logo, i) in trustLogos.slice(9)" :key="i" :src="logo.image" :alt="logo.name" class="h-[24px] max-w-[100px] object-contain brightness-75 hover:brightness-100 transition-all duration-300 flex-shrink-0" />
        </div>
      </div>
    </div>
  </section>
</template>
