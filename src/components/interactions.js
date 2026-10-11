export function initInteractions() {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");
  const navLinks = document.querySelectorAll(".primary-nav a");

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navLinks.forEach((link) => link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }));

  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  revealItems.forEach((item) => observer.observe(item));

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
      card.style.setProperty("--tilt-x", `${y}deg`);
      card.style.setProperty("--tilt-y", `${x}deg`);
    });
    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });

  const heroArt = document.querySelector(".hero-art");
  window.addEventListener("scroll", () => {
    if (heroArt && window.scrollY < window.innerHeight) {
      heroArt.style.setProperty("--parallax", `${window.scrollY * 0.08}px`);
    }
  }, { passive: true });
}
