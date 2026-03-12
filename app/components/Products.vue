<script setup lang="ts">
import ScrollFade from './ScrollFade.vue'
import { Globe, Server, Monitor, Video, HardDrive, CheckCircle2 } from 'lucide-vue-next'

const products = [
  {
    title: 'Интернет для бизнеса',
    items: ['Стабильный симметричный канал', 'Гарантированная скорость', 'Статические IP', 'Резервирование линий', 'SLA 99.9%', 'Классические тарифы'],
    icon: Globe,
    color: 'bg-indigo-500 text-white'
  },
  {
    title: 'Управляемый IT-офис',
    items: ['Интернет + IT сопровождение', 'Поддержка пользователей (Helpdesk)', 'Обслуживание ПК и принтеров', 'Wi-Fi и локальная сеть', 'Мониторинг инфраструктуры', 'Полная замена системного администратора'],
    icon: Server,
    color: 'bg-indigo-600 text-white'
  },
  {
    title: 'IT аутсорсинг',
    items: ['Поддержка оборудования клиента', 'Обслуживание инфраструктуры', 'Регулярные выезды инженеров', 'Удалённая поддержка 24/7'],
    icon: Monitor,
    color: 'bg-indigo-800 text-white'
  },
  {
    title: 'Видеонаблюдение',
    items: ['Проектирование систем', 'Профессиональный монтаж', 'Регулярное сопровождение', 'Защищенный удалённый доступ'],
    icon: Video,
    color: 'bg-slate-800 text-white'
  },
  {
    title: 'Дополнительные сервисы',
    items: ['Резервное копирование (Backup)', 'Облачные решения', 'Резервный интернет канал'],
    icon: HardDrive,
    color: 'bg-slate-900 text-white'
  }
]
</script>

<template>
  <section id="products" class="py-24 bg-gray-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollFade>
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-sans font-bold text-white mb-6 tracking-tight">Экосистема продуктов</h2>
          <p class="text-slate-400 max-w-2xl mx-auto">Комплексные инфраструктурные решения для компаний любого размера.</p>
        </div>
      </ScrollFade>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ScrollFade v-for="(product, idx) in products" :key="product.title" :delay="idx * 100">
          <div class="rounded-3xl p-8 shadow-2xl transition-all hover:shadow-indigo-500/10 hover:-translate-y-2 relative overflow-hidden group h-full border border-white/5 backdrop-blur-sm"
               :class="product.color">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/10 transition-colors"></div>
            
            <component :is="product.icon" class="w-10 h-10 mb-6 opacity-90 group-hover:scale-110 transition-transform text-white" />
            <h3 class="text-2xl font-bold mb-6 tracking-tight text-white">{{ product.title }}</h3>
            <ul class="space-y-3">
              <li v-for="item in product.items" :key="item" class="flex items-start text-sm text-white/80">
                <CheckCircle2 class="w-4 h-4 mr-2 mt-0.5 shrink-0 text-white/50" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </ScrollFade>
      </div>
    </div>
  </section>
</template>
