/* ============================================================
   Fine Fold Menus — Premium Wiro Menu
   Vanilla JS interactions ("The Premium Binding Studio")
   ============================================================ */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------------------------------------------------------
       1. Scroll reveal
    --------------------------------------------------------- */
    function initReveal() {
        var items = document.querySelectorAll('.wm-reveal');
        if (!items.length) { return; }

        if (reduceMotion || !('IntersectionObserver' in window)) {
            items.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) { return; }
                var el = entry.target;
                var delay = parseInt(el.getAttribute('data-delay'), 10) || 0;
                window.setTimeout(function () { el.classList.add('is-visible'); }, delay);
                observer.unobserve(el);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        items.forEach(function (el) { observer.observe(el); });
    }

    /* ---------------------------------------------------------
       2. Hero — subtle mouse parallax + page shift
    --------------------------------------------------------- */
    function initHeroParallax() {
        var hero = document.getElementById('wm-hero');
        var scene = document.getElementById('wmBookScene');
        var bg = hero ? hero.querySelector('.wm-hero__bg') : null;
        if (!hero || !scene || !bg || reduceMotion) { return; }
        if (window.matchMedia('(hover: none)').matches) { return; }

        var targetX = 0, targetY = 0, curX = 0, curY = 0;
        var rafId = null;

        function render() {
            curX += (targetX - curX) * 0.06;
            curY += (targetY - curY) * 0.06;
            scene.style.setProperty('--mx', curX.toFixed(3));
            scene.style.setProperty('--my', curY.toFixed(3));
            bg.style.transform = 'translate3d(' + (curX * -12).toFixed(2) + 'px,' +
                (curY * -8).toFixed(2) + 'px, 0)';
            if (Math.abs(targetX - curX) > 0.002 || Math.abs(targetY - curY) > 0.002) {
                rafId = window.requestAnimationFrame(render);
            } else {
                rafId = null;
            }
        }

        hero.addEventListener('mousemove', function (e) {
            var rect = hero.getBoundingClientRect();
            targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            if (rafId === null) { rafId = window.requestAnimationFrame(render); }
        });

        hero.addEventListener('mouseleave', function () {
            targetX = 0;
            targetY = 0;
            if (rafId === null) { rafId = window.requestAnimationFrame(render); }
        });
    }

    /* ---------------------------------------------------------
       3. Materials carousel
    --------------------------------------------------------- */
    function initCarousel() {
        var root = document.getElementById('wmCarousel');
        var track = document.getElementById('wmCarouselTrack');
        var prevBtn = document.getElementById('wmPrev');
        var nextBtn = document.getElementById('wmNext');
        var bar = document.getElementById('wmCarouselBar');
        if (!root || !track || !prevBtn || !nextBtn || !bar) { return; }

        var slides = Array.prototype.slice.call(track.children);
        var total = slides.length;
        if (!total) { return; }

        var index = 0;

        function update() {
            track.style.transform = 'translateX(-' + (index * 100) + '%)';
            bar.style.width = (((index + 1) / total) * 100) + '%';
            slides.forEach(function (slide, i) {
                slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
            });
        }

        function goTo(i) {
            index = (i + total) % total;
            update();
        }

        prevBtn.addEventListener('click', function () { goTo(index - 1); });
        nextBtn.addEventListener('click', function () { goTo(index + 1); });

        root.setAttribute('tabindex', '0');
        root.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1); }
            if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
        });

        /* touch swipe */
        var startX = 0, deltaX = 0, dragging = false;

        track.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
            deltaX = 0;
            dragging = true;
        }, { passive: true });

        track.addEventListener('touchmove', function (e) {
            if (!dragging) { return; }
            deltaX = e.touches[0].clientX - startX;
        }, { passive: true });

        track.addEventListener('touchend', function () {
            if (!dragging) { return; }
            dragging = false;
            if (Math.abs(deltaX) > 45) {
                goTo(deltaX < 0 ? index + 1 : index - 1);
            }
        });

        update();
    }

    /* ---------------------------------------------------------
       4. Customization configurator
    --------------------------------------------------------- */
    function initConfigurator() {
        var stage = document.getElementById('wmConfig');
        if (!stage) { return; }

        var nodes = stage.querySelectorAll('.wm-node');
        var lines = stage.querySelectorAll('.wm-config__lines line');

        function activate(zone) {
            stage.setAttribute('data-active', zone);
            lines.forEach(function (line) {
                line.classList.toggle('is-active', line.getAttribute('data-line') === zone);
            });
        }

        function clearActive() {
            stage.removeAttribute('data-active');
            lines.forEach(function (line) { line.classList.remove('is-active'); });
        }

        nodes.forEach(function (node) {
            var zone = node.getAttribute('data-zone');

            node.addEventListener('mouseenter', function () { activate(zone); });
            node.addEventListener('focus', function () { activate(zone); });

            node.addEventListener('click', function () {
                var pinned = node.classList.contains('is-pinned');
                nodes.forEach(function (n) { n.classList.remove('is-pinned'); });
                if (pinned) {
                    clearActive();
                } else {
                    node.classList.add('is-pinned');
                    activate(zone);
                }
            });

            node.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    node.click();
                }
            });
        });

        stage.addEventListener('mouseleave', function () {
            var pinned = stage.querySelector('.wm-node.is-pinned');
            if (pinned) {
                activate(pinned.getAttribute('data-zone'));
            } else {
                clearActive();
            }
        });
    }

    /* ---------------------------------------------------------
       5. FAQ accordion — one open at a time
    --------------------------------------------------------- */
    function initFaq() {
        var faq = document.getElementById('wmFaq');
        if (!faq) { return; }

        var items = faq.querySelectorAll('.wm-faq__item');

        function closeItem(item) {
            item.classList.remove('is-open');
            item.querySelector('.wm-faq__q').setAttribute('aria-expanded', 'false');
            item.querySelector('.wm-faq__a').style.maxHeight = '0px';
        }

        function openItem(item) {
            item.classList.add('is-open');
            var btn = item.querySelector('.wm-faq__q');
            var panel = item.querySelector('.wm-faq__a');
            btn.setAttribute('aria-expanded', 'true');
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }

        items.forEach(function (item) {
            var btn = item.querySelector('.wm-faq__q');
            btn.addEventListener('click', function () {
                var isOpen = item.classList.contains('is-open');
                items.forEach(closeItem);
                if (!isOpen) { openItem(item); }
            });
        });

        /* keep the open panel sized correctly on resize */
        window.addEventListener('resize', function () {
            var open = faq.querySelector('.wm-faq__item.is-open .wm-faq__a');
            if (open) { open.style.maxHeight = open.scrollHeight + 'px'; }
        });
    }

    /* ---------------------------------------------------------
       Boot
    --------------------------------------------------------- */
    function boot() {
        initReveal();
        initHeroParallax();
        initCarousel();
        initConfigurator();
        initFaq();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
