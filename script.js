// script.js — Enhanced Interactivity & Animation ✨
document.addEventListener('DOMContentLoaded', () => {
  // NAV TOGGLE (mobile)
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  navToggle && navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  // CURRENT YEAR
  const curYear = document.getElementById('curYear');
  if (curYear) curYear.textContent = new Date().getFullYear();

  // SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        siteNav.classList.remove('open');
      }
    });
  });

  // CONTACT FORM VALIDATION
  const form = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-msg');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();

      if (name.length < 2) return showMessage('⚠️ Please enter your full name.');
      if (!validateEmail(email)) return showMessage('📧 Please enter a valid email address.');
      if (message.length < 10) return showMessage('📝 Please enter a slightly longer message.');

      showMessage('⏳ Sending message...');
      setTimeout(() => {
        form.reset();
        showMessage('✅ Message sent successfully! We’ll get back soon.');
      }, 1000);
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showMessage(msg) {
    if (!formMsg) return;
    formMsg.textContent = msg;
    formMsg.style.opacity = '1';
    formMsg.style.transition = 'opacity 0.5s ease';
  }

  // GALLERY MODAL
  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', () => openModal(img));
  });

  function openModal(img) {
    modal.style.display = 'flex';
    modalImg.src = img.src;
    modalCaption.textContent = img.alt || '';
    modal.classList.add('fade-in');
  }

  modalClose.addEventListener('click', () => {
    modal.classList.remove('fade-in');
    modal.style.display = 'none';
  });

  // SCROLL REVEAL EFFECT
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < triggerBottom) el.classList.add('visible');
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
});
