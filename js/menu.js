document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".menu-btn");
  const lista = document.querySelector(".menu-list");

  btn.addEventListener("click", () => {
    lista.classList.toggle("menu-open");
  });
});