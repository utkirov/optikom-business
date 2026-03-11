<script setup lang="ts">
useSeoMeta({
  title: 'Пользовательское соглашение — Optikom Business',
  description: 'Условия использования сервисов и сайта Optikom Business.',
  robots: 'noindex, follow',
})
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
        <span>На главную</span>
      </NuxtLink>
    </div>

    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 class="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Пользовательское соглашение</h1>
      <p class="text-slate-400 text-sm mb-10">Последнее обновление: март 2026 г.</p>

      <div class="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-3">1. Предмет соглашения</h2>
          <p>
            Настоящее Пользовательское соглашение регулирует отношения между
            <strong>Optikom Business</strong> (корпоративное направление ООО «Optikom»)
            и пользователем Сайта, возникающие при использовании данного Сайта и его сервисов.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-3">2. Принятие условий</h2>
          <p>
            Используя Сайт, вы подтверждаете, что прочитали, поняли и принимаете условия
            настоящего соглашения. Если вы не согласны с какими-либо условиями,
            пожалуйста, прекратите использование Сайта.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-3">3. Использование Сайта</h2>
          <p>Пользователь обязуется:</p>
          <ul class="list-disc pl-6 mt-2 space-y-1">
            <li>Не использовать Сайт в незаконных или мошеннических целях</li>
            <li>Не нарушать нормальную работу Сайта или его инфраструктуры</li>
            <li>Предоставлять достоверную информацию при заполнении форм</li>
            <li>Не копировать и не распространять материалы Сайта без разрешения</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-3">4. Интеллектуальная собственность</h2>
          <p>
            Все материалы, размещённые на Сайте (тексты, изображения, логотипы, дизайн),
            являются собственностью <strong>Optikom Business</strong> и защищены законодательством
            об интеллектуальной собственности Республики Узбекистан.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-3">5. Заявки и услуги</h2>
          <p>
            Заявка, оставленная через форму на Сайте, не является публичной офертой и
            не влечёт автоматического заключения договора. Коммерческое предложение
            формируется индивидуально после согласования условий с менеджером.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-3">6. Ограничение ответственности</h2>
          <p>
            Сайт предоставляется «как есть». Optikom Business не несёт ответственности
            за перебои в работе Сайта, вызванные техническими причинами,
            действиями третьих лиц или форс-мажорными обстоятельствами.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-3">7. Изменение условий</h2>
          <p>
            Optikom Business оставляет за собой право в любое время вносить изменения
            в настоящее соглашение. Актуальная версия всегда доступна на данной странице.
            Продолжение использования Сайта после публикации изменений означает
            ваше согласие с ними.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-3">8. Применимое право</h2>
          <p>
            Настоящее соглашение регулируется законодательством Республики Узбекистан.
            Все споры решаются в судебном порядке по месту нахождения Optikom Business.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-3">9. Контакты</h2>
          <p>
            По вопросам, связанным с данным соглашением, обращайтесь:<br />
            <a href="mailto:legal@optikom.biz" class="text-indigo-600 hover:underline">legal@optikom.biz</a>
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
          <span>На главную</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Footer mini -->
    <div class="bg-indigo-950 py-6 text-center text-indigo-300/50 text-xs">
      © 2026 Optikom Business
    </div>
  </div>
</template>
