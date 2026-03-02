/* ==========================================================================
   Helpers — Утилитарные функции
   ========================================================================== */

/**
 * Throttle — ограничивает частоту вызова функции
 */
export function throttle(fn, delay = 100) {
    let lastCall = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            fn.apply(this, args);
        }
    };
}

/**
 * Debounce — откладывает вызов до конца серии событий
 */
export function debounce(fn, delay = 250) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}
