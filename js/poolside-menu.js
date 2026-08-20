/* Fine Fold Menus — Premium Poolside Menu Collection Interactions */

/* ---------- Data ---------- */

const resortFeatures = [
  {
    large: true,
    icon: "droplet",
    title: "Resistant to Everyday Moisture",
    text: "Choose suitable moisture-resistant and easy-maintenance materials that help your menus remain presentable around pools, outdoor dining areas, and resort environments."
  },
  {
    large: false,
    icon: "sparkle",
    title: "Easy to Maintain",
    text: "Practical surfaces and finishes make cleaning and routine maintenance easier, helping your menus maintain a professional appearance throughout service."
  },
  {
    large: false,
    icon: "crown",
    title: "Premium Brand Presentation",
    text: "Create a sophisticated visual experience with customized colors, textures, logo branding, and finishes that complement your hotel's or resort's identity."
  },
  {
    large: false,
    icon: "hand-pointer",
    title: "Designed for Guest Convenience",
    text: "Poolside menus can be created in practical formats that make it easy for guests to browse food, beverages, cocktails, snacks, and other offerings while relaxing by the pool."
  }
];

const materials = [
  {
    name: "Water-Resistant Options",
    desc: "Practical material choices designed for environments where occasional splashes and moisture are part of everyday service.",
    img: "images/experience.jpg",
    texture: "repeating-linear-gradient(0deg, rgba(216,179,106,0.05) 0px, rgba(216,179,106,0.05) 1px, transparent 1px, transparent 6px)"
  },
  {
    name: "Premium Synthetic Finishes",
    desc: "Elegant and easy-to-maintain surfaces available in a variety of colors, textures, and finishes.",
    img: "images/hero-dining.jpg",
    texture: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 8px)"
  },
  {
    name: "Acrylic",
    desc: "A modern choice for contemporary resorts, pool clubs, and hospitality spaces looking for a clean and sophisticated menu presentation.",
    img: "images/craft.jpg",
    texture: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(255,255,255,0.04) 100%)"
  },
  {
    name: "Wood & MDF",
    desc: "Suitable for resorts and properties looking for a natural, warm, or premium aesthetic that complements their surrounding environment.",
    img: "images/materials.jpg",
    texture: "repeating-linear-gradient(90deg, rgba(139,90,43,0.08) 0px, rgba(139,90,43,0.08) 1px, transparent 1px, transparent 4px)"
  },
  {
    name: "Custom Material Combinations",
    desc: "Combine different materials, finishes, and branding elements to create a distinctive poolside menu designed around your property.",
    img: "images/hardcover-menus.jpg",
    texture: "repeating-conic-gradient(rgba(216,179,106,0.05) 0% 25%, transparent 0% 50%) 0 0 / 12px 12px"
  }
];

const customizationItems = [
  { icon: "maximize-2", title: "Custom Size & Shape", desc: "Choose the dimensions, orientation, and format that work best for your tables, loungers, cabanas, or poolside service areas." },
  { icon: "stamp", title: "Logo & Branding", desc: "Add your hotel, resort, restaurant, or pool club logo through premium branding techniques such as embossing, foil stamping, printing, or engraving." },
  { icon: "droplets", title: "Colors & Textures", desc: "Match your existing brand palette with customized colors, textures, patterns, and finishes." },
  { icon: "layout", title: "Menu Format", desc: "Create dedicated formats for food menus, beverage menus, cocktail lists, snack menus, dessert menus, or combined poolside dining menus." },
  { icon: "gem", title: "Premium Finishing", desc: "Add stitching, protective corners, closures, binding systems, and other finishing details according to your requirements." }
];

const destinations = [
  "Luxury Hotels", "Beach Resorts", "Pool Resorts", "Boutique Hotels",
  "Pool Clubs", "Beach Clubs", "Rooftop Pools", "Resort Restaurants",
  "Poolside Cafés", "Luxury Villas", "Private Clubs", "Holiday Resorts",
  "Outdoor Dining Venues", "Hospitality Chains"
];

