import { a as e, c as t, i as n, n as r, o as i, r as a, s as o, t as s } from "./backdrop-BV8IFK32.js";
// src/effects/feedback/animate.ts
var c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap();
async function u(e, t, n, r) {
	let i = c.get(e);
	i || (i = /* @__PURE__ */ new Map(), c.set(e, i)), i.get(t)?.cancel();
	let a = e.animate(n, r);
	i.set(t, a), await a.finished.catch(() => void 0), i.get(t) === a && i.delete(t);
}
function d(e, t) {
	let n = l.get(e);
	if (!n) {
		let { position: t, isolation: r } = getComputedStyle(e), i = {
			position: e.style.position,
			isolation: e.style.isolation
		};
		t === "static" && (e.style.position = "relative"), r !== "isolate" && (e.style.isolation = "isolate"), n = {
			parts: 0,
			undo: () => Object.assign(e.style, i)
		}, l.set(e, n);
	}
	let r = n;
	r.parts++;
	let i = document.createElement("span");
	return i.className = t, i.setAttribute("aria-hidden", "true"), e.appendChild(i), [i, () => {
		i.isConnected && (i.remove(), --r.parts > 0 || (r.undo(), l.delete(e)));
	}];
}
function f(e, t, n) {
	let { width: r, height: i } = e.getBoundingClientRect();
	return Math.min(t, n / Math.max(r, i, 1));
}
function p(e, n, r, a, o) {
	let s = t(e, r), c = (e) => ({
		outline: `2px solid ${i(s, e)}`,
		outlineOffset: "2px"
	}), l = [c(0)];
	for (let e = 0; e < a; e++) l.push(c(.9), c(e === a - 1 ? 0 : .15));
	return u(e, n, l, { duration: o });
}
// src/effects/feedback/bounce.ts
var m = "cubic-bezier(0.2, 0.7, 0.4, 1)", h = "cubic-bezier(0.6, 0, 0.8, 0.4)";
async function g(t, n = {}) {
	let r = e(t);
	if (r === "off") return;
	let i = a(n.speed, 1, .25, 4);
	if (r === "reduced") return p(t, "bounce", "var(--iro-accent)", 1, 520 / i);
	let o = 14 * a(n.height, 1, .25, 3), s = f(t, .01, 1.4), c = (e, t, n, r, i) => ({
		offset: e,
		easing: i,
		translate: `0 ${(-t).toFixed(1)}px`,
		scale: `${(1 + s * n).toFixed(4)} ${(1 + s * r).toFixed(4)}`,
		transformOrigin: "50% 100%"
	});
	return u(t, "bounce", r === "full" ? [
		c(0, 0, 0, 0, "ease-out"),
		c(.08, 0, 6, -7, m),
		c(.32, o, -4, 5, h),
		c(.5, 0, 7, -8, m),
		c(.67, o * .4, -1, 2, h),
		c(.82, 0, 3, -3, "ease-out"),
		c(1, 0, 0, 0, "linear")
	] : [
		c(0, 0, 0, 0, m),
		c(.42, o * .55, 0, 0, h),
		c(.84, 0, 0, 0, "ease-out"),
		c(1, 0, 0, 0, "linear")
	], { duration: (r === "full" ? 760 : 460) / i });
}
// src/effects/feedback/burst.ts
var _ = "M12 3.8l2.5 5.2 5.7.8-4.1 4 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4.1-4 5.7-.8z", v = 7;
function y(t) {
	if (e(t) !== "full") return;
	let n = t.getBoundingClientRect(), r = t.closest("[data-iro-style]") ?? document.body, i = document.createElement("span");
	i.className = "iro-burst", i.setAttribute("aria-hidden", "true"), i.style.left = `${n.left + n.width / 2}px`, i.style.top = `${n.top + n.height / 2}px`;
	for (let e = 0; e < v; e++) {
		let t = e / v * Math.PI * 2 + .4, n = 22 + e % 3 * 7;
		i.insertAdjacentHTML("beforeend", `<svg class="iro-burst-spark" viewBox="0 0 24 24" style="--x:${(Math.cos(t) * n).toFixed(1)}px;--y:${(Math.sin(t) * n).toFixed(1)}px;--size:${7 + e % 2 * 3}px;animation-delay:${e * 25}ms"><path d="${_}"/></svg>`);
	}
	r.appendChild(i), setTimeout(() => i.remove(), 925);
}
// src/effects/feedback/flash.ts
async function b(n, r = {}) {
	if (e(n) === "off") return;
	let o = a(r.speed, 1, .25, 4);
	for (let e of n.querySelectorAll(":scope > .iro-flash")) for (let t of e.getAnimations()) t.cancel();
	let [s, c] = d(n, "iro-flash");
	s.style.backgroundColor = i(t(n, r.color ?? "var(--iro-yellow)"), .3), await s.animate([
		{
			opacity: 0,
			offset: 0
		},
		{
			opacity: 1,
			offset: .12,
			easing: "ease-out"
		},
		{
			opacity: 0,
			offset: 1
		}
	], { duration: 1100 / o }).finished.catch(() => void 0), c();
}
// src/effects/feedback/pulse.ts
function x(e, n, r = 1) {
	let a = t(e, n), o = getComputedStyle(e).boxShadow, s = o && o !== "none" ? `, ${o}` : "", c = (e) => i(a, Math.min(e * r, 1));
	return {
		glow: (e, t, n) => `0 0 ${e.toFixed(1)}px ${t.toFixed(1)}px ${c(n * .55)}${s}`,
		ring: (e, t, n) => ({
			outline: `${e.toFixed(1)}px solid ${c(n * .9)}`,
			outlineOffset: `${t.toFixed(1)}px`
		})
	};
}
async function S(t, n = {}) {
	let r = e(t);
	if (r === "off") return;
	let i = a(n.speed, 1, .25, 4), o = a(n.strength, 1, .25, 3), s = Math.round(a(n.count, 1, 1, 3)), { glow: c, ring: l } = x(t, n.color ?? "var(--iro-spark)", o), d = (r === "full" ? 18 : 9) * o;
	return u(t, "pulse", r === "reduced" ? [
		{ boxShadow: c(18, 2, 0) },
		{ boxShadow: c(18, 2, 1) },
		{ boxShadow: c(18, 2, 0) }
	] : [
		{
			...l(2, 0, 0),
			boxShadow: c(0, 0, 0),
			offset: 0,
			easing: "ease-out"
		},
		{
			...l(2, 1, 1),
			boxShadow: c(20, 2, 1),
			offset: .16,
			easing: "cubic-bezier(0.33, 1, 0.68, 1)"
		},
		{
			...l(1, d, 0),
			boxShadow: c(32, 4, 0),
			offset: 1
		}
	], {
		duration: (r === "full" ? 900 : 700) / i,
		iterations: s
	});
}
// src/effects/feedback/heartbeat.ts
async function C(t, n = {}) {
	let r = e(t);
	if (r === "off") return;
	let i = a(n.speed, 1, .25, 4), { glow: o } = x(t, n.color ?? "var(--iro-pink)"), s = f(t, .14, 16) * (r === "full" ? 1 : r === "smooth" ? .5 : 0), c = (e, t, n) => ({
		offset: e,
		easing: "ease-in-out",
		scale: (1 + t * s).toFixed(4),
		boxShadow: o(10 + 14 * n, 1 + 3 * n, n)
	});
	return u(t, "heartbeat", [
		c(0, 0, 0),
		c(.14, 1, 1),
		c(.28, -.2, .6),
		c(.42, .57, .8),
		c(.62, 0, .4),
		c(1, 0, 0)
	], { duration: 820 / i });
}
// src/effects/feedback/shake.ts
var ee = 24;
async function w(t, n = {}) {
	let r = e(t);
	if (r === "off") return;
	let i = a(n.speed, 1, .25, 4);
	if (r === "reduced") return p(t, "shake", "var(--iro-danger)", 2, 640 / i);
	let o = a(n.strength, 1, .25, 3), s = r === "full", c = s ? 4.5 : 3, l = (s ? 10 : 5) * o;
	return u(t, "shake", Array.from({ length: 25 }, (e, t) => {
		let n = t / ee;
		return { translate: `${(l * Math.sin(n * c * 2 * Math.PI) * (1 - n) ** 1.7).toFixed(2)}px 0` };
	}), {
		duration: (s ? 520 : 380) / i,
		easing: "linear"
	});
}
// src/effects/feedback/success.ts
async function te(t, n = {}) {
	let r = e(t);
	if (r === "off") return;
	let i = a(n.speed, 1, .25, 4), { glow: o, ring: s } = x(t, n.color ?? "var(--iro-success)");
	if (r === "reduced") return u(t, "success", [
		{ boxShadow: o(16, 2, 0) },
		{ boxShadow: o(16, 2, 1) },
		{ boxShadow: o(16, 2, 0) }
	], { duration: 700 / i });
	let c = r === "full", l = c ? f(t, .05, 12) : f(t, .02, 5);
	return u(t, "success", [
		{
			...s(2, 0, 0),
			boxShadow: o(0, 0, 0),
			scale: "1",
			offset: 0,
			easing: "ease-out"
		},
		{
			...s(2, 1, 1),
			boxShadow: o(18, 2, 1),
			scale: String(1 + l),
			offset: .18,
			easing: "ease-in-out"
		},
		{
			...s(1.5, c ? 7 : 4, .6),
			boxShadow: o(24, 3, .6),
			scale: String(1 - l / 4),
			offset: .4
		},
		{
			...s(1, c ? 14 : 7, 0),
			boxShadow: o(30, 4, 0),
			scale: "1",
			offset: 1
		}
	], { duration: (c ? 900 : 700) / i });
}
// src/effects/feedback/tap.ts
async function T(t, r = {}) {
	let i = e(t);
	if (i === "off") return;
	let o = a(r.speed, 1, .25, 4), s = t.getBoundingClientRect(), c = n(r.from, s), l = c.x - s.left, u = c.y - s.top, p = Math.hypot(Math.max(l, s.width - l), Math.max(u, s.height - u)), [m, h] = d(t, "iro-tap"), g = document.createElement("span");
	g.className = "iro-tap-ink", Object.assign(g.style, {
		left: `${l - p}px`,
		top: `${u - p}px`,
		width: `${2 * p}px`,
		height: `${2 * p}px`
	}), m.appendChild(g);
	let _ = .4 + .6 * f(t, 1, 60), v = i === "reduced" ? [
		{ opacity: 0 },
		{ opacity: .16 * _ },
		{ opacity: 0 }
	] : [
		{
			transform: "scale(0)",
			opacity: .28 * _,
			easing: "cubic-bezier(0.2, 0, 0, 1)"
		},
		{
			transform: "scale(1)",
			opacity: .18 * _,
			offset: .6,
			easing: "ease-out"
		},
		{
			transform: "scale(1)",
			opacity: 0
		}
	];
	await g.animate(v, { duration: (i === "full" ? 620 : 420) / o }).finished.catch(() => void 0), h();
}
// src/effects/feedback/wiggle.ts
async function E(t, n = {}) {
	let r = e(t);
	if (r === "off") return;
	let i = a(n.speed, 1, .25, 4);
	if (r === "reduced") return p(t, "wiggle", "var(--iro-accent)", 1, 520 / i);
	let o = r === "full", s = f(t, o ? .087 : .038, o ? 9 : 4) * (180 / Math.PI), c = o ? 1 + f(t, .04, 8) : 1, l = [
		-1,
		.9,
		-.7,
		.5,
		-.25,
		0
	];
	return u(t, "wiggle", [{
		rotate: "0deg",
		scale: "1",
		easing: "ease-in-out"
	}, ...l.map((e, t) => ({
		easing: "ease-in-out",
		rotate: `${(s * e).toFixed(2)}deg`,
		scale: String(t < l.length - 1 ? c : 1)
	}))], { duration: (o ? 640 : 440) / i });
}
// src/effects/window/fit.ts
function D(e) {
	let t = e.offsetWidth, n = e.offsetHeight, r = e.getBoundingClientRect(), i = r.left + r.width / 2, a = r.top + r.height / 2, o = Math.min(i, innerWidth - i), s = Math.min(a, innerHeight - a);
	return (e, r, i) => {
		let a = Math.abs(Math.cos(e)), c = Math.abs(Math.sin(e)), l = Math.min(t / 2 * a + n / 2 * c, r), u = Math.min(t / 2 * c + n / 2 * a, r);
		return Math.max(0, Math.min(1, (o - i) / Math.max(1, l), (s - i) / Math.max(1, u)));
	};
}
// src/effects/window/state.ts
var ne = [
	"clip-path",
	"filter",
	"transform",
	"transform-origin",
	"opacity",
	"mask-image",
	"--reveal-r",
	"--reveal-glow"
], O = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ new WeakMap(), A = (e) => Math.min(1, Math.max(0, e));
function re(e) {
	return e.dataset.iroReveal ?? "open";
}
function ie(e) {
	cancelAnimationFrame(O.get(e) ?? 0);
	let t = (k.get(e) ?? 0) + 1;
	return k.set(e, t), t;
}
function ae(e) {
	for (let t of ne) e.style.removeProperty(t);
	for (let t of e.querySelectorAll(":scope > .iro-effect-part")) t.remove();
}
function oe(e, t) {
	let n = re(e);
	return !(t === "closing" ? n === "closed" || n === "closing" : n === "open" || n === "opening") && (ie(e), e.dataset.iroReveal = t, !0);
}
function se(e) {
	ie(e), e.dataset.iroReveal = "closed", ae(e), e.style.clipPath = "circle(0px at 50% 50%)", e.style.opacity = "0";
}
function ce(e) {
	ie(e), e.dataset.iroReveal = "open", ae(e);
}
function j(e, t, n) {
	let r = ie(e), i = () => k.get(e) === r;
	return new Promise((r) => {
		let a = performance.now(), o = !1, s = () => {
			if (!o) {
				if (o = !0, !i()) return r(!1);
				cancelAnimationFrame(O.get(e) ?? 0), n(1), r(!0);
			}
		}, c = (l) => {
			if (o) return;
			if (!i()) return o = !0, r(!1);
			let u = A((l - a) / t);
			n(u), u < 1 ? O.set(e, requestAnimationFrame(c)) : s();
		};
		O.set(e, requestAnimationFrame(c)), setTimeout(s, t + 500);
	});
}
async function M(t, n, r, i, o) {
	let s = n === "open";
	if (!oe(t, s ? "opening" : "closing")) return;
	let c = () => s ? ce(t) : se(t);
	ae(t), s && (t.style.opacity = "0");
	let l = e(t), u = a(r.speed, 1, .25, 4);
	if ((l === "off" || l === "reduced") && o?.(), l === "off") return c();
	l === "reduced" ? await j(t, (s ? 180 : 140) / u, (e) => t.style.opacity = String(s ? e : 1 - e)) && c() : await i(l === "full", u) && c();
}
function le(e) {
	se(e);
}
// src/effects/window/reveal.ts
var N = "iro-reveal", P = null, F = null, I = (e) => Math.min(1, Math.max(0, e)), L = (e) => e >= 1 ? 1 : 1 - 2 ** (-11 * e), ue = (e) => e * e * e;
function R(e) {
	if (e >= 1) return 1;
	let t = .5, n = Math.log(250) / t, r = n * Math.sqrt(1 - t * t);
	return 1 - Math.exp(-.5 * n * e) * (Math.cos(r * e) + t * n / r * Math.sin(r * e));
}
function z(e) {
	return Math.hypot(e.offsetWidth / 2, e.offsetHeight / 2) + 24;
}
function B() {
	return document.getElementById(N) || document.body.insertAdjacentHTML("beforeend", `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
        <filter id="${N}" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.011 0.016" numOctaves="2" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>`), P = document.querySelector(`#${N} feTurbulence`), F = document.querySelector(`#${N} feDisplacementMap`), {
		id: N,
		displacement: F
	};
}
function V(e) {
	if (e.querySelector(":scope > .iro-reveal-ring")) return;
	let t = document.createElement("div");
	t.className = "iro-reveal-ring iro-effect-part", t.setAttribute("aria-hidden", "true"), e.appendChild(t);
}
function de(e, t = {}) {
	return M(e, "open", t, (t, n) => {
		B(), V(e);
		let r = z(e), i = 0;
		return j(e, (t ? 780 : 460) / n, (n) => {
			let a = r * L(n), o = t ? I(1 - n / .26) : 0, s = t ? .9 + .1 * R(n) : .96 + .04 * L(n);
			e.style.opacity = String(I(n * 6)), e.style.clipPath = `circle(${a.toFixed(1)}px at 50% 50%)`, e.style.transform = `scale(${s.toFixed(4)})`, e.style.filter = `url(#${N}) invert(${o.toFixed(3)}) hue-rotate(${(o * 180).toFixed(1)}deg)`, e.style.setProperty("--reveal-r", `${a.toFixed(1)}px`), e.style.setProperty("--reveal-glow", String(1 - n)), F?.setAttribute("scale", ((t ? 70 : 28) * (1 - n) ** 2).toFixed(2));
			let c = performance.now();
			P && n < .7 && c - i > 55 && (i = c, P.setAttribute("seed", String(1 + Math.floor(Math.random() * 999))));
		});
	});
}
function fe(e, t = {}) {
	return M(e, "close", t, (t, n) => {
		B(), V(e);
		let r = z(e);
		return j(e, (t ? 300 : 220) / n, (n) => {
			let i = r * (1 - ue(n)), a = t ? I((n - .55) / .45) : 0;
			e.style.clipPath = `circle(${i.toFixed(1)}px at 50% 50%)`, e.style.transform = `scale(${(1 - .07 * n).toFixed(4)})`, e.style.filter = `url(#${N}) invert(${a.toFixed(3)}) hue-rotate(${(a * 180).toFixed(1)}deg)`, e.style.opacity = String(1 - I((n - .75) / .25)), e.style.setProperty("--reveal-r", `${i.toFixed(1)}px`), e.style.setProperty("--reveal-glow", String(n)), F?.setAttribute("scale", ((t ? 50 : 20) * n).toFixed(2));
		});
	});
}
// src/effects/window/stage.ts
function pe(e) {
	let t = e.getBoundingClientRect(), n = e.offsetWidth, r = e.offsetHeight, i = document.createElement("div");
	i.className = "iro-effect-stage", i.setAttribute("aria-hidden", "true"), i.inert = !0, Object.assign(i.style, {
		left: `${t.left}px`,
		top: `${t.top}px`,
		width: `${n}px`,
		height: `${r}px`
	}), e.after(i);
	let a = i.getBoundingClientRect();
	i.style.left = `${2 * t.left - a.left}px`, i.style.top = `${2 * t.top - a.top}px`;
	let o = [...e.querySelectorAll("canvas")];
	return {
		element: i,
		box: t,
		width: n,
		height: r,
		copy: () => {
			let t = e.cloneNode(!0);
			t.removeAttribute("id"), t.removeAttribute("data-iro-reveal");
			for (let e of t.querySelectorAll(":scope > .iro-effect-part")) e.remove();
			for (let e of t.querySelectorAll("[id]")) e.removeAttribute("id");
			for (let e of t.querySelectorAll("iframe")) e.removeAttribute("src");
			for (let e of t.querySelectorAll("video, audio")) e.removeAttribute("autoplay"), e.preload = "none";
			for (let e of [t, ...t.querySelectorAll("*")]) e.style.animation = "none", e.style.transition = "none";
			return t.querySelectorAll("canvas").forEach((e, t) => {
				try {
					o[t] && e.getContext("2d")?.drawImage(o[t], 0, 0);
				} catch {}
			}), Object.assign(t.style, {
				position: "absolute",
				inset: "0 auto auto 0",
				margin: "0",
				boxSizing: "border-box",
				width: `${n}px`,
				height: `${r}px`,
				transform: "none",
				translate: "none",
				rotate: "none",
				scale: "none",
				opacity: "1",
				clipPath: "none",
				filter: "none"
			}), t;
		},
		remove: () => i.remove()
	};
}
function me(e, t, n, r) {
	let i = e.getBoundingClientRect(), a = [];
	for (let s = 0; s < n; s++) for (let c = 0; c < t; c++) {
		let l = document.elementFromPoint(i.left + (c + .5) / t * i.width, i.top + (s + .5) / n * i.height), u = "";
		for (; l && l !== e && l !== document.body && !u;) {
			let [e, t, n, r] = o(getComputedStyle(l).backgroundColor);
			r > .35 && (u = `rgb(${e} ${t} ${n})`), l = l.parentElement;
		}
		a.push(u ? [u] : r);
	}
	return a;
}
// src/effects/window/black-hole.ts
var H = "iro-dissolve", he = 10, ge = 12, U = 84, _e = null, ve = null;
function ye() {
	document.getElementById(H) || document.body.insertAdjacentHTML("beforeend", `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
        <filter id="${H}" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="5" result="flow" />
          <feDisplacementMap in="SourceGraphic" in2="flow" scale="0" xChannelSelector="R" yChannelSelector="G" result="warped" />
          <feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="9" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" />
          <feComponentTransfer result="mask"><feFuncA type="linear" slope="16" intercept="0" /></feComponentTransfer>
          <feComposite in="warped" in2="mask" operator="in" />
        </filter>
      </svg>`), _e = document.querySelector(`#${H} feFuncA`), ve = document.querySelector(`#${H} feDisplacementMap`);
}
var W = (e) => Math.min(1, Math.max(0, e)), G = (e, t, n) => {
	let r = W((n - e) / (t - e));
	return r * r * (3 - 2 * r);
}, be = (e) => 1 - (1 - e) ** 3, xe = (e) => 1 - (1 - e) ** 5, Se = (e) => e[Math.floor(Math.random() * e.length)];
function Ce(e, t, n) {
	let r = document.createElement("canvas");
	return r.width = Math.max(1, Math.round(t)), r.height = Math.max(1, Math.round(n)), r.setAttribute("aria-hidden", "true"), Object.assign(r.style, {
		position: "fixed",
		inset: "0",
		width: "100%",
		height: "100%",
		zIndex: String(e),
		pointerEvents: "none"
	}), document.body.appendChild(r), r;
}
async function we(e, n, r, a) {
	ye();
	let o = e.getBoundingClientRect(), s = e.offsetWidth, c = e.offsetHeight, l = o.left + o.width / 2, u = o.top + o.height / 2, d = Math.hypot(s / 2, c / 2), f = D(e), p = Math.min(l, innerWidth - l, u, innerHeight - u) - 8, m = parseFloat(getComputedStyle(e).borderTopLeftRadius) || 0, h = t(e, "var(--iro-accent)"), g = t(e, "var(--iro-spark)"), _ = t(e, "var(--iro-glow-2)"), v = [
		h,
		_,
		g,
		...[
			"fg",
			"fg-2",
			"success"
		].map((n) => t(e, `var(--iro-${n})`))
	].map((e) => i(e)), y = me(e, he, ge, [
		"var(--iro-bg)",
		"color-mix(in oklab, var(--iro-bg) 70%, var(--iro-glow-1))",
		"color-mix(in oklab, var(--iro-bg) 80%, var(--iro-glow-2))",
		"color-mix(in oklab, var(--iro-bg) 85%, var(--iro-glow-3))"
	].map((n) => i(t(e, n)))), b = devicePixelRatio || 1, x = Ce(1e3, innerWidth * b, innerHeight * b), S = x.getContext("2d"), C = Ce(1001, x.width / 2, x.height / 2), ee = C.getContext("2d");
	if (!S || !ee) return x.remove(), C.remove(), !0;
	S.scale(b, b), S.lineCap = "round", S.lineJoin = "round", Object.assign(C.style, {
		filter: `blur(${n ? 9 : 6}px) brightness(1.8) saturate(1.35)`,
		mixBlendMode: "plus-lighter",
		opacity: "0.9"
	});
	let w = [
		Math.random() * 6.3,
		Math.random() * 6.3,
		Math.random() * 6.3
	], te = new Float32Array(U), T = new Float32Array(U), E = new Float32Array(U), ne = -1, O = (e, t, n) => .5 * Math.sin(3 * e + w[0] + t * 3.1) + .3 * Math.sin(7 * e + w[1] - t * 4.7) + .2 * Math.sin(13 * e + w[2] + t * 6.3) + (n >= 0 ? te[n] : 0), k = [], A = n ? 1150 : 700, re = n ? 340 : 240, ie = n ? 1500 : 650, ae = n ? 200 : 80, oe = n ? 19e4 : 14e4, se = n ? 26 : 18, ce = n ? 170 : 110, M = 0, le = 0, N = 0, P = !1, F = 1, I = await j(e, (A + re) / r, (t) => {
		let r = t * (A + re), o = W(r / A), b = W((r - A) / re), w = Math.min(.04, Math.max(.001, (r - M) / 1e3)), D = r / 1e3;
		M = r;
		let j = W((o - .06) / .94), I = Math.max(0, d * (1 - j ** 1.5)), L = .035 + .2 * G(0, .8, o), ue = ae * o ** 2.2, R = ue * Math.PI / 180, z = (n ? 3 : 1.5) * Math.sin(Math.PI * W(o / .35)) * (1 - o);
		F = Math.min(F, 1 - .5 * o * o, f(R, I * (1 + L * 1.35), 10 + z));
		let B = F, V = (Math.random() * 2 - 1) * z, de = (Math.random() * 2 - 1) * z;
		if (r - ne > 60) {
			ne = r;
			for (let e = 0; e < U; e++) te[e] = (Math.random() * 2 - 1) * .35;
		}
		let fe = [];
		for (let e = 0; e < U; e++) {
			let t = e / U * Math.PI * 2, n = Math.max(0, I * (1 + L * O(t, D, e)));
			T[e] = Math.cos(t) * n, E[e] = Math.sin(t) * n, fe.push(`${(s / 2 + T[e]).toFixed(1)}px ${(c / 2 + E[e]).toFixed(1)}px`);
		}
		if (e.style.clipPath = `polygon(${fe.join(",")})`, e.style.transform = `translate(${V.toFixed(2)}px, ${de.toFixed(2)}px) rotate(${ue.toFixed(2)}deg) scale(${B.toFixed(4)})`, e.style.filter = `url(#${H}) blur(${((n ? 3.2 : 1.8) * o * o).toFixed(2)}px) brightness(${(1 - .45 * o).toFixed(3)}) saturate(${(1 + .7 * o).toFixed(3)})`, e.style.opacity = String(1 - G(.88, 1, o)), _e?.setAttribute("intercept", (-16 * (.1 + .5 * o ** 1.6)).toFixed(3)), ve?.setAttribute("scale", ((n ? 70 : 30) * o * o).toFixed(1)), o < 1) for (le += ie * Math.sin(Math.PI * Math.min(1, j * 1.08 + .04)) ** .6 * w; le >= 1;) {
			--le;
			let e = Math.random() * Math.PI * 2, t = I * (1 + L * O(e, D, -1)), r = Math.random() < .72 ? t * (.86 + Math.random() * .14) : t * Math.sqrt(Math.random()) * .9, i = Math.cos(e) * r, a = Math.sin(e) * r;
			if (Math.abs(i) > s / 2 || Math.abs(a) > c / 2) continue;
			let o = Math.min(9, Math.floor((i + s / 2) / s * he)), d = Math.min(11, Math.floor((a + c / 2) / c * ge)), f = Math.min(l + Math.cos(e + R) * r * B, innerWidth - l - Math.cos(e + R) * r * B, u + Math.sin(e + R) * r * B, innerHeight - u - Math.sin(e + R) * r * B);
			k.push({
				r: r * B,
				angle: e + R,
				fall: -(15 + Math.random() * (n ? 110 : 50)) * W((f - 20) / 80),
				swirl: (n ? 2.4 : 1.6) * (.7 + Math.random() * .6),
				size: 1.2 + Math.random() * (n ? 3 : 2.2),
				color: Se(Math.random() < .82 ? y[d * he + o] : v),
				age: 0
			});
		}
		let pe = b > 0 ? W(b / .45) ** 2 : 0;
		N *= Math.exp(-w * 6);
		let me = se * G(.02, .35, o) * (1 + Math.min(.3, N)) * (1 - pe);
		S.clearRect(0, 0, innerWidth, innerHeight);
		let ye = oe * (.4 + 2.4 * o + 9 * b), xe = /* @__PURE__ */ new Map();
		for (let e = k.length - 1; e >= 0; e--) {
			let t = k[e];
			t.age += w, t.fall = Math.min(2200, (t.fall + ye / Math.max(t.r, 20) * w) * Math.exp(-w * .6)), t.r -= t.fall * w;
			let n = t.swirl * (120 / Math.max(t.r, 16)) ** .9 * W((p - t.r) / 50);
			if (t.angle += n * w, t.r < Math.max(4, me * .85) || t.age > 1.8) {
				k.splice(e, 1), N += .006;
				continue;
			}
			let r = .025, i = t.r + t.fall * r, a = t.angle - n * r, o = t.size * Math.min(1, t.r / 70) + .6, s = `${t.color}|${Math.round(o)}`, c = xe.get(s);
			c || (c = [], xe.set(s, c)), c.push(l + Math.cos(a) * i, u + Math.sin(a) * i, l + Math.cos(t.angle) * t.r, u + Math.sin(t.angle) * t.r);
		}
		S.globalAlpha = .92;
		for (let [e, t] of xe) {
			let [n, r] = e.split("|");
			S.strokeStyle = n, S.lineWidth = Number(r), S.beginPath();
			for (let e = 0; e < t.length; e += 4) S.moveTo(t[e], t[e + 1]), S.lineTo(t[e + 2] + .01, t[e + 3]);
			S.stroke();
		}
		S.globalAlpha = 1;
		let Ce = G(.03, .18, o) * (1 - G(.86, 1, o));
		if (Ce > .01) {
			S.save(), S.translate(l + V, u + de), S.rotate(R), S.scale(B, B), S.beginPath(), S.roundRect(-s / 2, -c / 2, s, c, m), S.clip(), S.beginPath(), S.moveTo(T[0], E[0]);
			for (let e = 1; e < U; e++) S.lineTo(T[e], E[e]);
			S.closePath(), S.strokeStyle = i(g, .7 * Ce), S.lineWidth = (n ? 5 : 3.5) / B, S.stroke(), S.strokeStyle = i([
				255,
				255,
				255
			], .85 * Ce), S.lineWidth = 1.3 / B, S.stroke(), S.restore();
		}
		if (me > .4 && Te(S, l, u, me, se, D, h, _, g), b > .3) {
			let e = W((b - .3) / .7), t = 1 - e;
			S.fillStyle = i([
				255,
				255,
				255
			], .9 * t * t), S.beginPath(), S.arc(l, u, 3 + 9 * (1 - e), 0, Math.PI * 2), S.fill(), S.strokeStyle = i(g, t), S.lineWidth = 4 * t + .5, S.beginPath(), S.arc(l, u, 4 + (n ? 64 : 44) * be(e), 0, Math.PI * 2), S.stroke();
		}
		ee.clearRect(0, 0, C.width, C.height), ee.drawImage(x, 0, 0, C.width, C.height), !P && r >= A - ce && (P = !0, a?.());
	});
	return I && !P && a?.(), x.remove(), C.remove(), I;
}
function Te(e, t, n, r, a, o, s, c, l) {
	let u = e.createRadialGradient(t, n, r * .8, t, n, r * 3.2);
	u.addColorStop(0, i(s, .55)), u.addColorStop(.5, i(c, .18)), u.addColorStop(1, i(c, 0)), e.fillStyle = u, e.beginPath(), e.arc(t, n, r * 3.2, 0, Math.PI * 2), e.fill();
	for (let l = 0; l < 3; l++) {
		let u = o * (9 - l * 2.5) + l * 2.1;
		e.strokeStyle = i(l === 1 ? c : s, .9 - l * .2), e.lineWidth = Math.max(.8, (2.6 - l * .6) * (r / a)), e.beginPath(), e.arc(t, n, r * (1.25 + .28 * l), u, u + 1.7 - l * .3), e.stroke();
	}
	e.fillStyle = "black", e.beginPath(), e.arc(t, n, r, 0, Math.PI * 2), e.fill(), e.strokeStyle = i(l, .95), e.lineWidth = 1.5, e.beginPath(), e.arc(t, n, r + 1, 0, Math.PI * 2), e.stroke();
}
function Ee(e, t = {}) {
	let { almostGone: n } = t;
	return M(e, "close", t, (t, r) => we(e, t, r, n), () => n?.());
}
function De(e, t = {}) {
	return M(e, "open", t, (t, n) => {
		let { id: r, displacement: i } = B();
		V(e), i?.setAttribute("scale", "0");
		let a = Math.hypot(e.offsetWidth / 2, e.offsetHeight / 2) + 24, o = D(e);
		return j(e, (t ? 640 : 460) / n, (n) => {
			let s = xe(n), c = a * s, l = (t ? 36 : 14) * (1 - s), u = Math.min(.62 + .38 * s, o(l * Math.PI / 180, c, 2));
			e.style.opacity = String(W(n * 4)), e.style.clipPath = `circle(${c.toFixed(1)}px at 50% 50%)`, e.style.transform = `rotate(${l.toFixed(2)}deg) scale(${u.toFixed(4)})`, e.style.filter = `url(#${r}) blur(${(5 * (1 - s)).toFixed(2)}px)`, e.style.setProperty("--reveal-r", `${c.toFixed(1)}px`), e.style.setProperty("--reveal-glow", String(.6 * (1 - n))), i?.setAttribute("scale", ((t ? 26 : 12) * (1 - n) ** 3).toFixed(2));
		});
	});
}
// src/effects/window/burn.ts
var K = {
	top: 150,
	side: 40
}, Oe = -.08, ke = 0, Ae = (e) => Math.min(1, Math.max(0, e)), q = (e, t) => e + Math.random() * (t - e);
function je(e, t) {
	let n = [
		5,
		10,
		20,
		40
	].map((n) => {
		let r = n + 1, i = Math.ceil(n * t / e) + 1;
		return {
			cells: n,
			across: r,
			values: Float32Array.from({ length: r * (i + 1) }, () => Math.random())
		};
	}), r = new Float32Array(e * t), i = Infinity, a = -Infinity;
	for (let o = 0; o < t; o++) for (let s = 0; s < e; s++) {
		let c = 0, l = .5;
		for (let { cells: t, across: r, values: i } of n) {
			let n = s / e * t, a = o / e * t, u = Math.floor(n), d = Math.floor(a), f = (n - u) * (n - u) * (3 - 2 * (n - u)), p = (a - d) * (a - d) * (3 - 2 * (a - d)), m = (e, t) => i[(d + t) * r + u + e];
			c += l * ((m(0, 0) * (1 - f) + m(1, 0) * f) * (1 - p) + (m(0, 1) * (1 - f) + m(1, 1) * f) * p), l /= 2;
		}
		let u = .6 * (1 - o / (t - 1)) + .04 * (s / (e - 1)) + .5 * c;
		r[o * e + s] = u, i = Math.min(i, u), a = Math.max(a, u);
	}
	for (let e = 0; e < r.length; e++) r[e] = (r[e] - i) / (a - i);
	return r;
}
function Me(e, t, n) {
	let r = document.createElement("canvas");
	r.width = t, r.height = n;
	let i = r.getContext("2d"), a = i?.createImageData(t, n);
	if (!i || !a) return "";
	for (let t = 0; t < e.length; t++) a.data.set([
		Math.round(255 * e[t]),
		0,
		0,
		255
	], t * 4);
	return i.putImageData(a, 0, 0), r.toDataURL();
}
function Ne(e, t, n) {
	let r = `iro-burn-${++ke}`, i = (e) => `<feComponentTransfer in="depth" result="${e}"><feFuncA type="linear" /></feComponentTransfer>`;
	document.body.insertAdjacentHTML("beforeend", `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <filter id="${r}" x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB">
        <feImage href="${e}" x="0" y="0" width="${t}" height="${n}" preserveAspectRatio="none" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0" result="depth" />
        ${i("keep")}${i("sound")}${i("core")}${i("flame")}
        <feComposite in="SourceGraphic" in2="keep" operator="in" result="left" />
        <feComposite in="keep" in2="sound" operator="out" result="scorched" />
        <feFlood flood-color="rgb(28 12 4)" flood-opacity="0.8" />
        <feComposite in2="scorched" operator="in" />
        <feComposite in2="left" operator="in" result="char" />
        <feComposite in="flame" in2="keep" operator="out" />
        <feComposite in2="SourceAlpha" operator="in" result="flameBand" />
        <feFlood flood-color="rgb(255 120 30)" />
        <feComposite in2="flameBand" operator="in" result="flames" />
        <feGaussianBlur in="flames" stdDeviation="4" result="glow" />
        <feComposite in="core" in2="keep" operator="out" />
        <feComposite in2="SourceAlpha" operator="in" result="coreBand" />
        <feFlood flood-color="rgb(255 244 210)" />
        <feComposite in2="coreBand" operator="in" result="hot" />
        <feMerge>
          <feMergeNode in="left" /><feMergeNode in="char" /><feMergeNode in="glow" />
          <feMergeNode in="flames" /><feMergeNode in="hot" />
        </feMerge>
      </filter>
    </svg>`);
	let a = document.body.lastElementChild, o = Object.fromEntries([
		"keep",
		"sound",
		"core",
		"flame"
	].map((e) => [e, a.querySelector(`[result="${e}"] feFuncA`)])), s = (e, t, n) => {
		o[e].setAttribute("slope", String(n)), o[e].setAttribute("intercept", (-n * t).toFixed(3));
	};
	return {
		filter: `url(#${r})`,
		burn: (e, t) => {
			s("keep", e, 26), s("sound", e + .08, 9), s("core", e - .014 * t, 30), s("flame", e - .055 * t, 16);
		},
		remove: () => a.remove()
	};
}
function Pe(e, t, n, r, i, a) {
	let o = [], s = a ? .09 : .035;
	for (let c = 0; c < n; c++) for (let l = 0; l < t; l++) {
		if (Math.random() > s) continue;
		let u = Math.random() < .28;
		o.push({
			x: (l + Math.random()) / t * r,
			y: (c + Math.random()) / n * i,
			when: (e[c * t + l] - Oe) / 1.1800000000000002,
			life: u ? q(.6, 1.1) : q(.35, .9),
			vx: q(-16, 16),
			vy: -(u ? q(25, 60) : q(50, 130)) * (a ? 1 : .5),
			sway: q(0, Math.PI * 2),
			size: u ? q(1.5, 3.4) : q(1, 2.4),
			ash: u
		});
	}
	return o;
}
function Fe(e) {
	if (e < .3) {
		let t = e / .3;
		return [
			255,
			244 - 74 * t,
			208 - 150 * t
		];
	}
	let t = Ae((e - .3) / .7);
	return [
		255 - 55 * t,
		170 - 130 * t,
		58 - 40 * t
	];
}
async function Ie(e, n, r, i) {
	let a = pe(e), { width: o, height: s } = a, c = Math.max(8, Math.round(150 * s / o)), l = je(150, c), u = Ne(Me(l, 150, c), o, s), d = Pe(l, 150, c, o, s, n), [f, p, m] = t(e, "var(--iro-bg)"), h = .2126 * f + .7152 * p + .0722 * m < 128, g = document.createElement("canvas"), _ = devicePixelRatio || 1, v = o + 2 * K.side, y = s + K.top;
	g.width = Math.round(v * _), g.height = Math.round(y * _), Object.assign(g.style, {
		position: "absolute",
		left: `${-K.side}px`,
		top: `${-K.top}px`,
		width: `${v}px`,
		height: `${y}px`
	}), a.element.appendChild(g);
	let b = g.getContext("2d");
	b?.setTransform(_, 0, 0, _, K.side * _, K.top * _);
	let x = n ? 1600 : 950, S = await j(e, x / r, (t) => {
		let n = i ? t : 1 - t, r = Oe + 1.1800000000000002 * n;
		if (u.burn(r, 1 - Ae((n - .88) / .12)), e.style.filter = u.filter, e.style.opacity = "1", b) {
			b.clearRect(-K.side, -K.top, v, y);
			for (let e of d) {
				let t = (n - e.when) * (x / 1e3);
				if (t < 0 || t > e.life) continue;
				let r = t / e.life, i = e.x + e.vx * t + 6 * Math.sin(e.sway + t * 5) * r, a = e.y + e.vy * t - 30 * t * t, o = e.size * (1 - .5 * r);
				if (e.ash) b.globalCompositeOperation = "source-over", b.fillStyle = h ? `rgb(120 110 104 / ${.55 * (1 - r)})` : `rgb(40 34 30 / ${.7 * (1 - r)})`;
				else {
					b.globalCompositeOperation = h ? "lighter" : "source-over";
					let n = .75 + .25 * Math.sin(e.sway * 7 + t * 31), [i, a, o] = Fe(r);
					b.fillStyle = `rgb(${i} ${a} ${o} / ${((1 - r) ** 1.2 * n).toFixed(3)})`;
				}
				b.fillRect(i - o / 2, a - o / 2, o, o);
			}
		}
	});
	return u.remove(), a.remove(), S;
}
function Le(e, t = {}) {
	return M(e, "close", t, (t, n) => Ie(e, t, n, !0));
}
function Re(e, t = {}) {
	return M(e, "open", t, (t, n) => Ie(e, t, n, !1));
}
// src/effects/window/crt.ts
var J = (e) => Math.min(1, Math.max(0, e)), Y = (e, t, n) => e + (t - e) * n, ze = (e) => e * e * e, Be = (e) => 1 - (1 - e) ** 3, Ve = (e) => 1 + 2.2 * (e - 1) ** 3 + 1.2 * (e - 1) ** 2;
function He(e, t) {
	let n = document.createElement("div");
	n.className = "iro-crt-lines iro-effect-part", n.setAttribute("aria-hidden", "true"), e.appendChild(n);
	let r = document.createElement("div");
	return r.className = "iro-crt-glow", r.setAttribute("aria-hidden", "true"), t && r.style.setProperty("--crt-glow", t), (e.closest("[data-iro-style]") ?? document.body).appendChild(r), {
		lines: n,
		glow: r,
		box: e.getBoundingClientRect(),
		remove: () => {
			n.remove(), r.remove();
		}
	};
}
function Ue({ glow: e, box: t }, n, r, i) {
	e.style.left = `${(t.left + t.width / 2 - n / 2).toFixed(1)}px`, e.style.top = `${(t.top + t.height / 2 - r / 2).toFixed(1)}px`, e.style.width = `${n.toFixed(1)}px`, e.style.height = `${r.toFixed(1)}px`, e.style.opacity = i.toFixed(3);
}
function We(e, t, n, r) {
	e.style.transform = `scale(${t.toFixed(4)}, ${n.toFixed(4)})`, e.style.filter = `brightness(${(1 + 2.4 * r).toFixed(3)}) saturate(${(1 - .6 * r).toFixed(3)}) contrast(${(1 + .3 * r).toFixed(3)})`;
}
function Ge(e, t = {}) {
	return M(e, "close", t, async (n, r) => {
		let i = He(e, t.color), { width: a } = i.box, o = await j(e, (n ? 560 : 400) / r, (t) => {
			let r = ze(J(t / .42)), o = ze(J((t - .42) / .3)), s = (1 + (n ? .06 : 0) * r) * Y(1, .004, o);
			We(e, s, Y(1, .008, r), r * (n ? 1 : .6)), e.style.opacity = String(1 - J((t - .62) / .12)), i.lines.style.opacity = n ? String(r * .8) : "0";
			let c = J((t - .32) / .1) * (1 - J((t - .86) / .14));
			if (t < .72) Ue(i, Math.max(a * s, 6), 2, c * (n ? 1 : .7));
			else {
				let e = (t - .72) / .28;
				Ue(i, Y(12, 3, e), Y(12, 3, e), c * (n ? 1 : .7));
			}
		});
		return i.remove(), o;
	});
}
function Ke(e, t = {}) {
	return M(e, "open", t, async (n, r) => {
		let i = He(e, t.color), { width: a } = i.box, o = await j(e, (n ? 620 : 420) / r, (t) => {
			let r = Be(J(t / .18)), o = Be(J((t - .18) / .22)), s = J((t - .4) / .6), c = n ? Ve(s) : Be(s);
			t < .18 ? Ue(i, Y(2, 12, r), Y(2, 12, r), r) : Ue(i, Y(12, a, o), Y(12, 2, o), 1 - J((t - .44) / .12)), e.style.opacity = t < .4 ? "0" : "1", We(e, 1 + (n ? .05 : 0) * (1 - s), Y(.008, 1, c), 1 - Be(s)), i.lines.style.opacity = n ? String(.8 * (1 - s)) : "0";
		});
		return i.remove(), o;
	});
}
// src/effects/window/fold.ts
var qe = (e) => Math.min(1, Math.max(0, e)), Je = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, Ye = (e) => e * e;
async function Xe(e, t, n, r) {
	let i = pe(e), { width: a, height: o } = i;
	i.element.style.perspective = `${Math.round(Math.max(a, o) * 2.2)}px`;
	let s = t ? Math.max(2, Math.min(4, Math.round(o / 70))) : 2, c = o / s, l = [], u = i.element;
	for (let e = 0; e < s; e++) {
		let t = document.createElement("div");
		t.className = "iro-fold-hinge", t.style.transformOrigin = `50% ${(e * c).toFixed(2)}px`;
		let n = document.createElement("div");
		n.className = "iro-fold-face", n.style.clipPath = `inset(${(e * c).toFixed(2)}px 0 ${(o - (e + 1) * c).toFixed(2)}px 0)`;
		let r = document.createElement("div");
		r.className = "iro-fold-light", n.append(i.copy(), r), t.appendChild(n), u.appendChild(t), u = t, l.push({
			hinge: t,
			light: r,
			way: e % 2 == 0 ? 1 : -1
		});
	}
	let d = t ? 84 : 78, f = await j(e, (t ? 1100 : 650) / n, (n) => {
		let a = r ? n : 1 - n;
		e.style.opacity = "0";
		let s = d * Je(qe(a / (t ? .72 : .8))), c = t ? Ye(qe((a - .68) / .32)) : qe((a - .7) / .3), u = Math.sin(s * Math.PI / 180);
		l.forEach((e, t) => {
			let n = t === 0 ? s : -2 * s * l[t - 1].way;
			e.hinge.style.transform = `rotateX(${n.toFixed(2)}deg)`, e.light.style.background = e.way > 0 ? "black" : "white", e.light.style.opacity = (e.way > 0 ? .3 * u : .1 * u).toFixed(3);
		});
		let f = o * (1 - Math.cos(s * Math.PI / 180)) / 2;
		i.element.style.transform = `translateY(${(f - 28 * c).toFixed(1)}px) scale(${(1 - .12 * c).toFixed(4)})`, i.element.style.opacity = (1 - c).toFixed(3);
	});
	return i.remove(), f;
}
function Ze(e, t = {}) {
	return M(e, "close", t, (t, n) => Xe(e, t, n, !0));
}
function Qe(e, t = {}) {
	return M(e, "open", t, (t, n) => Xe(e, t, n, !1));
}
// src/effects/window/genie.ts
var X = 32, $e = 0, et = (e) => Math.min(1, Math.max(0, e)), tt = (e, t, n) => e + (t - e) * n, nt = (e) => e * e * e, rt = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, it = (e) => e === "top" || e === "bottom";
function at(e, t) {
	let n = t.left + t.width / 2, r = t.top + t.height / 2, i = (n - (e.left + e.width / 2)) / e.width, a = (r - (e.top + e.height / 2)) / e.height;
	return Math.abs(a) >= Math.abs(i) ? {
		side: a >= 0 ? "bottom" : "top",
		focus: et((n - e.left) / e.width)
	} : {
		side: i >= 0 ? "right" : "left",
		focus: et((r - e.top) / e.height)
	};
}
function ot(e, t) {
	let n = document.createElement("canvas");
	n.width = n.height = X;
	let r = n.getContext("2d"), i = r?.createImageData(X, X), a = Math.max(t, 1 - t, .01);
	for (let n = 0; i && n < X; n++) for (let r = 0; r < X; r++) {
		let o = r / 31, s = n / 31, c = {
			bottom: s,
			top: 1 - s,
			right: o,
			left: 1 - o
		}[e], l = ((it(e) ? o : s) - t) / a, u = Math.round(255 * (.5 + .5 * l * c * c)), d = (n * X + r) * 4;
		i.data.set(it(e) ? [
			u,
			128,
			0,
			255
		] : [
			128,
			u,
			0,
			255
		], d);
	}
	r && i && r.putImageData(i, 0, 0);
	let o = `iro-genie-${++$e}`;
	document.body.insertAdjacentHTML("beforeend", `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <filter id="${o}" x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB">
        <feImage href="${n.toDataURL()}" preserveAspectRatio="none" result="map" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="0" xChannelSelector="R" yChannelSelector="G" />
        <feGaussianBlur stdDeviation="0" />
      </filter>
    </svg>`);
	let s = document.body.lastElementChild;
	return {
		id: o,
		map: s.querySelector("feDisplacementMap"),
		blur: s.querySelector("feGaussianBlur"),
		remove: () => s.remove()
	};
}
function st(e, t, { side: n, focus: r, box: i, target: a, bend: o, map: s, blur: c, filter: l }) {
	let u = rt(et(t / .6)), d = nt(et((t - .25) / .75)), f = it(n), p = f ? i.height : i.width, m = f ? i.width : i.height, h = {
		bottom: [i.left + r * i.width, i.bottom],
		top: [i.left + r * i.width, i.top],
		right: [i.right, i.top + r * i.height],
		left: [i.left, i.top + r * i.height]
	}[n], g = (a.left + a.width / 2 - h[0]) * d, _ = (a.top + a.height / 2 - h[1]) * d, v = tt(1, Math.max(4 / p, .02), d) * tt(1, .82, u), y = tt(1, Math.max((f ? a.width : a.height) / m, .04), d), b = `${f ? `${(r * 100).toFixed(2)}%` : n === "left" ? "0%" : "100%"} ${f ? n === "top" ? "0%" : "100%" : `${(r * 100).toFixed(2)}%`}`;
	e.style.transformOrigin = b, e.style.transform = `translate(${g.toFixed(1)}px, ${_.toFixed(1)}px) scale(${(f ? y : v).toFixed(4)}, ${(f ? v : y).toFixed(4)})`, e.style.filter = l, e.style.opacity = String(1 - et((t - .8) / .2)), s.setAttribute("scale", (o * u).toFixed(1)), c.setAttribute("stdDeviation", (.8 * u).toFixed(2));
}
function ct(e) {
	return e instanceof Element ? e.getBoundingClientRect() : e ?? new DOMRect(innerWidth / 2 - 24, innerHeight - 12, 48, 8);
}
function lt(e, t, n) {
	let r = e.getBoundingClientRect(), i = ct(n.target), { side: o, focus: s } = at(r, i), { id: c, map: l, blur: u, remove: d } = ot(o, s);
	return {
		setup: {
			side: o,
			focus: s,
			box: r,
			target: i,
			bend: (it(o) ? r.width : r.height) * (t ? 2.2 : 1.1) * a(n.bend, 1, 0, 2),
			map: l,
			blur: u,
			filter: `url(#${c})`
		},
		remove: d
	};
}
function ut(e, t = {}) {
	return M(e, "close", t, async (n, r) => {
		let { setup: i, remove: a } = lt(e, n, t), o = await j(e, (n ? 640 : 440) / r, (t) => st(e, t, i));
		return a(), o;
	});
}
function dt(e, t = {}) {
	return M(e, "open", t, async (n, r) => {
		let { setup: i, remove: a } = lt(e, n, t), o = await j(e, (n ? 580 : 420) / r, (t) => st(e, 1 - t, i));
		return a(), o;
	});
}
// src/effects/window/ink-bleed.ts
var ft = 0, pt = (e) => Math.min(1, Math.max(0, e)), mt = (e, t, n) => {
	let r = pt((n - e) / (t - e));
	return r * r * (3 - 2 * r);
};
function ht([e, t, n]) {
	let r = `iro-ink-${++ft}`, i = Math.floor(Math.random() * 999);
	document.body.insertAdjacentHTML("beforeend", `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <filter id="${r}" x="-12%" y="-12%" width="124%" height="140%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.03 0.005" numOctaves="3" seed="${i}" />
        <feComponentTransfer result="flow"><feFuncG type="linear" slope="0.6" intercept="0.08" /></feComponentTransfer>
        <feDisplacementMap in="SourceGraphic" in2="flow" scale="0" xChannelSelector="R" yChannelSelector="G" />
        <feGaussianBlur stdDeviation="0" />
        <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" result="wet" />
        <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed="${i + 7}" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1.6 0 0 0 -0.3" result="depth" />
        <feComponentTransfer in="depth" result="keep"><feFuncA type="linear" slope="9" intercept="9" /></feComponentTransfer>
        <feComponentTransfer in="depth" result="reach"><feFuncA type="linear" slope="9" intercept="9" /></feComponentTransfer>
        <feComposite in="reach" in2="keep" operator="out" result="edge" />
        <feFlood flood-color="rgb(${e} ${t} ${n})" flood-opacity="0" />
        <feComposite in2="edge" operator="in" />
        <feComposite in2="wet" operator="in" result="rim" />
        <feComposite in="wet" in2="keep" operator="in" result="pools" />
        <feMerge><feMergeNode in="pools" /><feMergeNode in="rim" /></feMerge>
      </filter>
    </svg>`);
	let a = document.body.lastElementChild, o = a.querySelector("feDisplacementMap"), s = a.querySelector("feGaussianBlur"), c = a.querySelector("feColorMatrix[result=\"wet\"]"), [l, u] = [...a.querySelectorAll("feComponentTransfer[in] feFuncA")], d = a.querySelector("feFlood");
	return {
		filter: `url(#${r})`,
		set: (r, i, a, f, p) => {
			o.setAttribute("scale", r.toFixed(1)), s.setAttribute("stdDeviation", i.toFixed(2));
			let m = (1 - a).toFixed(3), h = (e) => (e / 255 * a).toFixed(3);
			c.setAttribute("values", `${m} 0 0 0 ${h(e)} 0 ${m} 0 0 ${h(t)} 0 0 ${m} 0 ${h(n)} 0 0 0 1 0`);
			let g = 9 - 18 * f;
			l.setAttribute("intercept", g.toFixed(2)), u.setAttribute("intercept", (g + 1.1).toFixed(2)), d.setAttribute("flood-opacity", p.toFixed(3));
		},
		remove: () => a.remove()
	};
}
async function gt(e, n, r, i, a) {
	let [o, s, c] = t(e, "var(--iro-bg)"), l = .2126 * o + .7152 * s + .0722 * c < 128, u = l ? "color-mix(in oklab, var(--iro-accent) 55%, var(--iro-bg))" : "color-mix(in oklab, var(--iro-fg) 80%, var(--iro-accent))", d = ht(t(e, a.color ?? u)), f = await j(e, (n ? 1250 : 800) / r, (t) => {
		let r = i ? t : 1 - t, a = mt(0, 1, r);
		d.set((n ? 70 : 30) * a * a, (n ? 1.4 : .9) * a, (l ? .32 : .18) * mt(0, .6, r), mt(.18, .96, r), .85 * mt(.12, .3, r) * (1 - mt(.8, 1, r))), e.style.opacity = "1", e.style.filter = d.filter;
	});
	return d.remove(), f;
}
function _t(e, t = {}) {
	return M(e, "close", t, (n, r) => gt(e, n, r, !0, t));
}
function vt(e, t = {}) {
	return M(e, "open", t, (n, r) => gt(e, n, r, !1, t));
}
// src/effects/window/ripple.ts
var Z = 360, yt = .86, bt = null, xt = 0, St = (e) => Math.min(1, Math.max(0, e)), Ct = (e, t, n) => {
	let r = St((n - e) / (t - e));
	return r * r * (3 - 2 * r);
};
function wt(e) {
	let t = e - yt;
	return (t > 0 ? Math.exp(-((t / .06) ** 2)) : Math.exp(-((t / .4) ** 2)) * (.3 + .7 * e)) * Math.cos(2 * Math.PI * t / .16);
}
function Tt() {
	if (bt) return bt;
	let e = document.createElement("canvas");
	e.width = e.height = Z;
	let t = e.getContext("2d"), n = t?.createImageData(Z, Z);
	if (!t || !n) return "";
	let r = Z / 2, i = 1 / r, a = 0, o = new Float32Array(Z * Z);
	for (let e = 0; e < Z * Z; e++) {
		let t = Math.hypot(e % Z + .5 - r, Math.floor(e / Z) + .5 - r) / r;
		o[e] = (wt(t + i) - wt(t - i)) / (2 * i), a = Math.max(a, Math.abs(o[e]));
	}
	for (let e = 0; e < Z * Z; e++) {
		let t = e % Z + .5 - r, i = Math.floor(e / Z) + .5 - r, s = Math.hypot(t, i) / r, c = o[e] / a, l = s > 0 ? 1 / (s * r) : 0;
		n.data.set([
			Math.round(128 + 127 * c * t * l),
			Math.round(128 + 127 * c * i * l),
			Math.round(128 + 127 * wt(s)),
			255
		], e * 4);
	}
	return t.putImageData(n, 0, 0), bt = e.toDataURL(), bt;
}
function Et() {
	let e = `iro-ripple-${++xt}`, t = Tt();
	document.body.insertAdjacentHTML("beforeend", `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <filter id="${e}" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
        <feFlood flood-color="rgb(128 128 128)" result="calm" />
        <feImage href="${t}" preserveAspectRatio="none" />
        <feComposite in2="calm" operator="over" result="first" />
        <feImage href="${t}" preserveAspectRatio="none" />
        <feComposite in2="calm" operator="over" result="second" />
        <feComposite in="first" in2="second" operator="arithmetic" k2="1" k3="1" k4="-0.5" result="water" />
        <feDisplacementMap in="SourceGraphic" in2="water" scale="0" xChannelSelector="R" yChannelSelector="G" result="bent" />
        <feColorMatrix in="water" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0" result="height" />
        <feDiffuseLighting in="height" surfaceScale="0" diffuseConstant="2" lighting-color="white" result="relief">
          <feDistantLight azimuth="225" elevation="30" />
        </feDiffuseLighting>
        <feComposite in="bent" in2="relief" operator="arithmetic" k1="0" k2="1" result="shaded" />
        <feSpecularLighting in="height" surfaceScale="0" specularConstant="1" specularExponent="26" lighting-color="white">
          <feDistantLight azimuth="225" elevation="30" />
        </feSpecularLighting>
        <feComposite in2="bent" operator="in" result="glint" />
        <feComposite in="shaded" in2="glint" operator="arithmetic" k2="1" k3="0" />
      </filter>
    </svg>`);
	let n = document.body.lastElementChild, r = [...n.querySelectorAll("feImage")], i = n.querySelector("feDisplacementMap"), a = n.querySelector("feSpecularLighting"), o = n.querySelector("feDiffuseLighting"), s = n.querySelector("[result=\"shaded\"]"), c = n.lastElementChild?.lastElementChild;
	return {
		filter: `url(#${e})`,
		ring: (e, t, n, i) => {
			let a = Math.max(i, .01) / yt;
			r[e].setAttribute("x", (t - a).toFixed(1)), r[e].setAttribute("y", (n - a).toFixed(1)), r[e].setAttribute("width", (i > 0 ? 2 * a : 0).toFixed(1)), r[e].setAttribute("height", (i > 0 ? 2 * a : 0).toFixed(1));
		},
		surface: (e, t) => {
			i.setAttribute("scale", e.toFixed(2)), a.setAttribute("surfaceScale", (e / 3).toFixed(2)), o.setAttribute("surfaceScale", (e / 3).toFixed(2)), s.setAttribute("k1", (.55 * t).toFixed(3)), s.setAttribute("k2", (1 - .55 * t).toFixed(3)), c.setAttribute("k3", t.toFixed(3));
		},
		remove: () => n.remove()
	};
}
async function Dt(e, t, r, i, a) {
	let o = e.getBoundingClientRect(), s = e.offsetWidth, c = e.offsetHeight, l = n(a.from, o), u = St((l.x - o.left) / o.width) * s, d = St((l.y - o.top) / o.height) * c, f = Math.max(Math.hypot(u, d), Math.hypot(s - u, d), Math.hypot(u, c - d), Math.hypot(s - u, c - d)), p = Et(), m = (e) => e <= 0 ? 0 : Math.max(18, f * 1.35 * (1 - (1 - St(e)) ** 2.2)), h = await j(e, (t ? 1450 : 900) / r, (n) => {
		let r = m(n);
		p.ring(0, u, d, r), p.ring(1, u, d, t ? .72 * m(n - .16) : 0);
		let a = (1 - n) ** .8;
		p.surface((t ? 24 : 11) * a * Ct(0, .04, n), (t ? .85 : .5) * a);
		let o = r * (.38 + .47 * n * n), s = r * (.95 + .1 * n) + 10, [c, l] = i ? ["transparent", "black"] : ["black", "transparent"];
		e.style.maskImage = `radial-gradient(circle at ${u.toFixed(1)}px ${d.toFixed(1)}px, ${c} ${o.toFixed(1)}px, ${l} ${s.toFixed(1)}px)`, e.style.filter = p.filter, e.style.opacity = "1";
	});
	return p.remove(), h;
}
function Ot(e, t = {}) {
	return M(e, "close", t, (n, r) => Dt(e, n, r, !0, t));
}
function kt(e, t = {}) {
	return M(e, "open", t, (n, r) => Dt(e, n, r, !1, t));
}
// src/effects/window/shatter.ts
var At = "http://www.w3.org/2000/svg", jt = [{
	at: .22,
	chance: .95
}, {
	at: .5,
	chance: .65
}], Mt = (e) => Math.min(1, Math.max(0, e)), Q = (e, t, n) => {
	let r = Mt((n - e) / (t - e));
	return r * r * (3 - 2 * r);
}, $ = (e, t) => e + Math.random() * (t - e), Nt = (e) => `M${e.map(([e, t]) => `${e.toFixed(1)} ${t.toFixed(1)}`).join("L")}`;
function Pt([e, t], n, r, i) {
	let a = $(-.12, .12), o = [[e, t]], s = [0], c = [], l = 0, u = 0;
	for (; l < r;) {
		let d = l + $(5, 11), f = i[c.length];
		f !== void 0 && d >= f && (d = f), u = u * .88 + $(-1, 1) * (d - l) * .22 + (Math.random() < .07 ? $(-2.5, 2.5) : 0), l = d;
		let p = n + l / r * a;
		o.push([e + Math.cos(p) * l - Math.sin(p) * u, t + Math.sin(p) * l + Math.cos(p) * u]), s.push(l / r), l === f && c.push(o.length - 1);
	}
	return {
		points: o,
		rings: c,
		along: s
	};
}
function Ft([e, t], n, r) {
	let i = Math.atan2(n[1] - t, n[0] - e), a = Math.atan2(r[1] - t, r[0] - e);
	for (; a <= i;) a += Math.PI * 2;
	let o = Math.hypot(n[0] - e, n[1] - t), s = Math.hypot(r[0] - e, r[1] - t), c = Math.max(2, Math.round((a - i) * (o + s) / 2 / 9)), l = $(-.07, .05), u = [n];
	for (let n = 1; n < c; n++) {
		let r = n / c, d = i + (a - i) * r, f = (o + (s - o) * r) * (1 + l * Math.sin(Math.PI * r)) + $(-1, 1);
		u.push([e + Math.cos(d) * f, t + Math.sin(d) * f]);
	}
	return u.push(r), u;
}
function It(e, t, n, r) {
	let i = [], a = [];
	return e.forEach(([o, s], c) => {
		let [l, u] = e[Math.max(0, c - 1)], [d, f] = e[Math.min(e.length - 1, c + 1)], p = Math.hypot(d - l, f - u) || 1, m = (n + (r - n) * t[c] ** .7) / 2, h = -(f - u) / p * m, g = (d - l) / p * m;
		i.push([o + h, s + g]), a.push([o - h, s - g]);
	}), `${Nt([...i, ...a.reverse()])}Z`;
}
function Lt(e, t, n) {
	let [r, i] = e, a = Math.max(Math.hypot(r, i), Math.hypot(t - r, i), Math.hypot(r, n - i), Math.hypot(t - r, n - i)), o = 8 + Math.floor(Math.random() * 3), s = Array.from({ length: o }, () => $(.55, 1.45)), c = s.reduce((e, t) => e + t, 0), l = $(0, Math.PI * 2), u = Math.min(a * .06, 16), d = s.map((t) => {
		let n = [u * $(.8, 1.2), ...jt.map((e) => a * e.at * $(.85, 1.15))], r = Pt(e, l, a * 1.5, n);
		return l += t / c * Math.PI * 2, r;
	}), f = [], p = [];
	d.forEach((t, n) => {
		let r = d[(n + 1) % o], i = t.rings.map((n, i) => Ft(e, t.points[n], r.points[r.rings[i]]));
		p.push(i[0]);
		let a = jt.map((e, t) => Math.random() < e.chance ? t + 1 : -1).filter((e) => e > 0);
		for (let e of a) p.push(i[e]);
		let s = [
			-1,
			...a,
			-1
		], c = s.length - 2;
		for (let e = 0; e <= c; e++) {
			let n = s[e], a = s[e + 1];
			f.push([
				...t.points.slice(e === 0 ? 0 : t.rings[n], (e === c ? t.points.length - 1 : t.rings[a]) + 1),
				...e === c ? [] : i[a].slice(1, -1),
				...r.points.slice(e === 0 ? 0 : r.rings[n], (e === c ? r.points.length - 1 : r.rings[a]) + 1).reverse(),
				...e === 0 ? [] : i[n].slice(1, -1).reverse()
			]);
		}
		for (let e = 0; e < 2; e++) {
			let e = Math.max(1, Math.floor($(.15, .6) * t.points.length)), [n, r] = t.points[e], [i, a] = t.points[e - 1], o = Math.atan2(r - a, n - i) + (Math.random() < .5 ? -1 : 1) * $(.35, .8), s = [[n, r]];
			for (let e = 0, t = $(14, 46); e < t; e += 6) {
				o += $(-.25, .25);
				let [e, t] = s[s.length - 1];
				s.push([e + Math.cos(o) * 6, t + Math.sin(o) * 6]);
			}
			p.push(s);
		}
	});
	for (let e = 0; e < 16; e++) {
		let e = $(0, Math.PI * 2), t = $(0, u * 1.4), n = $(0, Math.PI * 2), a = $(3, 9), o = r + Math.cos(e) * t, s = i + Math.sin(e) * t;
		p.push([[o, s], [o + Math.cos(n) * a, s + Math.sin(n) * a]]);
	}
	return {
		polygons: f,
		spokes: d,
		hairlines: p,
		reach: a,
		crushed: u
	};
}
function Rt(e, t, n, r, i) {
	let a = document.createElement("div");
	a.className = "iro-shatter-glass", a.style.clipPath = `inset(0 round ${i})`;
	let o = document.createElementNS(At, "svg");
	o.setAttribute("viewBox", `0 0 ${e} ${t}`);
	let s = r.spokes.map((e) => It(e.points, e.along, 1.7, .25)).join(""), c = r.hairlines.map(Nt).join(""), l = (e) => `<g class="iro-shatter-${e}"${e === "dark" ? " transform=\"translate(0.6 0.8)\"" : ""}><path class="iro-shatter-ribbon" d="${s}" /><path class="iro-shatter-hair" d="${c}" /></g>`;
	o.innerHTML = l("dark") + l("light");
	let u = document.createElement("div");
	u.className = "iro-shatter-frost";
	let d = r.crushed * 4;
	return Object.assign(u.style, {
		left: `${n[0] - d / 2}px`,
		top: `${n[1] - d / 2}px`,
		width: `${d}px`,
		height: `${d}px`
	}), a.append(o, u), {
		holder: a,
		draw: (e, t, i) => {
			o.style.clipPath = `circle(${(r.reach * 1.1 * e).toFixed(1)}px at ${n[0]}px ${n[1]}px)`, a.style.opacity = t.toFixed(3), u.style.opacity = i.toFixed(3);
		}
	};
}
async function zt(e, t, r, i, a) {
	let o = pe(e), { width: s, height: c, box: l } = o, u = n(a.from, l), d = [Mt((u.x - l.left) / s) * s, Mt((u.y - l.top) / c) * c], f = Lt(d, s, c);
	o.element.style.perspective = `${Math.round(Math.max(s, c) * 2.4)}px`;
	let p = [];
	for (let e of f.polygons) {
		let n = e.map(([e]) => Math.min(s, Math.max(0, e))), r = e.map(([, e]) => Math.min(c, Math.max(0, e))), i = Math.floor(Math.min(...n)), a = Math.floor(Math.min(...r)), l = Math.ceil(Math.max(...n)), u = Math.ceil(Math.max(...r));
		if (l - i < 2 || u - a < 2) continue;
		let m = document.createElement("div");
		m.className = "iro-shatter-shard", Object.assign(m.style, {
			left: `${i}px`,
			top: `${a}px`,
			width: `${l - i}px`,
			height: `${u - a}px`
		});
		let h = o.copy();
		h.style.left = `${-i}px`, h.style.top = `${-a}px`, h.style.clipPath = `polygon(${e.map(([e, t]) => `${e.toFixed(1)}px ${t.toFixed(1)}px`).join(",")})`;
		let g = document.createElement("div");
		g.className = "iro-shatter-sheen", h.appendChild(g);
		let _ = document.createElementNS(At, "svg");
		_.setAttribute("class", "iro-shatter-edge"), _.setAttribute("viewBox", `${i} ${a} ${l - i} ${u - a}`), _.innerHTML = `<path class="iro-shatter-rim" d="${Nt(e)}Z" /><path d="${Nt(e)}Z" />`, m.append(h, _), o.element.appendChild(m);
		let v = (i + l) / 2 - d[0], y = (a + u) / 2 - d[1], b = Math.hypot(v, y) || 1, x = 1 - Math.min(1, b / f.reach), S = t ? $(20, 50) + 120 * x : 8;
		p.push({
			element: m,
			edge: _,
			sheen: g,
			delay: (t ? .1 : .05) * (1 - x) + $(0, .05),
			vx: v / b * S,
			vy: y / b * S * .6 + (t ? $(-25, 10) : 0),
			vz: t ? $(30, 90) + 170 * x : 0,
			spin: $(-1, 1) * (t ? 70 : 12),
			tiltX: t ? $(-1, 1) * 170 : 0,
			tiltY: t ? $(-1, 1) * 170 : 0
		});
	}
	let { holder: m, draw: h } = Rt(s, c, d, f, getComputedStyle(e).borderRadius || "0");
	o.element.appendChild(m);
	let g = t ? .07 : .06, _ = i ? t ? .3 : .18 : t ? .16 : .1, v = t ? .78 : .42, y = t ? 2600 : 1100, b = await j(e, (_ + v) * 1e3 / r, (n) => {
		let r = (i ? n : 1 - n) * (_ + v);
		e.style.opacity = "0";
		let a = i ? 1 - (1 - Mt(r / g)) ** 3 : 1, o = i ? 1 : Q(0, _ * .85, r), s = (1 - Q(_, _ + .08, r)) * o, c = i ? .55 + .4 * (1 - Q(.01, g * 2, r)) : .55;
		h(a, s, s * c * (i ? Q(0, .012, r) : 1));
		for (let e of p) {
			let n = Math.max(0, r - _ - e.delay), i = e.vx * n, a = e.vy * n + .5 * y * n * n, o = e.tiltX * n, s = e.tiltY * n;
			e.element.style.transform = `translate3d(${i.toFixed(1)}px, ${a.toFixed(1)}px, ${(e.vz * n).toFixed(1)}px) rotateX(${o.toFixed(1)}deg) rotateY(${s.toFixed(1)}deg) rotate(${(e.spin * n).toFixed(1)}deg)`, e.element.style.opacity = (1 - Q(t ? .3 : .12, t ? .62 : .38, n)).toFixed(3);
			let c = Math.abs(Math.sin((o + s) * Math.PI / 360));
			e.sheen.style.opacity = (Q(0, .06, n) * (.25 + .75 * c)).toFixed(3), e.sheen.style.backgroundPosition = `${(50 + 50 * Math.sin(s * Math.PI / 180)).toFixed(1)}% 50%`, e.edge.style.opacity = (Q(_ - .04, _ + .02, r) * (.5 + .5 * c)).toFixed(3);
		}
	});
	return o.remove(), b;
}
function Bt(e, t = {}) {
	return M(e, "close", t, (n, r) => zt(e, n, r, !0, t));
}
function Vt(e, t = {}) {
	return M(e, "open", t, (n, r) => zt(e, n, r, !1, t));
}
export { g as bounce, y as burst, Ee as closeBlackHole, Le as closeBurn, Ge as closeCrt, Ze as closeFold, ut as closeGenie, _t as closeInkBleed, fe as closeReveal, Ot as closeRipple, Bt as closeShatter, b as flash, C as heartbeat, le as hideWindow, e as motionOf, s as mountBackdrop, De as openBlackHole, Re as openBurn, Ke as openCrt, Qe as openFold, dt as openGenie, vt as openInkBleed, de as openReveal, kt as openRipple, Vt as openShatter, S as pulse, w as shake, te as success, T as tap, r as updateBackdrop, E as wiggle };
