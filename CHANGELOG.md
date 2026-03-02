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
