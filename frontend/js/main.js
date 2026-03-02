/* ==========================================================================
   Main — Точка входа, инициализация всех модулей
   ========================================================================== */

import I18n from './components/i18n.js';
import Header from './components/header.js';
import Animations from './components/animations.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Интернационализация (должна загрузиться первой)
  await I18n.init();

  // 2. Динамический контент: features, security, legal (генерируются из JSON)
  renderDynamicContent();

  // 3. Компоненты
  Header.init();
  Animations.init();

  // 4. При смене языка — перерисовать динамический контент
  I18n.onChange(() => {
    renderDynamicContent();
    Animations.refresh();
  });
});

/* ---- Отрисовка динамического контента из переводов ---- */
function renderDynamicContent() {
  const t = I18n.getTranslations();
  if (!t) return;

  renderFeatures(t);
  renderSecurity(t);
  renderLegalPage(t);
}

/* ---- Features (Карточки возможностей) ---- */
function renderFeatures(t) {
  const container = document.getElementById('features-grid');
  if (!container || !t.features || !t.features.items) return;

  container.innerHTML = t.features.items.map((item, i) => `
    <div class="feature-card animate-on-scroll animate-delay-${i + 1}">
      <div class="feature-card__icon">${item.icon}</div>
      <h3 class="feature-card__title">${item.title}</h3>
      <p class="feature-card__text">${item.text}</p>
    </div>
  `).join('');
}

/* ---- Security (Безопасность) ---- */
function renderSecurity(t) {
  const container = document.getElementById('security-list');
  if (!container || !t.security || !t.security.items) return;

  container.innerHTML = t.security.items.map((item, i) => `
    <div class="security__item animate-on-scroll animate-delay-${i + 1}">
      <div class="security__item-icon">${item.icon}</div>
      <div class="security__item-text">
        <h4>${item.title}</h4>
        <p>${item.text}</p>
      </div>
    </div>
  `).join('');
}

/* ---- Legal Pages (Privacy / Terms) ---- */
function renderLegalPage(t) {
  // Политика конфиденциальности
  if (t.privacy_page) {
    renderLegalPageFull('privacy', t.privacy_page);
  }

  // Пользовательское соглашение
  if (t.terms_page) {
    renderLegalPageFull('terms', t.terms_page);
  }
}

/* ---- Полная отрисовка юридической страницы (заголовок + дата + intro + секции) ---- */
function renderLegalPageFull(prefix, pageData) {
  const titleEl = document.getElementById(`${prefix}-title`);
  const dateEl = document.getElementById(`${prefix}-date`);
  const introEl = document.getElementById(`${prefix}-intro`);
  const contentEl = document.getElementById(`${prefix}-content`);
  const tocEl = document.getElementById(`${prefix}-toc`);

  // Заголовок страницы
  if (titleEl && pageData.title) {
    titleEl.textContent = pageData.title;
  }

  // Дата обновления
  if (dateEl && pageData.updated) {
    dateEl.textContent = pageData.updated;
  }

  // Вводный текст (intro)
  if (introEl && pageData.intro) {
    introEl.innerHTML = pageData.intro;
  }

  // Секции и оглавление
  if (contentEl) {
    renderLegalSections(contentEl, tocEl, pageData.sections, pageData.toc_title);
  }
}

function renderLegalSections(contentEl, tocEl, sections, tocTitle) {
  if (!sections) return;

  // Оглавление
  if (tocEl) {
    tocEl.innerHTML = `
      <p class="legal__toc-title">${tocTitle || ''}</p>
      <ol>
        ${sections.map(s => `<li><a href="#${s.id}">${s.title}</a></li>`).join('')}
      </ol>
    `;
  }

  // Контент
  contentEl.innerHTML = sections.map(s => `
    <section id="${s.id}">
      <h2>${s.title}</h2>
      ${s.content}
    </section>
  `).join('');
}
