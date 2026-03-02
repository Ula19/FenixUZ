/* ==========================================================================
   Animations — Scroll-reveal через IntersectionObserver
   ========================================================================== */

const Animations = (() => {
    let observer = null;

    function init() {
        // Проверяем предпочтения пользователя
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Показываем все элементы без анимации
            document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale').forEach(el => {
                el.classList.add('is-visible');
            });
            return;
        }

        setupObserver();
        observeElements();
    }

    function setupObserver() {
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Анимация одноразовая
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
    }

    function observeElements() {
        const selectors = '.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale';
        document.querySelectorAll(selectors).forEach(el => {
            observer.observe(el);
        });
    }

    /* Для динамически добавленных элементов */
    function refresh() {
        if (observer) {
            observeElements();
        }
    }

    return { init, refresh };
})();

export default Animations;
