import { Fragment as e, jsx as t, jsxs as n } from "react/jsx-runtime";
import { Checkbox as r } from "@base-ui/react/checkbox";
import { Collapsible as i } from "@base-ui/react/collapsible";
import { Switch as a } from "@base-ui/react/switch";
import { ContextMenu as o } from "@base-ui/react/context-menu";
import { createContext as s, useContext as c, useEffect as l, useLayoutEffect as u, useRef as d, useState as f } from "react";
import { Menu as p } from "@base-ui/react/menu";
import { Dialog as m } from "@base-ui/react/dialog";
import { Tooltip as h } from "@base-ui/react/tooltip";
import { Field as g } from "@base-ui/react/field";
import { Select as _ } from "@base-ui/react/select";
import { NumberField as v } from "@base-ui/react/number-field";
import { Popover as y } from "@base-ui/react/popover";
import { Progress as b } from "@base-ui/react/progress";
import { Radio as x } from "@base-ui/react/radio";
import { RadioGroup as S } from "@base-ui/react/radio-group";
import { Combobox as C } from "@base-ui/react/combobox";
import { Slider as w } from "@base-ui/react/slider";
import { Tabs as T } from "@base-ui/react/tabs";
import { Input as E } from "@base-ui/react/input";
import { Toast as D } from "@base-ui/react/toast";
// src/components/shared/cx.ts
function O(...e) {
	return e.filter(Boolean).join(" ");
}
// src/components/badge/Badge.tsx
function k({ tone: e = "neutral", icon: t, className: r, children: i, ...a }) {
	return /* @__PURE__ */ n("span", {
		className: O("iro-badge", r),
		"data-tone": e,
		...a,
		children: [t, i]
	});
}
// src/components/spinner/Spinner.tsx
var A = /* @__PURE__ */ n("svg", {
	viewBox: "0 0 24 24",
	fill: "none",
	"aria-hidden": "true",
	children: [/* @__PURE__ */ t("circle", {
		cx: "12",
		cy: "12",
		r: "9",
		stroke: "currentColor",
		strokeOpacity: "0.25",
		strokeWidth: "2.5"
	}), /* @__PURE__ */ t("path", {
		d: "M21 12a9 9 0 0 0-9-9",
		stroke: "currentColor",
		strokeWidth: "2.5",
		strokeLinecap: "round"
	})]
});
function j({ label: e, className: n, ...r }) {
	return e ? /* @__PURE__ */ t("span", {
		className: O("iro-spinner", n),
		role: "status",
		"aria-label": e,
		...r,
		children: A
	}) : /* @__PURE__ */ t("span", {
		className: O("iro-spinner", n),
		"aria-hidden": "true",
		...r,
		children: A
	});
}
// src/components/button/Button.tsx
function M({ variant: e = "secondary", size: r = "md", icon: i, iconEnd: a, loading: o = !1, pressed: s, disabled: c, type: l = "button", className: u, children: d, ...f }) {
	return /* @__PURE__ */ n("button", {
		type: l,
		disabled: c || o,
		"aria-pressed": s,
		"aria-busy": o || void 0,
		"data-variant": e,
		"data-size": r,
		className: O("iro-button", u),
		...f,
		children: [
			o ? /* @__PURE__ */ t(j, {}) : i,
			d,
			a
		]
	});
}
// src/components/shared/glyphs.tsx
function N({ children: e }) {
	return /* @__PURE__ */ t("svg", {
		className: "iro-glyph",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: e
	});
}
var P = () => /* @__PURE__ */ t(N, { children: /* @__PURE__ */ t("path", { d: "M5 12.5l4.5 4.5L19 7.5" }) }), F = () => /* @__PURE__ */ t(N, { children: /* @__PURE__ */ t("path", { d: "M6 12h12" }) }), ee = () => /* @__PURE__ */ t(N, { children: /* @__PURE__ */ t("path", { d: "M12 6v12M6 12h12" }) }), I = () => /* @__PURE__ */ t(N, { children: /* @__PURE__ */ t("path", { d: "M6 9.5l6 6 6-6" }) }), te = () => /* @__PURE__ */ n(N, { children: [/* @__PURE__ */ t("rect", {
	x: "8",
	y: "8",
	width: "12",
	height: "12",
	rx: "2"
}), /* @__PURE__ */ t("path", { d: "M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" })] }), L = () => /* @__PURE__ */ t(N, { children: /* @__PURE__ */ t("path", { d: "M7 7l10 10M17 7L7 17" }) }), R = () => /* @__PURE__ */ n(N, { children: [/* @__PURE__ */ t("circle", {
	cx: "12",
	cy: "12",
	r: "9"
}), /* @__PURE__ */ t("path", { d: "M12 11v5M12 8h.01" })] }), z = () => /* @__PURE__ */ n(N, { children: [/* @__PURE__ */ t("circle", {
	cx: "12",
	cy: "12",
	r: "9"
}), /* @__PURE__ */ t("path", { d: "M8 12.5l2.5 2.5L16 9.5" })] }), B = () => /* @__PURE__ */ n(N, { children: [/* @__PURE__ */ t("path", { d: "M12 4l9 16H3z" }), /* @__PURE__ */ t("path", { d: "M12 10v4M12 17h.01" })] }), V = () => /* @__PURE__ */ n(N, { children: [/* @__PURE__ */ t("circle", {
	cx: "12",
	cy: "12",
	r: "9"
}), /* @__PURE__ */ t("path", { d: "M12 7.5v5.5M12 16.5h.01" })] });
// src/components/checkbox/Checkbox.tsx
function ne({ checked: e, defaultChecked: i, onCheckedChange: a, indeterminate: o, label: s, description: c, disabled: l, name: u, id: d, className: f, "aria-label": p }) {
	let m = /* @__PURE__ */ t(r.Root, {
		checked: e,
		defaultChecked: i,
		onCheckedChange: a ? (e) => a(e) : void 0,
		indeterminate: o,
		disabled: l,
		name: u,
		id: d,
		"aria-label": p,
		className: O("iro-checkbox", !s && f),
		children: /* @__PURE__ */ t(r.Indicator, {
			className: "iro-checkbox-indicator",
			children: t(o ? F : P, {})
		})
	});
	return s ? /* @__PURE__ */ n("label", {
		className: O("iro-checkbox-label", f),
		"data-disabled": l || void 0,
		children: [m, /* @__PURE__ */ n("span", {
			className: "iro-checkbox-text",
			children: [/* @__PURE__ */ t("span", { children: s }), c ? /* @__PURE__ */ t("span", {
				className: "iro-checkbox-description",
				children: c
			}) : null]
		})]
	}) : m;
}
// src/components/chip/Chip.tsx
function re({ icon: r, count: i, selected: a, onClick: o, onRemove: s, removeLabel: c = "Remove", size: l = "md", className: u, children: d, ...f }) {
	let p = /* @__PURE__ */ n(e, { children: [
		r,
		d,
		i == null ? null : /* @__PURE__ */ t("span", {
			className: "iro-chip-count",
			children: i
		})
	] });
	return /* @__PURE__ */ n("span", {
		className: O("iro-chip", u),
		"data-size": l,
		"data-selected": a || void 0,
		...f,
		children: [o ? /* @__PURE__ */ t("button", {
			type: "button",
			className: "iro-chip-main",
			"aria-pressed": a,
			onClick: o,
			children: p
		}) : /* @__PURE__ */ t("span", {
			className: "iro-chip-main",
			children: p
		}), s ? /* @__PURE__ */ t("button", {
			type: "button",
			className: "iro-chip-remove",
			"aria-label": c,
			onClick: s,
			children: /* @__PURE__ */ t(L, {})
		}) : null]
	});
}
// src/components/switch/Switch.tsx
function H({ checked: e, defaultChecked: r, onCheckedChange: i, label: o, size: s = "md", disabled: c, name: l, id: u, className: d, "aria-label": f }) {
	let p = /* @__PURE__ */ t(a.Root, {
		checked: e,
		defaultChecked: r,
		onCheckedChange: i ? (e) => i(e) : void 0,
		disabled: c,
		name: l,
		id: u,
		"aria-label": f,
		"data-size": s,
		className: O("iro-switch", !o && d),
		children: /* @__PURE__ */ t(a.Thumb, { className: "iro-switch-thumb" })
	});
	return o ? /* @__PURE__ */ n("label", {
		className: O("iro-switch-label", d),
		"data-disabled": c || void 0,
		children: [p, /* @__PURE__ */ t("span", { children: o })]
	}) : p;
}
// src/components/collapsible/Collapsible.tsx
function ie({ title: e, summary: r, children: a, open: o, defaultOpen: s, onOpenChange: c, enabled: l, onEnabledChange: u, enabledLabel: d = "Enabled", tone: f = "surface", className: p }) {
	return /* @__PURE__ */ n(i.Root, {
		open: o,
		defaultOpen: s,
		onOpenChange: c ? (e) => c(e) : void 0,
		"data-tone": f,
		"data-off": l === !1 || void 0,
		className: O("iro-collapsible", p),
		children: [/* @__PURE__ */ n("div", {
			className: "iro-collapsible-header",
			children: [/* @__PURE__ */ n(i.Trigger, {
				className: "iro-collapsible-trigger",
				children: [
					/* @__PURE__ */ t(I, {}),
					/* @__PURE__ */ t("span", {
						className: "iro-collapsible-title",
						children: e
					}),
					r ? /* @__PURE__ */ t("span", {
						className: "iro-collapsible-summary",
						children: r
					}) : null
				]
			}), l === void 0 ? null : /* @__PURE__ */ t(H, {
				size: "sm",
				checked: l,
				onCheckedChange: u,
				"aria-label": d
			})]
		}), /* @__PURE__ */ t(i.Panel, {
			className: "iro-collapsible-panel",
			children: /* @__PURE__ */ t("div", {
				className: "iro-collapsible-body",
				children: a
			})
		})]
	});
}
// src/root/IroRoot.tsx
var U = s(null);
function W() {
	return c(U);
}
function ae({ styleName: e, theme: r, accent: i, className: a, children: o, ...s }) {
	let [c, l] = f(null);
	return /* @__PURE__ */ n("div", {
		"data-iro-style": e,
		"data-iro-theme": r,
		"data-iro-accent": i,
		className: ["iro-root", a].filter(Boolean).join(" "),
		...s,
		children: [/* @__PURE__ */ t(U, {
			value: c,
			children: o
		}), /* @__PURE__ */ t("div", {
			ref: l,
			className: "iro-root-layer"
		})]
	});
}
// src/components/menu/MenuEntries.tsx
function G({ items: e }) {
	let r = e.some((e) => e !== "separator" && e.icon), i = "";
	return e.map((e) => e === "separator" ? /* @__PURE__ */ t(p.Separator, { className: "iro-popup-separator" }, `separator-after-${i}`) : (i = e.label, /* @__PURE__ */ n(p.Item, {
		label: e.label,
		onClick: e.onSelect,
		disabled: e.disabled,
		"data-danger": e.danger || void 0,
		className: "iro-option",
		children: [
			r ? /* @__PURE__ */ t("span", {
				className: "iro-option-slot",
				children: e.icon
			}) : null,
			/* @__PURE__ */ t("span", {
				className: "iro-option-label",
				children: e.label
			}),
			e.shortcut ? /* @__PURE__ */ t("span", {
				className: "iro-option-end",
				children: e.shortcut
			}) : null
		]
	}, e.label)));
}
// src/components/context-menu/ContextMenu.tsx
function oe({ items: e, children: r, className: i }) {
	let a = W();
	return /* @__PURE__ */ n(o.Root, { children: [/* @__PURE__ */ t(o.Trigger, { render: r }), /* @__PURE__ */ t(o.Portal, {
		container: a,
		children: /* @__PURE__ */ t(o.Positioner, {
			className: "iro-positioner",
			children: /* @__PURE__ */ t(o.Popup, {
				className: O("iro-popup", "iro-popup-list", i),
				children: /* @__PURE__ */ t(G, { items: e })
			})
		})
	})] });
}
// src/components/kbd/Kbd.tsx
function K({ className: e, ...n }) {
	return /* @__PURE__ */ t("kbd", {
		className: O("iro-kbd", e),
		...n
	});
}
// src/components/tooltip/Tooltip.tsx
var se = 6;
function q({ content: e, children: r, side: i = "top", delay: a = 500, disabled: o, className: s }) {
	let c = W();
	return /* @__PURE__ */ n(h.Root, {
		disabled: o,
		children: [/* @__PURE__ */ t(h.Trigger, {
			delay: a,
			render: r
		}), /* @__PURE__ */ t(h.Portal, {
			container: c,
			children: /* @__PURE__ */ t(h.Positioner, {
				side: i,
				sideOffset: se,
				className: "iro-positioner",
				children: /* @__PURE__ */ t(h.Popup, {
					className: O("iro-popup", "iro-tooltip", s),
					children: e
				})
			})
		})]
	});
}
// src/components/icon-button/IconButton.tsx
function J({ icon: r, label: i, shortcut: a, tooltip: o = !0, variant: s = "ghost", size: c = "md", active: l, loading: u = !1, disabled: d, type: f = "button", className: p, ...m }) {
	let h = /* @__PURE__ */ t("button", {
		type: f,
		"aria-label": i,
		"aria-pressed": l,
		"aria-busy": u || void 0,
		disabled: d || u,
		"data-variant": s,
		"data-size": c,
		className: O("iro-icon-button", p),
		...m,
		children: u ? /* @__PURE__ */ t(j, {}) : r
	});
	return o ? /* @__PURE__ */ t(q, {
		content: /* @__PURE__ */ n(e, { children: [i, a ? /* @__PURE__ */ t(K, { children: a }) : null] }),
		children: h
	}) : h;
}
// src/components/dialog/Dialog.tsx
function ce({ title: e, description: r, children: i, footer: a, trigger: o, open: s, onOpenChange: c, size: l = "md", closeLabel: u = "Close", className: d }) {
	let f = W();
	return /* @__PURE__ */ n(m.Root, {
		open: s,
		onOpenChange: c ? (e) => c(e) : void 0,
		children: [o ? /* @__PURE__ */ t(m.Trigger, { render: o }) : null, /* @__PURE__ */ n(m.Portal, {
			container: f,
			children: [/* @__PURE__ */ t(m.Backdrop, { className: "iro-backdrop" }), /* @__PURE__ */ n(m.Popup, {
				className: O("iro-dialog", d),
				"data-size": l,
				children: [
					/* @__PURE__ */ n("header", {
						className: "iro-dialog-header",
						children: [/* @__PURE__ */ t(m.Title, {
							className: "iro-dialog-title",
							children: e
						}), /* @__PURE__ */ t(m.Close, { render: /* @__PURE__ */ t(J, {
							icon: /* @__PURE__ */ t(L, {}),
							label: u,
							size: "sm",
							tooltip: !1
						}) })]
					}),
					r ? /* @__PURE__ */ t(m.Description, {
						className: "iro-dialog-description",
						children: r
					}) : null,
					i ? /* @__PURE__ */ t("div", {
						className: "iro-dialog-body",
						children: i
					}) : null,
					a ? /* @__PURE__ */ t("footer", {
						className: "iro-dialog-footer",
						children: a
					}) : null
				]
			})]
		})]
	});
}
// src/components/empty-state/EmptyState.tsx
function le({ title: e, icon: r, action: i, tone: a = "neutral", className: o, children: s, ...c }) {
	return /* @__PURE__ */ n("div", {
		className: O("iro-empty", o),
		"data-tone": a,
		...c,
		children: [
			r ? /* @__PURE__ */ t("span", {
				className: "iro-empty-icon",
				children: r
			}) : null,
			/* @__PURE__ */ t("strong", {
				className: "iro-empty-title",
				children: e
			}),
			s ? /* @__PURE__ */ t("p", {
				className: "iro-empty-text",
				children: s
			}) : null,
			i ? /* @__PURE__ */ t("div", {
				className: "iro-empty-action",
				children: i
			}) : null
		]
	});
}
// src/components/field/Field.tsx
function ue({ label: e, hint: r, error: i, layout: a = "top", disabled: o, className: s, children: c, ...l }) {
	return /* @__PURE__ */ n(g.Root, {
		disabled: o,
		invalid: i ? !0 : void 0,
		"data-layout": a,
		className: O("iro-field", s),
		...l,
		children: [/* @__PURE__ */ t(g.Label, {
			className: "iro-field-label",
			children: e
		}), /* @__PURE__ */ n("div", {
			className: "iro-field-body",
			children: [c, i ? /* @__PURE__ */ n(g.Error, {
				match: !0,
				className: "iro-field-error",
				children: [/* @__PURE__ */ t(V, {}), i]
			}) : r ? /* @__PURE__ */ t(g.Description, {
				className: "iro-field-hint",
				children: r
			}) : null]
		})]
	});
}
// src/components/menu/Menu.tsx
var de = 4;
function fe({ trigger: e, items: r, side: i = "bottom", align: a = "start", className: o }) {
	let s = W();
	return /* @__PURE__ */ n(p.Root, { children: [/* @__PURE__ */ t(p.Trigger, { render: e }), /* @__PURE__ */ t(p.Portal, {
		container: s,
		children: /* @__PURE__ */ t(p.Positioner, {
			side: i,
			align: a,
			sideOffset: de,
			className: "iro-positioner",
			children: /* @__PURE__ */ t(p.Popup, {
				className: O("iro-popup", "iro-popup-list", o),
				children: /* @__PURE__ */ t(G, { items: r })
			})
		})
	})] });
}
// src/components/select/options.ts
function Y(e) {
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
function pe(e, t) {
	let n = e.toLowerCase();
	return t.toLowerCase().split(/\s+/).filter(Boolean).every((e) => n.includes(e));
}
// src/components/multi-select/MultiSelect.tsx
var me = 4;
function X({ option: e }) {
	return /* @__PURE__ */ n(_.Item, {
		value: e.value,
		disabled: e.disabled,
		className: "iro-option",
		children: [/* @__PURE__ */ t("span", {
			className: "iro-option-slot",
			children: /* @__PURE__ */ t(_.ItemIndicator, {
				className: "iro-option-check",
				children: /* @__PURE__ */ t(P, {})
			})
		}), /* @__PURE__ */ t(_.ItemText, {
			className: "iro-option-label",
			children: e.label
		})]
	});
}
function he({ options: e, value: r, onValueChange: i, placeholder: a = "None", size: o = "md", disabled: s, id: c, className: l, "aria-label": u }) {
	let d = W(), f = Y(e), p = (t) => e.find((e) => e.value === t)?.label ?? t;
	return /* @__PURE__ */ n(_.Root, {
		multiple: !0,
		value: r,
		onValueChange: (e) => i(e),
		disabled: s,
		children: [/* @__PURE__ */ n(_.Trigger, {
			id: c,
			"aria-label": u,
			"data-size": o,
			className: O("iro-select", l),
			children: [/* @__PURE__ */ t(_.Value, {
				className: "iro-select-value",
				children: (e) => e.length ? e.map(p).join(", ") : /* @__PURE__ */ t("span", {
					className: "iro-select-placeholder",
					children: a
				})
			}), /* @__PURE__ */ t(_.Icon, {
				className: "iro-select-icon",
				children: /* @__PURE__ */ t(I, {})
			})]
		}), /* @__PURE__ */ t(_.Portal, {
			container: d,
			children: /* @__PURE__ */ t(_.Positioner, {
				sideOffset: me,
				alignItemWithTrigger: !1,
				className: "iro-positioner",
				children: /* @__PURE__ */ t(_.Popup, {
					className: "iro-popup iro-popup-list",
					children: f ? f.map((e) => /* @__PURE__ */ n(_.Group, { children: [e.value ? /* @__PURE__ */ t(_.GroupLabel, {
						className: "iro-popup-label",
						children: e.value
					}) : null, e.items.map((e) => /* @__PURE__ */ t(X, { option: e }, e.value))] }, e.value)) : e.map((e) => /* @__PURE__ */ t(X, { option: e }, e.value))
				})
			})
		})]
	});
}
// src/components/notice/Notice.tsx
var ge = {
	info: /* @__PURE__ */ t(R, {}),
	success: /* @__PURE__ */ t(z, {}),
	warning: /* @__PURE__ */ t(B, {}),
	danger: /* @__PURE__ */ t(V, {})
};
function _e({ tone: e = "info", title: r, icon: i, actions: a, className: o, children: s, ...c }) {
	return /* @__PURE__ */ n("div", {
		role: e === "danger" ? "alert" : "status",
		"data-tone": e,
		className: O("iro-notice", o),
		...c,
		children: [/* @__PURE__ */ t("span", {
			className: "iro-notice-icon",
			children: i ?? ge[e]
		}), /* @__PURE__ */ n("div", {
			className: "iro-notice-body",
			children: [
				r ? /* @__PURE__ */ t("strong", {
					className: "iro-notice-title",
					children: r
				}) : null,
				s ? /* @__PURE__ */ t("div", {
					className: "iro-notice-text",
					children: s
				}) : null,
				a ? /* @__PURE__ */ t("div", {
					className: "iro-notice-actions",
					children: a
				}) : null
			]
		})]
	});
}
// src/components/number-field/NumberField.tsx
function ve({ value: e, defaultValue: r, onValueChange: i, min: a, max: o, step: s, largeStep: c, format: l, size: u = "md", disabled: d, required: f, invalid: p, name: m, id: h, className: g, "aria-label": _, decrementLabel: y = "Decrease", incrementLabel: b = "Increase" }) {
	return /* @__PURE__ */ t(v.Root, {
		value: e,
		defaultValue: r,
		onValueChange: i ? (e) => i(e) : void 0,
		min: a,
		max: o,
		step: s,
		largeStep: c,
		format: l,
		disabled: d,
		required: f,
		name: m,
		id: h,
		allowWheelScrub: !0,
		"data-size": u,
		"data-invalid": p || void 0,
		className: O("iro-number-field", g),
		children: /* @__PURE__ */ n(v.Group, {
			className: "iro-number-field-group",
			children: [
				/* @__PURE__ */ t(v.Decrement, {
					className: "iro-number-field-step",
					"aria-label": y,
					children: /* @__PURE__ */ t(F, {})
				}),
				/* @__PURE__ */ t(v.Input, {
					className: "iro-number-field-input",
					"aria-label": _,
					"aria-invalid": p || void 0
				}),
				/* @__PURE__ */ t(v.Increment, {
					className: "iro-number-field-step",
					"aria-label": b,
					children: /* @__PURE__ */ t(ee, {})
				})
			]
		})
	});
}
// src/components/popover/Popover.tsx
var ye = 6;
function be({ trigger: e, title: r, children: i, side: a = "bottom", align: o = "center", open: s, onOpenChange: c, className: l }) {
	let u = W();
	return /* @__PURE__ */ n(y.Root, {
		open: s,
		onOpenChange: c ? (e) => c(e) : void 0,
		children: [/* @__PURE__ */ t(y.Trigger, { render: e }), /* @__PURE__ */ t(y.Portal, {
			container: u,
			children: /* @__PURE__ */ t(y.Positioner, {
				side: a,
				align: o,
				sideOffset: ye,
				className: "iro-positioner",
				children: /* @__PURE__ */ n(y.Popup, {
					className: O("iro-popup", "iro-popover", l),
					children: [r ? /* @__PURE__ */ t(y.Title, {
						className: "iro-popover-title",
						children: r
					}) : null, i]
				})
			})
		})]
	});
}
// src/components/progress-bar/ProgressBar.tsx
function xe({ value: e, tone: n = "accent", size: r = "md", label: i, className: a }) {
	let o = e === null ? null : Math.min(Math.max(e, 0), 1) * 100;
	return /* @__PURE__ */ t(b.Root, {
		value: o,
		"aria-label": i,
		"data-tone": n,
		"data-size": r,
		className: O("iro-progress", a),
		children: /* @__PURE__ */ t(b.Track, {
			className: "iro-progress-track",
			children: /* @__PURE__ */ t(b.Indicator, { className: "iro-progress-indicator" })
		})
	});
}
// src/components/property-list/PropertyList.tsx
var Se = 1200;
function Ce({ text: e, label: n }) {
	let [r, i] = f(!1);
	return l(() => {
		if (!r) return;
		let e = setTimeout(() => i(!1), Se);
		return () => clearTimeout(e);
	}, [r]), /* @__PURE__ */ t(J, {
		icon: t(r ? P : te, {}),
		label: n,
		size: "sm",
		onClick: () => {
			navigator.clipboard.writeText(e).then(() => i(!0), () => {});
		},
		className: "iro-property-copy"
	});
}
function we({ properties: e, copyLabel: r = "Copy", className: i, ...a }) {
	let o = e.filter(({ value: e }) => e != null && e !== "");
	return /* @__PURE__ */ t("dl", {
		className: O("iro-properties", i),
		...a,
		children: o.map((e) => /* @__PURE__ */ n("div", {
			className: "iro-property",
			children: [/* @__PURE__ */ t("dt", {
				className: "iro-property-label",
				children: e.label
			}), /* @__PURE__ */ n("dd", {
				className: "iro-property-value",
				"data-mono": e.mono || void 0,
				children: [/* @__PURE__ */ t("span", { children: e.value }), e.copy ? /* @__PURE__ */ t(Ce, {
					text: e.copy,
					label: `${r} ${e.label}`
				}) : null]
			})]
		}, e.label))
	});
}
// src/components/segmented/Segmented.tsx
function Te({ options: e, value: r, onValueChange: i, size: a = "md", full: o = !1, disabled: s, className: c, "aria-label": l }) {
	let p = d(null), [m, h] = f(null);
	return u(() => {
		let e = p.current;
		if (!e) return;
		let t = () => {
			let t = e.querySelector(".iro-segmented-option[data-checked]");
			h(t ? {
				x: t.offsetLeft,
				width: t.offsetWidth
			} : null);
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	}, [r]), /* @__PURE__ */ n(S, {
		ref: p,
		value: r,
		onValueChange: (e) => i(e),
		disabled: s,
		"aria-label": l,
		"data-size": a,
		"data-full": o || void 0,
		className: O("iro-segmented", c),
		children: [m ? /* @__PURE__ */ t("span", {
			className: "iro-segmented-thumb",
			style: {
				width: m.width,
				transform: `translateX(${m.x}px)`
			},
			"aria-hidden": "true"
		}) : null, e.map((e) => /* @__PURE__ */ n(x.Root, {
			value: e.value,
			disabled: e.disabled,
			className: "iro-segmented-option",
			children: [e.icon, e.label]
		}, e.value))]
	});
}
// src/components/select/Select.tsx
var Ee = 4;
function Z({ option: e }) {
	return /* @__PURE__ */ n(C.Item, {
		value: e,
		disabled: e.disabled,
		className: "iro-option",
		children: [/* @__PURE__ */ t("span", {
			className: "iro-option-slot",
			children: /* @__PURE__ */ t(C.ItemIndicator, {
				className: "iro-option-check",
				children: /* @__PURE__ */ t(P, {})
			})
		}), /* @__PURE__ */ t("span", {
			className: "iro-option-label",
			children: e.label
		})]
	});
}
function De({ options: e, value: r, onValueChange: i, placeholder: a, emptyText: o = "No matches", size: s = "md", disabled: c, invalid: l, id: u, className: d, "aria-label": f, openLabel: p = "Show options" }) {
	let m = W(), h = Y(e), g = e.find((e) => e.value === r) ?? null;
	return /* @__PURE__ */ n(C.Root, {
		items: h ?? e,
		value: g,
		onValueChange: (e) => i(e ? e.value : null),
		itemToStringLabel: (e) => e.label,
		isItemEqualToValue: (e, t) => e.value === t.value,
		filter: (e, t) => pe(e.label, t),
		autoHighlight: !0,
		disabled: c,
		children: [/* @__PURE__ */ n(C.InputGroup, {
			className: O("iro-select", d),
			"data-size": s,
			"data-invalid": l || void 0,
			children: [/* @__PURE__ */ t(C.Input, {
				className: "iro-select-input",
				placeholder: a,
				id: u,
				"aria-label": f,
				"aria-invalid": l || void 0
			}), /* @__PURE__ */ t(C.Trigger, {
				className: "iro-select-icon",
				"aria-label": p,
				children: /* @__PURE__ */ t(I, {})
			})]
		}), /* @__PURE__ */ t(C.Portal, {
			container: m,
			children: /* @__PURE__ */ t(C.Positioner, {
				sideOffset: Ee,
				className: "iro-positioner",
				children: /* @__PURE__ */ n(C.Popup, {
					className: "iro-popup",
					children: [/* @__PURE__ */ t(C.Empty, { children: /* @__PURE__ */ t("div", {
						className: "iro-popup-empty",
						children: o
					}) }), /* @__PURE__ */ t(C.List, {
						className: "iro-popup-list",
						children: h ? (e) => /* @__PURE__ */ n(C.Group, {
							items: e.items,
							children: [e.value ? /* @__PURE__ */ t(C.GroupLabel, {
								className: "iro-popup-label",
								children: e.value
							}) : null, /* @__PURE__ */ t(C.Collection, { children: (e) => /* @__PURE__ */ t(Z, { option: e }, e.value) })]
						}, e.value) : (e) => /* @__PURE__ */ t(Z, { option: e }, e.value)
					})]
				})
			})
		})]
	});
}
// src/components/sheet/Sheet.tsx
function Oe({ title: e, children: r, side: i = "right", trigger: a, open: o, onOpenChange: s, closeLabel: c = "Close", className: l }) {
	let u = W();
	return /* @__PURE__ */ n(m.Root, {
		open: o,
		onOpenChange: s ? (e) => s(e) : void 0,
		children: [a ? /* @__PURE__ */ t(m.Trigger, { render: a }) : null, /* @__PURE__ */ n(m.Portal, {
			container: u,
			children: [/* @__PURE__ */ t(m.Backdrop, { className: "iro-backdrop" }), /* @__PURE__ */ n(m.Popup, {
				className: O("iro-sheet", l),
				"data-side": i,
				children: [/* @__PURE__ */ n("header", {
					className: "iro-sheet-header",
					children: [/* @__PURE__ */ t(m.Title, {
						className: "iro-sheet-title",
						children: e
					}), /* @__PURE__ */ t(m.Close, { render: /* @__PURE__ */ t(J, {
						icon: /* @__PURE__ */ t(L, {}),
						label: c,
						size: "sm",
						tooltip: !1
					}) })]
				}), /* @__PURE__ */ t("div", {
					className: "iro-sheet-body",
					children: r
				})]
			})]
		})]
	});
}
// src/components/slider/typed.ts
function ke(e, { min: t, max: n, step: r }) {
	let i = Number.parseFloat(e.trim().replace(",", "."));
	if (!Number.isFinite(i)) return null;
	let a = t + Math.round((i - t) / r) * r, o = Math.min(Math.max(a, t), n), s = (String(r).split(".")[1] ?? "").length;
	return Number(o.toFixed(s));
}
// src/components/slider/Slider.tsx
function Ae({ value: e, defaultValue: r, onValueChange: i, onValueCommit: a, min: o = 0, max: s = 100, step: c = 1, largeStep: l, label: u, format: d = String, resetValue: p, marks: m, disabled: h, className: g, "aria-label": _ }) {
	let [v, y] = f(r ?? o), [b, x] = f(!1), S = e ?? v, C = (t) => {
		e === void 0 && y(t), i?.(t);
	}, T = (e) => {
		C(e), a?.(e);
	}, E = (e) => {
		x(!1);
		let t = ke(e, {
			min: o,
			max: s,
			step: c
		});
		t !== null && T(t);
	}, D = (e) => {
		e.key === "Enter" && E(e.currentTarget.value), e.key === "Escape" && x(!1);
	}, k = (e) => (e - o) / (s - o) * 100;
	return /* @__PURE__ */ n(w.Root, {
		value: S,
		onValueChange: (e) => C(e),
		onValueCommitted: (e) => a?.(e),
		min: o,
		max: s,
		step: c,
		largeStep: l,
		disabled: h,
		className: O("iro-slider", g),
		children: [u ? /* @__PURE__ */ n("div", {
			className: "iro-slider-header",
			children: [/* @__PURE__ */ t(w.Label, {
				className: "iro-slider-label",
				children: u
			}), b ? /* @__PURE__ */ t("input", {
				ref: (e) => {
					e?.focus(), e?.select();
				},
				className: "iro-slider-input",
				defaultValue: String(S),
				inputMode: "decimal",
				"aria-label": "Type a value",
				onBlur: (e) => E(e.currentTarget.value),
				onKeyDown: D
			}) : /* @__PURE__ */ t("button", {
				type: "button",
				className: "iro-slider-value",
				disabled: h,
				onClick: () => x(!0),
				"aria-label": `${d(S)}, click to type a value`,
				children: d(S)
			})]
		}) : null, /* @__PURE__ */ t(w.Control, {
			className: "iro-slider-control",
			onDoubleClick: p === void 0 || h ? void 0 : () => T(p),
			children: /* @__PURE__ */ n(w.Track, {
				className: "iro-slider-track",
				children: [
					m?.map((e) => /* @__PURE__ */ t("span", {
						className: "iro-slider-mark",
						style: { left: `${k(e)}%` },
						"aria-hidden": "true"
					}, e)),
					/* @__PURE__ */ t(w.Indicator, { className: "iro-slider-indicator" }),
					/* @__PURE__ */ t(w.Thumb, {
						className: "iro-slider-thumb",
						"aria-label": u ? void 0 : _
					})
				]
			})
		})]
	});
}
// src/components/splitter/share.ts
function je(e, t, { min: n, max: r, minStart: i, minEnd: a }) {
	let o = t > 0 ? Math.max(n, i / t) : n, s = t > 0 ? Math.min(r, 1 - a / t) : r;
	return Math.min(Math.max(e, o), Math.max(o, s));
}
// src/components/splitter/Splitter.tsx
var Me = .02, Ne = .05;
function Pe({ container: e, share: n, onShareChange: r, onCommit: i, onReset: a, min: o = .2, max: s = .8, minStart: c = 0, minEnd: l = 0, label: u = "Resize panes", className: f }) {
	let p = d(!1), m = d(n);
	m.current = n;
	let h = (t) => {
		let n = e.current?.getBoundingClientRect().width ?? 0;
		m.current = je(t, n, {
			min: o,
			max: s,
			minStart: c,
			minEnd: l
		}), r(m.current);
	}, g = (e) => {
		e.button === 0 && (e.preventDefault(), e.currentTarget.setPointerCapture(e.pointerId), p.current = !0);
	}, _ = (t) => {
		let n = e.current?.getBoundingClientRect();
		p.current && n?.width && h((t.clientX - n.left) / n.width);
	}, v = () => {
		p.current && (p.current = !1, i?.(m.current));
	}, y = (e) => e.key === "ArrowLeft" || e.key === "ArrowRight";
	return /* @__PURE__ */ t("div", {
		role: "separator",
		tabIndex: 0,
		"aria-label": u,
		"aria-orientation": "vertical",
		"aria-valuenow": Math.round(n * 100),
		"aria-valuemin": Math.round(o * 100),
		"aria-valuemax": Math.round(s * 100),
		onPointerDown: g,
		onPointerMove: _,
		onPointerUp: v,
		onPointerCancel: v,
		onKeyDown: (e) => {
			if (!y(e)) return;
			e.preventDefault();
			let t = e.shiftKey ? Ne : Me;
			h(n + (e.key === "ArrowLeft" ? -t : t));
		},
		onKeyUp: (e) => {
			y(e) && i?.(m.current);
		},
		onDoubleClick: a,
		className: O("iro-splitter", f),
		children: /* @__PURE__ */ t("span", { className: "iro-splitter-line" })
	});
}
// src/components/tabs/Tabs.tsx
function Fe({ tabs: e, value: r, onValueChange: i, variant: a = "line", className: o, "aria-label": s }) {
	return /* @__PURE__ */ n(T.Root, {
		value: r,
		onValueChange: (e) => i(e),
		"data-variant": a,
		className: O("iro-tabs", o),
		children: [/* @__PURE__ */ n(T.List, {
			className: "iro-tabs-list",
			"aria-label": s,
			children: [e.map((e) => /* @__PURE__ */ n(T.Tab, {
				value: e.value,
				disabled: e.disabled,
				className: "iro-tab",
				children: [e.icon, e.label]
			}, e.value)), /* @__PURE__ */ t(T.Indicator, { className: "iro-tabs-indicator" })]
		}), e.map((e) => e.content === void 0 ? null : /* @__PURE__ */ t(T.Panel, {
			value: e.value,
			className: "iro-tabs-panel",
			children: e.content
		}, e.value))]
	});
}
// src/components/text-area/TextArea.tsx
function Ie({ invalid: e, className: n, ...r }) {
	return /* @__PURE__ */ t(g.Control, { render: /* @__PURE__ */ t("textarea", {
		className: O("iro-text-area", n),
		"aria-invalid": e || void 0,
		"data-invalid": e || void 0,
		...r
	}) });
}
// src/components/text-field/TextField.tsx
function Le({ size: e = "md", start: r, end: i, invalid: a, className: o, style: s, ...c }) {
	return /* @__PURE__ */ n("span", {
		className: O("iro-text-field", o),
		style: s,
		"data-size": e,
		"data-invalid": a || void 0,
		children: [
			r ? /* @__PURE__ */ t("span", {
				className: "iro-text-field-slot",
				children: r
			}) : null,
			/* @__PURE__ */ t(E, {
				className: "iro-text-field-input",
				"aria-invalid": a || void 0,
				...c
			}),
			i ? /* @__PURE__ */ t("span", {
				className: "iro-text-field-slot",
				children: i
			}) : null
		]
	});
}
// src/components/toaster/Toaster.tsx
var Q = {
	info: /* @__PURE__ */ t(R, {}),
	success: /* @__PURE__ */ t(z, {}),
	warning: /* @__PURE__ */ t(B, {}),
	error: /* @__PURE__ */ t(V, {})
}, $ = D.createToastManager();
function Re({ closeLabel: e }) {
	let { toasts: r } = D.useToastManager();
	return r.map((r) => {
		let i = r.type ?? "info";
		return /* @__PURE__ */ t(D.Root, {
			toast: r,
			className: "iro-toast",
			"data-tone": i,
			children: /* @__PURE__ */ n(D.Content, {
				className: "iro-toast-content",
				children: [
					/* @__PURE__ */ t("span", {
						className: "iro-toast-icon",
						children: Q[i] ?? Q.info
					}),
					/* @__PURE__ */ n("div", {
						className: "iro-toast-text",
						children: [/* @__PURE__ */ t(D.Title, { className: "iro-toast-title" }), /* @__PURE__ */ t(D.Description, { className: "iro-toast-description" })]
					}),
					r.actionProps ? /* @__PURE__ */ t(D.Action, { render: /* @__PURE__ */ t(M, { size: "sm" }) }) : null,
					/* @__PURE__ */ t(D.Close, {
						className: "iro-toast-close",
						"aria-label": e,
						children: /* @__PURE__ */ t(L, {})
					})
				]
			})
		}, r.id);
	});
}
function ze({ title: e, description: t, tone: n = "info", action: r, timeout: i }) {
	return $.add({
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
function Be(e) {
	$.close(e);
}
function Ve({ closeLabel: e = "Dismiss" }) {
	let n = W();
	return /* @__PURE__ */ t(D.Provider, {
		toastManager: $,
		children: /* @__PURE__ */ t(D.Portal, {
			container: n,
			children: /* @__PURE__ */ t(D.Viewport, {
				className: "iro-toaster",
				children: /* @__PURE__ */ t(Re, { closeLabel: e })
			})
		})
	});
}
export { k as Badge, M as Button, ne as Checkbox, re as Chip, ie as Collapsible, oe as ContextMenu, ce as Dialog, le as EmptyState, ue as Field, J as IconButton, ae as IroRoot, K as Kbd, fe as Menu, he as MultiSelect, _e as Notice, ve as NumberField, be as Popover, xe as ProgressBar, we as PropertyList, Te as Segmented, De as Select, Oe as Sheet, Ae as Slider, j as Spinner, Pe as Splitter, H as Switch, Fe as Tabs, Ie as TextArea, Le as TextField, Ve as Toaster, q as Tooltip, Be as dismissToast, ze as toast, W as useIroLayer };
