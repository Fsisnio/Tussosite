const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "Close" : "Menu";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
    });
  });
}

const langButtons = document.querySelectorAll("[data-lang]");
langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const lang = button.getAttribute("data-lang");
    langButtons.forEach((item) => {
      item.setAttribute("aria-selected", item === button ? "true" : "false");
    });
    document.querySelectorAll("[data-panel]").forEach((panel) => {
      panel.hidden = panel.getAttribute("data-panel") !== lang;
    });
  });
});

const form = document.querySelector("#enquire");
if (form) {
  const requested = new URLSearchParams(window.location.search).get("topic");
  const topicField = form.querySelector("[name=topic]");
  if (requested && topicField) {
    const match = [...topicField.options].find((option) => option.value === requested);
    if (match) topicField.value = match.value;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const topic = String(data.get("topic") || "Enquiry");
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`${topic} — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    const to = topic === "English" || topic === "Writing"
      ? "experts@peoplanplaces.com"
      : "emmanuel.awohouedji@gmail.com";
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}
