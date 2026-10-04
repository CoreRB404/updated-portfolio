    // ===== MOBILE MENU TOGGLE =====
    const menuIcon = document.querySelector('#menu-icon');
    const navUl = document.querySelector('.navbar ul');

    if (menuIcon && navUl) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('fa-xmark');
            navUl.classList.toggle('active');
        };

        // Close menu when clicking a link
        navUl.querySelectorAll('li a').forEach(link => {
            link.onclick = () => {
                menuIcon.classList.remove('fa-xmark');
                navUl.classList.remove('active');
            };
        });
    }

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Remove menu active state on scroll
        if (menuIcon && navUl) {
            menuIcon.classList.remove('fa-xmark');
            navUl.classList.remove('active');
        }
    }, { passive: true });

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            // If target is just #, scroll to top
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate scroll position
                let scrollPosition = targetElement.offsetTop;

                // If scrolling to home, don't subtract the navbar offset
                if (targetId !== '#home') {
                    scrollPosition -= 70; // Adjust for navbar height
                }

                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


// Fetch feature code when its section approaches the viewport.
function loadSection(selector, loader) {
    const section = document.querySelector(selector);
    if (!section) return;
    let pending;
    let ready = false;
    const load = () => {
        if (!pending) pending = loader().then(module => {
            module.init();
            ready = true;
        }).catch(error => {
            pending = undefined;
            console.error('Could not load section:', error);
        });
        return pending;
    };
    section.addEventListener('submit', event => {
        if (ready) return;
        event.preventDefault();
        const form = event.target;
        const submitter = event.submitter;
        load().then(() => {
            if (ready) form.requestSubmit(submitter);
        });
    }, true);
    section.addEventListener('pointerover', load, { once: true });
    section.addEventListener('focusin', load, { once: true });
    if (!('IntersectionObserver' in window)) { load(); return; }
    const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
            load();
            observer.disconnect();
        }
    }, { rootMargin: '600px' });
    observer.observe(section);
}
loadSection('#portfolio', () => import('./portfolio.js'));
loadSection('#contact', () => import('./contact.js'));
