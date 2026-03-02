/* ==========================================================================
   i18n — Модуль интернационализации (RU / UZ / EN)
   ========================================================================== */

const I18n = (() => {
  const STORAGE_KEY = 'fenixuz-lang';
  const DEFAULT_LANG = 'en';
  const SUPPORTED_LANGS = ['ru', 'uz', 'en'];

  const LANG_LABELS = {
    ru: { flag: '🇷🇺', name: 'Русский', short: 'RU' },
    uz: { flag: '🇺🇿', name: "O'zbek", short: 'UZ' },
    en: { flag: '🇬🇧', name: 'English', short: 'EN' }
  };

  let currentLang = DEFAULT_LANG;
  let translations = {};
  let onChangeCallbacks = [];

  /* ---- Инициализация ---- */
  async function init() {
    currentLang = getSavedLang();
    await loadTranslation(currentLang);
    applyTranslations();
    renderLangSwitcher();
    document.documentElement.lang = currentLang;
  }

  /* ---- Загрузить перевод ---- */
  async function loadTranslation(lang) {
    try {
      const response = await fetch(`./i18n/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
      translations = await response.json();
    } catch (err) {
      console.error('i18n load error:', err);
      // Если не удалось загрузить — пробуем default
      if (lang !== DEFAULT_LANG) {
        await loadTranslation(DEFAULT_LANG);
      }
    }
  }

  /* ---- Переключить язык ---- */
  async function setLang(lang) {
    if (!SUPPORTED_LANGS.includes(lang) || lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    await loadTranslation(lang);
    applyTranslations();
    updateSwitcherUI();
    onChangeCallbacks.forEach(cb => cb(lang, translations));
  }

  /* ---- Применить переводы к DOM ---- */
  function applyTranslations() {
    // Простые текстовые элементы с data-i18n="ключ.вложенный"
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = getNestedValue(translations, key);
      if (value !== undefined) {
        el.textContent = value;
      }
    });

    // HTML-контент с data-i18n-html
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const value = getNestedValue(translations, key);
      if (value !== undefined) {
        el.innerHTML = value;
      }
    });

    // Placeholder-ы
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const value = getNestedValue(translations, key);
      if (value !== undefined) {
        el.setAttribute('placeholder', value);
      }
    });
  }

  /* ---- Отрисовка переключателя языков ---- */
  function renderLangSwitcher() {
    const switchers = document.querySelectorAll('.lang-switcher');
    switchers.forEach(switcher => {
      const btn = switcher.querySelector('.lang-switcher__btn');
      const dropdown = switcher.querySelector('.lang-switcher__dropdown');

      if (btn) {
        const info = LANG_LABELS[currentLang];
        btn.innerHTML = `${info.flag} ${info.short} <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
      }

      if (dropdown) {
        dropdown.innerHTML = SUPPORTED_LANGS.map(lang => {
          const info = LANG_LABELS[lang];
          const isActive = lang === currentLang ? ' lang-switcher__option--active' : '';
          return `<button class="lang-switcher__option${isActive}" data-lang="${lang}">${info.flag} ${info.name}</button>`;
        }).join('');

        // Клики по опциям
        dropdown.querySelectorAll('.lang-switcher__option').forEach(option => {
          option.addEventListener('click', (e) => {
            e.stopPropagation();
            setLang(option.dataset.lang);
            closeSwitcher(switcher);
          });
        });
      }

      // Переключение dropdown
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          switcher.classList.toggle('lang-switcher--open');
        });
      }
    });

    // Закрытие по клику вне
    document.addEventListener('click', () => {
      switchers.forEach(s => s.classList.remove('lang-switcher--open'));
    });
  }

  function closeSwitcher(switcher) {
    switcher.classList.remove('lang-switcher--open');
  }

  function updateSwitcherUI() {
    const switchers = document.querySelectorAll('.lang-switcher');
    switchers.forEach(switcher => {
      const btn = switcher.querySelector('.lang-switcher__btn');
      if (btn) {
        const info = LANG_LABELS[currentLang];
        btn.innerHTML = `${info.flag} ${info.short} <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
      }

      // Обновить active-класс
      switcher.querySelectorAll('.lang-switcher__option').forEach(option => {
        option.classList.toggle('lang-switcher__option--active', option.dataset.lang === currentLang);
      });
    });
  }

  /* ---- Утилиты ---- */
  function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  }

  function getSavedLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED_LANGS.includes(saved) ? saved : DEFAULT_LANG;
  }

  function t(key) {
    return getNestedValue(translations, key) || key;
  }

  function getTranslations() {
    return translations;
  }

  function getLang() {
    return currentLang;
  }

  function onChange(callback) {
    onChangeCallbacks.push(callback);
  }

  return { init, setLang, t, getTranslations, getLang, onChange };
})();

export default I18n;
