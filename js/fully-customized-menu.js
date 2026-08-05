/* Fine Fold Menus — interactions */

const featureCards = [
  { icon: "crown", title: "Unique Brand Identity", text: "A fully customized menu cover carries your logo, colours, materials and finishes, turning an everyday item into a powerful extension of your brand identity." },
  { icon: "sparkles", title: "Premium Guest Experience", text: "The moment a guest picks up your menu, they feel the quality of your establishment. A refined cover sets the tone for the entire dining experience." },
  { icon: "palette", title: "Complete Design Freedom", text: "From size and shape to binding, stitching and closures, every element is yours to decide — nothing about your menu has to be off the shelf." },
  { icon: "shield-check", title: "Built for Everyday Hospitality", text: "Crafted with durable, easy-to-clean materials and reinforced construction so your menus stay beautiful through daily service." },
];

const optionGroups = [
  { icon: "layers", title: "Materials", items: ["Genuine Leather", "Premium PU Leather", "Natural Wood", "Acrylic", "Metal", "Linen Fabric", "Canvas", "Cork", "Velvet", "Hybrid Material Combinations"] },
  { icon: "stamp", title: "Branding Options", items: ["Logo Embossing", "Debossing", "Gold Foil Stamping", "Silver Foil Stamping", "UV Printing", "Laser Engraving", "Screen Printing", "Digital Printing"] },
  { icon: "scissors", title: "Finishing Options", items: ["Decorative Stitching", "Metal Corners", "Rounded Corners", "Magnetic Closure", "Elastic Closure", "Waterproof Coating", "Scratch-Resistant Finish", "Matte & Gloss Finish"] },
  { icon: "pen-tool", title: "Binding Styles", items: ["Screw Binding", "Ring Binder", "Magnetic Inserts", "Replaceable Menu Inserts", "Wiro Binding", "Hidden Fasteners"] },
];

const industries = [
  { icon: "utensils", label: "Fine Dining Restaurants" },
  { icon: "hotel", label: "Luxury Hotels" },
  { icon: "gem", label: "Boutique Hotels" },
  { icon: "coffee", label: "Cafés" },
  { icon: "glass-water", label: "Coffee Shops" },
  { icon: "sun", label: "Resorts" },
  { icon: "building-2", label: "Rooftop Restaurants" },
  { icon: "martini", label: "Bars & Lounges" },
  { icon: "wine", label: "Breweries" },
  { icon: "cake", label: "Bakeries" },
  { icon: "chef-hat", label: "Cloud Kitchens" },
  { icon: "award", label: "Banquet Venues" },
  { icon: "crown", label: "Private Clubs" },
  { icon: "store", label: "Franchise Restaurant Chains" },
];

const faqs = [
  { q: "Can every part of the menu cover be customized?", a: "Yes. Size, shape, material, colour, branding, stitching, corners, closures, binding and insert layout can all be customized to match your brand and service style." },
  { q: "What materials are available?", a: "We work with genuine leather, premium PU leather, natural wood, acrylic, metal, linen fabric, canvas, cork, velvet, and hybrid combinations of these materials." },
  { q: "Can I print my restaurant logo?", a: "Absolutely. Your logo can be applied through embossing, debossing, gold or silver foil stamping, UV printing, laser engraving, screen printing or digital printing." },
  { q: "Do you manufacture bulk orders?", a: "Yes. We manufacture everything from small boutique quantities to large bulk orders for hotel groups and franchise restaurant chains, with consistent quality across every piece." },
  { q: "Can menu pages be replaced later?", a: "Yes. With screw binding, ring binders, magnetic inserts or replaceable insert systems, your menu pages can be updated at any time while keeping the same cover." },
];

/* ---------- render feature cards ---------- */
document.getElementById("feature-grid").innerHTML = featureCards
  .map(
    (card, i) => `
    <div class="reveal" data-delay="${i * 90}">
      <article class="lux-card feature-card">
        <img class="feature-card__bg" src="images/experience.jpg" alt="" aria-hidden="true" loading="lazy" />
        <div class="feature-card__body">
          <span class="icon-badge"><i data-lucide="${card.icon}"></i></span>
          <h3>${card.title}</h3>
          <p>${card.text}</p>
        </div>
      </article>
    </div>`,
  )
  .join("");

/* ---------- render industries ---------- */
document.getElementById("industry-grid").innerHTML = industries
  .map(
    (item, i) => `
    <div class="reveal" data-delay="${(i % 4) * 70}">
      <div class="lux-card industry-card">
        <i data-lucide="${item.icon}"></i>
        <span>${item.label}</span>
      </div>
    </div>`,
  )
  .join("");

/* ---------- customization tabs ---------- */
const tabsEl = document.getElementById("option-tabs");
const titleEl = document.getElementById("option-title");
const listEl = document.getElementById("option-list");

tabsEl.innerHTML = optionGroups
  .map(
    (group, i) => `
    <div class="reveal" data-delay="${i * 70}">
      <button class="option-tab" data-index="${i}" type="button">
        <i class="tab-icon" data-lucide="${group.icon}"></i>
        <span class="tab-title">${group.title}</span>
        <i class="tab-plus" data-lucide="plus"></i>
      </button>
    </div>`,
  )
  .join("");

function renderOption(index) {
  const group = optionGroups[index];
  titleEl.textContent = group.title;
  listEl.innerHTML = group.items
    .map(
      (item, i) =>
        `<li style="animation-delay:${i * 45}ms"><i data-lucide="leaf"></i><span>${item}</span></li>`,
    )
    .join("");
  tabsEl.querySelectorAll(".option-tab").forEach((btn) => {
    btn.classList.toggle("is-active", Number(btn.dataset.index) === index);
  });
  lucide.createIcons();
}

tabsEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".option-tab");
  if (btn) renderOption(Number(btn.dataset.index));
});
renderOption(0);

/* ---------- faq accordion ---------- */
const faqEl = document.getElementById("faq-list");
faqEl.innerHTML = faqs
  .map(
    (faq, i) => `
    <div class="reveal" data-delay="${i * 60}">
      <div class="faq-item${i === 0 ? " is-open" : ""}" data-index="${i}">
        <button class="faq-q" type="button">
          <h3>${faq.q}</h3>
          <i data-lucide="plus"></i>
        </button>
        <div class="faq-a"><div><p>${faq.a}</p></div></div>
      </div>
    </div>`,
  )
  .join("");

faqEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".faq-q");
  if (!btn) return;
  const item = btn.parentElement;
  const wasOpen = item.classList.contains("is-open");
  faqEl.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("is-open"));
  if (!wasOpen) item.classList.add("is-open");
});

/* ---------- icons ---------- */
if (window.lucide) lucide.createIcons();

/* ---------- reveal on scroll ---------- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
);

document.querySelectorAll(".reveal").forEach((el) => {
  if (el.dataset.delay) el.style.transitionDelay = `${el.dataset.delay}ms`;
  observer.observe(el);
});
