export function initInteractions() {
  const cards = [...document.querySelectorAll(".project-card")];
  const buttons = [...document.querySelectorAll(".filter-button")];
  const search = document.querySelector("#project-search");
  const emptyState = document.querySelector("#empty-state");
  let activeFilter = "all";

  const apply = () => {
    const query = search?.value.trim().toLowerCase() || "";
    let visible = 0;
    cards.forEach((card) => {
      const show = (activeFilter === "all" || card.dataset.language === activeFilter) && (!query || card.dataset.name.includes(query));
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (emptyState) emptyState.hidden = visible !== 0;
  };

  buttons.forEach((button) => button.addEventListener("click", () => {
    buttons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    activeFilter = button.dataset.filter;
    apply();
  }));
  search?.addEventListener("input", apply);

  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

  const progress = document.querySelector(".progress");
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress?.style.setProperty("--p", max > 0 ? scrollY / max : 0);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
