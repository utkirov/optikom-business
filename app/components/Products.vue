<script setup lang="ts">
import { PhGlobe, PhDesktop, PhMonitor, PhVideoCamera, PhHardDrive, PhCheckCircle } from '@phosphor-icons/vue'
import ScrollFade from './ScrollFade.vue'
import { useI18n } from '#imports'

const { tm, rt } = useI18n()

// We'll use translations from the locale files
const productList = [
  { icon: PhGlobe, color: 'bg-indigo-500 text-white', key: 'internet' },
  { icon: PhDesktop, color: 'bg-indigo-600 text-white', key: 'office' },
  { icon: PhMonitor, color: 'bg-indigo-800 text-white', key: 'outsourcing' },
  { icon: PhVideoCamera, color: 'bg-slate-800 text-white', key: 'cctv' },
  { icon: PhHardDrive, color: 'bg-slate-900 text-white', key: 'extra' }
]
</script>

<template>
  <section id="products" class="py-24 bg-gray-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollFade>
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-sans font-bold text-white mb-6 tracking-tight">{{ $t('products.title') }}</h2>
          <p class="text-slate-400 max-w-2xl mx-auto">{{ $t('products.subtitle') }}</p>
        </div>
      </ScrollFade>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ScrollFade v-for="(product, idx) in productList" :key="product.key" :delay="idx * 100">
          <div class="rounded-3xl p-8 shadow-2xl transition-all hover:shadow-indigo-500/10 hover:-translate-y-2 relative overflow-hidden group h-full border border-white/5 backdrop-blur-sm"
               :class="product.color">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/10 transition-colors"></div>
            
            <component :is="product.icon" class="w-10 h-10 mb-6 opacity-90 group-hover:scale-110 transition-transform text-white" />
            <h3 class="text-2xl font-bold mb-6 tracking-tight text-white">{{ $t(`products.${product.key}.title`) }}</h3>
            <ul class="space-y-3">
              <li v-for="item in (tm(`products.${product.key}.items`) as any[])" :key="rt(item)" class="flex items-start text-sm text-white/80">
                <PhCheckCircle class="w-4 h-4 mr-2 mt-0.5 shrink-0 text-white/50" />
                <span>{{ rt(item) }}</span>
              </li>
            </ul>
          </div>
        </ScrollFade>
      </div>
    </div>
  </section>
</template>
