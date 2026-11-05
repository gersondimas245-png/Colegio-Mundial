'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
    });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-placeholder');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    galleryItems.forEach((item) => {
      item.hidden = filter !== 'all' && item.dataset.category !== filter;
    });
  });
});
filterButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.classList.contains('active'))));

const modal = document.getElementById('gallery-modal');
const modalTitle = document.getElementById('modal-title');
const closeModal = () => {
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove('modal-open');
};
galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    if (!modal) return;
    modalTitle.textContent = item.dataset.title || 'Fotografia oficial a inserir';
    modal.hidden = false;
    document.body.classList.add('modal-open');
    modal.querySelector('.modal-close').focus();
  });
});
if (modal) {
  modal.querySelectorAll('[data-close], .modal-close, .modal-ok').forEach((element) => element.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });
}

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
if (form && status) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = 'Verifique os campos obrigatórios e introduza um endereço de email válido.';
      status.className = 'form-status error';
      return;
    }
    status.textContent = 'Os campos estão válidos. O formulário não foi enviado nem guardado: contacte a escola pelo telefone publicado para transmitir a sua mensagem.';
    status.className = 'form-status success';
  });
}

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}
