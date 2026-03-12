<script setup lang="ts">
import { ref, computed } from 'vue'
import { useState } from '#app'
import { Server, Wifi, ShieldCheck, Monitor, Calculator, Zap, ArrowRight, PlusCircle, CheckCircle2, Globe } from 'lucide-vue-next'

const { data: settings } = await useFetch('/api/settings', { key: 'site-settings' })

type SpeedOption = { id: string, label: string, basePrice: number, isPopular: boolean }
const speeds = computed<SpeedOption[]>(() => settings.value?.tariffs?.internetSpeeds || [])

const services = computed(() => settings.value?.tariffs?.extraServices || [])

const IconMap: Record<string, any> = { Server, Wifi, ShieldCheck, Monitor, Zap, Globe }
const getIcon = (name: string) => IconMap[name] || Server

// State
const activeSpeedId = ref<string>('')
const selectedSpeed = computed<Partial<SpeedOption>>(() => {
  return speeds.value.find(s => s.id === activeSpeedId.value) || speeds.value[0] || {}
})

watch(speeds, (val) => {
  if (val && val.length > 0 && !activeSpeedId.value) {
    activeSpeedId.value = val[0]?.id || ''
  }
}, { immediate: true })

const deviceCount = ref(10) // default devices
const slaPremium = ref(false)
const selectedServices = ref<string[]>([])

const PRICE_PER_DEVICE = computed(() => settings.value?.tariffs?.itServiceBasePrice || 150000)
const SLA_MARGIN = computed(() => settings.value?.tariffs?.slaPremiumMargin || 20)

// Computed Costs
const internetCost = computed(() => selectedSpeed.value.basePrice || 0)
const devicesCost = computed(() => deviceCount.value * PRICE_PER_DEVICE.value)
// Premium SLA is a percentage of IT Maintenance cost
const slaCost = computed(() => slaPremium.value ? Math.round(devicesCost.value * (SLA_MARGIN.value / 100)) : 0)

const extraServicesCost = computed(() => {
  return services.value
    .filter((s: { id: string, price: number }) => selectedServices.value.includes(s.id))
    .reduce((sum: number, s: { price: number }) => sum + s.price, 0)
})

const totalItCost = computed(() => devicesCost.value + slaCost.value)
const totalAbonentCost = computed(() => internetCost.value + totalItCost.value + extraServicesCost.value)

// Format currency
const formatPrice = (value: number) => {
  return new Intl.NumberFormat('ru-RU').format(value || 0)
}

const toggleService = (id: string) => {
  const index = selectedServices.value.indexOf(id)
  if (index === -1) {
    selectedServices.value.push(id)
  } else {
    selectedServices.value.splice(index, 1)
  }
}

// Pass state to form
const savedTariffData = useState('tariffDetails', () => null as any)
const saveAndScrollToForm = (e: Event) => {
  // Save current calculator state for the contact form
  savedTariffData.value = {
    internet: selectedSpeed.value.label,
    itService: `Аутсорсинг (${deviceCount.value} ПК)${slaPremium.value ? ' + Premium SLA' : ''}`,
    extraServices: selectedServices.value.map(id => services.value.find((s: any) => s.id === id)?.label || id),
    totalPrice: formatPrice(totalAbonentCost.value)
  }
}
</script>

