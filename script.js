"use strict";
document.documentElement.classList.add("js");
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#navigation");
function closeMenu() {
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
}
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
});
nav
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    toggle.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    toggle.focus();
  }
});
const legal = document.querySelector("#legal-dialog");
document
  .querySelector("[data-open-legal]")
  .addEventListener("click", () => legal.showModal());
document
  .querySelector("[data-close-legal]")
  .addEventListener("click", () => legal.close());
legal.addEventListener("click", (event) => {
  if (event.target === legal) {
    const box = legal.getBoundingClientRect();
    if (
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom
    )
      legal.close();
  }
});
document.querySelector("#year").textContent = new Date().getFullYear();
