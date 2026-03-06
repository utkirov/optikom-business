<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { Wifi, Menu, X } from 'lucide-vue-next'

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 50)
const isMobileMenuOpen = ref(false)
</script>

<template>
  <div>
    <!-- Sticky Navbar -->
    <nav class="fixed top-0 w-full z-50 transition-all duration-300"
         :class="isScrolled ? 'bg-indigo-950/90 backdrop-blur-lg shadow-xl py-4 border-b border-indigo-500/20' : 'bg-transparent pt-6 pb-4'">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <Wifi class="w-6 h-6 text-indigo-400" />
          <span class="text-xl font-bold tracking-tight text-white italic">Optikom<span class="text-indigo-400">.Biz</span></span>
        </div>
        
        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
          <a href="#about" class="hover:text-white transition-colors">О нас</a>
          <a href="#products" class="hover:text-white transition-colors">Продукты</a>
          <a href="#tariffs" class="hover:text-white transition-colors">Тарифы</a>
          <a href="#process" class="hover:text-white transition-colors">Подключение</a>
          <div class="flex items-center space-x-4 pl-4 border-l border-white/10">
            <a href="#contact" class="px-5 py-2 bg-indigo-500/80 hover:bg-indigo-500 text-white rounded-full transition-all backdrop-blur-md border border-indigo-400/30 shadow-lg shadow-indigo-500/20">
              Получить консультацию
            </a>
          </div>
        </div>

        <!-- Mobile Menu Toggle -->
        <div class="md:hidden flex items-center">
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-slate-300 hover:text-white focus:outline-none p-2 relative z-50">
            <Menu v-if="!isMobileMenuOpen" class="w-7 h-7" />
            <X v-else class="w-7 h-7" />
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu Dropdown -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0"
      >
        <div v-show="isMobileMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-indigo-950/95 backdrop-blur-xl border-b border-indigo-500/20 shadow-2xl">
          <div class="px-4 py-6 flex flex-col space-y-4">
            <a href="#about" @click="isMobileMenuOpen = false" class="text-white font-medium text-lg hover:text-indigo-400 py-2 border-b border-white/5">О нас</a>
            <a href="#products" @click="isMobileMenuOpen = false" class="text-white font-medium text-lg hover:text-indigo-400 py-2 border-b border-white/5">Продукты</a>
            <a href="#tariffs" @click="isMobileMenuOpen = false" class="text-white font-medium text-lg hover:text-indigo-400 py-2 border-b border-white/5">Тарифы</a>
            <a href="#process" @click="isMobileMenuOpen = false" class="text-white font-medium text-lg hover:text-indigo-400 py-2 border-b border-white/5">Подключение</a>
            <a href="#contact" @click="isMobileMenuOpen = false" class="inline-flex justify-center mt-4 px-6 py-4 bg-indigo-500 hover:bg-indigo-400 text-white rounded-[1.25rem] font-bold transition-all shadow-[0_0_20px_rgba(84,99,255,0.3)] text-lg">
              Получить консультацию
            </a>
          </div>
        </div>
      </transition>
    </nav>
  </div>
</template>
