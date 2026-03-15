<script setup lang="ts">
import { PhWifiHigh, PhTranslate, PhList, PhX } from '@phosphor-icons/vue'
import { ref, computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { useI18n } from '#imports'

const { y } = useWindowScroll()
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const isScrolled = computed(() => y.value > 50)
const isMobileMenuOpen = ref(false)
const showLangMenu = ref(false)
</script>

<template>
  <div>
    <!-- Sticky Navbar -->
    <nav class="fixed top-0 w-full z-50 transition-all duration-300"
         :class="isScrolled ? 'bg-indigo-950/90 backdrop-blur-lg shadow-xl py-4 border-b border-indigo-500/20' : 'bg-transparent pt-6 pb-4'">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="p-1.5 bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20">
            <PhWifiHigh class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold tracking-tight text-white">Optikom<span class="text-indigo-500">.Biz</span></span>
        </div>
        
        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
          <a href="#about" class="hover:text-white transition-colors">{{ t('nav.mission') }}</a>
          <a href="#products" class="hover:text-white transition-colors">{{ t('nav.projects') }}</a>
          <a href="#tariffs" class="hover:text-white transition-colors">{{ t('nav.services') }}</a>
          <a href="#process" class="hover:text-white transition-colors">{{ t('nav.questions') }}</a>
          
          <!-- Language Switcher -->
          <div class="relative ml-4">
            <button @click="showLangMenu = !showLangMenu" 
                    class="flex items-center space-x-1 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <PhTranslate class="w-3.5 h-3.5" />
              <span>{{ locale }}</span>
            </button>
            <div v-if="showLangMenu" 
                 class="absolute right-0 mt-2 w-32 bg-indigo-950 border border-white/10 rounded-xl shadow-2xl py-2 z-50 overflow-hidden">
              <NuxtLink v-for="l in locales" :key="l.code"
                      :to="switchLocalePath(l.code)"
                      @click="showLangMenu = false"
                      class="w-full text-left px-4 py-2 text-xs font-bold hover:bg-white/10 transition-colors flex items-center justify-between"
                      :class="locale === l.code ? 'text-indigo-400' : 'text-slate-300'">
                {{ l.name }}
                <div v-if="locale === l.code" class="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
              </NuxtLink>
            </div>
          </div>

          <div class="flex items-center space-x-4 pl-4 border-l border-white/10">
            <a href="#contact" class="px-5 py-2 bg-indigo-500/80 hover:bg-indigo-500 text-white rounded-full transition-all backdrop-blur-md border border-indigo-400/30 shadow-lg shadow-indigo-500/20">
              {{ $t('nav.contact') }}
            </a>
          </div>
        </div>

        <!-- Mobile Menu Toggle -->
        <div class="md:hidden flex items-center">
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-slate-300 hover:text-white focus:outline-none p-2 relative z-50">
            <PhList v-if="!isMobileMenuOpen" class="w-7 h-7" />
            <PhX v-else class="w-7 h-7" />
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
            <a href="#about" @click="isMobileMenuOpen = false" class="text-white font-medium text-lg hover:text-indigo-400 py-2 border-b border-white/5">{{ $t('nav.mission') }}</a>
            <a href="#products" @click="isMobileMenuOpen = false" class="text-white font-medium text-lg hover:text-indigo-400 py-2 border-b border-white/5">{{ $t('nav.projects') }}</a>
            <a href="#tariffs" @click="isMobileMenuOpen = false" class="text-white font-medium text-lg hover:text-indigo-400 py-2 border-b border-white/5">{{ $t('nav.services') }}</a>
            <a href="#process" @click="isMobileMenuOpen = false" class="text-white font-medium text-lg hover:text-indigo-400 py-2 border-b border-white/5">{{ $t('nav.questions') }}</a>
            <a href="#contact" @click="isMobileMenuOpen = false" class="inline-flex justify-center mt-4 px-6 py-4 bg-indigo-500 hover:bg-indigo-400 text-white rounded-[1.25rem] font-bold transition-all shadow-[0_0_20px_rgba(84,99,255,0.3)] text-lg">
              {{ $t('nav.contact') }}
            </a>
          </div>
        </div>
      </transition>
    </nav>
  </div>
</template>
