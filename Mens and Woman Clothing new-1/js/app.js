(function () {
  "use strict";

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

  var btnNew = document.getElementById("btnScrollNew");
  var prefersSmooth =
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (btnNew) {
    btnNew.addEventListener("click", function () {
      var el = document.getElementById("new");
      if (el) {
        el.scrollIntoView({
          behavior: prefersSmooth ? "smooth" : "auto",
          block: "start",
        });
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var href = anchor.getAttribute("href");
      if (!href || href.length < 2 || href === "#") {
        return;
      }
      var target;
      try {
        target = document.querySelector(href);
      } catch (err) {
        return;
      }
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersSmooth ? "smooth" : "auto",
          block: "start",
        });
        if (history.replaceState) {
          history.replaceState(null, "", href);
        }
        if (typeof target.focus === "function") {
          target.focus({ preventScroll: true });
        }
      }
    });
  });

  document.querySelectorAll(".chips").forEach(function (chipGroup) {
    var chips = chipGroup.querySelectorAll(".chip");
    var section = chipGroup.closest("section");
    var grid = section ? section.querySelector(".grid--products") : null;
    if (!grid) return;

    chipGroup.addEventListener("click", function (e) {
      var btn = e.target.closest(".chip");
      if (!btn || !chipGroup.contains(btn)) return;

      var filter = btn.getAttribute("data-filter") || "all";
      chips.forEach(function (c) {
        var active = c === btn;
        c.classList.toggle("chip--active", active);
        c.setAttribute("aria-selected", active ? "true" : "false");
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
