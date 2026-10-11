import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/responsive.css";
import { renderSite } from "./components/siteMarkup.js";
import { initInteractions } from "./components/interactions.js";

document.querySelector("#app").innerHTML = renderSite();
initInteractions();
