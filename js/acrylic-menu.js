/* Fine Fold Menus — Premium Acrylic Menu Collection Interactions */

/* ---------- Data ---------- */

const archFeatures = [
  { icon: "sparkles", title: "Modern & Sophisticated Appearance", text: "The clean, contemporary appearance of acrylic creates an elegant presentation that works beautifully with modern restaurant interiors and premium dining environments." },
  { icon: "sliders", title: "Fully Customizable", text: "Customize your acrylic menus with your preferred dimensions, colors, shapes, printing techniques, logo placement, textures, and finishing details to create a design unique to your brand." },
  { icon: "shield", title: "Strong & Durable", text: "High-quality acrylic provides a sturdy menu presentation solution designed for regular handling and everyday restaurant service." },
  { icon: "sparkle", title: "Easy to Maintain", text: "The smooth surface makes acrylic menus practical to clean and maintain, helping your table presentation remain polished throughout service." }
];

const finishes = [
  {
    name: "Transparent Acrylic",
    desc: "A clean and sophisticated option that allows your table setting and restaurant environment to remain visible through the menu.",
    swatch: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
    img: "images/hero-dining.jpg"
  },
  {
    name: "Frosted Acrylic",
    desc: "A refined, understated finish that creates a soft visual effect while maintaining a premium contemporary appearance.",
    swatch: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.06))",
    img: "images/experience.jpg"
  },
  {
    name: "Colored Acrylic",
    desc: "Introduce your brand colors directly into your menu presentation with customized colored acrylic options.",
    swatch: "linear-gradient(135deg, rgba(216,179,106,0.3), rgba(216,179,106,0.1))",
    img: "images/craft.jpg"
  },
  {
    name: "Printed Acrylic",
    desc: "Add restaurant graphics, artwork, menu information, patterns, or branding directly to the acrylic surface for a distinctive presentation.",
    swatch: "linear-gradient(135deg, rgba(180,160,130,0.3), rgba(180,160,130,0.1))",
    img: "images/hardcover-menus.jpg"
  },
  {
    name: "Textured & Layered Acrylic",
    desc: "Combine different acrylic elements, finishes, or layers to create a dimensional menu design with a unique visual character.",
    swatch: "repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 8px)",
    img: "images/materials.jpg"
  }
];

const designOptions = [
  { icon: "maximize-2", title: "Size & Shape", desc: "Choose custom dimensions, portrait or landscape orientation, rounded corners, square edges, or distinctive custom shapes." },
  { icon: "stamp", title: "Branding", desc: "Add your restaurant logo through UV printing, digital printing, engraving, or other suitable branding techniques." },
  { icon: "droplets", title: "Color & Finish", desc: "Select from transparent, frosted, colored, matte, glossy, and other customized surface finishes." },
  { icon: "pen-tool", title: "Printing & Graphics", desc: "Incorporate menus, artwork, patterns, illustrations, brand elements, or other visual details to create a cohesive presentation." },
  { icon: "link", title: "Binding & Display", desc: "Choose suitable binding, mounting, fastening, or tabletop presentation options based on how your menu will be used." }
];

const hospitalityCategories = [
  "Fine Dining Restaurants", "Contemporary Restaurants", "Cafés", "Coffee Shops",
  "Luxury Hotels", "Boutique Hotels", "Resorts", "Bars & Lounges",
  "Rooftop Restaurants", "Cocktail Bars", "Bakeries", "Dessert Cafés",
  "Premium Food Brands", "Modern Hospitality Spaces"
];

const applications = [
  "Main Dining Menus", "Beverage Menus", "Dessert Menus", "Cocktail Menus",
  "Wine Lists", "QR Menu Displays", "Tabletop Information Cards",
  "Promotional Displays", "Specials & Seasonal Menus",
  "Reservation & Guest Information Displays"
];

const featuresBenefits = [
  "Premium Contemporary Appearance", "Custom Sizes & Shapes",
  "Transparent & Frosted Options", "Custom Color Options",
  "High-Quality Printing", "Personalized Logo Branding",
  "Smooth, Easy-Clean Surface", "Durable Construction",
  "Lightweight & Practical", "Multiple Finishing Options",
  "Suitable for Indoor Hospitality Use"
];

