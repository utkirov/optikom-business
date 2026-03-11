<script setup lang="ts">
useSeoMeta({
  title: 'Политика конфиденциальности — Optikom Business',
  description: 'Политика обработки и хранения персональных данных пользователей сервиса Optikom Business.',
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
      <h1 class="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Политика конфиденциальности</h1>
      <p class="text-slate-400 text-sm mb-10">Последнее обновление: март 2026 г.</p>

      <div class="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-3">1. Общие положения</h2>
          <p>
            Настоящая Политика конфиденциальности определяет порядок сбора, обработки и хранения
            персональных данных пользователей сайта <strong>Optikom Business</strong>
            (далее — «Сайт»). Используя Сайт, вы соглашаетесь с условиями данной Политики.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-3">2. Какие данные мы собираем</h2>
          <p>При заполнении формы обратной связи мы можем запрашивать:</p>
          <ul class="list-disc pl-6 mt-2 space-y-1">
            <li>Имя или название компании</li>
            <li>Контактный номер телефона</li>
          </ul>
          <p class="mt-3">
            Сайт также может автоматически собирать технические данные: IP-адрес, тип браузера,
            страницы посещений — исключительно в целях улучшения работы Сайта.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-3">3. Цели обработки данных</h2>
          <ul class="list-disc pl-6 space-y-1">
            <li>Обработка входящих заявок и обратная связь с потенциальными клиентами</li>
            <li>Предоставление запрошенных услуг</li>
            <li>Улучшение качества сервиса</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-3">4. Передача данных третьим лицам</h2>
          <p>
            Мы не продаём, не обмениваем и не передаём ваши персональные данные третьим лицам
            без вашего согласия, за исключением случаев, предусмотренных законодательством
            Республики Узбекистан.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-3">5. Cookies</h2>
          <p>
            Сайт может использовать файлы Cookie для улучшения пользовательского опыта.
            Вы можете отключить их в настройках браузера, однако это может повлиять
            на работу некоторых функций Сайта.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-3">6. Хранение данных</h2>
          <p>
            Персональные данные хранятся на защищённых серверах и не дольше, чем это необходимо
            для достижения целей обработки. По вашему письменному запросу данные могут быть
            удалены из нашей системы.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-3">7. Контакты</h2>
          <p>
            По вопросам, связанным с обработкой персональных данных, обращайтесь:<br />
            <a href="mailto:privacy@optikom.biz" class="text-indigo-600 hover:underline">privacy@optikom.biz</a>
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
