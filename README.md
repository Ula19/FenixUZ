# 🔥 FenixUz — Landing Page

Лендинг мессенджера FenixUz. Статический сайт (HTML + CSS + JS).

## 🚀 Запуск проекта

### Способ 1: Python (рекомендуется)

```bash
cd frontend
python3 -m http.server 8000
```

Открыть в браузере: **http://localhost:8000**

### Способ 2: Node.js (если установлен)

```bash
npx -y serve frontend
```

Открыть в браузере: **http://localhost:3000**

### Способ 3: VS Code / Cursor

Установи расширение **Live Server**, открой `frontend/index.html` и нажми «Go Live».

---

## 📁 Структура

```
frontend/
├── index.html          # Главная страница
├── privacy.html        # Политика конфиденциальности
├── terms.html          # Пользовательское соглашение
├── css/                # Стили (8 модулей)
├── js/                 # JavaScript (5 модулей)
├── i18n/               # Переводы (RU, UZ, EN)
└── images/             # Логотипы и фото
```

## 🌐 Языки

Сайт поддерживает 3 языка: 🇬🇧 English (по умолчанию), 🇷🇺 Русский, 🇺🇿 O'zbek.
Переключатель в правом верхнем углу.

## 🔄 Откат к предыдущей версии

```bash
git log --oneline       # посмотреть все версии
git checkout <хеш>      # перейти к нужной версии
git checkout master     # вернуться к последней
```

Подробная история изменений — в файле `CHANGELOG.md`.
