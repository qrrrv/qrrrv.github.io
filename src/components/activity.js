import { profile } from "../data/profile.js";

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const rtf = new Intl.RelativeTimeFormat("ru", { numeric: "auto" });
const ago = (iso) => {
  const s = (new Date(iso) - Date.now()) / 1000, a = Math.abs(s);
  if (a < 3600) return rtf.format(Math.round(s / 60), "minute");
  if (a < 86400) return rtf.format(Math.round(s / 3600), "hour");
  return rtf.format(Math.round(s / 86400), "day");
};
const kinds = { PushEvent: "пуш", CreateEvent: "создал", WatchEvent: "★ звезда", ForkEvent: "форк", IssuesEvent: "issue", PullRequestEvent: "pull request", IssueCommentEvent: "комментарий", ReleaseEvent: "релиз", DeleteEvent: "удалил", PublicEvent: "открыл код" };
const weight = (e) => (e.type === "PushEvent" ? e.payload?.size || e.payload?.commits?.length || 1 : 1);

async function load() {
  const key = "qrrrv-events";
  try { const c = JSON.parse(sessionStorage.getItem(key)); if (c && Date.now() - c.t < 6e5) return c.d; } catch {}
  const res = await fetch(`https://api.github.com/users/${profile.username}/events/public?per_page=100`, { headers: { Accept: "application/vnd.github+json" } });
  if (!res.ok) throw new Error(res.status);
  const d = await res.json();
  try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d })); } catch {}
  return d;
}

export async function initActivity() {
  const feed = document.querySelector("#activity-feed");
  const bars = document.querySelector("#activity-bars");
  const sum = document.querySelector("#activity-sum");
  if (!feed || !bars) return;
  try {
    const events = await load();
    if (!events.length) throw new Error("empty");

    const days = [...Array(14)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - (13 - i)); return { key: d.toDateString(), day: d.getDate(), n: 0 }; });
    events.forEach((e) => { const d = days.find((x) => x.key === new Date(e.created_at).toDateString()); if (d) d.n += weight(e); });
    const max = Math.max(...days.map((d) => d.n), 1);
    bars.innerHTML = days.map((d) => `<i data-d="${d.day}" data-n="${d.n || ""}" style="height:${(d.n / max) * 100}%" title="${d.n} событий"></i>`).join("");
    const total = days.reduce((s, d) => s + d.n, 0);
    const repos = new Set(events.map((e) => e.repo.name)).size;
    if (sum) sum.textContent = `за 14 дней: ${total} действий · ${repos} проектов в последних событиях`;

    feed.innerHTML = events.slice(0, 8).map((e) => {
      const kind = (kinds[e.type] || e.type.replace("Event", "")) + (e.type === "CreateEvent" && e.payload?.ref_type ? ` ${e.payload.ref_type}` : "") + (e.type === "PushEvent" && weight(e) > 1 ? ` ×${weight(e)}` : "");
      return `<li><b>${esc(kind)}</b><a href="https://github.com/${esc(e.repo.name)}" target="_blank" rel="noreferrer">${esc(e.repo.name.split("/")[1])}</a><time datetime="${esc(e.created_at)}">${ago(e.created_at)}</time></li>`;
    }).join("");
  } catch {
    bars.hidden = true;
    feed.innerHTML = `<li class="feed__note">GitHub сейчас не отдаёт события (возможно, лимит запросов). <a href="${profile.profileUrl}" target="_blank" rel="noreferrer">Открой профиль ↗</a></li>`;
  }
}
