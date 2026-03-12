<script setup lang="ts">
import { useFetch, useSeoMeta } from '#app'
import Navbar from '../components/Navbar.vue'
import Hero from '../components/Hero.vue'
import LogosMarquee from '../components/LogosMarquee.vue'
import About from '../components/About.vue'
import BeforeAfter from '../components/BeforeAfter.vue'
import Products from '../components/Products.vue'
import TariffCalculator from '../components/TariffCalculator.vue'
import ServicesSla from '../components/ServicesSla.vue'
import Faq from '../components/Faq.vue'
import ProcessEquipment from '../components/ProcessEquipment.vue'
import ContactFooter from '../components/ContactFooter.vue'

const { data: settings } = await useFetch('/api/settings', { key: 'site-settings' })

useSeoMeta({
  title: () => settings.value?.seo?.title || 'Optikom Business — IT и связь для бизнеса под ключ',
  description: () => settings.value?.seo?.description || 'Управляемые IT и телеком услуги для бизнеса: интернет, IT-аутсорсинг, видеонаблюдение, SLA-поддержка 24/7. Единый подрядчик для вашего офиса в Узбекистане.',
  ogTitle: () => settings.value?.seo?.title || 'Optikom Business — IT и связь для бизнеса',
  ogDescription: () => settings.value?.seo?.description || 'Интернет, внешняя IT-поддержка, обслуживание инфраструктуры и корпоративные решения в формате единой абонентской услуги.',
  ogType: 'website',
  ogUrl: 'https://optikom.biz',
  twitterCard: 'summary_large_image',
  twitterTitle: () => settings.value?.seo?.title || 'Optikom Business — IT и связь для бизнеса',
  twitterDescription: () => settings.value?.seo?.description || 'Управляемые IT и телеком услуги. Единый подрядчик для вашего офиса.',
  robots: 'index, follow',
})
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
    <!-- 1. Navigation -->
    <Navbar />

    <!-- 2. Hero Section -->
    <Hero />

    <!-- 3. Social Proof -->
    <LogosMarquee />

    <!-- 4. About Direction -->
    <About />

    <!-- 5. Pain Points Resolution -->
    <BeforeAfter />

    <!-- 6. Ecosystem / Products -->
    <Products />

    <!-- 7. Dynamic Pricing Calculator & Comparison -->
    <TariffCalculator />

    <!-- 8. Included Services & SLA Guarantee -->
    <ServicesSla />

    <!-- 9. Objections handler -->
    <Faq />

    <!-- 10. Funnel Steps & Equipment Policy -->
    <ProcessEquipment />

    <!-- 11. Target, Advantages & Lead Form / Footer -->
    <ContactFooter />
  </div>
</template>

<style>
/* Smooth scroll & Sticky header offset */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 6rem;
}
</style>
