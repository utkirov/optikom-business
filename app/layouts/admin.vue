<script setup lang="ts">
import { useRouter, useCookie } from '#app'
import { computed } from 'vue'
import { PhShieldCheck, PhArrowSquareOut, PhSignOut } from '@phosphor-icons/vue'

const router = useRouter()
const loggedInFlag = useCookie('admin_logged_in')
const isLoggedIn = computed(() => !!loggedInFlag.value)

async function logout() {
  await $fetch('/api/admin/logout', { method: 'POST' })
  loggedInFlag.value = null
  router.push('/admin/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-slate-200 font-sans antialiased selection:bg-violet-500/30 selection:text-white">
    
    <!-- Header -->
    <header class="sticky top-0 z-[100] bg-gray-950/40 backdrop-blur-3xl border-b border-white/5 shadow-[0_1px_20px_rgba(0,0,0,0.5)]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        <!-- Branding -->
        <div class="flex items-center gap-4 group cursor-default">
          <div class="w-11 h-11 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-xl shadow-violet-500/20 border border-white/10 transition-transform group-hover:scale-105 duration-500">
            <PhShieldCheck class="w-6 h-6 text-white" />
          </div>
          <div class="flex flex-col -space-y-1">
            <span class="text-lg font-black text-white tracking-tight uppercase">Optikom</span>
            <span class="text-[10px] font-black text-violet-400 tracking-[0.3em] uppercase">Admin panel</span>
          </div>
        </div>

        <!-- Utility Navigation -->
        <div class="flex items-center gap-3">
          <NuxtLink 
            to="/" 
            target="_blank" 
            class="hidden sm:inline-flex items-center gap-2.5 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-white px-4 py-2.5 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5"
          >
            <PhArrowSquareOut class="w-3.5 h-3.5" />
            Перейти на сайт
          </NuxtLink>

          <div v-if="isLoggedIn" class="h-8 w-px bg-white/5 mx-2"></div>

          <button 
            v-if="isLoggedIn" 
            @click="logout" 
            class="inline-flex items-center gap-2.5 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-red-400 px-4 py-2.5 rounded-xl hover:bg-red-500/5 transition-all border border-transparent hover:border-red-500/10"
          >
            <PhSignOut class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span class="hidden md:inline">Выйти</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="max-w-6xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
      <slot />
    </main>

    <!-- Global Footer -->
    <footer class="max-w-6xl mx-auto px-4 sm:px-6 py-8 border-t border-white/5 mt-auto">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">© 2026 CMS v2.0 Built for Optikom Business</p>
        <div class="flex items-center gap-6">
          <a href="#" class="text-slate-600 hover:text-violet-400 transition-colors text-[10px] uppercase font-black tracking-widest">Support</a>
          <a href="#" class="text-slate-600 hover:text-violet-400 transition-colors text-[10px] uppercase font-black tracking-widest">Guide</a>
        </div>
      </div>
    </footer>
  </div>
</template>
