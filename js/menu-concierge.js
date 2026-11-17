(() => {
    'use strict';

    if (document.querySelector('fine-fold-concierge')) return;

    const contactPage = 'Speak-With-Us.html';
    const chatStoreUrl = 'https://aykjvuddbxpvlmklzmrf.supabase.co/functions/v1/menu-concierge-storage';
    const supabasePublishableKey = 'sb_publishable_YosSx58tfAW6VbHb1-aqew_mhfqJvm8';
    const faqs = [
        { question: 'Which menu products does Fine Fold offer?', answer: 'The website features luxury dine-in and restaurant covers, changeable, Wiro, acrylic, MDF, waterproof NTR, food court, hotel and resort, bar and drink, and poolside menus. It also lists formats such as wine, beverage, dessert, chef’s special, booklet, laminated, QR and room-service menus.', href: 'index.html', link: 'Explore menu styles', match: /\b(menu styles|menu products|menu range|what menus|what menu types|what do you make)\b/i },
        { question: 'Which hospitality businesses do you serve?', answer: 'Fine Fold presents menu solutions for restaurants, cafés, hotels and resorts, bars and lounges, food courts, pool clubs, beach clubs and other hospitality settings.', href: 'index.html', link: 'See who we serve', match: /\b(industr\w*|who do you serve|business types|types of businesses|venues)\b/i },
        { question: 'Which materials can I choose for my menu cover?', answer: 'The website lists genuine and PU leather, natural wood, MDF, acrylic, metal, linen, canvas, cork, velvet, textured paper, laminates and specialty finishes. The suitable choice depends on the design and how the menu will be used.', href: 'Fully-Customized-Menu.html', link: 'Explore custom materials', match: /\b(materials?|leather|wood|metal|fabric|canvas|textures?|cover material)\b/i },
        { question: 'Can my menu be customized with our logo and brand colours?', answer: 'Yes. The website lists embossing, debossing, gold or silver foil stamping, UV printing, laser engraving, screen or digital printing, plus choices such as colours, textures, stitching and finishes. Available techniques depend on the selected material and design.', href: 'Fully-Customized-Menu.html', link: 'Explore branding options', match: /\b(logos?|brand\w*|colou?rs?|foil\w*|emboss\w*|deboss\w*|engrav\w*|print\w*)\b/i },
        { question: 'Can I customize the menu size, shape and layout?', answer: 'Yes. Fine Fold’s product pages describe custom dimensions, shapes, orientation, page arrangements and insert layouts, selected to suit your content, venue and service requirements.', href: 'Fully-Customized-Menu.html', link: 'See fully customized menus', match: /\b(size|sizes|shapes?|dimensions|orientation|layout|page arrangement)\b/i },
        { question: 'How does a menu project work?', answer: 'The website describes a process that starts with a consultation and requirement gathering, followed by design planning, material selection and customization. A proof or sample is prepared for review when applicable, then approved designs move into manufacturing, quality inspection, packaging and delivery.', href: 'how-its-work.html', link: 'View the project process', match: /\b(project process|how.*(work|start)|steps|consultation|production process)\b/i },
        { question: 'Can I review a proof or sample before production?', answer: 'Where applicable, Fine Fold prepares a design proof or product sample for review before full production. This lets you check details such as the material, branding placement, colours and finish.', href: 'how-its-work.html', link: 'Read about prototype approval', match: /\b(sample|proof|prototype|approve|approval)\b/i },
        { question: 'Can I enquire about bulk or multi-location orders?', answer: 'Yes. The website invites enquiries for larger hospitality requirements, including hotel groups, restaurant chains and multiple locations. Share the quantity, format and branding requirements with the team to discuss a suitable production plan.', href: contactPage, link: 'Discuss your order', match: /\b(bulk|multiple outlets|multiple locations|hotel group|restaurant chain|quantity|large order)\b/i },
        { question: 'What is a changeable menu?', answer: 'A changeable menu uses removable or replaceable pages or inserts, so menu content can be updated without replacing the complete cover.', href: 'Changeable-Menu.html', link: 'See changeable menus', match: /\b(changeable menu|replaceable menu|removable pages|menu inserts)\b/i },
        { question: 'Which binding options are available for changeable menus?', answer: 'The website lists screw binding, ring binding, Wiro binding, magnetic inserts and other replaceable-page systems. The suitable option depends on your menu and requirements.', href: 'Changeable-Menu.html', link: 'Compare binding options', match: /\b(bindings?|screw binding|ring binding|magnetic inserts?)\b/i },
        { question: 'Can I replace individual pages when dishes or prices change?', answer: 'Yes. Depending on the selected binding and insert system, individual pages or sections can be removed and replaced when required.', href: 'Changeable-Menu.html', link: 'See changeable menus', match: /\b(replace.*(page|insert)|update.*(dish|price|menu)|change.*(dish|price)|seasonal offer)\b/i },
        { question: 'What is a Wiro menu?', answer: 'A Wiro menu uses wire-loop binding to hold its pages together. The format allows flexible page movement and is offered for restaurants, cafés, hotels, bakeries and other hospitality businesses.', href: 'premium-wiro-menu.html', link: 'Explore Wiro menus', match: /\b(wiro|wire[- ]?o|wire loop)\b/i },
        { question: 'What menu types can use Wiro binding?', answer: 'The Wiro page lists food, beverage, cocktail, dessert, wine, bakery and bar menus, along with seasonal, kids’ and special-event menus.', href: 'premium-wiro-menu.html', link: 'See Wiro menu uses', match: /\b(wiro).*(food|beverage|cocktail|wine|bar)|\b(wine|cocktail|beverage).*(wiro)\b/i },
        { question: 'What is a Bar & Drink Menu for?', answer: 'A Bar & Drink Menu presents cocktails, wines, spirits, mocktails, beers and other beverages. Fine Fold offers customizable covers, branding, printing and page formats for these menus.', href: 'Bar-Drink-Menu.html', link: 'Browse bar menus', match: /\b(bar menu|drink menu|beverage menu|cocktail menu)\b/i },
        { question: 'Can you create separate cocktail, wine and spirits menus?', answer: 'Yes. The bar and drink collection can be customized for separate cocktail menus, wine lists, whisky or spirits menus, mocktails and complete beverage selections.', href: 'Bar-Drink-Menu.html', link: 'Explore bar and drink menus', match: /\b(cocktail|wine list|wine menu|whisky|whiskey|spirits|mocktail)\b/i },
        { question: 'Are waterproof menus available for bar service?', answer: 'Fine Fold offers Waterproof NTR menu solutions that may suit selected beverage-service environments. The website notes that not every menu-cover material is waterproof, so suitability should be matched to where and how the menu will be used.', href: 'Waterproof-Menu-NTR.html', link: 'Explore Waterproof NTR', match: /\b(waterproof|water[- ]resistant|ntr|spill resistant)\b/i },
        { question: 'What formats are available for food court menus?', answer: 'The food court page lists laminated menus, Waterproof NTR menus, acrylic counter displays, folded or booklet menus and changeable menus.', href: 'Food-Court-Menus.html', link: 'Explore food court menus', match: /\b(food court|quick[- ]service|counter display|food counter)\b/i },
        { question: 'Can a food court menu organize different food categories?', answer: 'Yes. Food court layouts can organize categories such as burgers, sandwiches, pizza, pasta, Indian or Chinese dishes, snacks, beverages, desserts and combo meals.', href: 'Food-Court-Menus.html', link: 'See food court formats', match: /\b(food categories|combo meals|burgers|sandwiches|pizza|pasta|quick menu)\b/i },
        { question: 'Can food court items and prices be updated later?', answer: 'Yes. Selected changeable menu formats allow individual pages or inserts to be replaced when dishes, prices, meal combinations or promotional information changes.', href: 'Food-Court-Menus.html', link: 'See food court menus', match: /\b(food court).*(updat|change|price)|\b(updat|change|price).*(food court|food item)\b/i },
        { question: 'What menu solutions are available for hotels and resorts?', answer: 'Fine Fold lists menu covers for hotel restaurants and fine dining, in-room dining and room service, poolside and outdoor dining, hotel bars and beverages, and changeable hospitality menus.', href: 'Hotels-Resorts.html', link: 'Explore hotel and resort menus', match: /\b(hotel|resort|hospitality property)\b/i },
        { question: 'Do you make in-room dining and room-service menus?', answer: 'Yes. Room-service and in-room dining menus are included in Fine Fold’s hotel and resort menu range, and can be customized to present food, beverages and dining information.', href: 'Hotels-Resorts.html', link: 'See hotel menu solutions', match: /\b(room service|in[- ]room dining)\b/i },
        { question: 'Can menus across hotel outlets share one brand identity?', answer: 'Yes. The hotel page describes coordinated menu presentation with consistent property branding and suitable variations in size, format, material or layout for different dining spaces.', href: 'Hotels-Resorts.html', link: 'Explore hotel and resort menus', match: /\b(hotel).*(brand|outlet|restaurant)|\b(property branding|matching menus)\b/i },
        { question: 'What can a poolside menu include?', answer: 'Poolside menus can be designed for food, beverages, cocktails, snacks, desserts, breakfast or all-day dining in hotels, resorts, pool clubs, beach clubs and outdoor hospitality spaces.', href: 'Poolside-Menu.html', link: 'Explore poolside menus', match: /\b(poolside|pool club|beach club|cabana|lounger)\b/i },
        { question: 'Are poolside menus waterproof?', answer: 'Material performance depends on the finish selected. Fine Fold offers water-resistant and easy-maintenance options for poolside environments and can recommend materials based on the intended use.', href: 'Poolside-Menu.html', link: 'See poolside menu options' },
        { question: 'Can poolside food and beverage menus be separate?', answer: 'Yes. Fine Fold can create dedicated menus for food, cocktails, beverages, snacks, desserts, breakfast or all-day dining while keeping branding consistent across them.', href: 'Poolside-Menu.html', link: 'Explore poolside menus' },
        { question: 'What are acrylic menus?', answer: 'Acrylic menus are modern menu presentation products made from acrylic sheets and customized with printing, branding, colours, finishes and other design elements.', href: 'Acrylic-Menu.html', link: 'Explore acrylic menus', match: /\b(acrylic)\b/i },
        { question: 'Which acrylic menu finishes can I choose?', answer: 'The acrylic page lists transparent, frosted, coloured, matte, glossy, printed and other customized finishes, based on your design requirements.', href: 'Acrylic-Menu.html', link: 'See acrylic finishes' },
        { question: 'How should acrylic menus be cleaned?', answer: 'The smooth acrylic surface is practical to clean and maintain during regular service. Cleaning recommendations can vary with the selected finish and printing method.', href: 'Acrylic-Menu.html', link: 'Read about acrylic menus' },
        { question: 'What is an MDF Series Menu Cover?', answer: 'An MDF Series cover is built on a premium engineered MDF core and finished with decorative surfaces such as wood grain, leather, laminate or fabric.', href: 'MDF-Series-Menu.html', link: 'Explore MDF menus', match: /\b(mdf)\b/i },
        { question: 'What payment methods are available?', answer: 'The payment page provides UPI QR payment and bank transfer or direct deposit options. It says payments are manually verified; use the official payment page for the current details.', href: 'Make-a-Payment.html', link: 'Open the payment page', match: /\b(payment|pay|upi|bank transfer|direct deposit)\b/i }
    ];
    const handoff = /\b(deliver\w*|shipp?\w*|lead time|how long|minimum|moq|refund\w*|return\w*|track\w*|warranty|discount\w*|deadline|phone|address|hours|quot\w*|pric\w*|cost\w*|budget|how much|contact|speak|human|agent|team)\b/i;
    const paths = {
        send: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
        close: '<path d="m6 6 12 12M18 6 6 18"/>'
    };
    function icon(name) {
        return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + paths[name] + '</svg>';
    }
    function el(tag, text, className) {
        const node = document.createElement(tag);
        if (text) node.textContent = text;
        if (className) node.className = className;
        return node;
    }

    const host = document.createElement('fine-fold-concierge');
    const root = host.attachShadow({ mode: 'open' });
    root.innerHTML = [
        '<link rel="stylesheet" href="css/menu-concierge.css">',
        '<button class="launcher" type="button" aria-haspopup="dialog" aria-controls="concierge" aria-expanded="false" aria-label="Open Fine Fold Menu Specialist">',
        '<img src="images/concierge-menu.svg" alt=""><span>Ask Fine Fold</span></button>',
        '<dialog id="concierge" aria-labelledby="concierge-title"><div class="sheet">',
        '<header><div class="brand"><span class="brand-mark"><img src="images/concierge-menu.svg" alt=""></span><div class="brand-copy"><small>Fine Fold Menus</small><h2 id="concierge-title">Menu Specialist</h2><span class="brand-rule" aria-hidden="true"></span></div></div>',
        '<button class="close" type="button" aria-label="Close Menu Specialist">' + icon('close') + '</button></header>',
        '<section class="intake" aria-labelledby="welcome-title"><p class="eyebrow">A personal touch</p>',
        '<h3 id="welcome-title">Let’s start with your enquiry</h3>',
        '<p class="intro">Share a few details and our Menu Specialist will help you find the right direction.</p>',
        '<form class="details-form">',
        '<label>Your name<input name="name" autocomplete="name" placeholder="e.g. Alex Sharma" minlength="2" maxlength="80" required></label>',
        '<label>Phone number<input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+91" pattern="[+0-9() .-]{7,20}" minlength="7" maxlength="20" required></label>',
        '<label>What do you need?<textarea name="requirement" placeholder="Tell us a little about your menu or project…" minlength="4" maxlength="600" required></textarea></label>',
        '<button class="begin" type="submit">Start conversation <span aria-hidden="true">↗</span></button></form>',
        '<p class="storage-status" role="status" aria-live="polite" hidden></p></section>',
        '<section class="conversation" aria-label="Conversation" hidden><div class="messages" aria-live="polite" aria-relevant="additions text"></div>',
        '<details class="faq-browser"><summary>Browse all 30 questions</summary><div class="faq-list"></div></details>',
        '<form class="message-form"><label class="sr-only" for="message-input">Your message</label>',
        '<input id="message-input" name="message" placeholder="Write your message…" maxlength="600" autocomplete="off" required>',
        '<button class="send" aria-label="Send message" type="submit">' + icon('send') + '</button></form>',
        '<p class="storage-status conversation-status" role="status" aria-live="polite" hidden></p></section>',
        '<footer><a href="Speak-With-Us.html">Speak with our team <span aria-hidden="true">↗</span></a></footer>',
        '</div></dialog>'
    ].join('');
    host.hidden = true;
    root.querySelector('link').addEventListener('load', () => { host.hidden = false; });
    document.body.append(host);

    const launcher = root.querySelector('.launcher');
    const dialog = root.querySelector('dialog');
    const detailsForm = root.querySelector('.details-form');
    const intake = root.querySelector('.intake');
    const conversation = root.querySelector('.conversation');
    const messages = root.querySelector('.messages');
    const messageForm = root.querySelector('.message-form');
    const messageInput = root.querySelector('#message-input');
    const intakeStatus = root.querySelector('.intake .storage-status');
    const conversationStatus = root.querySelector('.conversation-status');
    const faqBrowser = root.querySelector('.faq-browser');
    const contact = { name: '', phone: '', requirement: '' };
    let conversationId = '';

    async function saveChat(payload) {
        const response = await fetch(chatStoreUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                apikey: supabasePublishableKey
            },
            body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || 'Unable to save the conversation.');
        return result;
    }

    function addMessage(text, kind, link) {
        const bubble = el('article', '', 'message ' + kind);
        bubble.append(el('span', kind === 'visitor' ? contact.name : 'Menu Specialist', 'speaker'));
        bubble.append(el('p', text));
        if (link) {
            const links = Array.isArray(link) ? link : [link];
            links.forEach(item => {
                const anchor = el('a', item.label + ' ↗');
                anchor.href = item.href;
                bubble.append(anchor);
            });
        }
        messages.append(bubble);
        bubble.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    function normalizeQuestion(text) {
        return text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    }

    function responseFor(text) {
        const normalized = normalizeQuestion(text);
        const exact = faqs.find(item => normalizeQuestion(item.question) === normalized);
        if (exact) {
            return {
                text: exact.answer,
                links: [{ href: exact.href, label: exact.link }]
            };
        }
        if (handoff.test(text)) {
            return {
                text: 'Our team can guide you on that. Please share your question with them through the Contact Us page.',
                links: [{ href: contactPage, label: 'Speak with our team' }]
            };
        }
        const matched = faqs.find(item => item.match && item.match.test(text));
        if (matched) {
            return {
                text: matched.answer,
                links: [{ href: matched.href, label: matched.link }]
            };
        }
        return {
            text: 'Thanks for sharing that. Our team can give you the right guidance for your project. Please contact us and include any details you’d like them to know.',
            links: [{ href: contactPage, label: 'Speak with our team' }]
        };
    }

    function makeFaqButton(item, className, onSelect) {
        const button = el('button', item.question, 'faq-option ' + className);
        button.type = 'button';
        button.addEventListener('click', () => onSelect(item));
        return button;
    }

    faqs.forEach(item => {
        root.querySelector('.faq-list').append(makeFaqButton(item, 'faq-option--browse', faq => {
            faqBrowser.open = false;
            sendMessage(faq.question);
        }));
    });

    async function sendMessage(text) {
        if (!conversationId) return;
        const answer = responseFor(text);
        const sendButton = messageForm.querySelector('.send');
        conversationStatus.textContent = 'Saving your message…';
        conversationStatus.hidden = false;
        sendButton.disabled = true;
        try {
            await saveChat({
                action: 'append',
                conversation_id: conversationId,
                visitor_message: text,
                assistant_message: answer.text
            });
        } catch (_) {
            conversationStatus.textContent = 'We could not save that message. Please try sending it again.';
            messageInput.value = text;
            sendButton.disabled = false;
            messageInput.focus();
            return;
        }
        conversationStatus.hidden = true;
        sendButton.disabled = false;
        messageInput.value = '';
        addMessage(text, 'visitor');
        addMessage(answer.text, 'concierge', answer.links);
        messageInput.focus();
    }

    detailsForm.addEventListener('submit', async event => {
        event.preventDefault();
        if (!detailsForm.reportValidity()) return;
        const form = new FormData(detailsForm);
        contact.name = String(form.get('name')).trim();
        contact.phone = String(form.get('phone')).trim();
        contact.requirement = String(form.get('requirement')).trim();

        const welcome = 'Hello ' + contact.name + '. Thanks for getting in touch. I’ve noted your enquiry and can help you explore menu styles, materials, branding and the next steps.';
        const firstAnswer = responseFor(contact.requirement);
        intakeStatus.textContent = 'Saving your enquiry…';
        intakeStatus.hidden = false;
        detailsForm.setAttribute('aria-busy', 'true');
        const beginButton = detailsForm.querySelector('.begin');
        beginButton.disabled = true;
        try {
            const saved = await saveChat({
                action: 'start',
                name: contact.name,
                phone: contact.phone,
                requirement: contact.requirement,
                greeting: welcome,
                answer: firstAnswer.text
            });
            conversationId = saved.conversation_id;
        } catch (_) {
            intakeStatus.textContent = 'We could not save your enquiry right now. Please try again or contact our team.';
            detailsForm.removeAttribute('aria-busy');
            beginButton.disabled = false;
            return;
        }
        intakeStatus.hidden = true;
        detailsForm.removeAttribute('aria-busy');
        intake.hidden = true;
        conversation.hidden = false;
        addMessage(welcome, 'concierge');
        addMessage(contact.requirement, 'visitor');
        addMessage(firstAnswer.text, 'concierge', firstAnswer.links);
        messageInput.focus();
    });

    messageForm.addEventListener('submit', event => {
        event.preventDefault();
        const text = messageInput.value.trim();
        if (!text) { messageInput.focus(); return; }
        sendMessage(text);
    });

    launcher.addEventListener('click', () => {
        dialog.showModal();
        launcher.setAttribute('aria-expanded', 'true');
        (intake.hidden ? messageInput : detailsForm.elements.name).focus({ preventScroll: true });
    });
    root.querySelector('.close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => {
        launcher.setAttribute('aria-expanded', 'false');
        launcher.focus({ preventScroll: true });
    });
})();
