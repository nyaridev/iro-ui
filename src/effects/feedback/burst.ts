// A small sparkle burst for rewards, from UmeSync: seven stars fly out of an element's center, turn and fade. Only in
// full motion: it's decoration, and every other mode skips it.

// ── Dependencies ──────────────────────────
import { motionOf } from "../motion";

// ── Constants ─────────────────────────────
const STAR = "M12 3.8l2.5 5.2 5.7.8-4.1 4 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4.1-4 5.7-.8z";
const COUNT = 7;
const LIFE = 700 + COUNT * 25;

// ── Public API ────────────────────────────
/** Bursts sparkles out of `node`'s center. They're drawn over everything and removed once they fade. */
export function burst(node: HTMLElement) {
  if (motionOf(node) !== "full") return;
  const rect = node.getBoundingClientRect();
  const root = node.closest<HTMLElement>("[data-iro-style]") ?? document.body;
  const holder = document.createElement("span");
  holder.className = "iro-burst";
  holder.setAttribute("aria-hidden", "true");
  holder.style.left = `${rect.left + rect.width / 2}px`;
  holder.style.top = `${rect.top + rect.height / 2}px`;
  for (let i = 0; i < COUNT; i++) {
    const angle = (i / COUNT) * Math.PI * 2 + 0.4;
    const distance = 22 + (i % 3) * 7;
    holder.insertAdjacentHTML(
      "beforeend",
      `<svg class="iro-burst-spark" viewBox="0 0 24 24" style="--x:${(Math.cos(angle) * distance).toFixed(1)}px;--y:${(Math.sin(angle) * distance).toFixed(1)}px;--size:${7 + (i % 2) * 3}px;animation-delay:${i * 25}ms"><path d="${STAR}"/></svg>`,
    );
  }
  root.appendChild(holder);
  setTimeout(() => holder.remove(), LIFE + 50);
}
