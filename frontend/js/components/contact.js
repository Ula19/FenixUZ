/* ==========================================================================
   Contact Form — Отправка обращения
   ========================================================================== */

const ContactForm = (() => {
    // Локально — бэкенд на порту 8001, на сервере — Nginx проксирует /api/
    const API_URL = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
        ? 'http://localhost:8001/api/contacts/'
        : '/api/contacts/';

    function init() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', handleSubmit);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const btn = form.querySelector('button[type="submit"]');
        const msg = document.getElementById('contactMessage');

        const name = form.querySelector('#contactName').value.trim();
        const email = form.querySelector('#contactEmail').value.trim();
        const message = form.querySelector('#contactText').value.trim();

        if (!name || !email || !message) return;

        btn.disabled = true;
        btn.textContent = '...';

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });

            if (res.ok) {
                msg.textContent = '✅ ' + (window.__contactSuccess || 'Message sent successfully!');
                msg.className = 'contact-msg contact-msg--success';
                form.reset();
            } else {
                throw new Error();
            }
        } catch {
            msg.textContent = '❌ ' + (window.__contactError || 'Something went wrong. Try again.');
            msg.className = 'contact-msg contact-msg--error';
        }

        msg.style.display = 'block';
        btn.disabled = false;
        btn.textContent = window.__contactBtnText || 'Send';

        setTimeout(() => { msg.style.display = 'none'; }, 5000);
    }

    return { init };
})();

export default ContactForm;
