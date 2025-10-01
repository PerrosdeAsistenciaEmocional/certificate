
const hamb = document.querySelector('#hamb');
const menu = document.querySelector('#menu');
if(hamb){
  hamb.addEventListener('click', ()=> menu.classList.toggle('open'));
}

const disabledForms = document.querySelectorAll('[data-disabled-form]');
disabledForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('💡 Tus datos fueron enviados exitosamente ✅. \n Recibirás en los próximos días un correo para verificar la información y poder realizar el pago 💳.');
    form.reset(); // 👈 reinicia el formulario
  });
});


// Utility to stamp current year in footers
const yearSpan = document.querySelector('#year');
if(yearSpan){ yearSpan.textContent = new Date().getFullYear(); }

const slides = document.querySelector('.slides');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Carrusel infinito con clones y animación suave
(() => {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const slides = carousel.querySelector('.slides');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const imgs = Array.from(slides.children);
  if (imgs.length < 2) return;

  // 1) Clonar extremos
  const firstClone = imgs[0].cloneNode(true);
  const lastClone  = imgs[imgs.length - 1].cloneNode(true);
  slides.appendChild(firstClone);
  slides.insertBefore(lastClone, imgs[0]);

  // 2) Estado inicial (arrancamos “en la 1 real”, índice 1)
  let index = 1;
  const total = slides.children.length; // incluye clones
  const goTo = (i, animate = true) => {
    slides.style.transition = animate ? "transform 0.6s ease-in-out" : "none";
    slides.style.transform = `translateX(-${i * 100}%)`;
  };
  // aseguramos ancho 100% por slide
  Array.from(slides.children).forEach(el => (el.style.flex = '0 0 100%'));
  goTo(index, false);

  // 3) Auto-slide + controles
  const next = () => goTo(++index, true);
  const prev = () => goTo(--index, true);

  let timer = setInterval(next, 3500);
  const resetTimer = () => { clearInterval(timer); timer = setInterval(next, 3500); };

  nextBtn?.addEventListener('click', () => { next(); resetTimer(); });
  prevBtn?.addEventListener('click', () => { prev(); resetTimer(); });

  // 4) Al terminar la transición, si estamos en un clon, “saltamos” sin animación
  slides.addEventListener('transitionend', () => {
    // Si estamos en el clon del final (después de la última real)
    if (index === total - 1) {
      index = 1;          // primera real
      goTo(index, false); // salto sin animación
    }
    // Si estamos en el clon del inicio (antes de la primera real)
    if (index === 0) {
      index = total - 2;  // última real
      goTo(index, false); // salto sin animación
    }
  });
})();
