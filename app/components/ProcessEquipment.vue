<script setup lang="ts">
import ScrollFade from './ScrollFade.vue'
import { Settings } from 'lucide-vue-next'

const connectionSteps = [
  { step: 1, title: 'Консультация', desc: 'Определяем ваши задачи и боли' },
  { step: 2, title: 'IT аудит', desc: 'Изучаем текущую инфраструктуру' },
  { step: 3, title: 'Подбор решения', desc: 'Формируем тариф и SLA' },
  { step: 4, title: 'Подключение', desc: 'Монтаж и настройка оборудования' },
  { step: 5, title: 'Запуск поддержки', desc: 'Берем ваш офис на мониторинг 24/7' },
]
</script>

<template>
  <section id="process" class="py-24 bg-slate-50 border-y border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollFade>
        <h2 class="text-3xl font-bold text-slate-900 mb-16 text-center">Как происходит подключение</h2>
      </ScrollFade>
      
      <div class="relative">
        <div class="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-indigo-50">
          <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-50"></div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
          <ScrollFade v-for="(step, idx) in connectionSteps" :key="step.step" :delay="idx * 150">
            <div class="relative group">
              <div class="w-12 h-12 rounded-full bg-white border-4 border-indigo-100 group-hover:border-indigo-500 shadow-lg flex items-center justify-center font-bold text-slate-800 mb-6 transition-colors mx-auto md:mx-0 group-hover:scale-110">
                {{ step.step }}
              </div>
              <div class="text-center md:text-left">
                <h4 class="font-bold text-slate-900 mb-2">{{ step.title }}</h4>
                <p class="text-sm text-slate-500 leading-relaxed">{{ step.desc }}</p>
              </div>
            </div>
          </ScrollFade>
        </div>
      </div>

      <ScrollFade :delay="300">
        <div class="mt-20 max-w-4xl mx-auto p-6 md:p-8 bg-white rounded-3xl border border-slate-100 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
           <div class="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
             <Settings class="w-8 h-8 text-slate-400" />
           </div>
           <div>
             <h4 class="font-bold text-slate-900 text-lg mb-2">Политика по оборудованию</h4>
             <p class="text-sm text-slate-600 leading-relaxed max-w-2xl">
               Оборудование предоставляется клиентом, либо возможна поставка через Optikom Business. 
               <br/><span class="text-indigo-600 font-medium">Важно:</span> Физический ремонт устройств осуществляется авторизованными сервисными центрами и не входит в зону нашей ответственности.
             </p>
           </div>
        </div>
      </ScrollFade>

    </div>
  </section>
</template>