<template>
  <section id="tariffs" class="py-24 bg-gray-950 border-t border-white/5 relative overflow-hidden">
    <!-- Glow effects -->
    <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <ScrollFade>
        <div class="text-center mb-16">
          <div class="inline-block px-4 py-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-bold mb-4 tracking-wide uppercase">прозрачная смета</div>
          <h2 class="text-3xl md:text-5xl font-sans font-bold text-white mb-6 tracking-tight">Соберите свой тариф</h2>
          <p class="text-slate-400 max-w-2xl mx-auto text-lg">
            Настройте пакет услуг под реалии вашей компании и сразу узнайте абонентскую плату.
          </p>
        </div>
      </ScrollFade>

      <div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <!-- LEFT: Controls -->
        <div class="w-full lg:w-3/5 space-y-10">
          
          <ScrollFade :delay="100">
            <!-- Speed Selection -->
            <div class="bg-gray-900/40 rounded-3xl p-6 md:p-8 border border-white/5 shadow-2xl backdrop-blur-sm">
              <h3 class="text-xl font-bold text-white mb-6 flex items-center">
                <Globe class="w-6 h-6 mr-3 text-indigo-500"/> Скорость интернета
              </h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button 
                  v-for="s in speeds" :key="s.id"
                  @click="activeSpeedId = s.id"
                  class="py-4 px-2 rounded-2xl text-sm font-bold transition-all border-2 flex flex-col items-center justify-center text-center relative"
                  :class="activeSpeedId === s.id ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400 shadow-lg shadow-indigo-500/10 scale-105 z-10' : 'bg-gray-950/40 border-white/5 text-slate-500 hover:border-indigo-500/30 hover:bg-gray-900/40'"
                >
                  <div v-if="s.isPopular" class="absolute -top-3 px-2 py-0.5 bg-yellow-400 text-yellow-900 text-[10px] uppercase font-black rounded-full shadow-lg">ХИТ</div>
                  <span class="text-sm md:text-md" :class="activeSpeedId === s.id ? 'text-white' : ''">{{ s.label }}</span>
                  <span class="text-xs opacity-70 mt-1 font-medium">Мбит/с</span>
                </button>
              </div>
            </div>
          </ScrollFade>

          <ScrollFade :delay="200">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Devices Slider -->
              <div class="bg-gray-900/40 rounded-3xl p-6 md:p-8 border border-white/5 shadow-2xl backdrop-blur-sm">
                <div class="flex justify-between items-center mb-6">
                  <h3 class="text-xl font-bold text-white flex items-center">
                    <Monitor class="w-6 h-6 mr-3 text-indigo-500"/> ПК и устройства
                  </h3>
                  <div class="bg-gray-950/50 px-4 py-2 rounded-xl text-lg font-bold text-indigo-400 border border-white/5 shadow-inner">
                    {{ deviceCount }}
                  </div>
                </div>
                <!-- Range Slider -->
                <div class="relative pt-4 pb-2">
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    v-model.number="deviceCount"
                    class="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                  <div class="flex justify-between text-xs font-bold text-slate-500 mt-3 absolute w-full px-1">
                    <span>1 ПК</span>
                    <span>100 ПК</span>
                  </div>
                </div>
              </div>

              <!-- SLA Level Toggle -->
              <div class="bg-indigo-950/40 rounded-3xl p-6 md:p-8 border border-indigo-500/20 shadow-2xl relative overflow-hidden group backdrop-blur-md">
                <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-[40px] group-hover:bg-indigo-500/20 transition-all"></div>
                <h3 class="text-xl font-bold text-white mb-2 flex items-center relative z-10">
                  <ShieldCheck class="w-6 h-6 mr-3 text-indigo-400"/> Уровень SLA
                </h3>
                <p class="text-indigo-200/60 text-sm mb-6 relative z-10 h-10">Регламентированное время реакции и круглосуточный мониторинг.</p>
                
                <div class="relative z-10 bg-black/40 p-1.5 rounded-2xl flex border border-white/5">
                  <button 
                    @click="slaPremium = false"
                    class="flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300"
                    :class="!slaPremium ? 'bg-white text-indigo-950 shadow-lg' : 'text-indigo-400 hover:text-white'"
                  >
                    Стандарт (вкл)
                  </button>
                  <button 
                    @click="slaPremium = true"
                    class="flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300"
                    :class="slaPremium ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(84,99,255,0.4)]' : 'text-indigo-400 hover:text-white'"
                  >
                    Premium 24/7
                  </button>
                </div>
              </div>
            </div>
          </ScrollFade>

          <ScrollFade :delay="300">
            <!-- Extra Services -->
            <div class="bg-gray-900/40 rounded-3xl p-6 md:p-8 border border-white/5 shadow-2xl backdrop-blur-sm">
              <h3 class="text-xl font-bold text-white mb-6 flex items-center">
                <PlusCircle class="w-6 h-6 mr-3 text-indigo-500"/> Дополнительные услуги
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  v-for="srv in services" :key="srv.id"
                  @click="toggleService(srv.id)"
                  class="p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col group/card"
                  :class="selectedServices.includes(srv.id) ? 'border-indigo-500 bg-indigo-500/10 scale-[1.02]' : 'border-white/5 bg-gray-950/30 hover:border-indigo-500/30 hover:bg-gray-900/40'"
                >
                  <div class="flex justify-between items-start mb-3">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-colors"
                         :class="selectedServices.includes(srv.id) ? 'bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-gray-900 border-white/10 text-slate-500 group-hover/card:border-indigo-500/50'">
                      <component :is="getIcon(srv.icon)" class="w-5 h-5" />
                    </div>
                    <CheckCircle2 v-if="selectedServices.includes(srv.id)" class="w-5 h-5 text-indigo-400" />
                  </div>
                  <span class="font-bold text-slate-200 text-sm mb-1 leading-tight flex-grow">{{ srv.label }}</span>
                  <span class="text-xs text-indigo-400 font-bold mt-2">+ {{ formatPrice(srv.price) }} сум</span>
                </div>
              </div>
            </div>
          </ScrollFade>

        </div>

        <!-- RIGHT: Receipt / Checkout -->
        <div class="w-full lg:w-2/5">
          <ScrollFade direction="left" :delay="200" class="h-full">
            <div class="sticky top-28 bg-gray-900/60 rounded-[2.5rem] p-8 md:p-10 border border-white/5 shadow-2xl backdrop-blur-md h-full flex flex-col">
              
              <div class="flex items-center space-x-3 mb-8">
                <div class="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
                  <Calculator class="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white">Итоговая смета</h3>
                  <p class="text-sm font-medium text-slate-400">Ориентировочная стоимость</p>
                </div>
              </div>

              <div class="space-y-6 flex-grow">
                
                <div class="flex justify-between items-end border-b border-white/5 pb-4">
                  <div>
                    <span class="block text-slate-500 text-sm font-medium mb-1">Интернет-линия</span>
                    <span class="font-bold text-slate-200">{{ selectedSpeed.label }}</span>
                  </div>
                  <div class="font-bold text-indigo-300">{{ formatPrice(internetCost) }} <span class="text-xs text-slate-500 font-medium italic">сум</span></div>
                </div>

                <div class="flex justify-between items-end border-b border-white/5 pb-4">
                  <div>
                    <span class="block text-slate-500 text-sm font-medium mb-1">IT Обслуживание ({{ deviceCount }} шт)</span>
                    <span class="font-bold text-slate-200">Аутсорсинг <span v-if="slaPremium" class="text-indigo-400 font-bold">+ Premium SLA</span></span>
                  </div>
                  <div class="font-bold text-indigo-300">{{ formatPrice(totalItCost) }} <span class="text-xs text-slate-500 font-medium italic">сум</span></div>
                </div>

                <div v-if="extraServicesCost > 0" class="flex justify-between items-end border-b border-white/5 pb-4">
                  <div>
                    <span class="block text-slate-500 text-sm font-medium mb-1">Доп. услуги</span>
                    <span class="font-bold text-slate-200">{{ selectedServices.length }} {{ selectedServices.length === 1 ? 'опция' : (selectedServices.length === 2 ? 'опции' : 'опций') }}</span>
                  </div>
                  <div class="font-bold text-indigo-300">{{ formatPrice(extraServicesCost) }} <span class="text-xs text-slate-500 font-medium italic">сум</span></div>
                </div>

              </div>

              <div class="mt-8 pt-6 border-t border-white/10 border-dashed">
                <div class="flex justify-between items-center mb-6">
                  <span class="text-slate-400 font-bold text-lg">Абон. плата в месяц</span>
                  <div class="text-right">
                    <span class="text-3xl md:text-4xl font-extrabold text-indigo-400 leading-none shadow-indigo-500/10">{{ formatPrice(totalAbonentCost) }}</span>
                    <span class="block text-slate-500 text-sm font-bold mt-1 uppercase tracking-wider">сум / мес с НДС</span>
                  </div>
                </div>

                <a href="#contact" @click="saveAndScrollToForm" class="w-full py-5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-[1.25rem] font-bold text-center transition-all shadow-[0_0_30px_rgba(84,99,255,0.3)] hover:-translate-y-1 flex items-center justify-center space-x-2">
                  <span>Обсудить детали</span>
                  <ArrowRight class="w-5 h-5" />
                </a>
                <p class="text-center text-[10px] text-slate-600 mt-4 px-4 font-medium leading-relaxed uppercase tracking-tighter">
                  Расчет не является публичной офертой. Окончательная смета формируется после IT-аудита вашей инфраструктуры.
                </p>
              </div>

            </div>
          </ScrollFade>
        </div>
      </div>

      <!-- Comparison Block -->
      <ScrollFade :delay="400">
        <div class="mt-24 max-w-5xl mx-auto relative group">
          <!-- decorative blur bg -->
          <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div class="relative bg-gray-900/60 rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden backdrop-blur-md">
            
            <!-- Sale Badge (Absolute Center) -->
            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center hidden md:flex">
              <div class="bg-indigo-600 text-white w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-[0_0_30px_rgba(84,99,255,0.4)] border-4 border-gray-900 rotate-12 group-hover:rotate-0 transition-transform duration-500 group-hover:scale-110">
                <Zap class="w-6 h-6 mb-1 text-yellow-300" />
                <span class="font-black text-lg leading-none">До</span>
                <span class="font-black text-2xl leading-none">70%</span>
              </div>
            </div>

            <div class="md:w-1/2 text-center md:text-left relative z-10 w-full">
               <div class="inline-block px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded text-xs font-bold mb-4 tracking-wide uppercase">Стандартный подход</div>
               <h4 class="text-2xl font-bold text-slate-500 mb-2">Штатный IT-специалист</h4>
               <div class="text-4xl font-extrabold text-slate-600 line-through decoration-red-500/50 decoration-4">7–10 млн сум</div>
               <p class="text-slate-500 mt-4 text-sm font-medium">Отпуска, больничные, налоги, единая точка отказа, риск увольнения.</p>
            </div>

            <!-- Mobile divider -->
            <div class="w-full h-px bg-white/5 md:hidden relative my-4 flex items-center justify-center">
               <div class="bg-indigo-600 px-4 py-2 text-white font-bold rounded-full text-sm">Выгода до 70%</div>
            </div>

            <div class="md:w-1/2 text-center md:text-right relative z-10 w-full">
               <div class="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-xs font-bold mb-4 tracking-wide uppercase">Современный подход</div>
               <h4 class="text-2xl font-bold text-white mb-2">Аутсорс от Optikom</h4>
               <div class="text-4xl font-extrabold text-indigo-400">от 2 млн сум</div>
               <p class="text-slate-400 mt-4 text-sm font-medium">Целая команда инженеров, прозрачная зона ответственности, работа 24/7 без больничных.</p>
            </div>

          </div>
        </div>
      </ScrollFade>

    </div>
  </section>
</template>

<style scoped>
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: #5463ff;
  cursor: pointer;
  border: 4px solid #fff;
  box-shadow: 0 0 10px rgba(84,99,255,0.4);
}
input[type=range]::-moz-range-thumb {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: #5463ff;
  cursor: pointer;
  border: 4px solid #fff;
  box-shadow: 0 0 10px rgba(84,99,255,0.4);
}
</style>
