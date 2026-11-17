(() => {
    'use strict';

    if (document.querySelector('fine-fold-concierge')) return;

    const contactPage = 'Speak-With-Us.html';
    const topics = [
        {
            title: 'Menu styles', icon: 'book', description: 'Formats for your venue',
            questions: [
                ['Which menu styles do you offer?', 'Explore luxury dine-in covers, changeable menus, acrylic and MDF covers, waterproof menus, bar lists and poolside formats. The right fit depends on your venue and how often you change your menu.', 'Luxury-Dine-in-Menu.html', 'Explore dine-in menus', /\b(styles?|formats?|types?|range|collections?|options|offer|dine[- ]?in)\b/i],
                ['Can I replace individual pages?', 'Yes. Changeable menus use replaceable pages or inserts, so you can update prices or seasonal dishes and keep the cover. Binding options include rings, screws and magnetic inserts.', 'Changeable-Menu.html', 'See changeable menus', /\b(replace\w*|changeable|seasonal|inserts?|bindin\w*|update\w*|refill\w*)\b/i],
                ['What works for a poolside menu?', 'Poolside menus come in water-resistant, easy-care materials. Resistance to splashes depends on the material and finish you choose.', 'Poolside-Menu.html', 'Explore poolside menus', /\b(pool\w*|waterproof|water[- ]resistant|outdoors?|splashes)\b/i],
                ['Do you make cocktail and wine lists?', 'Yes. Fine Fold makes bar and drink menus for cocktail lists, wine selections and other beverages.', 'Bar-Drink-Menu.html', 'Browse bar menus', /\b(bars?|lounges?|cocktails?|wines?|drinks?|beverages?)\b/i]
            ]
        },
        {
            title: 'Materials & branding', icon: 'leaf', description: 'Covers, textures and finishes',
            questions: [
                ['Which cover materials can I choose?', 'Options include genuine leather, PU leather, wood, acrylic, metal, fabric and canvas. The team can help you select a material for your setting and daily use.', 'how-its-work.html', 'See the material selection process', /\b(materials?|leather|wood\w*|acrylic|mdf|metal|fabric|canvas|textures?)\b/i],
                ['Can you add my logo or brand colours?', 'Yes. Covers can be tailored to your colours and identity. Branding options include logo embossing, foil stamping, laser engraving, UV printing and decorative stitching.', 'Fully-Customized-Menu.html', 'Explore custom covers', /\b(logos?|brand\w*|colou?rs?|foil\w*|emboss\w*|engrav\w*|customi[sz]\w*|finish\w*)\b/i]
            ]
        },
        {
            title: 'Orders & samples', icon: 'case', description: 'From first enquiry to production',
            questions: [
                ['How do I start a project?', 'Start with a consultation about your venue, design preferences and how the menus will be used. The team then plans the design, helps select materials and confirms the branding before manufacturing.', 'how-its-work.html', 'See how it works', /\b(start|begin|process|steps?|consultation|how it works)\b/i],
                ['Can I review a sample first?', 'Where applicable, Fine Fold prepares a design proof or product sample before full production. You can review the material, logo placement, colours and finish and share your feedback.', 'how-its-work.html', 'Read about prototype approval', /\b(samples?|proofs?|prototypes?|approval)\b/i],
                ['How can I get a quote?', 'Share your venue, preferred menu style, quantity and any branding requirements with the Fine Fold team through the Contact Us page.', contactPage, 'Contact us for a quote', /\b(quot\w*|pric\w*|cost\w*|budget|how much|contact|speak|human|agent|team)\b/i]
            ]
        }
    ];

    const paths = {
        book: '<path d="M3 5q5-1 9 2 4-3 9-2v13q-5-1-9 2-4-3-9-2zM12 7v13"/>',
        leaf: '<path d="M4 19C2 8 10 4 20 4c0 11-5 17-14 14m-2 3L16 9"/>',
        case: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 12q9 5 18 0m-9 0v3"/>',
        arrow: '<path d="m9 5 7 7-7 7"/>',
        back: '<path d="m14 5-7 7 7 7"/>',
        send: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
        close: '<path d="m6 6 12 12M18 6 6 18"/>'
    };
    function icon(name) {
        return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + paths[name] + '</svg>';
    }

    const host = document.createElement('fine-fold-concierge');
    const root = host.attachShadow({ mode: 'open' });
    root.innerHTML = `
        <link rel="stylesheet" href="css/menu-concierge.css">
        <button class="launcher" type="button" aria-haspopup="dialog" aria-controls="concierge" aria-expanded="false" aria-label="Open Fine Fold menu concierge">
            <img src="images/concierge-menu.svg" alt="">
            <span>Ask Fine Fold</span>
        </button>
        <dialog id="concierge" aria-labelledby="concierge-title">
            <div class="sheet">
                <header>
                    <div class="brand"><img src="images/concierge-menu.svg" alt=""><div><small>Fine Fold Menus</small><h2 id="concierge-title">Menu concierge</h2></div></div>
                    <button class="close" type="button" aria-label="Close menu concierge">${icon('close')}</button>
                </header>
                <div class="reading"></div>
                <footer>
                    <form><input aria-label="Your menu question" placeholder="Ask a menu question…" maxlength="240" required>
                        <button class="send" aria-label="Send question" type="submit">${icon('send')}</button></form>
                    <a href="Speak-With-Us.html">Speak with us <span aria-hidden="true">↗</span></a>
                </footer>
            </div>
        </dialog>`;
    // Mount after the isolated stylesheet is ready to avoid an unstyled flash.
    host.hidden = true;
    root.querySelector('link').addEventListener('load', () => { host.hidden = false; });
    document.body.append(host);

    const launcher = root.querySelector('.launcher');
    const dialog = root.querySelector('dialog');
    const reading = root.querySelector('.reading');
    const input = root.querySelector('input');
    const allQuestions = topics.flatMap(topic => topic.questions);

    function element(tag, text, className) {
        const node = document.createElement(tag);
        if (text) node.textContent = text;
        if (className) node.className = className;
        return node;
    }
    function startView(title, back) {
        reading.replaceChildren();
        reading.scrollTop = 0;
        if (back) {
            const button = element('button', '', 'back');
            button.type = 'button';
            button.innerHTML = icon('back') + 'Back';
            button.addEventListener('click', back);
            reading.append(button);
        }
        const heading = element('h3', title);
        heading.tabIndex = -1;
        reading.append(heading);
        if (dialog.open) heading.focus({ preventScroll: true });
    }
    function addChoice(title, description, symbol, action) {
        const button = element('button', '', 'choice');
        button.type = 'button';
        if (symbol) {
            const badge = element('span', '', 'badge');
            badge.innerHTML = icon(symbol);
            button.append(badge);
        }
        const label = element('span', title, 'choice-label');
        if (description) label.append(element('span', description, 'description'));
        const arrow = element('span', '', 'arrow');
        arrow.innerHTML = icon('arrow');
        button.append(label, arrow);
        button.addEventListener('click', action);
        reading.append(button);
    }
    function home() {
        startView('How can I help?', null);
        reading.append(element('p', 'Choose a topic or ask a question below.', 'intro'));
        for (const topic of topics) {
            addChoice(topic.title, topic.description, topic.icon, () => openTopic(topic));
        }
    }
    function openTopic(topic) {
        startView(topic.title, home);
        for (const question of topic.questions) {
            addChoice(question[0], '', '', () => answer(question, () => openTopic(topic)));
        }
    }
    function answer(question, back, typed) {
        startView(typed || question[0], back);
        const reply = element('div', '', 'reply');
        reply.append(element('p', question[1]));
        const link = element('a', question[3] + ' ↗');
        link.href = question[2];
        reply.append(link);
        reading.append(reply);
        const list = element('button', 'Browse all topics', 'topics-link');
        list.type = 'button';
        list.addEventListener('click', home);
        reading.append(list);
    }

    root.querySelector('form').addEventListener('submit', event => {
        event.preventDefault();
        const query = input.value.trim();
        if (!query) { input.focus(); return; }
        input.value = '';
        const exact = allQuestions.find(q => q[0].toLowerCase() === query.toLowerCase());
        const matches = allQuestions.filter(q => q[4].test(query));
        // Give project-specific questions to the team instead of guessing terms.
        const needsTeam = /\b(deliver\w*|shipp?\w*|lead time|how long|minimum|moq|refund\w*|return\w*|track\w*|warranty|discount\w*|deadline|phone|address|hours)\b/i.test(query);
        if (exact || (!needsTeam && matches.length === 1)) {
            answer(exact || matches[0], home, query);
        } else if (!needsTeam && matches.length > 1) {
            startView('Which question fits best?', home);
            matches.forEach(q => addChoice(q[0], '', '', () => answer(q, home)));
        } else {
            answer(['', 'The Fine Fold team can help with this question. Share it on the Contact Us page for guidance on your project.', contactPage, 'Go to Contact Us'], home, query);
        }
    });

    launcher.addEventListener('click', () => {
        dialog.showModal();
        launcher.setAttribute('aria-expanded', 'true');
        reading.querySelector('h3').focus({ preventScroll: true });
    });
    root.querySelector('.close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => {
        launcher.setAttribute('aria-expanded', 'false');
        launcher.focus({ preventScroll: true });
    });
    home();
})();
