<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import LogosMarquee from './components/LogosMarquee.vue'
import About from './components/About.vue'
import BeforeAfter from './components/BeforeAfter.vue'
import Products from './components/Products.vue'
import Tariffs from './components/Tariffs.vue'
import ServicesSla from './components/ServicesSla.vue'
import Faq from './components/Faq.vue'
import ProcessEquipment from './components/ProcessEquipment.vue'
import ContactFooter from './components/ContactFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
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

    <!-- 7. Pricing / Tariffs -->
    <Tariffs />

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
