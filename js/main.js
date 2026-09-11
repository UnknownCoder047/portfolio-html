/**
 * Ankit Kumar Portfolio - Interactive Controller
 * Pure Vanilla JavaScript (Zero Dependencies, Ultra Fast)
 */

document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initNavbar();
  initProjectFilters();
  initSearch();
  initServicesFilter();
  initContactForm();
  initSmoothScroll();
  initScrollReveal();
  initTrajectoryLines();
  initParallaxDrift();
  initScrollTopButton();
  initArrowAnimations();
  initStatsCounter();
});

/* 1. Header & Navbar Scroll Effect & Mobile Drawer */
function initNavbar() {
  const header = document.querySelector('.header') || document.querySelector('.navbar');
  const toggleBtn = document.querySelector('#header-toggle') || document.querySelector('.header__toggle') || document.querySelector('.navbar__toggle');
  const mobileNav = document.querySelector('#mobile-drawer') || document.querySelector('.header__mobile-drawer') || document.querySelector('.mobile-nav');

  // Shrink/shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('header--scrolled');
      header?.classList.add('navbar--scrolled');
    } else {
      header?.classList.remove('header--scrolled');
      header?.classList.remove('navbar--scrolled');
    }
  });

  // Mobile menu toggle
  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = toggleBtn.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileNav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleBtn.classList.remove('open');
        mobileNav.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }
}

/* 2. Category Filter Tabs */
function initProjectFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('[data-category]');

  if (!filterTabs.length || !cards.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter') || 'all';

      cards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.toLowerCase().includes(filter.toLowerCase())) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 3. Live Search Input */
function initSearch() {
  const searchInput = document.querySelector('.search-input');
  const items = document.querySelectorAll('[data-searchable]');

  if (!searchInput || !items.length) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

/* 3b. Services Page Dropdown & Search Filter */
function initServicesFilter() {
  const filterBtn = document.getElementById('filter-dropdown-btn');
  const filterMenu = document.getElementById('filter-menu');
  const filterText = document.getElementById('filter-current-text');
  const searchInput = document.getElementById('services-search');
  const serviceCards = document.querySelectorAll('.service-item-card');
  const noResults = document.getElementById('no-services-found');

  if (!filterBtn || !filterMenu) return;

  let activeFilter = 'all';

  function applyFilters() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let matchCount = 0;

    serviceCards.forEach(card => {
      const category = (card.getAttribute('data-category') || '').toLowerCase();
      const content = card.textContent.toLowerCase();

      const matchesCat = (activeFilter === 'all' || category.includes(activeFilter));
      const matchesText = (!query || content.includes(query));

      if (matchesCat && matchesText) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.25s ease forwards';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.style.display = (matchCount === 0) ? 'block' : 'none';
    }
  }

  // Toggle dropdown menu
  filterBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = filterMenu.classList.toggle('open');
    filterBtn.classList.toggle('open', isOpen);
    filterBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close dropdown on outside click
  document.addEventListener('click', () => {
    filterMenu.classList.remove('open');
    filterBtn.classList.remove('open');
    filterBtn.setAttribute('aria-expanded', 'false');
  });

  // Handle dropdown option clicks
  filterMenu.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
      filterMenu.querySelectorAll('li').forEach(li => li.classList.remove('active'));
      item.classList.add('active');

      activeFilter = (item.getAttribute('data-filter') || 'all').toLowerCase();
      if (filterText) filterText.textContent = item.textContent;

      filterMenu.classList.remove('open');
      filterBtn.classList.remove('open');
      filterBtn.setAttribute('aria-expanded', 'false');

      applyFilters();
    });
  });

  // Live search input filtering
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
}

