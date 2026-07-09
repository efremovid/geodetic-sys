export const site = {
  name: 'ТопоСтройКадастр',
  logoMain: 'ТопоСтрой',
  logoAccent: 'Кадастр',
  tagline: 'Экспертная геодезия и кадастр',
  description:
    'Высокоточная инженерная геодезия и кадастровый учёт для строительства и проектирования. Гарантия технического совершенства в каждой координате.',
  phone: '+7 (977) 933-53-35',
  phoneHref: 'tel:+79779335335',
  email: 'th5tr@yandex.ru',
  emailHref: 'mailto:th5tr@yandex.ru',
  region: 'Москва, Московская область и другие регионы',
  coords: {
    lat: '55°45\'21.2" N',
    lon: '37°37\'04.8" E',
    zone: 'МСК-77 / регион 50',
  },
  stats: [
    { value: '10+', label: 'Лет профессионального опыта' },
    { value: '500+', label: 'Успешно сданных объектов' },
  ],
  copyright: '© 2024 ТопоСтройКадастр. Техническая точность гарантирована.',
} as const

export const navLinks = [
  { label: 'Услуги', href: '/#services' },
  { label: 'О нас', href: '/#about' },
  { label: 'Контакты', href: '/#contact' },
] as const

export const footerNav = [
  { label: 'Услуги', href: '/#services' },
  { label: 'О компании', href: '/#about' },
  { label: 'Контакты', href: '/#contact' },
] as const
