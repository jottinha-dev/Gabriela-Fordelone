/* =====================================================================
   DRA. GABRIELA FORDELONE – SCRIPT
   Troque os dados de contato AQUI; os links do site se atualizam sozinhos.
   ===================================================================== */
const CONFIG = {
  // Só números: 55 (Brasil) + DDD + número
  whatsapp: '5513996909774',
  // Como o telefone aparece escrito no site
  telefoneExibicao: '(13) 99690-9774',
  instagram: 'https://www.instagram.com/dragabrielafordelone/',
  // Endereço usado no mapa e no botão "Como chegar"
  // (o texto do endereço exibido está no index.html, seção Localização)
  enderecoMapa: 'R. Carvalho de Mendonça, 238, Vila Belmiro, Santos - SP, 11070-101',
  googleAvaliacoes: 'https://www.google.com/maps/search/?api=1&query=Dra.+Gabriela+Fordelone+Santos',
  // Mensagens que já vêm escritas quando a pessoa abre o WhatsApp
  mensagens: {
    padrao:      'Olá, Dra. Gabriela! Gostaria de agendar uma consulta.',
    avaliacao:   'Olá! Quero agendar uma avaliação odontológica.',
    limpeza:     'Olá! Quero agendar uma limpeza dental.',
    clareamento: 'Olá! Quero saber sobre clareamento dental.',
    facetas:     'Olá! Quero saber sobre facetas ou lentes.',
    restauracao: 'Olá! Preciso de uma restauração.',
    duvida:      'Olá! Tenho uma dúvida sobre tratamento.'
  }
};

/* ---------- Links gerados a partir do CONFIG (não precisa mexer) ---------- */
document.querySelectorAll('[data-wa]').forEach(a => {
  const msg = CONFIG.mensagens[a.dataset.wa] || CONFIG.mensagens.padrao;
  a.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  a.target = '_blank'; a.rel = 'noopener';
});
document.querySelectorAll('[data-instagram]').forEach(a => {
  a.href = CONFIG.instagram; a.target = '_blank'; a.rel = 'noopener';
});
document.querySelectorAll('[data-tel]').forEach(a => {
  a.href = `tel:+${CONFIG.whatsapp}`;
  if (a.hasAttribute('data-tel-text')) a.textContent = CONFIG.telefoneExibicao;
});
document.querySelectorAll('[data-rota]').forEach(a => {
  a.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CONFIG.enderecoMapa)}`;
  a.target = '_blank'; a.rel = 'noopener';
});
document.querySelectorAll('[data-avaliacoes]').forEach(a => {
  a.href = CONFIG.googleAvaliacoes; a.target = '_blank'; a.rel = 'noopener';
});
const mapa = document.getElementById('mapa');
if (mapa) mapa.src = `https://www.google.com/maps?q=${encodeURIComponent(CONFIG.enderecoMapa)}&output=embed`;

/* ---------- Comportamento da página ---------- */
  // Menu mobile
  const body = document.body, burger = document.getElementById('burger');
  const mobCta = document.querySelector('.mob-cta');
  const setMobCta = () => { mobCta.style.display = window.innerWidth <= 860 ? 'inline-flex' : 'none'; };
  setMobCta(); window.addEventListener('resize', setMobCta);
  burger.addEventListener('click', () => {
    const open = body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('#menu a').forEach(a => a.addEventListener('click', () => {
    body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', false);
  }));

  // Header com borda ao rolar
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 10), {passive:true});

  // Animação de entrada
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.12}) : null;
  document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

  // Ano no rodapé
  document.getElementById('ano').textContent = new Date().getFullYear();
