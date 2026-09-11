(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header scroll state ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile drawer ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var drawer = document.querySelector(".nav-drawer");
  var drawerClose = document.querySelector(".nav-drawer-close");
  function openDrawer() {
    drawer.classList.add("is-open");
    document.body.style.overflow = "hidden";
    toggle.setAttribute("aria-expanded", "true");
  }
  function closeDrawer() {
    drawer.classList.remove("is-open");
    document.body.style.overflow = "";
    toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle && drawer) {
    toggle.addEventListener("click", openDrawer);
    drawerClose.addEventListener("click", closeDrawer);
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeDrawer);
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });
  }

  /* ---------- Scroll-driven reveals ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = (Array.prototype.indexOf.call(revealEls, el) % 4) * 70;
            setTimeout(function () {
              el.classList.add("is-visible");
            }, delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Active-section nav indicator (one-page smooth scroll) ---------- */
  var navLinks = document.querySelectorAll(".nav-desktop a[href^='#']");
  var sections = Array.prototype.map.call(navLinks, function (a) {
    return document.querySelector(a.getAttribute("href"));
  }).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var navIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var id = "#" + entry.target.id;
          var link = document.querySelector(".nav-desktop a[href='" + id + "']");
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove("active"); });
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) { navIO.observe(s); });
  }

  /* ---------- Menu tabs (accordion-as-feature) ---------- */
  var tabs = document.querySelectorAll(".menu-tab");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var target = tab.getAttribute("data-target");
      tabs.forEach(function (t) { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      document.querySelectorAll(".menu-panel").forEach(function (p) {
        p.classList.toggle("is-active", p.id === target);
      });
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var panel = item.querySelector(".faq-a");
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("is-open");
          other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
          other.querySelector(".faq-a").style.maxHeight = null;
        }
      });
      item.classList.toggle("is-open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
      panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : null;
    });
  });

  /* ---------- Sticky narrative: highlight active "Visit" step ---------- */
  var visitSteps = document.querySelectorAll(".visit-step");
  var visitCard = document.querySelector(".visit-card");
  if ("IntersectionObserver" in window && visitSteps.length && visitCard) {
    var visitIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var stepId = entry.target.getAttribute("data-step");
            visitCard.querySelectorAll("[data-panel]").forEach(function (p) {
              p.hidden = p.getAttribute("data-panel") !== stepId;
            });
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    visitSteps.forEach(function (s) { visitIO.observe(s); });
  }

  /* ---------- Contact form: live validation + success state ---------- */
  var form = document.querySelector("#contact-form");
  if (form) {
    var statusEl = form.querySelector(".form-status");
    function validateField(field) {
      var input = field.querySelector("input, textarea");
      var valid = input.checkValidity();
      field.classList.toggle("has-error", !valid);
      return valid;
    }
    form.querySelectorAll(".field").forEach(function (field) {
      var input = field.querySelector("input, textarea");
      input.addEventListener("blur", function () { validateField(field); });
      input.addEventListener("input", function () {
        if (field.classList.contains("has-error")) validateField(field);
      });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var allValid = true;
      form.querySelectorAll(".field").forEach(function (field) {
        if (!validateField(field)) allValid = false;
      });
      if (!allValid) {
        statusEl.textContent = "Please fix the highlighted fields.";
        statusEl.classList.remove("ok");
        statusEl.classList.add("is-visible");
        return;
      }
      // Placeholder submit — replace with a real endpoint, e.g.:
      // fetch('/api/contact', { method: 'POST', body: new FormData(form) })
      statusEl.textContent = "Thanks — we'll get back to you within a day. See you at Darna soon.";
      statusEl.classList.add("ok", "is-visible");
      form.reset();
    });
  }

  /* ---------- Honest animated counters ---------- */
  var counters = document.querySelectorAll("[data-count-to]");
  if (counters.length && "IntersectionObserver" in window) {
    var countIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var to = parseFloat(el.getAttribute("data-count-to"));
          var suffix = el.getAttribute("data-suffix") || "";
          if (reduceMotion) {
            el.textContent = to + suffix;
          } else {
            var start = null;
            var duration = 900;
            function step(ts) {
              if (!start) start = ts;
              var progress = Math.min((ts - start) / duration, 1);
              var eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.round(eased * to) + suffix;
              if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
          }
          countIO.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (c) { countIO.observe(c); });
  }
})();
