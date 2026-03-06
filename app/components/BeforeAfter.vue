<script setup lang="ts">
import ScrollFade from './ScrollFade.vue'
import { AlertTriangle, XCircle, CheckCircle2 } from 'lucide-vue-next'
</script>

<template>
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollFade>
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-slate-900 mb-4">Жизнь до и после Optikom</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Before -->
          <div class="p-8 rounded-3xl bg-slate-50 border border-slate-200">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"><XCircle class="w-5 h-5 text-red-500"/></div>
              <h3 class="text-xl font-bold text-slate-900">Обычный офис</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex items-start text-slate-600"><AlertTriangle class="w-5 h-5 text-slate-400 mr-3 shrink-0" /> Медленный интернет в часы пик</li>
              <li class="flex items-start text-slate-600"><AlertTriangle class="w-5 h-5 text-slate-400 mr-3 shrink-0" /> Сисадмин постоянно занят</li>
              <li class="flex items-start text-slate-600"><AlertTriangle class="w-5 h-5 text-slate-400 mr-3 shrink-0" /> Роутеры зависают (нужно перезагружать)</li>
              <li class="flex items-start text-slate-600"><AlertTriangle class="w-5 h-5 text-slate-400 mr-3 shrink-0" /> Разные счета за интернет, камеры и сервера</li>
            </ul>
          </div>
          
          <!-- After -->
          <div class="p-8 rounded-3xl bg-indigo-950 text-white relative overflow-hidden shadow-2xl">
            <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[60px]"></div>
            <div class="flex items-center space-x-3 mb-6 relative z-10">
              <div class="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center"><CheckCircle2 class="w-5 h-5 text-indigo-400"/></div>
              <h3 class="text-xl font-bold text-white">IT с Optikom Business</h3>
            </div>
            <ul class="space-y-4 relative z-10">
              <li class="flex items-start text-indigo-200"><CheckCircle2 class="w-5 h-5 text-indigo-400 mr-3 shrink-0" /> Стабильная скорость 24/7 + резервирование</li>
              <li class="flex items-start text-indigo-200"><CheckCircle2 class="w-5 h-5 text-indigo-400 mr-3 shrink-0" /> Мгновенная реакция поддержки (от 15 мин)</li>
              <li class="flex items-start text-indigo-200"><CheckCircle2 class="w-5 h-5 text-indigo-400 mr-3 shrink-0" /> Enterprise-оборудование (без подвисаний)</li>
              <li class="flex items-start text-indigo-200"><CheckCircle2 class="w-5 h-5 text-indigo-400 mr-3 shrink-0" /> Единый прозрачный счет (всё включено)</li>
            </ul>
          </div>
        </div>
      </ScrollFade>
    </div>
  </section>
</template>
