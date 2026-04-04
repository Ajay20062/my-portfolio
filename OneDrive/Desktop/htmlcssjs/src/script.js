const roles = ["Full Stack Developer", "Backend Specialist", "Scalable App Builder"];
const typingElement = document.querySelector(".typing");
const progressElement = document.getElementById("progress");
const cursor = document.querySelector(".cursor");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("primaryNav");
const themeToggle = document.getElementById("themeToggle");
const sectionLinks = document.querySelectorAll("a[href^='#']");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function runTyping() {
  if (!typingElement) return;

  const current = roles[roleIndex];
  typingElement.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex += 1;
    setTimeout(runTyping, 90);
    return;
  }

  if (!deleting && charIndex === current.length) {
    deleting = true;
    setTimeout(runTyping, 900);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(runTyping, 50);
    return;
  }

  deleting = false;
  roleIndex = (roleIndex + 1) % roles.length;
  setTimeout(runTyping, 260);
}

function updateScrollProgress() {
  if (!progressElement) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progressElement.style.width = `${Math.min(100, Math.max(0, percent))}%`;
}

function initCursor() {
  if (!cursor) return;
  document.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });
}

function initReveal() {
  const hiddenItems = document.querySelectorAll(".hidden");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  hiddenItems.forEach((item) => observer.observe(item));
}

function closeMenu() {
  if (!navLinks || !menuToggle) return;
  navLinks.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
}

function initMobileMenu() {
  if (!menuToggle || !navLinks) return;
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  sectionLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeMenu();
    }
  });
}

function applyTheme(theme) {
  const isLight = theme === "light";
  document.body.classList.toggle("light", isLight);
  if (themeToggle) {
    themeToggle.textContent = isLight ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  }
}

function initTheme() {
  const storedTheme = localStorage.getItem("portfolio-theme") || "dark";
  applyTheme(storedTheme);

  if (!themeToggle) return;
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("light") ? "dark" : "light";
    applyTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
  });
}

runTyping();
initCursor();
initReveal();
initMobileMenu();
initTheme();
updateScrollProgress();

window.addEventListener("scroll", updateScrollProgress);
