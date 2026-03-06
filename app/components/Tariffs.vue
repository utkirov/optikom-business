<script setup lang="ts">
import ScrollFade from './ScrollFade.vue'
import { Globe, ShieldCheck } from 'lucide-vue-next'

const tariffsInternet = [
  { name: 'Opti Business Full 100', mbps: 100, type: 'Интернет' },
  { name: 'Opti Business Full 200', mbps: 200, type: 'Интернет' },
  { name: 'Opti Business Full 300', mbps: 300, type: 'Интернет' },
  { name: 'Opti Business Full 500+', mbps: 500, type: 'Интернет' },
]

const tariffsAllInclusive = [
  { name: 'Start Office', desc: 'Базовая поддержка для микроофисов', type: 'Всё включено' },
  { name: 'Business Office', desc: 'Управляемый IT и Wi-Fi для развивающихся команд', type: 'Всё включено' },
  { name: 'Corporate Office', desc: 'SLA инфраструктура, видеонаблюдение, резервирование', type: 'Всё включено' },
]
</script>

<template>
  <section id="tariffs" class="py-24 bg-white border-t border-indigo-50/50 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <ScrollFade>
        <div class="text-center mb-16">
          <div class="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold mb-4 tracking-wide uppercase">Гибкий выбор</div>
          <h2 class="text-3xl md:text-5xl font-sans font-bold text-slate-900 mb-6 tracking-tight">Тарифные решения</h2>
        </div>
      </ScrollFade>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <ScrollFade direction="right">
          <!-- Basic Internet Tariffs -->
          <div class="bg-indigo-50/50 rounded-[2.5rem] p-8 md:p-12 border border-indigo-100 relative h-full">
            <h3 class="text-2xl font-bold text-slate-900 mb-2 flex items-center"><Globe class="w-6 h-6 mr-3 text-indigo-500"/> Интернет (ISP)</h3>
            <p class="text-slate-500 mb-8 text-sm">Классические надежные каналы связи.</p>
            <div class="space-y-4">
              <div v-for="t in tariffsInternet" :key="t.name" class="flex justify-between items-center p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer">
                <span class="font-bold text-slate-800">{{ t.name }}</span>
                <span class="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg">{{ t.mbps }} Мбит/с</span>
              </div>
            </div>
          </div>
        </ScrollFade>

        <ScrollFade direction="left">
          <!-- All-inclusive / Managed IT Tariffs -->
          <div class="bg-indigo-950 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden h-full group">
            <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-indigo-500/30 transition-colors"></div>
            <h3 class="text-2xl font-bold text-white mb-2 flex items-center relative z-10"><ShieldCheck class="w-6 h-6 mr-3 text-indigo-400"/> Всё Включено</h3>
            <p class="text-indigo-200/80 mb-8 text-sm relative z-10">Интернет + Комплексный IT Аутсорсинг.</p>
            <div class="space-y-4 relative z-10">
              <div v-for="t in tariffsAllInclusive" :key="t.name" class="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-indigo-400/50 hover:bg-white/10 transition-all cursor-pointer">
                <h4 class="font-bold text-white text-lg mb-1">{{ t.name }}</h4>
                <p class="text-indigo-200 text-sm leading-relaxed">{{ t.desc }}</p>
              </div>
            </div>
            <a href="#contact" class="mt-8 block w-full text-center py-4 bg-indigo-500 text-white rounded-xl font-bold text-sm hover:bg-indigo-400 transition-all shadow-[0_0_20px_rgba(84,99,255,0.3)] hover:shadow-[0_0_30px_rgba(84,99,255,0.5)] hover:-translate-y-1 relative z-10">
              Подобрать пакет
            </a>
          </div>
        </ScrollFade>

      </div>
    </div>
  </section>
</template>
