// script.js
// Basic interactive bits:
// - mobile nav toggle
// - set current year in footer
// - contact form validation + fake send
// - gallery modal (keyboard accessible)
// - smooth scroll for internal links

document.addEventListener('DOMContentLoaded', () => {
  // NAV TOGGLE (mobile)
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  navToggle && navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', siteNav.classList.contains('open'));
  });

  // CURRENT YEAR
  const curYear = document.getElementById('curYear');
  if (curYear) curYear.textContent = new Date().getFullYear();

  // SMOOTH SCROLL for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
        // close mobile nav
        if (siteNav.classList.contains('open')) siteNav.classList.remove('open');
      }
    });
  });

  // CONTACT FORM handling
  const form = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-msg');

  if (form) {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      formMsg.textContent = '';
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();

      // Basic client-side validation
      if (name.length < 2) return showMessage('Please enter your full name.');
      if (!validateEmail(email)) return showMessage('Please provide a valid email address.');
      if (message.length < 10) return showMessage('Please enter a slightly longer message.');

      // Simulate sending (replace with real API call)
      showMessage('Sending message...', true);
      setTimeout(() => {
        form.reset();
        showMessage('Thanks! Your message was sent. We will respond within 2 business days.');
      }, 900);
    });
  }

  function showMessage(text, pending=false) {
    if (!formMsg) return;
    formMsg.textContent = text;
    formMsg.style.opacity = pending ? '0.9' : '1';
  }

  function validateEmail(e) {
    // simple regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  // GALLERY modal
  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', () => openModal(img));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(img);
      }
    });
  });

  function openModal(imgEl) {
    if (!modal || !modalImg) return;
    modalImg.src = imgEl.src;
    modalImg.alt = imgEl.alt || 'Gallery image';
    modalCaption.textContent = imgEl.alt || '';
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
    modalClose.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    modalImg.src = '';
  }

  modalClose && modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

});
