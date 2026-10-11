import projects from "../data/github-projects.json";
import { profile } from "../data/profile.js";

const languages = [...new Set(projects.map((project) => project.language).filter(Boolean))].sort();
const totalStars = projects.reduce((sum, project) => sum + project.stars, 0);
const totalForks = projects.reduce((sum, project) => sum + project.forks, 0);

function projectCard(project, index) {
  const tags = [project.language, ...project.topics].filter(Boolean).slice(0, 3);
  return `
    <article class="project-card reveal" data-name="${project.name.toLowerCase()}" data-language="${project.language}">
      <div class="project-card__top">
        <span class="project-index">${String(index + 1).padStart(2, "0")}</span>
        <span class="project-status">${project.archived ? "архив" : "public"}</span>
      </div>
      <div class="project-card__body">
        <div class="project-symbol" aria-hidden="true">${project.name.slice(0, 1).toUpperCase()}</div>
        <h3>${project.title}</h3>
        <p>${project.summary}</p>
      </div>
      <div class="project-card__bottom">
        <div class="project-tags">${tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
        <div class="project-metrics"><span>★ ${project.stars}</span><span>↗ ${project.forks}</span></div>
      </div>
      <a class="project-hit" href="${project.url}" target="_blank" rel="noreferrer" aria-label="Открыть проект ${project.title} на GitHub">открыть проект ↗</a>
    </article>
  `;
}

export function renderSite() {
  return `
    <div class="site-shell">
      <div class="noise" aria-hidden="true"></div>
      <header class="site-header">
        <a class="brand" href="#top" aria-label="qrrrv — наверх"><span class="brand-mark">q</span><span>qrrrv</span></a>
        <nav aria-label="Основная навигация">
          <a href="#projects">проекты <sup>01</sup></a>
          <a href="#about">обо мне <sup>02</sup></a>
          <a href="${profile.profileUrl}" target="_blank" rel="noreferrer">github ↗</a>
        </nav>
        <span class="header-date">03 / 08<br><small>portfolio</small></span>
      </header>

      <main id="top">
        <section class="hero" aria-labelledby="hero-title">
          <div class="hero__backdrop" aria-hidden="true"><span></span><span></span><span></span></div>
          <div class="hero__glass">
            <div class="hero__topline"><span>QYR / GITHUB INDEX</span><span>01—25 / ${new Date().getFullYear()}</span></div>
            <div class="hero__profile"><img src="${profile.avatarUrl}" alt="" /><span>${profile.displayName}<br><small>@${profile.username}</small></span></div>
            <h1 id="hero-title">НЕО-<br><span>БРУТ</span></h1>
            <p class="hero__lead">Публичная полка проектов <strong>${profile.username}</strong>: приложения, модули, сайты и эксперименты, собранные в одном месте.</p>
            <div class="hero__footer"><a class="pill-button" href="#projects">Смотреть проекты <span>→</span></a><span class="hero__hint">scroll / drag / explore</span></div>
          </div>
          <div class="hero__stamp" aria-hidden="true">✳<br><small>CODE<br>WITH<br>ATTITUDE</small></div>
        </section>

        <section class="intro" id="about" aria-labelledby="about-title">
          <div class="section-label">02 / 08</div>
          <div class="intro__copy"><h2 id="about-title">Грубый<br><span>снаружи.</span><br>Живой<br>внутри.</h2></div>
          <div class="intro__text"><p>${profile.bio}. Здесь не витрина ради витрины: каждая карточка ведёт прямо в репозиторий, а описание собрано из его README и GitHub-метаданных.</p><div class="signature">— qrrrv<br><small>builder / tinkerer</small></div></div>
        </section>

        <section class="stats-strip" aria-label="Статистика профиля"><div><strong>${projects.length}</strong><span>public repos</span></div><div><strong>${languages.length}</strong><span>languages</span></div><div><strong>${totalStars}</strong><span>stars</span></div><div><strong>${totalForks}</strong><span>forks</span></div></section>

        <section class="projects" id="projects" aria-labelledby="projects-title">
          <div class="projects__heading"><div><div class="section-label">03 / 08</div><h2 id="projects-title">ВСЕ<br><span>ПРОЕКТЫ</span></h2></div><p>25 публичных репозиториев без форков. Листай, фильтруй, открывай код.</p></div>
          <div class="project-tools"><label class="search-box"><span>⌕</span><input id="project-search" type="search" placeholder="найти проект..." aria-label="Найти проект" /></label><div class="filter-list" role="group" aria-label="Фильтр по языку"><button class="filter-button is-active" type="button" data-filter="all">все</button>${languages.map((language) => `<button class="filter-button" type="button" data-filter="${language}">${language}</button>`).join("")}</div></div>
          <div class="projects-grid" id="projects-grid">${projects.map(projectCard).join("")}</div>
          <p class="empty-state" id="empty-state" hidden>Ничего не найдено. Попробуй другое слово.</p>
        </section>

        <section class="manifesto" aria-labelledby="manifesto-title"><div class="manifesto__side section-label">04 / 08<br><span>manifesto</span></div><div><h2 id="manifesto-title">Не делаю<br><span>вид, что знаю</span><br>всё.</h2><p>Проекты разные — от Android-клиентов и Telegram-модулей до сайтов и утилит. Общий знаменатель один: любопытство и желание проверить идею кодом.</p></div><div class="manifesto__glyph">✳</div></section>

        <section class="contact" aria-labelledby="contact-title"><div class="contact__glass"><div class="section-label">05 / 08</div><h2 id="contact-title">ОТКРОЙ<br><span>GITHUB.</span></h2><p>Код открыт. Истории проектов — тоже.</p><a class="pill-button pill-button--light" href="${profile.profileUrl}" target="_blank" rel="noreferrer">перейти в профиль <span>↗</span></a></div><footer><span>qrrrv / github portfolio</span><a href="#top">наверх ↑</a><span>made in public</span></footer></section>
      </main>
    </div>
  `;
}

export { projects };