/* 4. Contact Form Character Counter & Feedback */
function initContactForm() {
  const messageInput = document.getElementById('user-message');
  const charCount = document.getElementById('char-count');
  const contactForm = document.getElementById('contact-form');

  if (messageInput && charCount) {
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      charCount.textContent = `${len}/500`;
      if (len >= 500) {
        charCount.style.color = '#ef4444';
      } else {
        charCount.style.color = '';
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span>`;

      setTimeout(() => {
        submitBtn.innerHTML = `<span>Message Sent! ✓</span>`;
        submitBtn.style.backgroundColor = '#22c55e';
        contactForm.reset();
        if (charCount) charCount.textContent = '0/500';

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 800);
    });
  }
}

/* Global Lenis Smooth Scroll Instance */
let lenisInstance = null;

function initLenis() {
  if (typeof Lenis === 'undefined') return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  lenisInstance = new Lenis({
    autoRaf: true,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    infinite: false,
  });
}

/* 5. Smooth Scroll (Integrated with Lenis & Native Fallback) */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 70;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerOffset;
        if (lenisInstance) {
          lenisInstance.scrollTo(targetPosition, { duration: 1.15 });
        } else {
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* 6. On-Scroll Reveal Animations (Pattern 1, 2, & 3: Fade-Up, Cascades & Technical Line Expansion) */
function initScrollReveal() {
  // Feature detection: ensure IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) return;

  // Accessibility: respect user preference for reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const revealElements = document.querySelectorAll(
    '.reveal-on-scroll, .reveal-cascade, .reveal-cascade-pills, .line-draw, .tech-line-draw, [data-line-draw], .section-divider'
  );
  if (!revealElements.length) return;

  // Progressive enhancement: only enable animation styling if JS is active
  document.documentElement.classList.add('reveal-ready');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        entry.target.classList.add('is-drawn');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.08
  });

  revealElements.forEach(el => observer.observe(el));

  // Safety trigger: when reaching near the bottom of the page,
  // ensure any elements that lack bottom scroll headroom are revealed
  const revealRemainingAtBottom = () => {
    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 120)) {
      document.querySelectorAll(
        '.reveal-on-scroll:not(.is-revealed), .reveal-cascade:not(.is-revealed), .reveal-cascade-pills:not(.is-revealed), .line-draw:not(.is-revealed), .section-divider:not(.is-revealed)'
      ).forEach(el => {
        el.classList.add('is-revealed');
        el.classList.add('is-drawn');
        observer.unobserve(el);
      });
    }
  };

  window.addEventListener('scroll', revealRemainingAtBottom, { passive: true });
}

/* 6b. Process Trajectory & Spline Wave Draw (Pattern 3: Technical Line Draw) */
function initTrajectoryLines() {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const splines = document.querySelectorAll('.process__spline-draw, .approach__spline-draw');
  if (!splines.length) return;

  splines.forEach(path => {
    try {
      const length = Math.ceil(path.getTotalLength());
      path.style.strokeDasharray = `${length} ${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.transition = 'stroke-dashoffset 1.45s cubic-bezier(0.16, 1, 0.3, 1)';

      const container = path.closest('.process') || path.closest('.approach') || path.closest('.section') || path;

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            path.style.strokeDashoffset = '0';
            const wrap = path.closest('.process__wave-wrap') || path.closest('.approach__wave-wrap');
            if (wrap) wrap.classList.add('is-drawn');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      observer.observe(container);
    } catch (e) {
      path.style.strokeDashoffset = '0';
    }
  });
}

/* 8. Ambient 3D Graphic Parallax Drift (Pattern 4: Continuous Scroll-Scrubbed Parallax) */
function initParallaxDrift() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const driftElements = document.querySelectorAll('.parallax-drift, [data-parallax]');
  if (!driftElements.length) return;

  let ticking = false;

  function updateDrift() {
    const vh = window.innerHeight;

    driftElements.forEach(el => {
      const rect = el.getBoundingClientRect();

      // Only compute drift if the element is near/in the viewport (-200px to vh + 200px)
      if (rect.bottom >= -200 && rect.top <= vh + 200) {
        // Center position relative to screen center
        const elementCenter = rect.top + rect.height / 2;
        const screenCenter = vh / 2;
        const distance = elementCenter - screenCenter;

        // Custom drift factor (default 0.08, negative means drifts opposite to scroll for depth)
        const factor = parseFloat(el.getAttribute('data-drift-factor')) || 0.08;

        // Cap drift to keep it subtle and prevent clipping (-28px to +28px)
        const rawOffset = distance * -factor;
        const clampedOffset = Math.max(Math.min(rawOffset, 28), -28);

        el.style.setProperty('--parallax-y', `${clampedOffset.toFixed(1)}px`);
      }
    });

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateDrift);
    }
  }

  // Bind to native scroll and resize
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick, { passive: true });

  // Hook into Lenis smooth scrolling if initialized
  if (lenisInstance) {
    lenisInstance.on('scroll', requestTick);
  }

  // Initial calculation after load
  requestTick();
}

