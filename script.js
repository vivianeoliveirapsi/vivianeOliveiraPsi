// ======================
// Smooth Scroll
// ======================
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      smoothScroll(id);
    }
  });
});

function showSection(sectionId) {
  const sections = document.querySelectorAll("main section");
  sections.forEach(section => section.classList.remove("active"));
  const target = document.getElementById(sectionId);
  if(target) target.classList.add("active");
}

function smoothScroll(id) {
  const target = document.getElementById(id);
  const header = document.getElementById("header");
  const headerHeight = header ? header.offsetHeight : 0;

  if (target) {
    const targetPosition = target.offsetTop;
    window.scrollTo({
      top: targetPosition - headerHeight,
      behavior: 'smooth'
    });
    showSection(id);
  }
}

// ======================
// Formulário com feedback
// ======================
const form = document.getElementById("form-contato");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      alert("Mensagem enviada com sucesso!");
      form.reset();
    } else {
      const result = await response.json();
      alert(result?.errors?.[0]?.message || "Erro ao enviar a mensagem.");
    }
  } catch (error) {
    alert("Erro ao enviar a mensagem. Verifique sua conexão.");
  }
});

// ======================
// Header muda ao rolar / topo
// ======================
const header = document.getElementById("header");

function updateHeaderColor() {
  if(window.scrollY === 0){
    header.classList.add("at-top");
    header.classList.remove("scrolled");
  } else {
    header.classList.remove("at-top");
    header.classList.add("scrolled");
  }
}

window.addEventListener("scroll", updateHeaderColor);
window.addEventListener("load", updateHeaderColor);

// ======================
// Animar seções e cards ao scroll
// ======================
const scrollElements = document.querySelectorAll('.scroll-animate');
const elementInView = (el, dividend=1.2) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};
const displayScrollElement = (element) => { element.classList.add('visible'); };
const handleScrollAnimation = () => { scrollElements.forEach(el => { if(elementInView(el)) displayScrollElement(el); }); };
window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

// ======================
// Ajustar rodapé sempre no final
// ======================
function ajustarRodape(){
  const footer = document.querySelector("footer");
  const main = document.querySelector("main");
  const totalHeight = main.offsetHeight + footer.offsetHeight + document.querySelector("header").offsetHeight;
  if(totalHeight < window.innerHeight){
    footer.style.position = "absolute";
    footer.style.bottom = "0";
    footer.style.width = "100%";
  } else { 
    footer.style.position = "static"; 
  }
}
window.addEventListener("load", ajustarRodape);
window.addEventListener("resize", ajustarRodape);

// ======================
// Hover suave em cards
// ======================
const cards = document.querySelectorAll('.servico-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', ()=>{
    card.style.transform = 'translateY(-5px) scale(1.02)';
    card.style.boxShadow = '0 12px 28px rgba(0,0,0,0.14)';
  });
  card.addEventListener('mouseleave', ()=>{
    card.style.transform = 'translateY(0) scale(1)';
    card.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)';
  });
});

// ======================
// Modais
// ======================
function abrirModal(id) {
  const modal = document.getElementById(id);
  if(modal) modal.style.display = 'block';
}

function fecharModal(id) {
  const modal = document.getElementById(id);
  if(modal) modal.style.display = 'none';
}

// Fechar modal ao clicar fora do conteúdo
window.addEventListener('click', function(e){
  const modais = document.querySelectorAll('.modal');
  modais.forEach(modal => {
    if(e.target === modal) modal.style.display = 'none';
  });
});
// Animação inicial dos botões
window.addEventListener('load', () => {
  const botoes = document.querySelectorAll('.botao');
  botoes.forEach((botao, index) => {
    setTimeout(() => {
      botao.classList.add('show');
    }, 200 * index); // entra um por vez com 0.2s de diferença
  });
});

