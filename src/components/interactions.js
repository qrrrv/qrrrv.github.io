export function initInteractions() {
  const cards = [...document.querySelectorAll(".project-card")];
  const buttons = [...document.querySelectorAll(".filter-button")];
  const search = document.querySelector("#project-search");
  const sort = document.querySelector("#project-sort");
  const surprise = document.querySelector("#surprise-project");
  const grid = document.querySelector("#projects-grid");
  const emptyState = document.querySelector("#empty-state");
  const originalOrder = new Map(cards.map((card, index) => [card, index]));
  let activeFilter = "all";

  const apply = () => {
    const query = search?.value.trim().toLowerCase() || "";
    let visible = 0;
    cards.forEach((card) => {
      const show = (activeFilter === "all" || card.dataset.language === activeFilter) && (!query || card.dataset.name.includes(query));
      card.hidden = !show;
      if (show) {
        visible += 1;
        card.querySelector(".row__n").textContent = String(visible).padStart(2, "0");
      }
    });
    if (emptyState) emptyState.hidden = visible !== 0;
  };

  buttons.forEach((button) => button.addEventListener("click", () => {
    buttons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    activeFilter = button.dataset.filter;
    apply();
  }));
  search?.addEventListener("input", apply);

  sort?.addEventListener("change", () => {
    const mode = sort.value;
    const sorted = [...cards].sort((a, b) => {
      if (mode === "stars") return Number(b.dataset.stars) - Number(a.dataset.stars) || originalOrder.get(a) - originalOrder.get(b);
      if (mode === "name") return a.querySelector("h3").textContent.localeCompare(b.querySelector("h3").textContent, "ru");
      return b.dataset.updated.localeCompare(a.dataset.updated) || originalOrder.get(a) - originalOrder.get(b);
    });
    sorted.forEach((card) => grid.append(card));
    apply();
  });

  surprise?.addEventListener("click", () => {
    const visibleCards = cards.filter((card) => !card.hidden);
    if (!visibleCards.length) {
      search?.focus();
      return;
    }
    const pick = visibleCards[Math.floor(Math.random() * visibleCards.length)];
    cards.forEach((card) => card.classList.remove("is-picked"));
    pick.classList.add("is-picked");
    pick.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => pick.classList.remove("is-picked"), 1100);
  });

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
