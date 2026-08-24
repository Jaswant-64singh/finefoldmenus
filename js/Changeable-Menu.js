/* ============================================================
   Fine Fold Menus — Premium Changeable Menu Collection
   Vanilla JS interactions
   "One Premium Cover. Endless Possibilities."
   ============================================================ */
(function () {
    'use strict';

    var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    var reduceMotion = motionQuery.matches;
    var noHover = window.matchMedia('(hover: none)').matches;

    function each(list, fn) {
        Array.prototype.forEach.call(list, fn);
    }

    /* ---------------------------------------------------------
       1. Scroll reveal
    --------------------------------------------------------- */
    function initReveal() {
        var items = document.querySelectorAll('.changeable-menu-content .cm-reveal');
        if (!items.length) { return; }

        if (reduceMotion || !('IntersectionObserver' in window)) {
            each(items, function (el) { el.classList.add('is-visible'); });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            each(entries, function (entry) {
                if (!entry.isIntersecting) { return; }
                var el = entry.target;
                var delay = parseInt(el.getAttribute('data-delay'), 10) || 0;
                window.setTimeout(function () { el.classList.add('is-visible'); }, delay);
                observer.unobserve(el);
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        each(items, function (el) { observer.observe(el); });
    }

    /* ---------------------------------------------------------
       2. Hero — parallax + "page replacement" animation
          One inner page slides out, the next slides in,
          and a gold line highlights the new page.
          The outer cover never moves.
    --------------------------------------------------------- */
    function initHero() {
        var hero = document.getElementById('cm-hero');
        var stage = document.getElementById('cmHeroStage');
        if (!hero || !stage) { return; }

        var bg = hero.querySelector('.cm-hero__bg img');
        var leaves = stage.querySelectorAll('.cm-leaf--live');
        var swapping = false;

        /* -- the page replacement -- */
        function swapPage() {
            if (swapping || leaves.length < 2 || reduceMotion) { return; }

            var current = null;
            var next = null;

            each(leaves, function (leaf) {
                if (leaf.classList.contains('is-active')) { current = leaf; }
            });
            if (!current) { current = leaves[0]; }

            each(leaves, function (leaf) {
                if (leaf !== current && !next) { next = leaf; }
            });
            if (!next) { return; }

            swapping = true;

            /* outgoing page slides out */
            current.classList.remove('is-active');
            current.classList.add('is-leaving');

            /* incoming page is staged just off the cover */
            next.classList.remove('is-leaving');
            next.classList.add('is-entering');
            void next.offsetWidth; /* commit the start state */

            window.setTimeout(function () {
                next.classList.remove('is-entering');
                next.classList.add('is-active');
            }, 200);

            window.setTimeout(function () {
                current.classList.remove('is-leaving');
                swapping = false;
            }, 720);
        }

        /* -- scroll drives the replacement, gently -- */
        if (!reduceMotion) {
            var lastY = window.pageYOffset;
            var travelled = 0;
            var ticking = false;

            function onScrollFrame() {
                ticking = false;
                var y = window.pageYOffset;
                var rect = hero.getBoundingClientRect();
                var inView = rect.bottom > 120 && rect.top < window.innerHeight;

                travelled += Math.abs(y - lastY);
                lastY = y;

                if (inView && travelled > 260) {
                    travelled = 0;
                    swapPage();
                }
            }

            window.addEventListener('scroll', function () {
                if (ticking) { return; }
                ticking = true;
                window.requestAnimationFrame(onScrollFrame);
            }, { passive: true });

            /* -- hover also replaces a page -- */
            if (!noHover) {
                stage.addEventListener('mouseenter', swapPage);
            } else {
                stage.addEventListener('touchstart', swapPage, { passive: true });
            }
        }

        /* -- subtle mouse parallax on the composition -- */
        if (reduceMotion || noHover) { return; }

        var targetX = 0, targetY = 0, curX = 0, curY = 0, raf = null;
        var scene = stage;

        function render() {
            curX += (targetX - curX) * 0.06;
            curY += (targetY - curY) * 0.06;
            scene.style.setProperty('--mx', curX.toFixed(3));
            scene.style.setProperty('--my', curY.toFixed(3));
            if (bg) {
                bg.style.transform = 'translate3d(' + (curX * -14).toFixed(2) + 'px,' +
                    (curY * -9).toFixed(2) + 'px, 0)';
            }
            if (Math.abs(targetX - curX) > 0.002 || Math.abs(targetY - curY) > 0.002) {
                raf = window.requestAnimationFrame(render);
            } else {
                raf = null;
            }
        }

        hero.addEventListener('mousemove', function (e) {
            var rect = hero.getBoundingClientRect();
            targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            if (raf === null) { raf = window.requestAnimationFrame(render); }
        });

        hero.addEventListener('mouseleave', function () {
            targetX = 0;
            targetY = 0;
            if (raf === null) { raf = window.requestAnimationFrame(render); }
        });
    }

    /* ---------------------------------------------------------
       3. Binding Selector (Changeable Menu Formats)
          Accessible tablist with a roving tabindex.
    --------------------------------------------------------- */
    function initBinder() {
        var binder = document.getElementById('cmBinder');
        if (!binder) { return; }

        var tabs = binder.querySelectorAll('.cm-bind-opt');
        var panels = binder.querySelectorAll('.cm-bind-panel');
        if (!tabs.length || !panels.length) { return; }

        function select(binding, moveFocus) {
            binder.setAttribute('data-binding', binding);

            each(tabs, function (tab) {
                var on = tab.getAttribute('data-binding') === binding;
                tab.classList.toggle('is-active', on);
                tab.setAttribute('aria-selected', on ? 'true' : 'false');
                tab.setAttribute('tabindex', on ? '0' : '-1');
                if (on && moveFocus) { tab.focus(); }
            });

            each(panels, function (panel) {
                var on = panel.id === 'cm-bind-panel-' + binding;
                if (on) {
                    panel.hidden = false;
                    void panel.offsetWidth;
                    panel.classList.add('is-active');
                } else {
                    panel.classList.remove('is-active');
                    panel.hidden = true;
                }
            });
        }

        each(tabs, function (tab, i) {
            tab.addEventListener('click', function () {
                select(tab.getAttribute('data-binding'), false);
            });

            tab.addEventListener('keydown', function (e) {
                var last = tabs.length - 1;
                var target = -1;

                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { target = i === last ? 0 : i + 1; }
                if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { target = i === 0 ? last : i - 1; }
                if (e.key === 'Home') { target = 0; }
                if (e.key === 'End') { target = last; }

                if (target > -1) {
                    e.preventDefault();
                    select(tabs[target].getAttribute('data-binding'), true);
                }
            });
        });

        /* hover preview on pointer devices */
        if (!noHover) {
            each(tabs, function (tab) {
                tab.addEventListener('mouseenter', function () {
                    select(tab.getAttribute('data-binding'), false);
                });
            });
        }
    }

    /* ---------------------------------------------------------
       4. Menu Construction Studio (Complete Customization)
    --------------------------------------------------------- */
    function initStudio() {
        var studio = document.getElementById('cmStudio');
        if (!studio) { return; }

        var spots = studio.querySelectorAll('.cm-hotspot');
        var cards = studio.querySelectorAll('.cm-studio__card');
        var lines = studio.querySelectorAll('.cm-studio__lines line');
        if (!spots.length || !cards.length) { return; }

        function activate(zone) {
            studio.setAttribute('data-zone', zone);

            each(spots, function (spot) {
                var on = spot.getAttribute('data-zone') === zone;
                spot.classList.toggle('is-active', on);
                spot.setAttribute('aria-pressed', on ? 'true' : 'false');
            });

            each(lines, function (line) {
                line.classList.toggle('is-active', line.getAttribute('data-line') === zone);
            });

            each(cards, function (card) {
                var on = card.getAttribute('data-card') === zone;
                if (on) {
                    card.hidden = false;
                    void card.offsetWidth;
                    card.classList.add('is-active');
                } else {
                    card.classList.remove('is-active');
                    card.hidden = true;
                }
            });
        }

        each(spots, function (spot) {
            var zone = spot.getAttribute('data-zone');
            spot.addEventListener('click', function () { activate(zone); });
            spot.addEventListener('focus', function () { activate(zone); });
            if (!noHover) {
                spot.addEventListener('mouseenter', function () { activate(zone); });
            }
        });

        /* sync the initial markup state */
        activate(studio.getAttribute('data-zone') || spots[0].getAttribute('data-zone'));
    }

    /* ---------------------------------------------------------
       5. Menu page gallery (Changeable Menu Applications)
          Desktop: CSS hover pulls a page forward.
          Touch: tap lifts a page; the strip scroll-snaps.
    --------------------------------------------------------- */
    function initStack() {
        var stack = document.getElementById('cmStack');
        if (!stack) { return; }

        var sheets = stack.querySelectorAll('.cm-sheet');
        if (!sheets.length) { return; }

        function lift(sheet) {
            each(sheets, function (s) {
                s.classList.toggle('is-lifted', s === sheet);
            });
        }

        each(sheets, function (sheet) {
            sheet.addEventListener('click', function () {
                lift(sheet.classList.contains('is-lifted') ? null : sheet);
            });

            sheet.addEventListener('focus', function () { lift(sheet); });
            sheet.addEventListener('blur', function () { sheet.classList.remove('is-lifted'); });

            sheet.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    lift(sheet.classList.contains('is-lifted') ? null : sheet);
                }
            });
        });
    }

    /* ---------------------------------------------------------
       6. Long-Term Flexibility
          The cover stays. Only the interior pages change.
    --------------------------------------------------------- */
    function initSwap() {
        var visual = document.getElementById('cmSwapVisual');
        var timeline = document.getElementById('cmTimeline');
        if (!visual || !timeline) { return; }

        var swap = visual.querySelector('.cm-swap');
        var inners = visual.querySelectorAll('.cm-inner');
        var nodes = timeline.querySelectorAll('.cm-timeline__node');
        var fill = timeline.querySelector('.cm-timeline__fill');
        if (!swap || !inners.length || !nodes.length) { return; }

        var index = 0;
        var autoTimer = null;
        var userDriven = false;

        function paintFill() {
            if (!fill) { return; }
            var node = nodes[index];
            var railStart = 8;
            var reach = (node.offsetLeft + node.offsetWidth / 2) - railStart;
            fill.style.width = Math.max(0, reach) + 'px';
        }

        function show(i) {
            index = (i + nodes.length) % nodes.length;
            var variant = nodes[index].getAttribute('data-variant');
            swap.setAttribute('data-variant', variant);

            each(inners, function (inner) {
                inner.classList.toggle('is-active', inner.getAttribute('data-variant') === variant);
            });

            each(nodes, function (node, n) {
                var on = n === index;
                node.classList.toggle('is-active', on);
                node.setAttribute('aria-pressed', on ? 'true' : 'false');
            });

            paintFill();
        }

        function stopAuto() {
            if (autoTimer) {
                window.clearInterval(autoTimer);
                autoTimer = null;
            }
        }

        function startAuto() {
            if (autoTimer || reduceMotion || userDriven) { return; }
            autoTimer = window.setInterval(function () { show(index + 1); }, 4200);
        }

        each(nodes, function (node, n) {
            node.addEventListener('click', function () {
                userDriven = true;
                stopAuto();
                show(n);
            });
        });

        if (!noHover) {
            timeline.addEventListener('mouseenter', stopAuto);
            timeline.addEventListener('mouseleave', startAuto);
        }

        window.addEventListener('resize', paintFill);

        show(0);

        /* only cycle while the section is on screen */
        if (!reduceMotion && 'IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                each(entries, function (entry) {
                    if (entry.isIntersecting) { startAuto(); } else { stopAuto(); }
                });
            }, { threshold: 0.35 });
            observer.observe(visual);
        }
    }

    /* ---------------------------------------------------------
       7. FAQ accordion — one open at a time
    --------------------------------------------------------- */
    function initFaq() {
        var faq = document.getElementById('cmFaq');
        if (!faq) { return; }

        var items = faq.querySelectorAll('.cm-faq__item');
        if (!items.length) { return; }

        function closeItem(item) {
            var btn = item.querySelector('.cm-faq__q');
            var panel = item.querySelector('.cm-faq__a');
            item.classList.remove('is-open');
            if (btn) { btn.setAttribute('aria-expanded', 'false'); }
            if (panel) { panel.style.maxHeight = '0px'; }
        }

        function openItem(item) {
            var btn = item.querySelector('.cm-faq__q');
            var panel = item.querySelector('.cm-faq__a');
            item.classList.add('is-open');
            if (btn) { btn.setAttribute('aria-expanded', 'true'); }
            if (panel) { panel.style.maxHeight = panel.scrollHeight + 'px'; }
        }

        each(items, function (item) {
            var btn = item.querySelector('.cm-faq__q');
            if (!btn) { return; }
            btn.addEventListener('click', function () {
                var wasOpen = item.classList.contains('is-open');
                each(items, closeItem);
                if (!wasOpen) { openItem(item); }
            });
        });

        window.addEventListener('resize', function () {
            var open = faq.querySelector('.cm-faq__item.is-open .cm-faq__a');
            if (open) { open.style.maxHeight = open.scrollHeight + 'px'; }
        });
    }

    /* ---------------------------------------------------------
       Boot
    --------------------------------------------------------- */
    function boot() {
        initReveal();
        initHero();
        initBinder();
        initStudio();
        initStack();
        initSwap();
        initFaq();
    }

    /* respond if the visitor changes their motion preference */
    if (typeof motionQuery.addEventListener === 'function') {
        motionQuery.addEventListener('change', function (e) {
            reduceMotion = e.matches;
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
