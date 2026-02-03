const heartEl = document.getElementById("heart");

const hearts = ["💖", "💗", "💘"];

const pattern = [
  "   x x            x x    ",
  "   x x x          x x x   ",
  "  x x x x        x x x x ",
  " x x x x x    x x x x x",
  " x x x x x   x x x x x",
  "   x x x x x x x x x ",
  "    x x x x x x x x ",
  "     x x x x x x x ",
  "      x x x x x x ",
  "       x x x x x ",
  "        x x x x ",
  "         x x x ",
  "          x x ",
  "           x "
];


heartEl.textContent = pattern
  .map(line =>
    line.replace(/x/g, () => hearts[Math.floor(Math.random() * hearts.length)])
  )
  .join("\n");

heartEl.addEventListener("click", () => {
  const rect = heartEl.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 25; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 80;

    particle.style.left = centerX + "px";
    particle.style.top = centerY + "px";
    particle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1400);
  }
});
