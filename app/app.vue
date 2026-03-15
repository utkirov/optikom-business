<script setup lang="ts">
import { useSettingsStore } from './stores/settings'
const store = useSettingsStore()
const { data: settings } = await useAsyncData('site-settings', () => $fetch('/api/settings'))
if (settings.value) {
  store.settings = settings.value
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
  50% { box-shadow: 0 0 20px 2px rgba(79, 70, 229, 0.3); }
}

@keyframes reveal-up {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s infinite ease-in-out;
}

.animate-glow-pulse {
  animation: glow-pulse 3s infinite ease-in-out;
}

.reveal-up {
  animation: reveal-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* Base interactive transitions */
.btn-hover-scale {
  @apply transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97];
}

.card-hover-glow {
  @apply transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1;
}

/* Nuxt Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
