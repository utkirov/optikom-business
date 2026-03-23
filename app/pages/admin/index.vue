<script setup lang="ts">
import { ref, watch } from 'vue'
import { PhLayout, PhGear, PhKey, PhMagnifyingGlass, PhGlobe as PhGlobeIcon, PhLock } from '@phosphor-icons/vue'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: settings, pending, refresh } = await useFetch('/api/settings')
const { data: leads, refresh: refreshLeads } = await useFetch<any[]>('/api/admin/leads')

const form = ref<any>(null)
watch(settings, (v) => {
  if (v) form.value = JSON.parse(JSON.stringify(v))
}, { immediate: true })

const activeTab = ref('hero')
const status = ref<'idle' | 'saving' | 'saved' | 'error'>('idle')
const errorMessage = ref('')

const tabs = [
  { id: 'hero',     label: 'Главный экран',     icon: PhLayout },
  { id: 'tariffs',  label: 'Тарифы и услуги',   icon: PhGear },
  { id: 'content',  label: 'Контент и FAQ',    icon: PhKey },
  { id: 'leads',    label: 'Заявки',           icon: PhMagnifyingGlass },
  { id: 'contacts', label: 'SEO и Контакты',   icon: PhGlobeIcon },
  { id: 'security', label: 'Безопасность',    icon: PhLock },
]

const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
})

async function deleteLead(id: string) {
  if (!confirm('Удалить эту заявку? Данные будут удалены без возможности восстановления.')) return
  await $fetch('/api/admin/leads', { method: 'DELETE', body: { id } })
  await refreshLeads()
}

async function changePassword() {
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    status.value = 'error'
    errorMessage.value = 'Пароли не совпадают'
    return
  }

  status.value = 'saving'
  try {
    await $fetch('/api/admin/change-password', {
      method: 'POST',
      body: {
        currentPassword: passwordForm.value.current,
        newPassword: passwordForm.value.new
      }
    })
    status.value = 'saved'
    passwordForm.value = { current: '', new: '', confirm: '' }
    setTimeout(() => { status.value = 'idle' }, 3000)
  } catch (err: any) {
    status.value = 'error'
    errorMessage.value = err.data?.statusMessage || 'Ошибка смены пароля'
  }
}

async function saveSettings() {
  status.value = 'saving'
  errorMessage.value = ''
  try {
    await $fetch('/api/settings', { method: 'POST', body: form.value })
    status.value = 'saved'
    setTimeout(() => { status.value = 'idle' }, 3000)
    await refresh()
  } catch (err: any) {
    status.value = 'error'
    errorMessage.value = err.data?.statusMessage || 'Ошибка сохранения'
  }
}

function addSpeed() {
  form.value.tariffs.internetSpeeds.push({ id: 'speed_' + Date.now(), label: '', basePrice: 0, isPopular: false })
}
function removeSpeed(i: any) { form.value.tariffs.internetSpeeds.splice(i, 1) }
function addService() {
  form.value.tariffs.extraServices.push({ id: 'svc_' + Date.now(), label: '', price: 0, icon: 'PhCheck' })
}
function removeService(i: any) { form.value.tariffs.extraServices.splice(i, 1) }
</script>

