import projects from "../data/github-projects.json";
import { profile } from "../data/profile.js";

const languages = [...new Set(projects.map((p) => p.language).filter(Boolean))].sort();
const totalStars = projects.reduce((s, p) => s + p.stars, 0);
const totalForks = projects.reduce((s, p) => s + p.forks, 0);
const year = new Date().getFullYear();
const tick = (words) => words.map((w) => `<span>${w}</span><i>✳</i>`).join("").repeat(4);
const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

function projectRow(p, i) {
  const title = escapeHTML(p.title || p.name);
  const name = escapeHTML(p.name);
  const summary = escapeHTML(p.summary);
  const language = escapeHTML(p.language);
  const searchText = escapeHTML(`${p.name} ${p.title || p.name} ${p.summary} ${p.language} ${(p.topics || []).join(" ")}`.toLowerCase());
  const initial = [...title.trim()][0]?.toUpperCase() || "✳";
  const tags = [p.language, ...(p.topics || [])].filter(Boolean).slice(0, 2).map(escapeHTML);
  return `
    <article class="project-card reveal" data-name="${searchText}" data-language="${language}" data-updated="${escapeHTML(p.updated || "")}" data-stars="${Number(p.stars) || 0}">
      <span class="row__n">${String(i + 1).padStart(2, "0")}</span>
      <div class="project-avatar" aria-hidden="true" style="--avatar-hue:${(i * 47 + 12) % 360}"><span>${initial}</span><img src="${profile.avatarUrl}" alt="" loading="lazy" /></div>
      <div class="row__main"><h3>${title}</h3><p>${summary}</p></div>
      <div class="project-tags">${tags.map((t) => `<span>${t}</span>`).join("")}</div>
      <span class="row__m"><span>★ ${p.stars} · ↗ ${p.forks}</span><small>обновлён ${p.updated || "—"}</small></span>
      <span class="row__go" aria-hidden="true">↗</span>
      <a class="project-hit" href="${escapeHTML(p.url)}" target="_blank" rel="noreferrer" aria-label="Открыть проект ${name} на GitHub">открыть</a>
    </article>`;
}

