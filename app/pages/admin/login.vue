<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#app'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const router = useRouter()
const password = ref('')
const status = ref<'idle' | 'loading' | 'error'>('idle')
const errorMessage = ref('')

async function login() {
  if (!password.value) return
  status.value = 'loading'
  errorMessage.value = ''
  try {
    await $fetch('/api/admin/login', { method: 'POST', body: { password: password.value } })
    router.push('/admin')
  } catch (err: any) {
    status.value = 'error'
    errorMessage.value = err.data?.statusMessage || 'Неверный пароль'
  }
}
</script>

<template>
  <div class="min-h-screen relative flex items-center justify-center p-4 bg-gray-950 overflow-hidden">
    <!-- Animated Mesh Gradient Background -->
    <div class="absolute inset-0 z-0">
      <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 rounded-full blur-[120px] animate-blob"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
      <div class="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
    </div>

    <div class="w-full max-w-sm relative z-10">

      <!-- Logo/Brand Identity -->
      <div class="text-center mb-10 group">
        <div class="inline-flex w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl items-center justify-center shadow-2xl shadow-violet-500/20 mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/10">
          <PhShieldCheck class="w-8 h-8 text-white group-hover:animate-pulse-glow" />
        </div>
        <h1 class="text-3xl font-sans font-black text-white tracking-tight mb-2">Optikom Admin</h1>
        <p class="text-slate-500 text-sm font-medium tracking-wide">Управление корпоративной инфраструктурой</p>
      </div>

      <!-- Login Card -->
      <div class="bg-gray-900/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 shadow-2xl shadow-black/50">
        <form @submit.prevent="login" novalidate class="space-y-6">
          
          <!-- Password field -->
          <div class="space-y-2">
            <label class="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Пароль администратора</label>
            <div class="relative group/field">
              <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <PhLock class="w-4 h-4 text-slate-500 group-focus-within/field:text-violet-400 transition-colors" />
              </div>
              <input
                v-model="password"
                type="password"
                placeholder="••••••••"
                class="w-full pl-12 pr-4 py-4 bg-gray-950/50 border border-white/5 rounded-2xl text-white text-sm placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/40 transition-all backdrop-blur-sm"
                :disabled="status === 'loading'"
                required
              />
            </div>
          </div>

          <!-- Error Message -->
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
          >
            <div v-if="status === 'error'" class="flex items-center gap-3 text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-2xl text-xs font-bold ring-1 ring-red-500/10">
              <PhWarningCircle class="w-4 h-4 shrink-0" />
              <span>{{ errorMessage }}</span>
            </div>
          </transition>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="!password || status === 'loading'"
            class="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black rounded-2xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(84,99,255,0.2)] hover:shadow-[0_0_40px_rgba(84,99,255,0.3)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <PhCircleNotch v-if="status === 'loading'" class="w-5 h-5 animate-spin" />
            <span>{{ status === 'loading' ? 'Авторизация...' : 'Войти в панель' }}</span>
          </button>
        </form>
      </div>

      <div class="mt-10 flex flex-col items-center gap-2">
        <p class="text-slate-600 text-[10px] font-bold uppercase tracking-widest">&copy; 2026 Optikom Business</p>
        <div class="h-1 w-8 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite alternate ease-in-out;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
