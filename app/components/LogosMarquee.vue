<script setup lang="ts">
const trustLogos = [
  'TechCorp', 'InnovaGroup', 'BuildPro', 'RetailMax', 'CallCenter Уз', 'FactoryLife', 'GlobalLogistics',
  'TechCorp', 'InnovaGroup', 'BuildPro', 'RetailMax', 'CallCenter Уз', 'FactoryLife', 'GlobalLogistics'
]
</script>

<template>
  <section class="py-10 bg-slate-50 relative z-20 border-b border-indigo-100/50 overflow-hidden">
    <div class="text-center mb-6">
      <p class="text-xs font-bold uppercase tracking-widest text-slate-400">Нам доверяют корпорации и малый бизнес</p>
    </div>
    <div class="flex w-[200%] animate-scroll-left opacity-60 hover:opacity-100 transition-opacity">
      <div class="w-1/2 flex justify-around items-center px-4">
        <span v-for="(logo, i) in trustLogos.slice(0, 7)" :key="i" class="text-xl font-bold font-serif text-slate-400">{{ logo }}</span>
      </div>
      <div class="w-1/2 flex justify-around items-center px-4">
        <span v-for="(logo, i) in trustLogos.slice(7)" :key="i" class="text-xl font-bold font-serif text-slate-400">{{ logo }}</span>
      </div>
    </div>
  </section>
</template>