const applications = [
  "Poolside Food Menus", "Cocktail Menus", "Beverage Menus", "Mocktail Menus",
  "Snack Menus", "Dessert Menus", "Breakfast Menus", "All-Day Dining Menus",
  "Kids' Menus", "Seasonal Menus", "Cabana Service Menus",
  "Special Offers & Promotions", "QR Menu Displays"
];

const featuresBenefits = [
  "Premium Custom Designs", "Moisture-Resistant Material Options",
  "Easy-to-Maintain Surfaces", "Custom Logo Branding",
  "Multiple Material Choices", "Custom Sizes & Shapes",
  "Food & Beverage Menu Formats", "Durable Construction",
  "Premium Finishing Options", "Designed for Hospitality Use"
];

const faqs = [
  { q: "What is a poolside menu?", a: "A poolside menu is a specially designed food and beverage menu used in hotels, resorts, pool clubs, beach clubs, and outdoor hospitality spaces. It can be customized for poolside dining, beverages, cocktails, snacks, desserts, and other guest services." },
  { q: "Are poolside menus waterproof?", a: "Material performance depends on the specific material and finish selected. We offer <strong>water-resistant and easy-maintenance options</strong> suitable for poolside environments and can recommend appropriate materials based on your requirements." },
  { q: "Can poolside menus be customized with our hotel or resort logo?", a: "Yes. We offer multiple branding options, including <strong>logo embossing, debossing, foil stamping, printing, and engraving</strong>, depending on the selected material and design." },
  { q: "Which material is best for poolside menus?", a: "The ideal material depends on your environment, usage, design preference, and maintenance requirements. We can recommend suitable <strong>water-resistant, durable, and easy-to-maintain materials</strong> for your specific application." },
  { q: "Can we create separate food and beverage poolside menus?", a: "Absolutely. You can create dedicated menus for <strong>food, cocktails, beverages, snacks, desserts, breakfast, or all-day dining</strong> while maintaining the same branding across every menu." },
  { q: "Can you create custom sizes for poolside tables and cabanas?", a: "Yes. Poolside menus can be manufactured in customized sizes, shapes, orientations, and formats to suit your tables, cabanas, loungers, and service requirements." },
  { q: "Are poolside menus suitable for luxury resorts and hotels?", a: "Yes. Our premium custom menu solutions can be designed to complement the sophisticated interiors and outdoor environments of luxury hotels, resorts, beach clubs, and premium hospitality properties." },
  { q: "Do you manufacture poolside menus in bulk?", a: "Yes. We can handle customized requirements for individual properties as well as larger hospitality projects, including hotels, resorts, restaurant groups, and multiple-location brands." }
];

/* ---------- SVG Icons ---------- */
const svgNS = "http://www.w3.org/2000/svg";

const iconDefs = {
  "droplet": `<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>`,
  "sparkle": `<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>`,
  "crown": `<path d="M11.562 3.316a.6.6 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.6.6 0 0 1 .921.515l-.571 12.493a1 1 0 0 1-1 .898H4.46a1 1 0 0 1-1-.898L2.896 6.015a.6.6 0 0 1 .921-.515l4.276 3.665a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/>`,
  "hand-pointer": `<path d="M9.514 13.426 7.16 17.89a2.36 2.36 0 0 0 1.68 2.11h0a2.36 2.36 0 0 0 1.68-.7l4.86-4.86a2.36 2.36 0 0 0 0-3.33 2.36 2.36 0 0 0-3.33 0z"/><path d="M14.286 9.714 18 6a2.12 2.12 0 0 1 3 3l-4.286 4.286"/><path d="M12 2a3 3 0 0 0-3 3v1"/><path d="M9 5a3 3 0 0 0-3 3v2"/><path d="M7 11a3 3 0 0 0-3 3v1"/>`,
  "maximize-2": `<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/>`,
  "stamp": `<path d="M5 22h14"/><path d="M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 13a2.5 2.5 0 0 0 1.73 4.27"/><path d="M7 17h10"/>`,
  "layout": `<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/>`,
  "gem": `<path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/>`,
  "droplets": `<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A1.05 1.05 0 0 0 13 7.05c0 1.16-.57 2.26-1.71 3.19S9.29 12.25 9 13.8c-.29-1.45-1.14-2.84-2.29-3.76S5 8.9 5 10.05c0 2.22 1.8 4.05 4 4.05"/>`
};

