var yearEl = document.getElementById('year');
if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

// Mobile nav toggle
var toggle = document.querySelector('.nav-toggle');
var mobileNav = document.getElementById('mobile-nav');
if (toggle && mobileNav) {
  toggle.addEventListener('click', function () {
    var open = mobileNav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  var mobileLinks = mobileNav.querySelectorAll('a');
  for (var i = 0; i < mobileLinks.length; i++) {
    mobileLinks[i].addEventListener('click', function () {
      mobileNav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }
}

// Scroll reveal — strictly progressive enhancement. Content is visible by
// default (see styles.css); we only opt INTO the hidden-then-reveal
// treatment if every feature this needs is actually supported. Any
// unsupported feature here means the page simply stays static and fully
// visible, which is always a safe, correct fallback.
(function () {
  var supportsReveal =
    'IntersectionObserver' in window &&
    typeof window.matchMedia === 'function' &&
    'classList' in document.documentElement;

  if (!supportsReveal) { return; }

  var prefersReduced = false;
  try {
    prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {
    return; // if matchMedia misbehaves, don't risk hiding content
  }

  if (prefersReduced) { return; } // respect it by never hiding content at all

  try {
    var revealEls = document.querySelectorAll('.reveal');
    document.documentElement.classList.add('js-ready');
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } catch (e) {
    // Something unexpected — make sure nothing is left invisible.
    document.documentElement.classList.remove('js-ready');
  }
})();
