'use strict';

/* ==========================================================================
   Colégio Mundial de Tete — interações (JavaScript vanilla, sem dependências)
   ========================================================================== */

(() => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PHOTO_DIR = 'assets/images/photos/';
  const CM = window.CM_PHOTOS || { slots: {}, gallery: [] };
  const WA = 'https://wa.me/258842190097';

  /* ---------- Ano no rodapé ---------- */
  const ano = $('#ano');
  if (ano) ano.textContent = String(new Date().getFullYear());

  /* ---------- Menu móvel ---------- */
  const topo = $('#topo');
  const menuBtn = $('.menu-btn');
  const nav = $('#navegacao');

  function setMenu(open) {
    topo.classList.toggle('nav-open', open);
    document.body.classList.toggle('trava', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.firstElementChild.textContent = open ? 'Fechar' : 'Menu';
    if (open) {
      const first = $('a', nav);
      window.setTimeout(() => first && first.focus({ preventScroll: true }), 350);
    }
  }
  menuBtn.addEventListener('click', () => setMenu(!topo.classList.contains('nav-open')));
  $$('a', nav).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && topo.classList.contains('nav-open')) { setMenu(false); menuBtn.focus(); }
  });
  window.matchMedia('(min-width: 1121px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  /* ---------- Scroll: cabeçalho, progresso e parallax ---------- */
  const bar = $('#progress-bar');
  const heroEl = $('.hero');
  const heroMedia = $('[data-parallax]');
  let ticking = false;

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    topo.classList.toggle('is-stuck', y > 40);
    bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
    if (heroMedia && !reduceMotion && y < heroEl.offsetHeight) {
      heroMedia.style.transform = 'translate3d(0,' + (y * 0.16).toFixed(1) + 'px,0)';
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- Indicador da secção atual ---------- */
  const navLinks = $$('a[href^="#"]', nav);
  if ('IntersectionObserver' in window) {
    const secObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const id = en.target.id;
        navLinks.forEach((a) => {
          if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('[data-section]').forEach((s) => secObs.observe(s));
  }

  /* ---------- Revelações ao entrar no ecrã ---------- */
  const revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const rev = new IntersectionObserver((entries, obs) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach((el) => rev.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }
  requestAnimationFrame(() => requestAnimationFrame(() => heroEl.classList.add('is-in')));

  /* ---------- Fotografias (carregamento preguiçoso e com fallback) ---------- */
  function loadSlot(fig) {
    if (fig.dataset.loaded) return;
    fig.dataset.loaded = '1';
    const file = CM.slots && CM.slots[fig.dataset.slot];
    if (!file) return;
    const img = new Image();
    img.className = 'photo-img';
    img.decoding = 'async';
    img.alt = fig.dataset.alt || '';
    img.addEventListener('load', () => { fig.insertBefore(img, fig.firstChild); fig.classList.add('has-img'); });
    img.addEventListener('error', () => console.warn('Fotografia não encontrada:', PHOTO_DIR + file));
    img.src = PHOTO_DIR + file;
  }
  const slots = $$('[data-slot]');
  if ('IntersectionObserver' in window) {
    const photoObs = new IntersectionObserver((entries, obs) => {
      entries.forEach((en) => { if (en.isIntersecting) { loadSlot(en.target); obs.unobserve(en.target); } });
    }, { rootMargin: '900px 0px' });
    slots.forEach((s) => photoObs.observe(s));
  } else {
    slots.forEach(loadSlot);
  }

  /* ---------- Ensino: a régua das classes ---------- */
  const regua = $('#regua');
  const ticks = $$('.tick', regua);
  const numEl = $('#num');
  const elEtapa = $('#cls-etapa');
  const elTitulo = $('#cls-titulo');
  const elTexto = $('#cls-texto');
  const elFalta = $('#cls-falta');
  const elWa = $('#cls-wa');
  let atual = 1;

  function descricao(n) {
    if (n === 1) return ['Ponto de partida', 'Início do percurso escolar no Colégio Mundial.'];
    if (n === 12) return ['Última classe do percurso', 'A classe que fecha o percurso da 1.ª à 12.ª classe no colégio.'];
    return ['Percurso em curso', 'A ' + n + '.ª classe faz parte do percurso contínuo que o colégio oferece, da 1.ª à 12.ª classe, com o currículo do Sistema Nacional de Educação.'];
  }
  function selecionarClasse(n, foco, forcar) {
    n = Math.max(1, Math.min(12, n));
    if (!forcar && n === atual) return;
    atual = n;
    regua.style.setProperty('--i', String(n - 1));
    ticks.forEach((t) => t.setAttribute('aria-pressed', String(Number(t.dataset.n) === n)));
    const [etapa, texto] = descricao(n);
    numEl.textContent = String(n);
    numEl.classList.remove('troca'); void numEl.offsetWidth; numEl.classList.add('troca');
    elEtapa.textContent = etapa;
    elTitulo.textContent = n + '.ª classe';
    elTexto.textContent = texto;
    const resta = 12 - n;
    elFalta.textContent = resta === 0 ? 'Depois desta classe, o percurso está concluído.' : (resta === 1 ? 'Falta 1 classe' : 'Faltam ' + resta + ' classes') + ' para concluir o percurso.';
    elWa.href = WA + '?text=' + encodeURIComponent('Olá! Gostaria de informações sobre a ' + n + '.ª classe no Colégio Mundial de Tete.');
    elWa.textContent = 'Perguntar sobre a ' + n + '.ª classe';
    if (foco) ticks[n - 1].focus();
  }
  ticks.forEach((t) => {
    t.addEventListener('click', () => selecionarClasse(Number(t.dataset.n)));
    t.addEventListener('keydown', (e) => {
      const n = Number(t.dataset.n);
      let alvo = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') alvo = n + 1;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') alvo = n - 1;
      else if (e.key === 'Home') alvo = 1;
      else if (e.key === 'End') alvo = 12;
      if (alvo !== null) { e.preventDefault(); selecionarClasse(alvo, true); }
    });
  });
  // arrastar o cursor
  let arrastando = false;
  function classeNaPosicao(x) {
    const r = regua.getBoundingClientRect();
    return Math.floor(((x - r.left) / r.width) * 12) + 1;
  }
  regua.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    arrastando = true;
    selecionarClasse(classeNaPosicao(e.clientX));
  });
  window.addEventListener('pointermove', (e) => { if (arrastando) selecionarClasse(classeNaPosicao(e.clientX)); });
  window.addEventListener('pointerup', () => { arrastando = false; });
  window.addEventListener('pointercancel', () => { arrastando = false; });
  selecionarClasse(1, false, true);

  /* ---------- Vida escolar: pista horizontal ---------- */
  const pista = $('#vida-pista');
  const passo = () => {
    const p = $('.painel', pista);
    return p ? p.getBoundingClientRect().width + 20 : 320;
  };
  $('#vida-prev').addEventListener('click', () => pista.scrollBy({ left: -passo(), behavior: reduceMotion ? 'auto' : 'smooth' }));
  $('#vida-next').addEventListener('click', () => pista.scrollBy({ left: passo(), behavior: reduceMotion ? 'auto' : 'smooth' }));
  let pX = 0, pS = 0, pDown = false;
  pista.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    pDown = true; pX = e.clientX; pS = pista.scrollLeft; pista.classList.add('arrasta');
  });
  window.addEventListener('pointermove', (e) => { if (pDown) pista.scrollLeft = pS - (e.clientX - pX); });
  window.addEventListener('pointerup', () => {
    if (!pDown) return;
    pDown = false; pista.classList.remove('arrasta');
  });

  /* ---------- Eventos: troca de fotografia ---------- */
  const evBtns = $$('.evento');
  const evFotos = $$('.ev-foto');
  function ativarEvento(btn) {
    evBtns.forEach((b) => { const on = b === btn; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on)); });
    evFotos.forEach((f) => f.classList.toggle('is-on', f.dataset.slot === btn.dataset.ev));
  }
  evBtns.forEach((b) => {
    b.addEventListener('click', () => ativarEvento(b));
    b.addEventListener('mouseenter', () => ativarEvento(b));
    b.addEventListener('focus', () => ativarEvento(b));
  });

  /* ---------- Galeria + lightbox ---------- */
  const mosaico = $('#mosaico');
  const filtrosEl = $('#filtros');
  const notaG = $('#galeria-nota');
  let filtroAtual = 'Todas';

  (CM.gallery || []).forEach((it, i) => {
    const src = it.src || (PHOTO_DIR + it.file);
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'g-item' + (it.size ? ' g-' + it.size : '');
    b.dataset.cat = it.cat || 'Outras';
    b.dataset.full = src;
    b.dataset.alt = it.alt || '';
    b.style.animationDelay = Math.min(i * 60, 600) + 'ms';
    b.setAttribute('aria-label', 'Ampliar: ' + (it.alt || 'fotografia da galeria'));
    const img = new Image();
    img.loading = 'lazy'; img.decoding = 'async'; img.alt = '';
    img.addEventListener('error', () => { console.warn('Fotografia não encontrada:', src); b.remove(); construirFiltros(); });
    img.src = src;
    b.appendChild(img);
    b.addEventListener('click', () => abrirLb(b));
    mosaico.appendChild(b);
  });

  function itensVisiveis() { return $$('.g-item', mosaico).filter((b) => !b.hidden); }
  function construirFiltros() {
    const todos = $$('.g-item', mosaico);
    const cats = [];
    todos.forEach((b) => { if (!cats.includes(b.dataset.cat)) cats.push(b.dataset.cat); });
    if (filtroAtual !== 'Todas' && !cats.includes(filtroAtual)) filtroAtual = 'Todas';
    filtrosEl.innerHTML = '';
    filtrosEl.hidden = cats.length < 2;
    ['Todas'].concat(cats).forEach((c) => {
      const n = c === 'Todas' ? todos.length : todos.filter((b) => b.dataset.cat === c).length;
      const btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'filtro';
      btn.setAttribute('aria-pressed', String(c === filtroAtual));
      btn.innerHTML = c + '<small>' + n + '</small>';
      btn.addEventListener('click', () => { filtroAtual = c; aplicarFiltro(); });
      filtrosEl.appendChild(btn);
    });
    aplicarFiltro(true);
  }
  function aplicarFiltro(semRebuild) {
    $$('.g-item', mosaico).forEach((b) => { b.hidden = filtroAtual !== 'Todas' && b.dataset.cat !== filtroAtual; });
    $$('.filtro', filtrosEl).forEach((f, idx) => {
      const nome = idx === 0 ? 'Todas' : f.firstChild.textContent;
      f.setAttribute('aria-pressed', String(nome === filtroAtual));
    });
    const total = $$('.g-item', mosaico).length;
    notaG.textContent = total === 0
      ? 'As fotografias serão publicadas aqui assim que o colégio as enviar.'
      : 'A galeria cresce à medida que o colégio envia fotografias autorizadas. Toque numa imagem para ampliar.';
  }
  construirFiltros();

  const lb = $('#lb');
  const lbImg = $('#lb-img');
  const lbLeg = $('#lb-leg');
  const lbCont = $('#lb-cont');
  const lbAnt = $('#lb-ant');
  const lbSeg = $('#lb-seg');
  const lbFechar = $('#lb-fechar');
  let lista = [], pos = 0, abridor = null;

  function mostrar(i) {
    pos = (i + lista.length) % lista.length;
    const b = lista[pos];
    lbImg.src = b.dataset.full;
    lbImg.alt = b.dataset.alt;
    lbLeg.textContent = (b.dataset.alt ? b.dataset.alt + ' · ' : '') + b.dataset.cat;
    lbCont.textContent = (pos + 1) + ' / ' + lista.length;
    const so1 = lista.length < 2;
    lbAnt.hidden = so1; lbSeg.hidden = so1;
    if (lista.length > 1) {
      [lista[(pos + 1) % lista.length], lista[(pos - 1 + lista.length) % lista.length]].forEach((v) => { const p = new Image(); p.src = v.dataset.full; });
    }
  }
  function abrirLb(b) {
    lista = itensVisiveis();
    abridor = b;
    lb.hidden = false;
    document.body.classList.add('trava');
    mostrar(lista.indexOf(b));
    lbFechar.focus();
  }
  function fecharLb() {
    lb.hidden = true;
    document.body.classList.remove('trava');
    lbImg.removeAttribute('src');
    if (abridor) abridor.focus();
  }
  lbFechar.addEventListener('click', fecharLb);
  lbAnt.addEventListener('click', () => mostrar(pos - 1));
  lbSeg.addEventListener('click', () => mostrar(pos + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) fecharLb(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') fecharLb();
    else if (e.key === 'ArrowRight') mostrar(pos + 1);
    else if (e.key === 'ArrowLeft') mostrar(pos - 1);
    else if (e.key === 'Tab') {
      const foc = [lbFechar, lbAnt, lbSeg].filter((x) => !x.hidden);
      const i = foc.indexOf(document.activeElement);
      e.preventDefault();
      foc[(i + (e.shiftKey ? -1 : 1) + foc.length) % foc.length].focus();
    }
  });
  let tx = 0;
  lb.addEventListener('touchstart', (e) => { tx = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) mostrar(pos + (dx < 0 ? 1 : -1));
  }, { passive: true });

  /* ---------- Formulário → WhatsApp ---------- */
  const form = $('#form');
  const estado = $('#form-estado');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    $$('input, select, textarea', form).forEach((c) => {
      const valido = c.checkValidity() && c.value.trim() !== '';
      c.setAttribute('aria-invalid', String(!valido));
      if (!valido) ok = false;
    });
    estado.className = 'form-estado';
    if (!ok) {
      estado.classList.add('erro');
      estado.textContent = 'Preencha o nome, escolha um assunto e escreva uma mensagem com pelo menos 10 caracteres.';
      return;
    }
    const d = new FormData(form);
    const texto = 'Olá! Chamo-me ' + d.get('nome').trim() + '.\nAssunto: ' + d.get('assunto') + '\n\n' + d.get('mensagem').trim();
    const url = WA + '?text=' + encodeURIComponent(texto);
    estado.innerHTML = 'A abrir o WhatsApp… Se não abrir, <a href="' + url + '" target="_blank" rel="noopener" style="text-decoration:underline">toque aqui</a>.';
    window.open(url, '_blank', 'noopener');
  });

  /* ---------- Mapa (só carrega a pedido) ---------- */
  const mapaBtn = $('#mapa-btn');
  mapaBtn.addEventListener('click', () => {
    const mapa = $('#mapa');
    const f = document.createElement('iframe');
    f.title = 'Mapa: Canangola, Tete, Moçambique';
    f.loading = 'lazy';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    f.src = 'https://www.google.com/maps?q=Unnamed+Road+Canangola+Tete+Mozambique&output=embed';
    mapa.appendChild(f);
    $('.mapa-capa', mapa).remove();
  });
})();
