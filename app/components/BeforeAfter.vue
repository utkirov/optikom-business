<script setup lang="ts">
import ScrollFade from './ScrollFade.vue'
import { AlertTriangle, XCircle, CheckCircle2 } from 'lucide-vue-next'
</script>

<template>
  <section class="py-16 bg-gray-950 border-t border-white/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollFade>
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-white mb-4">Жизнь до и после Optikom</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Before -->
          <div class="p-8 rounded-3xl bg-gray-900/40 border border-white/5 backdrop-blur-sm group">
            <div class="flex items-center space-x-3 mb-6 transition-transform group-hover:scale-105">
              <div class="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20"><XCircle class="w-5 h-5 text-red-500"/></div>
              <h3 class="text-xl font-bold text-slate-400 uppercase tracking-wider text-sm">Обычный офис</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex items-start text-slate-500"><AlertTriangle class="w-5 h-5 text-slate-600 mr-3 shrink-0" /> Медленный интернет в часы пик</li>
              <li class="flex items-start text-slate-500"><AlertTriangle class="w-5 h-5 text-slate-600 mr-3 shrink-0" /> Сисадмин постоянно занят</li>
              <li class="flex items-start text-slate-500"><AlertTriangle class="w-5 h-5 text-slate-600 mr-3 shrink-0" /> Роутеры зависают (нужно перезагружать)</li>
              <li class="flex items-start text-slate-500"><AlertTriangle class="w-5 h-5 text-slate-600 mr-3 shrink-0" /> Разные счета за интернет, камеры и сервера</li>
            </ul>
          </div>
          
          <!-- After -->
          <div class="p-8 rounded-3xl bg-indigo-950/40 text-white relative overflow-hidden shadow-2xl border border-indigo-500/20 backdrop-blur-md group">
            <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[60px] group-hover:bg-indigo-500/20 transition-all duration-700"></div>
            <div class="flex items-center space-x-3 mb-6 relative z-10 transition-transform group-hover:scale-105">
              <div class="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shadow-lg shadow-indigo-500/10"><CheckCircle2 class="w-5 h-5 text-indigo-400"/></div>
              <h3 class="text-xl font-bold text-white uppercase tracking-wider text-sm">IT с Optikom Business</h3>
            </div>
            <ul class="space-y-4 relative z-10">
              <li class="flex items-start text-indigo-200/80 font-medium"><CheckCircle2 class="w-5 h-5 text-indigo-400 mr-3 shrink-0" /> Стабильная скорость 24/7 + резервирование</li>
              <li class="flex items-start text-indigo-200/80 font-medium"><CheckCircle2 class="w-5 h-5 text-indigo-400 mr-3 shrink-0" /> Мгновенная реакция поддержки (от 15 мин)</li>
              <li class="flex items-start text-indigo-200/80 font-medium"><CheckCircle2 class="w-5 h-5 text-indigo-400 mr-3 shrink-0" /> Enterprise-оборудование (без подвисаний)</li>
              <li class="flex items-start text-indigo-200/80 font-medium"><CheckCircle2 class="w-5 h-5 text-indigo-400 mr-3 shrink-0" /> Единый прозрачный счет (всё включено)</li>
            </ul>
          </div>
        </div>
      </ScrollFade>
    </div>
  </section>
</template>
