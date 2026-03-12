<script setup lang="ts">
import ScrollFade from './ScrollFade.vue'
import { Users, Monitor, Settings, Server, Wifi, Video, Activity, Clock, Headset, ShieldCheck } from 'lucide-vue-next'

const includedServices = [
  { text: 'Поддержка пользователей', icon: Users },
  { text: 'Сопровождение ПК', icon: Monitor },
  { text: 'Принтеры и периферия', icon: Settings },
  { text: 'Сетевое оборудование', icon: Server },
  { text: 'Wi-Fi инфраструктура', icon: Wifi },
  { text: 'Видеонаблюдение', icon: Video },
  { text: 'Мониторинг сети', icon: Activity },
]
</script>

<template>
  <section class="py-24 bg-gray-950 border-t border-white/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        <ScrollFade direction="right">
          <div>
            <h2 class="text-3xl font-bold text-white mb-8">Что покрывает обслуживание?</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="srv in includedServices" :key="srv.text" class="flex items-center p-4 bg-gray-900/40 rounded-2xl border border-white/5 shadow-2xl hover:bg-gray-900/60 transition-colors backdrop-blur-sm group">
                <div class="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center mr-4 shrink-0 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                  <component :is="srv.icon" class="w-5 h-5 text-indigo-400" />
                </div>
                <span class="text-sm font-semibold text-slate-300 leading-tight">{{ srv.text }}</span>
              </div>
            </div>
          </div>
        </ScrollFade>

        <ScrollFade direction="left">
          <div class="bg-indigo-950/40 rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden w-full h-full border border-indigo-500/20 backdrop-blur-md group">
            <div class="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-[60px] group-hover:bg-indigo-500/30 transition-all duration-700"></div>
            <div class="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold rounded-lg mb-6 tracking-widest uppercase">Гарантии SLA</div>
            <h3 class="text-3xl font-bold mb-8">Строгий контроль качества</h3>
            <ul class="space-y-6 relative z-10">
              <li class="flex items-start">
                <Clock class="w-6 h-6 text-indigo-400 mr-4 shrink-0 mt-1" />
                <div>
                  <strong class="block text-lg mb-1">Регламентированное время реакции</strong>
                  <span class="text-sm text-indigo-200/60 leading-relaxed block">Определяется в зависимости от критичности инцидента.</span>
                </div>
              </li>
              <li class="flex items-start">
                <Headset class="w-6 h-6 text-indigo-400 mr-4 shrink-0 mt-1" />
                <div>
                  <strong class="block text-lg mb-1">Круглосуточная поддержка</strong>
                  <span class="text-sm text-indigo-200/60 leading-relaxed block">Удаленная помощь и мониторинг 24/7.</span>
                </div>
              </li>
              <li class="flex items-start">
                <ShieldCheck class="w-6 h-6 text-indigo-400 mr-4 shrink-0 mt-1" />
                <div>
                  <strong class="block text-lg mb-1">Выезды инженеров</strong>
                  <span class="text-sm text-indigo-200/60 leading-relaxed block">Для экстренного решения физических проблем на местах.</span>
                </div>
              </li>
            </ul>
          </div>
        </ScrollFade>

      </div>
    </div>
  </section>
</template>
