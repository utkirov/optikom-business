export const defaultSettings = {
  hero: {
    title: 'Быстрый интернет и надежное IT-сопровождение',
    description: 'Мы берем на себя всю IT-инфраструктуру вашего бизнеса. Забудьте о системных сбоях и простоях — с нами всё работает как часы.',
    buttonText: 'Рассчитать стоимость',
    buttonLink: '#tariffs',
  },
  tariffs: {
    internetSpeeds: [
      { id: '100mbit', label: '100 Мбит/с', basePrice: 2000000, isPopular: false },
      { id: '200mbit', label: '200 Мбит/с', basePrice: 4000000, isPopular: true },
      { id: '300mbit', label: '300 Мбит/с', basePrice: 6000000, isPopular: false },
      { id: '500mbit', label: '500 Мбит/с', basePrice: 10000000, isPopular: false },
    ],
    itServiceBasePrice: 150000,
    slaPremiumMargin: 20,
    extraServices: [
       { id: 'cctv', label: 'Видеонаблюдение', price: 500000, icon: 'Monitor' },
       { id: 'backup', label: 'Бэкап серверов', price: 300000, icon: 'Server' },
       { id: 'backup_channel', label: 'Резервный канал', price: 800000, icon: 'Wifi' },
    ]
  },
  contacts: {
    phone: '+998 (71) 000-00-00',
    address: 'Ташкент, Узбекистан',
    email: 'info@optikom.biz'
  },
  social: {
    telegram: '',
    facebook: '',
    instagram: ''
  },
  seo: {
    title: 'Optikom Business',
    description: 'Управляемые IT и телеком услуги. Единый подрядчик для вашего офиса.',
  },
  content: {
    audiences: [
      'Малый и средний бизнес', 'Офисные компании', 'Call-центры',
      'Застройщики', 'Торговые сети', 'Сервисные компании', 'Производства'
    ],
    advantages: [
      { title: 'Единый подрядчик', desc: 'Интернет и IT в одном окне' },
      { title: 'Снижение простоев', desc: 'Проактивный мониторинг' },
      { title: 'Фиксированная цена', desc: 'Прозрачная абон. плата' },
      { title: 'Масштабируемость', desc: 'Рост без слома IT-ядра' }
    ],
    faq: [
      { q: 'Как быстро вы подключаете интернет?', a: 'В среднем от 1 до 3 рабочих дней в зависимости от техусловий здания.' },
      { q: 'Что входит в IT-аутсорсинг?', a: 'Обслуживание ПК, серверов, сети, принтеров, настройка ПО и поддержка пользователей 24/7.' }
    ]
  }
}
