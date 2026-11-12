import { An as e, At as t, Dn as n, G as r, I as i, In as a, J as o, Lt as s, Nn as c, Ot as l, Q as u, Tn as d, Ut as f, Wn as p, Xt as m, Yn as h, _t as g, a as _, an as v, b as y, bn as b, ct as x, en as S, fn as C, ft as w, hn as T, jn as E, kn as D, mn as O, mt as ee, pn as k, q as te, r as ne, tn as re, tt as ie, u as ae, ut as oe, vn as se, vt as ce, wn as le, xn as ue, yt as de } from "./folders-vJOyoUGu.js";
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
import { Drawer as B } from "@base-ui/react/drawer";
import { Field as Fe } from "@base-ui/react/field";
import { Menubar as Ie } from "@base-ui/react/menubar";
import { Meter as Le } from "@base-ui/react/meter";
import { Select as V } from "@base-ui/react/select";
import { NavigationMenu as H } from "@base-ui/react/navigation-menu";
import { NumberField as Re } from "@base-ui/react/number-field";
import { OTPField as ze } from "@base-ui/react/otp-field";
import { Combobox as U } from "@base-ui/react/combobox";
import { Progress as Be } from "@base-ui/react/progress";
import { Radio as Ve } from "@base-ui/react/radio";
import { RadioGroup as He } from "@base-ui/react/radio-group";
import { ScrollArea as Ue } from "@base-ui/react/scroll-area";
import { Tabs as We } from "@base-ui/react/tabs";
import { Toast as W } from "@base-ui/react/toast";
import { Toolbar as Ge } from "@base-ui/react/toolbar";
import { createPortal as Ke } from "react-dom";
// src/components/shared/cx.ts
function G(...e) {
	return e.filter(Boolean).join(" ");
}
// src/components/icon/Icon.tsx
function qe({ icon: e, size: t = 16, label: n, className: r, ...i }) {
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
		className: G("iro-icon", r),
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
var K = (e) => () => /* @__PURE__ */ P(qe, {
	icon: e,
	size: "1em",
	className: "iro-glyph"
}), Je = K(b), Ye = K(le), Xe = K(n), q = K(C), J = K(O), Ze = K(k), Qe = K(T), $e = K(se), et = K(f), tt = K(m), nt = K(ue), rt = K(ie), it = K(u), at = K(o), ot = K(te), st = K(p), ct = K(v), lt = K(c), ut = K(D), dt = K(e), ft = K(E), pt = K(d), mt = K(l), ht = K(r), gt = K(a), _t = K(S), vt = K(re), yt = K(s), bt = K(x), xt = K(oe), St = K(w), Ct = K(ee), wt = K(ce), Tt = K(de), Et = K(t);
// src/components/accordion/Accordion.tsx
function Dt({ items: e, multiple: t = !1, value: n, defaultValue: r, onValueChange: i, className: a }) {
	return /* @__PURE__ */ P(he.Root, {
		multiple: t,
		value: n,
		defaultValue: r,
		onValueChange: i ? (e) => i(e) : void 0,
		className: G("iro-accordion", a),
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
		className: G("iro-spinner", t),
		role: "status",
		"aria-label": e,
		...n,
		children: At
	}) : /* @__PURE__ */ P("span", {
		className: G("iro-spinner", t),
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
		className: G("iro-button", c),
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
				className: G("iro-dialog", "iro-alert-dialog", l),
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
		className: G("iro-kbd", e),
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
					className: G("iro-popup", "iro-tooltip", a),
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
		className: G("iro-icon-button", u),
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
		className: G("iro-app-sidebar", c),
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
					icon: /* @__PURE__ */ P(qe, { icon: i }),
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
		className: G("iro-progress-ring", r),
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
		className: G("iro-attachment", l),
		children: [
			/* @__PURE__ */ F("span", {
				className: "iro-attachment-thumb",
				children: [r ? /* @__PURE__ */ P("img", {
					src: r,
					alt: ""
				}) : i ?? /* @__PURE__ */ P(qe, { icon: y }), a === "uploading" ? /* @__PURE__ */ P("span", {
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
		className: G("iro-slider", p),
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
		className: G("iro-audio-player", a),
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
			className: G("iro-text-field", "iro-autocomplete", u),
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
		className: G("iro-avatar", a),
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
		className: G("iro-avatar-group", i),
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
		className: G("iro-backdrop", l),
		...u
	});
}
// src/components/badge/Badge.tsx
function rn({ tone: e = "neutral", icon: t, className: n, children: r, ...i }) {
	return /* @__PURE__ */ F("span", {
		className: G("iro-badge", n),
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
		className: G("iro-banner", a),
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
		className: G("iro-chart", `iro-${e}`, a),
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
], yn = 50, bn = 8, xn = 7, Sn = new Intl.NumberFormat(), Cn = new Intl.NumberFormat(void 0, {
	notation: "compact",
	maximumFractionDigits: 1
});
function wn(e, t) {
	let n = 10 ** Math.floor(Math.log10(e)), r = vn.map((e) => e * n).filter((e) => !t || Number.isInteger(e)).find((t) => t >= e) ?? 10 * n;
	return t ? Math.max(1, r) : r;
}
function Tn(e, t, { count: n = 4, whole: r = !1, step: i } = {}) {
	let a = t > e ? t : e + 1, o = i !== void 0 && i > 0 && (a - e) / i <= yn ? i : wn((a - e) / Math.max(1, n), r), s = Math.floor(e / o) * o, c = Math.ceil(a / o) * o, l = Math.max(0, -Math.floor(Math.log10(o)) + 1), u = [];
	for (let e = s; e <= c + o / 2; e += o) u.push(Number(e.toFixed(l)));
	return {
		min: s,
		max: u.at(-1) ?? c,
		ticks: u
	};
}
function En(e) {
	let t = Math.max(Math.abs(e.min), Math.abs(e.max)) >= 1e4;
	return (e) => (t ? Cn : Sn).format(e);
}
function Dn(e, t, n, r = {}) {
	let i = r.ticks === "whole" || r.ticks !== "decimal" && n.every(Number.isInteger), a = Tn(r.min ?? e, r.max ?? t, {
		count: r.count,
		whole: i,
		step: r.step
	});
	return {
		scale: a,
		tick: r.format ?? En(a)
	};
}
var On = (e) => Math.max(0, ...e.map((e) => e.length)) * xn + 10, kn = (e, t) => Math.max(1, Math.ceil((Math.max(0, ...e.map((e) => e.length)) * xn + 12) / (t || 1))), An = (e) => Sn.format(e), jn = (e, t) => t ?? (e < bn ? `var(--iro-chart-${e + 1})` : "var(--iro-fg-4)"), Mn = (e) => e > 0 && e < .005 ? "<1%" : `${Math.round(e * 100)}%`, Nn = {
	ArrowRight: 1,
	ArrowDown: 1,
	ArrowLeft: -1,
	ArrowUp: -1
};
function Pn(e) {
	let [t, n] = M(null), r = (t) => Math.min(Math.max(t, 0), e - 1);
	return {
		active: t === null || t >= e ? null : t,
		setActive: n,
		keys: {
			onKeyDown(i) {
				if (e === 0) return;
				let a = Nn[i.key], o;
				a ? o = t === null ? 0 : r(t + a) : i.key === "Home" ? o = 0 : i.key === "End" ? o = e - 1 : i.key === "Escape" && (o = null), o !== void 0 && (i.preventDefault(), n(o));
			},
			onFocus: () => n((t) => t ?? (e > 0 ? 0 : null)),
			onBlur: () => n(null),
			onPointerLeave: () => n(null)
		}
	};
}
// src/components/chart/useWidth.ts
function Fn() {
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
var In = 10, Ln = 24, Rn = 24, zn = 4, Bn = 2, Vn = .7, Hn = 18, Un = 14, Wn = 14, Gn = 7;
function Kn(e, t, n, r, i, a) {
	let o = i(0);
	if (t) {
		let t = 0, o = e.reduce((e, t, n) => t > 0 ? n : e, -1);
		return e.flatMap((e, s) => {
			let c = Math.max(e, 0);
			if (c === 0) return [];
			let [l, u] = [i(t), i(t + c)];
			t += c;
			let d = Math.abs(u - l) - (s === o ? 0 : Bn);
			if (d <= 0) return [];
			let f = a ? "right" : "top", p = s === o ? zn : 0;
			return [{
				series: s,
				d: a ? mn(l, r, d, n, p, f) : mn(r, l - d, n, d, p, f)
			}];
		});
	}
	return e.flatMap((e, t) => {
		if (e === 0) return [];
		let s = r + t * (n + Bn), c = i(e);
		return a ? [{
			series: t,
			d: mn(o, s, c - o, n, zn, "right")
		}] : [{
			series: t,
			d: e > 0 ? mn(s, c, n, o - c, zn, "top") : mn(s, o, n, c - o, zn, "bottom")
		}];
	});
}
function qn({ label: e, labels: t, series: n, stacked: r = !1, horizontal: i = !1, height: a = 200, format: o = An, axis: s, ...c }) {
	let [l, u] = Fn(), { active: d, setActive: f, keys: p } = Pn(t.length), m = (e) => n.map((t) => t.values[e] ?? 0), h = t.map((e, t) => m(t).reduce((e, t) => e + Math.max(t, 0), 0)), g = n.flatMap((e) => e.values).filter((e) => e !== null), { scale: _, tick: v } = r ? Dn(0, Math.max(0, ...h), h, s) : Dn(Math.min(0, ...g), Math.max(0, ...g), g, s), y = n.map((e, t) => jn(t, e.color)), b = Math.max(t.length, 1), x = (e) => e === null ? "–" : o(e), S = (e) => o(r ? h[e] : Math.max(...m(e))), C = i ? 0 : On(_.ticks.map(v)), w = (u - C) / b, T = (e) => C + w * e, E = r ? 1 : n.length, D = i ? Un : Math.max(2, Math.min(Rn, (w * Vn - Bn * (E - 1)) / E)), O = r ? D : E * D + Bn * (E - 1), ee = r ? Un : n.length * 16 - Bn, k = Hn + ee + Wn, te = i ? b * k - Wn : a, ne = te - Ln, re = Math.max(0, ...t.map((e, t) => S(t).length)) * Gn + 8, ie = (e) => In + (1 - (e - _.min) / (_.max - _.min)) * (ne - In), ae = (e) => (e - _.min) / (_.max - _.min) * Math.max(0, u - re), oe = kn(t, w);
	function se(e) {
		let n = e.currentTarget.getBoundingClientRect(), r = Math.floor(i ? (e.clientY - n.top) / k : (e.clientX - n.left - C) / (w || 1));
		f(Math.min(Math.max(r, 0), t.length - 1));
	}
	let ce = d === null ? 0 : i ? ae(h[d]) : T(d) + w / 2, le = d === null || !i ? In : d * k;
	return /* @__PURE__ */ P(cn, {
		name: "bar-chart",
		label: e,
		legend: n.length > 1 ? n.map(({ name: e }, t) => ({
			name: e,
			color: y[t],
			kind: "box"
		})) : void 0,
		table: {
			columns: ["", ...n.map(({ name: e }) => e)],
			rows: t.map((e, t) => [e, ...n.map((e) => x(e.values[t] ?? null))])
		},
		...c,
		children: /* @__PURE__ */ F("div", {
			ref: l,
			className: "iro-chart-plot",
			"data-horizontal": i || void 0,
			style: { height: te },
			children: [
				u > 0 ? /* @__PURE__ */ F("svg", {
					width: u,
					height: te,
					"aria-hidden": "true",
					children: [
						i ? null : /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ P(ln, {
							ticks: _.ticks,
							y: ie,
							gutter: C,
							width: u,
							format: v
						}), t.map((e, t) => t % oe === 0 ? /* @__PURE__ */ P("text", {
							className: "iro-chart-axis",
							x: T(t) + w / 2,
							y: te - 6,
							textAnchor: "middle",
							children: e
						}, t) : null)] }),
						d === null ? null : i ? /* @__PURE__ */ P("rect", {
							className: "iro-bar-chart-band",
							x: 0,
							y: d * k - Wn / 2,
							width: u,
							height: k
						}) : /* @__PURE__ */ P("rect", {
							className: "iro-bar-chart-band",
							x: T(d),
							y: In,
							width: w,
							height: ne - In
						}),
						t.map((e, t) => {
							let n = t * k, a = i ? Kn(m(t), r, D, n + Hn, ae, !0) : Kn(m(t), r, D, T(t) + (w - O) / 2, ie, !1);
							return /* @__PURE__ */ F("g", { children: [i ? /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ P("text", {
								className: "iro-bar-chart-row",
								x: 0,
								y: n + Hn - 6,
								children: e
							}), /* @__PURE__ */ P("text", {
								className: "iro-bar-chart-tip",
								x: ae(r ? h[t] : Math.max(0, ...m(t))) + 6,
								y: n + Hn + ee / 2,
								children: S(t)
							})] }) : null, a.map((e) => /* @__PURE__ */ P("path", {
								className: "iro-bar-chart-bar",
								style: { color: y[e.series] },
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
					onPointerMove: se,
					onPointerDown: se,
					...p
				}),
				/* @__PURE__ */ P(_n, {
					open: d !== null,
					x: ce,
					y: le,
					width: u,
					title: d === null ? "" : t[d],
					rows: [...n.map((e, t) => ({
						name: e.name,
						value: x(d === null ? null : e.values[d] ?? null),
						color: y[t],
						kind: "box"
					}))]
				})
			]
		})
	});
}
// src/components/branch-picker/BranchPicker.tsx
function Jn({ count: e, index: t, defaultIndex: n, onIndexChange: r, label: i = "Versions", previousLabel: a = "Previous version", nextLabel: o = "Next version", className: s }) {
	let [c, l] = M(n ?? e - 1), u = Math.max(0, Math.min(t ?? c, e - 1));
	if (e < 2) return null;
	let d = (e) => {
		l(e), r?.(e);
	};
	return /* @__PURE__ */ F("div", {
		role: "group",
		"aria-label": i,
		className: G("iro-branch-picker", s),
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
function Yn({ items: e }) {
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
var Xn = 4;
function Zn({ trigger: e, items: t, side: n = "bottom", align: r = "start", className: i }) {
	let a = Y();
	return /* @__PURE__ */ F(L.Root, { children: [/* @__PURE__ */ P(L.Trigger, { render: e }), /* @__PURE__ */ P(L.Portal, {
		container: a,
		children: /* @__PURE__ */ P(L.Positioner, {
			side: n,
			align: r,
			sideOffset: Xn,
			className: "iro-positioner",
			children: /* @__PURE__ */ P(L.Popup, {
				className: G("iro-popup", "iro-popup-list", i),
				children: /* @__PURE__ */ P(Yn, { items: t })
			})
		})
	})] });
}
// src/components/breadcrumbs/fold.ts
function Qn(e, t) {
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
function $n({ item: e, current: t }) {
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
function er({ items: e, max: t = 4, moreLabel: n = "Show the hidden steps", className: r, "aria-label": i = "Breadcrumbs", ...a }) {
	let { start: o, folded: s, end: c } = Qn(e, t), l = e.at(-1), u = [
		...o.map((e) => ({
			key: e.label,
			node: /* @__PURE__ */ P($n, {
				item: e,
				current: e === l
			})
		})),
		...s.length > 0 ? [{
			key: "…",
			node: /* @__PURE__ */ P(Zn, {
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
			node: /* @__PURE__ */ P($n, {
				item: e,
				current: e === l
			})
		}))
	];
	return /* @__PURE__ */ P("nav", {
		className: G("iro-breadcrumbs", r),
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
function tr({ orientation: e = "horizontal", className: t, ...n }) {
	return /* @__PURE__ */ P("div", {
		role: "group",
		"data-orientation": e,
		className: G("iro-button-group", t),
		...n
	});
}
// src/components/range-calendar/calendar.ts
var nr = 864e5, rr = Array.from({ length: 7 }, (e, t) => new Date(Date.UTC(2024, 0, 1 + t)).toLocaleDateString(void 0, {
	weekday: "short",
	timeZone: "UTC"
})), ir = (e) => Date.parse(`${e}T00:00:00Z`), ar = (e) => new Date(e).toISOString().slice(0, 10), or = (e, t) => ar(ir(e) + t * nr), sr = (e, t) => Math.round((ir(t) - ir(e)) / nr);
function cr(e = /* @__PURE__ */ new Date()) {
	let t = (e) => String(e).padStart(2, "0");
	return `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`;
}
var $ = (e) => ({
	year: Number(e.slice(0, 4)),
	month: Number(e.slice(5, 7)) - 1
}), lr = (e, t) => e.year === t.year && e.month === t.month;
function ur(e, t) {
	let n = new Date(Date.UTC(e.year, e.month + t, 1));
	return {
		year: n.getUTCFullYear(),
		month: n.getUTCMonth()
	};
}
function dr(e, t) {
	let n = ur($(e), t), r = new Date(Date.UTC(n.year, n.month + 1, 0)).getUTCDate();
	return ar(Date.UTC(n.year, n.month, Math.min(Number(e.slice(8)), r)));
}
function fr(e) {
	let t = Date.UTC(e.year, e.month, 1), n = (new Date(t).getUTCDay() + 6) % 7;
	return Array.from({ length: 42 }, (e, r) => ar(t + (r - n) * nr));
}
var pr = (e, t) => (/* @__PURE__ */ new Date(`${e}T00:00:00Z`)).toLocaleDateString(void 0, {
	...t,
	timeZone: "UTC"
}), mr = (e) => pr(e, {
	weekday: "long",
	day: "numeric",
	month: "long",
	year: "numeric"
}), hr = (e) => pr(`${e.year}-${String(e.month + 1).padStart(2, "0")}-01`, {
	month: "long",
	year: "numeric"
});
function gr(e, t) {
	let n = ((/* @__PURE__ */ new Date(`${t}T00:00:00Z`)).getUTCDay() + 6) % 7;
	return e === "ArrowLeft" ? or(t, -1) : e === "ArrowRight" ? or(t, 1) : e === "ArrowUp" ? or(t, -7) : e === "ArrowDown" ? or(t, 7) : e === "Home" ? or(t, -n) : e === "End" ? or(t, 6 - n) : e === "PageUp" || e === "PageDown" ? dr(t, e === "PageUp" ? -1 : 1) : null;
}
function _r(e, t) {
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
function vr({ value: e, onValueChange: t, earliest: n = "", latest: r = "", isDayDisabled: i, today: a = cr(), className: o }) {
	let [s, c] = M(() => $(e || a)), [l, u] = M(e || a), d = j(null), f = j(!1);
	A(() => {
		e && (c($(e)), u(e));
	}, [e]), A(() => {
		f.current && (f.current = !1, d.current?.querySelector(`[data-day="${l}"]`)?.focus());
	});
	let p = (e) => !!(n && e < n || r && e > r || i?.(e)), m = (e, t) => {
		let i = gr(e.key, t);
		if (!i) return;
		e.preventDefault();
		let a = n && i < n ? n : r && i > r ? r : i;
		f.current = !0, u(a), lr($(a), s) || c($(a));
	}, h = hr(s), g = n ? $(n) : null, _ = r ? $(r) : null;
	return /* @__PURE__ */ F("div", {
		className: G("iro-calendar", o),
		children: [/* @__PURE__ */ F("div", {
			className: "iro-calendar-head",
			children: [
				/* @__PURE__ */ P(Z, {
					icon: /* @__PURE__ */ P(Ze, {}),
					size: "sm",
					label: "Previous month",
					tooltip: !1,
					disabled: !!(g && lr(s, g)),
					onClick: () => c(ur(s, -1))
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
					disabled: !!(_ && lr(s, _)),
					onClick: () => c(ur(s, 1))
				})
			]
		}), /* @__PURE__ */ F("div", {
			ref: d,
			role: "group",
			"aria-label": h,
			className: "iro-calendar-grid",
			children: [rr.map((e) => /* @__PURE__ */ P("span", {
				"aria-hidden": "true",
				className: "iro-calendar-weekday",
				children: e
			}, e)), fr(s).map((n) => /* @__PURE__ */ P("div", {
				className: "iro-calendar-cell",
				children: /* @__PURE__ */ P("button", {
					type: "button",
					"data-day": n,
					"data-edge": n === e || void 0,
					"data-outside": !lr($(n), s) || void 0,
					"data-today": n === a || void 0,
					tabIndex: n === l ? 0 : -1,
					disabled: p(n),
					"aria-label": mr(n),
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
function yr({ children: e, label: t, perView: n = 1, dots: r = !0, previousLabel: i = "Previous slide", nextLabel: a = "Next slide", className: o, style: s, ...c }) {
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
		className: G("iro-carousel", o),
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
function br({ checked: e, defaultChecked: t, onCheckedChange: n, indeterminate: r, label: i, description: a, disabled: o, name: s, id: c, className: l, "aria-label": u }) {
	let d = /* @__PURE__ */ P(Oe.Root, {
		checked: e,
		defaultChecked: t,
		onCheckedChange: n ? (e) => n(e) : void 0,
		indeterminate: r,
		disabled: o,
		name: s,
		id: c,
		"aria-label": u,
		className: G("iro-checkbox", !i && l),
		children: /* @__PURE__ */ P(Oe.Indicator, {
			className: "iro-checkbox-indicator",
			children: P(r ? Ye : Je, {})
		})
	});
	return i ? /* @__PURE__ */ F("label", {
		className: G("iro-checkbox-label", l),
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
function xr({ icon: e, count: t, selected: n, onClick: r, onRemove: i, removeLabel: a = "Remove", size: o = "md", className: s, children: c, ...l }) {
	let u = /* @__PURE__ */ F(N, { children: [
		e,
		c,
		t == null ? null : /* @__PURE__ */ P("span", {
			className: "iro-chip-count",
			children: t
		})
	] });
	return /* @__PURE__ */ F("span", {
		className: G("iro-chip", s),
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
var Sr = 8;
function Cr({ trigger: e, children: t, side: n = "bottom", align: r = "center", delay: i = 600, className: a }) {
	let o = Y();
	return /* @__PURE__ */ F(ke.Root, { children: [/* @__PURE__ */ P(ke.Trigger, {
		render: e,
		delay: i
	}), /* @__PURE__ */ P(ke.Portal, {
		container: o,
		children: /* @__PURE__ */ P(ke.Positioner, {
			side: n,
			align: r,
			sideOffset: Sr,
			className: "iro-positioner",
			children: /* @__PURE__ */ P(ke.Popup, {
				className: G("iro-popup", "iro-hover-card", a),
				children: t
			})
		})
	})] });
}
// src/components/citation/Citation.tsx
function wr({ index: e, source: t, className: n }) {
	return /* @__PURE__ */ F(Cr, {
		delay: 300,
		className: "iro-citation-card",
		trigger: /* @__PURE__ */ P("a", {
			href: t.href,
			target: "_blank",
			rel: "noreferrer",
			"aria-label": `Source ${e}: ${t.title}`,
			className: G("iro-citation", n),
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
var Tr = 1200;
function Er({ text: e, label: t = "Copy", size: n = "sm", className: r }) {
	let [i, a] = M(!1);
	return A(() => {
		if (!i) return;
		let e = setTimeout(() => a(!1), Tr);
		return () => clearTimeout(e);
	}, [i]), /* @__PURE__ */ P(Z, {
		icon: P(i ? Je : et, {}),
		label: i ? "Copied" : t,
		size: n,
		"data-copied": i || void 0,
		className: G("iro-copy-button", r),
		onClick: (t) => {
			t.stopPropagation(), navigator.clipboard.writeText(e).then(() => a(!0), () => {});
		}
	});
}
// src/components/code-block/lines.ts
function Dr(e) {
	let t = e.replace(/\r\n?/g, "\n").split("\n");
	return t.length > 1 && t.at(-1) === "" && t.pop(), t;
}
// src/components/code-block/CodeBlock.tsx
function Or({ code: e, language: t, title: n, lineNumbers: r = !1, highlight: i = [], lines: a, maxHeight: o, wrap: s = !1, copyLabel: c = "Copy code", className: l, style: u, ...d }) {
	let f = a ?? Dr(e), p = new Set(i), m = n || t;
	return /* @__PURE__ */ F("figure", {
		"data-numbers": r || void 0,
		"data-wrap": s || void 0,
		className: G("iro-code-block", l),
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
				/* @__PURE__ */ P(Er, {
					text: e,
					label: c
				})
			]
		}) : /* @__PURE__ */ P(Er, {
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
function kr({ checked: e, defaultChecked: t, onCheckedChange: n, label: r, size: i = "md", disabled: a, name: o, id: s, className: c, "aria-label": l }) {
	let u = /* @__PURE__ */ P(Ae.Root, {
		checked: e,
		defaultChecked: t,
		onCheckedChange: n ? (e) => n(e) : void 0,
		disabled: a,
		name: o,
		id: s,
		"aria-label": l,
		"data-size": i,
		className: G("iro-switch", !r && c),
		children: /* @__PURE__ */ P(Ae.Thumb, { className: "iro-switch-thumb" })
	});
	return r ? /* @__PURE__ */ F("label", {
		className: G("iro-switch-label", c),
		"data-disabled": a || void 0,
		children: [u, /* @__PURE__ */ P("span", { children: r })]
	}) : u;
}
// src/components/collapsible/Collapsible.tsx
function Ar({ title: e, summary: t, children: n, open: r, defaultOpen: i, onOpenChange: a, enabled: o, onEnabledChange: s, enabledLabel: c = "Enabled", tone: l = "surface", className: u }) {
	return /* @__PURE__ */ F(R.Root, {
		open: r,
		defaultOpen: i,
		onOpenChange: a ? (e) => a(e) : void 0,
		"data-tone": l,
		"data-off": o === !1 || void 0,
		className: G("iro-collapsible", u),
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
			}), o === void 0 ? null : /* @__PURE__ */ P(kr, {
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
var jr = 6;
function Mr({ trigger: e, title: t, children: n, side: r = "bottom", align: i = "center", open: a, onOpenChange: o, className: s }) {
	let c = Y();
	return /* @__PURE__ */ F(je.Root, {
		open: a,
		onOpenChange: o ? (e) => o(e) : void 0,
		children: [/* @__PURE__ */ P(je.Trigger, { render: e }), /* @__PURE__ */ P(je.Portal, {
			container: c,
			children: /* @__PURE__ */ P(je.Positioner, {
				side: r,
				align: i,
				sideOffset: jr,
				className: "iro-positioner",
				children: /* @__PURE__ */ F(je.Popup, {
					className: G("iro-popup", "iro-popover", s),
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
function Nr({ size: e = "md", start: t, end: n, invalid: r, className: i, style: a, ...o }) {
	return /* @__PURE__ */ F("span", {
		className: G("iro-text-field", i),
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
function Pr(e) {
	let t = e.trim().replace(/^#/, "").toLowerCase();
	return /^[0-9a-f]{3}$/.test(t) ? `#${[...t].map((e) => e + e).join("")}` : /^[0-9a-f]{6}$/.test(t) ? `#${t}` : null;
}
function Fr(e) {
	let t = Pr(e);
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
function Ir({ h: e, s: t, v: n }) {
	let r = (r) => {
		let i = (r + e / 60) % 6, a = n - n * t * Math.max(0, Math.min(i, 4 - i, 1));
		return Math.round(a * 255).toString(16).padStart(2, "0");
	};
	return `#${r(5)}${r(3)}${r(1)}`;
}
// src/components/color-picker/ColorPicker.tsx
var Lr = `linear-gradient(to right, ${[
	0,
	60,
	120,
	180,
	240,
	300,
	360
].map((e) => `hsl(${e} 100% 50%)`).join(", ")})`, Rr = (e) => Math.min(1, Math.max(0, e)), zr = (e) => `${Math.round(e * 100)}%`;
function Br(e) {
	let t = e.currentTarget.getBoundingClientRect();
	return {
		x: Rr((e.clientX - t.left) / t.width),
		y: Rr((e.clientY - t.top) / t.height)
	};
}
function Vr(e) {
	return {
		onPointerDown: (t) => {
			t.currentTarget.setPointerCapture(t.pointerId);
			let { x: n, y: r } = Br(t);
			e(n, r);
		},
		onPointerMove: (t) => {
			if (!t.currentTarget.hasPointerCapture(t.pointerId)) return;
			let { x: n, y: r } = Br(t);
			e(n, r);
		}
	};
}
function Hr(e) {
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
function Ur({ value: e, onValueChange: t, swatches: n = [], size: r = "md", disabled: i, id: a, className: o, "aria-label": s }) {
	let [c, l] = M(() => Fr(e) ?? {
		h: 0,
		s: 0,
		v: 0
	}), [u, d] = M(e);
	A(() => {
		d(e), l((t) => {
			let n = Ir(t) === e ? null : Fr(e);
			return n ? n.s === 0 ? {
				...n,
				h: t.h
			} : n : t;
		});
	}, [e]);
	let f = (e) => {
		l(e), t(Ir(e));
	}, p = Vr((e, t) => f({
		...c,
		s: e,
		v: 1 - t
	})), m = Vr((e) => f({
		...c,
		h: e * 360
	})), h = () => {
		let n = Pr(u);
		n ? t(n) : d(e);
	};
	return /* @__PURE__ */ P(Mr, {
		align: "start",
		className: "iro-color-picker-popup",
		trigger: /* @__PURE__ */ F("button", {
			type: "button",
			id: a,
			disabled: i,
			"aria-label": s ? `${s}: ${e}` : void 0,
			"data-size": r,
			className: G("iro-select", "iro-color-picker", o),
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
					"aria-valuetext": `Saturation ${zr(c.s)}, brightness ${zr(c.v)}`,
					className: "iro-color-picker-square",
					style: { background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent), hsl(${c.h} 100% 50%)` },
					...p,
					onKeyDown: (e) => {
						let t = Hr(e);
						t && (e.preventDefault(), f({
							...c,
							s: Rr(c.s + t.x),
							v: Rr(c.v + t.y)
						}));
					},
					children: /* @__PURE__ */ P("span", {
						className: "iro-color-picker-thumb",
						style: {
							left: zr(c.s),
							top: zr(1 - c.v),
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
					style: { background: Lr },
					...m,
					onKeyDown: (e) => {
						let t = Hr(e);
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
				/* @__PURE__ */ P(Nr, {
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
						onClick: () => t(Pr(n) ?? n)
					}, n))
				}) : null
			]
		})
	});
}
// src/components/command-palette/CommandPalette.tsx
var Wr = 6, Gr = 60;
function Kr(e) {
	return [
		e.label,
		e.keywords,
		e.group,
		typeof e.hint == "string" ? e.hint : ""
	].join(" ");
}
function qr(e, t) {
	let n = /* @__PURE__ */ new Map(), r = t.trim() ? e.filter((e) => Xt(Kr(e), t)).slice(0, Gr) : e.filter((e) => {
		let t = n.get(e.group) ?? 0;
		return n.set(e.group, t + 1), t < Wr;
	}), i = /* @__PURE__ */ new Map();
	for (let e of r) i.set(e.group, [...i.get(e.group) ?? [], e]);
	return [...i].map(([e, t]) => ({
		value: e,
		items: t
	}));
}
function Jr({ open: e, onOpenChange: t, items: n, onPick: r, placeholder: i = "Type a command or search…", emptyText: a = "Nothing matches. Try fewer letters.", label: o = "Command palette", className: s }) {
	let c = Y(), [l, u] = M(""), d = Ce(() => qr(n, l), [n, l]), f = d.reduce((e, t) => e + t.items.length, 0);
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
				className: G("iro-palette", s),
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
var Yr = 5, Xr = 7, Zr = {
	added: "A",
	modified: "M",
	deleted: "D",
	renamed: "R"
};
function Qr(e, t) {
	let n = e + t;
	if (n === 0) return {
		added: 0,
		deleted: 0
	};
	let r = Math.min(Yr, Math.max(1, Math.ceil(Math.log10(n + 1) * 2))), i = Math.round(e / n * r);
	return {
		added: i,
		deleted: r - i
	};
}
function $r({ hash: e, message: t, author: n, date: r, files: i, defaultOpen: a = !1, className: o }) {
	let [s, ...c] = t.trim().split("\n"), l = c.join("\n").trim(), u = i?.reduce((e, t) => e + t.additions, 0) ?? 0, d = i?.reduce((e, t) => e + t.deletions, 0) ?? 0, f = Qr(u, d);
	return /* @__PURE__ */ F("article", {
		className: G("iro-commit", o),
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
							children: [/* @__PURE__ */ P("code", { children: e.slice(0, Xr) }), /* @__PURE__ */ P(Er, {
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
								children: Array.from({ length: Yr }, (e, t) => /* @__PURE__ */ P("span", { "data-kind": t < f.added ? "added" : t < f.added + f.deleted ? "deleted" : void 0 }, t))
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
								children: Zr[e.status]
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
function ei({ title: e, children: t, state: n = "pending", onAllow: r, onDeny: i, allowLabel: a = "Allow", denyLabel: o = "Deny", allowedText: s = "Allowed", deniedText: c = "Denied", className: l }) {
	return /* @__PURE__ */ F("section", {
		"data-state": n,
		className: G("iro-confirmation", l),
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
function ti({ items: e, children: t, className: n }) {
	let r = Y();
	return /* @__PURE__ */ F(Ne.Root, { children: [/* @__PURE__ */ P(Ne.Trigger, { render: t }), /* @__PURE__ */ P(Ne.Portal, {
		container: r,
		children: /* @__PURE__ */ P(Ne.Positioner, {
			className: "iro-positioner",
			children: /* @__PURE__ */ P(Ne.Popup, {
				className: G("iro-popup", "iro-popup-list", n),
				children: /* @__PURE__ */ P(Yn, { items: e })
			})
		})
	})] });
}
// src/components/conversation/Conversation.tsx
var ni = 48;
function ri(e, t) {
	e?.scrollTo({
		top: e.scrollHeight,
		behavior: t ? "smooth" : "auto"
	});
}
function ii({ busy: e = !1, latestLabel: t = "Latest", className: n, children: r, "aria-label": i = "Conversation", ...a }) {
	let o = j(null), s = j(null), c = j(!0), [l, u] = M(!1);
	return A(() => {
		let e = s.current;
		if (!e) return;
		let t = new ResizeObserver(() => {
			c.current && ri(o.current, !1);
		});
		return t.observe(e), ri(o.current, !1), () => t.disconnect();
	}, []), /* @__PURE__ */ F("div", {
		className: G("iro-conversation", n),
		children: [/* @__PURE__ */ P("div", {
			ref: o,
			role: "log",
			"aria-label": i,
			"aria-busy": e || void 0,
			tabIndex: 0,
			className: "iro-conversation-scroller",
			onScroll: (e) => {
				let t = e.currentTarget, n = t.scrollHeight - t.scrollTop - t.clientHeight <= ni;
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
				c.current = !0, ri(o.current, ["full", "smooth"].includes(fe(o.current)));
			},
			children: t
		}) : null]
	});
}
// src/components/count-bubble/CountBubble.tsx
function ai({ count: e, max: t = 99, tone: n = "danger", corner: r, className: i, ...a }) {
	return e <= 0 ? null : /* @__PURE__ */ P("span", {
		"data-tone": n,
		"data-corner": r || void 0,
		className: G("iro-count-bubble", i),
		...a,
		children: e > t ? `${t}+` : e
	});
}
// src/components/counter/Counter.tsx
var oi = 700, si = (e) => 1 - (1 - e) ** 4, ci = (e) => Math.round(e).toLocaleString();
function li({ value: e, format: t = ci, className: n, ...r }) {
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
			let i = Math.min((n - r) / oi, 1);
			s.current = t + (e - t) * si(i), o(s.current), i < 1 && (a = requestAnimationFrame(c));
		};
		return a = requestAnimationFrame(c), () => cancelAnimationFrame(a);
	}, [e]), /* @__PURE__ */ P("span", {
		ref: i,
		"data-bump": c > 0 || void 0,
		className: G("iro-counter", n),
		...r,
		children: t(a)
	}, c);
}
// src/components/skeleton/Skeleton.tsx
function ui({ width: e, height: t, shape: n = "block", className: r, style: i, ...a }) {
	return /* @__PURE__ */ P("span", {
		"aria-hidden": "true",
		"data-iro-animate": "pulse",
		"data-shape": n,
		className: G("iro-skeleton", r),
		style: {
			width: e,
			height: t,
			...i
		},
		...a
	});
}
// src/components/data-table/rows.ts
var di = new Intl.Collator(void 0, {
	numeric: !0,
	sensitivity: "base"
}), fi = (e, t) => typeof e == "number" && typeof t == "number" ? e - t : di.compare(String(e), String(t));
function pi(e, t, n) {
	let r = n === "asc" ? 1 : -1;
	return e.map((e, n) => ({
		row: e,
		index: n,
		key: t(e)
	})).sort((e, t) => fi(e.key, t.key) * r || e.index - t.index).map(({ row: e }) => e);
}
function mi(e, t) {
	return e?.column === t ? e.direction === "asc" ? {
		column: t,
		direction: "desc"
	} : null : {
		column: t,
		direction: "asc"
	};
}
function hi(e, t, n, r, i = (e) => e) {
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
var gi = 5, _i = {
	asc: "ascending",
	desc: "descending"
};
function vi(e, t, n) {
	let [r, i] = M(t);
	return [e === void 0 ? r : e, (e) => {
		i(e), n?.(e);
	}];
}
function yi({ label: e, columns: t, rows: n, rowKey: r, rowLabel: i = r, sort: a, defaultSort: o = null, onSortChange: s, selectable: c = !1, selected: l, onSelectedChange: u, subRows: d, defaultExpanded: f = [], empty: p = "Nothing to show.", loading: m = !1, maxHeight: h, size: g = "md", className: _, style: v, ...y }) {
	let [b, x] = vi(a, o, s), [S, C] = vi(l, [], u), [w, T] = M(() => new Set(f)), E = t.find(({ id: e }) => e === b?.column), D = hi(n, r, w, d, (e) => b && E?.sortValue ? pi(e, E.sortValue, b.direction) : e), O = n.map(r), ee = new Set(S), k = O.filter((e) => ee.has(e)).length, te = t.length + +!!c, ne = t.some(({ footer: e }) => e !== void 0);
	function re(e, t) {
		C(t ? [...S, e] : S.filter((t) => t !== e));
	}
	function ie(e) {
		let t = S.filter((e) => !O.includes(e));
		C(e ? [...t, ...O] : t);
	}
	function ae(e) {
		let t = new Set(w);
		t.delete(e) || t.add(e), T(t);
	}
	let oe;
	return oe = m ? Array.from({ length: gi }, (e, n) => /* @__PURE__ */ F("tr", { children: [c ? /* @__PURE__ */ P("td", { className: "iro-data-table-check" }) : null, t.map((e) => /* @__PURE__ */ P("td", {
		"data-align": e.align,
		children: /* @__PURE__ */ P(ui, { width: e.align === "end" ? "50%" : "70%" })
	}, e.id))] }, n)) : D.length === 0 ? /* @__PURE__ */ P("tr", { children: /* @__PURE__ */ P("td", {
		className: "iro-data-table-empty",
		colSpan: te,
		children: p
	}) }) : D.map(({ row: e, key: n, depth: r, hasChildren: a, open: o }) => /* @__PURE__ */ F("tr", {
		"data-selected": ee.has(n) || void 0,
		"data-depth": r || void 0,
		children: [c ? /* @__PURE__ */ P("td", {
			className: "iro-data-table-check",
			children: r === 0 ? /* @__PURE__ */ P(br, {
				"aria-label": `Select ${i(e)}`,
				checked: ee.has(n),
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
		className: G("iro-data-table", _),
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
					children: /* @__PURE__ */ P(br, {
						"aria-label": "Select all rows",
						checked: O.length > 0 && k === O.length,
						indeterminate: k > 0 && k < O.length,
						onCheckedChange: ie
					})
				}) : null, t.map((e) => {
					let t = b?.column === e.id ? b.direction : null;
					return /* @__PURE__ */ P("th", {
						scope: "col",
						"data-align": e.align,
						style: { width: e.width },
						"aria-sort": e.sortValue ? t ? _i[t] : "none" : void 0,
						children: e.sortValue ? /* @__PURE__ */ F("button", {
							type: "button",
							className: "iro-data-table-sort",
							"data-sorted": t ?? void 0,
							onClick: () => x(mi(b, e.id)),
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
var bi = (e) => pr(e, {
	day: "numeric",
	month: "short",
	year: "numeric"
});
function xi({ value: e, onValueChange: t, placeholder: n = "Pick a day", format: r = bi, size: i = "md", disabled: a, invalid: o, id: s, className: c, "aria-label": l, ...u }) {
	let [d, f] = M(!1);
	return /* @__PURE__ */ P(Mr, {
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
			className: G("iro-select", "iro-date-picker", c),
			children: [/* @__PURE__ */ P("span", {
				className: "iro-select-lead",
				children: /* @__PURE__ */ P(qe, { icon: ae })
			}), /* @__PURE__ */ P("span", {
				className: e ? "iro-select-value" : "iro-select-value iro-select-placeholder",
				children: e ? r(e) : n
			})]
		}),
		children: /* @__PURE__ */ P(vr, {
			...u,
			value: e,
			onValueChange: (e) => {
				t(e), f(!1);
			}
		})
	});
}
// src/components/dialog/Dialog.tsx
function Si({ title: e, description: t, children: n, footer: r, trigger: i, open: a, onOpenChange: o, size: s = "md", closeLabel: c = "Close", className: l }) {
	let u = Y();
	return /* @__PURE__ */ F(z.Root, {
		open: a,
		onOpenChange: o ? (e) => o(e) : void 0,
		children: [i ? /* @__PURE__ */ P(z.Trigger, { render: i }) : null, /* @__PURE__ */ F(z.Portal, {
			container: u,
			children: [/* @__PURE__ */ P(z.Backdrop, { className: "iro-dialog-backdrop" }), /* @__PURE__ */ F(z.Popup, {
				className: G("iro-dialog", l),
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
function Ci({ orientation: e = "horizontal", className: t }) {
	return /* @__PURE__ */ P(Pe, {
		orientation: e,
		className: G("iro-divider", t)
	});
}
// src/components/donut-chart/DonutChart.tsx
var wi = 2, Ti = .12, Ei = 6;
function Di({ label: e, parts: t, centerLabel: n, centerValue: r, size: i = 160, legend: a = !0, format: o = An, ...s }) {
	let { active: c, setActive: l, keys: u } = Pn(t.length), d = t.reduce((e, t) => e + Math.max(t.value, 0), 0), f = t.map((e) => d > 0 ? Math.max(e.value, 0) / d : 0), p = t.map((e, t) => jn(t, e.color)), m = Math.round(i * Ti), h = i / 2, g = (i - m) / 2, _ = f.filter((e) => e > 0).length > 1 ? wi / (2 * Math.PI * g) : 0, v = f.map((e, t) => f.slice(0, t).reduce((e, t) => e + t, 0));
	function y(e) {
		let t = e.currentTarget.getBoundingClientRect(), n = e.clientX - t.left - h, r = e.clientY - t.top - h;
		if (Math.abs(Math.hypot(n, r) - g) > m / 2 + Ei) return l(null);
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
			share: Mn(f[t])
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
				Mn(f[t])
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
					children: [/* @__PURE__ */ P("strong", { children: c === null ? r ?? o(d) : o(t[c].value) }), /* @__PURE__ */ P("span", { children: c === null ? n : `${t[c].name} · ${Mn(f[c])}` })]
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
function Oi({ title: e, description: t, children: n, footer: r, trigger: i, open: a, onOpenChange: o, className: s }) {
	let c = Y();
	return /* @__PURE__ */ F(B.Root, {
		swipeDirection: "down",
		open: a,
		onOpenChange: o ? (e) => o(e) : void 0,
		children: [i ? /* @__PURE__ */ P(B.Trigger, { render: i }) : null, /* @__PURE__ */ F(B.Portal, {
			container: c,
			children: [/* @__PURE__ */ P(B.Backdrop, { className: "iro-dialog-backdrop" }), /* @__PURE__ */ P(B.Viewport, {
				className: "iro-drawer-viewport",
				children: /* @__PURE__ */ F(B.Popup, {
					className: G("iro-drawer", s),
					children: [/* @__PURE__ */ P("span", {
						className: "iro-drawer-handle",
						"aria-hidden": "true"
					}), /* @__PURE__ */ F(B.Content, {
						className: "iro-drawer-content",
						children: [
							/* @__PURE__ */ P(B.Title, {
								className: "iro-drawer-title",
								children: e
							}),
							t ? /* @__PURE__ */ P(B.Description, {
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
function ki(e) {
	return Array.from(e.dataTransfer.types).includes("Files");
}
function Ai({ onFiles: e, title: t, hint: n, icon: r = /* @__PURE__ */ P(st, {}), multiple: i, accept: a, disabled: o, compact: s, className: c }) {
	let [l, u] = M(!1), d = j(null), f = (t) => {
		let n = Array.from(t ?? []);
		n.length && e(i ? n : n.slice(0, 1));
	};
	return /* @__PURE__ */ F("button", {
		type: "button",
		disabled: o,
		"data-over": l || void 0,
		"data-compact": s || void 0,
		className: G("iro-drop-zone", c),
		onClick: () => d.current?.click(),
		onDragOver: (e) => {
			!o && ki(e) && (e.preventDefault(), u(!0));
		},
		onDragLeave: (e) => {
			e.currentTarget.contains(e.relatedTarget) || u(!1);
		},
		onDrop: (e) => {
			!o && ki(e) && (e.preventDefault(), u(!1), f(e.dataTransfer.files));
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
function ji({ title: e, icon: t, action: n, tone: r = "neutral", className: i, children: a, ...o }) {
	return /* @__PURE__ */ F("div", {
		className: G("iro-empty", i),
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
var Mi = /^[A-Za-z_][A-Za-z0-9_]*$/;
function Ni(e, t) {
	return e ? Mi.test(e) ? t.includes(e) ? `${e} is already set.` : null : "Use letters, digits and _, not starting with a digit." : "Enter a name.";
}
// src/components/environment-variables/EnvironmentVariables.tsx
var Pi = "•".repeat(12);
function Fi({ taken: e, onAdd: t }) {
	let [n, r] = M(""), [i, a] = M(""), [o, s] = M(!1), [c, l] = M(null), u = () => {
		let c = Ni(n.trim(), e);
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
			/* @__PURE__ */ P(Nr, {
				size: "sm",
				"aria-label": "New variable name",
				placeholder: "NAME",
				value: n,
				invalid: !!c,
				spellCheck: !1,
				onChange: (e) => r(e.currentTarget.value),
				onKeyDown: d
			}),
			/* @__PURE__ */ P(Nr, {
				size: "sm",
				"aria-label": "New variable value",
				placeholder: "value",
				type: o ? "password" : "text",
				autoComplete: "off",
				value: i,
				onChange: (e) => a(e.currentTarget.value),
				onKeyDown: d
			}),
			/* @__PURE__ */ P(br, {
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
function Ii({ variables: e, onChange: t, title: n, revealLabel: r = "Show values", className: i }) {
	let [a, o] = M(!1), [s, c] = M([]), l = e.some((e) => e.secret), u = (n, r) => t?.(e.map((e) => e.name === n ? {
		...e,
		value: r
	} : e));
	return /* @__PURE__ */ F("section", {
		"data-editable": t ? !0 : void 0,
		className: G("iro-env-vars", i),
		children: [
			n || l ? /* @__PURE__ */ F("header", {
				className: "iro-env-vars-head",
				children: [n ? /* @__PURE__ */ P("span", {
					className: "iro-env-vars-title",
					children: n
				}) : null, l ? /* @__PURE__ */ P(kr, {
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
								t ? /* @__PURE__ */ P(Nr, {
									size: "sm",
									"aria-label": `Value of ${n}`,
									type: o ? "password" : "text",
									autoComplete: "off",
									spellCheck: !1,
									value: r,
									end: l,
									onChange: (e) => u(n, e.currentTarget.value)
								}) : /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ P("span", { children: o ? Pi : r }), l] }),
								/* @__PURE__ */ P(Er, {
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
			t ? /* @__PURE__ */ P(Fi, {
				taken: e.map((e) => e.name),
				onAdd: (n) => t([...e, n])
			}) : null
		]
	});
}
// src/components/field/Field.tsx
function Li({ label: e, hint: t, error: n, layout: r = "top", disabled: i, className: a, children: o, ...s }) {
	return /* @__PURE__ */ F(Fe.Root, {
		disabled: i,
		invalid: n ? !0 : void 0,
		"data-layout": r,
		className: G("iro-field", a),
		...s,
		children: [/* @__PURE__ */ P(Fe.Label, {
			className: "iro-field-label",
			children: e
		}), /* @__PURE__ */ F("div", {
			className: "iro-field-body",
			children: [o, n ? /* @__PURE__ */ F(Fe.Error, {
				match: !0,
				className: "iro-field-error",
				children: [/* @__PURE__ */ P(ot, {}), n]
			}) : t ? /* @__PURE__ */ P(Fe.Description, {
				className: "iro-field-hint",
				children: t
			}) : null]
		})]
	});
}
// src/components/tree-row/TreeRow.tsx
function Ri({ label: e, depth: t = 0, icon: n, open: r, selected: i, dirty: a, meta: o, actions: s, onClick: c, onToggle: l, onContextMenu: u, size: d = "md", buttonProps: f, className: p }) {
	let m = r !== void 0;
	return /* @__PURE__ */ F("div", {
		"data-size": d,
		"data-selected": i || void 0,
		className: G("iro-tree-row", p),
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
function zi(e, t, n) {
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
var Bi = (e) => [...e].sort((e, t) => Number(!e.children) - Number(!t.children) || e.name.localeCompare(t.name));
function Vi(e, t, n = "", r = 0) {
	return Bi(e).flatMap((e) => {
		let i = n ? `${n}/${e.name}` : e.name, a = e.children ? t.has(i) : void 0, o = {
			node: e,
			path: i,
			depth: r,
			open: a
		};
		return a && e.children ? [o, ...Vi(e.children, t, i, r + 1)] : [o];
	});
}
function Hi({ nodes: e, selected: t, onSelect: n, open: r, onOpenChange: i, defaultOpen: a = [], label: o = "Files", className: s }) {
	let [c, l] = M(a), [u, d] = M(), f = j(/* @__PURE__ */ new Map()), p = new Set(r ?? c), m = Vi(e, p), h = m.map((e) => e.path), g = [u, t].find((e) => e && h.includes(e)) ?? h[0], v = (e, t) => {
		if (p.has(e) === t) return;
		let n = t ? [...p, e] : [...p].filter((t) => t !== e);
		l(n), i?.(n);
	}, b = (e, t) => {
		if (e.altKey || e.ctrlKey || e.metaKey) return;
		let n = zi(m.map((e) => ({
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
		className: G("iro-file-tree", s),
		children: m.map((e, r) => {
			let i = e.open !== void 0;
			return /* @__PURE__ */ P(Ri, {
				label: e.node.name,
				depth: e.depth,
				icon: e.node.icon ?? /* @__PURE__ */ P(qe, {
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
function Ui({ src: e, alt: t, ratio: n, fit: r = "cover", caption: i, fallback: a, onLoad: o, onError: s, className: c, style: l, ...u }) {
	let [d, f] = M("loading"), [p, m] = M(e);
	return e !== p && (m(e), f("loading")), /* @__PURE__ */ F("figure", {
		"data-state": d,
		"data-fit": r,
		"data-ratio": n !== void 0 || void 0,
		className: G("iro-image", c),
		style: {
			"--image-ratio": n,
			...l
		},
		children: [/* @__PURE__ */ F("div", {
			className: "iro-image-frame",
			children: [d === "loading" ? /* @__PURE__ */ P(ui, { className: "iro-image-placeholder" }) : null, d === "failed" ? /* @__PURE__ */ P("div", {
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
function Wi({ muted: e, mono: t, size: n = "md", className: r, ...i }) {
	return /* @__PURE__ */ P("input", {
		spellCheck: !1,
		"data-muted": e || void 0,
		"data-mono": t || void 0,
		"data-size": n,
		className: G("iro-inline-input", r),
		...i
	});
}
// src/components/lightbox/Lightbox.tsx
function Gi({ images: e, trigger: t, open: n, onOpenChange: r, index: i, onIndexChange: a, defaultIndex: o = 0, closeLabel: s = "Close", previousLabel: c = "Previous", nextLabel: l = "Next", className: u }) {
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
				className: G("iro-lightbox", u),
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
var Ki = 10, qi = 24, Ji = 6;
function Yi({ label: e, labels: t, series: n, area: r = !1, smooth: i = !1, points: a = !1, height: o = 200, min: s, max: c, format: l = An, axis: u, ...d }) {
	let [f, p] = Fn(), { active: m, setActive: h, keys: g } = Pn(t.length), _ = n.flatMap((e) => e.values).filter((e) => e !== null), { scale: v, tick: y } = Dn(s ?? Math.min(0, ..._), c ?? Math.max(0, ..._), _, u), b = o - qi, x = On(v.ticks.map(y)), S = x + Ji, C = t.length > 1 ? (p - S - Ji) / (t.length - 1) : 0, w = (e) => t.length > 1 ? S + e * C : (x + p) / 2, T = (e) => Ki + (1 - (e - v.min) / (v.max - v.min)) * (b - Ki), E = T(Math.min(Math.max(0, v.min), v.max)), D = kn(t, C || p), O = n.map((e, t) => jn(t, e.color)), ee = n.map((e) => e.dashed ? "dash" : r ? "box" : "line"), k = (e) => r && !e.dashed, te = (e) => e === null ? "–" : l(e);
	function ne(e) {
		let n = e.currentTarget.getBoundingClientRect(), r = C ? Math.round((e.clientX - n.left - S) / C) : 0;
		h(Math.min(Math.max(r, 0), t.length - 1));
	}
	let re = (e) => e === 0 ? "start" : e === t.length - 1 ? "end" : "middle", ie = (e) => (a ? e.map((e, t) => t) : m === null ? [] : [m]).filter((t) => e[t] != null);
	return /* @__PURE__ */ P(cn, {
		name: "line-chart",
		label: e,
		legend: n.length > 1 ? n.map(({ name: e }, t) => ({
			name: e,
			color: O[t],
			kind: ee[t]
		})) : void 0,
		table: {
			columns: ["", ...n.map(({ name: e }) => e)],
			rows: t.map((e, t) => [e, ...n.map((e) => te(e.values[t] ?? null))])
		},
		...d,
		children: /* @__PURE__ */ F("div", {
			ref: f,
			className: "iro-chart-plot",
			style: { height: o },
			children: [
				p > 0 ? /* @__PURE__ */ F("svg", {
					width: p,
					height: o,
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ P(ln, {
							ticks: v.ticks,
							y: T,
							gutter: x,
							width: p,
							format: y
						}),
						t.map((e, t) => t % D === 0 ? /* @__PURE__ */ P("text", {
							className: "iro-chart-axis",
							x: w(t),
							y: o - 6,
							textAnchor: re(t),
							children: e
						}, t) : null),
						m === null ? null : /* @__PURE__ */ P("line", {
							className: "iro-chart-crosshair",
							x1: w(m),
							x2: w(m),
							y1: Ki,
							y2: b
						}),
						n.map((e, t) => {
							let n = pn(e.values.map((e, t) => e === null ? null : [w(t), T(e)]));
							return /* @__PURE__ */ F("g", {
								className: "iro-chart-series",
								style: { color: O[t] },
								children: [
									k(e) ? n.map((e) => /* @__PURE__ */ P("path", {
										className: "iro-chart-area",
										d: fn(e, E, i)
									}, e[0][0])) : null,
									n.map((t) => /* @__PURE__ */ P("path", {
										className: "iro-chart-line",
										strokeDasharray: e.dashed ? "6 5" : void 0,
										d: dn(t, i)
									}, t[0][0])),
									ie(e.values).map((t) => /* @__PURE__ */ P("circle", {
										className: "iro-chart-dot",
										cx: w(t),
										cy: T(e.values[t] ?? 0),
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
					onPointerMove: ne,
					onPointerDown: ne,
					...g
				}),
				/* @__PURE__ */ P(_n, {
					open: m !== null,
					x: m === null ? 0 : w(m),
					y: Ki,
					width: p,
					title: m === null ? "" : t[m],
					rows: n.map((e, t) => ({
						name: e.name,
						value: te(m === null ? null : e.values[m] ?? null),
						color: O[t],
						kind: ee[t]
					}))
				})
			]
		})
	});
}
// src/components/list-item/ListItem.tsx
function Xi({ title: e, description: t, start: n, meta: r, actions: i, onClick: a, selected: o, stretched: s, expanded: c, wrap: l, disabled: u, as: d = "div", className: f, ...p }) {
	let m = be(), h = /* @__PURE__ */ F(N, { children: [
		c === void 0 ? null : /* @__PURE__ */ P("span", {
			className: "iro-list-item-chevron",
			"data-open": c || void 0,
			children: /* @__PURE__ */ P(J, {})
		}),
		n ? /* @__PURE__ */ P("span", {
			className: "iro-list-item-start",
			children: n
		}) : null,
		/* @__PURE__ */ F("span", {
			className: "iro-list-item-text",
			children: [/* @__PURE__ */ P("span", {
				id: m,
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
	] }), g = !!(a && s), _ = (e, t) => /* @__PURE__ */ P("button", {
		type: "button",
		className: e,
		"aria-pressed": o,
		"aria-expanded": c,
		"aria-labelledby": t ? void 0 : m,
		disabled: u,
		onClick: a,
		children: t
	});
	return /* @__PURE__ */ F(d, {
		"data-selected": o || void 0,
		"data-disabled": u || void 0,
		"data-stretched": g || void 0,
		"data-wrap": l || void 0,
		className: G("iro-list-item", f),
		...p,
		children: [
			g ? _("iro-list-item-hit") : null,
			a && !g ? _("iro-list-item-main", h) : /* @__PURE__ */ P("div", {
				className: "iro-list-item-main",
				children: h
			}),
			i ? /* @__PURE__ */ P("div", {
				className: "iro-list-item-actions",
				children: i
			}) : null
		]
	});
}
// src/components/marker/Marker.tsx
function Zi({ icon: e, action: t, className: n, children: r, ...i }) {
	return /* @__PURE__ */ P("div", {
		className: G("iro-marker", n),
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
var Qi = 4;
function $i({ menus: e, className: t, "aria-label": n = "Menu bar" }) {
	let r = Y();
	return /* @__PURE__ */ P(Ie, {
		className: G("iro-menubar", t),
		"aria-label": n,
		children: e.map((e) => /* @__PURE__ */ F(L.Root, { children: [/* @__PURE__ */ P(L.Trigger, {
			className: "iro-menubar-trigger",
			children: e.label
		}), /* @__PURE__ */ P(L.Portal, {
			container: r,
			children: /* @__PURE__ */ P(L.Positioner, {
				align: "start",
				sideOffset: Qi,
				className: "iro-positioner",
				children: /* @__PURE__ */ P(L.Popup, {
					className: "iro-popup iro-popup-list",
					children: /* @__PURE__ */ P(Yn, { items: e.items })
				})
			})
		})] }, e.label))
	});
}
// src/components/message/Message.tsx
function ea({ from: e = "assistant", children: t, avatar: n, name: r, time: i, attachments: a, actions: o, streaming: s = !1, className: c, ...l }) {
	return /* @__PURE__ */ F("article", {
		"data-from": e,
		"data-streaming": s || void 0,
		className: G("iro-message", c),
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
var ta = .75, na = .9;
function ra({ value: e, min: t = 0, max: n = 100, label: r, valueText: i, tone: a = !0, className: o }) {
	let s = n > t ? Math.min(Math.max((e - t) / (n - t), 0), 1) : 0, c = i ?? `${Math.round(s * 100)}%`, l = a ? s > na ? "danger" : s > ta ? "warning" : void 0 : void 0;
	return /* @__PURE__ */ F(Le.Root, {
		value: e,
		min: t,
		max: n,
		getAriaValueText: () => c,
		"data-level": l,
		className: G("iro-meter", o),
		children: [
			/* @__PURE__ */ P(Le.Label, {
				className: "iro-meter-label",
				children: r
			}),
			/* @__PURE__ */ P(Le.Track, {
				className: "iro-meter-track",
				children: /* @__PURE__ */ P(Le.Indicator, { className: "iro-meter-fill" })
			}),
			/* @__PURE__ */ P("span", {
				className: "iro-meter-value",
				children: c
			})
		]
	});
}
// src/components/multi-segmented/MultiSegmented.tsx
function ia({ options: e, value: t, onValueChange: n, allLabel: r, size: i = "md", disabled: a, className: o, "aria-label": s }) {
	let c = (e) => n(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	return /* @__PURE__ */ F("div", {
		role: "group",
		"aria-label": s,
		"data-size": i,
		className: G("iro-segmented", "iro-multi-segmented", o),
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
var aa = 4;
function oa({ option: e }) {
	return /* @__PURE__ */ F(V.Item, {
		value: e.value,
		disabled: e.disabled,
		className: "iro-option",
		children: [
			/* @__PURE__ */ P("span", {
				className: "iro-option-slot",
				children: /* @__PURE__ */ P(V.ItemIndicator, {
					className: "iro-option-check",
					children: /* @__PURE__ */ P(Je, {})
				})
			}),
			e.icon ? /* @__PURE__ */ P("span", {
				className: "iro-option-icon",
				children: e.icon
			}) : null,
			/* @__PURE__ */ P(V.ItemText, {
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
function sa({ options: e, value: t, onValueChange: n, placeholder: r = "None", size: i = "md", disabled: a, id: o, className: s, "aria-label": c }) {
	let l = Y(), u = Yt(e), d = (t) => e.find((e) => e.value === t)?.label ?? t;
	return /* @__PURE__ */ F(V.Root, {
		multiple: !0,
		value: t,
		onValueChange: (e) => n(e),
		disabled: a,
		children: [/* @__PURE__ */ F(V.Trigger, {
			id: o,
			"aria-label": c,
			"data-size": i,
			className: G("iro-select", s),
			children: [/* @__PURE__ */ P(V.Value, {
				className: "iro-select-value",
				children: (e) => e.length ? e.map(d).join(", ") : /* @__PURE__ */ P("span", {
					className: "iro-select-placeholder",
					children: r
				})
			}), /* @__PURE__ */ P(V.Icon, {
				className: "iro-select-icon",
				children: /* @__PURE__ */ P(q, {})
			})]
		}), /* @__PURE__ */ P(V.Portal, {
			container: l,
			children: /* @__PURE__ */ P(V.Positioner, {
				sideOffset: aa,
				alignItemWithTrigger: !1,
				className: "iro-positioner",
				children: /* @__PURE__ */ P(V.Popup, {
					className: "iro-popup iro-popup-list",
					children: u ? u.map((e) => /* @__PURE__ */ F(V.Group, { children: [e.value ? /* @__PURE__ */ P(V.GroupLabel, {
						className: "iro-popup-label",
						children: e.value
					}) : null, e.items.map((e) => /* @__PURE__ */ P(oa, { option: e }, e.value))] }, e.value)) : e.map((e) => /* @__PURE__ */ P(oa, { option: e }, e.value))
				})
			})
		})]
	});
}
// src/components/native-select/NativeSelect.tsx
function ca({ size: e = "md", invalid: t, className: n, style: r, children: i, ...a }) {
	return /* @__PURE__ */ F("span", {
		"data-size": e,
		"data-invalid": t || void 0,
		className: G("iro-select", "iro-native-select", n),
		style: r,
		children: [/* @__PURE__ */ P(Fe.Control, {
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
var la = 8;
function ua({ links: e }) {
	return /* @__PURE__ */ P("ul", {
		className: "iro-navigation-menu-links",
		"data-columns": e.length > 3 ? 2 : 1,
		children: e.map((e) => /* @__PURE__ */ P("li", { children: /* @__PURE__ */ F(H.Link, {
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
function da({ items: e, className: t, "aria-label": n = "Main" }) {
	let r = Y();
	return /* @__PURE__ */ F(H.Root, {
		className: G("iro-navigation-menu", t),
		"aria-label": n,
		children: [/* @__PURE__ */ P(H.List, {
			className: "iro-navigation-menu-list",
			children: e.map((e) => /* @__PURE__ */ P(H.Item, {
				className: "iro-navigation-menu-item",
				children: e.links || e.content ? /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ F(H.Trigger, {
					className: "iro-navigation-menu-trigger",
					"data-current": e.current || void 0,
					children: [e.label, /* @__PURE__ */ P(H.Icon, {
						className: "iro-navigation-menu-icon",
						children: /* @__PURE__ */ P(q, {})
					})]
				}), /* @__PURE__ */ P(H.Content, {
					className: "iro-navigation-menu-content",
					children: e.content ?? /* @__PURE__ */ P(ua, { links: e.links ?? [] })
				})] }) : /* @__PURE__ */ P(H.Link, {
					href: e.href,
					active: e.current,
					className: "iro-navigation-menu-trigger",
					"aria-current": e.current ? "page" : void 0,
					children: e.label
				})
			}, e.label))
		}), /* @__PURE__ */ P(H.Portal, {
			container: r,
			children: /* @__PURE__ */ P(H.Positioner, {
				sideOffset: la,
				collisionPadding: 16,
				className: "iro-positioner iro-navigation-menu-positioner",
				children: /* @__PURE__ */ P(H.Popup, {
					className: "iro-popup iro-navigation-menu-popup",
					children: /* @__PURE__ */ P(H.Viewport, { className: "iro-navigation-menu-viewport" })
				})
			})
		})]
	});
}
// src/components/notice/Notice.tsx
var fa = {
	info: /* @__PURE__ */ P(rt, {}),
	success: /* @__PURE__ */ P(it, {}),
	warning: /* @__PURE__ */ P(at, {}),
	danger: /* @__PURE__ */ P(ot, {})
};
function pa({ tone: e = "info", title: t, icon: n, actions: r, className: i, children: a, ...o }) {
	return /* @__PURE__ */ F("div", {
		role: e === "danger" ? "alert" : "status",
		"data-tone": e,
		className: G("iro-notice", i),
		...o,
		children: [/* @__PURE__ */ P("span", {
			className: "iro-notice-icon",
			children: n ?? fa[e]
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
function ma({ value: e, defaultValue: t, onValueChange: n, min: r, max: i, step: a, largeStep: o, format: s, size: c = "md", disabled: l, required: u, invalid: d, name: f, id: p, className: m, "aria-label": h, decrementLabel: g = "Decrease", incrementLabel: _ = "Increase" }) {
	return /* @__PURE__ */ P(Re.Root, {
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
		className: G("iro-number-field", m),
		children: /* @__PURE__ */ F(Re.Group, {
			className: "iro-number-field-group",
			children: [
				/* @__PURE__ */ P(Re.Decrement, {
					className: "iro-number-field-step",
					"aria-label": g,
					children: /* @__PURE__ */ P(Ye, {})
				}),
				/* @__PURE__ */ P(Re.Input, {
					className: "iro-number-field-input",
					"aria-label": h,
					"aria-invalid": d || void 0
				}),
				/* @__PURE__ */ P(Re.Increment, {
					className: "iro-number-field-step",
					"aria-label": _,
					children: /* @__PURE__ */ P(Xe, {})
				})
			]
		})
	});
}
// src/components/otp-field/OtpField.tsx
function ha({ length: e = 6, value: t, defaultValue: n, onValueChange: r, onComplete: i, type: a = "numeric", groupSize: o, mask: s, disabled: c, invalid: l, name: u, className: d, "aria-label": f }) {
	let p = be();
	return /* @__PURE__ */ F(ze.Root, {
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
		className: G("iro-otp-field", d),
		children: [f ? /* @__PURE__ */ P("span", {
			id: p,
			hidden: !0,
			children: `${f}, 1 of ${e}`
		}) : null, Array.from({ length: e }, (t, n) => /* @__PURE__ */ P(ze.Input, {
			"aria-invalid": l || void 0,
			"data-group-end": o && (n + 1) % o === 0 && n < e - 1 || void 0,
			"aria-labelledby": n === 0 && f ? p : void 0,
			"aria-label": n === 0 ? void 0 : `${f ?? "Code"}, ${n + 1} of ${e}`,
			className: "iro-otp-field-box"
		}, n))]
	});
}
// src/components/property-list/PropertyList.tsx
function ga({ properties: e, copyLabel: t = "Copy", className: n, ...r }) {
	let i = e.filter(({ value: e }) => e != null && e !== "");
	return /* @__PURE__ */ P("dl", {
		className: G("iro-properties", n),
		...r,
		children: i.map((e) => /* @__PURE__ */ F("div", {
			className: "iro-property",
			children: [/* @__PURE__ */ P("dt", {
				className: "iro-property-label",
				children: e.label
			}), /* @__PURE__ */ F("dd", {
				className: "iro-property-value",
				"data-mono": e.mono || void 0,
				children: [/* @__PURE__ */ P("span", { children: e.value }), e.copy ? /* @__PURE__ */ P(Er, {
					text: e.copy,
					label: `${t} ${e.label}`,
					className: "iro-property-copy"
				}) : null]
			})]
		}, e.label))
	});
}
// src/components/snippet/Snippet.tsx
function _a({ code: e, prompt: t = !0, copyLabel: n = "Copy command", className: r }) {
	return /* @__PURE__ */ F("div", {
		"data-prompt": t || void 0,
		className: G("iro-snippet", r),
		children: [/* @__PURE__ */ P("code", {
			className: "iro-snippet-code",
			tabIndex: 0,
			children: e
		}), /* @__PURE__ */ P(Er, {
			text: e,
			label: n
		})]
	});
}
// src/components/package-info/PackageInfo.tsx
function va({ name: e, version: t, description: n, install: r, details: i, dependencies: a, links: o, dependenciesLabel: s = "Dependencies", className: c }) {
	let l = Object.entries(a ?? {});
	return /* @__PURE__ */ F("article", {
		className: G("iro-package-info", c),
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
			r ? /* @__PURE__ */ P(_a, { code: r }) : null,
			i && i.length > 0 ? /* @__PURE__ */ P(ga, { properties: i }) : null,
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
var ya = 4;
function ba({ option: e }) {
	return /* @__PURE__ */ F(U.Item, {
		value: e,
		disabled: e.disabled,
		className: "iro-option",
		children: [
			/* @__PURE__ */ P("span", {
				className: "iro-option-slot",
				children: /* @__PURE__ */ P(U.ItemIndicator, {
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
function xa({ options: e, value: t, onValueChange: n, placeholder: r, emptyText: i = "No matches", size: a = "md", disabled: o, invalid: s, id: c, className: l, "aria-label": u, openLabel: d = "Show options" }) {
	let f = Y(), p = Yt(e), m = e.find((e) => e.value === t) ?? null;
	return /* @__PURE__ */ F(U.Root, {
		items: p ?? e,
		value: m,
		onValueChange: (e) => n(e ? e.value : null),
		itemToStringLabel: (e) => e.label,
		isItemEqualToValue: (e, t) => e.value === t.value,
		filter: (e, t) => Xt(e.label, t),
		autoHighlight: !0,
		disabled: o,
		children: [/* @__PURE__ */ F(U.InputGroup, {
			className: G("iro-select", l),
			"data-size": a,
			"data-invalid": s || void 0,
			children: [
				m?.icon ? /* @__PURE__ */ P("span", {
					className: "iro-select-lead",
					children: m.icon
				}) : null,
				/* @__PURE__ */ P(U.Input, {
					className: "iro-select-input",
					placeholder: r,
					id: c,
					"aria-label": u,
					"aria-invalid": s || void 0
				}),
				/* @__PURE__ */ P(U.Trigger, {
					className: "iro-select-icon",
					"aria-label": d,
					children: /* @__PURE__ */ P(q, {})
				})
			]
		}), /* @__PURE__ */ P(U.Portal, {
			container: f,
			children: /* @__PURE__ */ P(U.Positioner, {
				sideOffset: ya,
				className: "iro-positioner",
				children: /* @__PURE__ */ F(U.Popup, {
					className: "iro-popup",
					children: [/* @__PURE__ */ P(U.Empty, { children: /* @__PURE__ */ P("div", {
						className: "iro-popup-empty",
						children: i
					}) }), /* @__PURE__ */ P(U.List, {
						className: "iro-popup-list",
						children: p ? (e) => /* @__PURE__ */ F(U.Group, {
							items: e.items,
							children: [e.value ? /* @__PURE__ */ P(U.GroupLabel, {
								className: "iro-popup-label",
								children: e.value
							}) : null, /* @__PURE__ */ P(U.Collection, { children: (e) => /* @__PURE__ */ P(ba, { option: e }, e.value) })]
						}, e.value) : (e) => /* @__PURE__ */ P(ba, { option: e }, e.value)
					})]
				})
			})
		})]
	});
}
// src/components/pagination/pages.ts
var Sa = 7, Ca = (e, t) => Array.from({ length: t - e + 1 }, (t, n) => e + n);
function wa(e, t) {
	if (t <= Sa) return Ca(1, t);
	let n = Math.max(2, Math.min(e - 1, t - 4)), r = Math.min(t - 1, Math.max(e + 1, 5));
	return [
		1,
		...n > 2 ? ["gap"] : [],
		...Ca(n, r),
		...r < t - 1 ? ["gap"] : [],
		t
	];
}
// src/components/pagination/Pagination.tsx
var Ta = {
	pageSize: "Rows per page",
	previous: "Previous page",
	next: "Next page",
	page: (e) => `Page ${e}`,
	range: (e, t, n) => `${e}–${t} of ${n}`
};
function Ea({ page: e, pageSize: t, total: n, onPageChange: r, pageSizes: i, onPageSizeChange: a, labels: o, className: s, "aria-label": c = "Pagination", ...l }) {
	let u = {
		...Ta,
		...o
	}, d = Math.max(1, Math.ceil(n / t)), f = Math.min(Math.max(e, 1), d), p = n === 0 ? 0 : (f - 1) * t + 1, m = Math.min(f * t, n);
	return /* @__PURE__ */ F("nav", {
		className: G("iro-pagination", s),
		"aria-label": c,
		...l,
		children: [
			i && a ? /* @__PURE__ */ F("span", {
				className: "iro-pagination-size",
				children: [/* @__PURE__ */ P("span", {
					"aria-hidden": "true",
					children: u.pageSize
				}), /* @__PURE__ */ P(xa, {
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
					wa(f, d).map((e, t) => e === "gap" ? /* @__PURE__ */ P("span", {
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
function Da({ as: e = "div", padded: t = !0, className: n, ...r }) {
	return /* @__PURE__ */ P(e, {
		"data-padded": t || void 0,
		className: G("iro-panel", n),
		...r
	});
}
// src/components/progress-bar/ProgressBar.tsx
function Oa({ value: e, tone: t = "accent", size: n = "md", label: r, segments: i, className: a }) {
	let o = e === null ? null : Math.min(Math.max(e, 0), 1) * 100, s = i ? Math.round((o ?? 0) / 100 * i) : 0;
	return /* @__PURE__ */ P(Be.Root, {
		value: o,
		"aria-label": r,
		"data-tone": t,
		"data-size": n,
		"data-segments": i ? !0 : void 0,
		className: G("iro-progress", a),
		children: /* @__PURE__ */ P(Be.Track, {
			className: "iro-progress-track",
			children: i ? Array.from({ length: i }, (e, t) => /* @__PURE__ */ P("span", {
				className: "iro-progress-segment",
				"data-filled": t < s || void 0
			}, t)) : /* @__PURE__ */ P(Be.Indicator, { className: "iro-progress-indicator" })
		})
	});
}
// src/components/plan/Plan.tsx
function ka({ status: e }) {
	return e === "running" ? /* @__PURE__ */ P(jt, { label: "Working" }) : e === "done" ? /* @__PURE__ */ P(Je, {}) : e === "error" ? /* @__PURE__ */ P(ot, {}) : null;
}
function Aa({ steps: e, title: t = "Plan", progressLabel: n = (e, t) => `${e} of ${t} done`, className: r }) {
	let i = e.filter((e) => e.status === "done").length;
	return /* @__PURE__ */ F("section", {
		className: G("iro-plan", r),
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
			/* @__PURE__ */ P(Oa, {
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
						children: /* @__PURE__ */ P(ka, { status: e.status })
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
var ja = 16, Ma = 64, Na = {
	width: 900,
	height: 360
};
function Pa({ target: e, axis: t = "y", fitSize: n, maxFit: r = Na, label: i = "Resize", onResize: a, className: o }) {
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
			let n = t.shiftKey ? Ma : ja, r = {
				ArrowUp: [0, -n],
				ArrowDown: [0, n],
				ArrowLeft: [-n, 0],
				ArrowRight: [n, 0]
			}[t.key], i = e.current?.getBoundingClientRect();
			!r || !i || r[0] && !c || r[1] && !l || (t.preventDefault(), p(i.width + r[0], i.height + r[1]), f(), a?.(!1));
		},
		className: G("iro-resize-grip", o),
		children: /* @__PURE__ */ P("span", { className: "iro-resize-grip-mark" })
	});
}
// src/components/text-area/TextArea.tsx
function Fa(e) {
	return e.offsetHeight - e.clientHeight;
}
function Ia({ invalid: e, autoGrow: t = !0, maxRows: n = 12, mono: r, resizable: i = !0, className: a, ref: o, onInput: s, ...c }) {
	let l = j(null), u = j(!1), d = () => {
		let e = l.current;
		if (!e || !t || u.current) return;
		e.style.height = "auto";
		let r = getComputedStyle(e), i = Number.parseFloat(r.lineHeight) || 20, a = Number.parseFloat(r.paddingTop) + Number.parseFloat(r.paddingBottom), o = i * n + a + Fa(e);
		e.style.height = `${Math.min(e.scrollHeight + Fa(e), o)}px`;
	};
	Se(d, [
		c.value,
		t,
		n
	]);
	let f = /* @__PURE__ */ P(Fe.Control, { render: /* @__PURE__ */ P("textarea", {
		ref: (e) => {
			l.current = e, typeof o == "function" ? o(e) : o && (o.current = e);
		},
		className: G("iro-text-area", a),
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
		children: [f, /* @__PURE__ */ P(Pa, {
			target: l,
			label: "Resize the text box",
			fitSize: () => ({ height: l.current ? l.current.scrollHeight + Fa(l.current) : 0 }),
			onResize: (e) => {
				u.current = !e;
			}
		})]
	}) : f;
}
// src/components/prompt-input/PromptInput.tsx
function La({ value: e, onValueChange: t, onSubmit: n, placeholder: r = "Ask anything", streaming: i = !1, onStop: a, attachments: o, tools: s, maxRows: l = 8, disabled: u, sendLabel: d = "Send", stopLabel: f = "Stop", className: p, "aria-label": m = "Message" }) {
	let h = e.trim() !== "" && !u && !i, _ = (t) => {
		t?.preventDefault(), h && n(e);
	};
	return /* @__PURE__ */ F("form", {
		className: G("iro-prompt-input", p),
		"data-disabled": u || void 0,
		onSubmit: _,
		children: [
			o ? /* @__PURE__ */ P("div", {
				className: "iro-prompt-input-attachments",
				children: o
			}) : null,
			/* @__PURE__ */ P(Ia, {
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
					icon: /* @__PURE__ */ P(qe, { icon: g }),
					label: f,
					onClick: a
				}) : /* @__PURE__ */ P(Z, {
					type: "submit",
					variant: "primary",
					icon: /* @__PURE__ */ P(qe, { icon: c }),
					label: d,
					disabled: !h
				})]
			})
		]
	});
}
// src/components/prose/Prose.tsx
function Ra({ size: e = "md", className: t, ...n }) {
	return /* @__PURE__ */ P("div", {
		"data-size": e,
		className: G("iro-prose", t),
		...n
	});
}
// src/components/radio-group/RadioGroup.tsx
function za({ options: e, value: t, defaultValue: n, onValueChange: r, orientation: i = "vertical", disabled: a, name: o, className: s, "aria-label": c }) {
	return /* @__PURE__ */ P(He, {
		value: t,
		defaultValue: n,
		onValueChange: r ? (e) => r(e) : void 0,
		disabled: a,
		name: o,
		"aria-label": c,
		"data-orientation": i,
		className: G("iro-radio-group", s),
		children: e.map((e) => /* @__PURE__ */ F("label", {
			className: "iro-radio-label",
			"data-disabled": a || e.disabled || void 0,
			children: [/* @__PURE__ */ P(Ve.Root, {
				value: e.value,
				disabled: e.disabled,
				className: "iro-radio",
				children: /* @__PURE__ */ P(Ve.Indicator, { className: "iro-radio-indicator" })
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
var Ba = "__other__";
function Va(e, t) {
	return Object.fromEntries(Object.entries(e).map(([e, n]) => [e, n.map((n) => n === "__other__" ? (t[e] ?? "").trim() : n)]));
}
function Ha(e, t, n) {
	return e.every((e) => {
		let r = t[e] ?? [];
		return r.length > 0 && (!r.includes("__other__") || (n[e] ?? "").trim() !== "");
	});
}
// src/components/questionnaire/Questionnaire.tsx
function Ua({ questions: e, onSubmit: t, onSkip: n, submitLabel: r = "Send answers", skipLabel: i = "Skip", otherLabel: a = "Other", className: o }) {
	let [s, c] = M({}), [l, u] = M({}), d = Ha(e.map(({ id: e }) => e), s, l), f = (e, t) => c({
		...s,
		[e]: t
	});
	return /* @__PURE__ */ F("form", {
		className: G("iro-questionnaire", o),
		onSubmit: (e) => {
			e.preventDefault(), d && t(Va(s, l));
		},
		children: [e.map((e) => {
			let t = e.other ? [...e.options, {
				value: Ba,
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
						children: t.map((t) => /* @__PURE__ */ P(br, {
							label: t.label,
							description: "description" in t ? t.description : void 0,
							checked: n.includes(t.value),
							onCheckedChange: (r) => f(e.id, r ? [...n, t.value] : n.filter((e) => e !== t.value))
						}, t.value))
					}) : /* @__PURE__ */ P(za, {
						value: n[0] ?? "",
						onValueChange: (t) => f(e.id, [t]),
						options: t
					}),
					n.includes("__other__") ? /* @__PURE__ */ P(Nr, {
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
function Wa({ items: e, onRemove: t, onSendNow: n, label: r = (e) => `${e} queued`, className: i }) {
	return e.length === 0 ? null : /* @__PURE__ */ F("section", {
		className: G("iro-queue", i),
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
					icon: /* @__PURE__ */ P(qe, { icon: c }),
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
var Ga = (e) => pr(e, {
	day: "numeric",
	month: "short"
});
function Ka({ from: e, to: t, onRangeChange: n, maxDays: r, today: i = cr(), latest: a = i, className: o }) {
	let [s, c] = M(null), l = s ?? {
		from: e,
		to: t
	}, [u, d] = M(() => $(t || e || i)), [f, p] = M(null), [m, h] = M(t || e || i), g = j(null), _ = j(!1);
	A(() => {
		c(null), (t || e) && (d($(t || e)), h(t || e));
	}, [e, t]), A(() => {
		_.current && (_.current = !1, g.current?.querySelector(`[data-day="${m}"]`)?.focus());
	});
	let v = (e) => !!(s && r && Math.abs(sr(s.from, e)) > r - 1), y = (e) => !!(a && e > a) || v(e), b = (e) => {
		if (y(e)) return;
		let t = _r(l, e);
		t.to ? (c(null), n(t)) : c(t);
	}, x = l.to || (s && f && !y(f) ? f : ""), S = x && x < l.from ? x : l.from, C = x && x < l.from ? l.from : x || l.from, w = (e) => {
		let t = a && e > a ? a : e;
		_.current = !0, h(t), lr($(t), u) || d($(t));
	}, T = (e, t) => {
		let n = gr(e.key, t);
		n ? (e.preventDefault(), w(n)) : e.key === "Escape" && s && (e.preventDefault(), e.stopPropagation(), c(null));
	}, E = l.from && l.to ? sr(l.from, l.to) + 1 : 0, D = a ? $(a) : null, O = hr(u);
	return /* @__PURE__ */ F("div", {
		className: G("iro-calendar", o),
		children: [
			/* @__PURE__ */ F("div", {
				className: "iro-calendar-head",
				children: [
					/* @__PURE__ */ P(Z, {
						icon: /* @__PURE__ */ P(Ze, {}),
						size: "sm",
						label: "Previous month",
						tooltip: !1,
						onClick: () => d(ur(u, -1))
					}),
					/* @__PURE__ */ P("span", {
						className: "iro-calendar-title",
						"aria-live": "polite",
						children: O
					}),
					/* @__PURE__ */ P(Z, {
						icon: /* @__PURE__ */ P(J, {}),
						size: "sm",
						label: "Next month",
						tooltip: !1,
						disabled: !!(D && lr(u, D)),
						onClick: () => d(ur(u, 1))
					})
				]
			}),
			/* @__PURE__ */ F("div", {
				ref: g,
				role: "group",
				"aria-label": O,
				className: "iro-calendar-grid",
				onPointerLeave: () => p(null),
				children: [rr.map((e) => /* @__PURE__ */ P("span", {
					"aria-hidden": "true",
					className: "iro-calendar-weekday",
					children: e
				}, e)), fr(u).map((e) => {
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
							"data-outside": !lr($(e), u) || void 0,
							"data-today": e === i || void 0,
							tabIndex: e === m ? 0 : -1,
							disabled: y(e),
							"aria-label": mr(e),
							"aria-pressed": t || n || r,
							"aria-current": e === i ? "date" : void 0,
							className: "iro-calendar-day",
							onClick: () => b(e),
							onPointerEnter: () => p(e),
							onFocus: () => h(e),
							onKeyDown: (t) => T(t, e),
							children: Number(e.slice(8))
						})
					}, e);
				})]
			}),
			/* @__PURE__ */ P("p", {
				className: "iro-calendar-status",
				"aria-live": "polite",
				children: s ? `From ${Ga(s.from)}: now pick the last day${r ? ` (${r} days at most)` : ""}.` : E ? `${Ga(l.from)} – ${Ga(l.to)} · ${E} ${E === 1 ? "day" : "days"}` : "Pick the first day, then the last."
			})
		]
	});
}
// src/components/shimmer/Shimmer.tsx
function qa({ className: e, ...t }) {
	return /* @__PURE__ */ P("span", {
		className: G("iro-shimmer", e),
		...t
	});
}
// src/components/reasoning/Reasoning.tsx
var Ja = (e, t) => e ? "Thinking…" : t === void 0 ? "Thought" : `Thought for ${Math.round(t)} s`;
function Ya({ children: e, streaming: t = !1, duration: n, label: r = Ja, className: i }) {
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
		className: G("iro-reasoning", i),
		children: [/* @__PURE__ */ F(R.Trigger, {
			className: "iro-reasoning-trigger",
			children: [
				/* @__PURE__ */ P(mt, {}),
				P(t ? qa : "span", { children: l }),
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
function Xa({ fields: e, open: t, required: n }) {
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
							children: /* @__PURE__ */ P(Xa, {
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
function Za({ fields: e, method: t, title: n, description: r, defaultOpen: i = !1, requiredLabel: a = "required", className: o }) {
	return /* @__PURE__ */ F("section", {
		className: G("iro-schema", o),
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
		}) : null, /* @__PURE__ */ P(Xa, {
			fields: e,
			open: i,
			required: a
		})]
	});
}
// src/components/scroll-area/ScrollArea.tsx
function Qa({ children: e, direction: t = "vertical", maxHeight: n, fade: r = !1, className: i, "aria-label": a }) {
	let o = t === "both" ? ["vertical", "horizontal"] : [t];
	return /* @__PURE__ */ F(Ue.Root, {
		className: G("iro-scroll-area", i),
		"data-fade": r || void 0,
		style: { "--scroll-area-max": typeof n == "number" ? `${n}px` : n },
		children: [
			/* @__PURE__ */ P(Ue.Viewport, {
				className: "iro-scroll-area-viewport",
				"aria-label": a,
				children: /* @__PURE__ */ P(Ue.Content, {
					className: "iro-scroll-area-content",
					"data-direction": t,
					children: e
				})
			}),
			o.map((e) => /* @__PURE__ */ P(Ue.Scrollbar, {
				orientation: e,
				className: "iro-scroll-area-bar",
				children: /* @__PURE__ */ P(Ue.Thumb, { className: "iro-scroll-area-thumb" })
			}, e)),
			t === "both" ? /* @__PURE__ */ P(Ue.Corner, {}) : null
		]
	});
}
// src/components/scrub-field/ScrubField.tsx
var $a = 3, eo = .1, to = 10;
function no({ value: e, onValueChange: t, min: n, max: r, step: i = 1, label: a, "aria-label": o, unit: s, defaultValue: c, format: l, size: u = "md", disabled: d, className: f }) {
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
		className: G("iro-scrub", f),
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
			if (!t.moved && Math.abs(i) < $a) return;
			t.moved = !0;
			let a = p.current?.getBoundingClientRect().width || 1;
			x(t.start + i / a * (r - n) * (e.shiftKey ? eo : 1));
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
			let a = t.shiftKey ? to : 1, o = {
				ArrowRight: i * a,
				ArrowUp: i * a,
				ArrowLeft: -i * a,
				ArrowDown: -i * a,
				PageUp: i * to,
				PageDown: -i * to
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
function ro({ icon: e, actions: t, level: n = 3, className: r, children: i, ...a }) {
	let o = `h${n}`;
	return /* @__PURE__ */ F("div", {
		className: G("iro-section-title", r),
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
function io({ options: e, value: t, onValueChange: n, size: r = "md", full: i = !1, disabled: a, className: o, "aria-label": s }) {
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
	}, [t]), /* @__PURE__ */ F(He, {
		ref: c,
		value: t,
		onValueChange: (e) => n(e),
		disabled: a,
		"aria-label": s,
		"data-size": r,
		"data-full": i || void 0,
		className: G("iro-segmented", o),
		children: [l ? /* @__PURE__ */ P("span", {
			className: "iro-segmented-thumb",
			style: {
				width: l.width,
				transform: `translateX(${l.x}px)`
			},
			"aria-hidden": "true"
		}) : null, e.map((e) => /* @__PURE__ */ F(Ve.Root, {
			value: e.value,
			disabled: e.disabled,
			className: "iro-segmented-option",
			children: [e.icon, e.label]
		}, e.value))]
	});
}
// src/components/share-bar/ShareBar.tsx
function ao({ label: e, parts: t, legend: n = !0, size: r = "md", format: i = An, ...a }) {
	let o = t.reduce((e, t) => e + Math.max(t.value, 0), 0), s = t.map((e) => o > 0 ? Math.max(e.value, 0) / o : 0), c = t.map((e, t) => jn(t, e.color)), l = t.map((e, t) => `${e.name} ${Mn(s[t])}`).join(", ");
	return /* @__PURE__ */ P(cn, {
		name: "share-bar",
		label: e,
		legend: n ? t.map((e, t) => ({
			name: e.name,
			color: c[t],
			kind: "box",
			value: i(e.value),
			share: Mn(s[t])
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
				Mn(s[t])
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
function oo({ title: e, children: t, side: n = "right", trigger: r, open: i, onOpenChange: a, closeLabel: o = "Close", className: s }) {
	let c = Y();
	return /* @__PURE__ */ F(z.Root, {
		open: i,
		onOpenChange: a ? (e) => a(e) : void 0,
		children: [r ? /* @__PURE__ */ P(z.Trigger, { render: r }) : null, /* @__PURE__ */ F(z.Portal, {
			container: c,
			children: [/* @__PURE__ */ P(z.Backdrop, { className: "iro-dialog-backdrop" }), /* @__PURE__ */ F(z.Popup, {
				className: G("iro-sheet", s),
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
// src/components/single-select/SingleSelect.tsx
var so = 4;
function co({ option: e }) {
	return /* @__PURE__ */ F(V.Item, {
		value: e.value,
		disabled: e.disabled,
		className: "iro-option",
		children: [
			/* @__PURE__ */ P("span", {
				className: "iro-option-slot",
				children: /* @__PURE__ */ P(V.ItemIndicator, {
					className: "iro-option-check",
					children: /* @__PURE__ */ P(Je, {})
				})
			}),
			e.icon ? /* @__PURE__ */ P("span", {
				className: "iro-option-icon",
				children: e.icon
			}) : null,
			/* @__PURE__ */ P(V.ItemText, {
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
function lo({ options: e, value: t, onValueChange: n, placeholder: r = "None", size: i = "md", disabled: a, id: o, className: s, "aria-label": c }) {
	let l = Y(), u = Yt(e), d = e.find((e) => e.value === t) ?? null;
	return /* @__PURE__ */ F(V.Root, {
		value: t,
		onValueChange: (e) => n(e),
		disabled: a,
		children: [/* @__PURE__ */ F(V.Trigger, {
			id: o,
			"aria-label": c,
			"data-size": i,
			className: G("iro-select", s),
			children: [
				d?.icon ? /* @__PURE__ */ P("span", {
					className: "iro-select-lead",
					children: d.icon
				}) : null,
				/* @__PURE__ */ P(V.Value, {
					className: "iro-select-value",
					children: () => d?.label ?? /* @__PURE__ */ P("span", {
						className: "iro-select-placeholder",
						children: r
					})
				}),
				/* @__PURE__ */ P(V.Icon, {
					className: "iro-select-icon",
					children: /* @__PURE__ */ P(q, {})
				})
			]
		}), /* @__PURE__ */ P(V.Portal, {
			container: l,
			children: /* @__PURE__ */ P(V.Positioner, {
				sideOffset: so,
				alignItemWithTrigger: !1,
				className: "iro-positioner",
				children: /* @__PURE__ */ P(V.Popup, {
					className: "iro-popup iro-popup-list",
					children: u ? u.map((e) => /* @__PURE__ */ F(V.Group, { children: [e.value ? /* @__PURE__ */ P(V.GroupLabel, {
						className: "iro-popup-label",
						children: e.value
					}) : null, e.items.map((e) => /* @__PURE__ */ P(co, { option: e }, e.value))] }, e.value)) : e.map((e) => /* @__PURE__ */ P(co, { option: e }, e.value))
				})
			})
		})]
	});
}
// src/components/sources/Sources.tsx
function uo({ sources: e, label: t = (e) => `Used ${e} ${e === 1 ? "source" : "sources"}`, defaultOpen: n = !1, className: r }) {
	return /* @__PURE__ */ F(R.Root, {
		defaultOpen: n,
		className: G("iro-sources", r),
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
var fo = 5;
function po({ values: e, label: t, color: n = "var(--iro-chart-1)", area: r = !1, height: i = 32, format: a = An, className: o, style: s, ...c }) {
	let [l, u] = Fn(), d = Math.min(...e), f = Math.max(...e) - d || 1, p = e.map((t, n) => [fo + n / Math.max(e.length - 1, 1) * (u - 10), fo + (1 - (t - d) / f) * (i - 10)]), m = p.at(-1), h = e.length > 0 ? `${t}: from ${a(e[0])} to ${a(e[e.length - 1])}` : t;
	return /* @__PURE__ */ P("div", {
		ref: l,
		role: "img",
		"aria-label": h,
		className: G("iro-sparkline", o),
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
var mo = () => {
	if (typeof window > "u") return;
	let e = window;
	return e.SpeechRecognition ?? e.webkitSpeechRecognition;
};
function ho({ onTranscript: e, lang: t, label: n = "Dictate", stopLabel: r = "Stop dictating", unsupportedLabel: i = "Dictation isn't available in this browser", size: a = "md", className: o }) {
	let [s, c] = M(!1), l = j(null), u = j(e);
	u.current = e;
	let d = mo();
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
		className: G("iro-speech-input", o),
		onClick: () => s ? l.current?.stop() : f()
	});
}
// src/components/splitter/share.ts
function go(e, t, { min: n, max: r, minStart: i, minEnd: a }) {
	let o = t > 0 ? Math.max(n, i / t) : n, s = t > 0 ? Math.min(r, 1 - a / t) : r;
	return Math.min(Math.max(e, o), Math.max(o, s));
}
// src/components/splitter/Splitter.tsx
var _o = .02, vo = .05;
function yo({ container: e, share: t, onShareChange: n, onCommit: r, onReset: i, min: a = .2, max: o = .8, minStart: s = 0, minEnd: c = 0, label: l = "Resize panes", className: u }) {
	let d = j(null), f = j(t);
	f.current = t;
	let p = (t) => {
		let r = e.current?.getBoundingClientRect().width ?? 0;
		f.current = go(t, r, {
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
			let n = e.shiftKey ? vo : _o;
			p(t + (e.key === "ArrowLeft" ? -n : n));
		},
		onKeyUp: (e) => {
			_(e) && r?.(f.current);
		},
		onDoubleClick: i,
		className: G("iro-splitter", u),
		children: /* @__PURE__ */ P("span", { className: "iro-splitter-line" })
	});
}
// src/components/stack-trace/stack.ts
var bo = /^\s*at (?:(.+?) \()?(.+?)(?::(\d+))?(?::(\d+))?\)?$/, xo = /^(.*?)@(.+?)(?::(\d+))?(?::(\d+))?$/, So = /node_modules|^node:|^internal\/|^<anonymous>$|^native$/;
function Co(e) {
	let t = e.split(/\r?\n/), n = [], r = [];
	for (let e of t) {
		let t = e.match(bo) ?? (e.includes("@") ? e.match(xo) : null);
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
			internal: So.test(a)
		});
	}
	return {
		message: r.join(" "),
		frames: n
	};
}
// src/components/stack-trace/StackTrace.tsx
var wo = ({ file: e, line: t, column: n }) => [
	e,
	t,
	n
].filter((e) => e !== void 0).join(":");
function To({ stack: e, onOpenFrame: t, defaultShowInternal: n = !1, className: r }) {
	let [i, a] = M(n), { message: o, frames: s } = Co(e), c = s.filter((e) => e.internal).length, l = i ? s : s.filter((e) => !e.internal);
	return /* @__PURE__ */ F("figure", {
		className: G("iro-stack-trace", r),
		children: [
			/* @__PURE__ */ F("figcaption", {
				className: "iro-stack-trace-head",
				children: [
					/* @__PURE__ */ P(ot, {}),
					/* @__PURE__ */ P("span", {
						className: "iro-stack-trace-message",
						children: o || "Error"
					}),
					/* @__PURE__ */ P(Er, {
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
						children: wo(e)
					}) : /* @__PURE__ */ P("span", {
						className: "iro-stack-trace-place",
						children: wo(e)
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
var Eo = [
	1,
	2,
	3,
	4,
	5
];
function Do({ value: e, onValueChange: t, readOnly: n, size: r = "md", label: i = "Rating", className: a }) {
	let [o, s] = M(null), c = (e) => t?.(Math.max(0, Math.min(5, e))), l = o ?? e;
	return n ? /* @__PURE__ */ P("span", {
		role: "img",
		"aria-label": `${e} of 5 stars`,
		"data-size": r,
		className: G("iro-stars", a),
		children: Eo.map((t) => /* @__PURE__ */ P("span", {
			className: "iro-star",
			"data-on": t <= e || void 0,
			children: /* @__PURE__ */ P(Et, {})
		}, t))
	}) : /* @__PURE__ */ P(He, {
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
		className: G("iro-stars", a),
		children: Eo.map((t) => /* @__PURE__ */ P(Ve.Root, {
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
function Oo({ label: e, value: t, change: n, icon: r, hint: i, chart: a, variant: o = "card", className: s, ...c }) {
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
	return P(o === "card" ? Da : "div", {
		"data-variant": o,
		className: G("iro-stat", s),
		...c,
		children: l
	});
}
// src/components/status-dot/StatusDot.tsx
function ko({ tone: e = "neutral", pulse: t, label: n, className: r, ...i }) {
	return /* @__PURE__ */ F("span", {
		...n ? {
			role: "img",
			"aria-label": n
		} : { "aria-hidden": !0 },
		"data-tone": e,
		"data-pulse": t,
		className: G("iro-status-dot", r),
		...i,
		children: [t ? /* @__PURE__ */ F(N, { children: [/* @__PURE__ */ P("span", { className: "iro-status-dot-ring" }), /* @__PURE__ */ P("span", {
			className: "iro-status-dot-ring",
			"data-late": ""
		})] }) : null, /* @__PURE__ */ P("span", { className: "iro-status-dot-core" })]
	});
}
// src/components/stepper/Stepper.tsx
function Ao({ steps: e, current: t, orientation: n = "horizontal", onStepClick: r, className: i, ...a }) {
	return /* @__PURE__ */ P("ol", {
		"data-orientation": n,
		className: G("iro-stepper", i),
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
function jo({ suggestions: e, onPick: t, className: n, "aria-label": r = "Suggestions" }) {
	let i = e.map((e) => typeof e == "string" ? { text: e } : e);
	return /* @__PURE__ */ P("ul", {
		"aria-label": r,
		className: G("iro-suggestions", n),
		children: i.map(({ text: e, icon: n }) => /* @__PURE__ */ P("li", { children: /* @__PURE__ */ F("button", {
			type: "button",
			className: "iro-suggestion",
			onClick: () => t(e),
			children: [n, e]
		}) }, e))
	});
}
// src/components/tabs/Tabs.tsx
function Mo(e) {
	return {
		"data-checkable": e.checked !== void 0 || void 0,
		"data-menu": e.menu?.length ? !0 : void 0
	};
}
function No({ tab: e, active: t }) {
	let n = Mo(e), r = /* @__PURE__ */ F("span", {
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
				children: /* @__PURE__ */ P(br, {
					checked: !!e.checked,
					onCheckedChange: (t) => e.onCheckedChange?.(t),
					"aria-label": e.checkLabel ?? (typeof e.label == "string" ? `Use ${e.label}` : "Use")
				})
			}) : null,
			r,
			e.menu?.length ? /* @__PURE__ */ P(Zn, {
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
function Po({ tabs: e, value: t, onValueChange: n, variant: r = "line", className: i, "aria-label": a }) {
	let o = e.some((e) => e.checked !== void 0 || e.menu?.length);
	return /* @__PURE__ */ F(We.Root, {
		value: t,
		onValueChange: (e) => n(e),
		"data-variant": r,
		className: G("iro-tabs", i),
		children: [/* @__PURE__ */ F("div", {
			className: "iro-tabs-bar",
			children: [/* @__PURE__ */ F(We.List, {
				className: "iro-tabs-list",
				"aria-label": a,
				children: [e.map((e) => /* @__PURE__ */ F(We.Tab, {
					value: e.value,
					disabled: e.disabled,
					className: "iro-tab",
					...Mo(e),
					children: [
						e.icon,
						e.label,
						e.badge
					]
				}, e.value)), r === "folder" ? null : /* @__PURE__ */ P(We.Indicator, { className: "iro-tabs-indicator" })]
			}), o ? /* @__PURE__ */ P("div", {
				className: "iro-tabs-list iro-tabs-extras",
				children: e.map((e) => /* @__PURE__ */ P(No, {
					tab: e,
					active: e.value === t
				}, e.value))
			}) : null]
		}), e.map((e) => e.content === void 0 ? null : /* @__PURE__ */ P(We.Panel, {
			value: e.value,
			className: "iro-tabs-panel",
			children: e.content
		}, e.value))]
	});
}
// src/components/tag-input/tags.ts
function Fo(e, t, n = Infinity) {
	let r = [...e];
	for (let e of t.split(",")) {
		let t = e.trim();
		if (r.length >= n) break;
		t && !r.some((e) => e.toLowerCase() === t.toLowerCase()) && r.push(t);
	}
	return r;
}
// src/components/tag-input/TagInput.tsx
function Io({ value: e, onValueChange: t, placeholder: n, max: r, size: i = "md", disabled: a, invalid: o, id: s, className: c, "aria-label": l, removeLabel: u = (e) => `Remove ${e}` }) {
	let [d, f] = M(""), p = j(null), m = (n) => {
		let i = Fo(e, n, r);
		i.length !== e.length && t(i), f("");
	};
	return /* @__PURE__ */ F("div", {
		className: G("iro-text-field", "iro-tag-input", c),
		"data-size": i,
		"data-invalid": o || void 0,
		"data-disabled": a || void 0,
		onClick: () => p.current?.focus(),
		children: [e.map((n) => /* @__PURE__ */ P(xr, {
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
var Lo = 24, Ro = (e) => typeof e == "string" ? e : e.text;
function zo({ lines: e, title: t = "Terminal", maxHeight: n = 320, running: r = !1, className: i }) {
	let a = j(null), o = j(!0);
	return A(() => {
		let e = a.current;
		e && o.current && (e.scrollTop = e.scrollHeight);
	}, [e.length]), /* @__PURE__ */ F("figure", {
		className: G("iro-terminal", i),
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
				/* @__PURE__ */ P(Er, {
					text: e.map(Ro).join("\n"),
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
				o.current = t.scrollHeight - t.scrollTop - t.clientHeight <= Lo;
			},
			children: e.map((e, t) => /* @__PURE__ */ P("span", {
				"data-kind": typeof e == "string" ? void 0 : e.kind,
				className: "iro-terminal-line",
				children: Ro(e) || "​"
			}, t))
		})]
	});
}
// src/components/test-results/TestResults.tsx
var Bo = {
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
}, Vo = [
	"passed",
	"failed",
	"skipped"
], Ho = (e) => e < 1e3 ? `${Math.round(e)} ms` : `${(e / 1e3).toFixed(1)} s`;
function Uo({ suites: e, title: t, className: n }) {
	let r = e.flatMap((e) => e.tests), i = Object.fromEntries(Vo.map((e) => [e, r.filter((t) => t.status === e).length])), a = r.reduce((e, t) => e + (t.duration ?? 0), 0);
	return /* @__PURE__ */ F("section", {
		className: G("iro-test-results", n),
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
						children: Vo.map((e) => i[e] > 0 ? /* @__PURE__ */ F("span", {
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
						children: Ho(a)
					}) : null
				]
			}),
			/* @__PURE__ */ P("div", {
				className: "iro-test-results-bar",
				"aria-hidden": "true",
				children: Vo.map((e) => i[e] > 0 ? /* @__PURE__ */ P("span", {
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
											"aria-label": Bo[e.status].label,
											children: Bo[e.status].icon
										}),
										/* @__PURE__ */ P("span", {
											className: "iro-test-case-name",
											children: e.name
										}),
										e.duration === void 0 ? null : /* @__PURE__ */ P("span", {
											className: "iro-test-case-time",
											children: Ho(e.duration)
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
function Wo({ value: e, onValueChange: t, seconds: n = !1, className: r, ...i }) {
	return /* @__PURE__ */ P(Nr, {
		type: "time",
		value: e,
		step: n ? 1 : 60,
		onChange: (e) => t(e.currentTarget.value),
		className: G("iro-time-field", r),
		...i
	});
}
// src/components/timeline/Timeline.tsx
function Go({ items: e, className: t, ...n }) {
	return /* @__PURE__ */ P("ol", {
		className: G("iro-timeline", t),
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
var Ko = {
	info: /* @__PURE__ */ P(rt, {}),
	success: /* @__PURE__ */ P(it, {}),
	warning: /* @__PURE__ */ P(at, {}),
	error: /* @__PURE__ */ P(ot, {})
}, qo = W.createToastManager();
function Jo({ closeLabel: e }) {
	let { toasts: t } = W.useToastManager();
	return t.map((t) => {
		let n = t.type ?? "info";
		return /* @__PURE__ */ P(W.Root, {
			toast: t,
			className: "iro-toast",
			"data-tone": n,
			children: /* @__PURE__ */ F(W.Content, {
				className: "iro-toast-content",
				children: [
					/* @__PURE__ */ P("span", {
						className: "iro-toast-icon",
						children: Ko[n] ?? Ko.info
					}),
					/* @__PURE__ */ F("div", {
						className: "iro-toast-text",
						children: [/* @__PURE__ */ P(W.Title, { className: "iro-toast-title" }), /* @__PURE__ */ P(W.Description, { className: "iro-toast-description" })]
					}),
					t.actionProps ? /* @__PURE__ */ P(W.Action, { render: /* @__PURE__ */ P(X, { size: "sm" }) }) : null,
					/* @__PURE__ */ P(W.Close, {
						className: "iro-toast-close",
						"aria-label": e,
						children: /* @__PURE__ */ P(nt, {})
					})
				]
			})
		}, t.id);
	});
}
function Yo({ title: e, description: t, tone: n = "info", action: r, timeout: i }) {
	return qo.add({
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
function Xo(e) {
	qo.close(e);
}
function Zo({ closeLabel: e = "Dismiss" }) {
	let t = Y();
	return /* @__PURE__ */ P(W.Provider, {
		toastManager: qo,
		children: /* @__PURE__ */ P(W.Portal, {
			container: t,
			children: /* @__PURE__ */ P(W.Viewport, {
				className: "iro-toaster",
				children: /* @__PURE__ */ P(Jo, { closeLabel: e })
			})
		})
	});
}
// src/components/tool-call/ToolCall.tsx
var Qo = {
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
function $o({ name: e, summary: t, status: n, input: r, output: i, icon: a, defaultOpen: o = !1, inputLabel: s = "Input", outputLabel: c = "Output", className: l }) {
	let u = Qo[n];
	return /* @__PURE__ */ F(R.Root, {
		defaultOpen: o,
		"data-status": n,
		className: G("iro-tool-call", l),
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
function es({ orientation: e = "horizontal", className: t, ...n }) {
	return /* @__PURE__ */ P(Ge.Root, {
		orientation: e,
		className: G("iro-toolbar", t),
		...n
	});
}
function ts({ icon: e, label: t, children: n, active: r, shortcut: i, disabled: a, onClick: o }) {
	return /* @__PURE__ */ P(Ge.Button, {
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
function ns() {
	return /* @__PURE__ */ P(Ge.Separator, { className: "iro-toolbar-separator" });
}
// src/components/tour/Tour.tsx
var rs = 320, is = 6, as = 12, os = 8;
function ss(e) {
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
function cs(e, t, n) {
	let r = window.innerWidth, i = window.innerHeight, a = Math.min(rs, r - 16);
	if (!e) return {
		left: r / 2 - a / 2,
		top: i / 2 - n / 2,
		width: a
	};
	let o = e.x, s = e.y + e.height + is + as;
	return t === "top" && (s = e.y - is - as - n), (t === "right" || t === "left") && (o = t === "right" ? e.x + e.width + is + as : e.x - is - as - a, s = e.y), s + n > i - os && t !== "top" && (s = e.y - is - as - n), {
		left: Math.min(Math.max(os, o), r - a - os),
		top: Math.min(Math.max(os, s), i - n - os),
		width: a
	};
}
function ls({ steps: e, open: t, onClose: n, className: r }) {
	let i = Y(), [a, o] = M(0), [s, c] = M(null), [l, u] = M(170), d = j(null), f = j(null), p = e[a];
	A(() => {
		t && o(0);
	}, [t]);
	let m = ve(() => {
		p && c(ss(p.target)), d.current && u(d.current.offsetHeight);
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
	}, v = cs(s, p?.placement, l);
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
					left: s.x - is,
					top: s.y - is,
					width: s.width + 12,
					height: s.height + 12
				} : void 0
			}), p ? /* @__PURE__ */ F(z.Popup, {
				ref: d,
				initialFocus: f,
				className: G("iro-tour", r),
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
function us(e, t) {
	if (t === void 0) return -1;
	let n = -1;
	e.forEach((e, r) => {
		e.start <= t && (n = r);
	});
	let r = e[n];
	return r && (r.end === void 0 || t < r.end) ? n : -1;
}
function ds({ segments: e, currentTime: t, onSeek: n, label: r = "Transcript", className: i }) {
	let a = us(e, t);
	return /* @__PURE__ */ P("ol", {
		"aria-label": r,
		className: G("iro-transcription", i),
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
function fs(e) {
	return `${e > 0 ? "+" : e < 0 ? "−" : ""}${Math.abs(e)}%`;
}
function ps({ value: e, good: t = "up", format: n = fs, context: r, variant: i = "badge", className: a, ...o }) {
	let s = e > 0 ? "up" : e < 0 ? "down" : "flat", c = t === "none" || s === "flat" ? "neutral" : s === t ? "success" : "danger", l = s === "up" ? lt : s === "down" ? ut : Ye;
	return /* @__PURE__ */ F("span", {
		"data-tone": c,
		"data-variant": i,
		className: G("iro-trend", a),
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
var ms = new Intl.NumberFormat(void 0, {
	notation: "compact",
	maximumFractionDigits: 1
});
function hs({ used: e, total: t, label: n = "Context", unit: r = "", parts: i, format: a = (e) => ms.format(e), className: o }) {
	let s = t > 0 ? Math.min(e / t, 1) : 0, c = `${Math.round(s * 100)}%`, l = `${a(e)} of ${a(t)}${r ? ` ${r}` : ""}`;
	return /* @__PURE__ */ P(Mr, {
		title: n,
		side: "top",
		align: "end",
		className: "iro-usage-meter-popup",
		trigger: /* @__PURE__ */ F("button", {
			type: "button",
			"aria-label": `${n}: ${c} used`,
			"data-level": s >= .9 ? "high" : void 0,
			className: G("iro-usage-meter", o),
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
				/* @__PURE__ */ P(Oa, {
					value: s,
					size: "sm",
					tone: s >= .9 ? "danger" : "accent",
					label: `${n} used`
				}),
				i && i.length > 0 ? /* @__PURE__ */ P(ao, {
					label: `${n} by part`,
					parts: i,
					format: a
				}) : null
			]
		})
	});
}
// src/components/veil/Veil.tsx
function gs({ active: e, children: t, label: n = "NSFW", compact: r, onReveal: i, className: a }) {
	let [o, s] = M(!1), [c, l] = M(e);
	c !== e && (l(e), s(!1));
	let u = e && !o;
	return /* @__PURE__ */ F("div", {
		"data-veiled": u || void 0,
		className: G("iro-veil", a),
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
var _s = "allow-scripts allow-forms allow-popups";
function vs({ src: e, html: t, title: n, onNavigate: r, height: i = 360, sandbox: a = _s, className: o }) {
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
		className: G("iro-web-preview", o),
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
function ys(e) {
	return Array.from(e.dataTransfer?.types ?? []).includes("Files");
}
function bs({ onFiles: e, open: t, title: n = "Drop to add", hint: r, icon: i = /* @__PURE__ */ P(st, {}), disabled: a }) {
	let o = Y(), [s, c] = M(!1), l = j(0), u = j(e);
	if (u.current = e, A(() => {
		if (a || !u.current) return;
		let e = (e) => {
			ys(e) && (l.current += 1, c(!0));
		}, t = (e) => {
			ys(e) && (l.current = Math.max(0, l.current - 1), l.current === 0 && c(!1));
		}, n = (e) => {
			ys(e) && e.preventDefault();
		}, r = (e) => {
			if (!ys(e)) return;
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
	return o ? Ke(d, o) : d;
}
export { Dt as Accordion, Mt as AlertDialog, Lt as AppSidebar, Ut as Attachment, Jt as AudioPlayer, Qt as Autocomplete, en as Avatar, tn as AvatarGroup, nn as Backdrop, rn as Badge, on as Banner, qn as BarChart, Jn as BranchPicker, er as Breadcrumbs, X as Button, tr as ButtonGroup, vr as Calendar, yr as Carousel, br as Checkbox, xr as Chip, wr as Citation, Or as CodeBlock, Ar as Collapsible, Ur as ColorPicker, Jr as CommandPalette, $r as Commit, ei as Confirmation, ti as ContextMenu, ii as Conversation, Er as CopyButton, ai as CountBubble, li as Counter, yi as DataTable, xi as DatePicker, Si as Dialog, Ci as Divider, Di as DonutChart, Oi as Drawer, Ai as DropZone, ji as EmptyState, Ii as EnvironmentVariables, Li as Field, Hi as FileTree, Cr as HoverCard, qe as Icon, Z as IconButton, Ui as Image, Wi as InlineInput, kt as IroRoot, Nt as Kbd, Gi as Lightbox, Yi as LineChart, Xi as ListItem, Zi as Marker, Zn as Menu, $i as Menubar, ea as Message, ra as Meter, ia as MultiSegmented, sa as MultiSelect, ca as NativeSelect, da as NavigationMenu, pa as Notice, ma as NumberField, ha as OtpField, va as PackageInfo, Ea as Pagination, Da as Panel, Aa as Plan, Mr as Popover, Oa as ProgressBar, Bt as ProgressRing, La as PromptInput, ga as PropertyList, Ra as Prose, Ua as Questionnaire, Wa as Queue, za as RadioGroup, Ka as RangeCalendar, Ya as Reasoning, Pa as ResizeGrip, Za as SchemaView, Qa as ScrollArea, no as ScrubField, ro as SectionTitle, io as Segmented, xa as Select, ao as ShareBar, oo as Sheet, qa as Shimmer, lo as SingleSelect, ui as Skeleton, Kt as Slider, _a as Snippet, uo as Sources, po as Sparkline, ho as SpeechInput, jt as Spinner, yo as Splitter, To as StackTrace, Do as StarRating, Oo as Stat, ko as StatusDot, Ao as Stepper, jo as Suggestions, kr as Switch, Po as Tabs, Io as TagInput, zo as Terminal, Uo as TestResults, Ia as TextArea, Nr as TextField, Wo as TimeField, Go as Timeline, Zo as Toaster, $o as ToolCall, es as Toolbar, ts as ToolbarButton, ns as ToolbarSeparator, Ft as Tooltip, ls as Tour, ds as Transcription, Ri as TreeRow, ps as Trend, hs as UsageMeter, gs as Veil, vs as WebPreview, bs as WindowDrop, Xo as dismissToast, pi as sortRows, Yo as toast, Y as useIroLayer };