function svgIcon(name, size = 24) {
  const def = iconDefs[name] || iconDefs["sparkle"];
  return `<svg xmlns="${svgNS}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${def}</svg>`;
}

/* ---------- Render: Why Choose — Asymmetrical Resort Grid ---------- */
const resortGrid = document.getElementById("pm-resort-grid");
if (resortGrid) {
  resortGrid.innerHTML = resortFeatures.map((f, i) => `
    <div class="pm-resort-feature${f.large ? ' pm-resort-feature--large' : ''} pm-reveal" data-delay="${i * 90}">
      <div class="pm-resort-feature__icon">${svgIcon(f.icon, f.large ? 28 : 24)}</div>
      <div>
        <h3>${f.title}</h3>
        <p>${f.text}</p>
      </div>
    </div>
  `).join("");
}

/* ---------- Render: Materials — Vertical Editorial Panels ---------- */
const materialGallery = document.getElementById("pm-material-gallery");
if (materialGallery) {
  materialGallery.innerHTML = materials.map((m, i) => `
    <div class="pm-material-panel pm-reveal" data-delay="${i * 80}">
      <div class="pm-material-panel__img">
        <img src="${m.img}" alt="Premium poolside menu - ${m.name}" loading="lazy" />
      </div>
      <div class="pm-material-panel__texture" style="background:${m.texture}"></div>
      <div class="pm-material-panel__line"></div>
      <div class="pm-material-panel__overlay"></div>
      <div class="pm-material-panel__content">
        <h4>${m.name}</h4>
        <p>${m.desc}</p>
      </div>
    </div>
  `).join("");
}

/* ---------- Render: Customization — Studio Blueprint ---------- */
const studioItems = document.getElementById("pm-studio-items");
if (studioItems) {
  studioItems.innerHTML = customizationItems.map((item, i) => `
    <div class="pm-studio-item pm-reveal" data-delay="${i * 100}">
      <div class="pm-studio-item__icon">${svgIcon(item.icon, 20)}</div>
      <div class="pm-studio-item__text">
        <h4>${item.title}</h4>
      </div>
    </div>
  `).join("");
}

/* ---------- Render: Hospitality — Destination Grid ---------- */
const destGrid = document.getElementById("pm-destinations");
if (destGrid) {
  const destinationImages = [
    "images/experience.jpg", "images/hero-dining.jpg", "images/craft.jpg", "images/materials.jpg",
    "images/hardcover-menus.jpg", "images/brand-value.jpg", "images/menu.jpg", "images/menu-1.jpg",
    "images/experience.jpg", "images/hero-dining.jpg", "images/craft.jpg", "images/hardcover-menus.jpg",
    "images/materials.jpg", "images/brand-value.jpg"
  ];

  destGrid.innerHTML = destinations.map((d, i) => `
    <div class="pm-destination pm-reveal" data-delay="${(i % 4) * 60}">
      <div class="pm-destination__bg">
        <img src="${destinationImages[i]}" alt="" loading="lazy" />
      </div>
      <div class="pm-destination__text">
        <span class="pm-destination__icon">&#9670;</span>
        ${d}
      </div>
    </div>
  `).join("");
}

