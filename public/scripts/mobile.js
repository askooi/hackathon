const mobileMenuBtnElement = document.getElementById("mobile-menu-btn"),
  mobileMenuElement = document.getElementById("mobile-menu");
function toggleMobileMenu() {
  mobileMenuElement.classList.toggle("open");
}
mobileMenuBtnElement.addEventListener("click", toggleMobileMenu);
