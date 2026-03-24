<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const target = ref(null)
const isVisible = ref(false)

const props = defineProps({
  delay: {
    type: Number,
    default: 0
  },
  direction: {
    type: String, // 'up', 'down', 'left', 'right'
    default: 'up'
  }
})

useIntersectionObserver(
  target,
  (entries) => {
    if (entries[0]?.isIntersecting) {
      isVisible.value = true
    }
  },
  { threshold: 0.1 }
)

const directionClass: Record<string, string> = {
  'up': 'translate-y-12',
  'down': '-translate-y-12',
  'left': 'translate-x-12',
  'right': '-translate-x-12'
}
</script>

<template>
  <div 
    ref="target"
    class="transition-all duration-1000 ease-out"
    :class="[
      isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${directionClass[direction]}`
    ]"
    :style="`transition-delay: ${delay}ms`"
  >
    <slot />
  </div>
</template>