/* 7. Scroll To Top Button with Circular Progress Indicator */
function initScrollTopButton() {
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (!scrollTopBtn) return;

  const circle = scrollTopBtn.querySelector('.scroll-top-btn__circle');
  const circumference = 2 * Math.PI * 20; // ~125.66px

  if (circle) {
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
  }

  const updateProgress = () => {
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    // Show button once user scrolls past 250px
    if (scrollY > 250) {
      scrollTopBtn.classList.add('is-visible');
    } else {
      scrollTopBtn.classList.remove('is-visible');
    }

    // Update circular progress offset
    if (circle && maxScroll > 0) {
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      const offset = circumference - (progress * circumference);
      circle.style.strokeDashoffset = offset;
    }
  };

  // Smooth scroll to top on click (via Lenis or native fallback)
  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });

  // Event bindings
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });

  if (lenisInstance) {
    lenisInstance.on('scroll', updateProgress);
  }

  // Initial calculation
  updateProgress();
}

/* 8. Universal Arrow Motion System (Horizontal & Vertical Back-and-Forth Oscillation) */
function initArrowAnimations() {
  // 1. Tag existing arrow elements with directional metadata if missing
  const existingArrows = document.querySelectorAll(
    '.arrow, .btn-arrow, .btn-talk__arrow, .cta-arrow, .banner-arrow, .service-card__arrow, .service-item-card__arrow, .exploring-card__arrow, .process__track-arrow, .scroll-arrow, .arrow-icon'
  );

  existingArrows.forEach((el) => {
    const text = el.textContent.trim();
    if (text === '←' || el.classList.contains('arrow--left')) {
      el.classList.add('arrow--left');
    } else if (text === '↓' || el.classList.contains('scroll-arrow') || el.classList.contains('arrow--down')) {
      el.classList.add('arrow--down');
    } else if (text === '↑' || el.classList.contains('scroll-top-btn__icon') || el.classList.contains('arrow--up')) {
      el.classList.add('arrow--up');
    } else {
      el.classList.add('arrow--right');
    }
  });

  // 2. Scan buttons and interactive links for any unwrapped arrow characters and enhance them
  const interactiveEls = document.querySelectorAll('a, button, .btn, .btn-talk');
  interactiveEls.forEach((el) => {
    // Avoid double-wrapping or processing elements that already have structured arrow children
    if (el.querySelector('.arrow, .btn-arrow, .btn-talk__arrow, .cta-arrow, .banner-arrow, .arrow-icon')) return;

    // Check text nodes
    for (const node of Array.from(el.childNodes)) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (text.includes('→')) {
          const span = document.createElement('span');
          span.className = 'arrow arrow--x arrow--right';
          span.setAttribute('aria-hidden', 'true');
          span.textContent = '→';

          const parts = text.split('→');
          const frag = document.createDocumentFragment();
          parts.forEach((part, idx) => {
            if (part) frag.appendChild(document.createTextNode(part));
            if (idx < parts.length - 1) {
              frag.appendChild(span.cloneNode(true));
            }
          });
          node.replaceWith(frag);
          break;
        } else if (text.includes('←')) {
          const span = document.createElement('span');
          span.className = 'arrow arrow--x arrow--left';
          span.setAttribute('aria-hidden', 'true');
          span.textContent = '←';

          const parts = text.split('←');
          const frag = document.createDocumentFragment();
          parts.forEach((part, idx) => {
            if (part) frag.appendChild(document.createTextNode(part));
            if (idx < parts.length - 1) {
              frag.appendChild(span.cloneNode(true));
            }
          });
          node.replaceWith(frag);
          break;
        } else if (text.includes('↓')) {
          const span = document.createElement('span');
          span.className = 'arrow arrow--y arrow--down';
          span.setAttribute('aria-hidden', 'true');
          span.textContent = '↓';

          const parts = text.split('↓');
          const frag = document.createDocumentFragment();
          parts.forEach((part, idx) => {
            if (part) frag.appendChild(document.createTextNode(part));
            if (idx < parts.length - 1) {
              frag.appendChild(span.cloneNode(true));
            }
          });
          node.replaceWith(frag);
          break;
        } else if (text.includes('↑')) {
          const span = document.createElement('span');
          span.className = 'arrow arrow--y arrow--up';
          span.setAttribute('aria-hidden', 'true');
          span.textContent = '↑';

          const parts = text.split('↑');
          const frag = document.createDocumentFragment();
          parts.forEach((part, idx) => {
            if (part) frag.appendChild(document.createTextNode(part));
            if (idx < parts.length - 1) {
              frag.appendChild(span.cloneNode(true));
            }
          });
          node.replaceWith(frag);
          break;
        }
      }
    }
  });
}

