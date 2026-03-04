# 📝 CHANGELOG — FenixUz Landing Page

Все изменения в проекте. Для возврата к предыдущей версии используй:
```bash
git log --oneline        # посмотреть все версии
git checkout <хеш>       # перейти к нужной версии
git checkout master      # вернуться к последней версии
```

---

## v2.0.0 — Ребрендинг FenixUz (2 марта 2026)

> **Git:** коммит `eed3e0a` — «v2.0.0: Rebrand Pro Messenger → FenixUz»
> **Откат:** `git revert eed3e0a` или `git checkout 2c5cae0`

### 2.1 Переименование «Pro Messenger» → «FenixUz»
- Все HTML-страницы: title, meta, header, footer, copyright
- Все JSON-переводы (ru.json, uz.json, en.json): hero, features, download, footer, юридические страницы
- CSS комментарии

### 2.2 Добавление логотипов
- Header: `logo.png` (красная птица-феникс) вместо эмоджи 💬
- Footer: аналогично
- privacy.html, terms.html: исправлен путь к логотипу

### 2.3 Фон hero-секции
- Добавлена фотография `schreen.jpg` как фон hero-секции
- Градиентный overlay для читаемости текста

### 2.4 Язык по умолчанию — English
- Дефолтный язык сайта изменён с RU на EN
- HTML `lang="en"` на всех страницах

### 2.5 Email
- Шаблонный email: `support@fenixuz.com`

---

## v2.5.0 — Форма обратной связи + reCAPTCHA v3 (4 марта 2026)

### 2.24 FastAPI Backend
- `POST /api/contacts/` — публичный эндпоинт (с проверкой reCAPTCHA)
- `GET/POST /api/admin/contacts` — CRUD обращений
- `GET /api/admin/stats` — статистика
- Async SQLAlchemy + PostgreSQL
- Авторизация админа: логин/пароль

### 2.25 Админ-панель
- Тёмная тема, карточки статистики, фильтры
- Просмотр обращений, ответ, удаление
- Сессия через `sessionStorage` (не сбрасывается при обновлении)
- Адаптивная мобильная версия

### 2.26 Форма Contact Us (фронтенд)
- Секция на главной странице (имя, email, сообщение)
- Floating labels, CSS анимации
- i18n: EN, RU, UZ
- Ссылка «Контакты» в навигации

### 2.27 reCAPTCHA v3
- Google reCAPTCHA v3 (невидимая)
- Бэкенд проверяет score ≥ 0.5 (иначе 403)
- Сообщение «Проверка безопасности не пройдена» при блокировке

---

## v2.4.0 — Favicon, флаги, прокрутка меню, SSL (3–4 марта 2026)

### 2.20 Favicon
- Добавлен `favicon-32.png` (32×32) и `favicon.png` (16×16) из `logo.png`
- `apple-touch-icon` для iOS (180×180)
- Поддержка Chrome и Safari

### 2.21 SVG-флаги вместо emoji
- Emoji-флаги (🇷🇺🇺🇿🇬🇧) заменены на inline SVG — корректное отображение на Windows
- Исправлен флаг Узбекистана (голубая/белая/зелёная полосы + полумесяц)

### 2.22 Прокрутка мобильного меню
- `justify-content: flex-start` + `padding-top: 15vh` вместо `center` (исправлена прокрутка)
- `-webkit-overflow-scrolling: touch` для iOS
- Дропдаун языков открывается вверх (не обрезается снизу)

### 2.23 SSL (HTTPS)
- Let's Encrypt сертификат для `fenixuz.uz` (до 1 июня 2026)
- Автообновление через certbot

---

## v2.3.0 — Мобильное меню + Деплой (3 марта 2026)

### 2.16 Исправление мобильного бургер-меню
- **Проблема:** при прокрутке страницы меню было прозрачным — контент просвечивал сквозь навигацию
- **Причина:** `transform` на анимированных элементах создавал stacking context'ы, конкурирующие с header
- **Решение:** при открытии меню `<nav>` переносится из `<header>` в `<body>` через JS, обходя все stacking context'ы
- Убран `z-index: 1` из секций `hero__inner`, `download__actions`, `stats`
- Header получает `z-index: 9999` при открытом меню
- Бургер-кнопка: `z-index: 9999` для кликабельности поверх навигации

### 2.17 README.md для GitHub
- Бейджи (License, Status, Languages)
- Таблица фич, Tech Stack, Quick Start
- Структура проекта, варианты деплоя

