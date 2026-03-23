<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '../stores/settings'
import { useSeoMeta } from '#app'
import Navbar from '../components/Navbar.vue'
import Hero from '../components/Hero.vue'
import LogosMarquee from '../components/LogosMarquee.vue'
import About from '../components/About.vue'
import BeforeAfter from '../components/BeforeAfter.vue'
import Products from '../components/Products.vue'
import TariffCalculator from '../components/TariffCalculator.vue'
import ServicesSla from '../components/ServicesSla.vue'
import Faq from '../components/Faq.vue'
import MapComponent from '../components/MapComponent.vue'
import ProcessEquipment from '../components/ProcessEquipment.vue'
import ContactFooter from '../components/ContactFooter.vue'
import ScrollToTop from '../components/ScrollToTop.vue'

const { t, locale } = useI18n()

const localeToOg: Record<string, string> = { ru: 'ru_RU', uz: 'uz_UZ', en: 'en_US' }

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  ogType: 'website',
  ogUrl: 'https://optikom.biz',
  ogLocale: () => localeToOg[locale.value] || 'ru_RU',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.title'),
  twitterDescription: () => t('seo.description'),
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
    <MapComponent />

    <!-- 11. Target, Advantages & Lead Form / Footer -->
    <ContactFooter />

    <!-- Scroll to top -->
    <ScrollToTop />
  </div>
</template>

<style>
/* Smooth scroll & Sticky header offset */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 6rem;
}
</style>
