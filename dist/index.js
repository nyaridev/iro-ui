import { An as e, At as t, Dn as n, G as r, I as i, In as a, J as o, Lt as s, Nn as c, Ot as l, Q as u, Tn as d, Ut as f, Wn as p, Xt as m, Yn as h, _t as g, a as _, an as v, b as y, bn as b, ct as x, en as S, fn as C, ft as w, hn as ee, jn as T, kn as E, mn as D, mt as O, pn as k, q as te, r as ne, tn as re, tt as ie, u as ae, ut as oe, vn as se, vt as ce, wn as le, xn as ue, yt as de } from "./folders-vJOyoUGu.js";
import { a as fe, n as pe, t as me } from "./backdrop-BV8IFK32.js";
import { Accordion as he } from "@base-ui/react/accordion";
import { Children as ge, createContext as _e, useCallback as ve, useContext as ye, useEffect as A, useId as be, useImperativeHandle as xe, useLayoutEffect as Se, useMemo as Ce, useRef as j, useState as M } from "react";
import { Fragment as N, jsx as P, jsxs as F } from "react/jsx-runtime";
import { AlertDialog as we } from "@base-ui/react/alert-dialog";
import { Tooltip as Te } from "@base-ui/react/tooltip";
import { Slider as Ee } from "@base-ui/react/slider";
import { Autocomplete as I } from "@base-ui/react/autocomplete";
import { Avatar as De } from "@base-ui/react/avatar";
import { Menu as L } from "@base-ui/react/menu";
import { Checkbox as Oe } from "@base-ui/react/checkbox";
import { PreviewCard as ke } from "@base-ui/react/preview-card";
import { Collapsible as R } from "@base-ui/react/collapsible";
import { Switch as Ae } from "@base-ui/react/switch";
import { Popover as je } from "@base-ui/react/popover";
import { Input as Me } from "@base-ui/react/input";
import { Dialog as z } from "@base-ui/react/dialog";
import { ContextMenu as Ne } from "@base-ui/react/context-menu";
import { Separator as Pe } from "@base-ui/react/separator";
import { Drawer as Fe } from "@base-ui/react/drawer";
import { Field as Ie } from "@base-ui/react/field";
import { Menubar as Le } from "@base-ui/react/menubar";
import { Meter as Re } from "@base-ui/react/meter";
import { Select as B } from "@base-ui/react/select";
import { NavigationMenu as V } from "@base-ui/react/navigation-menu";
import { NumberField as ze } from "@base-ui/react/number-field";
import { OTPField as Be } from "@base-ui/react/otp-field";
import { Combobox as H } from "@base-ui/react/combobox";
import { Progress as Ve } from "@base-ui/react/progress";
import { Radio as He } from "@base-ui/react/radio";
import { RadioGroup as Ue } from "@base-ui/react/radio-group";
import { ScrollArea as We } from "@base-ui/react/scroll-area";
import { Tabs as Ge } from "@base-ui/react/tabs";
import { Toast as U } from "@base-ui/react/toast";
import { Toolbar as Ke } from "@base-ui/react/toolbar";
import { createPortal as qe } from "react-dom";
// src/components/shared/cx.ts
function W(...e) {
	return e.filter(Boolean).join(" ");
}
// src/components/icon/Icon.tsx
function G({ icon: e, size: t = 16, label: n, className: r, ...i }) {
	let { line: a, solid: o } = h(e, `iro-icon-${be().replace(/:/g, "")}`);
	return /* @__PURE__ */ F("svg", {
		viewBox: "0 0 24 24",
		width: t,
		height: t,
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		focusable: "false",
		role: n ? "img" : void 0,
		"aria-label": n,
		"aria-hidden": !n || void 0,
		className: W("iro-icon", r),
		"data-icon": e.name,
		...i,
		children: [/* @__PURE__ */ P("g", {
			className: "iro-icon-line",
			dangerouslySetInnerHTML: { __html: a }
		}), /* @__PURE__ */ P("g", {
			className: "iro-icon-solid",
			dangerouslySetInnerHTML: { __html: o }
		})]
	});
}
// src/components/shared/glyphs.tsx
var K = (e) => () => /* @__PURE__ */ P(G, {
	icon: e,
	size: "1em",
	className: "iro-glyph"
}), Je = K(b), Ye = K(le), Xe = K(n), q = K(C), J = K(D), Ze = K(k), Qe = K(ee), $e = K(se), et = K(f), tt = K(m), nt = K(ue), rt = K(ie), it = K(u), at = K(o), ot = K(te), st = K(p), ct = K(v), lt = K(c), ut = K(E), dt = K(e), ft = K(T), pt = K(d), mt = K(l), ht = K(r), gt = K(a), _t = K(S), vt = K(re), yt = K(s), bt = K(x), xt = K(oe), St = K(w), Ct = K(O), wt = K(ce), Tt = K(de), Et = K(t);
// src/components/accordion/Accordion.tsx
function Dt({ items: e, multiple: t = !1, value: n, defaultValue: r, onValueChange: i, className: a }) {
	return /* @__PURE__ */ P(he.Root, {
		multiple: t,
		value: n,
		defaultValue: r,
		onValueChange: i ? (e) => i(e) : void 0,
		className: W("iro-accordion", a),
		children: e.map((e) => /* @__PURE__ */ F(he.Item, {
			value: e.value,
			disabled: e.disabled,
			className: "iro-accordion-item",
			children: [/* @__PURE__ */ P(he.Header, {
				className: "iro-accordion-header",
				children: /* @__PURE__ */ F(he.Trigger, {
					className: "iro-accordion-trigger",
					children: [/* @__PURE__ */ P("span", {
						className: "iro-accordion-title",
						children: e.title
					}), /* @__PURE__ */ P(q, {})]
				})
			}), /* @__PURE__ */ P(he.Panel, {
				className: "iro-accordion-panel",
				children: /* @__PURE__ */ P("div", {
					className: "iro-accordion-body",
					children: e.content
				})
			})]
		}, e.value))
	});
}
// src/root/IroRoot.tsx
var Ot = _e(null);
function Y() {
	return ye(Ot);
}
function kt({ styleName: e, theme: t, accent: n, motion: r, className: i, children: a, ...o }) {
	let [s, c] = M(null);
	return /* @__PURE__ */ F("div", {
		"data-iro-style": e,
		"data-iro-theme": t,
		"data-iro-accent": n,
		"data-iro-motion": r,
		className: ["iro-root", i].filter(Boolean).join(" "),
		...o,
		children: [/* @__PURE__ */ P(Ot, {
			value: s,
			children: a
		}), /* @__PURE__ */ P("div", {
			ref: c,
			className: "iro-root-layer"
		})]
	});
}
// src/components/spinner/Spinner.tsx
var At = /* @__PURE__ */ F("svg", {
	viewBox: "0 0 24 24",
	fill: "none",
	"aria-hidden": "true",
	children: [/* @__PURE__ */ P("circle", {
		cx: "12",
		cy: "12",
		r: "9",
		stroke: "currentColor",
		strokeOpacity: "0.25",
		strokeWidth: "2.5"
	}), /* @__PURE__ */ P("path", {
		d: "M21 12a9 9 0 0 0-9-9",
		stroke: "currentColor",
		strokeWidth: "2.5",
		strokeLinecap: "round"
	})]
});
function jt({ label: e, className: t, ...n }) {
	return e ? /* @__PURE__ */ P("span", {
		className: W("iro-spinner", t),
		role: "status",
		"aria-label": e,
		...n,
		children: At
	}) : /* @__PURE__ */ P("span", {
		className: W("iro-spinner", t),
		"aria-hidden": "true",
		...n,
		children: At
	});
}
// src/components/button/Button.tsx
function X({ variant: e = "secondary", size: t = "md", icon: n, iconEnd: r, loading: i = !1, pressed: a, disabled: o, type: s = "button", className: c, children: l, ...u }) {
	return /* @__PURE__ */ F("button", {
		type: s,
		disabled: o || i,
		"aria-pressed": a,
		"aria-busy": i || void 0,
		"data-variant": e,
		"data-size": t,
		className: W("iro-button", c),
		...u,
		children: [
			i ? /* @__PURE__ */ P(jt, {}) : n,
			l,
			r
		]
	});
}
// src/components/alert-dialog/AlertDialog.tsx
function Mt({ title: e, description: t, confirmLabel: n, cancelLabel: r = "Cancel", onConfirm: i, tone: a = "danger", trigger: o, open: s, onOpenChange: c, className: l }) {
	let u = Y(), [d, f] = M(!1), [p, m] = M(!1), h = (e) => {
		f(e), c?.(e);
	};
	return /* @__PURE__ */ F(we.Root, {
		open: s ?? d,
		onOpenChange: (e) => p || h(e),
		children: [o ? /* @__PURE__ */ P(we.Trigger, { render: o }) : null, /* @__PURE__ */ F(we.Portal, {
			container: u,
			children: [/* @__PURE__ */ P(we.Backdrop, { className: "iro-dialog-backdrop" }), /* @__PURE__ */ F(we.Popup, {
				className: W("iro-dialog", "iro-alert-dialog", l),
				"data-size": "sm",
				children: [
					/* @__PURE__ */ P(we.Title, {
						className: "iro-dialog-title iro-alert-dialog-title",
						children: e
					}),
					t ? /* @__PURE__ */ P(we.Description, {
						className: "iro-alert-dialog-description",
						children: t
					}) : null,
					/* @__PURE__ */ F("footer", {
						className: "iro-alert-dialog-actions",
						children: [/* @__PURE__ */ P(we.Close, { render: /* @__PURE__ */ P(X, {
							disabled: p,
							children: r
						}) }), /* @__PURE__ */ P(X, {
							variant: a === "danger" ? "danger" : "primary",
							loading: p,
							onClick: () => {
								let e = i();
								if (!(e instanceof Promise)) return h(!1);
								m(!0), e.then(() => {
									m(!1), h(!1);
								}, (e) => {
									m(!1), reportError(e);
								});
							},
							children: n
						})]
					})
				]
			})]
		})]
	});
}
// src/components/kbd/Kbd.tsx
function Nt({ className: e, ...t }) {
	return /* @__PURE__ */ P("kbd", {
		className: W("iro-kbd", e),
		...t
	});
}
// src/components/tooltip/Tooltip.tsx
var Pt = 6;
function Ft({ content: e, children: t, side: n = "top", delay: r = 500, disabled: i, className: a }) {
	let o = Y();
	return /* @__PURE__ */ F(Te.Root, {
		disabled: i,
		children: [/* @__PURE__ */ P(Te.Trigger, {
			delay: r,
			render: t
		}), /* @__PURE__ */ P(Te.Portal, {
			container: o,
			children: /* @__PURE__ */ P(Te.Positioner, {
				side: n,
				sideOffset: Pt,
				className: "iro-positioner",
				children: /* @__PURE__ */ P(Te.Popup, {
					className: W("iro-popup", "iro-tooltip", a),
					children: e
				})
			})
		})]
	});
}
// src/components/icon-button/IconButton.tsx
function Z({ icon: e, label: t, shortcut: n, tooltip: r = !0, variant: i = "ghost", size: a = "md", active: o, loading: s = !1, disabled: c, type: l = "button", className: u, ...d }) {
	let f = /* @__PURE__ */ P("button", {
		type: l,
		"aria-label": t,
		"aria-pressed": o,
		"aria-busy": s || void 0,
		disabled: c || s,
		"data-variant": i,
		"data-size": a,
		className: W("iro-icon-button", u),
		...d,
		children: s ? /* @__PURE__ */ P(jt, {}) : e
	});
	return r ? /* @__PURE__ */ P(Ft, {
		content: /* @__PURE__ */ F(N, { children: [t, n ? /* @__PURE__ */ P(Nt, { children: n }) : null] }),
		children: f
	}) : f;
}
// src/components/app-sidebar/AppSidebar.tsx
function It({ item: e, current: t, collapsed: n }) {
	let r = /* @__PURE__ */ F(N, { children: [
		/* @__PURE__ */ P("span", {
			className: "iro-app-sidebar-icon",
			children: e.icon
		}),
		/* @__PURE__ */ P("span", {
			className: "iro-app-sidebar-label",
			children: e.label
		}),
		e.badge === void 0 ? null : /* @__PURE__ */ P("span", {
			className: "iro-app-sidebar-badge",
			children: e.badge
		})
	] }), i = {
		className: "iro-app-sidebar-item",
		"aria-current": t ? "page" : void 0
	}, a = e.href ? /* @__PURE__ */ P("a", {
		...i,
		href: e.href,
		onClick: e.onClick ? (t) => {
			t.preventDefault(), e.onClick?.();
		} : void 0,
		children: r
	}) : /* @__PURE__ */ P("button", {
		type: "button",
		...i,
		onClick: e.onClick,
		children: r
	});
	return n ? /* @__PURE__ */ P(Ft, {
		content: e.label,
		side: "right",
		delay: 0,
		children: a
	}) : a;
}
function Lt({ sections: e, current: t, header: n, footer: r, collapsed: a = !1, onCollapsedChange: o, collapseLabel: s = "Fold the sidebar", className: c, "aria-label": l = "Main", ...u }) {
	return /* @__PURE__ */ F("nav", {
		"aria-label": l,
		"data-collapsed": a || void 0,
		className: W("iro-app-sidebar", c),
		...u,
		children: [
			n ? /* @__PURE__ */ P("div", {
				className: "iro-app-sidebar-header",
				children: n
			}) : null,
			/* @__PURE__ */ P("div", {
				className: "iro-app-sidebar-sections",
				children: e.map((e, n) => /* @__PURE__ */ F("div", {
					className: "iro-app-sidebar-section",
					children: [e.title ? /* @__PURE__ */ P("span", {
						className: "iro-app-sidebar-title",
						children: e.title
					}) : null, /* @__PURE__ */ P("ul", { children: e.items.map((e) => /* @__PURE__ */ P("li", { children: /* @__PURE__ */ P(It, {
						item: e,
						current: e.id === t,
						collapsed: a
					}) }, e.id)) })]
				}, e.title ?? n))
			}),
			r || o ? /* @__PURE__ */ F("div", {
				className: "iro-app-sidebar-footer",
				children: [r, o ? /* @__PURE__ */ P(Z, {
					size: "sm",
					icon: /* @__PURE__ */ P(G, { icon: i }),
					label: s,
					active: a,
					onClick: () => o(!a),
					className: "iro-app-sidebar-fold"
				}) : null]
			}) : null
		]
	});
}
// src/components/progress-ring/ProgressRing.tsx
var Rt = 8, zt = 2 * Math.PI * Rt;
function Bt({ value: e, size: t = 20, label: n, className: r }) {
	let i = Math.min(Math.max(e, 0), 1), a = n ? {
		role: "progressbar",
		"aria-label": n,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-valuenow": Math.round(i * 100)
	} : { "aria-hidden": !0 };
	return /* @__PURE__ */ P("span", {
		...a,
		className: W("iro-progress-ring", r),
		style: { "--ring-gap": zt * (1 - i) },
		children: /* @__PURE__ */ F("svg", {
			viewBox: "0 0 20 20",
			width: t,
			height: t,
			"aria-hidden": "true",
			children: [/* @__PURE__ */ P("circle", {
				className: "iro-progress-ring-track",
				cx: "10",
				cy: "10",
				r: Rt
			}), /* @__PURE__ */ P("circle", {
				className: "iro-progress-ring-fill",
				cx: "10",
				cy: "10",
				r: Rt,
				strokeDasharray: zt
			})]
		})
	});
}
// src/components/attachment/bytes.ts
var Vt = [
	"B",
	"KB",
	"MB",
	"GB",
	"TB"
];
function Ht(e) {
	let t = Math.max(0, e), n = 0;
	for (; t >= 1e3 && n < Vt.length - 1;) t /= 1e3, n += 1;
	return `${n === 0 || t >= 10 ? Math.round(t) : Math.round(t * 10) / 10} ${Vt[n]}`;
}
// src/components/attachment/Attachment.tsx
function Ut({ name: e, size: t, kind: n, preview: r, icon: i, status: a, progress: o = 0, onRemove: s, removeLabel: c, className: l }) {
	let u = a === "error" ? "Upload failed" : [n, t === void 0 ? "" : Ht(t)].filter(Boolean).join(" · ");
	return /* @__PURE__ */ F("div", {
		"data-status": a,
		className: W("iro-attachment", l),
		children: [
			/* @__PURE__ */ F("span", {
				className: "iro-attachment-thumb",
				children: [r ? /* @__PURE__ */ P("img", {
					src: r,
					alt: ""
				}) : i ?? /* @__PURE__ */ P(G, { icon: y }), a === "uploading" ? /* @__PURE__ */ P("span", {
					className: "iro-attachment-progress",
					children: /* @__PURE__ */ P(Bt, {
						value: o,
						size: 22,
						label: `Uploading ${e}`
					})
				}) : null]
			}),
			/* @__PURE__ */ F("span", {
				className: "iro-attachment-text",
				children: [/* @__PURE__ */ P("span", {
					className: "iro-attachment-name",
					title: e,
					children: e
				}), u ? /* @__PURE__ */ P("span", {
					className: "iro-attachment-meta",
					children: u
				}) : null]
			}),
			s ? /* @__PURE__ */ P(Z, {
				size: "sm",
				icon: /* @__PURE__ */ P(nt, {}),
				label: c ?? `Remove ${e}`,
				tooltip: !1,
				onClick: s,
				className: "iro-attachment-remove"
			}) : null
		]
	});
}
// src/components/shared/number.ts
function Wt(e, { min: t, max: n, step: r }) {
	let i = t + Math.round((e - t) / r) * r, a = Math.min(Math.max(i, t), n), o = (String(r).split(".")[1] ?? "").length;
	return Number(a.toFixed(o));
}
function Gt(e, t) {
	let n = Number.parseFloat(e.trim().replace(",", "."));
	return Number.isFinite(n) ? Wt(n, t) : null;
}
// src/components/slider/Slider.tsx
function Kt({ value: e, defaultValue: t, onValueChange: n, onValueCommit: r, min: i = 0, max: a = 100, step: o = 1, largeStep: s, label: c, format: l = String, resetValue: u, marks: d, disabled: f, className: p, "aria-label": m }) {
	let [h, g] = M(t ?? i), [_, v] = M(!1), y = e ?? h, b = (t) => {
		e === void 0 && g(t), n?.(t);
	}, x = (e) => {
		b(e), r?.(e);
	}, S = (e) => {
		v(!1);
		let t = Gt(e, {
			min: i,
			max: a,
			step: o
		});
		t !== null && x(t);
	}, C = (e) => {
		e.key === "Enter" && S(e.currentTarget.value), e.key === "Escape" && v(!1);
	}, w = (e) => (e - i) / (a - i) * 100;
	return /* @__PURE__ */ F(Ee.Root, {
		value: y,
		onValueChange: (e) => b(e),
		onValueCommitted: (e) => r?.(e),
		min: i,
		max: a,
		step: o,
		largeStep: s,
		disabled: f,
		className: W("iro-slider", p),
		children: [c ? /* @__PURE__ */ F("div", {
			className: "iro-slider-header",
			children: [/* @__PURE__ */ P(Ee.Label, {
				className: "iro-slider-label",
				children: c
			}), _ ? /* @__PURE__ */ P("input", {
				ref: (e) => {
					e?.focus(), e?.select();
				},
				className: "iro-slider-input",
				defaultValue: String(y),
				inputMode: "decimal",
				"aria-label": "Type a value",
				onBlur: (e) => S(e.currentTarget.value),
				onKeyDown: C
			}) : /* @__PURE__ */ P("button", {
				type: "button",
				className: "iro-slider-value",
				disabled: f,
				onClick: () => v(!0),
				"aria-label": `${l(y)}, click to type a value`,
				children: l(y)
			})]
		}) : null, /* @__PURE__ */ P(Ee.Control, {
			className: "iro-slider-control",
			onDoubleClick: u === void 0 || f ? void 0 : () => x(u),
			children: /* @__PURE__ */ F(Ee.Track, {
				className: "iro-slider-track",
				children: [
					d?.map((e) => /* @__PURE__ */ P("span", {
						className: "iro-slider-mark",
						style: { left: `${w(e)}%` },
						"aria-hidden": "true"
					}, e)),
					/* @__PURE__ */ P(Ee.Indicator, { className: "iro-slider-indicator" }),
					/* @__PURE__ */ P(Ee.Thumb, {
						className: "iro-slider-thumb",
						"aria-label": c ? void 0 : m
					})
				]
			})
		})]
	});
}
// src/components/audio-player/clock.ts
function qt(e) {
	let t = Number.isFinite(e) && e > 0 ? Math.floor(e) : 0, n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = String(t % 60).padStart(2, "0");
	return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${i}` : `${r}:${i}`;
}
// src/components/audio-player/AudioPlayer.tsx
function Jt({ src: e, title: t, subtitle: n, onTimeUpdate: r, audioRef: i, className: a }) {
	let o = j(null), [s, c] = M(!1), [l, u] = M(0), [d, f] = M(0), [p, m] = M(!1);
	return xe(i, () => o.current, []), /* @__PURE__ */ F("div", {
		"data-playing": s || void 0,
		className: W("iro-audio-player", a),
		children: [
			/* @__PURE__ */ P("audio", {
				ref: o,
				src: e,
				preload: "metadata",
				onPlay: () => c(!0),
				onPause: () => c(!1),
				onLoadedMetadata: (e) => f(e.currentTarget.duration),
				onDurationChange: (e) => f(e.currentTarget.duration),
				onVolumeChange: (e) => m(e.currentTarget.muted),
				onTimeUpdate: (e) => {
					u(e.currentTarget.currentTime), r?.(e.currentTarget.currentTime);
				}
			}),
			/* @__PURE__ */ P(Z, {
				variant: "primary",
				icon: P(s ? St : Ct, {}),
				label: s ? "Pause" : "Play",
				tooltip: !1,
				onClick: () => o.current?.paused ? o.current.play() : o.current?.pause()
			}),
			/* @__PURE__ */ F("div", {
				className: "iro-audio-player-main",
				children: [t ? /* @__PURE__ */ F("div", {
					className: "iro-audio-player-head",
					children: [/* @__PURE__ */ P("span", {
						className: "iro-audio-player-title",
						children: t
					}), n ? /* @__PURE__ */ P("span", {
						className: "iro-audio-player-subtitle",
						children: n
					}) : null]
				}) : null, /* @__PURE__ */ F("div", {
					className: "iro-audio-player-track",
					children: [
						/* @__PURE__ */ P("span", {
							className: "iro-audio-player-time",
							children: qt(l)
						}),
						/* @__PURE__ */ P(Kt, {
							"aria-label": "Seek",
							min: 0,
							max: Number.isFinite(d) && d > 0 ? d : 1,
							step: .1,
							value: Math.min(l, d || 0),
							disabled: !d,
							onValueChange: (e) => {
								o.current && (o.current.currentTime = e), u(e);
							}
						}),
						/* @__PURE__ */ P("span", {
							className: "iro-audio-player-time",
							children: qt(d)
						})
					]
				})]
			}),
			/* @__PURE__ */ P(Z, {
				icon: P(p ? Tt : wt, {}),
				label: p ? "Unmute" : "Mute",
				size: "sm",
				onClick: () => {
					o.current && (o.current.muted = !o.current.muted);
				}
			})
		]
	});
}
// src/components/select/options.ts
function Yt(e) {
	if (!e.some((e) => e.group)) return null;
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = n.group ?? "";
		t.set(e, [...t.get(e) ?? [], n]);
	}
	return [...t].map(([e, t]) => ({
		value: e,
		items: t
	}));
}
function Xt(e, t) {
	let n = e.toLowerCase();
	return t.toLowerCase().split(/\s+/).filter(Boolean).every((e) => n.includes(e));
}
// src/components/autocomplete/Autocomplete.tsx
var Zt = 4;
function Qt({ value: e, onValueChange: t, suggestions: n, placeholder: r, start: i, emptyText: a, size: o = "md", disabled: s, invalid: c, id: l, className: u, "aria-label": d }) {
	let f = Y();
	return /* @__PURE__ */ F(I.Root, {
		items: n,
		value: e,
		onValueChange: (e) => t(e),
		filter: (e, t) => Xt(e, t),
		disabled: s,
		children: [/* @__PURE__ */ F(I.InputGroup, {
			className: W("iro-text-field", "iro-autocomplete", u),
			"data-size": o,
			"data-invalid": c || void 0,
			children: [i ? /* @__PURE__ */ P("span", {
				className: "iro-text-field-slot",
				children: i
			}) : null, /* @__PURE__ */ P(I.Input, {
				className: "iro-text-field-input",
				placeholder: r,
				id: l,
				"aria-label": d,
				"aria-invalid": c || void 0
			})]
		}), /* @__PURE__ */ P(I.Portal, {
			container: f,
			children: /* @__PURE__ */ P(I.Positioner, {
				sideOffset: Zt,
				className: "iro-positioner",
				children: /* @__PURE__ */ F(I.Popup, {
					className: "iro-popup iro-autocomplete-popup",
					children: [a ? /* @__PURE__ */ P(I.Empty, { children: /* @__PURE__ */ P("div", {
						className: "iro-popup-empty",
						children: a
					}) }) : null, /* @__PURE__ */ P(I.List, {
						className: "iro-popup-list",
						children: (e) => /* @__PURE__ */ P(I.Item, {
							value: e,
							className: "iro-option",
							children: /* @__PURE__ */ P("span", {
								className: "iro-option-label",
								children: e
							})
						}, e)
					})]
				})
			})
		})]
	});
}
// src/components/avatar/Avatar.tsx
function $t(e) {
	return e.trim().split(/\s+/).slice(0, 2).map((e) => e[0]?.toUpperCase() ?? "").join("") || "?";
}
function en({ name: e, src: t, color: n = "blue", size: r = 32, ring: i, className: a }) {
	return /* @__PURE__ */ F(De.Root, {
		role: "img",
		"aria-label": e,
		"data-ring": i || void 0,
		className: W("iro-avatar", a),
		style: {
			"--avatar-size": `${r}px`,
			"--avatar-color": `var(--iro-${n})`,
			"--avatar-ink": `var(--iro-${n}-ink)`
		},
		children: [t ? /* @__PURE__ */ P(De.Image, {
			src: t,
			alt: "",
			className: "iro-avatar-image"
		}) : null, /* @__PURE__ */ P(De.Fallback, {
			className: "iro-avatar-initials",
			"aria-hidden": "true",
			children: $t(e)
		})]
	});
}
// src/components/avatar-group/AvatarGroup.tsx
function tn({ people: e, max: t = 4, size: n = 28, label: r, className: i, style: a, ...o }) {
	let s = e.length > t + 1 ? e.slice(0, t) : e, c = e.slice(s.length), l = e.map(({ name: e }) => e).join(", ");
	return /* @__PURE__ */ F("div", {
		role: "group",
		"aria-label": r ?? l,
		className: W("iro-avatar-group", i),
		style: {
			"--avatar-size": `${n}px`,
			...a
		},
		...o,
		children: [s.map((e) => /* @__PURE__ */ P(en, {
			name: e.name,
			src: e.src,
			color: e.color,
			size: n
		}, e.name)), c.length > 0 ? /* @__PURE__ */ P(Ft, {
			content: c.map(({ name: e }) => e).join(", "),
			children: /* @__PURE__ */ F("span", {
				className: "iro-avatar-group-more",
				role: "img",
				"aria-label": `${c.length} more`,
				children: ["+", c.length]
			})
		}) : null]
	});
}
// src/components/backdrop/Backdrop.tsx
function nn({ liquid: e, aurora: t, mesh: n, spotlight: r, grid: i, paper: a, dust: o, contours: s, ink: c, className: l, ...u }) {
	let d = j(null), f = JSON.stringify({
		liquid: e,
		aurora: t,
		mesh: n,
		spotlight: r,
		grid: i,
		paper: a,
		dust: o,
		contours: s,
		ink: c
	}), p = j(f);
	return Se(() => {
		let e = d.current;
		return e ? me(e, JSON.parse(p.current)) : void 0;
	}, []), Se(() => {
		d.current && pe(d.current, JSON.parse(f));
	}, [f]), /* @__PURE__ */ P("div", {
		ref: d,
		className: W("iro-backdrop", l),
		...u
	});
}
// src/components/badge/Badge.tsx
function rn({ tone: e = "neutral", icon: t, className: n, children: r, ...i }) {
	return /* @__PURE__ */ F("span", {
		className: W("iro-badge", n),
		"data-tone": e,
		...i,
		children: [t, r]
	});
}
// src/components/banner/Banner.tsx
var an = {
	accent: null,
	info: /* @__PURE__ */ P(rt, {}),
	success: /* @__PURE__ */ P(it, {}),
	warning: /* @__PURE__ */ P(at, {}),
	danger: /* @__PURE__ */ P(ot, {})
};
function on({ tone: e = "accent", icon: t, actions: n, onDismiss: r, dismissLabel: i = "Dismiss", className: a, children: o, ...s }) {
	let c = t ?? an[e];
	return /* @__PURE__ */ F("div", {
		role: e === "danger" ? "alert" : "status",
		"data-tone": e,
		className: W("iro-banner", a),
		...s,
		children: [/* @__PURE__ */ F("div", {
			className: "iro-banner-content",
			children: [
				c ? /* @__PURE__ */ P("span", {
					className: "iro-banner-icon",
					children: c
				}) : null,
				/* @__PURE__ */ P("span", {
					className: "iro-banner-text",
					children: o
				}),
				n ? /* @__PURE__ */ P("span", {
					className: "iro-banner-actions",
					children: n
				}) : null
			]
		}), r ? /* @__PURE__ */ P(Z, {
			size: "sm",
			icon: /* @__PURE__ */ P(nt, {}),
			label: i,
			tooltip: !1,
			onClick: r
		}) : null]
	});
}
// src/components/chart/Legend.tsx
function sn({ items: e, layout: t = "inline" }) {
	return /* @__PURE__ */ P("ul", {
		className: "iro-chart-legend",
		"data-layout": t,
		children: e.map(({ name: e, color: t, kind: n, value: r, share: i }) => /* @__PURE__ */ F("li", { children: [
			/* @__PURE__ */ P("span", {
				className: "iro-chart-key",
				"data-kind": n,
				style: { "--key": t }
			}),
			/* @__PURE__ */ P("span", {
				className: "iro-chart-legend-name",
				children: e
			}),
			r === void 0 ? null : /* @__PURE__ */ P("span", {
				className: "iro-chart-legend-value",
				children: r
			}),
			i === void 0 ? null : /* @__PURE__ */ P("span", {
				className: "iro-chart-legend-share",
				children: i
			})
		] }, e))
	});
}
// src/components/chart/ChartFrame.tsx
function cn({ name: e, label: t, legend: n, legendLayout: r, table: i, className: a, children: o, ...s }) {
	return /* @__PURE__ */ F("figure", {
		className: W("iro-chart", `iro-${e}`, a),
		"aria-label": t,
		...s,
		children: [
			o,
			n && n.length > 0 ? /* @__PURE__ */ P(sn, {
				items: n,
				layout: r
			}) : null,
			/* @__PURE__ */ P("div", {
				className: "iro-chart-table",
				children: /* @__PURE__ */ F("table", { children: [
					/* @__PURE__ */ P("caption", { children: t }),
					/* @__PURE__ */ P("thead", { children: /* @__PURE__ */ P("tr", { children: i.columns.map((e, t) => /* @__PURE__ */ P("th", {
						scope: "col",
						children: e
					}, e || t)) }) }),
					/* @__PURE__ */ P("tbody", { children: i.rows.map(([e, ...t], n) => /* @__PURE__ */ F("tr", { children: [/* @__PURE__ */ P("th", {
						scope: "row",
						children: e
					}), t.map((e, t) => /* @__PURE__ */ P("td", { children: e }, t))] }, n)) })
				] })
			})
		]
	});
}
// src/components/chart/Grid.tsx
function ln({ ticks: e, y: t, gutter: n, width: r, format: i }) {
	return e.map((e) => /* @__PURE__ */ F("g", { children: [/* @__PURE__ */ P("line", {
		className: "iro-chart-grid",
		x1: n,
		x2: r,
		y1: t(e),
		y2: t(e)
	}), /* @__PURE__ */ P("text", {
		className: "iro-chart-axis",
		x: n - 8,
		y: t(e),
		textAnchor: "end",
		dominantBaseline: "central",
		children: i(e)
	})] }, e));
}
// src/components/chart/paths.ts
var Q = (e) => Math.round(e * 100) / 100;
function un(e) {
	let t = e.slice(1).map(([t, n], r) => (n - e[r][1]) / (t - e[r][0])), n = e.map((n, r) => r === 0 ? t[0] : r === e.length - 1 ? t[r - 1] : t[r - 1] * t[r] <= 0 ? 0 : (t[r - 1] + t[r]) / 2);
	return t.forEach((e, t) => {
		if (e === 0) {
			n[t] = 0, n[t + 1] = 0;
			return;
		}
		let r = n[t] / e, i = n[t + 1] / e, a = r * r + i * i;
		if (a > 9) {
			let o = 3 / Math.sqrt(a);
			n[t] = o * r * e, n[t + 1] = o * i * e;
		}
	}), n;
}
function dn(e, t = !1) {
	if (e.length === 0) return "";
	let [[n, r]] = e;
	if (!t || e.length < 3) return `M${Q(n)},${Q(r)}${e.slice(1).map(([e, t]) => `L${Q(e)},${Q(t)}`).join("")}`;
	let i = un(e), a = e.slice(1).map(([t, n], r) => {
		let [a, o] = e[r], s = (t - a) / 3;
		return `C${Q(a + s)},${Q(o + i[r] * s)} ${Q(t - s)},${Q(n - i[r + 1] * s)} ${Q(t)},${Q(n)}`;
	});
	return `M${Q(n)},${Q(r)}${a.join("")}`;
}
function fn(e, t, n = !1) {
	if (e.length === 0) return "";
	let r = e[0][0], i = e[e.length - 1][0];
	return `${dn(e, n)}L${Q(i)},${Q(t)}L${Q(r)},${Q(t)}Z`;
}
function pn(e) {
	let t = [[]];
	for (let n of e) n ? t[t.length - 1].push(n) : t[t.length - 1].length > 0 && t.push([]);
	return t.filter((e) => e.length > 0);
}
function mn(e, t, n, r, i, a) {
	let o = Math.max(0, Math.min(i, n / 2, r / 2)), [s, c] = [e + n, t + r], l = `A${Q(o)},${Q(o)} 0 0 1`;
	return a === "top" ? `M${Q(e)},${Q(c)}V${Q(t + o)}${l} ${Q(e + o)},${Q(t)}H${Q(s - o)}${l} ${Q(s)},${Q(t + o)}V${Q(c)}Z` : a === "bottom" ? `M${Q(e)},${Q(t)}H${Q(s)}V${Q(c - o)}${l} ${Q(s - o)},${Q(c)}H${Q(e + o)}${l} ${Q(e)},${Q(c - o)}Z` : `M${Q(e)},${Q(t)}H${Q(s - o)}${l} ${Q(s)},${Q(t + o)}V${Q(c - o)}${l} ${Q(s - o)},${Q(c)}H${Q(e)}Z`;
}
function hn(e, t, n, r, i) {
	let a = (r) => [e + n * Math.sin(r * 2 * Math.PI), t - n * Math.cos(r * 2 * Math.PI)], [o, s] = a(r), [c, l] = a(Math.min(i, r + .9999)), u = +(i - r > .5);
	return `M${Q(o)},${Q(s)}A${Q(n)},${Q(n)} 0 ${u} 1 ${Q(c)},${Q(l)}`;
}
// src/components/chart/Readout.tsx
var gn = 12;
function _n({ open: e, x: t, y: n = 0, width: r, title: i, rows: a }) {
	let o = t <= r / 2 ? {
		left: t + gn,
		top: n
	} : {
		right: r - t + gn,
		top: n
	};
	return /* @__PURE__ */ P("div", {
		className: "iro-chart-readout",
		role: "status",
		"data-open": e || void 0,
		style: o,
		children: e ? /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ P("span", {
			className: "iro-chart-readout-title",
			children: i
		}), a.map(({ name: e, value: t, color: n, kind: r }) => /* @__PURE__ */ F("span", {
			className: "iro-chart-readout-row",
			children: [
				/* @__PURE__ */ P("span", {
					className: "iro-chart-key",
					"data-kind": r,
					style: { "--key": n }
				}),
				/* @__PURE__ */ P("strong", { children: t }),
				/* @__PURE__ */ P("span", { children: e })
			]
		}, e))] }) : null
	});
}
// src/components/chart/scale.ts
var vn = [
	1,
	2,
	2.5,
	5,
	10
], yn = 8, bn = 7, xn = new Intl.NumberFormat(), Sn = new Intl.NumberFormat(void 0, {
	notation: "compact",
	maximumFractionDigits: 1
});
function Cn(e, t, n = 4) {
	let r = t > e ? t : e + 1, i = (r - e) / n, a = 10 ** Math.floor(Math.log10(i)), o = (vn.find((e) => e * a >= i) ?? 10) * a, s = Math.floor(e / o) * o, c = Math.ceil(r / o) * o, l = Math.max(0, -Math.floor(Math.log10(o)) + 1), u = [];
	for (let e = s; e <= c + o / 2; e += o) u.push(Number(e.toFixed(l)));
	return {
		min: s,
		max: u.at(-1) ?? c,
		ticks: u
	};
}
function wn(e) {
	let t = Math.max(Math.abs(e.min), Math.abs(e.max)) >= 1e4;
	return (e) => (t ? Sn : xn).format(e);
}
var Tn = (e) => Math.max(0, ...e.map((e) => e.length)) * bn + 10, En = (e, t) => Math.max(1, Math.ceil((Math.max(0, ...e.map((e) => e.length)) * bn + 12) / (t || 1))), Dn = (e) => xn.format(e), On = (e, t) => t ?? (e < yn ? `var(--iro-chart-${e + 1})` : "var(--iro-fg-4)"), kn = (e) => e > 0 && e < .005 ? "<1%" : `${Math.round(e * 100)}%`, An = {
	ArrowRight: 1,
	ArrowDown: 1,
	ArrowLeft: -1,
	ArrowUp: -1
};
function jn(e) {
	let [t, n] = M(null), r = (t) => Math.min(Math.max(t, 0), e - 1);
	return {
		active: t === null || t >= e ? null : t,
		setActive: n,
		keys: {
			onKeyDown(i) {
				if (e === 0) return;
				let a = An[i.key], o;
				a ? o = t === null ? 0 : r(t + a) : i.key === "Home" ? o = 0 : i.key === "End" ? o = e - 1 : i.key === "Escape" && (o = null), o !== void 0 && (i.preventDefault(), n(o));
			},
			onFocus: () => n((t) => t ?? (e > 0 ? 0 : null)),
			onBlur: () => n(null),
			onPointerLeave: () => n(null)
		}
	};
}
// src/components/chart/useWidth.ts
function Mn() {
	let e = j(null), [t, n] = M(0);
	return Se(() => {
		let t = e.current;
		if (!t) return;
		n(t.clientWidth);
		let r = new ResizeObserver(([e]) => n(Math.round(e.contentRect.width)));
		return r.observe(t), () => r.disconnect();
	}, []), [e, t];
}
// src/components/bar-chart/BarChart.tsx
var Nn = 10, Pn = 24, Fn = 24, In = 4, Ln = 2, Rn = .7, zn = 18, Bn = 14, Vn = 14, Hn = 7;
function Un(e, t, n, r, i, a) {
	let o = i(0);
	if (t) {
		let t = 0, o = e.reduce((e, t, n) => t > 0 ? n : e, -1);
		return e.flatMap((e, s) => {
			let c = Math.max(e, 0);
			if (c === 0) return [];
			let [l, u] = [i(t), i(t + c)];
			t += c;
			let d = Math.abs(u - l) - (s === o ? 0 : Ln);
			if (d <= 0) return [];
			let f = a ? "right" : "top", p = s === o ? In : 0;
			return [{
				series: s,
				d: a ? mn(l, r, d, n, p, f) : mn(r, l - d, n, d, p, f)
			}];
		});
	}
	return e.flatMap((e, t) => {
		if (e === 0) return [];
		let s = r + t * (n + Ln), c = i(e);
		return a ? [{
			series: t,
			d: mn(o, s, c - o, n, In, "right")
		}] : [{
			series: t,
			d: e > 0 ? mn(s, c, n, o - c, In, "top") : mn(s, o, n, c - o, In, "bottom")
		}];
	});
}
function Wn({ label: e, labels: t, series: n, stacked: r = !1, horizontal: i = !1, height: a = 200, format: o = Dn, ...s }) {
	let [c, l] = Mn(), { active: u, setActive: d, keys: f } = jn(t.length), p = (e) => n.map((t) => t.values[e] ?? 0), m = t.map((e, t) => p(t).reduce((e, t) => e + Math.max(t, 0), 0)), h = n.flatMap((e) => e.values).filter((e) => e !== null), g = r ? Cn(0, Math.max(0, ...m)) : Cn(Math.min(0, ...h), Math.max(0, ...h)), _ = n.map((e, t) => On(t, e.color)), v = Math.max(t.length, 1), y = (e) => e === null ? "–" : o(e), b = (e) => o(r ? m[e] : Math.max(...p(e))), x = wn(g), S = i ? 0 : Tn(g.ticks.map(x)), C = (l - S) / v, w = (e) => S + C * e, ee = r ? 1 : n.length, T = i ? Bn : Math.max(2, Math.min(Fn, (C * Rn - Ln * (ee - 1)) / ee)), E = r ? T : ee * T + Ln * (ee - 1), D = r ? Bn : n.length * 16 - Ln, O = zn + D + Vn, k = i ? v * O - Vn : a, te = k - Pn, ne = Math.max(0, ...t.map((e, t) => b(t).length)) * Hn + 8, re = (e) => Nn + (1 - (e - g.min) / (g.max - g.min)) * (te - Nn), ie = (e) => (e - g.min) / (g.max - g.min) * Math.max(0, l - ne), ae = En(t, C);
	function oe(e) {
		let n = e.currentTarget.getBoundingClientRect(), r = Math.floor(i ? (e.clientY - n.top) / O : (e.clientX - n.left - S) / (C || 1));
		d(Math.min(Math.max(r, 0), t.length - 1));
	}
	let se = u === null ? 0 : i ? ie(m[u]) : w(u) + C / 2, ce = u === null || !i ? Nn : u * O;
	return /* @__PURE__ */ P(cn, {
		name: "bar-chart",
		label: e,
		legend: n.length > 1 ? n.map(({ name: e }, t) => ({
			name: e,
			color: _[t],
			kind: "box"
		})) : void 0,
		table: {
			columns: ["", ...n.map(({ name: e }) => e)],
			rows: t.map((e, t) => [e, ...n.map((e) => y(e.values[t] ?? null))])
		},
		...s,
		children: /* @__PURE__ */ F("div", {
			ref: c,
			className: "iro-chart-plot",
			"data-horizontal": i || void 0,
			style: { height: k },
			children: [
				l > 0 ? /* @__PURE__ */ F("svg", {
					width: l,
					height: k,
					"aria-hidden": "true",
					children: [
						i ? null : /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ P(ln, {
							ticks: g.ticks,
							y: re,
							gutter: S,
							width: l,
							format: x
						}), t.map((e, t) => t % ae === 0 ? /* @__PURE__ */ P("text", {
							className: "iro-chart-axis",
							x: w(t) + C / 2,
							y: k - 6,
							textAnchor: "middle",
							children: e
						}, t) : null)] }),
						u === null ? null : i ? /* @__PURE__ */ P("rect", {
							className: "iro-bar-chart-band",
							x: 0,
							y: u * O - Vn / 2,
							width: l,
							height: O
						}) : /* @__PURE__ */ P("rect", {
							className: "iro-bar-chart-band",
							x: w(u),
							y: Nn,
							width: C,
							height: te - Nn
						}),
						t.map((e, t) => {
							let n = t * O, a = i ? Un(p(t), r, T, n + zn, ie, !0) : Un(p(t), r, T, w(t) + (C - E) / 2, re, !1);
							return /* @__PURE__ */ F("g", { children: [i ? /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ P("text", {
								className: "iro-bar-chart-row",
								x: 0,
								y: n + zn - 6,
								children: e
							}), /* @__PURE__ */ P("text", {
								className: "iro-bar-chart-tip",
								x: ie(r ? m[t] : Math.max(0, ...p(t))) + 6,
								y: n + zn + D / 2,
								children: b(t)
							})] }) : null, a.map((e) => /* @__PURE__ */ P("path", {
								className: "iro-bar-chart-bar",
								style: { color: _[e.series] },
								d: e.d
							}, e.series))] }, t);
						})
					]
				}) : null,
				/* @__PURE__ */ P("div", {
					className: "iro-chart-hit",
					role: "img",
					"aria-label": `${e}. Arrow keys read each ${i ? "row" : "bar"}.`,
					tabIndex: 0,
					onPointerMove: oe,
					onPointerDown: oe,
					...f
				}),
				/* @__PURE__ */ P(_n, {
					open: u !== null,
					x: se,
					y: ce,
					width: l,
					title: u === null ? "" : t[u],
					rows: [...n.map((e, t) => ({
						name: e.name,
						value: y(u === null ? null : e.values[u] ?? null),
						color: _[t],
						kind: "box"
					}))]
				})
			]
		})
	});
}
// src/components/branch-picker/BranchPicker.tsx
function Gn({ count: e, index: t, defaultIndex: n, onIndexChange: r, label: i = "Versions", previousLabel: a = "Previous version", nextLabel: o = "Next version", className: s }) {
	let [c, l] = M(n ?? e - 1), u = Math.max(0, Math.min(t ?? c, e - 1));
	if (e < 2) return null;
	let d = (e) => {
		l(e), r?.(e);
	};
	return /* @__PURE__ */ F("div", {
		role: "group",
		"aria-label": i,
		className: W("iro-branch-picker", s),
		children: [
			/* @__PURE__ */ P(Z, {
				size: "sm",
				icon: /* @__PURE__ */ P(Ze, {}),
				label: a,
				disabled: u === 0,
				onClick: () => d(u - 1)
			}),
			/* @__PURE__ */ F("span", {
				className: "iro-branch-picker-count",
				"aria-live": "polite",
				children: [
					u + 1,
					" / ",
					e
				]
			}),
			/* @__PURE__ */ P(Z, {
				size: "sm",
				icon: /* @__PURE__ */ P(J, {}),
				label: o,
				disabled: u === e - 1,
				onClick: () => d(u + 1)
			})
		]
	});
}
// src/components/menu/MenuEntries.tsx
function Kn({ items: e }) {
	let t = e.some((e) => e !== "separator" && e.icon), n = "";
	return e.map((e) => e === "separator" ? /* @__PURE__ */ P(L.Separator, { className: "iro-popup-separator" }, `separator-after-${n}`) : (n = e.label, /* @__PURE__ */ F(L.Item, {
		label: e.label,
		onClick: e.onSelect,
		disabled: e.disabled,
		"data-danger": e.danger || void 0,
		className: "iro-option",
		children: [
			t ? /* @__PURE__ */ P("span", {
				className: "iro-option-slot",
				children: e.icon
			}) : null,
			/* @__PURE__ */ P("span", {
				className: "iro-option-label",
				children: e.label
			}),
			e.shortcut ? /* @__PURE__ */ P("span", {
				className: "iro-option-end",
				children: e.shortcut
			}) : null
		]
	}, e.label)));
}
// src/components/menu/Menu.tsx
var qn = 4;
function Jn({ trigger: e, items: t, side: n = "bottom", align: r = "start", className: i }) {
	let a = Y();
	return /* @__PURE__ */ F(L.Root, { children: [/* @__PURE__ */ P(L.Trigger, { render: e }), /* @__PURE__ */ P(L.Portal, {
		container: a,
		children: /* @__PURE__ */ P(L.Positioner, {
			side: n,
			align: r,
			sideOffset: qn,
			className: "iro-positioner",
			children: /* @__PURE__ */ P(L.Popup, {
				className: W("iro-popup", "iro-popup-list", i),
				children: /* @__PURE__ */ P(Kn, { items: t })
			})
		})
	})] });
}
// src/components/breadcrumbs/fold.ts
function Yn(e, t) {
	let n = Math.max(2, t);
	return e.length <= n ? {
		start: e,
		folded: [],
		end: []
	} : {
		start: e.slice(0, 1),
		folded: e.slice(1, e.length - n + 1),
		end: e.slice(-(n - 1))
	};
}
// src/components/breadcrumbs/Breadcrumbs.tsx
function Xn({ item: e, current: t }) {
	let n = /* @__PURE__ */ F(N, { children: [e.icon, e.label] });
	if (t) return /* @__PURE__ */ P("span", {
		className: "iro-breadcrumbs-current",
		"aria-current": "page",
		children: n
	});
	if (e.href) {
		let { onClick: t } = e;
		return /* @__PURE__ */ P("a", {
			className: "iro-breadcrumbs-link",
			href: e.href,
			onClick: t ? (e) => {
				e.preventDefault(), t();
			} : void 0,
			children: n
		});
	}
	return e.onClick ? /* @__PURE__ */ P("button", {
		type: "button",
		className: "iro-breadcrumbs-link",
		onClick: e.onClick,
		children: n
	}) : /* @__PURE__ */ P("span", {
		className: "iro-breadcrumbs-text",
		children: n
	});
}
function Zn({ items: e, max: t = 4, moreLabel: n = "Show the hidden steps", className: r, "aria-label": i = "Breadcrumbs", ...a }) {
	let { start: o, folded: s, end: c } = Yn(e, t), l = e.at(-1), u = [
		...o.map((e) => ({
			key: e.label,
			node: /* @__PURE__ */ P(Xn, {
				item: e,
				current: e === l
			})
		})),
		...s.length > 0 ? [{
			key: "…",
			node: /* @__PURE__ */ P(Jn, {
				trigger: /* @__PURE__ */ P(Z, {
					size: "sm",
					icon: /* @__PURE__ */ P(pt, {}),
					label: n,
					tooltip: !1
				}),
				items: s.map((e) => ({
					label: e.label,
					icon: e.icon,
					onSelect: () => e.onClick ? e.onClick() : e.href && window.location.assign(e.href)
				}))
			})
		}] : [],
		...c.map((e) => ({
			key: e.label,
			node: /* @__PURE__ */ P(Xn, {
				item: e,
				current: e === l
			})
		}))
	];
	return /* @__PURE__ */ P("nav", {
		className: W("iro-breadcrumbs", r),
		"aria-label": i,
		...a,
		children: /* @__PURE__ */ P("ol", { children: u.map(({ key: e, node: t }, n) => /* @__PURE__ */ F("li", { children: [n > 0 ? /* @__PURE__ */ P("span", {
			className: "iro-breadcrumbs-separator",
			"aria-hidden": "true",
			children: /* @__PURE__ */ P(J, {})
		}) : null, t] }, e)) })
	});
}
// src/components/button-group/ButtonGroup.tsx
function Qn({ orientation: e = "horizontal", className: t, ...n }) {
	return /* @__PURE__ */ P("div", {
		role: "group",
		"data-orientation": e,
		className: W("iro-button-group", t),
		...n
	});
}
// src/components/range-calendar/calendar.ts
var $n = 864e5, er = Array.from({ length: 7 }, (e, t) => new Date(Date.UTC(2024, 0, 1 + t)).toLocaleDateString(void 0, {
	weekday: "short",
	timeZone: "UTC"
})), tr = (e) => Date.parse(`${e}T00:00:00Z`), nr = (e) => new Date(e).toISOString().slice(0, 10), rr = (e, t) => nr(tr(e) + t * $n), ir = (e, t) => Math.round((tr(t) - tr(e)) / $n);
function ar(e = /* @__PURE__ */ new Date()) {
	let t = (e) => String(e).padStart(2, "0");
	return `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`;
}
var $ = (e) => ({
	year: Number(e.slice(0, 4)),
	month: Number(e.slice(5, 7)) - 1
}), or = (e, t) => e.year === t.year && e.month === t.month;
function sr(e, t) {
	let n = new Date(Date.UTC(e.year, e.month + t, 1));
	return {
		year: n.getUTCFullYear(),
		month: n.getUTCMonth()
	};
}
function cr(e, t) {
	let n = sr($(e), t), r = new Date(Date.UTC(n.year, n.month + 1, 0)).getUTCDate();
	return nr(Date.UTC(n.year, n.month, Math.min(Number(e.slice(8)), r)));
}
function lr(e) {
	let t = Date.UTC(e.year, e.month, 1), n = (new Date(t).getUTCDay() + 6) % 7;
	return Array.from({ length: 42 }, (e, r) => nr(t + (r - n) * $n));
}
var ur = (e, t) => (/* @__PURE__ */ new Date(`${e}T00:00:00Z`)).toLocaleDateString(void 0, {
	...t,
	timeZone: "UTC"
}), dr = (e) => ur(e, {
	weekday: "long",
	day: "numeric",
	month: "long",
	year: "numeric"
}), fr = (e) => ur(`${e.year}-${String(e.month + 1).padStart(2, "0")}-01`, {
	month: "long",
	year: "numeric"
});
function pr(e, t) {
	let n = ((/* @__PURE__ */ new Date(`${t}T00:00:00Z`)).getUTCDay() + 6) % 7;
	return e === "ArrowLeft" ? rr(t, -1) : e === "ArrowRight" ? rr(t, 1) : e === "ArrowUp" ? rr(t, -7) : e === "ArrowDown" ? rr(t, 7) : e === "Home" ? rr(t, -n) : e === "End" ? rr(t, 6 - n) : e === "PageUp" || e === "PageDown" ? cr(t, e === "PageUp" ? -1 : 1) : null;
}
function mr(e, t) {
	return !e.from || e.to ? {
		from: t,
		to: ""
	} : t < e.from ? {
		from: t,
		to: e.from
	} : {
		from: e.from,
		to: t
	};
}
// src/components/calendar/Calendar.tsx
function hr({ value: e, onValueChange: t, earliest: n = "", latest: r = "", isDayDisabled: i, today: a = ar(), className: o }) {
	let [s, c] = M(() => $(e || a)), [l, u] = M(e || a), d = j(null), f = j(!1);
	A(() => {
		e && (c($(e)), u(e));
	}, [e]), A(() => {
		f.current && (f.current = !1, d.current?.querySelector(`[data-day="${l}"]`)?.focus());
	});
	let p = (e) => !!(n && e < n || r && e > r || i?.(e)), m = (e, t) => {
		let i = pr(e.key, t);
		if (!i) return;
		e.preventDefault();
		let a = n && i < n ? n : r && i > r ? r : i;
		f.current = !0, u(a), or($(a), s) || c($(a));
	}, h = fr(s), g = n ? $(n) : null, _ = r ? $(r) : null;
	return /* @__PURE__ */ F("div", {
		className: W("iro-calendar", o),
		children: [/* @__PURE__ */ F("div", {
			className: "iro-calendar-head",
			children: [
				/* @__PURE__ */ P(Z, {
					icon: /* @__PURE__ */ P(Ze, {}),
					size: "sm",
					label: "Previous month",
					tooltip: !1,
					disabled: !!(g && or(s, g)),
					onClick: () => c(sr(s, -1))
				}),
				/* @__PURE__ */ P("span", {
					className: "iro-calendar-title",
					"aria-live": "polite",
					children: h
				}),
				/* @__PURE__ */ P(Z, {
					icon: /* @__PURE__ */ P(J, {}),
					size: "sm",
					label: "Next month",
					tooltip: !1,
					disabled: !!(_ && or(s, _)),
					onClick: () => c(sr(s, 1))
				})
			]
		}), /* @__PURE__ */ F("div", {
			ref: d,
			role: "group",
			"aria-label": h,
			className: "iro-calendar-grid",
			children: [er.map((e) => /* @__PURE__ */ P("span", {
				"aria-hidden": "true",
				className: "iro-calendar-weekday",
				children: e
			}, e)), lr(s).map((n) => /* @__PURE__ */ P("div", {
				className: "iro-calendar-cell",
				children: /* @__PURE__ */ P("button", {
					type: "button",
					"data-day": n,
					"data-edge": n === e || void 0,
					"data-outside": !or($(n), s) || void 0,
					"data-today": n === a || void 0,
					tabIndex: n === l ? 0 : -1,
					disabled: p(n),
					"aria-label": dr(n),
					"aria-pressed": n === e,
					"aria-current": n === a ? "date" : void 0,
					className: "iro-calendar-day",
					onClick: () => t(n),
					onFocus: () => u(n),
					onKeyDown: (e) => m(e, n),
					children: Number(n.slice(8))
				})
			}, n))]
		})]
	});
}
// src/components/carousel/Carousel.tsx
function gr({ children: e, label: t, perView: n = 1, dots: r = !0, previousLabel: i = "Previous slide", nextLabel: a = "Next slide", className: o, style: s, ...c }) {
	let l = ge.toArray(e), u = j(null), [d, f] = M(0), p = Math.max(0, l.length - n), m = () => {
		let e = u.current, t = e?.firstElementChild;
		return t ? t.offsetWidth + Number.parseFloat(getComputedStyle(e).columnGap || "0") : 1;
	}, h = (e) => {
		let t = u.current;
		if (!t) return;
		let n = ["full", "smooth"].includes(fe(t));
		t.scrollTo({
			left: Math.min(Math.max(e, 0), p) * m(),
			behavior: n ? "smooth" : "auto"
		});
	};
	return /* @__PURE__ */ F("section", {
		"aria-roledescription": "carousel",
		"aria-label": t,
		className: W("iro-carousel", o),
		style: {
			"--carousel-per-view": n,
			...s
		},
		...c,
		children: [/* @__PURE__ */ P("div", {
			ref: u,
			tabIndex: 0,
			className: "iro-carousel-track",
			onScroll: (e) => f(Math.round(e.currentTarget.scrollLeft / m())),
			children: l.map((e, t) => /* @__PURE__ */ P("div", {
				role: "group",
				"aria-roledescription": "slide",
				"aria-label": `${t + 1} of ${l.length}`,
				className: "iro-carousel-slide",
				children: e
			}, t))
		}), /* @__PURE__ */ F("div", {
			className: "iro-carousel-controls",
			children: [
				/* @__PURE__ */ P(Z, {
					size: "sm",
					variant: "secondary",
					icon: /* @__PURE__ */ P(Ze, {}),
					label: i,
					tooltip: !1,
					disabled: d <= 0,
					onClick: () => h(d - 1)
				}),
				r ? /* @__PURE__ */ P("div", {
					className: "iro-carousel-dots",
					children: Array.from({ length: p + 1 }, (e, t) => /* @__PURE__ */ P("button", {
						type: "button",
						className: "iro-carousel-dot",
						"aria-label": `Go to slide ${t + 1}`,
						"aria-current": t === d || void 0,
						onClick: () => h(t)
					}, t))
				}) : null,
				/* @__PURE__ */ P(Z, {
					size: "sm",
					variant: "secondary",
					icon: /* @__PURE__ */ P(J, {}),
					label: a,
					tooltip: !1,
					disabled: d >= p,
					onClick: () => h(d + 1)
				})
			]
		})]
	});
}
// src/components/checkbox/Checkbox.tsx
function _r({ checked: e, defaultChecked: t, onCheckedChange: n, indeterminate: r, label: i, description: a, disabled: o, name: s, id: c, className: l, "aria-label": u }) {
	let d = /* @__PURE__ */ P(Oe.Root, {
		checked: e,
		defaultChecked: t,
		onCheckedChange: n ? (e) => n(e) : void 0,
		indeterminate: r,
		disabled: o,
		name: s,
		id: c,
		"aria-label": u,
		className: W("iro-checkbox", !i && l),
		children: /* @__PURE__ */ P(Oe.Indicator, {
			className: "iro-checkbox-indicator",
			children: P(r ? Ye : Je, {})
		})
	});
	return i ? /* @__PURE__ */ F("label", {
		className: W("iro-checkbox-label", l),
		"data-disabled": o || void 0,
		children: [d, /* @__PURE__ */ F("span", {
			className: "iro-checkbox-text",
			children: [/* @__PURE__ */ P("span", { children: i }), a ? /* @__PURE__ */ P("span", {
				className: "iro-checkbox-description",
				children: a
			}) : null]
		})]
	}) : d;
}
// src/components/chip/Chip.tsx
function vr({ icon: e, count: t, selected: n, onClick: r, onRemove: i, removeLabel: a = "Remove", size: o = "md", className: s, children: c, ...l }) {
	let u = /* @__PURE__ */ F(N, { children: [
		e,
		c,
		t == null ? null : /* @__PURE__ */ P("span", {
			className: "iro-chip-count",
			children: t
		})
	] });
	return /* @__PURE__ */ F("span", {
		className: W("iro-chip", s),
		"data-size": o,
		"data-selected": n || void 0,
		...l,
		children: [r ? /* @__PURE__ */ P("button", {
			type: "button",
			className: "iro-chip-main",
			"aria-pressed": n,
			onClick: r,
			children: u
		}) : /* @__PURE__ */ P("span", {
			className: "iro-chip-main",
			children: u
		}), i ? /* @__PURE__ */ P("button", {
			type: "button",
			className: "iro-chip-remove",
			"aria-label": a,
			onClick: i,
			children: /* @__PURE__ */ P(nt, {})
		}) : null]
	});
}
// src/components/hover-card/HoverCard.tsx
var yr = 8;
function br({ trigger: e, children: t, side: n = "bottom", align: r = "center", delay: i = 600, className: a }) {
	let o = Y();
	return /* @__PURE__ */ F(ke.Root, { children: [/* @__PURE__ */ P(ke.Trigger, {
		render: e,
		delay: i
	}), /* @__PURE__ */ P(ke.Portal, {
		container: o,
		children: /* @__PURE__ */ P(ke.Positioner, {
			side: n,
			align: r,
			sideOffset: yr,
			className: "iro-positioner",
			children: /* @__PURE__ */ P(ke.Popup, {
				className: W("iro-popup", "iro-hover-card", a),
				children: t
			})
		})
	})] });
}
// src/components/citation/Citation.tsx
function xr({ index: e, source: t, className: n }) {
	return /* @__PURE__ */ F(br, {
		delay: 300,
		className: "iro-citation-card",
		trigger: /* @__PURE__ */ P("a", {
			href: t.href,
			target: "_blank",
			rel: "noreferrer",
			"aria-label": `Source ${e}: ${t.title}`,
			className: W("iro-citation", n),
			children: e
		}),
		children: [
			t.site ? /* @__PURE__ */ P("span", {
				className: "iro-citation-site",
				children: t.site
			}) : null,
			/* @__PURE__ */ P("strong", {
				className: "iro-citation-title",
				children: t.title
			}),
			t.description ? /* @__PURE__ */ P("span", {
				className: "iro-citation-description",
				children: t.description
			}) : null
		]
	});
}
// src/components/copy-button/CopyButton.tsx
var Sr = 1200;
function Cr({ text: e, label: t = "Copy", size: n = "sm", className: r }) {
	let [i, a] = M(!1);
	return A(() => {
		if (!i) return;
		let e = setTimeout(() => a(!1), Sr);
		return () => clearTimeout(e);
	}, [i]), /* @__PURE__ */ P(Z, {
		icon: P(i ? Je : et, {}),
		label: i ? "Copied" : t,
		size: n,
		"data-copied": i || void 0,
		className: W("iro-copy-button", r),
		onClick: (t) => {
			t.stopPropagation(), navigator.clipboard.writeText(e).then(() => a(!0), () => {});
		}
	});
}
// src/components/code-block/lines.ts
function wr(e) {
	let t = e.replace(/\r\n?/g, "\n").split("\n");
	return t.length > 1 && t.at(-1) === "" && t.pop(), t;
}
// src/components/code-block/CodeBlock.tsx
function Tr({ code: e, language: t, title: n, lineNumbers: r = !1, highlight: i = [], lines: a, maxHeight: o, wrap: s = !1, copyLabel: c = "Copy code", className: l, style: u, ...d }) {
	let f = a ?? wr(e), p = new Set(i), m = n || t;
	return /* @__PURE__ */ F("figure", {
		"data-numbers": r || void 0,
		"data-wrap": s || void 0,
		className: W("iro-code-block", l),
		style: {
			"--code-digits": String(f.length).length,
			...u
		},
		...d,
		children: [m ? /* @__PURE__ */ F("figcaption", {
			className: "iro-code-block-head",
			children: [
				n ? /* @__PURE__ */ P("span", {
					className: "iro-code-block-title",
					children: n
				}) : null,
				t ? /* @__PURE__ */ P("span", {
					className: "iro-code-block-language",
					children: t
				}) : null,
				/* @__PURE__ */ P(Cr, {
					text: e,
					label: c
				})
			]
		}) : /* @__PURE__ */ P(Cr, {
			className: "iro-code-block-copy",
			text: e,
			label: c
		}), /* @__PURE__ */ P("pre", {
			className: "iro-code-block-pre",
			style: { maxHeight: o },
			tabIndex: 0,
			children: /* @__PURE__ */ P("code", { children: f.map((e, t) => /* @__PURE__ */ P("span", {
				className: "iro-code-block-line",
				"data-line": t + 1,
				"data-marked": p.has(t + 1) || void 0,
				children: e === "" ? "​" : e
			}, t)) })
		})]
	});
}
// src/components/switch/Switch.tsx
function Er({ checked: e, defaultChecked: t, onCheckedChange: n, label: r, size: i = "md", disabled: a, name: o, id: s, className: c, "aria-label": l }) {
	let u = /* @__PURE__ */ P(Ae.Root, {
		checked: e,
		defaultChecked: t,
		onCheckedChange: n ? (e) => n(e) : void 0,
		disabled: a,
		name: o,
		id: s,
		"aria-label": l,
		"data-size": i,
		className: W("iro-switch", !r && c),
		children: /* @__PURE__ */ P(Ae.Thumb, { className: "iro-switch-thumb" })
	});
	return r ? /* @__PURE__ */ F("label", {
		className: W("iro-switch-label", c),
		"data-disabled": a || void 0,
		children: [u, /* @__PURE__ */ P("span", { children: r })]
	}) : u;
}
// src/components/collapsible/Collapsible.tsx
function Dr({ title: e, summary: t, children: n, open: r, defaultOpen: i, onOpenChange: a, enabled: o, onEnabledChange: s, enabledLabel: c = "Enabled", tone: l = "surface", className: u }) {
	return /* @__PURE__ */ F(R.Root, {
		open: r,
		defaultOpen: i,
		onOpenChange: a ? (e) => a(e) : void 0,
		"data-tone": l,
		"data-off": o === !1 || void 0,
		className: W("iro-collapsible", u),
		children: [/* @__PURE__ */ F("div", {
			className: "iro-collapsible-header",
			children: [/* @__PURE__ */ F(R.Trigger, {
				className: "iro-collapsible-trigger",
				children: [
					/* @__PURE__ */ P(q, {}),
					/* @__PURE__ */ P("span", {
						className: "iro-collapsible-title",
						children: e
					}),
					t ? /* @__PURE__ */ P("span", {
						className: "iro-collapsible-summary",
						children: t
					}) : null
				]
			}), o === void 0 ? null : /* @__PURE__ */ P(Er, {
				size: "sm",
				checked: o,
				onCheckedChange: s,
				"aria-label": c
			})]
		}), /* @__PURE__ */ P(R.Panel, {
			className: "iro-collapsible-panel",
			children: /* @__PURE__ */ P("div", {
				className: "iro-collapsible-body",
				children: n
			})
		})]
	});
}
// src/components/popover/Popover.tsx
var Or = 6;
function kr({ trigger: e, title: t, children: n, side: r = "bottom", align: i = "center", open: a, onOpenChange: o, className: s }) {
	let c = Y();
	return /* @__PURE__ */ F(je.Root, {
		open: a,
		onOpenChange: o ? (e) => o(e) : void 0,
		children: [/* @__PURE__ */ P(je.Trigger, { render: e }), /* @__PURE__ */ P(je.Portal, {
			container: c,
			children: /* @__PURE__ */ P(je.Positioner, {
				side: r,
				align: i,
				sideOffset: Or,
				className: "iro-positioner",
				children: /* @__PURE__ */ F(je.Popup, {
					className: W("iro-popup", "iro-popover", s),
					children: [t ? /* @__PURE__ */ P(je.Title, {
						className: "iro-popover-title",
						children: t
					}) : null, n]
				})
			})
		})]
	});
}
// src/components/text-field/TextField.tsx
function Ar({ size: e = "md", start: t, end: n, invalid: r, className: i, style: a, ...o }) {
	return /* @__PURE__ */ F("span", {
		className: W("iro-text-field", i),
		style: a,
		"data-size": e,
		"data-invalid": r || void 0,
		children: [
			t ? /* @__PURE__ */ P("span", {
				className: "iro-text-field-slot",
				children: t
			}) : null,
			/* @__PURE__ */ P(Me, {
				className: "iro-text-field-input",
				"aria-invalid": r || void 0,
				...o
			}),
			n ? /* @__PURE__ */ P("span", {
				className: "iro-text-field-slot",
				children: n
			}) : null
		]
	});
}
// src/components/color-picker/color.ts
function jr(e) {
	let t = e.trim().replace(/^#/, "").toLowerCase();
	return /^[0-9a-f]{3}$/.test(t) ? `#${[...t].map((e) => e + e).join("")}` : /^[0-9a-f]{6}$/.test(t) ? `#${t}` : null;
}
function Mr(e) {
	let t = jr(e);
	if (!t) return null;
	let [n, r, i] = [
		1,
		3,
		5
	].map((e) => Number.parseInt(t.slice(e, e + 2), 16) / 255), a = Math.max(n, r, i), o = a - Math.min(n, r, i), s = 0;
	return o && (s = a === n ? ((r - i) / o + 6) % 6 : a === r ? (i - n) / o + 2 : (n - r) / o + 4), {
		h: s * 60,
		s: a ? o / a : 0,
		v: a
	};
}
function Nr({ h: e, s: t, v: n }) {
	let r = (r) => {
		let i = (r + e / 60) % 6, a = n - n * t * Math.max(0, Math.min(i, 4 - i, 1));
		return Math.round(a * 255).toString(16).padStart(2, "0");
	};
	return `#${r(5)}${r(3)}${r(1)}`;
}
// src/components/color-picker/ColorPicker.tsx
var Pr = `linear-gradient(to right, ${[
	0,
	60,
	120,
	180,
	240,
	300,
	360
].map((e) => `hsl(${e} 100% 50%)`).join(", ")})`, Fr = (e) => Math.min(1, Math.max(0, e)), Ir = (e) => `${Math.round(e * 100)}%`;
function Lr(e) {
	let t = e.currentTarget.getBoundingClientRect();
	return {
		x: Fr((e.clientX - t.left) / t.width),
		y: Fr((e.clientY - t.top) / t.height)
	};
}
function Rr(e) {
	return {
		onPointerDown: (t) => {
			t.currentTarget.setPointerCapture(t.pointerId);
			let { x: n, y: r } = Lr(t);
			e(n, r);
		},
		onPointerMove: (t) => {
			if (!t.currentTarget.hasPointerCapture(t.pointerId)) return;
			let { x: n, y: r } = Lr(t);
			e(n, r);
		}
	};
}
function zr(e) {
	let t = e.shiftKey ? .1 : .01;
	return e.key === "ArrowLeft" ? {
		x: -t,
		y: 0
	} : e.key === "ArrowRight" ? {
		x: t,
		y: 0
	} : e.key === "ArrowUp" ? {
		x: 0,
		y: t
	} : e.key === "ArrowDown" ? {
		x: 0,
		y: -t
	} : null;
}
function Br({ value: e, onValueChange: t, swatches: n = [], size: r = "md", disabled: i, id: a, className: o, "aria-label": s }) {
	let [c, l] = M(() => Mr(e) ?? {
		h: 0,
		s: 0,
		v: 0
	}), [u, d] = M(e);
	A(() => {
		d(e), l((t) => {
			let n = Nr(t) === e ? null : Mr(e);
			return n ? n.s === 0 ? {
				...n,
				h: t.h
			} : n : t;
		});
	}, [e]);
	let f = (e) => {
		l(e), t(Nr(e));
	}, p = Rr((e, t) => f({
		...c,
		s: e,
		v: 1 - t
	})), m = Rr((e) => f({
		...c,
		h: e * 360
	})), h = () => {
		let n = jr(u);
		n ? t(n) : d(e);
	};
	return /* @__PURE__ */ P(kr, {
		align: "start",
		className: "iro-color-picker-popup",
		trigger: /* @__PURE__ */ F("button", {
			type: "button",
			id: a,
			disabled: i,
			"aria-label": s ? `${s}: ${e}` : void 0,
			"data-size": r,
			className: W("iro-select", "iro-color-picker", o),
			children: [/* @__PURE__ */ P("span", {
				className: "iro-color-picker-swatch",
				style: { background: e }
			}), /* @__PURE__ */ P("span", {
				className: "iro-select-value",
				children: e
			})]
		}),
		children: /* @__PURE__ */ F("div", {
			className: "iro-color-picker-panel",
			style: { "--picker-hue": `hsl(${c.h} 100% 50%)` },
			children: [
				/* @__PURE__ */ P("div", {
					role: "slider",
					tabIndex: 0,
					"aria-label": "Saturation and brightness",
					"aria-valuenow": Math.round(c.s * 100),
					"aria-valuetext": `Saturation ${Ir(c.s)}, brightness ${Ir(c.v)}`,
					className: "iro-color-picker-square",
					style: { background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent), hsl(${c.h} 100% 50%)` },
					...p,
					onKeyDown: (e) => {
						let t = zr(e);
						t && (e.preventDefault(), f({
							...c,
							s: Fr(c.s + t.x),
							v: Fr(c.v + t.y)
						}));
					},
					children: /* @__PURE__ */ P("span", {
						className: "iro-color-picker-thumb",
						style: {
							left: Ir(c.s),
							top: Ir(1 - c.v),
							background: e
						}
					})
				}),
				/* @__PURE__ */ P("div", {
					role: "slider",
					tabIndex: 0,
					"aria-label": "Hue",
					"aria-valuemin": 0,
					"aria-valuemax": 360,
					"aria-valuenow": Math.round(c.h),
					className: "iro-color-picker-strip",
					style: { background: Pr },
					...m,
					onKeyDown: (e) => {
						let t = zr(e);
						t && (e.preventDefault(), f({
							...c,
							h: Math.min(360, Math.max(0, c.h + (t.x + t.y) * 360))
						}));
					},
					children: /* @__PURE__ */ P("span", {
						className: "iro-color-picker-thumb",
						style: {
							left: `${c.h / 360 * 100}%`,
							top: "50%"
						}
					})
				}),
				/* @__PURE__ */ P(Ar, {
					size: "sm",
					"aria-label": "Hex code",
					value: u,
					spellCheck: !1,
					onChange: (e) => d(e.currentTarget.value),
					onBlur: h,
					onKeyDown: (e) => e.key === "Enter" && h(),
					className: "iro-color-picker-hex"
				}),
				n.length > 0 ? /* @__PURE__ */ P("div", {
					className: "iro-color-picker-swatches",
					children: n.map((n) => /* @__PURE__ */ P("button", {
						type: "button",
						"aria-label": n,
						"aria-pressed": n.toLowerCase() === e.toLowerCase(),
						className: "iro-color-picker-preset",
						style: { background: n },
						onClick: () => t(jr(n) ?? n)
					}, n))
				}) : null
			]
		})
	});
}
// src/components/command-palette/CommandPalette.tsx
var Vr = 6, Hr = 60;
function Ur(e) {
	return [
		e.label,
		e.keywords,
		e.group,
		typeof e.hint == "string" ? e.hint : ""
	].join(" ");
}
function Wr(e, t) {
	let n = /* @__PURE__ */ new Map(), r = t.trim() ? e.filter((e) => Xt(Ur(e), t)).slice(0, Hr) : e.filter((e) => {
		let t = n.get(e.group) ?? 0;
		return n.set(e.group, t + 1), t < Vr;
	}), i = /* @__PURE__ */ new Map();
	for (let e of r) i.set(e.group, [...i.get(e.group) ?? [], e]);
	return [...i].map(([e, t]) => ({
		value: e,
		items: t
	}));
}
function Gr({ open: e, onOpenChange: t, items: n, onPick: r, placeholder: i = "Type a command or search…", emptyText: a = "Nothing matches. Try fewer letters.", label: o = "Command palette", className: s }) {
	let c = Y(), [l, u] = M(""), d = Ce(() => Wr(n, l), [n, l]), f = d.reduce((e, t) => e + t.items.length, 0);
	A(() => {
		e && u("");
	}, [e]);
	let p = (e) => {
		t(!1), r(e);
	};
	return /* @__PURE__ */ P(z.Root, {
		open: e,
		onOpenChange: (e) => t(e),
		children: /* @__PURE__ */ F(z.Portal, {
			container: c,
			children: [/* @__PURE__ */ P(z.Backdrop, { className: "iro-dialog-backdrop" }), /* @__PURE__ */ P(z.Popup, {
				"aria-label": o,
				className: W("iro-palette", s),
				children: /* @__PURE__ */ F(I.Root, {
					inline: !0,
					open: !0,
					items: d,
					filteredItems: d,
					value: l,
					onValueChange: u,
					autoHighlight: "always",
					itemToStringValue: (e) => e.label,
					children: [
						/* @__PURE__ */ F("div", {
							className: "iro-palette-search",
							children: [
								/* @__PURE__ */ P(ct, {}),
								/* @__PURE__ */ P(I.Input, {
									className: "iro-palette-input",
									placeholder: i
								}),
								/* @__PURE__ */ P(Nt, { children: "Esc" })
							]
						}),
						/* @__PURE__ */ P(I.Empty, { children: /* @__PURE__ */ P("p", {
							className: "iro-palette-empty",
							children: a
						}) }),
						/* @__PURE__ */ P(I.List, {
							className: "iro-palette-list",
							children: (e) => /* @__PURE__ */ F(I.Group, {
								items: e.items,
								className: "iro-palette-group",
								children: [/* @__PURE__ */ P(I.GroupLabel, {
									className: "iro-palette-label",
									children: e.value
								}), /* @__PURE__ */ P(I.Collection, { children: (e) => /* @__PURE__ */ F(I.Item, {
									value: e,
									className: "iro-palette-item",
									onClick: () => p(e),
									children: [
										/* @__PURE__ */ P("span", {
											className: "iro-palette-icon",
											children: e.icon ?? /* @__PURE__ */ P(J, {})
										}),
										/* @__PURE__ */ P("span", {
											className: "iro-palette-text",
											children: e.label
										}),
										e.hint ? /* @__PURE__ */ P("span", {
											className: "iro-palette-hint",
											children: e.hint
										}) : null,
										/* @__PURE__ */ P("span", {
											className: "iro-palette-keys",
											children: e.keys?.map((e) => /* @__PURE__ */ P(Nt, { children: e }, e))
										})
									]
								}, e.id) })]
							}, e.value)
						}),
						/* @__PURE__ */ F("footer", {
							className: "iro-palette-footer",
							children: [
								/* @__PURE__ */ F("span", { children: [
									/* @__PURE__ */ P(Nt, { children: "↑" }),
									" ",
									/* @__PURE__ */ P(Nt, { children: "↓" }),
									" to move"
								] }),
								/* @__PURE__ */ F("span", { children: [/* @__PURE__ */ P(Nt, { children: "Enter" }), " to open"] }),
								/* @__PURE__ */ P("span", {
									className: "iro-palette-count",
									children: f ? `${f} shown` : ""
								})
							]
						})
					]
				})
			})]
		})
	});
}
// src/components/commit/Commit.tsx
var Kr = 5, qr = 7, Jr = {
	added: "A",
	modified: "M",
	deleted: "D",
	renamed: "R"
};
function Yr(e, t) {
	let n = e + t;
	if (n === 0) return {
		added: 0,
		deleted: 0
	};
	let r = Math.min(Kr, Math.max(1, Math.ceil(Math.log10(n + 1) * 2))), i = Math.round(e / n * r);
	return {
		added: i,
		deleted: r - i
	};
}
function Xr({ hash: e, message: t, author: n, date: r, files: i, defaultOpen: a = !1, className: o }) {
	let [s, ...c] = t.trim().split("\n"), l = c.join("\n").trim(), u = i?.reduce((e, t) => e + t.additions, 0) ?? 0, d = i?.reduce((e, t) => e + t.deletions, 0) ?? 0, f = Yr(u, d);
	return /* @__PURE__ */ F("article", {
		className: W("iro-commit", o),
		children: [/* @__PURE__ */ F("div", {
			className: "iro-commit-main",
			children: [
				/* @__PURE__ */ P("p", {
					className: "iro-commit-subject",
					children: s
				}),
				l ? /* @__PURE__ */ P("p", {
					className: "iro-commit-body",
					children: l
				}) : null,
				/* @__PURE__ */ F("div", {
					className: "iro-commit-meta",
					children: [
						/* @__PURE__ */ P(en, {
							name: n.name,
							src: n.avatar,
							size: 20
						}),
						/* @__PURE__ */ P("span", {
							className: "iro-commit-author",
							children: n.name
						}),
						r ? /* @__PURE__ */ P("span", {
							className: "iro-commit-date",
							children: r
						}) : null,
						/* @__PURE__ */ F("span", {
							className: "iro-commit-hash",
							children: [/* @__PURE__ */ P("code", { children: e.slice(0, qr) }), /* @__PURE__ */ P(Cr, {
								text: e,
								label: "Copy commit hash"
							})]
						})
					]
				})
			]
		}), i && i.length > 0 ? /* @__PURE__ */ F(R.Root, {
			defaultOpen: a,
			className: "iro-commit-files",
			children: [/* @__PURE__ */ F(R.Trigger, {
				className: "iro-commit-files-trigger",
				children: [
					/* @__PURE__ */ P(q, {}),
					/* @__PURE__ */ F("span", { children: [
						i.length,
						" ",
						i.length === 1 ? "file" : "files",
						" changed"
					] }),
					/* @__PURE__ */ F("span", {
						className: "iro-commit-stat",
						children: [
							/* @__PURE__ */ F("span", {
								"data-kind": "added",
								children: ["+", u]
							}),
							/* @__PURE__ */ F("span", {
								"data-kind": "deleted",
								children: ["−", d]
							}),
							/* @__PURE__ */ P("span", {
								className: "iro-commit-blocks",
								role: "img",
								"aria-label": `${u} added, ${d} removed`,
								children: Array.from({ length: Kr }, (e, t) => /* @__PURE__ */ P("span", { "data-kind": t < f.added ? "added" : t < f.added + f.deleted ? "deleted" : void 0 }, t))
							})
						]
					})
				]
			}), /* @__PURE__ */ P(R.Panel, {
				className: "iro-commit-files-panel",
				children: /* @__PURE__ */ P("ul", {
					className: "iro-commit-file-list",
					children: i.map((e) => /* @__PURE__ */ F("li", {
						className: "iro-commit-file",
						children: [
							e.status ? /* @__PURE__ */ P("span", {
								"data-status": e.status,
								className: "iro-commit-file-status",
								title: e.status,
								children: Jr[e.status]
							}) : null,
							/* @__PURE__ */ P("span", {
								className: "iro-commit-file-path",
								children: e.path
							}),
							/* @__PURE__ */ F("span", {
								className: "iro-commit-stat",
								children: [/* @__PURE__ */ F("span", {
									"data-kind": "added",
									children: ["+", e.additions]
								}), /* @__PURE__ */ F("span", {
									"data-kind": "deleted",
									children: ["−", e.deletions]
								})]
							})
						]
					}, e.path))
				})
			})]
		}) : null]
	});
}
// src/components/confirmation/Confirmation.tsx
function Zr({ title: e, children: t, state: n = "pending", onAllow: r, onDeny: i, allowLabel: a = "Allow", denyLabel: o = "Deny", allowedText: s = "Allowed", deniedText: c = "Denied", className: l }) {
	return /* @__PURE__ */ F("section", {
		"data-state": n,
		className: W("iro-confirmation", l),
		children: [
			/* @__PURE__ */ F("header", {
				className: "iro-confirmation-head",
				children: [/* @__PURE__ */ P("span", {
					className: "iro-confirmation-icon",
					children: /* @__PURE__ */ P(at, {})
				}), /* @__PURE__ */ P("span", {
					className: "iro-confirmation-title",
					children: e
				})]
			}),
			t ? /* @__PURE__ */ P("div", {
				className: "iro-confirmation-body",
				children: t
			}) : null,
			n === "pending" ? /* @__PURE__ */ F("div", {
				className: "iro-confirmation-actions",
				children: [/* @__PURE__ */ P(X, {
					size: "sm",
					onClick: i,
					children: o
				}), /* @__PURE__ */ P(X, {
					size: "sm",
					variant: "primary",
					onClick: r,
					children: a
				})]
			}) : /* @__PURE__ */ F("div", {
				className: "iro-confirmation-answer",
				role: "status",
				children: [P(n === "allowed" ? it : nt, {}), n === "allowed" ? s : c]
			})
		]
	});
}
// src/components/context-menu/ContextMenu.tsx
function Qr({ items: e, children: t, className: n }) {
	let r = Y();
	return /* @__PURE__ */ F(Ne.Root, { children: [/* @__PURE__ */ P(Ne.Trigger, { render: t }), /* @__PURE__ */ P(Ne.Portal, {
		container: r,
		children: /* @__PURE__ */ P(Ne.Positioner, {
			className: "iro-positioner",
			children: /* @__PURE__ */ P(Ne.Popup, {
				className: W("iro-popup", "iro-popup-list", n),
				children: /* @__PURE__ */ P(Kn, { items: e })
			})
		})
	})] });
}
// src/components/conversation/Conversation.tsx
var $r = 48;
function ei(e, t) {
	e?.scrollTo({
		top: e.scrollHeight,
		behavior: t ? "smooth" : "auto"
	});
}
function ti({ busy: e = !1, latestLabel: t = "Latest", className: n, children: r, "aria-label": i = "Conversation", ...a }) {
	let o = j(null), s = j(null), c = j(!0), [l, u] = M(!1);
	return A(() => {
		let e = s.current;
		if (!e) return;
		let t = new ResizeObserver(() => {
			c.current && ei(o.current, !1);
		});
		return t.observe(e), ei(o.current, !1), () => t.disconnect();
	}, []), /* @__PURE__ */ F("div", {
		className: W("iro-conversation", n),
		children: [/* @__PURE__ */ P("div", {
			ref: o,
			role: "log",
			"aria-label": i,
			"aria-busy": e || void 0,
			tabIndex: 0,
			className: "iro-conversation-scroller",
			onScroll: (e) => {
				let t = e.currentTarget, n = t.scrollHeight - t.scrollTop - t.clientHeight <= $r;
				c.current = n, u(!n);
			},
			...a,
			children: /* @__PURE__ */ P("div", {
				ref: s,
				className: "iro-conversation-content",
				children: r
			})
		}), l ? /* @__PURE__ */ P(X, {
			size: "sm",
			icon: /* @__PURE__ */ P(ut, {}),
			className: "iro-conversation-latest",
			onClick: () => {
				c.current = !0, ei(o.current, ["full", "smooth"].includes(fe(o.current)));
			},
			children: t
		}) : null]
	});
}
// src/components/count-bubble/CountBubble.tsx
function ni({ count: e, max: t = 99, tone: n = "danger", corner: r, className: i, ...a }) {
	return e <= 0 ? null : /* @__PURE__ */ P("span", {
		"data-tone": n,
		"data-corner": r || void 0,
		className: W("iro-count-bubble", i),
		...a,
		children: e > t ? `${t}+` : e
	});
}
// src/components/counter/Counter.tsx
var ri = 700, ii = (e) => 1 - (1 - e) ** 4, ai = (e) => Math.round(e).toLocaleString();
function oi({ value: e, format: t = ai, className: n, ...r }) {
	let i = j(null), [a, o] = M(e), s = j(e), [c, l] = M(0);
	return A(() => {
		let t = s.current;
		if (e === t) return;
		let n = fe(i.current);
		if (n === "reduced" || n === "off") {
			s.current = e, o(e);
			return;
		}
		l((e) => e + 1);
		let r = performance.now(), a = 0, c = (n) => {
			let i = Math.min((n - r) / ri, 1);
			s.current = t + (e - t) * ii(i), o(s.current), i < 1 && (a = requestAnimationFrame(c));
		};
		return a = requestAnimationFrame(c), () => cancelAnimationFrame(a);
	}, [e]), /* @__PURE__ */ P("span", {
		ref: i,
		"data-bump": c > 0 || void 0,
		className: W("iro-counter", n),
		...r,
		children: t(a)
	}, c);
}
// src/components/skeleton/Skeleton.tsx
function si({ width: e, height: t, shape: n = "block", className: r, style: i, ...a }) {
	return /* @__PURE__ */ P("span", {
		"aria-hidden": "true",
		"data-iro-animate": "pulse",
		"data-shape": n,
		className: W("iro-skeleton", r),
		style: {
			width: e,
			height: t,
			...i
		},
		...a
	});
}
// src/components/data-table/rows.ts
var ci = new Intl.Collator(void 0, {
	numeric: !0,
	sensitivity: "base"
}), li = (e, t) => typeof e == "number" && typeof t == "number" ? e - t : ci.compare(String(e), String(t));
function ui(e, t, n) {
	let r = n === "asc" ? 1 : -1;
	return e.map((e, n) => ({
		row: e,
		index: n,
		key: t(e)
	})).sort((e, t) => li(e.key, t.key) * r || e.index - t.index).map(({ row: e }) => e);
}
function di(e, t) {
	return e?.column === t ? e.direction === "asc" ? {
		column: t,
		direction: "desc"
	} : null : {
		column: t,
		direction: "asc"
	};
}
function fi(e, t, n, r, i = (e) => e) {
	let a = (e, o) => i(e).flatMap((e) => {
		let i = t(e), s = r?.(e) ?? [], c = s.length > 0 && n.has(i);
		return [{
			row: e,
			key: i,
			depth: o,
			hasChildren: s.length > 0,
			open: c
		}, ...c ? a(s, o + 1) : []];
	});
	return a(e, 0);
}
// src/components/data-table/DataTable.tsx
var pi = 5, mi = {
	asc: "ascending",
	desc: "descending"
};
function hi(e, t, n) {
	let [r, i] = M(t);
	return [e === void 0 ? r : e, (e) => {
		i(e), n?.(e);
	}];
}
function gi({ label: e, columns: t, rows: n, rowKey: r, rowLabel: i = r, sort: a, defaultSort: o = null, onSortChange: s, selectable: c = !1, selected: l, onSelectedChange: u, subRows: d, defaultExpanded: f = [], empty: p = "Nothing to show.", loading: m = !1, maxHeight: h, size: g = "md", className: _, style: v, ...y }) {
	let [b, x] = hi(a, o, s), [S, C] = hi(l, [], u), [w, ee] = M(() => new Set(f)), T = t.find(({ id: e }) => e === b?.column), E = fi(n, r, w, d, (e) => b && T?.sortValue ? ui(e, T.sortValue, b.direction) : e), D = n.map(r), O = new Set(S), k = D.filter((e) => O.has(e)).length, te = t.length + +!!c, ne = t.some(({ footer: e }) => e !== void 0);
	function re(e, t) {
		C(t ? [...S, e] : S.filter((t) => t !== e));
	}
	function ie(e) {
		let t = S.filter((e) => !D.includes(e));
		C(e ? [...t, ...D] : t);
	}
	function ae(e) {
		let t = new Set(w);
		t.delete(e) || t.add(e), ee(t);
	}
	let oe;
	return oe = m ? Array.from({ length: pi }, (e, n) => /* @__PURE__ */ F("tr", { children: [c ? /* @__PURE__ */ P("td", { className: "iro-data-table-check" }) : null, t.map((e) => /* @__PURE__ */ P("td", {
		"data-align": e.align,
		children: /* @__PURE__ */ P(si, { width: e.align === "end" ? "50%" : "70%" })
	}, e.id))] }, n)) : E.length === 0 ? /* @__PURE__ */ P("tr", { children: /* @__PURE__ */ P("td", {
		className: "iro-data-table-empty",
		colSpan: te,
		children: p
	}) }) : E.map(({ row: e, key: n, depth: r, hasChildren: a, open: o }) => /* @__PURE__ */ F("tr", {
		"data-selected": O.has(n) || void 0,
		"data-depth": r || void 0,
		children: [c ? /* @__PURE__ */ P("td", {
			className: "iro-data-table-check",
			children: r === 0 ? /* @__PURE__ */ P(_r, {
				"aria-label": `Select ${i(e)}`,
				checked: O.has(n),
				onCheckedChange: (e) => re(n, e)
			}) : null
		}) : null, t.map((t, s) => /* @__PURE__ */ P("td", {
			"data-align": t.align,
			children: s === 0 && d ? /* @__PURE__ */ F("span", {
				className: "iro-data-table-tree",
				style: { "--depth": r },
				children: [a ? /* @__PURE__ */ P("button", {
					type: "button",
					className: "iro-data-table-toggle",
					"aria-expanded": o,
					"aria-label": `${o ? "Close" : "Open"} ${i(e)}`,
					onClick: () => ae(n),
					children: /* @__PURE__ */ P(J, {})
				}) : /* @__PURE__ */ P("span", { className: "iro-data-table-toggle" }), t.cell(e)]
			}) : t.cell(e)
		}, t.id))]
	}, n)), /* @__PURE__ */ P("div", {
		className: W("iro-data-table", _),
		"data-size": g,
		"data-scroll": h !== void 0 || void 0,
		style: {
			maxHeight: h,
			...v
		},
		...y,
		children: /* @__PURE__ */ F("table", {
			"aria-label": e,
			"aria-busy": m || void 0,
			children: [
				/* @__PURE__ */ P("thead", { children: /* @__PURE__ */ F("tr", { children: [c ? /* @__PURE__ */ P("th", {
					className: "iro-data-table-check",
					scope: "col",
					children: /* @__PURE__ */ P(_r, {
						"aria-label": "Select all rows",
						checked: D.length > 0 && k === D.length,
						indeterminate: k > 0 && k < D.length,
						onCheckedChange: ie
					})
				}) : null, t.map((e) => {
					let t = b?.column === e.id ? b.direction : null;
					return /* @__PURE__ */ P("th", {
						scope: "col",
						"data-align": e.align,
						style: { width: e.width },
						"aria-sort": e.sortValue ? t ? mi[t] : "none" : void 0,
						children: e.sortValue ? /* @__PURE__ */ F("button", {
							type: "button",
							className: "iro-data-table-sort",
							"data-sorted": t ?? void 0,
							onClick: () => x(di(b, e.id)),
							children: [e.header, /* @__PURE__ */ P("span", {
								className: "iro-data-table-sort-icon",
								children: P(t === "asc" ? Qe : t === "desc" ? q : $e, {})
							})]
						}) : e.header
					}, e.id);
				})] }) }),
				/* @__PURE__ */ P("tbody", { children: oe }),
				ne && !m ? /* @__PURE__ */ P("tfoot", { children: /* @__PURE__ */ F("tr", { children: [c ? /* @__PURE__ */ P("td", { className: "iro-data-table-check" }) : null, t.map((e) => /* @__PURE__ */ P("td", {
					"data-align": e.align,
					children: e.footer
				}, e.id))] }) }) : null
			]
		})
	});
}
// src/components/date-picker/DatePicker.tsx
var _i = (e) => ur(e, {
	day: "numeric",
	month: "short",
	year: "numeric"
});
function vi({ value: e, onValueChange: t, placeholder: n = "Pick a day", format: r = _i, size: i = "md", disabled: a, invalid: o, id: s, className: c, "aria-label": l, ...u }) {
	let [d, f] = M(!1);
	return /* @__PURE__ */ P(kr, {
		open: d,
		onOpenChange: f,
		align: "start",
		className: "iro-date-picker-popup",
		trigger: /* @__PURE__ */ F("button", {
			type: "button",
			id: s,
			disabled: a,
			"aria-label": l ? `${l}: ${e ? r(e) : n ?? ""}` : void 0,
			"aria-invalid": o || void 0,
			"data-size": i,
			"data-invalid": o || void 0,
			className: W("iro-select", "iro-date-picker", c),
			children: [/* @__PURE__ */ P("span", {
				className: "iro-select-lead",
				children: /* @__PURE__ */ P(G, { icon: ae })
			}), /* @__PURE__ */ P("span", {
				className: e ? "iro-select-value" : "iro-select-value iro-select-placeholder",
				children: e ? r(e) : n
			})]
		}),
		children: /* @__PURE__ */ P(hr, {
			...u,
			value: e,
			onValueChange: (e) => {
				t(e), f(!1);
			}
		})
	});
}
// src/components/dialog/Dialog.tsx
function yi({ title: e, description: t, children: n, footer: r, trigger: i, open: a, onOpenChange: o, size: s = "md", closeLabel: c = "Close", className: l }) {
	let u = Y();
	return /* @__PURE__ */ F(z.Root, {
		open: a,
		onOpenChange: o ? (e) => o(e) : void 0,
		children: [i ? /* @__PURE__ */ P(z.Trigger, { render: i }) : null, /* @__PURE__ */ F(z.Portal, {
			container: u,
			children: [/* @__PURE__ */ P(z.Backdrop, { className: "iro-dialog-backdrop" }), /* @__PURE__ */ F(z.Popup, {
				className: W("iro-dialog", l),
				"data-size": s,
				children: [
					/* @__PURE__ */ F("header", {
						className: "iro-dialog-header",
						children: [/* @__PURE__ */ P(z.Title, {
							className: "iro-dialog-title",
							children: e
						}), /* @__PURE__ */ P(z.Close, { render: /* @__PURE__ */ P(Z, {
							icon: /* @__PURE__ */ P(nt, {}),
							label: c,
							size: "sm",
							tooltip: !1
						}) })]
					}),
					t ? /* @__PURE__ */ P(z.Description, {
						className: "iro-dialog-description",
						children: t
					}) : null,
					n ? /* @__PURE__ */ P("div", {
						className: "iro-dialog-body",
						children: n
					}) : null,
					r ? /* @__PURE__ */ P("footer", {
						className: "iro-dialog-footer",
						children: r
					}) : null
				]
			})]
		})]
	});
}
// src/components/divider/Divider.tsx
function bi({ orientation: e = "horizontal", className: t }) {
	return /* @__PURE__ */ P(Pe, {
		orientation: e,
		className: W("iro-divider", t)
	});
}
// src/components/donut-chart/DonutChart.tsx
var xi = 2, Si = .12, Ci = 6;
function wi({ label: e, parts: t, centerLabel: n, centerValue: r, size: i = 160, legend: a = !0, format: o = Dn, ...s }) {
	let { active: c, setActive: l, keys: u } = jn(t.length), d = t.reduce((e, t) => e + Math.max(t.value, 0), 0), f = t.map((e) => d > 0 ? Math.max(e.value, 0) / d : 0), p = t.map((e, t) => On(t, e.color)), m = Math.round(i * Si), h = i / 2, g = (i - m) / 2, _ = f.filter((e) => e > 0).length > 1 ? xi / (2 * Math.PI * g) : 0, v = f.map((e, t) => f.slice(0, t).reduce((e, t) => e + t, 0));
	function y(e) {
		let t = e.currentTarget.getBoundingClientRect(), n = e.clientX - t.left - h, r = e.clientY - t.top - h;
		if (Math.abs(Math.hypot(n, r) - g) > m / 2 + Ci) return l(null);
		let i = (Math.atan2(n, -r) / (2 * Math.PI) + 1) % 1, a = v.findIndex((e, t) => f[t] > 0 && i >= e && i < e + f[t]);
		l(a === -1 ? null : a);
	}
	return /* @__PURE__ */ P(cn, {
		name: "donut-chart",
		label: e,
		legend: a ? t.map((e, t) => ({
			name: e.name,
			color: p[t],
			kind: "box",
			value: o(e.value),
			share: kn(f[t])
		})) : void 0,
		legendLayout: "rows",
		table: {
			columns: [
				"",
				"Value",
				"Share"
			],
			rows: t.map((e, t) => [
				e.name,
				o(e.value),
				kn(f[t])
			])
		},
		...s,
		children: /* @__PURE__ */ F("div", {
			className: "iro-donut-chart-ring",
			"data-active": c !== null || void 0,
			style: {
				width: i,
				height: i
			},
			children: [
				/* @__PURE__ */ P("svg", {
					width: i,
					height: i,
					"aria-hidden": "true",
					children: /* @__PURE__ */ P("g", {
						className: "iro-donut-chart-parts",
						children: t.map((e, t) => f[t] > _ ? /* @__PURE__ */ P("path", {
							className: "iro-donut-chart-part",
							"data-active": t === c || void 0,
							style: { color: p[t] },
							strokeWidth: m,
							d: hn(h, h, g, v[t] + _ / 2, v[t] + f[t] - _ / 2)
						}, t) : null)
					})
				}),
				/* @__PURE__ */ F("div", {
					className: "iro-donut-chart-center",
					role: "status",
					children: [/* @__PURE__ */ P("strong", { children: c === null ? r ?? o(d) : o(t[c].value) }), /* @__PURE__ */ P("span", { children: c === null ? n : `${t[c].name} · ${kn(f[c])}` })]
				}),
				/* @__PURE__ */ P("div", {
					className: "iro-chart-hit",
					role: "img",
					"aria-label": `${e}. Arrow keys read each part.`,
					tabIndex: 0,
					onPointerMove: y,
					onPointerDown: y,
					...u
				})
			]
		})
	});
}
// src/components/drawer/Drawer.tsx
function Ti({ title: e, description: t, children: n, footer: r, trigger: i, open: a, onOpenChange: o, className: s }) {
	let c = Y();
	return /* @__PURE__ */ F(Fe.Root, {
		swipeDirection: "down",
		open: a,
		onOpenChange: o ? (e) => o(e) : void 0,
		children: [i ? /* @__PURE__ */ P(Fe.Trigger, { render: i }) : null, /* @__PURE__ */ F(Fe.Portal, {
			container: c,
			children: [/* @__PURE__ */ P(Fe.Backdrop, { className: "iro-dialog-backdrop" }), /* @__PURE__ */ P(Fe.Viewport, {
				className: "iro-drawer-viewport",
				children: /* @__PURE__ */ F(Fe.Popup, {
					className: W("iro-drawer", s),
					children: [/* @__PURE__ */ P("span", {
						className: "iro-drawer-handle",
						"aria-hidden": "true"
					}), /* @__PURE__ */ F(Fe.Content, {
						className: "iro-drawer-content",
						children: [
							/* @__PURE__ */ P(Fe.Title, {
								className: "iro-drawer-title",
								children: e
							}),
							t ? /* @__PURE__ */ P(Fe.Description, {
								className: "iro-drawer-description",
								children: t
							}) : null,
							n ? /* @__PURE__ */ P("div", {
								className: "iro-drawer-body",
								children: n
							}) : null,
							r ? /* @__PURE__ */ P("footer", {
								className: "iro-drawer-footer",
								children: r
							}) : null
						]
					})]
				})
			})]
		})]
	});
}
// src/components/drop-zone/DropZone.tsx
function Ei(e) {
	return Array.from(e.dataTransfer.types).includes("Files");
}
function Di({ onFiles: e, title: t, hint: n, icon: r = /* @__PURE__ */ P(st, {}), multiple: i, accept: a, disabled: o, compact: s, className: c }) {
	let [l, u] = M(!1), d = j(null), f = (t) => {
		let n = Array.from(t ?? []);
		n.length && e(i ? n : n.slice(0, 1));
	};
	return /* @__PURE__ */ F("button", {
		type: "button",
		disabled: o,
		"data-over": l || void 0,
		"data-compact": s || void 0,
		className: W("iro-drop-zone", c),
		onClick: () => d.current?.click(),
		onDragOver: (e) => {
			!o && Ei(e) && (e.preventDefault(), u(!0));
		},
		onDragLeave: (e) => {
			e.currentTarget.contains(e.relatedTarget) || u(!1);
		},
		onDrop: (e) => {
			!o && Ei(e) && (e.preventDefault(), u(!1), f(e.dataTransfer.files));
		},
		children: [
			/* @__PURE__ */ P("input", {
				ref: d,
				type: "file",
				accept: a,
				multiple: i,
				hidden: !0,
				tabIndex: -1,
				onChange: (e) => {
					f(e.target.files), e.target.value = "";
				}
			}),
			/* @__PURE__ */ P("span", {
				className: "iro-drop-zone-icon",
				children: r
			}),
			/* @__PURE__ */ P("span", {
				className: "iro-drop-zone-title",
				children: t
			}),
			n ? /* @__PURE__ */ P("span", {
				className: "iro-drop-zone-hint",
				children: n
			}) : null
		]
	});
}
// src/components/empty-state/EmptyState.tsx
function Oi({ title: e, icon: t, action: n, tone: r = "neutral", className: i, children: a, ...o }) {
	return /* @__PURE__ */ F("div", {
		className: W("iro-empty", i),
		"data-tone": r,
		...o,
		children: [
			t ? /* @__PURE__ */ P("span", {
				className: "iro-empty-icon",
				children: t
			}) : null,
			/* @__PURE__ */ P("strong", {
				className: "iro-empty-title",
				children: e
			}),
			a ? /* @__PURE__ */ P("p", {
				className: "iro-empty-text",
				children: a
			}) : null,
			n ? /* @__PURE__ */ P("div", {
				className: "iro-empty-action",
				children: n
			}) : null
		]
	});
}
// src/components/environment-variables/names.ts
var ki = /^[A-Za-z_][A-Za-z0-9_]*$/;
function Ai(e, t) {
	return e ? ki.test(e) ? t.includes(e) ? `${e} is already set.` : null : "Use letters, digits and _, not starting with a digit." : "Enter a name.";
}
// src/components/environment-variables/EnvironmentVariables.tsx
var ji = "•".repeat(12);
function Mi({ taken: e, onAdd: t }) {
	let [n, r] = M(""), [i, a] = M(""), [o, s] = M(!1), [c, l] = M(null), u = () => {
		let c = Ai(n.trim(), e);
		l(c), c || (t({
			name: n.trim(),
			value: i,
			secret: o
		}), r(""), a(""), s(!1));
	}, d = (e) => {
		e.key === "Enter" && u();
	};
	return /* @__PURE__ */ F("div", {
		className: "iro-env-vars-add",
		children: [
			/* @__PURE__ */ P(Ar, {
				size: "sm",
				"aria-label": "New variable name",
				placeholder: "NAME",
				value: n,
				invalid: !!c,
				spellCheck: !1,
				onChange: (e) => r(e.currentTarget.value),
				onKeyDown: d
			}),
			/* @__PURE__ */ P(Ar, {
				size: "sm",
				"aria-label": "New variable value",
				placeholder: "value",
				type: o ? "password" : "text",
				autoComplete: "off",
				value: i,
				onChange: (e) => a(e.currentTarget.value),
				onKeyDown: d
			}),
			/* @__PURE__ */ P(_r, {
				label: "Secret",
				checked: o,
				onCheckedChange: s
			}),
			/* @__PURE__ */ P(X, {
				size: "sm",
				onClick: u,
				children: "Add"
			}),
			c ? /* @__PURE__ */ P("p", {
				className: "iro-env-vars-problem",
				role: "alert",
				children: c
			}) : null
		]
	});
}
function Ni({ variables: e, onChange: t, title: n, revealLabel: r = "Show values", className: i }) {
	let [a, o] = M(!1), [s, c] = M([]), l = e.some((e) => e.secret), u = (n, r) => t?.(e.map((e) => e.name === n ? {
		...e,
		value: r
	} : e));
	return /* @__PURE__ */ F("section", {
		"data-editable": t ? !0 : void 0,
		className: W("iro-env-vars", i),
		children: [
			n || l ? /* @__PURE__ */ F("header", {
				className: "iro-env-vars-head",
				children: [n ? /* @__PURE__ */ P("span", {
					className: "iro-env-vars-title",
					children: n
				}) : null, l ? /* @__PURE__ */ P(Er, {
					size: "sm",
					label: r,
					checked: a,
					onCheckedChange: o
				}) : null]
			}) : null,
			/* @__PURE__ */ P("dl", {
				className: "iro-env-vars-list",
				children: e.map(({ name: n, value: r, secret: i }) => {
					let o = i && !a && !s.includes(n), l = i && !a ? /* @__PURE__ */ P(Z, {
						size: "sm",
						icon: P(o ? _t : vt, {}),
						label: `${o ? "Show" : "Hide"} ${n}`,
						onClick: () => c(o ? [...s, n] : s.filter((e) => e !== n))
					}) : null;
					return /* @__PURE__ */ F("div", {
						className: "iro-env-var",
						children: [/* @__PURE__ */ P("dt", {
							className: "iro-env-var-name",
							children: n
						}), /* @__PURE__ */ F("dd", {
							className: "iro-env-var-value",
							"data-hidden": o || void 0,
							children: [
								t ? /* @__PURE__ */ P(Ar, {
									size: "sm",
									"aria-label": `Value of ${n}`,
									type: o ? "password" : "text",
									autoComplete: "off",
									spellCheck: !1,
									value: r,
									end: l,
									onChange: (e) => u(n, e.currentTarget.value)
								}) : /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ P("span", { children: o ? ji : r }), l] }),
								/* @__PURE__ */ P(Cr, {
									text: r,
									label: `Copy ${n}`
								}),
								t ? /* @__PURE__ */ P(Z, {
									size: "sm",
									icon: /* @__PURE__ */ P(tt, {}),
									label: `Remove ${n}`,
									onClick: () => t(e.filter((e) => e.name !== n))
								}) : null
							]
						})]
					}, n);
				})
			}),
			t ? /* @__PURE__ */ P(Mi, {
				taken: e.map((e) => e.name),
				onAdd: (n) => t([...e, n])
			}) : null
		]
	});
}
// src/components/field/Field.tsx
function Pi({ label: e, hint: t, error: n, layout: r = "top", disabled: i, className: a, children: o, ...s }) {
	return /* @__PURE__ */ F(Ie.Root, {
		disabled: i,
		invalid: n ? !0 : void 0,
		"data-layout": r,
		className: W("iro-field", a),
		...s,
		children: [/* @__PURE__ */ P(Ie.Label, {
			className: "iro-field-label",
			children: e
		}), /* @__PURE__ */ F("div", {
			className: "iro-field-body",
			children: [o, n ? /* @__PURE__ */ F(Ie.Error, {
				match: !0,
				className: "iro-field-error",
				children: [/* @__PURE__ */ P(ot, {}), n]
			}) : t ? /* @__PURE__ */ P(Ie.Description, {
				className: "iro-field-hint",
				children: t
			}) : null]
		})]
	});
}
// src/components/tree-row/TreeRow.tsx
function Fi({ label: e, depth: t = 0, icon: n, open: r, selected: i, dirty: a, meta: o, actions: s, onClick: c, onToggle: l, onContextMenu: u, size: d = "md", buttonProps: f, className: p }) {
	let m = r !== void 0;
	return /* @__PURE__ */ F("div", {
		"data-size": d,
		"data-selected": i || void 0,
		className: W("iro-tree-row", p),
		style: { "--tree-depth": t },
		children: [/* @__PURE__ */ F("button", {
			type: "button",
			className: "iro-tree-row-main",
			"aria-expanded": m ? r : void 0,
			"aria-current": i || void 0,
			onClick: m ? l ?? c : c,
			onContextMenu: u,
			...f,
			children: [
				/* @__PURE__ */ P("span", {
					className: "iro-tree-row-chevron",
					"data-open": r || void 0,
					children: m ? /* @__PURE__ */ P(J, {}) : null
				}),
				n ? /* @__PURE__ */ P("span", {
					className: "iro-tree-row-icon",
					children: n
				}) : null,
				/* @__PURE__ */ P("span", {
					className: "iro-tree-row-label",
					children: e
				}),
				a ? /* @__PURE__ */ P("span", {
					className: "iro-tree-row-dirty",
					role: "img",
					title: "Unsaved changes",
					"aria-label": "Unsaved changes"
				}) : null,
				o ? /* @__PURE__ */ P("span", {
					className: "iro-tree-row-meta",
					children: o
				}) : null
			]
		}), s ? /* @__PURE__ */ P("span", {
			className: "iro-tree-row-actions",
			children: s
		}) : null]
	});
}
// src/components/file-tree/keys.ts
function Ii(e, t, n) {
	let r = e[t];
	if (!r) return null;
	let i = e.length - 1, a = r.open !== void 0;
	switch (n) {
		case "ArrowDown": return {
			type: "focus",
			index: Math.min(t + 1, i)
		};
		case "ArrowUp": return {
			type: "focus",
			index: Math.max(t - 1, 0)
		};
		case "Home": return {
			type: "focus",
			index: 0
		};
		case "End": return {
			type: "focus",
			index: i
		};
		case "ArrowRight": return a && !r.open ? {
			type: "open",
			index: t
		} : a && e[t + 1]?.depth > r.depth ? {
			type: "focus",
			index: t + 1
		} : null;
		case "ArrowLeft":
			if (a && r.open) return {
				type: "close",
				index: t
			};
			for (let n = t - 1; n >= 0; n--) if (e[n].depth < r.depth) return {
				type: "focus",
				index: n
			};
			return null;
	}
	if (n.length !== 1 || n === " ") return null;
	let o = n.toLowerCase();
	for (let n = 1; n <= e.length; n++) {
		let r = (t + n) % e.length;
		if (e[r].label.toLowerCase().startsWith(o)) return {
			type: "focus",
			index: r
		};
	}
	return null;
}
// src/components/file-tree/FileTree.tsx
var Li = (e) => [...e].sort((e, t) => Number(!e.children) - Number(!t.children) || e.name.localeCompare(t.name));
function Ri(e, t, n = "", r = 0) {
	return Li(e).flatMap((e) => {
		let i = n ? `${n}/${e.name}` : e.name, a = e.children ? t.has(i) : void 0, o = {
			node: e,
			path: i,
			depth: r,
			open: a
		};
		return a && e.children ? [o, ...Ri(e.children, t, i, r + 1)] : [o];
	});
}
function zi({ nodes: e, selected: t, onSelect: n, open: r, onOpenChange: i, defaultOpen: a = [], label: o = "Files", className: s }) {
	let [c, l] = M(a), [u, d] = M(), f = j(/* @__PURE__ */ new Map()), p = new Set(r ?? c), m = Ri(e, p), h = m.map((e) => e.path), g = [u, t].find((e) => e && h.includes(e)) ?? h[0], v = (e, t) => {
		if (p.has(e) === t) return;
		let n = t ? [...p, e] : [...p].filter((t) => t !== e);
		l(n), i?.(n);
	}, b = (e, t) => {
		if (e.altKey || e.ctrlKey || e.metaKey) return;
		let n = Ii(m.map((e) => ({
			depth: e.depth,
			open: e.open,
			label: e.node.name
		})), t, e.key);
		if (!n) return;
		e.preventDefault();
		let r = m[n.index].path;
		n.type === "focus" ? f.current.get(r)?.focus() : v(r, n.type === "open");
	};
	return /* @__PURE__ */ P("div", {
		role: "tree",
		"aria-label": o,
		className: W("iro-file-tree", s),
		children: m.map((e, r) => {
			let i = e.open !== void 0;
			return /* @__PURE__ */ P(Fi, {
				label: e.node.name,
				depth: e.depth,
				icon: e.node.icon ?? /* @__PURE__ */ P(G, {
					icon: i ? e.open ? _ : ne : y,
					size: "1em"
				}),
				open: e.open,
				selected: !i && e.path === t,
				dirty: e.node.dirty,
				meta: e.node.meta,
				onClick: () => i ? v(e.path, !e.open) : n?.(e.path, e.node),
				buttonProps: {
					ref: (t) => {
						t ? f.current.set(e.path, t) : f.current.delete(e.path);
					},
					role: "treeitem",
					"aria-level": e.depth + 1,
					"aria-selected": i ? void 0 : e.path === t,
					"aria-current": void 0,
					tabIndex: e.path === g ? 0 : -1,
					onFocus: () => d(e.path),
					onKeyDown: (e) => b(e, r)
				}
			}, e.path);
		})
	});
}
// src/components/image/Image.tsx
function Bi({ src: e, alt: t, ratio: n, fit: r = "cover", caption: i, fallback: a, onLoad: o, onError: s, className: c, style: l, ...u }) {
	let [d, f] = M("loading"), [p, m] = M(e);
	return e !== p && (m(e), f("loading")), /* @__PURE__ */ F("figure", {
		"data-state": d,
		"data-fit": r,
		"data-ratio": n !== void 0 || void 0,
		className: W("iro-image", c),
		style: {
			"--image-ratio": n,
			...l
		},
		children: [/* @__PURE__ */ F("div", {
			className: "iro-image-frame",
			children: [d === "loading" ? /* @__PURE__ */ P(si, { className: "iro-image-placeholder" }) : null, d === "failed" ? /* @__PURE__ */ P("div", {
				className: "iro-image-failed",
				role: "img",
				"aria-label": t,
				children: a ?? /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ P(bt, {}), /* @__PURE__ */ P("span", { children: t })] })
			}) : /* @__PURE__ */ P("img", {
				src: e,
				alt: t,
				className: "iro-image-img",
				...u,
				onLoad: (e) => {
					f("loaded"), o?.(e);
				},
				onError: (e) => {
					f("failed"), s?.(e);
				}
			})]
		}), i ? /* @__PURE__ */ P("figcaption", {
			className: "iro-image-caption",
			children: i
		}) : null]
	});
}
// src/components/inline-input/InlineInput.tsx
function Vi({ muted: e, mono: t, size: n = "md", className: r, ...i }) {
	return /* @__PURE__ */ P("input", {
		spellCheck: !1,
		"data-muted": e || void 0,
		"data-mono": t || void 0,
		"data-size": n,
		className: W("iro-inline-input", r),
		...i
	});
}
// src/components/lightbox/Lightbox.tsx
function Hi({ images: e, trigger: t, open: n, onOpenChange: r, index: i, onIndexChange: a, defaultIndex: o = 0, closeLabel: s = "Close", previousLabel: c = "Previous", nextLabel: l = "Next", className: u }) {
	let d = Y(), [f, p] = M(o), m = e.length, h = Math.min(i ?? f, m - 1), g = e[h], _ = (e) => {
		let t = (h + e + m) % m;
		p(t), a?.(t);
	};
	return /* @__PURE__ */ F(z.Root, {
		open: n,
		onOpenChange: r ? (e) => r(e) : void 0,
		children: [t ? /* @__PURE__ */ P(z.Trigger, { render: t }) : null, /* @__PURE__ */ F(z.Portal, {
			container: d,
			children: [/* @__PURE__ */ P(z.Backdrop, { className: "iro-lightbox-backdrop" }), /* @__PURE__ */ F(z.Popup, {
				className: W("iro-lightbox", u),
				onKeyDown: (e) => {
					m < 2 || (e.key === "ArrowLeft" && _(-1), e.key === "ArrowRight" && _(1));
				},
				children: [
					/* @__PURE__ */ F("header", {
						className: "iro-lightbox-bar",
						children: [
							/* @__PURE__ */ P("span", {
								className: "iro-lightbox-count",
								"aria-hidden": "true",
								children: m > 1 ? `${h + 1} / ${m}` : null
							}),
							/* @__PURE__ */ P(z.Title, {
								className: "iro-lightbox-title",
								children: g?.alt
							}),
							/* @__PURE__ */ P(z.Close, { render: /* @__PURE__ */ P(Z, {
								icon: /* @__PURE__ */ P(nt, {}),
								label: s,
								tooltip: !1
							}) })
						]
					}),
					g ? /* @__PURE__ */ F("figure", {
						className: "iro-lightbox-stage",
						children: [/* @__PURE__ */ P("img", {
							src: g.src,
							alt: g.alt,
							className: "iro-lightbox-img"
						}, g.src), g.caption ? /* @__PURE__ */ P("figcaption", {
							className: "iro-lightbox-caption",
							children: g.caption
						}) : null]
					}) : null,
					m > 1 ? /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ P(Z, {
						icon: /* @__PURE__ */ P(Ze, {}),
						label: c,
						size: "lg",
						tooltip: !1,
						className: "iro-lightbox-step",
						"data-side": "previous",
						onClick: () => _(-1)
					}), /* @__PURE__ */ P(Z, {
						icon: /* @__PURE__ */ P(J, {}),
						label: l,
						size: "lg",
						tooltip: !1,
						className: "iro-lightbox-step",
						"data-side": "next",
						onClick: () => _(1)
					})] }) : null
				]
			})]
		})]
	});
}
// src/components/line-chart/LineChart.tsx
var Ui = 10, Wi = 24, Gi = 6;
function Ki({ label: e, labels: t, series: n, area: r = !1, smooth: i = !1, points: a = !1, height: o = 200, min: s, max: c, format: l = Dn, ...u }) {
	let [d, f] = Mn(), { active: p, setActive: m, keys: h } = jn(t.length), g = n.flatMap((e) => e.values).filter((e) => e !== null), _ = Cn(s ?? Math.min(0, ...g), c ?? Math.max(0, ...g)), v = wn(_), y = o - Wi, b = Tn(_.ticks.map(v)), x = b + Gi, S = t.length > 1 ? (f - x - Gi) / (t.length - 1) : 0, C = (e) => t.length > 1 ? x + e * S : (b + f) / 2, w = (e) => Ui + (1 - (e - _.min) / (_.max - _.min)) * (y - Ui), ee = w(Math.min(Math.max(0, _.min), _.max)), T = En(t, S || f), E = n.map((e, t) => On(t, e.color)), D = n.map((e) => e.dashed ? "dash" : r ? "box" : "line"), O = (e) => r && !e.dashed, k = (e) => e === null ? "–" : l(e);
	function te(e) {
		let n = e.currentTarget.getBoundingClientRect(), r = S ? Math.round((e.clientX - n.left - x) / S) : 0;
		m(Math.min(Math.max(r, 0), t.length - 1));
	}
	let ne = (e) => e === 0 ? "start" : e === t.length - 1 ? "end" : "middle", re = (e) => (a ? e.map((e, t) => t) : p === null ? [] : [p]).filter((t) => e[t] != null);
	return /* @__PURE__ */ P(cn, {
		name: "line-chart",
		label: e,
		legend: n.length > 1 ? n.map(({ name: e }, t) => ({
			name: e,
			color: E[t],
			kind: D[t]
		})) : void 0,
		table: {
			columns: ["", ...n.map(({ name: e }) => e)],
			rows: t.map((e, t) => [e, ...n.map((e) => k(e.values[t] ?? null))])
		},
		...u,
		children: /* @__PURE__ */ F("div", {
			ref: d,
			className: "iro-chart-plot",
			style: { height: o },
			children: [
				f > 0 ? /* @__PURE__ */ F("svg", {
					width: f,
					height: o,
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ P(ln, {
							ticks: _.ticks,
							y: w,
							gutter: b,
							width: f,
							format: v
						}),
						t.map((e, t) => t % T === 0 ? /* @__PURE__ */ P("text", {
							className: "iro-chart-axis",
							x: C(t),
							y: o - 6,
							textAnchor: ne(t),
							children: e
						}, t) : null),
						p === null ? null : /* @__PURE__ */ P("line", {
							className: "iro-chart-crosshair",
							x1: C(p),
							x2: C(p),
							y1: Ui,
							y2: y
						}),
						n.map((e, t) => {
							let n = pn(e.values.map((e, t) => e === null ? null : [C(t), w(e)]));
							return /* @__PURE__ */ F("g", {
								className: "iro-chart-series",
								style: { color: E[t] },
								children: [
									O(e) ? n.map((e) => /* @__PURE__ */ P("path", {
										className: "iro-chart-area",
										d: fn(e, ee, i)
									}, e[0][0])) : null,
									n.map((t) => /* @__PURE__ */ P("path", {
										className: "iro-chart-line",
										strokeDasharray: e.dashed ? "6 5" : void 0,
										d: dn(t, i)
									}, t[0][0])),
									re(e.values).map((t) => /* @__PURE__ */ P("circle", {
										className: "iro-chart-dot",
										cx: C(t),
										cy: w(e.values[t] ?? 0),
										r: 4
									}, t))
								]
							}, e.name);
						})
					]
				}) : null,
				/* @__PURE__ */ P("div", {
					className: "iro-chart-hit",
					role: "img",
					"aria-label": `${e}. Arrow keys read each point.`,
					tabIndex: 0,
					onPointerMove: te,
					onPointerDown: te,
					...h
				}),
				/* @__PURE__ */ P(_n, {
					open: p !== null,
					x: p === null ? 0 : C(p),
					y: Ui,
					width: f,
					title: p === null ? "" : t[p],
					rows: n.map((e, t) => ({
						name: e.name,
						value: k(p === null ? null : e.values[p] ?? null),
						color: E[t],
						kind: D[t]
					}))
				})
			]
		})
	});
}
// src/components/list-item/ListItem.tsx
function qi({ title: e, description: t, start: n, meta: r, actions: i, onClick: a, selected: o, disabled: s, as: c = "div", className: l, ...u }) {
	let d = /* @__PURE__ */ F(N, { children: [
		n ? /* @__PURE__ */ P("span", {
			className: "iro-list-item-start",
			children: n
		}) : null,
		/* @__PURE__ */ F("span", {
			className: "iro-list-item-text",
			children: [/* @__PURE__ */ P("span", {
				className: "iro-list-item-title",
				children: e
			}), t ? /* @__PURE__ */ P("span", {
				className: "iro-list-item-description",
				children: t
			}) : null]
		}),
		r ? /* @__PURE__ */ P("span", {
			className: "iro-list-item-meta",
			children: r
		}) : null
	] });
	return /* @__PURE__ */ F(c, {
		"data-selected": o || void 0,
		"data-disabled": s || void 0,
		className: W("iro-list-item", l),
		...u,
		children: [a ? /* @__PURE__ */ P("button", {
			type: "button",
			className: "iro-list-item-main",
			"aria-pressed": o,
			disabled: s,
			onClick: a,
			children: d
		}) : /* @__PURE__ */ P("div", {
			className: "iro-list-item-main",
			children: d
		}), i ? /* @__PURE__ */ P("div", {
			className: "iro-list-item-actions",
			children: i
		}) : null]
	});
}
// src/components/marker/Marker.tsx
function Ji({ icon: e, action: t, className: n, children: r, ...i }) {
	return /* @__PURE__ */ P("div", {
		className: W("iro-marker", n),
		...i,
		children: /* @__PURE__ */ F("span", {
			className: "iro-marker-label",
			children: [
				e,
				r,
				t
			]
		})
	});
}
// src/components/menubar/Menubar.tsx
var Yi = 4;
function Xi({ menus: e, className: t, "aria-label": n = "Menu bar" }) {
	let r = Y();
	return /* @__PURE__ */ P(Le, {
		className: W("iro-menubar", t),
		"aria-label": n,
		children: e.map((e) => /* @__PURE__ */ F(L.Root, { children: [/* @__PURE__ */ P(L.Trigger, {
			className: "iro-menubar-trigger",
			children: e.label
		}), /* @__PURE__ */ P(L.Portal, {
			container: r,
			children: /* @__PURE__ */ P(L.Positioner, {
				align: "start",
				sideOffset: Yi,
				className: "iro-positioner",
				children: /* @__PURE__ */ P(L.Popup, {
					className: "iro-popup iro-popup-list",
					children: /* @__PURE__ */ P(Kn, { items: e.items })
				})
			})
		})] }, e.label))
	});
}
// src/components/message/Message.tsx
function Zi({ from: e = "assistant", children: t, avatar: n, name: r, time: i, attachments: a, actions: o, streaming: s = !1, className: c, ...l }) {
	return /* @__PURE__ */ F("article", {
		"data-from": e,
		"data-streaming": s || void 0,
		className: W("iro-message", c),
		...l,
		children: [n && e === "assistant" ? /* @__PURE__ */ P("div", {
			className: "iro-message-avatar",
			children: n
		}) : null, /* @__PURE__ */ F("div", {
			className: "iro-message-main",
			children: [
				r || i ? /* @__PURE__ */ F("header", {
					className: "iro-message-head",
					children: [r ? /* @__PURE__ */ P("span", {
						className: "iro-message-name",
						children: r
					}) : null, i ? /* @__PURE__ */ P("span", {
						className: "iro-message-time",
						children: i
					}) : null]
				}) : null,
				a ? /* @__PURE__ */ P("div", {
					className: "iro-message-attachments",
					children: a
				}) : null,
				/* @__PURE__ */ P("div", {
					className: "iro-message-content",
					children: t
				}),
				o ? /* @__PURE__ */ P("div", {
					className: "iro-message-actions",
					children: o
				}) : null
			]
		})]
	});
}
// src/components/meter/Meter.tsx
var Qi = .75, $i = .9;
function ea({ value: e, min: t = 0, max: n = 100, label: r, valueText: i, tone: a = !0, className: o }) {
	let s = n > t ? Math.min(Math.max((e - t) / (n - t), 0), 1) : 0, c = i ?? `${Math.round(s * 100)}%`, l = a ? s > $i ? "danger" : s > Qi ? "warning" : void 0 : void 0;
	return /* @__PURE__ */ F(Re.Root, {
		value: e,
		min: t,
		max: n,
		getAriaValueText: () => c,
		"data-level": l,
		className: W("iro-meter", o),
		children: [
			/* @__PURE__ */ P(Re.Label, {
				className: "iro-meter-label",
				children: r
			}),
			/* @__PURE__ */ P(Re.Track, {
				className: "iro-meter-track",
				children: /* @__PURE__ */ P(Re.Indicator, { className: "iro-meter-fill" })
			}),
			/* @__PURE__ */ P("span", {
				className: "iro-meter-value",
				children: c
			})
		]
	});
}
// src/components/multi-segmented/MultiSegmented.tsx
function ta({ options: e, value: t, onValueChange: n, allLabel: r, size: i = "md", disabled: a, className: o, "aria-label": s }) {
	let c = (e) => n(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	return /* @__PURE__ */ F("div", {
		role: "group",
		"aria-label": s,
		"data-size": i,
		className: W("iro-segmented", "iro-multi-segmented", o),
		children: [r ? /* @__PURE__ */ P("button", {
			type: "button",
			"aria-pressed": t.length === 0,
			disabled: a,
			className: "iro-segmented-option",
			onClick: () => n([]),
			children: r
		}) : null, e.map((e) => /* @__PURE__ */ F("button", {
			type: "button",
			"aria-pressed": t.includes(e.value),
			disabled: a || e.disabled,
			className: "iro-segmented-option",
			onClick: () => c(e.value),
			children: [e.icon, e.label]
		}, e.value))]
	});
}
// src/components/multi-select/MultiSelect.tsx
var na = 4;
function ra({ option: e }) {
	return /* @__PURE__ */ F(B.Item, {
		value: e.value,
		disabled: e.disabled,
		className: "iro-option",
		children: [
			/* @__PURE__ */ P("span", {
				className: "iro-option-slot",
				children: /* @__PURE__ */ P(B.ItemIndicator, {
					className: "iro-option-check",
					children: /* @__PURE__ */ P(Je, {})
				})
			}),
			e.icon ? /* @__PURE__ */ P("span", {
				className: "iro-option-icon",
				children: e.icon
			}) : null,
			/* @__PURE__ */ P(B.ItemText, {
				className: "iro-option-label",
				children: e.label
			}),
			e.hint ? /* @__PURE__ */ P("span", {
				className: "iro-option-end",
				children: e.hint
			}) : null
		]
	});
}
function ia({ options: e, value: t, onValueChange: n, placeholder: r = "None", size: i = "md", disabled: a, id: o, className: s, "aria-label": c }) {
	let l = Y(), u = Yt(e), d = (t) => e.find((e) => e.value === t)?.label ?? t;
	return /* @__PURE__ */ F(B.Root, {
		multiple: !0,
		value: t,
		onValueChange: (e) => n(e),
		disabled: a,
		children: [/* @__PURE__ */ F(B.Trigger, {
			id: o,
			"aria-label": c,
			"data-size": i,
			className: W("iro-select", s),
			children: [/* @__PURE__ */ P(B.Value, {
				className: "iro-select-value",
				children: (e) => e.length ? e.map(d).join(", ") : /* @__PURE__ */ P("span", {
					className: "iro-select-placeholder",
					children: r
				})
			}), /* @__PURE__ */ P(B.Icon, {
				className: "iro-select-icon",
				children: /* @__PURE__ */ P(q, {})
			})]
		}), /* @__PURE__ */ P(B.Portal, {
			container: l,
			children: /* @__PURE__ */ P(B.Positioner, {
				sideOffset: na,
				alignItemWithTrigger: !1,
				className: "iro-positioner",
				children: /* @__PURE__ */ P(B.Popup, {
					className: "iro-popup iro-popup-list",
					children: u ? u.map((e) => /* @__PURE__ */ F(B.Group, { children: [e.value ? /* @__PURE__ */ P(B.GroupLabel, {
						className: "iro-popup-label",
						children: e.value
					}) : null, e.items.map((e) => /* @__PURE__ */ P(ra, { option: e }, e.value))] }, e.value)) : e.map((e) => /* @__PURE__ */ P(ra, { option: e }, e.value))
				})
			})
		})]
	});
}
// src/components/native-select/NativeSelect.tsx
function aa({ size: e = "md", invalid: t, className: n, style: r, children: i, ...a }) {
	return /* @__PURE__ */ F("span", {
		"data-size": e,
		"data-invalid": t || void 0,
		className: W("iro-select", "iro-native-select", n),
		style: r,
		children: [/* @__PURE__ */ P(Ie.Control, {
			render: /* @__PURE__ */ P("select", {}),
			className: "iro-native-select-input",
			"aria-invalid": t || void 0,
			...a,
			children: i
		}), /* @__PURE__ */ P("span", {
			className: "iro-select-icon",
			"aria-hidden": "true",
			children: /* @__PURE__ */ P(q, {})
		})]
	});
}
// src/components/navigation-menu/NavigationMenu.tsx
var oa = 8;
function sa({ links: e }) {
	return /* @__PURE__ */ P("ul", {
		className: "iro-navigation-menu-links",
		"data-columns": e.length > 3 ? 2 : 1,
		children: e.map((e) => /* @__PURE__ */ P("li", { children: /* @__PURE__ */ F(V.Link, {
			href: e.href,
			className: "iro-navigation-menu-link",
			children: [e.icon ? /* @__PURE__ */ P("span", {
				className: "iro-navigation-menu-link-icon",
				children: e.icon
			}) : null, /* @__PURE__ */ F("span", {
				className: "iro-navigation-menu-link-text",
				children: [/* @__PURE__ */ P("span", {
					className: "iro-navigation-menu-link-label",
					children: e.label
				}), e.description ? /* @__PURE__ */ P("span", {
					className: "iro-navigation-menu-link-description",
					children: e.description
				}) : null]
			})]
		}) }, e.href))
	});
}
function ca({ items: e, className: t, "aria-label": n = "Main" }) {
	let r = Y();
	return /* @__PURE__ */ F(V.Root, {
		className: W("iro-navigation-menu", t),
		"aria-label": n,
		children: [/* @__PURE__ */ P(V.List, {
			className: "iro-navigation-menu-list",
			children: e.map((e) => /* @__PURE__ */ P(V.Item, {
				className: "iro-navigation-menu-item",
				children: e.links || e.content ? /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ F(V.Trigger, {
					className: "iro-navigation-menu-trigger",
					"data-current": e.current || void 0,
					children: [e.label, /* @__PURE__ */ P(V.Icon, {
						className: "iro-navigation-menu-icon",
						children: /* @__PURE__ */ P(q, {})
					})]
				}), /* @__PURE__ */ P(V.Content, {
					className: "iro-navigation-menu-content",
					children: e.content ?? /* @__PURE__ */ P(sa, { links: e.links ?? [] })
				})] }) : /* @__PURE__ */ P(V.Link, {
					href: e.href,
					active: e.current,
					className: "iro-navigation-menu-trigger",
					"aria-current": e.current ? "page" : void 0,
					children: e.label
				})
			}, e.label))
		}), /* @__PURE__ */ P(V.Portal, {
			container: r,
			children: /* @__PURE__ */ P(V.Positioner, {
				sideOffset: oa,
				collisionPadding: 16,
				className: "iro-positioner iro-navigation-menu-positioner",
				children: /* @__PURE__ */ P(V.Popup, {
					className: "iro-popup iro-navigation-menu-popup",
					children: /* @__PURE__ */ P(V.Viewport, { className: "iro-navigation-menu-viewport" })
				})
			})
		})]
	});
}
// src/components/notice/Notice.tsx
var la = {
	info: /* @__PURE__ */ P(rt, {}),
	success: /* @__PURE__ */ P(it, {}),
	warning: /* @__PURE__ */ P(at, {}),
	danger: /* @__PURE__ */ P(ot, {})
};
function ua({ tone: e = "info", title: t, icon: n, actions: r, className: i, children: a, ...o }) {
	return /* @__PURE__ */ F("div", {
		role: e === "danger" ? "alert" : "status",
		"data-tone": e,
		className: W("iro-notice", i),
		...o,
		children: [/* @__PURE__ */ P("span", {
			className: "iro-notice-icon",
			children: n ?? la[e]
		}), /* @__PURE__ */ F("div", {
			className: "iro-notice-body",
			children: [
				t ? /* @__PURE__ */ P("strong", {
					className: "iro-notice-title",
					children: t
				}) : null,
				a ? /* @__PURE__ */ P("div", {
					className: "iro-notice-text",
					children: a
				}) : null,
				r ? /* @__PURE__ */ P("div", {
					className: "iro-notice-actions",
					children: r
				}) : null
			]
		})]
	});
}
// src/components/number-field/NumberField.tsx
function da({ value: e, defaultValue: t, onValueChange: n, min: r, max: i, step: a, largeStep: o, format: s, size: c = "md", disabled: l, required: u, invalid: d, name: f, id: p, className: m, "aria-label": h, decrementLabel: g = "Decrease", incrementLabel: _ = "Increase" }) {
	return /* @__PURE__ */ P(ze.Root, {
		value: e,
		defaultValue: t,
		onValueChange: n ? (e) => n(e) : void 0,
		min: r,
		max: i,
		step: a,
		largeStep: o,
		format: s,
		disabled: l,
		required: u,
		name: f,
		id: p,
		allowWheelScrub: !0,
		"data-size": c,
		"data-invalid": d || void 0,
		className: W("iro-number-field", m),
		children: /* @__PURE__ */ F(ze.Group, {
			className: "iro-number-field-group",
			children: [
				/* @__PURE__ */ P(ze.Decrement, {
					className: "iro-number-field-step",
					"aria-label": g,
					children: /* @__PURE__ */ P(Ye, {})
				}),
				/* @__PURE__ */ P(ze.Input, {
					className: "iro-number-field-input",
					"aria-label": h,
					"aria-invalid": d || void 0
				}),
				/* @__PURE__ */ P(ze.Increment, {
					className: "iro-number-field-step",
					"aria-label": _,
					children: /* @__PURE__ */ P(Xe, {})
				})
			]
		})
	});
}
// src/components/otp-field/OtpField.tsx
function fa({ length: e = 6, value: t, defaultValue: n, onValueChange: r, onComplete: i, type: a = "numeric", groupSize: o, mask: s, disabled: c, invalid: l, name: u, className: d, "aria-label": f }) {
	let p = be();
	return /* @__PURE__ */ F(Be.Root, {
		length: e,
		value: t,
		defaultValue: n,
		onValueChange: r ? (e) => r(e) : void 0,
		onValueComplete: i ? (e) => i(e) : void 0,
		validationType: a,
		mask: s,
		disabled: c,
		name: u,
		"aria-label": f,
		"data-invalid": l || void 0,
		className: W("iro-otp-field", d),
		children: [f ? /* @__PURE__ */ P("span", {
			id: p,
			hidden: !0,
			children: `${f}, 1 of ${e}`
		}) : null, Array.from({ length: e }, (t, n) => /* @__PURE__ */ P(Be.Input, {
			"aria-invalid": l || void 0,
			"data-group-end": o && (n + 1) % o === 0 && n < e - 1 || void 0,
			"aria-labelledby": n === 0 && f ? p : void 0,
			"aria-label": n === 0 ? void 0 : `${f ?? "Code"}, ${n + 1} of ${e}`,
			className: "iro-otp-field-box"
		}, n))]
	});
}
// src/components/property-list/PropertyList.tsx
function pa({ properties: e, copyLabel: t = "Copy", className: n, ...r }) {
	let i = e.filter(({ value: e }) => e != null && e !== "");
	return /* @__PURE__ */ P("dl", {
		className: W("iro-properties", n),
		...r,
		children: i.map((e) => /* @__PURE__ */ F("div", {
			className: "iro-property",
			children: [/* @__PURE__ */ P("dt", {
				className: "iro-property-label",
				children: e.label
			}), /* @__PURE__ */ F("dd", {
				className: "iro-property-value",
				"data-mono": e.mono || void 0,
				children: [/* @__PURE__ */ P("span", { children: e.value }), e.copy ? /* @__PURE__ */ P(Cr, {
					text: e.copy,
					label: `${t} ${e.label}`,
					className: "iro-property-copy"
				}) : null]
			})]
		}, e.label))
	});
}
// src/components/snippet/Snippet.tsx
function ma({ code: e, prompt: t = !0, copyLabel: n = "Copy command", className: r }) {
	return /* @__PURE__ */ F("div", {
		"data-prompt": t || void 0,
		className: W("iro-snippet", r),
		children: [/* @__PURE__ */ P("code", {
			className: "iro-snippet-code",
			tabIndex: 0,
			children: e
		}), /* @__PURE__ */ P(Cr, {
			text: e,
			label: n
		})]
	});
}
// src/components/package-info/PackageInfo.tsx
function ha({ name: e, version: t, description: n, install: r, details: i, dependencies: a, links: o, dependenciesLabel: s = "Dependencies", className: c }) {
	let l = Object.entries(a ?? {});
	return /* @__PURE__ */ F("article", {
		className: W("iro-package-info", c),
		children: [
			/* @__PURE__ */ F("header", {
				className: "iro-package-info-head",
				children: [/* @__PURE__ */ P("h3", {
					className: "iro-package-info-name",
					children: e
				}), /* @__PURE__ */ F(rn, { children: ["v", t] })]
			}),
			n ? /* @__PURE__ */ P("p", {
				className: "iro-package-info-description",
				children: n
			}) : null,
			r ? /* @__PURE__ */ P(ma, { code: r }) : null,
			i && i.length > 0 ? /* @__PURE__ */ P(pa, { properties: i }) : null,
			l.length > 0 ? /* @__PURE__ */ F("section", {
				className: "iro-package-info-deps",
				children: [/* @__PURE__ */ F("h4", {
					className: "iro-package-info-label",
					children: [
						s,
						" ",
						/* @__PURE__ */ P("span", { children: l.length })
					]
				}), /* @__PURE__ */ P("ul", {
					className: "iro-package-info-dep-list",
					children: l.map(([e, t]) => /* @__PURE__ */ F("li", {
						className: "iro-package-info-dep",
						children: [
							e,
							" ",
							/* @__PURE__ */ P("span", { children: t })
						]
					}, e))
				})]
			}) : null,
			o && o.length > 0 ? /* @__PURE__ */ P("footer", {
				className: "iro-package-info-links",
				children: o.map((e) => /* @__PURE__ */ F("a", {
					href: e.href,
					target: "_blank",
					rel: "noreferrer",
					className: "iro-package-info-link",
					children: [e.label, /* @__PURE__ */ P(gt, {})]
				}, e.href))
			}) : null
		]
	});
}
// src/components/select/Select.tsx
var ga = 4;
function _a({ option: e }) {
	return /* @__PURE__ */ F(H.Item, {
		value: e,
		disabled: e.disabled,
		className: "iro-option",
		children: [
			/* @__PURE__ */ P("span", {
				className: "iro-option-slot",
				children: /* @__PURE__ */ P(H.ItemIndicator, {
					className: "iro-option-check",
					children: /* @__PURE__ */ P(Je, {})
				})
			}),
			e.icon ? /* @__PURE__ */ P("span", {
				className: "iro-option-icon",
				children: e.icon
			}) : null,
			/* @__PURE__ */ P("span", {
				className: "iro-option-label",
				children: e.label
			}),
			e.hint ? /* @__PURE__ */ P("span", {
				className: "iro-option-end",
				children: e.hint
			}) : null
		]
	});
}
function va({ options: e, value: t, onValueChange: n, placeholder: r, emptyText: i = "No matches", size: a = "md", disabled: o, invalid: s, id: c, className: l, "aria-label": u, openLabel: d = "Show options" }) {
	let f = Y(), p = Yt(e), m = e.find((e) => e.value === t) ?? null;
	return /* @__PURE__ */ F(H.Root, {
		items: p ?? e,
		value: m,
		onValueChange: (e) => n(e ? e.value : null),
		itemToStringLabel: (e) => e.label,
		isItemEqualToValue: (e, t) => e.value === t.value,
		filter: (e, t) => Xt(e.label, t),
		autoHighlight: !0,
		disabled: o,
		children: [/* @__PURE__ */ F(H.InputGroup, {
			className: W("iro-select", l),
			"data-size": a,
			"data-invalid": s || void 0,
			children: [
				m?.icon ? /* @__PURE__ */ P("span", {
					className: "iro-select-lead",
					children: m.icon
				}) : null,
				/* @__PURE__ */ P(H.Input, {
					className: "iro-select-input",
					placeholder: r,
					id: c,
					"aria-label": u,
					"aria-invalid": s || void 0
				}),
				/* @__PURE__ */ P(H.Trigger, {
					className: "iro-select-icon",
					"aria-label": d,
					children: /* @__PURE__ */ P(q, {})
				})
			]
		}), /* @__PURE__ */ P(H.Portal, {
			container: f,
			children: /* @__PURE__ */ P(H.Positioner, {
				sideOffset: ga,
				className: "iro-positioner",
				children: /* @__PURE__ */ F(H.Popup, {
					className: "iro-popup",
					children: [/* @__PURE__ */ P(H.Empty, { children: /* @__PURE__ */ P("div", {
						className: "iro-popup-empty",
						children: i
					}) }), /* @__PURE__ */ P(H.List, {
						className: "iro-popup-list",
						children: p ? (e) => /* @__PURE__ */ F(H.Group, {
							items: e.items,
							children: [e.value ? /* @__PURE__ */ P(H.GroupLabel, {
								className: "iro-popup-label",
								children: e.value
							}) : null, /* @__PURE__ */ P(H.Collection, { children: (e) => /* @__PURE__ */ P(_a, { option: e }, e.value) })]
						}, e.value) : (e) => /* @__PURE__ */ P(_a, { option: e }, e.value)
					})]
				})
			})
		})]
	});
}
// src/components/pagination/pages.ts
var ya = 7, ba = (e, t) => Array.from({ length: t - e + 1 }, (t, n) => e + n);
function xa(e, t) {
	if (t <= ya) return ba(1, t);
	let n = Math.max(2, Math.min(e - 1, t - 4)), r = Math.min(t - 1, Math.max(e + 1, 5));
	return [
		1,
		...n > 2 ? ["gap"] : [],
		...ba(n, r),
		...r < t - 1 ? ["gap"] : [],
		t
	];
}
// src/components/pagination/Pagination.tsx
var Sa = {
	pageSize: "Rows per page",
	previous: "Previous page",
	next: "Next page",
	page: (e) => `Page ${e}`,
	range: (e, t, n) => `${e}–${t} of ${n}`
};
function Ca({ page: e, pageSize: t, total: n, onPageChange: r, pageSizes: i, onPageSizeChange: a, labels: o, className: s, "aria-label": c = "Pagination", ...l }) {
	let u = {
		...Sa,
		...o
	}, d = Math.max(1, Math.ceil(n / t)), f = Math.min(Math.max(e, 1), d), p = n === 0 ? 0 : (f - 1) * t + 1, m = Math.min(f * t, n);
	return /* @__PURE__ */ F("nav", {
		className: W("iro-pagination", s),
		"aria-label": c,
		...l,
		children: [
			i && a ? /* @__PURE__ */ F("span", {
				className: "iro-pagination-size",
				children: [/* @__PURE__ */ P("span", {
					"aria-hidden": "true",
					children: u.pageSize
				}), /* @__PURE__ */ P(va, {
					size: "sm",
					className: "iro-pagination-size-select",
					"aria-label": u.pageSize,
					value: String(t),
					options: i.map((e) => ({
						value: String(e),
						label: String(e)
					})),
					onValueChange: (e) => e && a(Number(e))
				})]
			}) : null,
			/* @__PURE__ */ P("span", {
				className: "iro-pagination-range",
				children: u.range(p, m, n)
			}),
			/* @__PURE__ */ F("span", {
				className: "iro-pagination-pages",
				children: [
					/* @__PURE__ */ P(Z, {
						size: "sm",
						icon: /* @__PURE__ */ P(Ze, {}),
						label: u.previous,
						disabled: f <= 1,
						onClick: () => r(f - 1)
					}),
					xa(f, d).map((e, t) => e === "gap" ? /* @__PURE__ */ P("span", {
						className: "iro-pagination-gap",
						"aria-hidden": "true",
						children: "…"
					}, `gap-${t}`) : /* @__PURE__ */ P(X, {
						size: "sm",
						variant: "ghost",
						className: "iro-pagination-page",
						"aria-label": u.page(e),
						"aria-current": e === f ? "page" : void 0,
						onClick: () => r(e),
						children: e
					}, e)),
					/* @__PURE__ */ P(Z, {
						size: "sm",
						icon: /* @__PURE__ */ P(J, {}),
						label: u.next,
						disabled: f >= d,
						onClick: () => r(f + 1)
					})
				]
			})
		]
	});
}
// src/components/panel/Panel.tsx
function wa({ as: e = "div", padded: t = !0, className: n, ...r }) {
	return /* @__PURE__ */ P(e, {
		"data-padded": t || void 0,
		className: W("iro-panel", n),
		...r
	});
}
// src/components/progress-bar/ProgressBar.tsx
function Ta({ value: e, tone: t = "accent", size: n = "md", label: r, segments: i, className: a }) {
	let o = e === null ? null : Math.min(Math.max(e, 0), 1) * 100, s = i ? Math.round((o ?? 0) / 100 * i) : 0;
	return /* @__PURE__ */ P(Ve.Root, {
		value: o,
		"aria-label": r,
		"data-tone": t,
		"data-size": n,
		"data-segments": i ? !0 : void 0,
		className: W("iro-progress", a),
		children: /* @__PURE__ */ P(Ve.Track, {
			className: "iro-progress-track",
			children: i ? Array.from({ length: i }, (e, t) => /* @__PURE__ */ P("span", {
				className: "iro-progress-segment",
				"data-filled": t < s || void 0
			}, t)) : /* @__PURE__ */ P(Ve.Indicator, { className: "iro-progress-indicator" })
		})
	});
}
// src/components/plan/Plan.tsx
function Ea({ status: e }) {
	return e === "running" ? /* @__PURE__ */ P(jt, { label: "Working" }) : e === "done" ? /* @__PURE__ */ P(Je, {}) : e === "error" ? /* @__PURE__ */ P(ot, {}) : null;
}
function Da({ steps: e, title: t = "Plan", progressLabel: n = (e, t) => `${e} of ${t} done`, className: r }) {
	let i = e.filter((e) => e.status === "done").length;
	return /* @__PURE__ */ F("section", {
		className: W("iro-plan", r),
		children: [
			/* @__PURE__ */ F("header", {
				className: "iro-plan-head",
				children: [/* @__PURE__ */ P("span", {
					className: "iro-plan-title",
					children: t
				}), /* @__PURE__ */ P("span", {
					className: "iro-plan-count",
					children: n(i, e.length)
				})]
			}),
			/* @__PURE__ */ P(Ta, {
				size: "sm",
				value: e.length ? i / e.length : 0,
				label: n(i, e.length)
			}),
			/* @__PURE__ */ P("ol", {
				className: "iro-plan-steps",
				children: e.map((e) => /* @__PURE__ */ F("li", {
					"data-status": e.status,
					children: [/* @__PURE__ */ P("span", {
						className: "iro-plan-mark",
						children: /* @__PURE__ */ P(Ea, { status: e.status })
					}), /* @__PURE__ */ F("span", {
						className: "iro-plan-text",
						children: [/* @__PURE__ */ P("span", {
							className: "iro-plan-label",
							children: e.label
						}), e.detail ? /* @__PURE__ */ P("span", {
							className: "iro-plan-detail",
							children: e.detail
						}) : null]
					})]
				}, e.id))
			})
		]
	});
}
// src/components/resize-grip/ResizeGrip.tsx
var Oa = 16, ka = 64, Aa = {
	width: 900,
	height: 360
};
function ja({ target: e, axis: t = "y", fitSize: n, maxFit: r = Aa, label: i = "Resize", onResize: a, className: o }) {
	let s = j(null), c = t !== "y", l = t !== "x", [u, d] = M(0), f = () => {
		let n = e.current?.getBoundingClientRect();
		n && d(Math.round(t === "x" ? n.width : n.height));
	};
	Se(f, []);
	let p = (t, n) => {
		let r = e.current;
		r && (c && (r.style.width = `${Math.max(0, t)}px`), l && (r.style.height = `${Math.max(0, n)}px`));
	}, m = () => {
		let t = e.current;
		if (!t) return;
		c && (t.style.width = ""), l && (t.style.height = "");
		let i = t.getBoundingClientRect(), o = n?.() ?? {};
		c && o.width && o.width > i.width && (t.style.width = `${Math.min(o.width, r.width)}px`), l && o.height && o.height > i.height && (t.style.height = `${Math.min(o.height, r.height)}px`), f(), a?.(!0);
	}, h = (t) => {
		let n = e.current?.getBoundingClientRect();
		n && t.button === 0 && (t.preventDefault(), t.currentTarget.setPointerCapture(t.pointerId), s.current = {
			x: t.clientX,
			y: t.clientY,
			width: n.width,
			height: n.height
		});
	}, g = (e) => {
		let t = s.current;
		t && p(t.width + e.clientX - t.x, t.height + e.clientY - t.y);
	}, _ = () => {
		s.current && (s.current = null, f(), a?.(!1));
	};
	return /* @__PURE__ */ P("div", {
		role: "separator",
		tabIndex: 0,
		"aria-label": `${i}. Double-click or Enter fits the content`,
		"aria-orientation": t === "x" ? "vertical" : "horizontal",
		"aria-valuenow": u,
		"aria-valuemin": 0,
		"aria-valuemax": t === "x" ? r.width : r.height,
		title: "Drag to resize, double-click to fit",
		"data-axis": t,
		onPointerDown: h,
		onPointerMove: g,
		onPointerUp: _,
		onPointerCancel: _,
		onDoubleClick: m,
		onKeyDown: (t) => {
			if (t.key === "Enter") {
				t.preventDefault(), m();
				return;
			}
			let n = t.shiftKey ? ka : Oa, r = {
				ArrowUp: [0, -n],
				ArrowDown: [0, n],
				ArrowLeft: [-n, 0],
				ArrowRight: [n, 0]
			}[t.key], i = e.current?.getBoundingClientRect();
			!r || !i || r[0] && !c || r[1] && !l || (t.preventDefault(), p(i.width + r[0], i.height + r[1]), f(), a?.(!1));
		},
		className: W("iro-resize-grip", o),
		children: /* @__PURE__ */ P("span", { className: "iro-resize-grip-mark" })
	});
}
// src/components/text-area/TextArea.tsx
function Ma(e) {
	return e.offsetHeight - e.clientHeight;
}
function Na({ invalid: e, autoGrow: t = !0, maxRows: n = 12, mono: r, resizable: i = !0, className: a, ref: o, onInput: s, ...c }) {
	let l = j(null), u = j(!1), d = () => {
		let e = l.current;
		if (!e || !t || u.current) return;
		e.style.height = "auto";
		let r = getComputedStyle(e), i = Number.parseFloat(r.lineHeight) || 20, a = Number.parseFloat(r.paddingTop) + Number.parseFloat(r.paddingBottom), o = i * n + a + Ma(e);
		e.style.height = `${Math.min(e.scrollHeight + Ma(e), o)}px`;
	};
	Se(d, [
		c.value,
		t,
		n
	]);
	let f = /* @__PURE__ */ P(Ie.Control, { render: /* @__PURE__ */ P("textarea", {
		ref: (e) => {
			l.current = e, typeof o == "function" ? o(e) : o && (o.current = e);
		},
		className: W("iro-text-area", a),
		"aria-invalid": e || void 0,
		"data-invalid": e || void 0,
		"data-mono": r || void 0,
		"data-resizable": i || void 0,
		onInput: (e) => {
			d(), s?.(e);
		},
		...c
	}) });
	return i ? /* @__PURE__ */ F("div", {
		className: "iro-text-area-box",
		children: [f, /* @__PURE__ */ P(ja, {
			target: l,
			label: "Resize the text box",
			fitSize: () => ({ height: l.current ? l.current.scrollHeight + Ma(l.current) : 0 }),
			onResize: (e) => {
				u.current = !e;
			}
		})]
	}) : f;
}
// src/components/prompt-input/PromptInput.tsx
function Pa({ value: e, onValueChange: t, onSubmit: n, placeholder: r = "Ask anything", streaming: i = !1, onStop: a, attachments: o, tools: s, maxRows: l = 8, disabled: u, sendLabel: d = "Send", stopLabel: f = "Stop", className: p, "aria-label": m = "Message" }) {
	let h = e.trim() !== "" && !u && !i, _ = (t) => {
		t?.preventDefault(), h && n(e);
	};
	return /* @__PURE__ */ F("form", {
		className: W("iro-prompt-input", p),
		"data-disabled": u || void 0,
		onSubmit: _,
		children: [
			o ? /* @__PURE__ */ P("div", {
				className: "iro-prompt-input-attachments",
				children: o
			}) : null,
			/* @__PURE__ */ P(Na, {
				className: "iro-prompt-input-text",
				"aria-label": m,
				placeholder: r,
				value: e,
				rows: 1,
				maxRows: l,
				resizable: !1,
				disabled: u,
				onChange: (e) => t(e.currentTarget.value),
				onKeyDown: (e) => {
					e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && (e.preventDefault(), _());
				}
			}),
			/* @__PURE__ */ F("div", {
				className: "iro-prompt-input-bar",
				children: [/* @__PURE__ */ P("div", {
					className: "iro-prompt-input-tools",
					children: s
				}), i ? /* @__PURE__ */ P(Z, {
					variant: "secondary",
					icon: /* @__PURE__ */ P(G, { icon: g }),
					label: f,
					onClick: a
				}) : /* @__PURE__ */ P(Z, {
					type: "submit",
					variant: "primary",
					icon: /* @__PURE__ */ P(G, { icon: c }),
					label: d,
					disabled: !h
				})]
			})
		]
	});
}
// src/components/prose/Prose.tsx
function Fa({ size: e = "md", className: t, ...n }) {
	return /* @__PURE__ */ P("div", {
		"data-size": e,
		className: W("iro-prose", t),
		...n
	});
}
// src/components/radio-group/RadioGroup.tsx
function Ia({ options: e, value: t, defaultValue: n, onValueChange: r, orientation: i = "vertical", disabled: a, name: o, className: s, "aria-label": c }) {
	return /* @__PURE__ */ P(Ue, {
		value: t,
		defaultValue: n,
		onValueChange: r ? (e) => r(e) : void 0,
		disabled: a,
		name: o,
		"aria-label": c,
		"data-orientation": i,
		className: W("iro-radio-group", s),
		children: e.map((e) => /* @__PURE__ */ F("label", {
			className: "iro-radio-label",
			"data-disabled": a || e.disabled || void 0,
			children: [/* @__PURE__ */ P(He.Root, {
				value: e.value,
				disabled: e.disabled,
				className: "iro-radio",
				children: /* @__PURE__ */ P(He.Indicator, { className: "iro-radio-indicator" })
			}), /* @__PURE__ */ F("span", {
				className: "iro-radio-text",
				children: [/* @__PURE__ */ P("span", { children: e.label }), e.description ? /* @__PURE__ */ P("span", {
					className: "iro-radio-description",
					children: e.description
				}) : null]
			})]
		}, e.value))
	});
}
// src/components/questionnaire/answers.ts
var La = "__other__";
function Ra(e, t) {
	return Object.fromEntries(Object.entries(e).map(([e, n]) => [e, n.map((n) => n === "__other__" ? (t[e] ?? "").trim() : n)]));
}
function za(e, t, n) {
	return e.every((e) => {
		let r = t[e] ?? [];
		return r.length > 0 && (!r.includes("__other__") || (n[e] ?? "").trim() !== "");
	});
}
// src/components/questionnaire/Questionnaire.tsx
function Ba({ questions: e, onSubmit: t, onSkip: n, submitLabel: r = "Send answers", skipLabel: i = "Skip", otherLabel: a = "Other", className: o }) {
	let [s, c] = M({}), [l, u] = M({}), d = za(e.map(({ id: e }) => e), s, l), f = (e, t) => c({
		...s,
		[e]: t
	});
	return /* @__PURE__ */ F("form", {
		className: W("iro-questionnaire", o),
		onSubmit: (e) => {
			e.preventDefault(), d && t(Ra(s, l));
		},
		children: [e.map((e) => {
			let t = e.other ? [...e.options, {
				value: La,
				label: a
			}] : e.options, n = s[e.id] ?? [];
			return /* @__PURE__ */ F("fieldset", {
				className: "iro-questionnaire-question",
				children: [
					/* @__PURE__ */ P("legend", {
						className: "iro-questionnaire-legend",
						children: e.question
					}),
					e.multiple ? /* @__PURE__ */ P("div", {
						className: "iro-questionnaire-choices",
						children: t.map((t) => /* @__PURE__ */ P(_r, {
							label: t.label,
							description: "description" in t ? t.description : void 0,
							checked: n.includes(t.value),
							onCheckedChange: (r) => f(e.id, r ? [...n, t.value] : n.filter((e) => e !== t.value))
						}, t.value))
					}) : /* @__PURE__ */ P(Ia, {
						value: n[0] ?? "",
						onValueChange: (t) => f(e.id, [t]),
						options: t
					}),
					n.includes("__other__") ? /* @__PURE__ */ P(Ar, {
						size: "sm",
						"aria-label": a,
						placeholder: "Your answer",
						value: l[e.id] ?? "",
						onChange: (t) => u({
							...l,
							[e.id]: t.currentTarget.value
						}),
						className: "iro-questionnaire-other"
					}) : null
				]
			}, e.id);
		}), /* @__PURE__ */ F("div", {
			className: "iro-questionnaire-actions",
			children: [n ? /* @__PURE__ */ P(X, {
				size: "sm",
				variant: "ghost",
				onClick: n,
				children: i
			}) : null, /* @__PURE__ */ P(X, {
				size: "sm",
				type: "submit",
				variant: "primary",
				disabled: !d,
				children: r
			})]
		})]
	});
}
// src/components/queue/Queue.tsx
function Va({ items: e, onRemove: t, onSendNow: n, label: r = (e) => `${e} queued`, className: i }) {
	return e.length === 0 ? null : /* @__PURE__ */ F("section", {
		className: W("iro-queue", i),
		"aria-label": r(e.length),
		children: [/* @__PURE__ */ P("span", {
			className: "iro-queue-title",
			"aria-hidden": "true",
			children: r(e.length)
		}), /* @__PURE__ */ P("ol", {
			className: "iro-queue-list",
			children: e.map((e) => /* @__PURE__ */ F("li", { children: [
				/* @__PURE__ */ P("span", {
					className: "iro-queue-text",
					title: e.text,
					children: e.text
				}),
				n ? /* @__PURE__ */ P(Z, {
					size: "sm",
					icon: /* @__PURE__ */ P(G, { icon: c }),
					label: `Send now: ${e.text}`,
					tooltip: !1,
					onClick: () => n(e.id)
				}) : null,
				/* @__PURE__ */ P(Z, {
					size: "sm",
					icon: /* @__PURE__ */ P(nt, {}),
					label: `Remove: ${e.text}`,
					tooltip: !1,
					onClick: () => t(e.id)
				})
			] }, e.id))
		})]
	});
}
// src/components/range-calendar/RangeCalendar.tsx
var Ha = (e) => ur(e, {
	day: "numeric",
	month: "short"
});
function Ua({ from: e, to: t, onRangeChange: n, maxDays: r, today: i = ar(), latest: a = i, className: o }) {
	let [s, c] = M(null), l = s ?? {
		from: e,
		to: t
	}, [u, d] = M(() => $(t || e || i)), [f, p] = M(null), [m, h] = M(t || e || i), g = j(null), _ = j(!1);
	A(() => {
		c(null), (t || e) && (d($(t || e)), h(t || e));
	}, [e, t]), A(() => {
		_.current && (_.current = !1, g.current?.querySelector(`[data-day="${m}"]`)?.focus());
	});
	let v = (e) => !!(s && r && Math.abs(ir(s.from, e)) > r - 1), y = (e) => !!(a && e > a) || v(e), b = (e) => {
		if (y(e)) return;
		let t = mr(l, e);
		t.to ? (c(null), n(t)) : c(t);
	}, x = l.to || (s && f && !y(f) ? f : ""), S = x && x < l.from ? x : l.from, C = x && x < l.from ? l.from : x || l.from, w = (e) => {
		let t = a && e > a ? a : e;
		_.current = !0, h(t), or($(t), u) || d($(t));
	}, ee = (e, t) => {
		let n = pr(e.key, t);
		n ? (e.preventDefault(), w(n)) : e.key === "Escape" && s && (e.preventDefault(), e.stopPropagation(), c(null));
	}, T = l.from && l.to ? ir(l.from, l.to) + 1 : 0, E = a ? $(a) : null, D = fr(u);
	return /* @__PURE__ */ F("div", {
		className: W("iro-calendar", o),
		children: [
			/* @__PURE__ */ F("div", {
				className: "iro-calendar-head",
				children: [
					/* @__PURE__ */ P(Z, {
						icon: /* @__PURE__ */ P(Ze, {}),
						size: "sm",
						label: "Previous month",
						tooltip: !1,
						onClick: () => d(sr(u, -1))
					}),
					/* @__PURE__ */ P("span", {
						className: "iro-calendar-title",
						"aria-live": "polite",
						children: D
					}),
					/* @__PURE__ */ P(Z, {
						icon: /* @__PURE__ */ P(J, {}),
						size: "sm",
						label: "Next month",
						tooltip: !1,
						disabled: !!(E && or(u, E)),
						onClick: () => d(sr(u, 1))
					})
				]
			}),
			/* @__PURE__ */ F("div", {
				ref: g,
				role: "group",
				"aria-label": D,
				className: "iro-calendar-grid",
				onPointerLeave: () => p(null),
				children: [er.map((e) => /* @__PURE__ */ P("span", {
					"aria-hidden": "true",
					className: "iro-calendar-weekday",
					children: e
				}, e)), lr(u).map((e) => {
					let t = S !== "" && e === S, n = C !== "" && e === C, r = S !== "" && e > S && e < C;
					return /* @__PURE__ */ P("div", {
						className: "iro-calendar-cell",
						"data-band": r || (t || n) && C !== S || void 0,
						"data-start": t && C !== S || void 0,
						"data-end": n && C !== S || void 0,
						children: /* @__PURE__ */ P("button", {
							type: "button",
							"data-day": e,
							"data-edge": t || n || void 0,
							"data-inside": r || void 0,
							"data-outside": !or($(e), u) || void 0,
							"data-today": e === i || void 0,
							tabIndex: e === m ? 0 : -1,
							disabled: y(e),
							"aria-label": dr(e),
							"aria-pressed": t || n || r,
							"aria-current": e === i ? "date" : void 0,
							className: "iro-calendar-day",
							onClick: () => b(e),
							onPointerEnter: () => p(e),
							onFocus: () => h(e),
							onKeyDown: (t) => ee(t, e),
							children: Number(e.slice(8))
						})
					}, e);
				})]
			}),
			/* @__PURE__ */ P("p", {
				className: "iro-calendar-status",
				"aria-live": "polite",
				children: s ? `From ${Ha(s.from)}: now pick the last day${r ? ` (${r} days at most)` : ""}.` : T ? `${Ha(l.from)} – ${Ha(l.to)} · ${T} ${T === 1 ? "day" : "days"}` : "Pick the first day, then the last."
			})
		]
	});
}
// src/components/shimmer/Shimmer.tsx
function Wa({ className: e, ...t }) {
	return /* @__PURE__ */ P("span", {
		className: W("iro-shimmer", e),
		...t
	});
}
// src/components/reasoning/Reasoning.tsx
var Ga = (e, t) => e ? "Thinking…" : t === void 0 ? "Thought" : `Thought for ${Math.round(t)} s`;
function Ka({ children: e, streaming: t = !1, duration: n, label: r = Ga, className: i }) {
	let [a, o] = M(t), [s, c] = M(!1);
	A(() => {
		s || o(t);
	}, [t, s]);
	let l = r(t, n);
	return /* @__PURE__ */ F(R.Root, {
		open: a,
		onOpenChange: (e) => {
			c(!0), o(e);
		},
		className: W("iro-reasoning", i),
		children: [/* @__PURE__ */ F(R.Trigger, {
			className: "iro-reasoning-trigger",
			children: [
				/* @__PURE__ */ P(mt, {}),
				P(t ? Wa : "span", { children: l }),
				/* @__PURE__ */ P(q, {})
			]
		}), /* @__PURE__ */ P(R.Panel, {
			className: "iro-reasoning-panel",
			children: /* @__PURE__ */ P("div", {
				className: "iro-reasoning-body",
				children: e
			})
		})]
	});
}
// src/components/schema-view/SchemaView.tsx
function qa({ fields: e, open: t, required: n }) {
	return /* @__PURE__ */ P("ul", {
		className: "iro-schema-fields",
		children: e.map((e) => {
			let r = /* @__PURE__ */ F(N, { children: [
				/* @__PURE__ */ P("code", {
					className: "iro-schema-name",
					children: e.name
				}),
				/* @__PURE__ */ P("code", {
					className: "iro-schema-type",
					children: e.type
				}),
				e.required ? /* @__PURE__ */ P("span", {
					className: "iro-schema-required",
					children: n
				}) : null,
				e.default === void 0 ? null : /* @__PURE__ */ F("code", {
					className: "iro-schema-default",
					children: ["= ", e.default]
				})
			] }), i = e.description ? /* @__PURE__ */ P("p", {
				className: "iro-schema-description",
				children: e.description
			}) : null;
			return /* @__PURE__ */ P("li", {
				className: "iro-schema-field",
				children: e.children ? /* @__PURE__ */ F(R.Root, {
					defaultOpen: t,
					children: [
						/* @__PURE__ */ F(R.Trigger, {
							className: "iro-schema-head",
							children: [/* @__PURE__ */ P(q, {}), r]
						}),
						i,
						/* @__PURE__ */ P(R.Panel, {
							className: "iro-schema-panel",
							children: /* @__PURE__ */ P(qa, {
								fields: e.children,
								open: t,
								required: n
							})
						})
					]
				}) : /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ P("div", {
					className: "iro-schema-head",
					children: r
				}), i] })
			}, e.name);
		})
	});
}
function Ja({ fields: e, method: t, title: n, description: r, defaultOpen: i = !1, requiredLabel: a = "required", className: o }) {
	return /* @__PURE__ */ F("section", {
		className: W("iro-schema", o),
		children: [t || n || r ? /* @__PURE__ */ F("header", {
			className: "iro-schema-top",
			children: [/* @__PURE__ */ F("div", {
				className: "iro-schema-endpoint",
				children: [t ? /* @__PURE__ */ P("span", {
					className: "iro-schema-method",
					"data-method": t.toLowerCase(),
					children: t.toUpperCase()
				}) : null, n ? /* @__PURE__ */ P("code", {
					className: "iro-schema-title",
					children: n
				}) : null]
			}), r ? /* @__PURE__ */ P("p", {
				className: "iro-schema-description",
				children: r
			}) : null]
		}) : null, /* @__PURE__ */ P(qa, {
			fields: e,
			open: i,
			required: a
		})]
	});
}
// src/components/scroll-area/ScrollArea.tsx
function Ya({ children: e, direction: t = "vertical", maxHeight: n, fade: r = !1, className: i, "aria-label": a }) {
	let o = t === "both" ? ["vertical", "horizontal"] : [t];
	return /* @__PURE__ */ F(We.Root, {
		className: W("iro-scroll-area", i),
		"data-fade": r || void 0,
		style: { "--scroll-area-max": typeof n == "number" ? `${n}px` : n },
		children: [
			/* @__PURE__ */ P(We.Viewport, {
				className: "iro-scroll-area-viewport",
				"aria-label": a,
				children: /* @__PURE__ */ P(We.Content, {
					className: "iro-scroll-area-content",
					"data-direction": t,
					children: e
				})
			}),
			o.map((e) => /* @__PURE__ */ P(We.Scrollbar, {
				orientation: e,
				className: "iro-scroll-area-bar",
				children: /* @__PURE__ */ P(We.Thumb, { className: "iro-scroll-area-thumb" })
			}, e)),
			t === "both" ? /* @__PURE__ */ P(We.Corner, {}) : null
		]
	});
}
// src/components/scrub-field/ScrubField.tsx
var Xa = 3, Za = .1, Qa = 10;
function $a({ value: e, onValueChange: t, min: n, max: r, step: i = 1, label: a, "aria-label": o, unit: s, defaultValue: c, format: l, size: u = "md", disabled: d, className: f }) {
	let p = j(null), m = j(null), [h, g] = M(!1), _ = {
		min: n,
		max: r,
		step: i
	}, v = (String(i).split(".")[1] ?? "").length, y = l ? l(e) : e.toFixed(v), b = r > n ? (Math.min(Math.max(e, n), r) - n) / (r - n) : 0, x = (e) => t(Wt(e, _));
	return /* @__PURE__ */ F("div", {
		ref: p,
		role: "slider",
		tabIndex: d ? -1 : 0,
		"aria-label": o ?? (typeof a == "string" ? a : void 0),
		"aria-valuemin": n,
		"aria-valuemax": r,
		"aria-valuenow": e,
		"aria-valuetext": s ? `${y} ${s}` : y,
		"aria-disabled": d || void 0,
		"data-size": u,
		"data-typing": h || void 0,
		className: W("iro-scrub", f),
		onPointerDown: (t) => {
			d || h || t.button !== 0 || (t.currentTarget.setPointerCapture(t.pointerId), m.current = {
				x: t.clientX,
				start: e,
				moved: !1
			});
		},
		onPointerMove: (e) => {
			let t = m.current;
			if (!t) return;
			let i = e.clientX - t.x;
			if (!t.moved && Math.abs(i) < Xa) return;
			t.moved = !0;
			let a = p.current?.getBoundingClientRect().width || 1;
			x(t.start + i / a * (r - n) * (e.shiftKey ? Za : 1));
		},
		onPointerUp: () => {
			let e = m.current;
			m.current = null, e && !e.moved && g(!0);
		},
		onPointerCancel: () => {
			m.current = null;
		},
		onKeyDown: (t) => {
			if (h || d) return;
			let a = t.shiftKey ? Qa : 1, o = {
				ArrowRight: i * a,
				ArrowUp: i * a,
				ArrowLeft: -i * a,
				ArrowDown: -i * a,
				PageUp: i * Qa,
				PageDown: -i * Qa
			};
			t.key === "Enter" ? (t.preventDefault(), g(!0)) : t.key === "Home" || t.key === "End" ? (t.preventDefault(), x(t.key === "Home" ? n : r)) : o[t.key] !== void 0 && (t.preventDefault(), x(e + (o[t.key] ?? 0)));
		},
		onDoubleClick: () => c !== void 0 && !h && x(c),
		children: [/* @__PURE__ */ P("span", {
			className: "iro-scrub-fill",
			style: { width: `${b * 100}%` }
		}), h ? /* @__PURE__ */ P("input", {
			autoFocus: !0,
			"aria-label": o ?? (typeof a == "string" ? a : "Value"),
			defaultValue: e.toFixed(v),
			className: "iro-scrub-input",
			onFocus: (e) => e.currentTarget.select(),
			onBlur: (e) => {
				let n = Gt(e.currentTarget.value, _);
				n !== null && t(n), g(!1), p.current?.focus();
			},
			onKeyDown: (t) => {
				t.key === "Enter" && t.currentTarget.blur(), t.key === "Escape" && (t.currentTarget.value = e.toFixed(v), t.currentTarget.blur());
			}
		}) : /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ P("span", {
			className: "iro-scrub-label",
			children: a
		}), /* @__PURE__ */ F("span", {
			className: "iro-scrub-value",
			children: [y, s ? /* @__PURE__ */ P("span", {
				className: "iro-scrub-unit",
				children: s
			}) : null]
		})] })]
	});
}
// src/components/section-title/SectionTitle.tsx
function eo({ icon: e, actions: t, level: n = 3, className: r, children: i, ...a }) {
	let o = `h${n}`;
	return /* @__PURE__ */ F("div", {
		className: W("iro-section-title", r),
		...a,
		children: [
			e ? /* @__PURE__ */ P("span", {
				className: "iro-section-title-icon",
				children: e
			}) : null,
			/* @__PURE__ */ P(o, {
				className: "iro-section-title-text",
				children: i
			}),
			t
		]
	});
}
// src/components/segmented/Segmented.tsx
function to({ options: e, value: t, onValueChange: n, size: r = "md", full: i = !1, disabled: a, className: o, "aria-label": s }) {
	let c = j(null), [l, u] = M(null);
	return Se(() => {
		let e = c.current;
		if (!e) return;
		let t = () => {
			let t = e.querySelector(".iro-segmented-option[data-checked]");
			u(t ? {
				x: t.offsetLeft,
				width: t.offsetWidth
			} : null);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	}, [t]), /* @__PURE__ */ F(Ue, {
		ref: c,
		value: t,
		onValueChange: (e) => n(e),
		disabled: a,
		"aria-label": s,
		"data-size": r,
		"data-full": i || void 0,
		className: W("iro-segmented", o),
		children: [l ? /* @__PURE__ */ P("span", {
			className: "iro-segmented-thumb",
			style: {
				width: l.width,
				transform: `translateX(${l.x}px)`
			},
			"aria-hidden": "true"
		}) : null, e.map((e) => /* @__PURE__ */ F(He.Root, {
			value: e.value,
			disabled: e.disabled,
			className: "iro-segmented-option",
			children: [e.icon, e.label]
		}, e.value))]
	});
}
// src/components/share-bar/ShareBar.tsx
function no({ label: e, parts: t, legend: n = !0, size: r = "md", format: i = Dn, ...a }) {
	let o = t.reduce((e, t) => e + Math.max(t.value, 0), 0), s = t.map((e) => o > 0 ? Math.max(e.value, 0) / o : 0), c = t.map((e, t) => On(t, e.color)), l = t.map((e, t) => `${e.name} ${kn(s[t])}`).join(", ");
	return /* @__PURE__ */ P(cn, {
		name: "share-bar",
		label: e,
		legend: n ? t.map((e, t) => ({
			name: e.name,
			color: c[t],
			kind: "box",
			value: i(e.value),
			share: kn(s[t])
		})) : void 0,
		table: {
			columns: [
				"",
				"Value",
				"Share"
			],
			rows: t.map((e, t) => [
				e.name,
				i(e.value),
				kn(s[t])
			])
		},
		...a,
		children: /* @__PURE__ */ P("div", {
			className: "iro-share-bar-track iro-chart-series",
			"data-size": r,
			role: "img",
			"aria-label": `${e}: ${l}`,
			children: t.map((e, t) => s[t] > 0 ? /* @__PURE__ */ P("span", {
				className: "iro-share-bar-part",
				style: {
					flexGrow: Math.max(e.value, 0),
					background: c[t]
				}
			}, t) : null)
		})
	});
}
// src/components/sheet/Sheet.tsx
function ro({ title: e, children: t, side: n = "right", trigger: r, open: i, onOpenChange: a, closeLabel: o = "Close", className: s }) {
	let c = Y();
	return /* @__PURE__ */ F(z.Root, {
		open: i,
		onOpenChange: a ? (e) => a(e) : void 0,
		children: [r ? /* @__PURE__ */ P(z.Trigger, { render: r }) : null, /* @__PURE__ */ F(z.Portal, {
			container: c,
			children: [/* @__PURE__ */ P(z.Backdrop, { className: "iro-dialog-backdrop" }), /* @__PURE__ */ F(z.Popup, {
				className: W("iro-sheet", s),
				"data-side": n,
				children: [/* @__PURE__ */ F("header", {
					className: "iro-sheet-header",
					children: [/* @__PURE__ */ P(z.Title, {
						className: "iro-sheet-title",
						children: e
					}), /* @__PURE__ */ P(z.Close, { render: /* @__PURE__ */ P(Z, {
						icon: /* @__PURE__ */ P(nt, {}),
						label: o,
						size: "sm",
						tooltip: !1
					}) })]
				}), /* @__PURE__ */ P("div", {
					className: "iro-sheet-body",
					children: t
				})]
			})]
		})]
	});
}
// src/components/sources/Sources.tsx
function io({ sources: e, label: t = (e) => `Used ${e} ${e === 1 ? "source" : "sources"}`, defaultOpen: n = !1, className: r }) {
	return /* @__PURE__ */ F(R.Root, {
		defaultOpen: n,
		className: W("iro-sources", r),
		children: [/* @__PURE__ */ F(R.Trigger, {
			className: "iro-sources-trigger",
			children: [t(e.length), /* @__PURE__ */ P(q, {})]
		}), /* @__PURE__ */ P(R.Panel, {
			className: "iro-sources-panel",
			children: /* @__PURE__ */ P("ol", {
				className: "iro-sources-list",
				children: e.map((e, t) => /* @__PURE__ */ F("li", { children: [/* @__PURE__ */ P("span", {
					className: "iro-sources-number",
					children: t + 1
				}), /* @__PURE__ */ F("a", {
					href: e.href,
					target: "_blank",
					rel: "noreferrer",
					className: "iro-sources-link",
					children: [/* @__PURE__ */ P("span", {
						className: "iro-sources-title",
						children: e.title
					}), e.site ? /* @__PURE__ */ P("span", {
						className: "iro-sources-site",
						children: e.site
					}) : null]
				})] }, e.href))
			})
		})]
	});
}
// src/components/sparkline/Sparkline.tsx
var ao = 5;
function oo({ values: e, label: t, color: n = "var(--iro-chart-1)", area: r = !1, height: i = 32, format: a = Dn, className: o, style: s, ...c }) {
	let [l, u] = Mn(), d = Math.min(...e), f = Math.max(...e) - d || 1, p = e.map((t, n) => [ao + n / Math.max(e.length - 1, 1) * (u - 10), ao + (1 - (t - d) / f) * (i - 10)]), m = p.at(-1), h = e.length > 0 ? `${t}: from ${a(e[0])} to ${a(e[e.length - 1])}` : t;
	return /* @__PURE__ */ P("div", {
		ref: l,
		role: "img",
		"aria-label": h,
		className: W("iro-sparkline", o),
		style: {
			height: i,
			color: n,
			...s
		},
		...c,
		children: u > 0 && m ? /* @__PURE__ */ P("svg", {
			width: u,
			height: i,
			"aria-hidden": "true",
			children: /* @__PURE__ */ F("g", {
				className: "iro-chart-series",
				children: [
					r ? /* @__PURE__ */ P("path", {
						className: "iro-chart-area",
						d: fn(p, i, !0)
					}) : null,
					/* @__PURE__ */ P("path", {
						className: "iro-chart-line",
						d: dn(p, !0)
					}),
					/* @__PURE__ */ P("circle", {
						className: "iro-chart-dot",
						cx: m[0],
						cy: m[1],
						r: 3
					})
				]
			})
		}) : null
	});
}
// src/components/speech-input/SpeechInput.tsx
var so = () => {
	if (typeof window > "u") return;
	let e = window;
	return e.SpeechRecognition ?? e.webkitSpeechRecognition;
};
function co({ onTranscript: e, lang: t, label: n = "Dictate", stopLabel: r = "Stop dictating", unsupportedLabel: i = "Dictation isn't available in this browser", size: a = "md", className: o }) {
	let [s, c] = M(!1), l = j(null), u = j(e);
	u.current = e;
	let d = so();
	A(() => () => l.current?.abort(), []);
	let f = () => {
		if (!d) return;
		let e = new d();
		e.lang = t ?? document.documentElement.lang, e.continuous = !0, e.interimResults = !0, e.onresult = (e) => {
			for (let t = e.resultIndex; t < e.results.length; t++) {
				let n = e.results[t];
				u.current(n[0].transcript, n.isFinal);
			}
		}, e.onend = () => {
			l.current = null, c(!1);
		}, l.current = e, e.start(), c(!0);
	};
	return /* @__PURE__ */ P(Z, {
		icon: /* @__PURE__ */ P(xt, {}),
		label: d ? s ? r : n : i,
		size: a,
		active: s,
		disabled: !d,
		"data-listening": s || void 0,
		className: W("iro-speech-input", o),
		onClick: () => s ? l.current?.stop() : f()
	});
}
// src/components/splitter/share.ts
function lo(e, t, { min: n, max: r, minStart: i, minEnd: a }) {
	let o = t > 0 ? Math.max(n, i / t) : n, s = t > 0 ? Math.min(r, 1 - a / t) : r;
	return Math.min(Math.max(e, o), Math.max(o, s));
}
// src/components/splitter/Splitter.tsx
var uo = .02, fo = .05;
function po({ container: e, share: t, onShareChange: n, onCommit: r, onReset: i, min: a = .2, max: o = .8, minStart: s = 0, minEnd: c = 0, label: l = "Resize panes", className: u }) {
	let d = j(null), f = j(t);
	f.current = t;
	let p = (t) => {
		let r = e.current?.getBoundingClientRect().width ?? 0;
		f.current = lo(t, r, {
			min: a,
			max: o,
			minStart: s,
			minEnd: c
		}), n(f.current);
	}, m = (e) => {
		e.button === 0 && (e.preventDefault(), e.currentTarget.setPointerCapture(e.pointerId), d.current = {
			x: e.clientX,
			share: f.current
		});
	}, h = (t) => {
		let n = e.current?.getBoundingClientRect().width;
		d.current && n && p(d.current.share + (t.clientX - d.current.x) / n);
	}, g = () => {
		d.current && (d.current = null, r?.(f.current));
	}, _ = (e) => e.key === "ArrowLeft" || e.key === "ArrowRight";
	return /* @__PURE__ */ P("div", {
		role: "separator",
		tabIndex: 0,
		"aria-label": l,
		"aria-orientation": "vertical",
		"aria-valuenow": Math.round(t * 100),
		"aria-valuemin": Math.round(a * 100),
		"aria-valuemax": Math.round(o * 100),
		onPointerDown: m,
		onPointerMove: h,
		onPointerUp: g,
		onPointerCancel: g,
		onKeyDown: (e) => {
			if (!_(e)) return;
			e.preventDefault();
			let n = e.shiftKey ? fo : uo;
			p(t + (e.key === "ArrowLeft" ? -n : n));
		},
		onKeyUp: (e) => {
			_(e) && r?.(f.current);
		},
		onDoubleClick: i,
		className: W("iro-splitter", u),
		children: /* @__PURE__ */ P("span", { className: "iro-splitter-line" })
	});
}
// src/components/stack-trace/stack.ts
var mo = /^\s*at (?:(.+?) \()?(.+?)(?::(\d+))?(?::(\d+))?\)?$/, ho = /^(.*?)@(.+?)(?::(\d+))?(?::(\d+))?$/, go = /node_modules|^node:|^internal\/|^<anonymous>$|^native$/;
function _o(e) {
	let t = e.split(/\r?\n/), n = [], r = [];
	for (let e of t) {
		let t = e.match(mo) ?? (e.includes("@") ? e.match(ho) : null);
		if (!t) {
			n.length === 0 && e.trim() && r.push(e.trim());
			continue;
		}
		let [, i, a, o, s] = t;
		n.push({
			fn: i?.trim() || void 0,
			file: a,
			line: o ? Number(o) : void 0,
			column: s ? Number(s) : void 0,
			internal: go.test(a)
		});
	}
	return {
		message: r.join(" "),
		frames: n
	};
}
// src/components/stack-trace/StackTrace.tsx
var vo = ({ file: e, line: t, column: n }) => [
	e,
	t,
	n
].filter((e) => e !== void 0).join(":");
function yo({ stack: e, onOpenFrame: t, defaultShowInternal: n = !1, className: r }) {
	let [i, a] = M(n), { message: o, frames: s } = _o(e), c = s.filter((e) => e.internal).length, l = i ? s : s.filter((e) => !e.internal);
	return /* @__PURE__ */ F("figure", {
		className: W("iro-stack-trace", r),
		children: [
			/* @__PURE__ */ F("figcaption", {
				className: "iro-stack-trace-head",
				children: [
					/* @__PURE__ */ P(ot, {}),
					/* @__PURE__ */ P("span", {
						className: "iro-stack-trace-message",
						children: o || "Error"
					}),
					/* @__PURE__ */ P(Cr, {
						text: e,
						label: "Copy stack trace"
					})
				]
			}),
			/* @__PURE__ */ P("ol", {
				className: "iro-stack-trace-frames",
				children: l.map((e, n) => /* @__PURE__ */ F("li", {
					"data-internal": e.internal || void 0,
					className: "iro-stack-trace-frame",
					children: [/* @__PURE__ */ P("span", {
						className: "iro-stack-trace-fn",
						children: e.fn ?? "(anonymous)"
					}), t ? /* @__PURE__ */ P("button", {
						type: "button",
						className: "iro-stack-trace-place",
						onClick: () => t(e),
						children: vo(e)
					}) : /* @__PURE__ */ P("span", {
						className: "iro-stack-trace-place",
						children: vo(e)
					})]
				}, n))
			}),
			c > 0 ? /* @__PURE__ */ F("button", {
				type: "button",
				className: "iro-stack-trace-toggle",
				onClick: () => a(!i),
				children: [
					i ? "Hide" : "Show",
					" ",
					c,
					" internal ",
					c === 1 ? "frame" : "frames"
				]
			}) : null
		]
	});
}
// src/components/star-rating/StarRating.tsx
var bo = [
	1,
	2,
	3,
	4,
	5
];
function xo({ value: e, onValueChange: t, readOnly: n, size: r = "md", label: i = "Rating", className: a }) {
	let [o, s] = M(null), c = (e) => t?.(Math.max(0, Math.min(5, e))), l = o ?? e;
	return n ? /* @__PURE__ */ P("span", {
		role: "img",
		"aria-label": `${e} of 5 stars`,
		"data-size": r,
		className: W("iro-stars", a),
		children: bo.map((t) => /* @__PURE__ */ P("span", {
			className: "iro-star",
			"data-on": t <= e || void 0,
			children: /* @__PURE__ */ P(Et, {})
		}, t))
	}) : /* @__PURE__ */ P(Ue, {
		"aria-label": i,
		value: e ? String(e) : "",
		onValueChange: (e) => c(Number(e)),
		onKeyDown: (e) => {
			if (/^[0-5]$/.test(e.key)) c(Number(e.key));
			else if (e.key === "Delete" || e.key === "Backspace") c(0);
			else return;
			e.preventDefault();
		},
		onMouseLeave: () => s(null),
		"data-size": r,
		className: W("iro-stars", a),
		children: bo.map((t) => /* @__PURE__ */ P(He.Root, {
			value: String(t),
			"aria-label": `${t} star${t === 1 ? "" : "s"}`,
			"data-on": t <= l || void 0,
			"data-preview": o !== null || void 0,
			className: "iro-star",
			onMouseEnter: () => s(t),
			onClick: () => {
				e === t && c(0);
			},
			children: /* @__PURE__ */ P(Et, {})
		}, t))
	});
}
// src/components/stat/Stat.tsx
function So({ label: e, value: t, change: n, icon: r, hint: i, chart: a, variant: o = "card", className: s, ...c }) {
	let l = /* @__PURE__ */ F(N, { children: [
		/* @__PURE__ */ F("span", {
			className: "iro-stat-label",
			children: [r, e]
		}),
		/* @__PURE__ */ P("span", {
			className: "iro-stat-value",
			children: t
		}),
		n ? /* @__PURE__ */ P("span", {
			className: "iro-stat-change",
			children: n
		}) : null,
		i ? /* @__PURE__ */ P("span", {
			className: "iro-stat-hint",
			children: i
		}) : null,
		a ? /* @__PURE__ */ P("div", {
			className: "iro-stat-chart",
			children: a
		}) : null
	] });
	return P(o === "card" ? wa : "div", {
		"data-variant": o,
		className: W("iro-stat", s),
		...c,
		children: l
	});
}
// src/components/status-dot/StatusDot.tsx
function Co({ tone: e = "neutral", pulse: t, label: n, className: r, ...i }) {
	return /* @__PURE__ */ F("span", {
		...n ? {
			role: "img",
			"aria-label": n
		} : { "aria-hidden": !0 },
		"data-tone": e,
		"data-pulse": t,
		className: W("iro-status-dot", r),
		...i,
		children: [t ? /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ P("span", { className: "iro-status-dot-ring" }), /* @__PURE__ */ P("span", {
			className: "iro-status-dot-ring",
			"data-late": ""
		})] }) : null, /* @__PURE__ */ P("span", { className: "iro-status-dot-core" })]
	});
}
// src/components/stepper/Stepper.tsx
function wo({ steps: e, current: t, orientation: n = "horizontal", onStepClick: r, className: i, ...a }) {
	return /* @__PURE__ */ P("ol", {
		"data-orientation": n,
		className: W("iro-stepper", i),
		...a,
		children: e.map(({ label: e, description: n }, i) => {
			let a = i < t ? "done" : i === t ? "current" : "waiting", o = /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ P("span", {
				className: "iro-stepper-marker",
				"aria-hidden": "true",
				children: a === "done" ? /* @__PURE__ */ P(Je, {}) : i + 1
			}), /* @__PURE__ */ F("span", {
				className: "iro-stepper-text",
				children: [/* @__PURE__ */ P("span", {
					className: "iro-stepper-label",
					children: e
				}), n ? /* @__PURE__ */ P("span", {
					className: "iro-stepper-description",
					children: n
				}) : null]
			})] });
			return /* @__PURE__ */ P("li", {
				"data-state": a,
				"aria-current": a === "current" ? "step" : void 0,
				children: a === "done" && r ? /* @__PURE__ */ P("button", {
					type: "button",
					className: "iro-stepper-step",
					onClick: () => r(i),
					children: o
				}) : /* @__PURE__ */ P("span", {
					className: "iro-stepper-step",
					children: o
				})
			}, e);
		})
	});
}
// src/components/suggestions/Suggestions.tsx
function To({ suggestions: e, onPick: t, className: n, "aria-label": r = "Suggestions" }) {
	let i = e.map((e) => typeof e == "string" ? { text: e } : e);
	return /* @__PURE__ */ P("ul", {
		"aria-label": r,
		className: W("iro-suggestions", n),
		children: i.map(({ text: e, icon: n }) => /* @__PURE__ */ P("li", { children: /* @__PURE__ */ F("button", {
			type: "button",
			className: "iro-suggestion",
			onClick: () => t(e),
			children: [n, e]
		}) }, e))
	});
}
// src/components/tabs/Tabs.tsx
function Eo(e) {
	return {
		"data-checkable": e.checked !== void 0 || void 0,
		"data-menu": e.menu?.length ? !0 : void 0
	};
}
function Do({ tab: e, active: t }) {
	let n = Eo(e), r = /* @__PURE__ */ F("span", {
		className: "iro-tab",
		"data-active": t || void 0,
		...n,
		children: [
			e.icon,
			e.label,
			e.badge
		]
	});
	return !n["data-checkable"] && !n["data-menu"] ? r : /* @__PURE__ */ F("span", {
		className: "iro-tab-wrap",
		children: [
			n["data-checkable"] ? /* @__PURE__ */ P("span", {
				className: "iro-tab-check",
				children: /* @__PURE__ */ P(_r, {
					checked: !!e.checked,
					onCheckedChange: (t) => e.onCheckedChange?.(t),
					"aria-label": e.checkLabel ?? (typeof e.label == "string" ? `Use ${e.label}` : "Use")
				})
			}) : null,
			r,
			e.menu?.length ? /* @__PURE__ */ P(Jn, {
				items: e.menu,
				trigger: /* @__PURE__ */ P("button", {
					type: "button",
					className: "iro-tab-menu",
					"aria-label": e.menuLabel ?? "More",
					children: /* @__PURE__ */ P(q, {})
				})
			}) : null
		]
	});
}
function Oo({ tabs: e, value: t, onValueChange: n, variant: r = "line", className: i, "aria-label": a }) {
	let o = e.some((e) => e.checked !== void 0 || e.menu?.length);
	return /* @__PURE__ */ F(Ge.Root, {
		value: t,
		onValueChange: (e) => n(e),
		"data-variant": r,
		className: W("iro-tabs", i),
		children: [/* @__PURE__ */ F("div", {
			className: "iro-tabs-bar",
			children: [/* @__PURE__ */ F(Ge.List, {
				className: "iro-tabs-list",
				"aria-label": a,
				children: [e.map((e) => /* @__PURE__ */ F(Ge.Tab, {
					value: e.value,
					disabled: e.disabled,
					className: "iro-tab",
					...Eo(e),
					children: [
						e.icon,
						e.label,
						e.badge
					]
				}, e.value)), r === "folder" ? null : /* @__PURE__ */ P(Ge.Indicator, { className: "iro-tabs-indicator" })]
			}), o ? /* @__PURE__ */ P("div", {
				className: "iro-tabs-list iro-tabs-extras",
				children: e.map((e) => /* @__PURE__ */ P(Do, {
					tab: e,
					active: e.value === t
				}, e.value))
			}) : null]
		}), e.map((e) => e.content === void 0 ? null : /* @__PURE__ */ P(Ge.Panel, {
			value: e.value,
			className: "iro-tabs-panel",
			children: e.content
		}, e.value))]
	});
}
// src/components/tag-input/tags.ts
function ko(e, t, n = Infinity) {
	let r = [...e];
	for (let e of t.split(",")) {
		let t = e.trim();
		if (r.length >= n) break;
		t && !r.some((e) => e.toLowerCase() === t.toLowerCase()) && r.push(t);
	}
	return r;
}
// src/components/tag-input/TagInput.tsx
function Ao({ value: e, onValueChange: t, placeholder: n, max: r, size: i = "md", disabled: a, invalid: o, id: s, className: c, "aria-label": l, removeLabel: u = (e) => `Remove ${e}` }) {
	let [d, f] = M(""), p = j(null), m = (n) => {
		let i = ko(e, n, r);
		i.length !== e.length && t(i), f("");
	};
	return /* @__PURE__ */ F("div", {
		className: W("iro-text-field", "iro-tag-input", c),
		"data-size": i,
		"data-invalid": o || void 0,
		"data-disabled": a || void 0,
		onClick: () => p.current?.focus(),
		children: [e.map((n) => /* @__PURE__ */ P(vr, {
			size: "sm",
			removeLabel: u(n),
			onRemove: a ? void 0 : () => t(e.filter((e) => e !== n)),
			children: n
		}, n)), /* @__PURE__ */ P(Me, {
			ref: p,
			id: s,
			value: d,
			disabled: a,
			placeholder: e.length === 0 ? n : void 0,
			"aria-label": l,
			"aria-invalid": o || void 0,
			className: "iro-text-field-input iro-tag-input-input",
			onChange: (e) => {
				let t = e.currentTarget.value;
				t.includes(",") ? m(t) : f(t);
			},
			onKeyDown: (n) => {
				(n.key === "Enter" || n.key === ",") && d.trim() ? (n.preventDefault(), m(d)) : n.key === "Backspace" && !d && e.length > 0 && t(e.slice(0, -1));
			},
			onBlur: () => d.trim() && m(d)
		})]
	});
}
// src/components/terminal/Terminal.tsx
var jo = 24, Mo = (e) => typeof e == "string" ? e : e.text;
function No({ lines: e, title: t = "Terminal", maxHeight: n = 320, running: r = !1, className: i }) {
	let a = j(null), o = j(!0);
	return A(() => {
		let e = a.current;
		e && o.current && (e.scrollTop = e.scrollHeight);
	}, [e.length]), /* @__PURE__ */ F("figure", {
		className: W("iro-terminal", i),
		children: [/* @__PURE__ */ F("figcaption", {
			className: "iro-terminal-head",
			children: [
				/* @__PURE__ */ P("span", {
					className: "iro-terminal-dots",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ P("span", {
					className: "iro-terminal-title",
					children: t
				}),
				/* @__PURE__ */ P(Cr, {
					text: e.map(Mo).join("\n"),
					label: "Copy output"
				})
			]
		}), /* @__PURE__ */ P("pre", {
			ref: a,
			tabIndex: 0,
			"data-running": r || void 0,
			className: "iro-terminal-body",
			style: { "--terminal-max": `${n}px` },
			onScroll: (e) => {
				let t = e.currentTarget;
				o.current = t.scrollHeight - t.scrollTop - t.clientHeight <= jo;
			},
			children: e.map((e, t) => /* @__PURE__ */ P("span", {
				"data-kind": typeof e == "string" ? void 0 : e.kind,
				className: "iro-terminal-line",
				children: Mo(e) || "​"
			}, t))
		})]
	});
}
// src/components/test-results/TestResults.tsx
var Po = {
	passed: {
		label: "Passed",
		icon: /* @__PURE__ */ P(it, {})
	},
	failed: {
		label: "Failed",
		icon: /* @__PURE__ */ P(ot, {})
	},
	skipped: {
		label: "Skipped",
		icon: /* @__PURE__ */ P(Ye, {})
	},
	running: {
		label: "Running",
		icon: /* @__PURE__ */ P(jt, {})
	}
}, Fo = [
	"passed",
	"failed",
	"skipped"
], Io = (e) => e < 1e3 ? `${Math.round(e)} ms` : `${(e / 1e3).toFixed(1)} s`;
function Lo({ suites: e, title: t, className: n }) {
	let r = e.flatMap((e) => e.tests), i = Object.fromEntries(Fo.map((e) => [e, r.filter((t) => t.status === e).length])), a = r.reduce((e, t) => e + (t.duration ?? 0), 0);
	return /* @__PURE__ */ F("section", {
		className: W("iro-test-results", n),
		children: [
			/* @__PURE__ */ F("header", {
				className: "iro-test-results-head",
				children: [
					t ? /* @__PURE__ */ P("span", {
						className: "iro-test-results-title",
						children: t
					}) : null,
					/* @__PURE__ */ P("span", {
						className: "iro-test-results-counts",
						children: Fo.map((e) => i[e] > 0 ? /* @__PURE__ */ F("span", {
							"data-status": e,
							className: "iro-test-results-count",
							children: [
								i[e],
								" ",
								e
							]
						}, e) : null)
					}),
					a > 0 ? /* @__PURE__ */ P("span", {
						className: "iro-test-results-time",
						children: Io(a)
					}) : null
				]
			}),
			/* @__PURE__ */ P("div", {
				className: "iro-test-results-bar",
				"aria-hidden": "true",
				children: Fo.map((e) => i[e] > 0 ? /* @__PURE__ */ P("span", {
					"data-status": e,
					style: { flexGrow: i[e] }
				}, e) : null)
			}),
			e.map((e) => {
				let t = e.tests.some((e) => e.status === "failed");
				return /* @__PURE__ */ F(R.Root, {
					defaultOpen: t,
					"data-failing": t || void 0,
					className: "iro-test-suite",
					children: [/* @__PURE__ */ F(R.Trigger, {
						className: "iro-test-suite-trigger",
						children: [
							/* @__PURE__ */ P(q, {}),
							/* @__PURE__ */ P("span", {
								className: "iro-test-suite-name",
								children: e.name
							}),
							/* @__PURE__ */ F("span", {
								className: "iro-test-suite-tally",
								children: [
									e.tests.filter((e) => e.status === "passed").length,
									"/",
									e.tests.length
								]
							})
						]
					}), /* @__PURE__ */ P(R.Panel, {
						className: "iro-test-suite-panel",
						children: /* @__PURE__ */ P("ul", {
							className: "iro-test-suite-tests",
							children: e.tests.map((e) => /* @__PURE__ */ F("li", {
								"data-status": e.status,
								className: "iro-test-case",
								children: [/* @__PURE__ */ F("span", {
									className: "iro-test-case-row",
									children: [
										/* @__PURE__ */ P("span", {
											className: "iro-test-case-icon",
											role: "img",
											"aria-label": Po[e.status].label,
											children: Po[e.status].icon
										}),
										/* @__PURE__ */ P("span", {
											className: "iro-test-case-name",
											children: e.name
										}),
										e.duration === void 0 ? null : /* @__PURE__ */ P("span", {
											className: "iro-test-case-time",
											children: Io(e.duration)
										})
									]
								}), e.error ? /* @__PURE__ */ P("div", {
									className: "iro-test-case-error",
									children: e.error
								}) : null]
							}, e.name))
						})
					})]
				}, e.name);
			})
		]
	});
}
// src/components/time-field/TimeField.tsx
function Ro({ value: e, onValueChange: t, seconds: n = !1, className: r, ...i }) {
	return /* @__PURE__ */ P(Ar, {
		type: "time",
		value: e,
		step: n ? 1 : 60,
		onChange: (e) => t(e.currentTarget.value),
		className: W("iro-time-field", r),
		...i
	});
}
// src/components/timeline/Timeline.tsx
function zo({ items: e, className: t, ...n }) {
	return /* @__PURE__ */ P("ol", {
		className: W("iro-timeline", t),
		...n,
		children: e.map(({ id: e, title: t, time: n, description: r, content: i, icon: a, tone: o = "neutral" }) => /* @__PURE__ */ F("li", {
			"data-tone": o,
			children: [/* @__PURE__ */ P("span", {
				className: "iro-timeline-marker",
				"data-icon": a ? "" : void 0,
				"aria-hidden": "true",
				children: a
			}), /* @__PURE__ */ F("div", {
				className: "iro-timeline-body",
				children: [
					/* @__PURE__ */ F("div", {
						className: "iro-timeline-head",
						children: [/* @__PURE__ */ P("span", {
							className: "iro-timeline-title",
							children: t
						}), n ? /* @__PURE__ */ P("span", {
							className: "iro-timeline-time",
							children: n
						}) : null]
					}),
					r ? /* @__PURE__ */ P("div", {
						className: "iro-timeline-description",
						children: r
					}) : null,
					i ? /* @__PURE__ */ P("div", {
						className: "iro-timeline-content",
						children: i
					}) : null
				]
			})]
		}, e))
	});
}
// src/components/toaster/Toaster.tsx
var Bo = {
	info: /* @__PURE__ */ P(rt, {}),
	success: /* @__PURE__ */ P(it, {}),
	warning: /* @__PURE__ */ P(at, {}),
	error: /* @__PURE__ */ P(ot, {})
}, Vo = U.createToastManager();
function Ho({ closeLabel: e }) {
	let { toasts: t } = U.useToastManager();
	return t.map((t) => {
		let n = t.type ?? "info";
		return /* @__PURE__ */ P(U.Root, {
			toast: t,
			className: "iro-toast",
			"data-tone": n,
			children: /* @__PURE__ */ F(U.Content, {
				className: "iro-toast-content",
				children: [
					/* @__PURE__ */ P("span", {
						className: "iro-toast-icon",
						children: Bo[n] ?? Bo.info
					}),
					/* @__PURE__ */ F("div", {
						className: "iro-toast-text",
						children: [/* @__PURE__ */ P(U.Title, { className: "iro-toast-title" }), /* @__PURE__ */ P(U.Description, { className: "iro-toast-description" })]
					}),
					t.actionProps ? /* @__PURE__ */ P(U.Action, { render: /* @__PURE__ */ P(X, { size: "sm" }) }) : null,
					/* @__PURE__ */ P(U.Close, {
						className: "iro-toast-close",
						"aria-label": e,
						children: /* @__PURE__ */ P(nt, {})
					})
				]
			})
		}, t.id);
	});
}
function Uo({ title: e, description: t, tone: n = "info", action: r, timeout: i }) {
	return Vo.add({
		title: e,
		description: t,
		type: n,
		timeout: i,
		actionProps: r ? {
			children: r.label,
			onClick: r.onClick
		} : void 0
	});
}
function Wo(e) {
	Vo.close(e);
}
function Go({ closeLabel: e = "Dismiss" }) {
	let t = Y();
	return /* @__PURE__ */ P(U.Provider, {
		toastManager: Vo,
		children: /* @__PURE__ */ P(U.Portal, {
			container: t,
			children: /* @__PURE__ */ P(U.Viewport, {
				className: "iro-toaster",
				children: /* @__PURE__ */ P(Ho, { closeLabel: e })
			})
		})
	});
}
// src/components/tool-call/ToolCall.tsx
var Ko = {
	running: {
		label: "Running",
		icon: /* @__PURE__ */ P(jt, {})
	},
	done: {
		label: "Done",
		icon: /* @__PURE__ */ P(it, {})
	},
	error: {
		label: "Failed",
		icon: /* @__PURE__ */ P(ot, {})
	}
};
function qo({ name: e, summary: t, status: n, input: r, output: i, icon: a, defaultOpen: o = !1, inputLabel: s = "Input", outputLabel: c = "Output", className: l }) {
	let u = Ko[n];
	return /* @__PURE__ */ F(R.Root, {
		defaultOpen: o,
		"data-status": n,
		className: W("iro-tool-call", l),
		children: [/* @__PURE__ */ F(R.Trigger, {
			className: "iro-tool-call-trigger",
			children: [
				/* @__PURE__ */ P("span", {
					className: "iro-tool-call-icon",
					children: a ?? /* @__PURE__ */ P(ht, {})
				}),
				/* @__PURE__ */ P("code", {
					className: "iro-tool-call-name",
					children: e
				}),
				t ? /* @__PURE__ */ P("span", {
					className: "iro-tool-call-summary",
					children: t
				}) : null,
				/* @__PURE__ */ P("span", {
					className: "iro-tool-call-state",
					role: "img",
					"aria-label": u.label,
					children: u.icon
				}),
				/* @__PURE__ */ P(q, {})
			]
		}), r || i ? /* @__PURE__ */ P(R.Panel, {
			className: "iro-tool-call-panel",
			children: /* @__PURE__ */ F("div", {
				className: "iro-tool-call-body",
				children: [r ? /* @__PURE__ */ F("section", { children: [/* @__PURE__ */ P("h4", {
					className: "iro-tool-call-label",
					children: s
				}), r] }) : null, i ? /* @__PURE__ */ F("section", { children: [/* @__PURE__ */ P("h4", {
					className: "iro-tool-call-label",
					children: c
				}), i] }) : null]
			})
		}) : null]
	});
}
// src/components/toolbar/Toolbar.tsx
function Jo({ orientation: e = "horizontal", className: t, ...n }) {
	return /* @__PURE__ */ P(Ke.Root, {
		orientation: e,
		className: W("iro-toolbar", t),
		...n
	});
}
function Yo({ icon: e, label: t, children: n, active: r, shortcut: i, disabled: a, onClick: o }) {
	return /* @__PURE__ */ P(Ke.Button, {
		disabled: a,
		render: n ? /* @__PURE__ */ P(X, {
			size: "sm",
			variant: "ghost",
			icon: e,
			pressed: r,
			"aria-label": t,
			onClick: o,
			children: n
		}) : /* @__PURE__ */ P(Z, {
			size: "sm",
			icon: e,
			label: t,
			shortcut: i,
			active: r,
			onClick: o
		})
	});
}
function Xo() {
	return /* @__PURE__ */ P(Ke.Separator, { className: "iro-toolbar-separator" });
}
// src/components/tour/Tour.tsx
var Zo = 320, Qo = 6, $o = 12, es = 8;
function ts(e) {
	let t = document.querySelector(e);
	if (!t) return null;
	let n = t.getBoundingClientRect();
	if (n.width === 0 && n.height === 0 && t.children.length) {
		let e = Array.from(t.children, (e) => e.getBoundingClientRect()), r = Math.min(...e.map((e) => e.left)), i = Math.min(...e.map((e) => e.top));
		n = new DOMRect(r, i, Math.max(...e.map((e) => e.right)) - r, Math.max(...e.map((e) => e.bottom)) - i);
	}
	return n.width === 0 && n.height === 0 ? null : {
		x: n.left,
		y: n.top,
		width: n.width,
		height: n.height
	};
}
function ns(e, t, n) {
	let r = window.innerWidth, i = window.innerHeight, a = Math.min(Zo, r - 16);
	if (!e) return {
		left: r / 2 - a / 2,
		top: i / 2 - n / 2,
		width: a
	};
	let o = e.x, s = e.y + e.height + Qo + $o;
	return t === "top" && (s = e.y - Qo - $o - n), (t === "right" || t === "left") && (o = t === "right" ? e.x + e.width + Qo + $o : e.x - Qo - $o - a, s = e.y), s + n > i - es && t !== "top" && (s = e.y - Qo - $o - n), {
		left: Math.min(Math.max(es, o), r - a - es),
		top: Math.min(Math.max(es, s), i - n - es),
		width: a
	};
}
function rs({ steps: e, open: t, onClose: n, className: r }) {
	let i = Y(), [a, o] = M(0), [s, c] = M(null), [l, u] = M(170), d = j(null), f = j(null), p = e[a];
	A(() => {
		t && o(0);
	}, [t]);
	let m = ve(() => {
		p && c(ts(p.target)), d.current && u(d.current.offsetHeight);
	}, [p]);
	Se(() => {
		if (!t || !p) return;
		let e = document.querySelector(p.target);
		e?.scrollIntoView({ block: "nearest" }), m(), window.addEventListener("resize", m), window.addEventListener("scroll", m, !0);
		let n = new ResizeObserver(m);
		if (e) {
			n.observe(e);
			for (let t of Array.from(e.children)) n.observe(t);
		}
		return () => {
			window.removeEventListener("resize", m), window.removeEventListener("scroll", m, !0), n.disconnect();
		};
	}, [
		t,
		p,
		m
	]);
	let h = () => a >= e.length - 1 ? n(!0) : o(a + 1), g = () => o(Math.max(0, a - 1)), _ = (e) => {
		if (e.key === "ArrowRight" || e.key === "Enter" && !(e.target instanceof HTMLButtonElement)) h();
		else if (e.key === "ArrowLeft") g();
		else return;
		e.preventDefault();
	}, v = ns(s, p?.placement, l);
	return /* @__PURE__ */ P(z.Root, {
		open: t && !!p,
		onOpenChange: (e) => !e && n(!1),
		disablePointerDismissal: !0,
		children: /* @__PURE__ */ F(z.Portal, {
			container: i,
			children: [/* @__PURE__ */ P("div", {
				"aria-hidden": "true",
				className: "iro-tour-spotlight",
				"data-empty": !s || void 0,
				style: s ? {
					left: s.x - Qo,
					top: s.y - Qo,
					width: s.width + 12,
					height: s.height + 12
				} : void 0
			}), p ? /* @__PURE__ */ F(z.Popup, {
				ref: d,
				initialFocus: f,
				className: W("iro-tour", r),
				style: {
					left: v.left,
					top: v.top,
					width: v.width
				},
				onKeyDown: _,
				children: [
					/* @__PURE__ */ F("div", {
						className: "iro-tour-progress",
						children: [/* @__PURE__ */ F("span", {
							className: "iro-tour-count",
							children: [
								a + 1,
								" / ",
								e.length
							]
						}), /* @__PURE__ */ P("span", {
							className: "iro-tour-dots",
							children: e.map((e, t) => /* @__PURE__ */ P("span", {
								className: "iro-tour-dot",
								"data-current": t === a || void 0
							}, e.target + e.title))
						})]
					}),
					/* @__PURE__ */ P(z.Title, {
						className: "iro-tour-title",
						children: p.title
					}),
					/* @__PURE__ */ P(z.Description, {
						render: /* @__PURE__ */ P("div", {}),
						className: "iro-tour-text",
						children: p.text
					}),
					/* @__PURE__ */ F("div", {
						className: "iro-tour-actions",
						children: [/* @__PURE__ */ P(X, {
							size: "sm",
							variant: "ghost",
							onClick: () => n(!1),
							children: "Skip the tour"
						}), /* @__PURE__ */ F("span", {
							className: "iro-tour-moves",
							children: [a > 0 ? /* @__PURE__ */ P(X, {
								size: "sm",
								variant: "secondary",
								onClick: g,
								children: "Back"
							}) : null, /* @__PURE__ */ P(X, {
								ref: f,
								size: "sm",
								variant: "primary",
								onClick: h,
								children: a === e.length - 1 ? "Done" : "Next"
							})]
						})]
					})
				]
			}) : null]
		})
	});
}
// src/components/transcription/Transcription.tsx
function is(e, t) {
	if (t === void 0) return -1;
	let n = -1;
	e.forEach((e, r) => {
		e.start <= t && (n = r);
	});
	let r = e[n];
	return r && (r.end === void 0 || t < r.end) ? n : -1;
}
function as({ segments: e, currentTime: t, onSeek: n, label: r = "Transcript", className: i }) {
	let a = is(e, t);
	return /* @__PURE__ */ P("ol", {
		"aria-label": r,
		className: W("iro-transcription", i),
		children: e.map((e, t) => /* @__PURE__ */ F("li", {
			"data-active": t === a || void 0,
			"aria-current": t === a || void 0,
			className: "iro-transcription-segment",
			children: [n ? /* @__PURE__ */ P("button", {
				type: "button",
				className: "iro-transcription-time",
				onClick: () => n(e.start),
				children: qt(e.start)
			}) : /* @__PURE__ */ P("span", {
				className: "iro-transcription-time",
				children: qt(e.start)
			}), /* @__PURE__ */ F("p", {
				className: "iro-transcription-text",
				children: [e.speaker ? /* @__PURE__ */ P("span", {
					className: "iro-transcription-speaker",
					children: e.speaker
				}) : null, e.text]
			})]
		}, t))
	});
}
// src/components/trend/Trend.tsx
function os(e) {
	return `${e > 0 ? "+" : e < 0 ? "−" : ""}${Math.abs(e)}%`;
}
function ss({ value: e, good: t = "up", format: n = os, context: r, variant: i = "badge", className: a, ...o }) {
	let s = e > 0 ? "up" : e < 0 ? "down" : "flat", c = t === "none" || s === "flat" ? "neutral" : s === t ? "success" : "danger", l = s === "up" ? lt : s === "down" ? ut : Ye;
	return /* @__PURE__ */ F("span", {
		"data-tone": c,
		"data-variant": i,
		className: W("iro-trend", a),
		...o,
		children: [
			/* @__PURE__ */ P(l, {}),
			/* @__PURE__ */ P("span", {
				className: "iro-trend-value",
				children: n(e)
			}),
			r ? /* @__PURE__ */ P("span", {
				className: "iro-trend-context",
				children: r
			}) : null
		]
	});
}
// src/components/usage-meter/UsageMeter.tsx
var cs = new Intl.NumberFormat(void 0, {
	notation: "compact",
	maximumFractionDigits: 1
});
function ls({ used: e, total: t, label: n = "Context", unit: r = "", parts: i, format: a = (e) => cs.format(e), className: o }) {
	let s = t > 0 ? Math.min(e / t, 1) : 0, c = `${Math.round(s * 100)}%`, l = `${a(e)} of ${a(t)}${r ? ` ${r}` : ""}`;
	return /* @__PURE__ */ P(kr, {
		title: n,
		side: "top",
		align: "end",
		className: "iro-usage-meter-popup",
		trigger: /* @__PURE__ */ F("button", {
			type: "button",
			"aria-label": `${n}: ${c} used`,
			"data-level": s >= .9 ? "high" : void 0,
			className: W("iro-usage-meter", o),
			children: [/* @__PURE__ */ P(Bt, {
				value: s,
				size: 16
			}), /* @__PURE__ */ P("span", { children: c })]
		}),
		children: /* @__PURE__ */ F("div", {
			className: "iro-usage-meter-details",
			children: [
				/* @__PURE__ */ P("span", {
					className: "iro-usage-meter-amount",
					children: l
				}),
				/* @__PURE__ */ P(Ta, {
					value: s,
					size: "sm",
					tone: s >= .9 ? "danger" : "accent",
					label: `${n} used`
				}),
				i && i.length > 0 ? /* @__PURE__ */ P(no, {
					label: `${n} by part`,
					parts: i,
					format: a
				}) : null
			]
		})
	});
}
// src/components/veil/Veil.tsx
function us({ active: e, children: t, label: n = "NSFW", compact: r, onReveal: i, className: a }) {
	let [o, s] = M(!1), [c, l] = M(e);
	c !== e && (l(e), s(!1));
	let u = e && !o;
	return /* @__PURE__ */ F("div", {
		"data-veiled": u || void 0,
		className: W("iro-veil", a),
		children: [/* @__PURE__ */ P("div", {
			className: "iro-veil-content",
			"aria-hidden": u || void 0,
			children: t
		}), u ? /* @__PURE__ */ F("button", {
			type: "button",
			className: "iro-veil-cover",
			"aria-label": r ? `${n}: click to reveal` : void 0,
			onClick: (e) => {
				e.stopPropagation(), e.preventDefault(), s(!0), i?.();
			},
			children: [/* @__PURE__ */ P("span", {
				className: "iro-veil-tag",
				children: n
			}), r ? null : /* @__PURE__ */ P("span", {
				className: "iro-veil-hint",
				children: " Click to reveal"
			})]
		}) : null]
	});
}
// src/components/web-preview/WebPreview.tsx
var ds = "allow-scripts allow-forms allow-popups";
function fs({ src: e, html: t, title: n, onNavigate: r, height: i = 360, sandbox: a = ds, className: o }) {
	let [s, c] = M(0), [l, u] = M({
		list: e ? [e] : [],
		at: 0
	});
	if (e && e !== l.list[l.at]) {
		let t = [...l.list.slice(0, l.at + 1), e];
		u({
			list: t,
			at: t.length - 1
		});
	}
	let d = (e) => {
		let t = l.at + e;
		u({
			...l,
			at: t
		}), r?.(l.list[t]);
	}, f = e ?? (t ? "about:srcdoc" : ""), p = !t && e && /^https?:\/\//.test(e);
	return /* @__PURE__ */ F("div", {
		className: W("iro-web-preview", o),
		children: [/* @__PURE__ */ F("div", {
			className: "iro-web-preview-bar",
			children: [
				r ? /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ P(Z, {
					size: "sm",
					icon: /* @__PURE__ */ P(dt, {}),
					label: "Back",
					disabled: l.at === 0,
					onClick: () => d(-1)
				}), /* @__PURE__ */ P(Z, {
					size: "sm",
					icon: /* @__PURE__ */ P(ft, {}),
					label: "Forward",
					disabled: l.at >= l.list.length - 1,
					onClick: () => d(1)
				})] }) : null,
				/* @__PURE__ */ P(Z, {
					size: "sm",
					icon: /* @__PURE__ */ P(yt, {}),
					label: "Reload",
					onClick: () => c(s + 1)
				}),
				/* @__PURE__ */ P("input", {
					className: "iro-web-preview-address",
					"aria-label": "Address",
					defaultValue: f,
					readOnly: !r,
					spellCheck: !1,
					onKeyDown: (e) => {
						e.key === "Enter" && r && r(e.currentTarget.value.trim());
					}
				}, f),
				p ? /* @__PURE__ */ P(Z, {
					size: "sm",
					icon: /* @__PURE__ */ P(gt, {}),
					label: "Open in a new tab",
					onClick: () => window.open(e, "_blank", "noopener,noreferrer")
				}) : null
			]
		}), /* @__PURE__ */ P("iframe", {
			className: "iro-web-preview-frame",
			title: n,
			src: t ? void 0 : e,
			srcDoc: t,
			sandbox: a,
			style: { height: i }
		}, s)]
	});
}
// src/components/window-drop/WindowDrop.tsx
function ps(e) {
	return Array.from(e.dataTransfer?.types ?? []).includes("Files");
}
function ms({ onFiles: e, open: t, title: n = "Drop to add", hint: r, icon: i = /* @__PURE__ */ P(st, {}), disabled: a }) {
	let o = Y(), [s, c] = M(!1), l = j(0), u = j(e);
	if (u.current = e, A(() => {
		if (a || !u.current) return;
		let e = (e) => {
			ps(e) && (l.current += 1, c(!0));
		}, t = (e) => {
			ps(e) && (l.current = Math.max(0, l.current - 1), l.current === 0 && c(!1));
		}, n = (e) => {
			ps(e) && e.preventDefault();
		}, r = (e) => {
			if (!ps(e)) return;
			e.preventDefault(), l.current = 0, c(!1);
			let t = Array.from(e.dataTransfer?.files ?? []);
			t.length && u.current?.(t);
		};
		return window.addEventListener("dragenter", e), window.addEventListener("dragleave", t), window.addEventListener("dragover", n), window.addEventListener("drop", r), () => {
			window.removeEventListener("dragenter", e), window.removeEventListener("dragleave", t), window.removeEventListener("dragover", n), window.removeEventListener("drop", r), l.current = 0, c(!1);
		};
	}, [a]), !(t ?? (s && !a))) return null;
	let d = /* @__PURE__ */ P("div", {
		className: "iro-window-drop",
		"aria-live": "polite",
		children: /* @__PURE__ */ F("div", {
			className: "iro-window-drop-card",
			"data-iro-animate": "pop",
			children: [
				/* @__PURE__ */ P("span", {
					className: "iro-window-drop-icon",
					children: i
				}),
				/* @__PURE__ */ P("strong", {
					className: "iro-window-drop-title",
					children: n
				}),
				r ? /* @__PURE__ */ P("span", {
					className: "iro-window-drop-hint",
					children: r
				}) : null
			]
		})
	});
	return o ? qe(d, o) : d;
}
export { Dt as Accordion, Mt as AlertDialog, Lt as AppSidebar, Ut as Attachment, Jt as AudioPlayer, Qt as Autocomplete, en as Avatar, tn as AvatarGroup, nn as Backdrop, rn as Badge, on as Banner, Wn as BarChart, Gn as BranchPicker, Zn as Breadcrumbs, X as Button, Qn as ButtonGroup, hr as Calendar, gr as Carousel, _r as Checkbox, vr as Chip, xr as Citation, Tr as CodeBlock, Dr as Collapsible, Br as ColorPicker, Gr as CommandPalette, Xr as Commit, Zr as Confirmation, Qr as ContextMenu, ti as Conversation, Cr as CopyButton, ni as CountBubble, oi as Counter, gi as DataTable, vi as DatePicker, yi as Dialog, bi as Divider, wi as DonutChart, Ti as Drawer, Di as DropZone, Oi as EmptyState, Ni as EnvironmentVariables, Pi as Field, zi as FileTree, br as HoverCard, G as Icon, Z as IconButton, Bi as Image, Vi as InlineInput, kt as IroRoot, Nt as Kbd, Hi as Lightbox, Ki as LineChart, qi as ListItem, Ji as Marker, Jn as Menu, Xi as Menubar, Zi as Message, ea as Meter, ta as MultiSegmented, ia as MultiSelect, aa as NativeSelect, ca as NavigationMenu, ua as Notice, da as NumberField, fa as OtpField, ha as PackageInfo, Ca as Pagination, wa as Panel, Da as Plan, kr as Popover, Ta as ProgressBar, Bt as ProgressRing, Pa as PromptInput, pa as PropertyList, Fa as Prose, Ba as Questionnaire, Va as Queue, Ia as RadioGroup, Ua as RangeCalendar, Ka as Reasoning, ja as ResizeGrip, Ja as SchemaView, Ya as ScrollArea, $a as ScrubField, eo as SectionTitle, to as Segmented, va as Select, no as ShareBar, ro as Sheet, Wa as Shimmer, si as Skeleton, Kt as Slider, ma as Snippet, io as Sources, oo as Sparkline, co as SpeechInput, jt as Spinner, po as Splitter, yo as StackTrace, xo as StarRating, So as Stat, Co as StatusDot, wo as Stepper, To as Suggestions, Er as Switch, Oo as Tabs, Ao as TagInput, No as Terminal, Lo as TestResults, Na as TextArea, Ar as TextField, Ro as TimeField, zo as Timeline, Go as Toaster, qo as ToolCall, Jo as Toolbar, Yo as ToolbarButton, Xo as ToolbarSeparator, Ft as Tooltip, rs as Tour, as as Transcription, Fi as TreeRow, ss as Trend, ls as UsageMeter, us as Veil, fs as WebPreview, ms as WindowDrop, Wo as dismissToast, ui as sortRows, Uo as toast, Y as useIroLayer };