const faqs = [
  { q: "What are acrylic menus?", a: "Acrylic menus are modern menu presentation products made from acrylic sheets and customized with printing, branding, colors, finishes, and other design elements to create a distinctive restaurant menu." },
  { q: "Can acrylic menus be customized with our restaurant logo?", a: "Yes. Your restaurant logo can be incorporated using suitable branding techniques such as UV printing, digital printing, or engraving, depending on the desired appearance." },
  { q: "What types of acrylic finishes are available?", a: "We can create transparent, frosted, colored, matte, glossy, printed, and other customized acrylic finishes based on your design requirements." },
  { q: "Are acrylic menus suitable for restaurants?", a: "Yes. Acrylic menus are well suited to restaurants, cafés, hotels, bars, lounges, resorts, and other hospitality environments that prefer a modern and sophisticated presentation." },
  { q: "Can I choose a custom size and shape?", a: "Yes. Acrylic menus can be manufactured in customized dimensions and shapes to suit your table setup, menu format, and overall restaurant branding." },
  { q: "Are acrylic menus easy to clean?", a: "The smooth acrylic surface makes them practical to clean and maintain during regular restaurant service. Specific cleaning recommendations can vary depending on the finish and printing method." },
  { q: "Can acrylic be combined with other materials?", a: "Yes. Acrylic can be incorporated into a broader menu presentation design with materials such as wood, metal, leather, or other decorative elements, depending on the required design." }
];

/* ---------- Render: Why Choose — Architectural Grid ---------- */
const archGrid = document.getElementById("am-arch-grid");
if (archGrid) {
  archGrid.innerHTML = archFeatures.map((f, i) => `
    <div class="am-arch-panel am-reveal" data-delay="${i * 90}">
      <div class="am-arch-panel__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use href="#icon-${f.icon}"/></svg></div>
      <h3>${f.title}</h3>
      <p>${f.text}</p>
    </div>
  `).join("");
}

/* ---------- Render: Finishes ---------- */
const finishShowcase = document.getElementById("am-finish-showcase");
if (finishShowcase) {
  finishShowcase.innerHTML = `
    <div class="am-finish-visual" id="am-finish-visual">
      <img src="${finishes[0].img}" alt="Custom premium acrylic menu for restaurants and hospitality brands" id="am-finish-img" />
    </div>
    <div class="am-finish-options" id="am-finish-options">
      ${finishes.map((f, i) => `
        <button class="am-finish-btn am-reveal${i === 0 ? ' is-active' : ''}" data-index="${i}" type="button" data-delay="${i * 70}">
          <div class="am-finish-btn__swatch" style="background:${f.swatch}"></div>
          <div class="am-finish-btn__text">
            <h4>${f.name}</h4>
            <p>${f.desc}</p>
          </div>
        </button>
      `).join("")}
    </div>
  `;

  const finishOptions = document.getElementById("am-finish-options");
  const finishImg = document.getElementById("am-finish-img");

  finishOptions.addEventListener("click", (e) => {
    const btn = e.target.closest(".am-finish-btn");
    if (!btn) return;
    const idx = Number(btn.dataset.index);

    finishOptions.querySelectorAll(".am-finish-btn").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    finishImg.style.opacity = "0";
    setTimeout(() => {
      finishImg.src = finishes[idx].img;
      finishImg.style.opacity = "1";
    }, 250);
  });
}

/* ---------- Render: Complete Customization ---------- */
const designMatrix = document.getElementById("am-design-matrix");
if (designMatrix) {
  designMatrix.innerHTML = designOptions.map((opt, i) => `
    <div class="am-matrix-item am-reveal${i === 0 ? ' is-open' : ''}" data-delay="${i * 70}">
      <button class="am-matrix-header" type="button" data-index="${i}">
        <span class="am-matrix-accent"></span>
        <h3>${opt.title}</h3>
        <span class="am-matrix-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use href="#icon-${opt.icon}"/></svg></span>
        <span class="am-matrix-toggle"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
      </button>
      <div class="am-matrix-body"><div class="am-matrix-content"><p>${opt.desc}</p></div></div>
    </div>
  `).join("");

  designMatrix.addEventListener("click", (e) => {
    const header = e.target.closest(".am-matrix-header");
    if (!header) return;
    const item = header.closest(".am-matrix-item");
    const wasOpen = item.classList.contains("is-open");
    designMatrix.querySelectorAll(".am-matrix-item").forEach(el => el.classList.remove("is-open"));
    if (!wasOpen) item.classList.add("is-open");
  });
}

