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
  <section class="py-24 bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollFade>
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-slate-900 mb-4">Часто задаваемые вопросы</h2>
          <p class="text-slate-500">Отвечаем на главные вопросы об управляемом IT-сервисе.</p>
        </div>
        
        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="index" 
               class="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300"
               :class="faq.isOpen ? 'bg-indigo-50/30 shadow-md' : 'bg-white hover:border-indigo-300'">
            <button @click="toggleFaq(index)" class="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none">
              <span class="font-bold text-slate-800 pr-4">{{ faq.q }}</span>
              <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <Plus v-if="!faq.isOpen" class="w-4 h-4 text-indigo-600" />
                <Minus v-else class="w-4 h-4 text-indigo-600" />
              </div>
            </button>
            <div v-show="faq.isOpen" class="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
              {{ faq.a }}
            </div>
          </div>
        </div>
      </ScrollFade>
    </div>
  </section>
</template>
