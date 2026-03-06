<script setup lang="ts">
import ScrollFade from './ScrollFade.vue'
import { Wifi, PhoneCall } from 'lucide-vue-next'

const targetAudience = [
  'Малый и средний бизнес', 'Офисные компании', 'Call-центры', 
  'Застройщики', 'Торговые сети', 'Сервисные компании', 'Производства'
]
</script>

<template>
  <section id="contact" class="pt-24 pb-12 bg-indigo-950 relative overflow-hidden">
    <!-- Dark bg glowing effects -->
    <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        <!-- Audience -->
        <ScrollFade direction="right">
          <div>
            <div class="inline-block px-3 py-1 bg-indigo-800/50 text-indigo-300 text-xs font-bold rounded mb-6 tracking-wide uppercase border border-indigo-500/30">Кому мы полезны</div>
            <h3 class="text-3xl font-bold text-white mb-8">Решения для любого масштаба</h3>
            <div class="flex flex-wrap gap-3">
              <span v-for="tag in targetAudience" :key="tag" class="px-5 py-2.5 bg-white/5 border border-white/10 text-indigo-100 text-sm font-medium rounded-full shadow-sm hover:bg-white/10 transition-colors cursor-default">
                {{ tag }}
              </span>
            </div>
          </div>
        </ScrollFade>
        
        <!-- Advantages -->
        <ScrollFade direction="left">
          <div>
            <div class="inline-block px-3 py-1 bg-indigo-800/50 text-indigo-300 text-xs font-bold rounded mb-6 tracking-wide uppercase border border-indigo-500/30">Почему мы</div>
            <h3 class="text-3xl font-bold text-white mb-8">Преимущества Optikom</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                <span class="block font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">Единый подрядчик</span>
                <span class="text-sm text-indigo-200/80 font-medium">Интернет и IT в одном окне</span>
              </div>
              <div class="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                <span class="block font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">Снижение простоев</span>
                <span class="text-sm text-indigo-200/80 font-medium">Проактивный мониторинг</span>
              </div>
              <div class="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                <span class="block font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">Фиксированная цена</span>
                <span class="text-sm text-indigo-200/80 font-medium">Прозрачная абон. плата</span>
              </div>
              <div class="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                <span class="block font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">Масштабируемость</span>
                <span class="text-sm text-indigo-200/80 font-medium">Рост без слома IT-ядра</span>
              </div>
            </div>
          </div>
        </ScrollFade>
      </div>

      <ScrollFade>
        <!-- Glassmorphism Form -->
        <div class="rounded-[2.5rem] p-10 md:p-16 bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden flex flex-col md:flex-row gap-12 items-center shadow-2xl">
          <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          
          <div class="md:w-1/2 relative z-10 w-full mb-8 md:mb-0">
             <h2 class="text-3xl md:text-5xl font-sans font-bold text-white mb-6 tracking-tight leading-tight">Обсудим вашу инфраструктуру?</h2>
             <p class="text-indigo-200/80 text-lg leading-relaxed mb-8">
               Оставьте заявку на первую консультацию. Передайте заботу об IT-ядре профессионалам и сфокусируйтесь на росте бизнеса.
             </p>
             <div class="flex items-center space-x-4">
               <!-- Phone -->
               <div class="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-400/30">
                 <PhoneCall class="w-5 h-5 text-indigo-300"/>
               </div>
               <div>
                 <div class="text-xs text-indigo-300 uppercase tracking-widest font-bold mb-1">Выделенная линия</div>
                 <a href="tel:+998710000000" class="text-xl font-bold text-white hover:text-indigo-400 transition-colors">+998 (71) 000-00-00</a>
               </div>
             </div>
          </div>

          <div class="md:w-1/2 relative z-10 w-full">
            <form @submit.prevent class="relative bg-black/10 p-8 rounded-[2rem] border border-white/5">
              <div class="space-y-4">
                <input type="text" placeholder="Имя / Название компании" class="w-full px-6 py-5 bg-white/10 border border-white/10 rounded-[1.25rem] focus:outline-none focus:border-indigo-400 focus:bg-white/15 transition-all text-white placeholder-indigo-100/40 text-sm backdrop-blur-md" />
                <input type="tel" placeholder="Ваш номер телефона" class="w-full px-6 py-5 bg-white/10 border border-white/10 rounded-[1.25rem] focus:outline-none focus:border-indigo-400 focus:bg-white/15 transition-all text-white placeholder-indigo-100/40 text-sm backdrop-blur-md" />
                <button type="submit" class="w-full px-6 py-5 mt-2 bg-indigo-500 text-white rounded-[1.25rem] font-bold hover:bg-indigo-400 transition-all shadow-[0_4px_20px_-5px_rgba(84,99,255,0.5)] hover:-translate-y-1">
                  Отправить заявку
                </button>
                <p class="text-center text-xs text-indigo-300/60 mt-4 leading-relaxed">Мы не рассылаем спам. Заполняя форму, вы соглашаетесь с условиями хранения данных.</p>
              </div>
            </form>
          </div>
        </div>
      </ScrollFade>

      <!-- Footer Bottom -->
      <div class="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-indigo-300/50">
        <div class="flex items-center space-x-2 mb-4 md:mb-0">
          <Wifi class="w-5 h-5 text-indigo-500/50" />
          <span class="tracking-widest uppercase">Optikom Business © 2026</span>
        </div>
        <div class="flex space-x-8">
          <a href="#" class="hover:text-indigo-300 transition-colors">Политика</a>
          <a href="#" class="hover:text-indigo-300 transition-colors">Соглашение</a>
        </div>
      </div>

    </div>
  </section>
</template>
