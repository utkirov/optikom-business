<script setup lang="ts">
const { t, tm, rt } = useI18n()

useSeoMeta({
  title: () => t('privacy.title') + ' — Optikom Business',
  description: () => t('seo.description'),
  robots: 'noindex, follow',
})

const sections = tm('privacy.sections') as Record<string, any>
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 font-sans">
    <!-- Header bar -->
    <div class="bg-indigo-950 py-4 px-6 flex items-center space-x-3">
      <NuxtLink
        to="/"
        class="flex items-center space-x-2 text-indigo-300 hover:text-white transition-colors text-sm font-medium"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        <span>{{ $t('privacy.home') }}</span>
      </NuxtLink>
    </div>

    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 class="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{{ $t('privacy.title') }}</h1>
      <p class="text-slate-400 text-sm mb-10">{{ $t('privacy.updated') }}</p>

      <div class="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">
        <section v-for="(section, key) in sections" :key="key">
          <h2 class="text-xl font-bold text-slate-800 mb-3">{{ rt(section.title) }}</h2>
          <p v-if="section.text" v-html="rt(section.text)"></p>
          <ul v-if="section.list" class="list-disc pl-6 mt-2 space-y-1">
            <li v-for="(item, i) in section.list" :key="i">{{ rt(item) }}</li>
          </ul>
          <p v-if="section.subtext" class="mt-3" v-html="rt(section.subtext)"></p>
          <p v-if="key === 's7'" class="mt-2 text-indigo-600 font-medium">
            <a href="mailto:privacy@optikom.biz" class="hover:underline">privacy@optikom.biz</a>
          </p>
        </section>
      </div>

      <div class="mt-12 pt-8 border-t border-slate-200">
        <NuxtLink
          to="/"
          class="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-950 text-white rounded-full font-medium hover:bg-indigo-800 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          <span>{{ $t('privacy.home') }}</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Footer mini -->
    <div class="bg-indigo-950 py-6 text-center text-indigo-300/50 text-xs">
      © 2026 Optikom Business
    </div>
  </div>
</template>
