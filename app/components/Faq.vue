<script setup lang="ts">
import { PhPlus, PhMinus } from '@phosphor-icons/vue'
import { ref, computed } from 'vue'
import ScrollFade from './ScrollFade.vue'
import { useI18n } from '#imports'

const { tm, rt } = useI18n()

// We'll prioritize translations from the locale files for static FAQs
const faqs = computed(() => {
  const localizedFaqs = tm('faqs.items') as any[]
  if (localizedFaqs && localizedFaqs.length > 0) {
    return localizedFaqs
  }
  return []
})

const openIndex = ref<number | null>(0)

const toggleFaq = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section class="py-24 bg-gray-950 border-t border-white/5">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollFade>
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-sans font-bold text-white mb-6">{{ $t('faqs.title') }}</h2>
          <p class="text-slate-400">{{ $t('faqs.subtitle') }}</p>
        </div>
      </ScrollFade>
      
      <div class="space-y-4">
        <div v-if="faqs.length === 0" class="py-20 text-center">
          <p class="text-slate-600 font-bold uppercase tracking-widest text-xs">{{ $t('faqs.empty') }}</p>
        </div>
        <ScrollFade v-for="(faq, index) in faqs" :key="index" :delay="index * 100">
          <div class="bg-gray-900/40 rounded-3xl border border-white/5 overflow-hidden transition-all hover:bg-gray-900 shadow-2xl backdrop-blur-sm group">
            <button 
              @click="toggleFaq(index)"
              class="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none"
            >
              <span class="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">{{ rt(faq.question) }}</span>
              <div class="flex items-center space-x-4">
                <div class="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                  <PhPlus v-if="openIndex !== index" class="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
                  <PhMinus v-else class="w-4 h-4 text-indigo-400" />
                </div>
              </div>
            </button>
            <transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="transform -translate-y-4 opacity-0"
              enter-to-class="transform translate-y-0 opacity-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="transform translate-y-0 opacity-100"
              leave-to-class="transform -translate-y-4 opacity-0"
            >
              <div v-show="openIndex === index" class="px-8 pb-8">
                <div class="pt-2 text-slate-400 leading-relaxed border-t border-white/5 pt-6">
                  {{ rt(faq.answer) }}
                </div>
              </div>
            </transition>
          </div>
        </ScrollFade>
      </div>
    </div>
  </section>
</template>
