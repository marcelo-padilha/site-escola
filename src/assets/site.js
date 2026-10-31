(() => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-site-nav]");

  if (!toggle || !navigation) return;

  const setMenuState = (isOpen) => {
    toggle.setAttribute("aria-expanded", String(isOpen));
    navigation.classList.toggle("is-open", isOpen);
    const icon = toggle.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-bars", !isOpen);
      icon.classList.toggle("fa-times", isOpen);
    }
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuState(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuState(false);
  });
})();
