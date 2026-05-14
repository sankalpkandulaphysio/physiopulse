document.addEventListener('DOMContentLoaded', function() {

    // ─── Navbar scroll effect ──────────────────────────────
    const header = document.querySelector('.header');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ─── Active nav link (aria-current + .is-active) ───────
    (function setActiveNav() {
        const currentPath = window.location.pathname.replace(/\/$/, '');
        document.querySelectorAll('.nav-link, .dropdown-link').forEach(function(link) {
            const href = link.getAttribute('href') || '';
            if (!href || href === '#') return;
            try {
                const resolved = new URL(href, window.location.href);
                const linkPath = resolved.pathname.replace(/\/$/, '');
                const linkHash = resolved.hash;
                // Match on path, but not on hash-only anchors
                if (linkPath === currentPath && !linkHash) {
                    link.setAttribute('aria-current', 'page');
                    link.classList.add('is-active');
                    const parentDropdown = link.closest('.nav-dropdown');
                    if (parentDropdown) {
                        const parentLink = parentDropdown.querySelector('.nav-link');
                        if (parentLink) { parentLink.classList.add('is-active'); parentLink.setAttribute('aria-current', 'true'); }
                    }
                }
            } catch(e) {}
        });
    })();

    // ─── Hamburger menu ────────────────────────────────────
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('nav-menu-open');
            hamburger.setAttribute('aria-expanded', String(isOpen));
            hamburger.classList.toggle('is-open', isOpen);
        });
        navMenu.querySelectorAll('.nav-link, .dropdown-link').forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    navMenu.classList.remove('nav-menu-open');
                    hamburger.setAttribute('aria-expanded', 'false');
                    hamburger.classList.remove('is-open');
                }
            });
        });
    }

    // ─── Dropdown ──────────────────────────────────────────
    function closeAllDropdowns() {
        document.querySelectorAll('.nav-dropdown').forEach(function(d) {
            d.classList.remove('dropdown-open');
            const btn = d.querySelector('.dropdown-toggle');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
    }

    document.querySelectorAll('.dropdown-toggle').forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault(); e.stopPropagation();
            const dropdown = this.closest('.nav-dropdown');
            const wasOpen = dropdown.classList.contains('dropdown-open');
            closeAllDropdowns();
            if (!wasOpen) { dropdown.classList.add('dropdown-open'); toggle.setAttribute('aria-expanded', 'true'); }
        });
        toggle.closest('.nav-dropdown').addEventListener('keydown', function(e) {
            if (e.key === 'Escape') { closeAllDropdowns(); toggle.focus(); }
        });
    });

    // Hover open on desktop
    document.querySelectorAll('.nav-dropdown').forEach(function(dd) {
        dd.addEventListener('mouseenter', function() {
            if (window.innerWidth >= 768) { this.classList.add('dropdown-open'); const b = this.querySelector('.dropdown-toggle'); if(b) b.setAttribute('aria-expanded','true'); }
        });
        dd.addEventListener('mouseleave', function() {
            if (window.innerWidth >= 768) { this.classList.remove('dropdown-open'); const b = this.querySelector('.dropdown-toggle'); if(b) b.setAttribute('aria-expanded','false'); }
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-dropdown')) closeAllDropdowns();
    });

    // ─── Smooth scroll (+ legacy #treatments → #services) ──
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            let href = this.getAttribute('href');
            if (href === '#') return;
            if (href === '#treatments') href = '#services';
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = (header ? header.offsetHeight : 0) + 16;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ─── Section scroll spy (homepage) ─────────────────────
    const sections = document.querySelectorAll('main section[id]');
    if (sections.length > 0) {
        const spy = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    document.querySelectorAll('.nav-menu .nav-link').forEach(function(l) {
                        const h = l.getAttribute('href') || '';
                        l.classList.toggle('is-active-scroll', h === '#' + id || h.endsWith('#' + id));
                    });
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px' });
        sections.forEach(function(s) { spy.observe(s); });
    }

    // ─── Lucide icons ──────────────────────────────────────
    if (typeof lucide !== 'undefined') lucide.createIcons();
});
