import { services, projects, manifesto } from "../data/content.js";

const serviceCards = services.map((service) => `
  <article class="service-card service-card--${service.color} reveal" data-cursor="смотреть">
    <div class="card-topline"><span>${service.number}</span><span class="card-arrow">↗</span></div>
    <div>
      <h3>${service.title}</h3>
      <p>${service.text}</p>
    </div>
    <div class="tag-list">${service.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
  </article>
`).join("");

const projectCards = projects.map((project, index) => `
  <article class="project-card project-card--${project.color} reveal" data-project="${index}">
    <div class="project-art" aria-hidden="true">
      <span class="art-label">${project.type}</span>
      <span class="art-mark">${project.mark}</span>
      <span class="art-index">0${index + 1}</span>
    </div>
    <div class="project-info">
      <div><h3>${project.title}</h3><p>${project.type}</p></div>
      <span class="project-year">${project.year}</span>
    </div>
  </article>
`).join("");

export function renderSite() {
  return `
    <div class="site-shell">
      <div class="grain" aria-hidden="true"></div>
      <header class="site-header" id="top">
        <a class="wordmark" href="#top" aria-label="BRUTAL / by design — наверх">
          <span class="wordmark-slash">/</span><span>BRUTAL</span><small>by design</small>
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
          <span class="sr-only">Открыть меню</span><i></i><i></i>
        </button>
        <nav class="primary-nav" id="primary-nav" aria-label="Основная навигация">
          <a href="#work">работы <span>01</span></a>
          <a href="#services">что делаем <span>02</span></a>
          <a href="#about">манифест <span>03</span></a>
        </nav>
        <a class="header-cta" href="#contact">давайте шуметь <span>↗</span></a>
      </header>

      <main>
        <section class="hero section-pad" aria-labelledby="hero-title">
          <div class="hero-meta"><span>креативная студия / 2024—∞</span><span class="meta-dot"></span><span>Москва · везде</span></div>
          <div class="hero-layout">
            <div class="hero-copy">
              <p class="eyebrow"><span class="eyebrow-marker">✳</span> Дизайн, который нельзя не заметить</p>
              <h1 id="hero-title">МЕНЬШЕ<br><span>СКУЧНОГО.</span><br>БОЛЬШЕ <em>ВАУ.</em></h1>
              <p class="hero-intro">Создаём бренды и цифровые продукты, которые выглядят так, будто у них есть что сказать.</p>
              <a class="button button--dark" href="#work">смотреть работы <span>↓</span></a>
            </div>
            <div class="hero-art" aria-label="Абстрактная композиция из цветных форм">
              <div class="sticker sticker--top">НЕ<br>ПОДОЙДЁТ<br>ВСЕМ</div>
              <div class="art-orbit"><span></span><span></span><span></span></div>
              <div class="hero-sun">✳</div>
              <div class="hero-smile">:—)<br><small>делаем<br>живым</small></div>
              <div class="hero-caption">BRUTAL<br>IS A<br>CHOICE</div>
            </div>
          </div>
          <div class="scroll-note"><span>листай вниз</span><div class="scroll-line"></div><span>↓</span></div>
        </section>

        <section class="ticker" aria-label="Слоган студии"><div class="ticker-track"><span>NO BORING BRANDS</span><b>✳</b><span>NO BORING BRANDS</span><b>✳</b><span>NO BORING BRANDS</span><b>✳</b><span>NO BORING BRANDS</span></div></section>

        <section class="services section-pad" id="services" aria-labelledby="services-title">
          <div class="section-heading reveal"><span class="section-number">02 / 04</span><h2 id="services-title">Делаем<br><span>всякое.</span></h2><p>От первого «а что если?» до последнего пикселя. Без шаблонов, зато с мнением.</p></div>
          <div class="services-grid">${serviceCards}</div>
        </section>

        <section class="work section-pad" id="work" aria-labelledby="work-title">
          <div class="section-heading section-heading--row reveal"><div><span class="section-number">03 / 04</span><h2 id="work-title">Работы,<br><span>за которые</span><br>не стыдно.</h2></div><p>Три проекта, которые мы сделали не «чтобы было», а чтобы стало.</p></div>
          <div class="projects-grid">${projectCards}</div>
          <a class="text-link" href="#contact">показать ещё <span>↗</span></a>
        </section>

        <section class="manifesto section-pad" id="about" aria-labelledby="manifesto-title">
          <div class="manifesto-stamp">EST.<br>2017</div>
          <div class="manifesto-main"><span class="section-number">04 / 04</span><h2 id="manifesto-title">${manifesto.map((line) => `<span>${line}</span>`).join("")}</h2></div>
          <div class="manifesto-side"><p>Мы верим, что хороший дизайн — это не декорация. Это инструмент, который помогает быть собой громче.</p><span class="scribble">p.s. да, мы<br>действительно<br>любим жёлтый</span></div>
        </section>

        <section class="contact section-pad" id="contact" aria-labelledby="contact-title">
          <div class="contact-card reveal"><span class="contact-burst" aria-hidden="true">✳</span><p class="eyebrow">есть идея? есть повод</p><h2 id="contact-title">ДАВАЙТЕ<br><span>СДЕЛАЕМ</span><br>ГРОМКО.</h2><a class="button button--dark button--large" href="mailto:hello@brutal.design">hello@brutal.design <span>↗</span></a></div>
          <div class="contact-footer"><span>BRUTAL / by design © 2024</span><a href="#top">наверх ↑</a><span>made with intent</span></div>
        </section>
      </main>
    </div>
  `;
}
