export function initInteractions() {
  const cards = [...document.querySelectorAll(".project-card")];
  const buttons = [...document.querySelectorAll(".filter-button")];
  const search = document.querySelector("#project-search");
  const emptyState = document.querySelector("#empty-state");
  let activeFilter = "all";

  const renderProjects = () => {
    const query = search?.value.trim().toLowerCase() || "";
    let visible = 0;
    cards.forEach((card) => {
      const matchesFilter = activeFilter === "all" || card.dataset.language === activeFilter;
      const matchesSearch = !query || card.dataset.name.includes(query);
      const show = matchesFilter && matchesSearch;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (emptyState) emptyState.hidden = visible !== 0;
  };

  buttons.forEach((button) => button.addEventListener("click", () => {
    buttons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    activeFilter = button.dataset.filter;
    renderProjects();
  }));
  search?.addEventListener("input", renderProjects);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--rotate-x", `${((event.clientY - rect.top) / rect.height - .5) * -4}deg`);
      card.style.setProperty("--rotate-y", `${((event.clientX - rect.left) / rect.width - .5) * 4}deg`);
    });
    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--rotate-x", "0deg");
      card.style.setProperty("--rotate-y", "0deg");
    });
  });
}
