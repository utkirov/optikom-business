<script setup lang="ts">
import { ref } from 'vue'
import ScrollFade from './ScrollFade.vue'
import { Plus, Minus } from 'lucide-vue-next'

const faqs = ref([
  {
    q: 'У нас уже есть свой системный администратор. Зачем нам Optikom?',
    a: 'Мы не обязательно заменяем вашего сисадмина. Мы можем взять на себя рутину: поддержку пользователей, мониторинг сети и резервирование каналов, чтобы ваш специалист сфокусировался на развитии IT-архитектуры бизнеса.',
    isOpen: true
  },
  {
    q: 'Если пропадет интернет, как быстро вы решите проблему?',
    a: 'Корпоративные тарифы включают SLA с гарантированным временем реакции от 15 минут. Благодаря резервированию каналов, обрыв на одной линии пройдет для вас незаметно — трафик автоматически перейдет на запасную.',
    isOpen: false
  },
  {
    q: 'Предоставляете ли вы оборудование в аренду?',
    a: 'Да, во многих пакетах "Всё включено" мы используем собственные Enterprise-роутеры и коммутаторы, снимая с вас капитальные затраты.',
    isOpen: false
  },
  {
    q: 'Что будет, если мы забудем оплатить счет?',
    a: 'Абонентская плата фиксирована, без скрытых платежей. Если вы забыли оплатить — мы предоставляем "доверительный платеж" в 1 клик, чтобы ваш офис не остался без связи в критический момент.',
    isOpen: false
  }
])

const toggleFaq = (index: number) => {
  if (faqs.value[index]) {
    faqs.value[index].isOpen = !faqs.value[index].isOpen
  }
}
</script>

<template>
  <section class="py-24 bg-gray-950 border-t border-white/5">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollFade>
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-white mb-4">Часто задаваемые вопросы</h2>
          <p class="text-slate-400">Отвечаем на главные вопросы об управляемом IT-сервисе.</p>
        </div>
        
        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="index" 
               class="border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-sm"
               :class="faq.isOpen ? 'bg-indigo-950/20 shadow-2xl border-indigo-500/20' : 'bg-gray-900/40 hover:border-indigo-500/30'">
            <button @click="toggleFaq(index)" class="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none group">
              <span class="font-bold text-slate-200 pr-4 transition-colors group-hover:text-white">{{ faq.q }}</span>
              <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/10 transition-colors"
                   :class="faq.isOpen ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-gray-950 text-slate-500 group-hover:border-indigo-500/50 group-hover:text-indigo-400'">
                <Plus v-if="!faq.isOpen" class="w-4 h-4" />
                <Minus v-else class="w-4 h-4" />
              </div>
            </button>
            <div v-show="faq.isOpen" class="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
              {{ faq.a }}
            </div>
          </div>
        </div>
      </ScrollFade>
    </div>
  </section>
</template>
