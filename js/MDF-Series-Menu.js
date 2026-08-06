(function () {
    var P = 'stroke="currentColor" fill="none"';
    var ICONS = {
        shield: '<path d="M12 3l7 3v5c0 5-3 7.5-7 9-4-1.5-7-4-7-9V6z"/>',
        layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
        brand: '<circle cx="12" cy="12" r="8"/><path d="M8 12l3 3 5-6"/>',
        clock: '<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>',
        wood: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4c2 4 2 8 0 16M12 4c2 4 2 8 0 16M17 4c2 4 2 8 0 16"/>',
        leather: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M6 8c4 2 8 2 12 0M6 16c4-2 8-2 12 0"/>',
        acrylic: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 20L20 8"/>',
        fabric: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
        gloss: '<circle cx="12" cy="12" r="8"/><path d="M8 9a5 5 0 014-2"/>',
        texture: '<path d="M4 8h16M4 12h16M4 16h16"/><path d="M8 6v12M16 6v12"/>',
        plate: '<rect x="3" y="8" width="18" height="8" rx="2"/><circle cx="6.5" cy="12" r=".8"/><circle cx="17.5" cy="12" r=".8"/>',
        border: '<rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="10" height="10"/>',
        size: '<path d="M4 20V4h16"/><path d="M4 14h6v6"/>',
        orient: '<rect x="3" y="6" width="8" height="12" rx="1"/><rect x="13" y="8" width="8" height="8" rx="1"/>',
        laser: '<path d="M12 3v6"/><path d="M8 9h8l-4 12z"/>',
        foil: '<path d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z"/>',
        print: '<rect x="6" y="3" width="12" height="5"/><rect x="4" y="8" width="16" height="8" rx="2"/><rect x="7" y="15" width="10" height="6"/>',
        stitch: '<path d="M4 12h2m2 0h2m2 0h2m2 0h2m2 0h2"/><path d="M4 7h16M4 17h16"/>',
        corner: '<path d="M4 10V4h6"/><path d="M20 14v6h-6"/>',
        edge: '<rect x="4" y="6" width="16" height="12" rx="2"/><path d="M4 9h16"/>',
        insert: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6M9 13h6"/>',
        screw: '<circle cx="12" cy="12" r="7"/><path d="M9 12h6M12 9v6"/>',
        ring: '<circle cx="7" cy="12" r="3"/><path d="M10 12h10"/>',
        hidden: '<path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z"/><path d="M4 4l16 16"/>',
        magnet: '<path d="M6 4v8a6 6 0 0012 0V4h-4v8a2 2 0 01-4 0V4z"/>',
        palette: '<path d="M12 3a9 9 0 000 18c1.5 0 2-1 1.5-2s0-2 1.5-2h2A4 4 0 0021 13c0-5.5-4-10-9-10z"/><circle cx="8" cy="10" r="1"/><circle cx="12" cy="7.5" r="1"/>',
        restaurant: '<path d="M7 3v8M5 3v4a2 2 0 004 0V3"/><path d="M7 11v10"/><path d="M17 3c-2 2-2 6 0 8v10"/>',
        fine: '<path d="M7 4h10l-1 5a4 4 0 01-8 0z"/><path d="M12 13v6M9 20h6"/>',
        cafe: '<path d="M4 8h12v5a5 5 0 01-10 0z"/><path d="M16 9h2a2 2 0 010 4h-2"/><path d="M4 20h14"/>',
        coffee: '<path d="M8 3v3M12 3v3M16 3v3"/><rect x="5" y="8" width="14" height="9" rx="3"/>',
        hotel: '<path d="M4 20V6l8-3 8 3v14"/><path d="M9 20v-5h6v5"/>',
        resort: '<path d="M12 12v9"/><path d="M12 12c-3-4-7-3-8-1 3-1 5 0 8 1z"/><path d="M12 12c3-4 7-3 8-1-3-1-5 0-8 1z"/><path d="M4 21h16"/>',
        rooftop: '<path d="M3 10l9-6 9 6"/><path d="M6 10v9h12v-9"/><path d="M10 19v-4h4v4"/>',
        bar: '<path d="M4 4h16l-8 8z"/><path d="M12 12v7M8 19h8"/>',
        brewery: '<rect x="6" y="6" width="9" height="14" rx="2"/><path d="M15 9h3v7h-3"/><path d="M9 3h3v3"/>',
        banquet: '<path d="M3 18h18"/><path d="M6 18a6 6 0 0112 0"/><path d="M12 6v2"/>',
        bakery: '<path d="M5 14c0-4 3-7 7-7s7 3 7 7z"/><path d="M3 14h18v3a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
        food: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M9 10v9"/>',
        club: '<path d="M6 4l1 12a5 5 0 0010 0l1-12z"/><path d="M9 20h6"/>',
        chain: '<path d="M10 14a4 4 0 006 0l2-2a4 4 0 00-6-6"/><path d="M14 10a4 4 0 00-6 0l-2 2a4 4 0 006 6"/>',
        core: '<rect x="3" y="7" width="18" height="10" rx="2"/><path d="M3 11h18M3 13h18"/>',
        drop: '<path d="M12 3s6 6.5 6 10a6 6 0 01-12 0c0-3.5 6-10 6-10z"/>',
        clean: '<path d="M9 3h4l1 6H8z"/><path d="M8 9h8v10a2 2 0 01-2 2h-4a2 2 0 01-2-2z"/>',
        scratch: '<path d="M4 20L20 4"/><path d="M10 4h10v10"/>',
        precision: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>'
    };
    document.querySelectorAll('.icon[data-ico]').forEach(function (el) {
        var k = el.getAttribute('data-ico');
        if (ICONS[k]) el.innerHTML = '<svg viewBox="0 0 24 24" ' + P + '>' + ICONS[k] + '</svg>';
    });

    // scroll reveal
    var targets = document.querySelectorAll('.reveal, .card, .mat-card, .ind-card, .feat-card, .faq-item, .gold-underline');
    targets.forEach(function (t) { if (!t.classList.contains('reveal')) t.classList.add('stagger'); });
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e, i) {
            if (e.isIntersecting) {
                setTimeout(function () { e.target.classList.add('in-view'); }, Math.min(i * 70, 420));
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8%' });
    targets.forEach(function (t) { io.observe(t); });

    // accordion FAQ
    document.querySelectorAll('.faq-item').forEach(function (item) {
        var q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
        q.addEventListener('click', function () {
            var open = item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(function (o) {
                o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null;
            });
            if (!open) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
        });
    });

    // customization panels
    document.querySelectorAll('#customList li').forEach(function (li) {
        li.addEventListener('click', function () { li.classList.toggle('open'); });
    });

    // button ripple
    document.querySelectorAll('.btn').forEach(function (b) {
        b.addEventListener('click', function (ev) {
            var r = document.createElement('span'), rect = b.getBoundingClientRect();
            r.className = 'ripple';
            r.style.width = r.style.height = '12px';
            r.style.left = (ev.clientX - rect.left - 6) + 'px';
            r.style.top = (ev.clientY - rect.top - 6) + 'px';
            b.appendChild(r);
            setTimeout(function () { r.remove(); }, 700);
        });
    });

    // parallax on media
    var media = document.querySelectorAll('.media-box');
    var ticking = false;
    window.addEventListener('scroll', function () {
        if (ticking) return; ticking = true;
        requestAnimationFrame(function () {
            media.forEach(function (m) {
                var r = m.getBoundingClientRect();
                if (r.bottom > 0 && r.top < window.innerHeight) {
                    var p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
                    m.style.backgroundPosition = '50% ' + (50 + p * 8) + '%';
                }
            });
            ticking = false;
        });
    }, { passive: true });
})();
