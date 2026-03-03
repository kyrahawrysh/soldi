/* ===========================
   SOLDI — Main JS
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Header Scroll ---
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 60) {
        header.classList.remove('transparent');
        header.classList.add('scrolled');
      } else {
        header.classList.add('transparent');
        header.classList.remove('scrolled');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // --- Mobile Nav Drawer ---
  const hamburger = document.querySelector('.hamburger');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  if (hamburger && mobileDrawer) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileDrawer.classList.toggle('open');
      document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Fade-in on Scroll (IntersectionObserver) ---
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(el => observer.observe(el));
  }

  // --- Product Image Gallery (Product Page) ---
  const galleryMain = document.querySelector('.gallery-main');
  const galleryMainImg = document.querySelector('.gallery-main-img');
  const thumbs = document.querySelectorAll('.gallery-thumb');

  if (galleryMain && thumbs.length > 0) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const imgSrc = thumb.getAttribute('data-img');
        if (imgSrc && galleryMainImg) {
          galleryMainImg.src = imgSrc;
        }
      });
    });
  }

  // --- Accordion (Product Page) ---
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const headerEl = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    headerEl.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      accordionItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-content').style.maxHeight = null;
      });

      // Open clicked (if it wasn't already open)
      if (!isOpen) {
        item.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // --- Color Swatch Selector (Product Page) ---
  const swatches = document.querySelectorAll('.swatch');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
    });
  });

});
