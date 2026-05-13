// ===== Matt Built — Redesign JS =====
// Forked from current/script.js with bug fixes:
//   1. Portfolio filter defaults to "All"
//   2. EmailJS gated behind real credentials (graceful failure)
//   3. Smooth scroll guards anchor-only targets
//   4. Cleaner intersection observer

document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initScrollEffects();
    initPortfolioFilter();
    initTestimonialSlider();
    initContactForm();
    initAnimations();
});

// ===== Navigation =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const h = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (scrollY >= top && scrollY < top + h) {
                navLinks.forEach(l => l.classList.remove('active'));
                if (link) link.classList.add('active');
            }
        });
    });
}

// ===== Smooth Scroll =====
function initScrollEffects() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ===== Portfolio Filter (default: All) =====
function initPortfolioFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');

    const apply = (filter) => {
        items.forEach(item => {
            const cat = item.getAttribute('data-category');
            if (filter === 'all' || cat === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    };

    const initialActive = document.querySelector('.filter-btn.active');
    apply(initialActive ? initialActive.getAttribute('data-filter') : 'all');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            apply(btn.getAttribute('data-filter'));
        });
    });
}

// ===== Testimonial Slider =====
function initTestimonialSlider() {
    const track = document.getElementById('testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('testimonial-dots');
    if (!track || cards.length === 0) return;

    let index = 0;
    const total = cards.length;

    cards.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => go(i));
        dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll('.dot');

    function update() {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }
    function go(i) { index = i; update(); }
    function next() { index = (index + 1) % total; update(); }
    function prev() { index = (index - 1 + total) % total; update(); }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    let auto = setInterval(next, 6000);
    track.addEventListener('mouseenter', () => clearInterval(auto));
    track.addEventListener('mouseleave', () => { auto = setInterval(next, 6000); });

    let sx = 0, ex = 0;
    track.addEventListener('touchstart', e => sx = e.changedTouches[0].screenX, { passive: true });
    track.addEventListener('touchend', e => {
        ex = e.changedTouches[0].screenX;
        const diff = sx - ex;
        if (diff > 50) next();
        else if (diff < -50) prev();
    }, { passive: true });
}

// ===== Contact Form =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());

        if (!data.name || !data.email || !data.message) {
            notify('Please fill in your name, email and message.', 'error');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            notify('Please enter a valid email address.', 'error');
            return;
        }

        const btn = form.querySelector('button[type="submit"]');
        const original = btn.textContent;
        btn.textContent = 'Sending…';
        btn.disabled = true;

        const hasEmailJS = window.emailjs &&
            window.EMAILJS_PUBLIC_KEY && !/YOUR_/.test(window.EMAILJS_PUBLIC_KEY);

        if (!hasEmailJS) {
            // Graceful fallback — open mail client with prefilled message
            setTimeout(() => {
                const body = encodeURIComponent(
                    `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || '—'}\nProject: ${data.project || '—'}\n\n${data.message}`
                );
                window.location.href = `mailto:Matt@MattBuilt.co.uk?subject=Enquiry%20from%20${encodeURIComponent(data.name)}&body=${body}`;
                notify('Opening your email app — please send to complete.', 'success');
                btn.textContent = original;
                btn.disabled = false;
            }, 300);
            return;
        }

        emailjs.sendForm(window.EMAILJS_SERVICE_ID, window.EMAILJS_TEMPLATE_ID, form)
            .then(() => {
                notify('Thanks — your message is on its way. Matt will be in touch soon.', 'success');
                form.reset();
            })
            .catch(err => {
                console.error('EmailJS error:', err);
                notify('Something went wrong. Please email Matt@MattBuilt.co.uk directly.', 'error');
            })
            .finally(() => {
                btn.textContent = original;
                btn.disabled = false;
            });
    });
}

function notify(message, type) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.innerHTML = `<span>${message}</span><button aria-label="dismiss">&times;</button>`;
    el.querySelector('button').addEventListener('click', () => el.remove());
    document.body.appendChild(el);
    setTimeout(() => el.classList.add('toast-in'), 10);
    setTimeout(() => {
        el.classList.remove('toast-in');
        setTimeout(() => el.remove(), 300);
    }, 5000);
}

// ===== Scroll Animations =====
function initAnimations() {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
}
