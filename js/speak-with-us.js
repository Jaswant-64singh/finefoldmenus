/* Fine Fold Menus — Contact page interactions (vanilla JS, no dependencies) */
(function () {
  "use strict";

  const svg = (paths, size) =>
    `<svg class="icon" viewBox="0 0 24 24"${size ? ` style="width:${size};height:${size}"` : ""}>${paths}</svg>`;

  const ICONS = {
    palette: '<circle cx="12" cy="12" r="9"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/><circle cx="9.5" cy="14.5" r="1"/>',
    utensils: '<path d="M6 3v8a2 2 0 0 0 4 0V3M8 11v10M18 3c-2 2-2 6 0 8v10"/>',
    layers: '<path d="m12 3 8 4.5-8 4.5-8-4.5z"/><path d="m4 12 8 4.5 8-4.5"/><path d="m4 16.5 8 4.5 8-4.5"/>',
    droplets: '<path d="M12 3s5 5.5 5 9a5 5 0 0 1-10 0c0-3.5 5-9 5-9Z"/>',
    square: '<rect x="4" y="4" width="16" height="16" rx="2"/>',
    waves: '<path d="M2 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2z"/><path d="M8 3v18"/>',
    sparkles: '<path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8z"/><path d="M18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9z"/>',
    martini: '<path d="M4 4h16l-8 8zM12 12v8M8 20h8"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    loader: '<path d="M12 3a9 9 0 1 0 9 9"/>',
  };

  const SERVICES = [
    ["Fully Customized Menu", "palette"],
    ["Luxury Dine-in Menu", "utensils"],
    ["MDF Series Menu", "layers"],
    ["Waterproof Menu (NTR)", "droplets"],
    ["Acrylic Menu", "square"],
    ["Pool Side Menu", "waves"],
    ["Premium Wiro Menu", "book"],
    ["Changeable Menu", "sparkles"],
    ["Bar & Drink Menu", "martini"],
    ["Food Court Menus", "sun"],
  ];

  const QUANTITIES = [15, 25, 30, 40, 50, 70, 100];

  const FAQS = [
    [
      "How quickly will you respond?",
      "Enquiries submitted through this page are reviewed the same working day, and a consultant contacts you within 24 hours with initial material and format suggestions.",
    ],
    [
      "Can I request samples?",
      "Yes. We courier a curated swatch set of leathers, acrylics and foil finishes, and can hand-build a full prototype of your cover before production.",
    ],
    [
      "Do you manufacture custom sizes?",
      "Every cover is made to measure — A4, A5, tall, square, oversized wine folios or fully bespoke dimensions with custom insert systems.",
    ],
    [
      "What is your minimum order quantity?",
      "Production begins from 15 pieces, which keeps boutique venues and pop-up concepts within reach of fully bespoke manufacturing.",
    ],
  ];

  /* ------------------------------------------------------------ particles */
  const backdrop = document.getElementById("backdrop");
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    const size = 1 + (i % 3);
    p.style.left = ((i * 37) % 100) + "%";
    p.style.top = ((i * 53) % 100) + "%";
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.animationDelay = (i % 9) * 2 + "s";
    p.style.animationDuration = 14 + (i % 7) * 3 + "s";
    backdrop.appendChild(p);
  }

  /* ------------------------------------------------------ mouse parallax */
  const frames = document.getElementById("frames").children;
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 26;
    const y = (e.clientY / window.innerHeight - 0.5) * 26;
    frames[0].style.transform = `translate3d(${x}px, ${y}px, 0) rotate(-6deg)`;
    frames[1].style.transform = `translate3d(${-x}px, ${-y}px, 0) rotate(4deg)`;
    frames[2].style.transform = `translate3d(calc(-50% + ${y}px), calc(-50% + ${x}px), 0) rotate(45deg)`;
  });

  /* --------------------------------------------------------- scroll reveal */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-shown");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = (i % 6) * 80 + "ms";
    io.observe(el);
  });

  /* ------------------------------------------------------------------ faq */
  const faqList = document.getElementById("faq-list");
  FAQS.forEach(([q, a], i) => {
    const item = document.createElement("div");
    item.className = "faq reveal" + (i === 0 ? " is-open" : "");
    item.innerHTML =
      '<h3><button type="button" aria-expanded="' +
      (i === 0) +
      '"><span>' +
      q +
      '</span><span class="plus" aria-hidden="true"></span></button></h3>' +
      '<div class="faq__body"><div><p>' +
      a +
      "</p></div></div>";
    const btn = item.querySelector("button");
    btn.addEventListener("click", () => {
      const open = item.classList.contains("is-open");
      faqList.querySelectorAll(".faq").forEach((f) => {
        f.classList.remove("is-open");
        f.querySelector("button").setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
    faqList.appendChild(item);
    io.observe(item);
  });

  /* ----------------------------------------------------------------- form */
  const state = { name: "", phone: "", service: "", quantity: null, message: "" };

  /* floating labels */
  function wireField(fieldId, inputId, alwaysLifted) {
    const field = document.getElementById(fieldId);
    const input = document.getElementById(inputId);
    const setLift = () => {
      if (alwaysLifted || input.value || field.classList.contains("is-focused"))
        field.classList.add("is-lifted");
      else field.classList.remove("is-lifted");
    };
    field.querySelectorAll("input, select, textarea").forEach((el) => {
      el.addEventListener("focus", () => {
        field.classList.add("is-focused");
        setLift();
        if (el === input) el.placeholder = el.dataset.placeholder || "";
      });
      el.addEventListener("blur", () => {
        field.classList.remove("is-focused");
        setLift();
        if (el === input) el.placeholder = "";
      });
    });
    input.addEventListener("input", () => {
      setLift();
      updateRail();
    });
    setLift();
    return input;
  }

  const nameInput = wireField("field-name", "ff-name", false);
  nameInput.dataset.placeholder = "Enter your full name";

  const phoneInput = wireField("field-phone", "ff-phone", true);
  phoneInput.dataset.placeholder = "Enter your mobile number";
  phoneInput.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/[^\d\s]/g, "");
    state.phone = phoneInput.value;
  });
  nameInput.addEventListener("input", () => {
    state.name = nameInput.value;
  });

  /* message + autogrow + counter */
  const message = wireField("field-message", "ff-message", false);
  message.dataset.placeholder =
    "Tell us about your restaurant, menu requirements, branding ideas, preferred materials, quantity, or any customization you'd like.";
  const count = document.getElementById("count");
  message.addEventListener("input", () => {
    state.message = message.value;
    count.textContent = message.value.length;
    message.style.height = "auto";
    message.style.height = Math.min(message.scrollHeight, 260) + "px";
  });

  /* searchable services dropdown */
  const select = document.getElementById("ff-select");
  const trigger = document.getElementById("select-trigger");
  const panel = document.getElementById("select-panel");
  const list = document.getElementById("select-list");
  const search = document.getElementById("select-search");
  const valueEl = document.getElementById("select-value");
  const selectIcon = document.getElementById("select-icon");
  const serviceHint = document.getElementById("service-hint");
  selectIcon.innerHTML = svg(ICONS.layers);

  function renderOptions() {
    const q = search.value.trim().toLowerCase();
    const matches = SERVICES.filter(([label]) => label.toLowerCase().includes(q));
    list.innerHTML = matches.length
      ? matches
          .map(
            ([label, icon]) =>
              '<li><button type="button" role="option" aria-selected="' +
              (state.service === label) +
              '" data-label="' +
              label +
              '" data-icon="' +
              icon +
              '">' +
              svg(ICONS[icon]) +
              "<span>" +
              label +
              "</span>" +
              (state.service === label ? '<span class="tick">' + svg(ICONS.check, "0.875rem") + "</span>" : "") +
              "</button></li>",
          )
          .join("")
      : '<li class="select__empty">No matching service.</li>';
  }

  function closePanel() {
    select.classList.remove("is-open");
    panel.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    search.value = "";
  }

  trigger.addEventListener("click", () => {
    const open = select.classList.toggle("is-open");
    panel.hidden = !open;
    trigger.setAttribute("aria-expanded", String(open));
    if (open) {
      renderOptions();
      search.focus();
    }
  });

  search.addEventListener("input", renderOptions);

  list.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-label]");
    if (!btn) return;
    state.service = btn.dataset.label;
    valueEl.textContent = state.service;
    valueEl.classList.add("filled");
    selectIcon.innerHTML = svg(ICONS[btn.dataset.icon]);
    serviceHint.hidden = true;
    closePanel();
    updateRail();
  });

  document.addEventListener("mousedown", (e) => {
    if (select.classList.contains("is-open") && !select.contains(e.target)) closePanel();
  });

  /* quantity chips */
  const chipsRow = document.getElementById("chips-row");
  const quantityHint = document.getElementById("quantity-hint");
  chipsRow.innerHTML = QUANTITIES.map(
    (q) => '<button type="button" class="chip" aria-pressed="false" data-q="' + q + '">' + q + "</button>",
  ).join("");
  chipsRow.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    state.quantity = Number(chip.dataset.q);
    chipsRow.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    quantityHint.hidden = true;
    updateRail();
  });

  /* progress rail */
  const railLabels = document.getElementById("rail-labels").children;
  const railFill = document.getElementById("rail-fill");
  const railTrack = document.getElementById("rail-track");

  function currentStage(done) {
    if (done) return 3;
    const personal = state.name.trim().length > 1 && state.phone.trim().length >= 7;
    const project = Boolean(state.service) && state.quantity !== null;
    const msg = state.message.trim().length > 10;
    if (personal && project && msg) return 3;
    if (personal && project) return 2;
    if (personal) return 1;
    return 0;
  }

  function updateRail(done) {
    const stage = currentStage(done);
    const pct = (stage / 3) * 100;
    railFill.style.width = pct + "%";
    railTrack.setAttribute("aria-valuenow", String(Math.round(pct)));
    Array.from(railLabels).forEach((el, i) => el.classList.toggle("on", i <= stage));
  }
  updateRail();

  /* hints */
  function setHint(fieldId, text) {
    const el = document.getElementById(fieldId).querySelector(".field__hint");
    el.textContent = text || "";
    el.hidden = !text;
  }

  /* submit */
  const form = document.getElementById("ff-form");
  const submit = document.getElementById("submit");
  const submitLabel = document.getElementById("submit-label");
  const formBody = document.getElementById("form-body");
  const success = document.getElementById("success");

  submit.addEventListener("click", (e) => {
    const rect = submit.getBoundingClientRect();
    const ink = document.createElement("span");
    ink.className = "ripple-ink";
    ink.style.left = e.clientX - rect.left - 60 + "px";
    ink.style.top = e.clientY - rect.top - 60 + "px";
    ink.style.width = "120px";
    ink.style.height = "120px";
    submit.appendChild(ink);
    setTimeout(() => ink.remove(), 650);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;

    if (state.name.trim().length < 2) {
      setHint("field-name", "Please share your full name.");
      ok = false;
    } else setHint("field-name", "");

    if (!/^\d{7,15}$/.test(state.phone.replace(/\s/g, ""))) {
      setHint("field-phone", "Enter a valid mobile number (digits only).");
      ok = false;
    } else setHint("field-phone", "");

    if (!state.service) {
      serviceHint.textContent = "Please select a menu service.";
      serviceHint.hidden = false;
      ok = false;
    }

    if (state.quantity === null) {
      quantityHint.textContent = "Please choose an approximate quantity.";
      quantityHint.hidden = false;
      ok = false;
    }

    if (!ok) return;

    submit.disabled = true;
    submitLabel.innerHTML =
      '<span class="spin" style="display:inline-flex">' + svg(ICONS.loader) + "</span> Preparing Your Request...";

    setTimeout(() => {
      formBody.hidden = true;
      success.hidden = false;
    }, 1900);
  });
})();
