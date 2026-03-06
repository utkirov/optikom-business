<script setup lang="ts">
import ScrollFade from './ScrollFade.vue'
import { ArrowRight, Globe, Users, Server, Video } from 'lucide-vue-next'
</script>

<template>
  <section id="about" class="pt-24 pb-12 bg-white relative z-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollFade>
        <div class="bg-indigo-50 rounded-[2.5rem] p-10 md:p-16 shadow-lg border border-indigo-100 flex flex-col md:flex-row items-center gap-12 hover:shadow-xl transition-shadow">
          <div class="md:w-1/2">
            <div class="inline-block px-4 py-1.5 bg-indigo-200/50 text-indigo-800 rounded-full text-xs font-bold mb-6 tracking-wide uppercase">Внешний IT-отдел</div>
            <h2 class="text-3xl md:text-5xl font-sans font-bold text-slate-900 mb-6 tracking-tight leading-tight">Ваш полноценный IT-департамент по подписке</h2>
            <p class="text-slate-600 text-lg mb-8 leading-relaxed">
              Optikom Business — корпоративное направление компании, предоставляющее бизнесу управляемые IT и телеком услуги в формате единой абонентской модели. Мы снимаем с вас всю головную боль по инфраструктуре.
            </p>
            <a href="#process" class="inline-flex items-center text-indigo-600 font-bold hover:text-indigo-800 transition-colors group">
              Как мы работаем <ArrowRight class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div class="md:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-6 bg-white rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
              <Globe class="w-8 h-8 text-indigo-500 mb-4" />
              <span class="font-bold text-slate-800 block">Сеть и Интернет</span>
            </div>
            <div class="p-6 bg-white rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
              <Users class="w-8 h-8 text-indigo-500 mb-4" />
              <span class="font-bold text-slate-800 block">Поддержка ИТ</span>
            </div>
            <div class="p-6 bg-white rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
              <Server class="w-8 h-8 text-indigo-500 mb-4" />
              <span class="font-bold text-slate-800 block">Обслуживание ПК</span>
            </div>
            <div class="p-6 bg-white rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
              <Video class="w-8 h-8 text-indigo-500 mb-4" />
              <span class="font-bold text-slate-800 block">Видеонаблюдение</span>
            </div>
          </div>
        </div>
      </ScrollFade>
    </div>
  </section>
</template>
