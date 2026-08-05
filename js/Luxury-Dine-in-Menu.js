/* Fine Fold Menus — Luxury Dine-In Menu Covers | interactions */
(function () {
  "use strict";

  var industries = [
    "Fine Dining Restaurants",
    "Luxury Hotels",
    "Boutique Hotels",
    "Premium Cafés",
    "Resorts",
    "Rooftop Restaurants",
    "Signature Dining Venues",
    "Private Clubs",
    "Wine Bars",
    "Executive Lounges",
    "Chef's Table Experiences",
    "High-End Hospitality Brands",
  ];

  var benefits = [
    "Premium handcrafted finishes",
    "Fully customized designs",
    "Elegant logo branding",
    "Durable construction for daily use",
    "Replaceable menu insert options",
    "Luxury stitching and detailing",
    "Scratch-resistant and easy-to-maintain surfaces",
    "Wide selection of premium materials and finishes",
  ];

  var tileIcon =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">' +
    '<rect x="3" y="3" width="18" height="18" rx="3"/>' +
    '<path d="M12 7l1.8 3.2L17 12l-3.2 1.8L12 17l-1.8-3.2L7 12l3.2-1.8L12 7z"/></svg>';

  var grid = document.querySelector("[data-industries]");
  if (grid) {
    grid.innerHTML = industries
      .map(function (name) {
        return '<div class="ff-tile ff-reveal">' + tileIcon + "<span>" + name + "</span></div>";
      })
      .join("");
  }

  var benefitsWrap = document.querySelector("[data-benefits]");
  if (benefitsWrap) {
    benefitsWrap.innerHTML = benefits
      .map(function (b) {
        return '<div class="ff-benefit ff-reveal"><i></i><p>' + b + "</p></div>";
      })
      .join("");
  }

  /* Scroll reveals */
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );
  document.querySelectorAll(".ff-reveal").forEach(function (el) {
    observer.observe(el);
  });

  /* Customization panels — hover + click */
  document.querySelectorAll("[data-panels] .ff-panel").forEach(function (panel, _i, all) {
    function open() {
      all.forEach(function (p) {
        p.classList.toggle("is-open", p === panel);
      });
    }
    panel.addEventListener("mouseenter", open);
    panel.addEventListener("click", function () {
      if (panel.classList.contains("is-open")) {
        panel.classList.remove("is-open");
      } else {
        open();
      }
    });
  });

  /* FAQ accordion */
  document.querySelectorAll("[data-faq] .ff-faq__item").forEach(function (item, _i, all) {
    var btn = item.querySelector(".ff-faq__btn");
    btn.addEventListener("click", function () {
      var willOpen = !item.classList.contains("is-open");
      all.forEach(function (it) {
        it.classList.remove("is-open");
        it.querySelector(".ff-faq__btn").setAttribute("aria-expanded", "false");
      });
      if (willOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* Button ripple */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".ff-btn");
    if (!btn) return;
    var rect = btn.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    var span = document.createElement("span");
    span.className = "ff-ripple";
    span.style.width = span.style.height = size + "px";
    span.style.left = e.clientX - rect.left - size / 2 + "px";
    span.style.top = e.clientY - rect.top - size / 2 + "px";
    btn.appendChild(span);
    setTimeout(function () {
      span.remove();
    }, 640);
  });

  /* Soft hero parallax */
  var heroImg = document.querySelector(".ff-hero__media img, .ff-hero__media video");
  if (heroImg && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener(
      "scroll",
      function () {
        var y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          heroImg.style.transform = "scale(1.06) translateY(" + y * 0.12 + "px)";
        }
      },
      { passive: true }
    );
  }
})();
