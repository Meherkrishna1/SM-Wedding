/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   MILIND & AVIKA â€” WEDDING WEBSITE
   JavaScript: Entry Gate, Music, Interactions, Countdown, Gallery, RSVP
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

(function () {
  'use strict';

  /* â”€â”€â”€ UTILITY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
     ENTRY GATE
  â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
  (function entryGate() {
    const gate    = $('#entry-gate');
    const cta     = $('#entry-gate-cta');
    const musicBtn = $('#music-toggle');
    const audio   = $('#bg-music');
    if (!gate || !cta) return;

    // Lock body scroll while gate is open
    document.body.style.overflow = 'hidden';

    cta.addEventListener('click', () => {
      // 1. Animate gate out
      gate.classList.add('is-open');

      // 2. Restore scroll & remove gate from DOM after transition
      setTimeout(() => {
        gate.classList.add('is-gone');
        document.body.style.overflow = '';
      }, 850);

      // 3. Show music toggle button
      if (musicBtn) {
        setTimeout(() => {
          musicBtn.classList.add('is-visible');
        }, 600);
      }

      // 4. Auto-attempt music play (may be blocked by browser until interaction)
      if (audio) {
        audio.volume = 0.35;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            musicBtn?.setAttribute('aria-pressed', 'true');
            musicBtn?.classList.add('is-playing');
            const textEl = musicBtn?.querySelector('.music-toggle__text');
            if (textEl) textEl.textContent = 'Sound On';
          }).catch(() => {
            // Autoplay blocked â€” music stays off, toggle visible
          });
        }
      }

      // 5. Trigger hero Ken-Burns after gate is gone
      setTimeout(() => {
        const heroSection = $('.hero');
        if (heroSection) heroSection.classList.add('loaded');
      }, 100);
    });
  })();

  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
     MUSIC TOGGLE
  â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
  (function musicToggle() {
    const btn   = $('#music-toggle');
    const audio = $('#bg-music');
    if (!btn || !audio) return;

    btn.addEventListener('click', () => {
      const isPlaying = btn.getAttribute('aria-pressed') === 'true';
      const textEl    = btn.querySelector('.music-toggle__text');

      if (isPlaying) {
        audio.pause();
        btn.setAttribute('aria-pressed', 'false');
        btn.classList.remove('is-playing');
        if (textEl) textEl.textContent = 'Music';
      } else {
        audio.volume = 0.35;
        audio.play().then(() => {
          btn.setAttribute('aria-pressed', 'true');
          btn.classList.add('is-playing');
          if (textEl) textEl.textContent = 'Sound On';
        }).catch(() => {
          // Still blocked
        });
      }
    });
  })();

  /* â”€â”€â”€ HERO LOAD ANIMATION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  (function heroLoad() {
    // Note: heroLoad is now triggered by entryGate; this is a fallback
    const section = $('.hero');
    if (!section) return;
    // Only trigger immediately if entry gate is not present
    const gate = $('#entry-gate');
    if (!gate) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          section.classList.add('loaded');
        });
      });
    }
  })();

  /* â”€â”€â”€ NAVIGATION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  (function nav() {
    const nav    = $('#site-nav');
    const toggle = $('#nav-toggle');
    const links  = $('#nav-links');
    if (!nav) return;

    // Scroll-based styles
    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile toggle
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        const open = links.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
        toggle.classList.toggle('is-open', open);
      });

      // Close on link click
      $$('.nav-link', links).forEach(link => {
        link.addEventListener('click', () => {
          links.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.classList.remove('is-open');
        });
      });

      // Close on outside click
      document.addEventListener('click', e => {
        if (!nav.contains(e.target)) {
          links.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.classList.remove('is-open');
        }
      });
    }

    // Hamburger animation
    if (toggle) {
      const style = document.createElement('style');
      style.textContent = `
        .nav-toggle.is-open span:nth-child(1){transform:rotate(45deg) translate(4.5px,4.5px);}
        .nav-toggle.is-open span:nth-child(2){opacity:0;transform:scaleX(0);}
        .nav-toggle.is-open span:nth-child(3){transform:rotate(-45deg) translate(4.5px,-4.5px);}
      `;
      document.head.appendChild(style);
    }

    // Active link on scroll
    const sections = $$('section[id]');
    const navLinks = $$('.nav-link');

    const activeObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(l => {
            l.classList.toggle(
              'is-active',
              l.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => activeObs.observe(s));

    // Style active link
    const activeStyle = document.createElement('style');
    activeStyle.textContent = `.nav-link.is-active{color:var(--clr-ivory)!important;} .nav-link.is-active::after{width:100%!important;}`;
    document.head.appendChild(activeStyle);
  })();

  /* â”€â”€â”€ SCROLL REVEAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  (function scrollReveal() {
    const items = $$('.reveal');
    if (!items.length) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (entry.target.closest('#hero')) {
            obs.unobserve(entry.target);
          }
        } else {
          if (!entry.target.closest('#hero')) {
            entry.target.classList.remove('is-visible');
          }
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    items.forEach(el => obs.observe(el));
  })();

  /* â”€â”€â”€ PARALLAX ON HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  (function parallax() {
    const heroImg = $('#hero-img');
    if (!heroImg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const vh = window.innerHeight;
          if (scrolled < vh) {
            const pct = scrolled / vh;
            heroImg.style.transform = `scale(1) translateY(${pct * 18}%)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  })();

  /* â”€â”€â”€ COUNTDOWN + RINGS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  (function countdown() {
    const cdDays    = $('#cd-days');
    const cdHours   = $('#cd-hours');
    const cdMins    = $('#cd-minutes');
    const cdSecs    = $('#cd-seconds');
    if (!cdDays) return;

    // Wedding date: 22 Aug 2026, 7:00 PM IST (UTC+5:30)
    const target = new Date('2026-08-22T19:00:00+05:30').getTime();
    const circumference = 2 * Math.PI * 36; // r=36

    const ringDays  = $('#ring-days');
    const ringHours = $('#ring-hours');
    const ringMins  = $('#ring-minutes');
    const ringSecs  = $('#ring-seconds');

    // Set stroke-dasharray on all rings
    [ringDays, ringHours, ringMins, ringSecs].forEach(r => {
      if (r) {
        r.style.strokeDasharray = circumference;
        r.style.strokeDashoffset = circumference;
      }
    });

    function setRing(el, value, max) {
      if (!el) return;
      const progress = value / max;
      el.style.strokeDashoffset = circumference * (1 - progress);
    }

    function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

    function animateValue(el, newVal) {
      if (el.textContent === newVal) return;
      el.style.transform = 'translateY(-8px)';
      el.style.opacity   = '0';
      setTimeout(() => {
        el.textContent   = newVal;
        el.style.transform = 'translateY(0)';
        el.style.opacity   = '1';
      }, 200);
    }

    [cdDays, cdHours, cdMins, cdSecs].forEach(el => {
      el.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
    });

    const totalDays = Math.ceil((target - Date.now()) / 86400000);

    function update() {
      const now  = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        [cdDays, cdHours, cdMins, cdSecs].forEach(el => { el.textContent = '00'; });
        return;
      }

      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      animateValue(cdDays,  pad(d));
      animateValue(cdHours, pad(h));
      animateValue(cdMins,  pad(m));
      animateValue(cdSecs,  pad(s));

      setRing(ringDays,  d, Math.max(totalDays, 1));
      setRing(ringHours, h, 24);
      setRing(ringMins,  m, 60);
      setRing(ringSecs,  s, 60);
    }

    update();
    setInterval(update, 1000);
  })();

  /* â”€â”€â”€ GALLERY & LIGHTBOX â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  (function gallery() {
    const items     = $$('.gallery__item');
    const lightbox  = $('#lightbox');
    const lbImg     = $('#lightbox-img');
    const lbClose   = $('#lightbox-close');
    const lbPrev    = $('#lightbox-prev');
    const lbNext    = $('#lightbox-next');
    const lbCaption = $('#lightbox-caption');
    const lbCounter = $('#lightbox-counter');
    const lbBackdrop = $('#lightbox-backdrop');
    if (!lightbox) return;

    let currentIndex = 0;
    const images = items.map(item => {
      const img    = item.querySelector('.gallery__img');
      const capEl  = item.querySelector('.gallery__caption-title');
      return { src: img.src, alt: img.alt, caption: capEl ? capEl.textContent.trim() : '' };
    });

    function updateCounter() {
      if (lbCounter) lbCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    function openLightbox(index) {
      currentIndex = index;
      lbImg.src = images[currentIndex].src;
      lbImg.alt = images[currentIndex].alt;
      if (lbCaption) lbCaption.textContent = images[currentIndex].caption;
      updateCounter();
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    }

    function closeLightbox() {
      lightbox.hidden = true;
      document.body.style.overflow = '';
    }

    function showImage(index) {
      currentIndex = (index + images.length) % images.length;
      lbImg.style.opacity = '0';
      setTimeout(() => {
        lbImg.src = images[currentIndex].src;
        lbImg.alt = images[currentIndex].alt;
        if (lbCaption) lbCaption.textContent = images[currentIndex].caption;
        lbImg.style.opacity = '1';
        updateCounter();
      }, 150);
    }

    lbImg.style.transition = 'opacity 0.15s ease';

    items.forEach((item, i) => {
      item.addEventListener('click', () => openLightbox(i));
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(i);
        }
      });
    });

    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', () => showImage(currentIndex - 1));
    lbNext.addEventListener('click', () => showImage(currentIndex + 1));
    if (lbBackdrop) lbBackdrop.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', e => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  showImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
  })();

  /* â”€â”€â”€ RSVP FORM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  (function rsvpForm() {
    const form     = $('#rsvp-form');
    const success  = $('#rsvp-success');
    const submitBtn = $('#rsvp-submit-btn');
    if (!form) return;

    function validateField(input) {
      const errorEl = $(`#${input.id}-error`);
      let msg = '';

      if (input.required && !input.value.trim()) {
        msg = 'This field is required.';
      } else if (input.type === 'email' && input.value) {
        const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRx.test(input.value)) msg = 'Please enter a valid email address.';
      }

      if (errorEl) {
        errorEl.textContent = msg;
        input.classList.toggle('has-error', !!msg);
      }
      return !msg;
    }

    // Add error styles
    const errStyle = document.createElement('style');
    errStyle.textContent = `.form-input.has-error{border-color:#ff4466 !important;}`;
    document.head.appendChild(errStyle);

    // Live validation
    ['rsvp-name', 'rsvp-email', 'rsvp-guests'].forEach(id => {
      const el = $(`#${id}`);
      if (el) {
        el.addEventListener('blur', () => validateField(el));
        el.addEventListener('input', () => {
          if (el.classList.contains('has-error')) validateField(el);
        });
      }
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();

      const fields = [
        { id: 'rsvp-name',   el: $('#rsvp-name') },
        { id: 'rsvp-email',  el: $('#rsvp-email') },
        { id: 'rsvp-guests', el: $('#rsvp-guests') },
      ];

      let valid = true;
      fields.forEach(({ el }) => {
        if (el && !validateField(el)) valid = false;
      });

      if (!valid) return;

      // Simulate async submission
      const btnText   = submitBtn.querySelector('.btn__text');
      const btnLoader = submitBtn.querySelector('.btn__loader');
      submitBtn.disabled = true;
      if (btnText)   btnText.hidden   = true;
      if (btnLoader) btnLoader.hidden = false;

      await new Promise(r => setTimeout(r, 1800));

      form.hidden    = true;
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  })();

  /* â”€â”€â”€ SHARE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  (function share() {
    const whatsappBtn   = $('#share-whatsapp-btn');
    const copyBtn       = $('#share-copy-btn');
    const nativeBtn     = $('#share-native-btn');
    const copyFeedback  = $('#share-copy-feedback');

    const url     = window.location.href;
    const message = `You're invited to Sowmya & Manikanta's wedding! Join us on 22 August 2026 in Kakinada. ${url}`;

    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(message)}`,
          '_blank',
          'noopener,noreferrer'
        );
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(url);
          if (copyFeedback) {
            copyFeedback.hidden = false;
            setTimeout(() => { copyFeedback.hidden = true; }, 2500);
          }
        } catch {
          // Fallback
          const ta = document.createElement('textarea');
          ta.value = url;
          ta.style.position = 'fixed';
          ta.style.opacity  = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          if (copyFeedback) {
            copyFeedback.hidden = false;
            setTimeout(() => { copyFeedback.hidden = true; }, 2500);
          }
        }
      });
    }

    const calendarBtn = $('#calendar-btn');
    if (calendarBtn) {
      calendarBtn.addEventListener('click', e => {
        e.preventDefault();
        const start = '20260822T133000Z'; // 7:00 PM IST is 1:30 PM UTC
        const end   = '20260822T183000Z';
        const now   = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const ics = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'PRODID:-//SowmyaManikanta//Wedding//EN',
          'BEGIN:VEVENT',
          'UID:SowmyaManikanta-wedding-2026@ceremony',
          'DTSTAMP:' + now,
          'DTSTART:' + start,
          'DTEND:' + end,
          'SUMMARY:Sowmya & Manikanta — Wedding Ceremony',
          'DESCRIPTION:Join us to celebrate our wedding at Taj Lands End, Mumbai.',
          'LOCATION:Taj Lands End, Mumbai',
          'END:VEVENT',
          'END:VCALENDAR'
        ].join('\r\n');
        const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'sowmya-manikanta-wedding.ics';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
      });
    }
  })();

  /* â”€â”€â”€ LIVESTREAM REMINDER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  (function livestream() {
    const reminderBtn = $('#livestream-join-btn');
    if (!reminderBtn) return;

    reminderBtn.addEventListener('click', e => {
      e.preventDefault();
      // Generate ICS calendar event
      const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//SowmyaManikanta//Wedding//EN',
        'VERSION:2.0',
        'UID:SowmyaManikanta-wedding-2026@ceremony',
        'DTSTAMP:' + now,
        'DTSTART:' + formatDate(start),
        'DTEND:' + formatDate(end),
        'SUMMARY:Sowmya & Manikanta â€” Wedding Ceremony (Live Stream)',
        'DESCRIPTION:Watch the wedding live at ' + window.location.href + '#livestream',
        'LOCATION:YouTube Live',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'manikanta-sowmya-wedding.ics';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    });
  })();

  /* â”€â”€â”€ SMOOTH SCROLL POLYFILL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  (function smoothScrollLinks() {
    $$('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const id = anchor.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  })();

  /* â”€â”€â”€ LAZY IMAGE LOADING ENHANCEMENT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  (function lazyImages() {
    if ('loading' in HTMLImageElement.prototype) return; // native support
    const imgs = $$('img[loading="lazy"]');
    const obs  = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    imgs.forEach(img => obs.observe(img));
  })();

  /* ─── PINNED HORIZONTAL SCROLL GALLERY ─── */
  (function initPinnedGallery() {
    const track = $('.gallery__scroll-track');
    const sticky = $('.gallery__sticky-wrap');
    const masonry = $('.gallery__masonry');
    if (!track || !sticky || !masonry) return;

    function updateHeight() {
      // Allow images to load/paint before calculating width
      setTimeout(() => {
        if (window.innerWidth <= 900) {
          track.style.height = '';
          masonry.style.transform = '';
          return;
        }
        const scrollWidth = masonry.scrollWidth;
        const vh = window.innerHeight;
        // The track height = viewport height + the amount we want to scroll horizontally
        const hiddenWidth = scrollWidth - window.innerWidth;
        
        if (hiddenWidth > 0) {
          track.style.height = `${vh + hiddenWidth}px`;
        } else {
          track.style.height = 'auto';
        }
      }, 300);
    }

    function onScroll() {
      if (window.innerWidth <= 900) return;
      const trackRect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const hiddenWidth = masonry.scrollWidth - window.innerWidth;
      
      if (hiddenWidth <= 0) return; // No need to scroll

      // If the top of the track is above the viewport and the bottom is below the viewport
      if (trackRect.top <= 0 && trackRect.bottom >= vh) {
        // Calculate progress (0 to 1)
        const progress = Math.abs(trackRect.top) / (trackRect.height - vh);
        masonry.style.transform = `translate3d(-${progress * hiddenWidth}px, 0, 0)`;
      } else if (trackRect.top > 0) {
        masonry.style.transform = `translate3d(0, 0, 0)`;
      } else if (trackRect.bottom < vh) {
        masonry.style.transform = `translate3d(-${hiddenWidth}px, 0, 0)`;
      }
    }

    // Initialize and add listeners
    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('scroll', () => {
      requestAnimationFrame(onScroll);
    }, { passive: true });
    
    // Also re-update height on image loads
    const imgs = masonry.querySelectorAll('img');
    imgs.forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', updateHeight);
      }
    });
  })();


  /* ─── GALLERY MASONRY EQUALISE ─────────────── */
  (function masonryLoad() {
    const masonry = $('.gallery__masonry');
    if (!masonry) return;
    const imgs = $$('img', masonry);
    let loaded = 0;
    imgs.forEach(img => {
      if (img.complete) { loaded++; }
      else {
        img.addEventListener('load', () => {
          loaded++;
          if (loaded === imgs.length) masonry.style.columnGap = masonry.style.columnGap;
        });
      }
    });
  })();

  /* â”€â”€â”€ HERO PARTICLES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  (function heroParticles() {
    const canvas = $('#hero-particles');
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x  = Math.random() * W;
        this.y  = Math.random() * H;
        this.r  = Math.random() * 2 + 0.5;
        this.a  = Math.random() * 0.4 + 0.1;
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = -(Math.random() * 0.3 + 0.1);
        this.life = Math.random() * 200 + 100;
        this.maxLife = this.life;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        if (this.life <= 0 || this.y < -10) this.reset();
      }
      draw() {
        const alpha = (this.life / this.maxLife) * this.a;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${alpha})`;
        ctx.fill();
      }
    }

    function init() {
      resize();
      particles = Array.from({ length: 55 }, () => new Particle());
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    init();
    loop();
  })();

  /* â”€â”€â”€ CINEMATIC FILM CARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  (function filmCard() {
    const playBtn   = $('#film-play-btn');
    const posterWrap = $('#film-poster-wrap') || $('#film-poster')?.closest('.film__poster');
    const posterImg = $('#film-poster');
    const player    = $('#film-player');
    const closeBtn  = $('#film-close-btn');
    const iframe    = $('#wedding-video');
    if (!playBtn || !player || !iframe) return;

    playBtn.addEventListener('click', () => {
      // Load the iframe src lazily on play
      if (iframe.src !== iframe.dataset.src) {
        iframe.src = iframe.dataset.src;
      }
      // Hide the poster area (use poster's parent, the .film__poster div)
      const poster = playBtn.closest('.film__poster');
      if (poster) poster.style.display = 'none';
      player.hidden = false;
    });

    closeBtn.addEventListener('click', () => {
      // Pause by removing src
      iframe.src = '';
      player.hidden = true;
      // Restore poster
      const poster = document.querySelector('.film__poster');
      if (poster) poster.style.display = '';
    });
  })();

})();

/* â”€â”€â”€ COUNTDOWN PARTICLES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
(function countdownParticles() {
  const canvas = document.getElementById('countdown-particles');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * -100 - 10;
      this.r  = Math.random() * 2.5 + 0.5;
      this.a  = Math.random() * 0.5 + 0.1;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() * 1) + 0.5; // Falling down
      this.life = Math.random() * 300 + 100;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life--;
      if (this.life <= 0 || this.y > H + 10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(250, 247, 242, ${this.a})`; // Ivory color
      ctx.fill();
    }
  }

  function init() {
    resize();
    for (let i = 0; i < 40; i++) particles.push(new Particle());
    // initial spread
    particles.forEach(p => p.y = Math.random() * H);
    animate();
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  init();
})();