<template>
  <!-- Loading -->
  <div v-if="pending" class="flex flex-col justify-center items-center h-[60vh] gap-4">
    <div class="relative w-12 h-12">
      <div class="absolute inset-0 border-4 border-violet-500/20 rounded-full"></div>
      <div class="absolute inset-0 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <span class="text-slate-500 text-sm font-black tracking-widest uppercase animate-pulse">Загрузка данных...</span>
  </div>

  <div v-else-if="form" class="max-w-6xl mx-auto">
    <!-- Page header -->
    <div class="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-white/5">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600/10 border border-violet-500/20 text-violet-400 text-[10px] font-black uppercase tracking-wider mb-3">
          <PhShieldCheck class="w-2.5 h-2.5" /> CMS v2.0
        </div>
        <h1 class="text-3xl font-sans font-black text-white tracking-tight">Панель управления</h1>
        <p class="text-slate-500 text-sm font-medium mt-1">Персонализация контента в реальном времени</p>
      </div>

      <div class="flex items-center gap-4">
        <a href="/" target="_blank" class="px-5 py-2.5 bg-gray-900 border border-white/5 rounded-xl text-slate-300 text-xs font-bold hover:bg-gray-800 transition-all flex items-center gap-2">
          Посмотреть сайт <PhArrowRight class="w-3.5 h-3.5" />
        </a>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">

      <!-- ─── Sidebar ─── -->
      <aside class="w-full lg:w-64 shrink-0">
        <nav class="sticky top-[81px] lg:top-24 z-40 bg-gray-950/80 backdrop-blur-xl -mx-4 px-4 py-3 lg:mx-0 lg:px-0 lg:py-0 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible scrollbar-hide border-b border-white/5 lg:border-none">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'group flex items-center gap-3 px-5 py-3.5 rounded-2xl text-[13px] font-black whitespace-nowrap transition-all border outline-none',
              activeTab === tab.id
                ? 'bg-violet-600/10 text-violet-400 border-violet-500/30 shadow-xl shadow-violet-900/10'
                : 'text-slate-500 border-transparent hover:text-slate-300 hover:bg-white/5'
            ]"
          >
            <component :is="tab.icon" class="w-4.5 h-4.5 shrink-0 transition-all duration-300" :class="activeTab === tab.id ? 'scale-110 text-violet-400' : 'group-hover:scale-110'" />
            <span class="tracking-wide uppercase tracking-[0.05em]">{{ tab.label }}</span>
          </button>
        </nav>
      </aside>

      <!-- ─── Content ─── -->
      <div class="flex-1 min-w-0 pb-32">

        <!-- HERO TAB -->
        <div v-if="activeTab === 'hero'" class="space-y-6">
          <div class="bg-gray-900/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl">
            <div class="flex items-center gap-4 mb-10">
              <div class="w-12 h-12 bg-violet-600/10 rounded-2xl flex items-center justify-center border border-violet-500/20">
                <PhLayout class="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h2 class="text-xl font-black text-white tracking-tight">Hero секция</h2>
                <p class="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-0.5">Первое впечатление пользователя</p>
              </div>
            </div>

            <div class="space-y-8">
              <div class="space-y-3">
                <label class="admin-label">Заголовок (H1)</label>
                <textarea v-model="form.hero.title" rows="2" class="admin-input resize-none" placeholder="Введите заголовок..."></textarea>
                <p class="text-[10px] text-slate-600 px-1 italic">Поддерживает HTML теги (например, &lt;span class="text-indigo-500"&gt;...&lt;/span&gt;)</p>
              </div>

              <div class="space-y-3">
                <label class="admin-label">Описание</label>
                <textarea v-model="form.hero.description" rows="3" class="admin-input resize-none" placeholder="Краткое описание преимуществ..."></textarea>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="space-y-3">
                  <label class="admin-label">Текст кнопки</label>
                  <input type="text" v-model="form.hero.buttonText" class="admin-input" placeholder="Кнопка действия" />
                </div>
                <div class="space-y-3">
                  <label class="admin-label">Ссылка кнопки</label>
                  <input type="text" v-model="form.hero.buttonLink" class="admin-input" placeholder="#anchor или URL" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TARIFFS TAB -->
        <div v-if="activeTab === 'tariffs'" class="space-y-8">

          <!-- Internet Speeds -->
          <div class="bg-gray-900/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
             <!-- decorative glow -->
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-violet-600/5 rounded-full blur-[40px]"></div>

            <div class="flex items-center justify-between mb-10">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-emerald-600/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                  <PhLightning class="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h2 class="text-xl font-black text-white tracking-tight">Скорости интернета</h2>
                  <p class="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-0.5">Конфигурация пропускной способности</p>
                </div>
              </div>
              <button @click="addSpeed" class="admin-btn-add group">
                <PhPlus class="w-4 h-4 group-hover:rotate-90 transition-transform" /> <span>Добавить опцию</span>
              </button>
            </div>

            <div class="space-y-4">
              <transition-group name="list">
                <div
                  v-for="(speed, idx) in form.tariffs.internetSpeeds" :key="speed.id"
                  class="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 bg-gray-950/40 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors group"
                >
                  <div class="flex-[3]">
                    <label class="admin-label-sm">Название плана</label>
                    <input type="text" v-model="speed.label" class="admin-input-sm" placeholder="например, 100 Мбит/с" />
                  </div>
                  <div class="flex-[2]">
                    <label class="admin-label-sm">Цена в месяц (сум)</label>
                    <input type="number" min="0" v-model.number="speed.basePrice" class="admin-input-sm" />
                  </div>
                  <div class="flex items-center gap-4 pb-1 sm:h-[42px]">
                    <label class="flex items-center gap-3 px-3 py-2 bg-gray-950/80 border border-white/5 rounded-xl cursor-pointer hover:bg-violet-900/10 transition-colors">
                      <input type="checkbox" v-model="speed.isPopular" class="w-4 h-4 accent-violet-500 rounded-md border-white/10" />
                      <span class="text-[10px] font-black uppercase text-slate-500 tracking-wider">ХИТ</span>
                    </label>
                    <button @click="removeSpeed(idx)" class="admin-btn-delete group/del" title="Удалить">
                      <PhTrash class="w-4.5 h-4.5 group-hover/del:scale-110" />
                    </button>
                  </div>
                </div>
              </transition-group>
            </div>
          </div>

          <!-- IT Service Base -->
          <div class="bg-gray-900/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div class="flex items-center gap-4 mb-10">
              <div class="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                <PhGear class="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h2 class="text-xl font-black text-white tracking-tight">IT Обслуживание</h2>
                <p class="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-0.5">Базовые параметры аутсорсинга</p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div class="space-y-3">
                <label class="admin-label">Цена за 1 ПК (сум)</label>
                <div class="relative">
                  <input type="number" min="0" v-model.number="form.tariffs.itServiceBasePrice" class="admin-input pr-16" />
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-700">UZS</span>
                </div>
              </div>
              <div class="space-y-3">
                <label class="admin-label">Наценка Premium SLA (%)</label>
                <div class="relative">
                  <input type="number" min="0" max="100" v-model.number="form.tariffs.slaPremiumMargin" class="admin-input pr-16" />
                  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-700">%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Extra Services -->
          <div class="bg-gray-900/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl">
            <div class="flex items-center justify-between mb-10">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-violet-600/10 rounded-2xl flex items-center justify-center border border-violet-500/20">
                  <PhPlus class="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h2 class="text-xl font-black text-white tracking-tight">Доп. услуги</h2>
                  <p class="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-0.5">Опциональные модули</p>
                </div>
              </div>
              <button @click="addService" class="admin-btn-add group">
                <PhPlus class="w-4 h-4 group-hover:rotate-90 transition-transform" /> <span>Добавить модуль</span>
              </button>
            </div>

            <div class="grid grid-cols-1 gap-4">
              <transition-group name="list">
                <div
                  v-for="(svc, idx) in form.tariffs.extraServices" :key="svc.id"
                  class="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 bg-gray-950/40 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors"
                >
                  <div class="flex-[3]">
                    <label class="admin-label-sm">Название услуги</label>
                    <input type="text" v-model="svc.label" class="admin-input-sm" />
                  </div>
                  <div class="flex-[1.5]">
                    <label class="admin-label-sm">Стоимость (сум)</label>
                    <input type="number" min="0" v-model.number="svc.price" class="admin-input-sm" />
                  </div>
                  <div class="flex-1">
                    <label class="admin-label-sm">Иконка</label>
                    <div class="relative">
                      <input type="text" v-model="svc.icon" class="admin-input-sm pl-9" placeholder="PhWifi" />
                      <div class="absolute left-2.5 top-1/2 -translate-y-1/2 text-violet-400 opacity-50">
                        <PhMonitor class="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div class="pt-1 sm:h-[42px] flex items-center">
                    <button @click="removeService(idx)" class="admin-btn-delete group/del" title="Удалить">
                      <PhTrash class="w-4.5 h-4.5 group-hover/del:scale-110" />
                    </button>
                  </div>
                </div>
              </transition-group>
            </div>
          </div>
        </div>

        <!-- CONTENT TAB -->
        <div v-if="activeTab === 'content'" class="space-y-8">
          <div class="bg-gray-900/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl">
            <h3 class="admin-label mb-6">Целевая аудитория</h3>
            <div class="flex flex-wrap gap-2 mb-4">
              <div v-for="(tag, idx) in form.content.audiences" :key="idx" class="flex items-center gap-2 bg-gray-950 border border-white/5 px-3 py-2 rounded-xl">
                <input v-model="form.content.audiences[idx]" class="bg-transparent text-xs text-white border-none focus:ring-0 w-32" />
                <button @click="form.content.audiences.splice(idx, 1)" class="text-red-500 hover:text-red-400">
                  <PhTrash class="w-3.5 h-3.5" />
                </button>
              </div>
              <button @click="form.content.audiences.push('')" class="px-3 py-2 bg-violet-600/10 text-violet-400 border border-violet-500/20 rounded-xl text-xs font-black">
                + Добавить
              </button>
            </div>
          </div>

          <div class="bg-gray-900/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl">
            <h3 class="admin-label mb-6">FAQ (Вопросы и ответы)</h3>
            <div class="space-y-4">
              <div v-for="(item, idx) in form.content.faq" :key="idx" class="bg-gray-950/50 border border-white/5 p-5 rounded-2xl relative group">
                <button @click="form.content.faq.splice(idx, 1)" class="absolute top-4 right-4 text-slate-700 hover:text-red-500 transition-colors">
                  <PhTrash class="w-4 h-4" />
                </button>
                <div class="space-y-4">
                  <div>
                    <label class="admin-label-sm">Вопрос</label>
                    <input v-model="item.q" class="admin-input-sm" />
                  </div>
                  <div>
                    <label class="admin-label-sm">Ответ</label>
                    <textarea v-model="item.a" class="admin-input-sm h-20 resize-none"></textarea>
                  </div>
                </div>
              </div>
              <button @click="form.content.faq.push({ q: '', a: '' })" class="w-full py-4 bg-violet-600/10 text-violet-400 border border-violet-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                + Добавить вопрос
              </button>
            </div>
          </div>
        </div>

        <!-- LEADS TAB -->
        <div v-if="activeTab === 'leads'" class="space-y-6">
          <div class="bg-gray-900/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl">
            <div class="flex items-center justify-between mb-10">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-emerald-600/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                  <PhMagnifyingGlass class="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h2 class="text-xl font-black text-white tracking-tight">Заявки клиентов</h2>
                  <p class="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-0.5">{{ (leads as any[])?.length || 0 }} зафиксировано в системе</p>
                </div>
              </div>
              <button @click="() => refreshLeads()" class="p-2.5 bg-gray-950 border border-white/5 rounded-xl text-slate-400 hover:text-white transition-all">
                <PhArrowsClockwise class="w-4 h-4" />
              </button>
            </div>

            <div class="space-y-4">
              <div v-for="lead in (leads as any[] || [])" :key="lead.id" class="bg-gray-950/40 border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-all group">
                <div class="flex flex-col md:flex-row justify-between gap-6">
                  <div class="space-y-1">
                    <div class="flex items-center gap-3">
                      <span class="text-lg font-bold text-white">{{ lead.name }}</span>
                      <span class="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-md text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">{{ lead.status }}</span>
                    </div>
                    <div class="text-indigo-400 font-mono text-sm">{{ lead.phone }}</div>
                    <div class="text-[10px] text-slate-500 font-medium uppercase tracking-wider pt-2">
                       {{ new Date(lead.createdAt).toLocaleString('ru-RU') }}
                    </div>
                  </div>
                  <div v-if="lead.tariffDetails" class="bg-black/20 p-4 rounded-xl border border-white/5 flex-1 max-w-sm">
                    <div class="text-[10px] font-black text-slate-600 uppercase mb-2">Детали тарифа</div>
                    <div class="text-xs space-y-1 text-slate-300">
                      <div><span class="opacity-50">Интернет:</span> {{ lead.tariffDetails.internet }}</div>
                      <div><span class="opacity-50">IT Сервис:</span> {{ lead.tariffDetails.itService }}</div>
                      <div class="font-bold text-indigo-400 pt-1">Итого: {{ lead.tariffDetails.totalPrice }} сум</div>
                    </div>
                  </div>
                  <button
                    @click="deleteLead(lead.id)"
                    class="self-start p-2 text-slate-700 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    title="Удалить лид (GDPR)"
                  >
                    <PhTrash class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div v-if="!leads?.length" class="py-20 text-center">
                 <p class="text-slate-600 font-bold uppercase tracking-widest text-xs">Заявок пока нет</p>
              </div>
            </div>
          </div>
        </div>

        <!-- SECURITY TAB -->
        <div v-if="activeTab === 'security'" class="space-y-8">
          <div class="bg-gray-900/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl">
            <div class="flex items-center gap-4 mb-10">
              <div class="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center border border-red-500/20">
                <PhLock class="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h2 class="text-xl font-black text-white tracking-tight">Безопасность</h2>
                <p class="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-0.5">Управление доступом</p>
              </div>
            </div>

            <div class="max-w-md space-y-6">
              <div class="space-y-3">
                <label class="admin-label">Текущий пароль</label>
                <input type="password" v-model="passwordForm.current" class="admin-input" placeholder="••••••••" />
              </div>
              <div class="space-y-3">
                <label class="admin-label">Новый пароль</label>
                <input type="password" v-model="passwordForm.new" class="admin-input" placeholder="Минимум 4 симв." />
              </div>
              <div class="space-y-3">
                <label class="admin-label">Подтвердите пароль</label>
                <input type="password" v-model="passwordForm.confirm" class="admin-input" placeholder="Повторите ввод" />
              </div>

              <button 
                @click="changePassword"
                :disabled="status === 'saving'"
                class="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-300 hover:bg-white/10 hover:text-white transition-all disabled:opacity-50"
              >
                {{ status === 'saving' ? 'Обновление...' : 'Обновить пароль' }}
              </button>
            </div>
          </div>
        </div>

        <!-- CONTACTS TAB -->
        <div v-if="activeTab === 'contacts'" class="space-y-6">
          <div class="bg-gray-900/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl">
            <div class="flex items-center gap-4 mb-10">
              <div class="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                <PhGlobe class="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h2 class="text-xl font-black text-white tracking-tight">Контакты и SEO</h2>
                <p class="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-0.5">Мета-данные и связь</p>
              </div>
            </div>
            
            <div class="space-y-6">
              <div class="space-y-3">
                <label class="admin-label">Title сайта</label>
                <input type="text" v-model="form.seo.title" class="admin-input" />
              </div>
              <div class="space-y-3">
                <label class="admin-label">Meta Description</label>
                <textarea v-model="form.seo.description" rows="3" class="admin-input resize-none"></textarea>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-3">
                  <label class="admin-label">Телефон</label>
                  <input type="text" v-model="form.contacts.phone" class="admin-input" />
                </div>
                <div class="space-y-3">
                  <label class="admin-label">Email</label>
                  <input type="text" v-model="form.contacts.email" class="admin-input" />
                </div>
              </div>
              <div class="space-y-3">
                <label class="admin-label">Адрес</label>
                <input type="text" v-model="form.contacts.address" class="admin-input" />
              </div>
              <div class="pt-4 border-t border-white/5">
                <p class="admin-label mb-4">Социальные сети</p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="space-y-3">
                    <label class="admin-label">Telegram</label>
                    <input type="text" v-model="form.social.telegram" class="admin-input" placeholder="https://t.me/..." />
                  </div>
                  <div class="space-y-3">
                    <label class="admin-label">Facebook</label>
                    <input type="text" v-model="form.social.facebook" class="admin-input" placeholder="https://fb.com/..." />
                  </div>
                  <div class="space-y-3">
                    <label class="admin-label">Instagram</label>
                    <input type="text" v-model="form.social.instagram" class="admin-input" placeholder="https://instagram.com/..." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- ─── Floating Actions Panel ─── -->
    <div class="fixed bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl z-50">
      <div class="bg-gray-950/60 backdrop-blur-3xl border border-white/10 rounded-[1.5rem] lg:rounded-[2rem] p-3 lg:p-4 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/5 group">

        <div class="flex items-center gap-4 pl-3 lg:pl-4">
          <transition mode="out-in" name="fade">
            <span v-if="status === 'saved'" class="flex items-center gap-2 text-emerald-400 text-[10px] lg:text-xs font-black uppercase tracking-widest leading-none">
              <div class="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-emerald-500 animate-pulse"></div> Сохранено
            </span>
            <span v-else-if="status === 'error'" class="flex items-center gap-2 text-red-400 text-[10px] lg:text-xs font-black uppercase tracking-widest leading-none">
              <PhWarningCircle class="w-3.5 h-3.5 lg:w-4 lg:h-4" /> 
              <span class="max-w-[150px] lg:max-w-none truncate">{{ errorMessage }}</span>
            </span>
            <span v-else class="text-slate-500 text-[9px] lg:text-[10px] font-black uppercase tracking-widest leading-none opacity-50 group-hover:opacity-100 transition-opacity">CMS v2.0</span>
          </transition>
        </div>

        <button
          @click="activeTab === 'security' ? changePassword() : saveSettings()"
          :disabled="status === 'saving'"
          class="px-5 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-[11px] lg:text-sm font-black uppercase tracking-wider rounded-xl lg:rounded-2xl flex items-center gap-2 lg:gap-3 transition-all disabled:opacity-40 shadow-xl shadow-violet-500/20 active:scale-95 group/btn overflow-hidden relative"
        >
          <div class="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-500"></div>
          <PhCircleNotch v-if="status === 'saving'" class="w-4 h-4 lg:w-4.5 lg:h-4.5 animate-spin relative z-10" />
          <PhFloppyDisk v-else class="w-4 h-4 lg:w-4.5 lg:h-4.5 group-hover/btn:scale-110 transition-transform relative z-10" />
          <span class="relative z-10">{{ status === 'saving' ? 'Сохранение...' : (activeTab === 'security' ? 'Сменить пароль' : 'Сохранить') }}</span>
        </button>
      </div>
    </div>

  </div>
</template>

<style>
/* ── Premium Admin Design System ── */
.admin-label {
  @apply block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-[0.2em] ml-1 transition-colors;
}
.admin-label:focus-within {
  @apply text-violet-400;
}
.admin-label-sm {
  @apply block text-[10px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider ml-1;
}

.admin-input {
  @apply w-full px-5 py-4 bg-gray-950/50 border border-white/5 rounded-2xl text-white text-[15px] font-medium placeholder-slate-800
         focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/40 transition-all backdrop-blur-sm shadow-inner;
}

.admin-input-sm {
  @apply w-full px-4 py-3 bg-gray-950/80 border border-white/5 rounded-xl text-white text-sm font-semibold placeholder-slate-700
         focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/40 transition-all;
}

.admin-btn-add {
  @apply inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider px-4 py-2.5
         bg-violet-600/10 text-violet-400 border border-violet-500/20 rounded-xl hover:bg-violet-600 hover:text-white transition-all;
}

.admin-btn-delete {
  @apply p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
