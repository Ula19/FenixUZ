/* ==========================================================================
   Header — Мобильное меню и скролл-эффекты
   ========================================================================== */

const Header = (() => {
    let header = null;
    let burger = null;
    let nav = null;
    let scrollThreshold = 50;

    function init() {
        header = document.querySelector('.header');
        burger = document.querySelector('.header__burger');
        nav = document.querySelector('.nav');

        if (!header) return;

        setupScrollEffect();
        setupMobileMenu();
        setupSmoothScroll();
    }

    /* ---- Эффект при скролле (фон header) ---- */
    function setupScrollEffect() {
        function onScroll() {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // проверить при загрузке
    }

    /* ---- Мобильное меню ---- */
    function setupMobileMenu() {
        if (!burger || !nav) return;

        const navParent = nav.parentElement;
        const navNextSibling = nav.nextElementSibling;

        burger.addEventListener('click', () => {
            const isOpen = nav.classList.contains('nav--open');

            if (!isOpen) {
                // Открытие: переносим nav в body
                document.body.appendChild(nav);
                // Принудительный reflow
                nav.offsetHeight;
                nav.classList.add('nav--open');
                burger.classList.add('header__burger--active');
                header.classList.add('header--menu-open');
                document.body.style.overflow = 'hidden';
            } else {
                // Закрытие: возвращаем nav обратно в header
                nav.classList.remove('nav--open');
                burger.classList.remove('header__burger--active');
                header.classList.remove('header--menu-open');
                document.body.style.overflow = '';
                if (navNextSibling) {
                    navParent.insertBefore(nav, navNextSibling);
                } else {
                    navParent.appendChild(nav);
                }
            }
        });

        // Закрытие меню при клике на ссылку
        nav.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav--open');
                burger.classList.remove('header__burger--active');
                header.classList.remove('header--menu-open');
                document.body.style.overflow = '';
                if (navNextSibling) {
                    navParent.insertBefore(nav, navNextSibling);
                } else {
                    navParent.appendChild(nav);
                }
            });
        });
    }

    /* ---- Плавная прокрутка при клике на anchor-ссылки ---- */
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - header.offsetHeight;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            });
        });
    }

    return { init };
})();

export default Header;