/* 10. Stats Counter Animation (Pattern 10: Smooth 0 -> Target Counter) */
function initStatsCounter() {
  const statElements = document.querySelectorAll('.about-stats__val, [data-counter]');
  if (!statElements.length) return;

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const parseCounterData = (el) => {
    const rawTarget = el.getAttribute('data-counter');
    const rawSuffix = el.getAttribute('data-suffix');
    const rawPrefix = el.getAttribute('data-prefix');

    if (rawTarget !== null) {
      return {
        target: parseFloat(rawTarget),
        decimals: rawTarget.includes('.') ? rawTarget.split('.')[1].length : 0,
        prefix: rawPrefix || '',
        suffix: rawSuffix !== null ? rawSuffix : ''
      };
    }

    // Fallback parsing from textContent (e.g., "3+", "100%", "$50k")
    const text = el.textContent.trim();
    const match = text.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (match) {
      return {
        target: parseFloat(match[2]),
        decimals: match[2].includes('.') ? match[2].split('.')[1].length : 0,
        prefix: match[1] || '',
        suffix: match[3] || ''
      };
    }
    return null;
  };

  const animateCounter = (el) => {
    const data = parseCounterData(el);
    if (!data || isNaN(data.target)) return;

    if (prefersReducedMotion) {
      el.textContent = `${data.prefix}${data.target.toFixed(data.decimals)}${data.suffix}`;
      return;
    }

    const duration = data.target > 20 ? 1800 : 1300;
    const startTime = performance.now();
    el.classList.add('is-counting');
    el.textContent = `${data.prefix}0${data.suffix}`;

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Quartic Ease-Out curve: fast takeoff with gentle deceleration landing
      const easeOutProgress = 1 - Math.pow(1 - progress, 4);
      const currentVal = easeOutProgress * data.target;

      if (data.decimals > 0) {
        el.textContent = `${data.prefix}${currentVal.toFixed(data.decimals)}${data.suffix}`;
      } else {
        el.textContent = `${data.prefix}${Math.round(currentVal)}${data.suffix}`;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = `${data.prefix}${data.target.toFixed(data.decimals)}${data.suffix}`;
        el.classList.remove('is-counting');
      }
    };

    requestAnimationFrame(updateCount);
  };

  if ('IntersectionObserver' in window) {
    const statsContainers = document.querySelectorAll('.about-stats, [data-stats-counter]');
    if (statsContainers.length) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const targets = entry.target.querySelectorAll('.about-stats__val, [data-counter]');
            targets.forEach((el, index) => {
              setTimeout(() => animateCounter(el), index * 70);
            });
            obs.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.15
      });

      statsContainers.forEach(container => observer.observe(container));
    } else {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.15
      });

      statElements.forEach(el => observer.observe(el));
    }
  } else {
    statElements.forEach(animateCounter);
  }
}

