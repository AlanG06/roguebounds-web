// Roguebounds — web del juego.
//
// ===== AJUSTES: cambia aquí tus enlaces =====
// Deja una dirección vacía ("") y su botón aparece como «Próximamente».
const AJUSTES = {
  // Página de donaciones (Ko-fi, PayPal, Patreon...).
  donar: "",
  // Dónde se pide o se descarga la alpha (formulario, Discord, enlace de descarga...).
  alpha: "",
  // Texto del paso 1 de la alpha cuando hay enlace.
  textoAcceso: "Pide tu acceso con el botón. Las plazas de la alpha son limitadas.",
};
// ============================================

// Botones que dependen de un enlace: si no lo hay, se apagan y lo dicen.
function prepararEnlace(id, url, textoSinEnlace, notaId) {
  const boton = document.getElementById(id);
  if (!boton) return;
  if (url) {
    boton.href = url;
    return;
  }
  boton.removeAttribute("href");
  boton.classList.add("desactivado");
  boton.textContent = textoSinEnlace;
  if (notaId) {
    const nota = document.getElementById(notaId);
    if (nota) nota.textContent = "Las donaciones se abrirán muy pronto.";
  }
}

prepararEnlace("boton-donar", AJUSTES.donar, "Próximamente", "nota-donar");
prepararEnlace("boton-alpha", AJUSTES.alpha, "Próximamente");
if (AJUSTES.alpha) document.getElementById("texto-acceso").textContent = AJUSTES.textoAcceso;

document.getElementById("anio").textContent = new Date().getFullYear();

// Menú en pantallas estrechas.
const menu = document.querySelector(".barra-menu");
const enlaces = document.querySelector(".barra-enlaces");
menu.addEventListener("click", () => {
  const abierto = enlaces.classList.toggle("abierto");
  menu.setAttribute("aria-expanded", abierto);
});
enlaces.addEventListener("click", (evento) => {
  if (evento.target.tagName === "A") {
    enlaces.classList.remove("abierto");
    menu.setAttribute("aria-expanded", "false");
  }
});

// Los bloques aparecen deslizándose al llegar a ellos.
const aparecen = document.querySelectorAll(".rasgo, .mundo, .lore-bloque, .foto, .paso, .tabla-envoltorio, .apoyar-caja");
if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add("visible");
      observador.unobserve(entrada.target);
    });
  }, { threshold: 0.15 });
  aparecen.forEach((elemento, i) => {
    elemento.classList.add("aparece");
    elemento.style.transitionDelay = (i % 4) * 70 + "ms";
    observador.observe(elemento);
  });
}

// Visor de la galería: se abre al pulsar una foto y se pasa con las flechas.
const fotos = Array.from(document.querySelectorAll(".foto"));
const visor = document.querySelector(".visor");
const visorImagen = visor.querySelector("img");
const visorTexto = visor.querySelector("figcaption");
let actual = 0;

function mostrar(indice) {
  actual = (indice + fotos.length) % fotos.length;
  const foto = fotos[actual];
  visorImagen.src = foto.querySelector("img").src;
  visorImagen.alt = foto.querySelector("img").alt;
  visorTexto.textContent = foto.dataset.titulo || "";
}

function abrir(indice) {
  mostrar(indice);
  visor.hidden = false;
  document.body.style.overflow = "hidden";
}

function cerrar() {
  visor.hidden = true;
  document.body.style.overflow = "";
}

fotos.forEach((foto, i) => foto.addEventListener("click", () => abrir(i)));
visor.querySelector(".visor-cerrar").addEventListener("click", cerrar);
visor.querySelector(".visor-anterior").addEventListener("click", () => mostrar(actual - 1));
visor.querySelector(".visor-siguiente").addEventListener("click", () => mostrar(actual + 1));
visor.addEventListener("click", (evento) => { if (evento.target === visor) cerrar(); });
document.addEventListener("keydown", (evento) => {
  if (visor.hidden) return;
  if (evento.key === "Escape") cerrar();
  if (evento.key === "ArrowLeft") mostrar(actual - 1);
  if (evento.key === "ArrowRight") mostrar(actual + 1);
});
