/**
 * WEBSITE STARTER TEMPLATE - JAVASCRIPT
 * Based on PhysioPulse Healthcare Website
 *
 * This file includes common interactive features for static websites:
 * - Mobile menu toggle
 * - Smooth scrolling
 * - Dropdown menus
 * - Scroll-based header behavior
 */

/* =============================================================================
   1. MOBILE MENU TOGGLE
   ============================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            const isOpen = navMenu.classList.contains('nav-menu-open');

            // Toggle menu
            navMenu.classList.toggle('nav-menu-open');

            // Update ARIA attribute for accessibility
            this.setAttribute('aria-expanded', !isOpen);

            // Optional: Prevent body scroll when menu is open on mobile
            if (!isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking nav links (better mobile UX)
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('nav-menu-open');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = hamburger.contains(event.target) || navMenu.contains(event.target);

            if (!isClickInside && navMenu.classList.contains('nav-menu-open')) {
                navMenu.classList.remove('nav-menu-open');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
});

/* =============================================================================
   2. SMOOTH SCROLLING FOR ANCHOR LINKS
   ============================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    // Select all links with # in href
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Ignore empty hash or just #
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }

            const targetElement = document.querySelector(href);

            if (targetElement) {
                e.preventDefault();

                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Optional: Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, href);
                }

                // Optional: Focus on target for accessibility
                targetElement.focus({ preventScroll: true });
            }
        });
    });
});

/* =============================================================================
   3. DROPDOWN MENU FUNCTIONALITY
   ============================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (toggle && menu) {
            // Toggle on click
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const isOpen = dropdown.classList.contains('dropdown-open');

                // Close all other dropdowns first
                document.querySelectorAll('.nav-dropdown').forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('dropdown-open');
                        const otherToggle = d.querySelector('.dropdown-toggle');
                        if (otherToggle) {
                            otherToggle.setAttribute('aria-expanded', 'false');
                        }
                    }
                });

                // Toggle current dropdown
                dropdown.classList.toggle('dropdown-open');
                toggle.setAttribute('aria-expanded', !isOpen);
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', function(event) {
                if (!dropdown.contains(event.target)) {
                    dropdown.classList.remove('dropdown-open');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Close on Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && dropdown.classList.contains('dropdown-open')) {
                    dropdown.classList.remove('dropdown-open');
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.focus();
                }
            });
        }
    });
});

/* =============================================================================
   4. STICKY HEADER ON SCROLL (Optional)
   ============================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');

    if (header) {
        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            // Add shadow when scrolled
            if (currentScroll > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

            // Optional: Hide header on scroll down, show on scroll up
            // Uncomment to enable:
            /*
            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
            */

            lastScroll = currentScroll;
        });
    }
});

/* =============================================================================
   5. FORM VALIDATION (Basic Example)
   ============================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form[data-validate]');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                // Remove previous error states
                field.classList.remove('field-error');

                // Validate
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('field-error');

                    // Show error message
                    let errorMsg = field.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('span');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = 'red';
                        errorMsg.style.fontSize = '14px';
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                } else {
                    // Remove error message if valid
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }

                // Email validation
                if (field.type === 'email' && field.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        field.classList.add('field-error');
                    }
                }
            });

            if (!isValid) {
                e.preventDefault();
                // Scroll to first error
                const firstError = form.querySelector('.field-error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });
    });
});

/* =============================================================================
   6. IMAGE LAZY LOADING (For older browsers without native support)
   ============================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    // Check if browser supports native lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading, nothing to do
        return;
    }

    // Fallback for older browsers
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback: load all images immediately
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
});

/* =============================================================================
   7. ACCORDION FUNCTIONALITY (Optional)
   ============================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const isOpen = accordionItem.classList.contains('accordion-open');

            // Close all other accordions (optional - remove for multi-open)
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('accordion-open');
                    const content = item.querySelector('.accordion-content');
                    if (content) content.style.maxHeight = null;
                }
            });

            // Toggle current accordion
            accordionItem.classList.toggle('accordion-open');

            if (!isOpen) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = null;
            }

            // Update ARIA
            this.setAttribute('aria-expanded', !isOpen);
        });
    });
});

/* =============================================================================
   8. MODAL/POPUP FUNCTIONALITY (Optional)
   ============================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    // Open modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);

            if (modal) {
                modal.classList.add('modal-open');
                document.body.style.overflow = 'hidden';

                // Focus trap
                const focusableElements = modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (focusableElements.length > 0) {
                    focusableElements[0].focus();
                }
            }
        });
    });

    // Close modal
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('modal-open');
                document.body.style.overflow = '';
            }
        });
    });

    // Close on overlay click
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('modal-open');
                document.body.style.overflow = '';
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.modal-open');
            if (openModal) {
                openModal.classList.remove('modal-open');
                document.body.style.overflow = '';
            }
        }
    });
});

/* =============================================================================
   9. SCROLL ANIMATIONS (Optional - Fade in on scroll)
   ============================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    if (animatedElements.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // CSS for animated state
    const style = document.createElement('style');
    style.textContent = `
        [data-animate].animated {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

/* =============================================================================
   10. ANALYTICS EVENT TRACKING (Optional)
   ============================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonHref = this.getAttribute('href');

            // Example: Google Analytics 4
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    'button_text': buttonText,
                    'button_url': buttonHref
                });
            }

            // Example: Facebook Pixel
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: buttonText
                });
            }

            console.log('CTA clicked:', buttonText, buttonHref);
        });
    });

    // Track phone number clicks
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_click', {
                    'phone_number': this.getAttribute('href')
                });
            }
        });
    });

    // Track email clicks
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'email_click', {
                    'email': this.getAttribute('href')
                });
            }
        });
    });
});

/* =============================================================================
   END OF JAVASCRIPT
   ============================================================================= */