/* ---------- Render: Hospitality ---------- */
const hospGrid = document.getElementById("am-hospitality-grid");
if (hospGrid) {
  hospGrid.innerHTML = hospitalityCategories.map((cat, i) => `
    <div class="am-hospitality-item am-reveal" data-delay="${(i % 6) * 50}">${cat}</div>
  `).join("");
}

/* ---------- Render: Applications ---------- */
const appTrack = document.getElementById("am-app-track");
const appProgress = document.getElementById("am-app-progress");
if (appTrack) {
  appTrack.innerHTML = applications.map((app, i) => `
    <div class="am-app-card">
      <span class="am-app-card__number">${String(i + 1).padStart(2, '0')}</span>
      <h4>${app}</h4>
    </div>
  `).join("");

  let currentAppIndex = 0;
  const totalApps = applications.length;
  const cardWidth = 304; // 280 + 24 gap

  function updateAppScroll() {
    appTrack.style.transform = `translateX(-${currentAppIndex * cardWidth}px)`;
    const progress = ((currentAppIndex + 1) / totalApps) * 100;
    appProgress.style.width = Math.min(progress, 100) + "%";
  }

  document.getElementById("am-app-next").addEventListener("click", () => {
    const maxIndex = Math.max(0, totalApps - Math.floor(appTrack.parentElement.offsetWidth / cardWidth));
    if (currentAppIndex < maxIndex) {
      currentAppIndex++;
      updateAppScroll();
    }
  });

  document.getElementById("am-app-prev").addEventListener("click", () => {
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

/* ---------- Render: Features & Benefits — Blueprint ---------- */
const blueprint = document.getElementById("am-blueprint");
if (blueprint) {
  blueprint.innerHTML = `
    <div class="am-blueprint__product">
      <img src="images/hardcover-menus.jpg" alt="Custom premium acrylic menu for restaurants and hospitality brands" loading="lazy" />
    </div>
    <div class="am-blueprint__features">
      ${featuresBenefits.map((f, i) => `
        <div class="am-blueprint-feature am-reveal" data-delay="${i * 50}">
          <h4>${f}</h4>
        </div>
      `).join("")}
    </div>
  `;
}

/* ---------- Render: FAQ ---------- */
const faqEl = document.getElementById("am-faq-list");
if (faqEl) {
  faqEl.innerHTML = faqs.map((faq, i) => `
    <div class="am-faq-item am-reveal${i === 0 ? ' is-open' : ''}" data-delay="${i * 60}">
      <button class="am-faq-q" type="button">
        <h3>${faq.q}</h3>
        <span class="am-faq-icon"></span>
      </button>
      <div class="am-faq-a"><div><p>${faq.a}</p></div></div>
    </div>
  `).join("");

  faqEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".am-faq-q");
    if (!btn) return;
    const item = btn.closest(".am-faq-item");
    const wasOpen = item.classList.contains("is-open");
    faqEl.querySelectorAll(".am-faq-item").forEach(el => el.classList.remove("is-open"));
    if (!wasOpen) item.classList.add("is-open");
  });
}

/* ---------- SVG Icons (inline) ---------- */
(function() {
  const svgNS = "http://www.w3.org/2000/svg";
  const defs = document.createElement("div");
  defs.style.display = "none";
  defs.innerHTML = `
  <svg xmlns="${svgNS}" style="display:none">
    <symbol id="icon-sparkles" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </symbol>
    <symbol id="icon-sliders" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/>
    </symbol>
    <symbol id="icon-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
    </symbol>
    <symbol id="icon-sparkle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    </symbol>
    <symbol id="icon-maximize-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/>
    </symbol>
    <symbol id="icon-stamp" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 22h14"/><path d="M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 13a2.5 2.5 0 0 0 1.73 4.27"/><path d="M7 17h10"/>
    </symbol>
    <symbol id="icon-droplets" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/>
      <path d="M12.56 6.6A1.05 1.05 0 0 0 13 7.05c0 1.16-.57 2.26-1.71 3.19S9.29 12.25 9 13.8c-.29-1.45-1.14-2.84-2.29-3.76S5 8.9 5 10.05c0 2.22 1.8 4.05 4 4.05"/>
    </symbol>
    <symbol id="icon-pen-tool" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/>
    </symbol>
    <symbol id="icon-link" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </symbol>
  </svg>`;
  document.body.appendChild(defs);
})();

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

document.querySelectorAll(".am-reveal").forEach((el) => {
  if (el.dataset.delay) el.style.transitionDelay = `${el.dataset.delay}ms`;
  observer.observe(el);
});