### 2.18 .gitignore
- Игнорируются все файлы кроме `frontend/` и `README.md`
- Убраны из git: `.idea/`, `.beads/`, `.DS_Store`, `AGENTS.md`, `CHANGELOG.md`, `PROJECT_HISTORY.md`

### 2.19 DEPLOY.md
- Пошаговая инструкция деплоя на Ubuntu + Nginx
- Конфиг Nginx с gzip, кэшированием, безопасностью
- SSL через Let's Encrypt (certbot)
- Жёсткий git pull + очистка кэша Cloudflare

---

## v2.2.1 — Форматирование кода (2 марта 2026)

### 2.15 index.html
- Форматирование HTML: перенос длинных строк, читаемые SVG, пустые строки между блоками

---

## v2.2.0 — Реальные фичи FenixUz (2 марта 2026)

### 2.14 Обновление секции Features
- Заменены 6 шаблонных фич на реальные возможности FenixUz:
  1. 🔒 Секретные чаты
  2. 🔂 Однократное воспроизведение
  3. 📲 Восстановление удалённых сообщений
  4. 👻 Призрак и Прокси
  5. ✍️ Авто-текст
  6. 👤 Кто вас сохранил
- Обновлены все 3 языка: en.json, ru.json, uz.json

---

## v2.1.1 — Зелёный фон + новый скриншот (2 марта 2026)

### 2.12 Единый зелёный фон
- Все фоновые цвета изменены на тёмно-зелёный (`#061a11`)
- Hero, Security, Footer, Header — одинаковый фон
- Градиенты и glassmorphism обновлены

### 2.13 Новый скриншот
- `schreen.jpg` → `new_screen.jpg` (зелёная вывеска FenixUz)

---

## v2.1.0 — Зелёная цветовая тема (2 марта 2026)

### 2.11 Смена палитры
- Фиолетовый `#7c5cfc` → Изумрудный `#10b981`
- Голубой `#5b8def` → Светло-зелёный `#34d399`
- Все фоны, градиенты, тени, свечения — зелёные
- 5 CSS-файлов обновлены: variables, home, components, animations, base

---

## v2.0.1 — Багфиксы после ребрендинга (2 марта 2026)

### 2.6 Исправление hero-секции
- Фон hero восстановлен: `var(--gradient-hero)` + `schreen.jpg` через `::before` с opacity 15%
- Раньше фон ломал отображение контента

### 2.7 Удаление неиспользуемой ссылки FAQ
- Убрана ссылка FAQ из header и footer в `privacy.html` и `terms.html`

### 2.8 Синхронизация footer
- Footer на `privacy.html` и `terms.html` приведён в соответствие с `index.html`
- Добавлены `data-i18n` атрибуты для перевода
- Соцсети: Telegram, Instagram, Twitter (везде одинаково)
- Copyright: © 2026 FenixUz (везде одинаково)

### 2.9 Юридические страницы — мгновенное отображение
- Убрана анимация `animate-on-scroll` с `privacy.html` и `terms.html`
- Текст теперь показывается сразу (в т.ч. на мобильных)

### 2.10 README.md
- Создан файл с инструкциями запуска проекта

---

## v1.1.0 — Переводы юридических страниц (18 февраля 2026)

### 1.3 Terms of Service
- Переведён на RU, UZ, EN

### 1.4 Privacy Policy
- Переведена на RU, UZ, EN

---

## v1.0.0 — Начальная версия (17 февраля 2026)

> **Git:** первый коммит `2c5cae0`
> **Откат:** `git checkout 2c5cae0`

### 1.1 Структура проекта
- Создана модульная архитектура: `css/`, `js/`, `i18n/`, HTML-страницы

### 1.2 CSS дизайн-система
- 8 модулей: variables, reset, base, layout, components, animations, home, legal
- Тёмная тема, градиенты, glassmorphism, Inter шрифт

### 1.3 Главная страница (index.html)
- 6 секций: Header, Hero, Features, Security, Download, Footer
- Scroll-анимации, адаптивная вёрстка

### 1.4 Юридические страницы
- privacy.html — Политика конфиденциальности
- terms.html — Пользовательское соглашение

### 1.5 JavaScript модули
- main.js, header.js, animations.js, i18n.js, helpers.js
- IntersectionObserver, hamburger-меню, переключатель языков

### 1.6 Мультиязычность
- ru.json, uz.json, en.json
- Переключатель в header, сохранение в localStorage