/* ---------- Render: Applications — Horizontal Showcase ---------- */
const appTrack = document.getElementById("pm-app-track");
const appProgress = document.getElementById("pm-app-progress");
if (appTrack) {
  appTrack.innerHTML = applications.map((app, i) => `
    <div class="pm-app-card">
      <span class="pm-app-card__number">${String(i + 1).padStart(2, '0')}</span>
      <h4>${app}</h4>
    </div>
  `).join("");

  let currentAppIndex = 0;
  const totalApps = applications.length;
  const cardWidth = 304;

  function updateAppScroll() {
    appTrack.style.transform = `translateX(-${currentAppIndex * cardWidth}px)`;
    const progress = ((currentAppIndex + 1) / totalApps) * 100;
    appProgress.style.width = Math.min(progress, 100) + "%";
  }

  document.getElementById("pm-app-next").addEventListener("click", () => {
    const maxIndex = Math.max(0, totalApps - Math.floor(appTrack.parentElement.offsetWidth / cardWidth));
    if (currentAppIndex < maxIndex) {
      currentAppIndex++;
      updateAppScroll();
    }
  });

  document.getElementById("pm-app-prev").addEventListener("click", () => {
    if (currentAppIndex > 0) {
      currentAppIndex--;
      updateAppScroll();
    }
  });

  /* Drag support */
  let isDragging = false, startX = 0, startTranslate = 0;

  appTrack.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    const style = window.getComputedStyle(appTrack);
    const matrix = new DOMMatrixReadOnly(style.transform);
    startTranslate = matrix.m41;
    appTrack.style.transition = "none";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    appTrack.style.transform = `translateX(${startTranslate + diff}px)`;
  });

  window.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    appTrack.style.transition = "";
    const diff = e.clientX - startX;
    if (Math.abs(diff) > 60) {
      const maxIndex = Math.max(0, totalApps - Math.floor(appTrack.parentElement.offsetWidth / cardWidth));
      if (diff < 0 && currentAppIndex < maxIndex) currentAppIndex++;
      else if (diff > 0 && currentAppIndex > 0) currentAppIndex--;
    }
    updateAppScroll();
  });

  /* Touch support */
  appTrack.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    const style = window.getComputedStyle(appTrack);
    const matrix = new DOMMatrixReadOnly(style.transform);
    startTranslate = matrix.m41;
    appTrack.style.transition = "none";
  }, { passive: true });

  appTrack.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    appTrack.style.transform = `translateX(${startTranslate + diff}px)`;
  }, { passive: true });

  appTrack.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    isDragging = false;
    appTrack.style.transition = "";
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
      const maxIndex = Math.max(0, totalApps - Math.floor(appTrack.parentElement.offsetWidth / cardWidth));
      if (diff < 0 && currentAppIndex < maxIndex) currentAppIndex++;
      else if (diff > 0 && currentAppIndex > 0) currentAppIndex--;
    }
    updateAppScroll();
  });
}

/* ---------- Render: Features & Benefits — Specification ---------- */
const specLayout = document.getElementById("pm-spec-layout");
if (specLayout) {
  specLayout.innerHTML = `
    <div class="pm-spec__product pm-reveal">
      <img src="images/hardcover-menus.jpg" alt="Premium poolside menu for luxury hotels and resorts" loading="lazy" />
    </div>
    <div class="pm-spec__features">
      ${featuresBenefits.map((f, i) => `
        <div class="pm-spec-feature pm-reveal" data-delay="${i * 50}">
          <h4>${f}</h4>
        </div>
      `).join("")}
    </div>
  `;
}

/* ---------- Render: FAQ ---------- */
const faqEl = document.getElementById("pm-faq-list");
if (faqEl) {
  faqEl.innerHTML = faqs.map((faq, i) => `
    <div class="pm-faq-item pm-reveal${i === 0 ? ' is-open' : ''}" data-delay="${i * 60}">
      <button class="pm-faq-q" type="button">
        <h3>${faq.q}</h3>
        <span class="pm-faq-icon"></span>
      </button>
      <div class="pm-faq-a"><div><p>${faq.a}</p></div></div>
    </div>
  `).join("");

  faqEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".pm-faq-q");
    if (!btn) return;
    const item = btn.closest(".pm-faq-item");
    const wasOpen = item.classList.contains("is-open");
    faqEl.querySelectorAll(".pm-faq-item").forEach(el => el.classList.remove("is-open"));
    if (!wasOpen) item.classList.add("is-open");
  });
}

/* ---------- Scroll Reveal ---------- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
);

document.querySelectorAll(".pm-reveal").forEach((el) => {
  if (el.dataset.delay) el.style.transitionDelay = `${el.dataset.delay}ms`;
  observer.observe(el);
});