export function renderSite() {
  return `
    <div class="progress" aria-hidden="true"></div>
    <header class="site-header">
      <a class="brand" href="#top" aria-label="qrrrv — наверх"><span class="brand-mark">q</span><span>qrrrv</span></a>
      <nav aria-label="Основная навигация"><a href="#about">обо мне</a><a href="#projects">проекты</a><a href="#activity">активность</a><a class="nav-cta" href="${profile.profileUrl}" target="_blank" rel="noreferrer">github ↗</a></nav>
    </header>

    <main id="top">
      <section class="hero" aria-labelledby="hero-title"><div class="site-shell">
        <div class="hero__topline"><span>QYR / GITHUB INDEX</span><span>01—25 / ${year}</span></div>
        <h1 id="hero-title" aria-label="qrrrv">${[..."QRRRV"].map((c, i) => `<span class="l l--${i}" style="--i:${i}" aria-hidden="true">${c}</span>`).join("")}</h1>
        <div class="hero__row">
          <div>
            <p class="hero__lead">${profile.bio}. Публичная полка проектов — приложения, модули, сайты и эксперименты в одном месте.</p>
            <div class="hero__footer"><a class="pill-button" href="#projects">Смотреть проекты <span>↓</span></a><span class="hero__hint">${projects.length} repos / ${totalStars} stars</span></div>
          </div>
          <div class="hero__card">
            <div class="hero__stamp" aria-hidden="true"><svg viewBox="0 0 120 120"><defs><path id="ring" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"/></defs><text><textPath href="#ring" textLength="284" lengthAdjust="spacing">OPEN CODE ✳ NO NOISE ✳ OPEN CODE ✳ NO NOISE ✳</textPath></text></svg><b>✳</b></div>
            <img src="${profile.avatarUrl}" alt="" />
            <strong>${profile.displayName}</strong><small>@${profile.username}</small>
            <span class="hero__card-tag">● builder / tinkerer</span>
          </div>
        </div>
      </div></section>

      <div class="tickers" aria-hidden="true">
        <div class="ticker"><div class="ticker__track">${tick(["GITHUB", "CODE", "MODULES", "ANDROID", "PYTHON"])}</div></div>
        <div class="ticker ticker--dark"><div class="ticker__track">${tick(["OPEN SOURCE", "NO NOISE", "MADE IN PUBLIC", "ATTITUDE"])}</div></div>
      </div>

      <section class="band band--light" id="about" aria-labelledby="about-title"><div class="site-shell">
        <div class="about">
          <div><span class="section-label">02 / 08</span><h2 class="big" id="about-title">Грубый<br><span class="hl">снаружи.</span><br>Живой<br><span class="ol">внутри.</span></h2></div>
          <p class="about__text">${profile.bio}. Здесь не витрина ради витрины: каждая строка ведёт прямо в репозиторий, а описание собрано из его README и GitHub-метаданных.</p>
        </div>
        <div class="stats" aria-label="Статистика профиля"><div><strong>${projects.length}</strong><span>public repos</span></div><div><strong>${languages.length}</strong><span>languages</span></div><div><strong>${totalStars}</strong><span>stars</span></div><div><strong>${totalForks}</strong><span>forks</span></div></div>
      </div></section>

      <section class="band band--dark" id="projects" aria-labelledby="projects-title"><div class="site-shell">
        <span class="section-label">03 / 08</span>
        <h2 class="big" id="projects-title">ВСЕ<br><span class="ol ol--pink">ПРОЕКТЫ</span></h2>
        <div class="project-tools"><label class="search-box"><span>⌕</span><input id="project-search" type="search" placeholder="найти проект..." aria-label="Найти проект" /></label><div class="filter-list" role="group" aria-label="Фильтр по языку"><button class="filter-button is-active" type="button" data-filter="all">все</button>${languages.map((l) => `<button class="filter-button" type="button" data-filter="${l}">${l}</button>`).join("")}</div><div class="project-actions"><label class="sort-box">сортировка <select id="project-sort" aria-label="Сортировать проекты"><option value="recent">свежие</option><option value="stars">по звёздам</option><option value="name">по имени</option></select></label><button class="surprise-button" id="surprise-project" type="button">удиви меня <span>✳</span></button></div></div>
        <div class="projects-grid" id="projects-grid">${projects.map(projectRow).join("")}</div>
        <p class="empty-state" id="empty-state" hidden>Ничего не найдено. Попробуй другое слово.</p>
      </div></section>

      <section class="band band--light" id="activity" aria-labelledby="activity-title"><div class="site-shell">
        <span class="section-label">04 / 08 · <i class="live"></i>live</span>
        <h2 class="big" id="activity-title">ЖИВАЯ<br><span class="hl">АКТИВНОСТЬ</span></h2>
        <div class="activity">
          <div><div class="bars" id="activity-bars" aria-label="Активность за 14 дней"></div><p class="activity__sum" id="activity-sum"></p></div>
          <ol class="feed" id="activity-feed" aria-live="polite"><li class="feed__note">загружаю события с GitHub…</li></ol>
        </div>
      </div></section>

      <section class="band band--violet" aria-labelledby="manifesto-title"><div class="site-shell manifesto">
        <span class="section-label">05 / 08 · manifesto</span>
        <h2 class="big" id="manifesto-title">Не делаю<br><span class="hl">вид, что знаю</span><br>всё.</h2>
        <p>Проекты разные — от Android-клиентов и Telegram-модулей до сайтов и утилит. Общий знаменатель один: любопытство и желание проверить идею кодом.</p>
        <div class="manifesto__glyph" aria-hidden="true">✳</div>
      </div></section>

      <section class="band band--pink" aria-labelledby="contact-title"><div class="site-shell contact">
        <span class="section-label">06 / 08</span>
        <h2 class="big" id="contact-title">ОТКРОЙ<br><span class="bk">GITHUB.</span></h2>
        <p>Код открыт. Истории проектов — тоже.</p>
        <a class="pill-button pill-button--dark" href="${profile.profileUrl}" target="_blank" rel="noreferrer">перейти в профиль <span>↗</span></a>
        <a class="contact__arrow" href="${profile.profileUrl}" target="_blank" rel="noreferrer" aria-hidden="true" tabindex="-1">↗</a>
        <footer><span>qrrrv / github portfolio</span><a href="#top">наверх ↑</a><span>made in public</span></footer>
      </div></section>
    </main>`;
}

export { projects };
