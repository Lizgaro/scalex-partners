<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# ScaleX Partners - Landing Page

Современный лендинг для платформы ScaleX Partners с полной адаптацией под мобильные устройства.

## Особенности

✅ Полная адаптация для экранов от 320px до 1920px  
✅ Мобильное меню с анимацией  
✅ Оптимизация производительности (отключен canvas на мобилках)  
✅ Touch-оптимизация всех интерактивных элементов  
✅ Fallback для изображений  
✅ Адаптивная типографика  
✅ Полноэкранные модальные окна на мобилках  

## Запуск локально

**Требования:** Node.js 16+

1. Установите зависимости:
   ```bash
   npm install
   ```

2. Запустите dev-сервер:
   ```bash
   npm run dev
   ```

3. Откройте http://localhost:3000 в браузере

## Тестирование на мобильных устройствах

### Desktop (Chrome DevTools)
1. Откройте DevTools (F12)
2. Включите Device Toolbar (Ctrl+Shift+M)
3. Выберите устройство: iPhone 12 Pro, Galaxy S20, iPad Pro
4. Проверьте portrait и landscape ориентации

### iOS (Safari)
1. Откройте Safari на iPhone/iPad
2. Перейдите на http://[ваш-ip]:3000
3. Проверьте все интерактивные элементы
4. Проверьте модальные окна и меню

### Android (Chrome)
1. Откройте Chrome на Android устройстве
2. Перейдите на http://[ваш-ip]:3000
3. Проверьте свайп-жесты в карусели проектов
4. Проверьте touch-feedback на кнопках

## Breakpoints

- **Mobile**: 320px - 639px (sm)
- **Tablet**: 640px - 767px (sm)
- **Desktop**: 768px+ (md, lg, xl)

## Деплой на Vercel

1. Подключите репозиторий к Vercel
2. Vercel автоматически определит настройки Vite
3. Нажмите Deploy
4. Готово! Никаких переменных окружения не требуется

## Структура проекта

```
├── components/          # React компоненты
│   ├── Navbar.tsx      # Навигация с мобильным меню
│   ├── Hero.tsx        # Главная секция
│   ├── ProjectCatalog.tsx  # Каталог проектов
│   └── ...
├── constants.ts        # Данные проектов и контент
├── types.ts           # TypeScript типы
├── index.html         # HTML с адаптивными стилями
└── MOBILE_ADAPTATION_PLAN.md  # План адаптации

```

## Технологии

- React 19
- TypeScript
- Vite
- Tailwind CSS (CDN)
- Lucide Icons

## Производительность

- Canvas анимация отключена на мобилках
- Lazy loading для изображений
- Оптимизированные анимации
- Touch-оптимизация

## Лицензия

MIT
