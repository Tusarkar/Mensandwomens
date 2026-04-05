(function () {
  "use strict";

  var mobileToggle = document.querySelector(".nav-toggle");
  var mobilePanel = document.getElementById("mobile-panel");

  function setMobileOpen(open) {
    mobileToggle.setAttribute("aria-expanded", String(open));
    mobilePanel.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (mobileToggle && mobilePanel) {
    mobileToggle.addEventListener("click", function () {
      var open = mobileToggle.getAttribute("aria-expanded") === "true";
      setMobileOpen(!open);
    });

    mobilePanel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMobileOpen(false);
      });
    });
  }

  var contactForm = document.getElementById("contact-form");
  var contactSuccess = document.getElementById("contact-success");
  if (contactForm && contactSuccess) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      contactSuccess.hidden = false;
      contactForm.reset();
    });
  }

  document.querySelectorAll(".chips").forEach(function (chipGroup) {
    var chips = chipGroup.querySelectorAll(".chip");
    var section = chipGroup.closest("section");
    var grid = section ? section.querySelector(".product-grid") : null;
    if (!grid) return;

    chipGroup.addEventListener("click", function (e) {
      var btn = e.target.closest(".chip");
      if (!btn || !chipGroup.contains(btn)) return;

      var filter = btn.getAttribute("data-filter") || "all";
      chips.forEach(function (c) {
        c.classList.toggle("is-active", c === btn);
      });

      grid.querySelectorAll(".product-card").forEach(function (card) {
        var cat = card.getAttribute("data-category");
        var show = filter === "all" || cat === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var revealEls = document.querySelectorAll(".reveal");
    if (revealEls.length && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      revealEls.forEach(function (el) {
        io.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
