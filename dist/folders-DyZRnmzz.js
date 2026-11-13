// \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, n = 2.5, r = 1.75, i = 1.75, ee = 4.75, te = 5.5, a = "__ID__", ne = (e, t) => `<mask id="${e}" maskUnits="userSpaceOnUse" x="-4" y="-4" width="32" height="32"><rect x="-4" y="-4" width="32" height="32" fill="white"/>${t}</mask>`;
function o(e, { body: t = "", hole: o = "", cut: s = "", bold: c = "", slash: l = "" }) {
	let u = o || s, d = u ? ne(a, (s ? `<g color="black" stroke="black" stroke-width="${r}">${s}</g>` : "") + (o ? `<g fill="black" stroke="none">${o}</g>` : "")) : "", f = t ? `<g fill="currentColor" stroke-width="${i}"${u ? ` mask="url(#${a})"` : ""}>${t}</g>` : "", p = c ? `<g stroke-width="${n}">${c}</g>` : "";
	if (!l) return {
		name: e,
		line: `${t}${o}${s}${c}`,
		solid: `${d}${f}${p}`
	};
	let m = (e, t) => ne(e, `<g stroke="black" stroke-width="${t}">${l}</g>`);
	return {
		name: e,
		line: `${m(`${a}-line`, ee)}<g mask="url(#${a}-line)">${t}${o}${s}${c}</g>${l}`,
		solid: `${d}${m(`${a}-slash`, te)}<g mask="url(#${a}-slash)">${f}${p}</g><g stroke-width="${n}">${l}</g>`
	};
}
function s({ line: e, solid: t }, n) {
	return {
		line: e.replaceAll(a, n),
		solid: t.replaceAll(a, n)
	};
}
var c = (e) => `<path d="${e}"/>`, l = (e, t, n) => `<circle cx="${e}" cy="${t}" r="${n}"/>`, u = (e, t, n, r, i = 0) => `<rect x="${e}" y="${t}" width="${n}" height="${r}" rx="${i}"/>`, d = (e, t, n, r) => `<ellipse cx="${e}" cy="${t}" rx="${n}" ry="${r}"/>`, f = (e, t, n = 1.1) => `<circle cx="${e}" cy="${t}" r="${n}" fill="currentColor" stroke="none"/>`, p = /* @__PURE__ */ t({
	ArrowDownIcon: () => ae,
	ArrowLeftIcon: () => m,
	ArrowRightIcon: () => re,
	ArrowUpCircleIcon: () => h,
	ArrowUpIcon: () => ie,
	DownloadIcon: () => w,
	ExpandIcon: () => v,
	ExternalLinkIcon: () => b,
	LogInIcon: () => x,
	LogOutIcon: () => S,
	ShrinkIcon: () => y,
	SwapHorizontalIcon: () => g,
	SwapVerticalIcon: () => _,
	TrayInIcon: () => T,
	TrayOutIcon: () => E,
	UploadIcon: () => C
}), m = /* @__PURE__ */ o("arrow-left", { bold: c("M19 12H5M11 6l-6 6 6 6") }), re = /* @__PURE__ */ o("arrow-right", { bold: c("M5 12h14M13 6l6 6-6 6") }), ie = /* @__PURE__ */ o("arrow-up", { bold: c("M12 19V5M6 11l6-6 6 6") }), ae = /* @__PURE__ */ o("arrow-down", { bold: c("M12 5v14M6 13l6 6 6-6") }), h = /* @__PURE__ */ o("arrow-up-circle", {
	body: l(12, 12, 8.5),
	cut: c("M12 16.5v-9M8.5 11 12 7.5l3.5 3.5")
}), g = /* @__PURE__ */ o("swap-horizontal", { bold: c("M4 8h14m-3-3 3 3-3 3M20 16H6m3-3-3 3 3 3") }), _ = /* @__PURE__ */ o("swap-vertical", { bold: c("M7.5 4v14m-3-3 3 3 3-3M16.5 20V6m-3 3 3-3 3 3") }), v = /* @__PURE__ */ o("expand", { bold: c("M14.5 3.5h6v6M9.5 20.5h-6v-6M20.5 3.5 14 10M3.5 20.5 10 14") }), y = /* @__PURE__ */ o("shrink", { bold: c("M20.5 3.5 14 10m0-5.5V10h5.5M3.5 20.5 10 14m0 5.5V14H4.5") }), b = /* @__PURE__ */ o("external-link", { bold: c("M13.5 4.5h6v6m0-6-8 8M18 14v3.5a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2H10") }), x = /* @__PURE__ */ o("log-in", { bold: c("M14.5 4.5h3a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-3M10 7.5l4.5 4.5-4.5 4.5M14.5 12h-10") }), S = /* @__PURE__ */ o("log-out", { bold: c("M14.5 4.5h3a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-3M10 16.5 5.5 12 10 7.5M5.5 12h10") }), C = /* @__PURE__ */ o("upload", { bold: c("M12 15.5V4M7.5 8.5 12 4l4.5 4.5M4 15v2.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V15") }), w = /* @__PURE__ */ o("download", { bold: c("M12 4v11.5M7.5 11l4.5 4.5 4.5-4.5M4 15v2.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V15") }), T = /* @__PURE__ */ o("tray-in", { bold: c("M12 3.5v11M7.5 10l4.5 4.5 4.5-4.5M3.5 13.5v4a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-4") }), E = /* @__PURE__ */ o("tray-out", { bold: c("M12 14.5v-11M7.5 8 12 3.5 16.5 8M3.5 13.5v4a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-4") }), oe = /* @__PURE__ */ t({
	CheckIcon: () => A,
	CloseIcon: () => k,
	GripIcon: () => N,
	MenuIcon: () => P,
	MinusIcon: () => O,
	MoreHorizontalIcon: () => j,
	MoreVerticalIcon: () => M,
	PlusIcon: () => D
}), D = /* @__PURE__ */ o("plus", { bold: c("M12 5v14M5 12h14") }), O = /* @__PURE__ */ o("minus", { bold: c("M5 12h14") }), k = /* @__PURE__ */ o("close", { bold: c("M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5") }), A = /* @__PURE__ */ o("check", { bold: c("m5 12.5 4.5 4.5L19 7.5") }), j = /* @__PURE__ */ o("more-horizontal", { bold: `${f(6, 12, 1.4)}${f(12, 12, 1.4)}${f(18, 12, 1.4)}` }), M = /* @__PURE__ */ o("more-vertical", { bold: `${f(12, 6, 1.4)}${f(12, 12, 1.4)}${f(12, 18, 1.4)}` }), N = /* @__PURE__ */ o("grip", { bold: `${f(9, 6, 1.25)}${f(15, 6, 1.25)}${f(9, 12, 1.25)}${f(15, 12, 1.25)}${f(9, 18, 1.25)}${f(15, 18, 1.25)}` }), P = /* @__PURE__ */ o("menu", { bold: c("M4 6.5h16M4 12h16M4 17.5h16") }), se = /* @__PURE__ */ t({
	CaretDownIcon: () => H,
	ChevronDownIcon: () => F,
	ChevronLeftIcon: () => L,
	ChevronRightIcon: () => R,
	ChevronUpIcon: () => I,
	ChevronsLeftIcon: () => B,
	ChevronsRightIcon: () => V,
	ChevronsUpDownIcon: () => z
}), F = /* @__PURE__ */ o("chevron-down", { bold: c("m6.5 9.5 5.5 5.5 5.5-5.5") }), I = /* @__PURE__ */ o("chevron-up", { bold: c("m6.5 14.5 5.5-5.5 5.5 5.5") }), L = /* @__PURE__ */ o("chevron-left", { bold: c("m14.5 6.5-5.5 5.5 5.5 5.5") }), R = /* @__PURE__ */ o("chevron-right", { bold: c("m9.5 6.5 5.5 5.5-5.5 5.5") }), z = /* @__PURE__ */ o("chevrons-up-down", { bold: c("m8 9.5 4-4 4 4M8 14.5l4 4 4-4") }), B = /* @__PURE__ */ o("chevrons-left", { bold: c("m11.5 6.5-5.5 5.5 5.5 5.5M18 6.5 12.5 12l5.5 5.5") }), V = /* @__PURE__ */ o("chevrons-right", { bold: c("m12.5 6.5 5.5 5.5-5.5 5.5M6 6.5l5.5 5.5L6 17.5") }), H = /* @__PURE__ */ o("caret-down", { body: c("M6.5 9.5h11L12 15.5z") }), ce = /* @__PURE__ */ t({
	EyeIcon: () => fe,
	EyeOffIcon: () => pe,
	FilterIcon: () => K,
	PinIcon: () => de,
	PowerIcon: () => ue,
	SearchIcon: () => q,
	SettingsIcon: () => W,
	SlidersIcon: () => G,
	ZoomInIcon: () => J,
	ZoomOutIcon: () => le
}), U = c("M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"), W = /* @__PURE__ */ o("settings", {
	body: c("M10.33 5.3 10.64 2.9h2.72l.31 2.4 1.88.79 1.92-1.49 1.93 1.93-1.49 1.92.79 1.88 2.4.31v2.72l-2.4.31-.79 1.88 1.49 1.92-1.93 1.93-1.92-1.49-1.88.79-.31 2.4h-2.72l-.31-2.4-1.88-.79-1.92 1.49-1.93-1.93 1.49-1.92-.79-1.88-2.4-.31v-2.72l2.4-.31.79-1.88-1.49-1.92 1.93-1.93 1.92 1.49z"),
	hole: l(12, 12, 3)
}), G = /* @__PURE__ */ o("sliders", {
	body: `${l(15, 6.5, 2)}${l(9, 12, 2)}${l(17, 17.5, 2)}`,
	bold: c("M4 6.5h9M17 6.5h3M4 12h3M11 12h9M4 17.5h11M19 17.5h1")
}), K = /* @__PURE__ */ o("filter", { body: c("M4 5h16l-6 7.5V18l-4 2v-7.5z") }), q = /* @__PURE__ */ o("search", {
	body: l(10.5, 10.5, 6.5),
	bold: c("m20 20-4.6-4.6")
}), J = /* @__PURE__ */ o("zoom-in", {
	body: l(10.5, 10.5, 6.5),
	cut: c("M10.5 8v5M8 10.5h5"),
	bold: c("m20 20-4.6-4.6")
}), le = /* @__PURE__ */ o("zoom-out", {
	body: l(10.5, 10.5, 6.5),
	cut: c("M8 10.5h5"),
	bold: c("m20 20-4.6-4.6")
}), ue = /* @__PURE__ */ o("power", { bold: c("M12 3.5v8M7.1 6.6a7.5 7.5 0 1 0 9.8 0") }), de = /* @__PURE__ */ o("pin", {
	body: c("M10 3.5h4v5l3.5 4.5h-11L10 8.5z"),
	bold: c("M9 3.5h6M12 13v7.5")
}), fe = /* @__PURE__ */ o("eye", {
	body: U,
	hole: l(12, 12, 3)
}), pe = /* @__PURE__ */ o("eye-off", {
	body: U,
	hole: l(12, 12, 3),
	slash: c("m3.5 3.5 17 17")
}), me = /* @__PURE__ */ t({
	CopyIcon: () => be,
	DuplicateIcon: () => xe,
	EraserIcon: () => ye,
	LinkIcon: () => Ee,
	PencilIcon: () => ve,
	SaveIcon: () => Te,
	ScissorsIcon: () => Se,
	TrashIcon: () => Ce,
	TrashRestoreIcon: () => we,
	UnlinkIcon: () => De
}), he = c("m6 6.5.9 12a2 2 0 0 0 2 1.9h6.2a2 2 0 0 0 2-1.9l.9-12z"), ge = c("M4 6.5h16M9.5 6.5V4.8a1.3 1.3 0 0 1 1.3-1.3h2.4a1.3 1.3 0 0 1 1.3 1.3v1.7"), _e = c("M15.5 8.5V6A2.5 2.5 0 0 0 13 3.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5"), ve = /* @__PURE__ */ o("pencil", {
	body: c("M15.5 4.5 19.5 8.5 9 19l-5 1 1-5z"),
	cut: c("m13.5 6.5 4 4")
}), ye = /* @__PURE__ */ o("eraser", {
	body: c("m14 4.5 6 6-8.5 8.5H7.5L4 15.5z"),
	cut: c("m9.5 9 6 6"),
	bold: c("M11.5 19H20")
}), be = /* @__PURE__ */ o("copy", {
	body: u(8.5, 8.5, 12, 12, 2.5),
	bold: _e
}), xe = /* @__PURE__ */ o("duplicate", {
	body: u(8.5, 8.5, 12, 12, 2.5),
	cut: c("M14.5 11.75v5.5M11.75 14.5h5.5"),
	bold: _e
}), Se = /* @__PURE__ */ o("scissors", {
	body: `${l(6.5, 6.5, 3)}${l(6.5, 17.5, 3)}`,
	bold: c("M8.6 8.6 20 20M8.6 15.4 20 4")
}), Ce = /* @__PURE__ */ o("trash", {
	body: he,
	cut: c("M10 10.5v6M14 10.5v6"),
	bold: ge
}), we = /* @__PURE__ */ o("trash-restore", {
	body: he,
	cut: c("M12 17.5v-6.25M9.5 13.5 12 11l2.5 2.5"),
	bold: ge
}), Te = /* @__PURE__ */ o("save", {
	body: c("M5.5 3.5h10l4 4v11a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z"),
	cut: c("M8 3.5V8h7V3.5M7.5 20.5v-6h9v6")
}), Ee = /* @__PURE__ */ o("link", { bold: c("M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3A4 4 0 0 0 11 18.66l1-1") }), De = /* @__PURE__ */ o("unlink", { bold: c("m15.5 13.5 3.2-3.2a4 4 0 0 0-5.7-5.7L10 7.6m-1.5 2.9-3.2 3.2a4 4 0 0 0 5.7 5.7l3-3M4 7l2 .5M7 4l.5 2M20 17l-2-.5M17 20l-.5-2") }), Oe = /* @__PURE__ */ t({
	HistoryIcon: () => Ae,
	RedoIcon: () => Me,
	RefreshIcon: () => ke,
	ShuffleIcon: () => Ne,
	SortAscIcon: () => Pe,
	SortDescIcon: () => Fe,
	UndoIcon: () => je
}), ke = /* @__PURE__ */ o("refresh", { bold: c("M20 11.5A8 8 0 0 0 5.6 6.8L4 8.5m0-4v4h4M4 12.5a8 8 0 0 0 14.4 4.7l1.6-1.7m0 4v-4h-4") }), Ae = /* @__PURE__ */ o("history", { bold: c("M3.5 12A8.5 8.5 0 1 0 12 3.5a9 9 0 0 0-6.4 2.7L3.5 8.5m0-5v5h5M12 7.5V12l3.2 2") }), je = /* @__PURE__ */ o("undo", { bold: c("M9 14 4.5 9.5 9 5M4.5 9.5H15a4.5 4.5 0 0 1 0 9h-3") }), Me = /* @__PURE__ */ o("redo", { bold: c("m15 14 4.5-4.5L15 5m4.5 4.5H9a4.5 4.5 0 0 0 0 9h3") }), Ne = /* @__PURE__ */ o("shuffle", { bold: c("M3.5 7h3c4.5 0 6.5 10 11 10h3M3.5 17h3c1.6 0 2.8-1.3 3.8-3m3.4-4c1-1.7 2.2-3 3.8-3h3M18 4.5 20.5 7 18 9.5m0 5 2.5 2.5-2.5 2.5") }), Pe = /* @__PURE__ */ o("sort-asc", { bold: c("M7 20V4M4 7l3-3 3 3m3.5-1h3m-3 6h5m-5 6h7") }), Fe = /* @__PURE__ */ o("sort-desc", { bold: c("M7 4v16m-3-3 3 3 3-3m3.5-11h7m-7 6h5m-5 6h3") }), Ie = /* @__PURE__ */ t({
	BoltIcon: () => We,
	BookmarkIcon: () => ze,
	CrownIcon: () => Ve,
	FlagIcon: () => Be,
	GemIcon: () => Ue,
	HashIcon: () => Ye,
	HeartIcon: () => Re,
	LightbulbIcon: () => qe,
	SparkleIcon: () => Ge,
	StarIcon: () => Le,
	TagIcon: () => Je,
	TrophyIcon: () => He,
	WandIcon: () => Ke
}), Le = /* @__PURE__ */ o("star", { body: c("M12 3.8 14.29 9.44 20.37 9.88 15.71 13.81 17.17 19.72 12 16.5 6.83 19.72 8.29 13.81 3.63 9.88 9.71 9.44z") }), Re = /* @__PURE__ */ o("heart", { body: c("M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.2 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z") }), ze = /* @__PURE__ */ o("bookmark", { body: c("M6.5 5.5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v15l-5.5-4-5.5 4z") }), Be = /* @__PURE__ */ o("flag", {
	body: c("M5.5 4.5h12.5l-2.75 4.75L18 14H5.5z"),
	bold: c("M5.5 3.5v17")
}), Ve = /* @__PURE__ */ o("crown", { body: c("M5 18.5 3.5 8l5 3.5L12 5l3.5 6.5 5-3.5L19 18.5z") }), He = /* @__PURE__ */ o("trophy", {
	body: c("M6.5 3.5h11V9a5.5 5.5 0 0 1-11 0z"),
	bold: c("M6.5 9H5a2.25 2.25 0 0 1 0-4.5h1.5M17.5 9H19a2.25 2.25 0 0 0 0-4.5h-1.5M12 14.5v6M8 20.5h8")
}), Ue = /* @__PURE__ */ o("gem", {
	body: c("M12 2.5 18.5 6.5v11L12 21.5 5.5 17.5v-11z"),
	cut: c("M12 6.8 15.6 9v6L12 17.2 8.4 15V9z")
}), We = /* @__PURE__ */ o("bolt", { body: c("M13 3 5 13.5h6L10.5 21 19 10.5h-6z") }), Ge = /* @__PURE__ */ o("sparkle", { body: c("M12 3c.8 5.4 3.6 8.2 9 9-5.4.8-8.2 3.6-9 9-.8-5.4-3.6-8.2-9-9 5.4-.8 8.2-3.6 9-9z") }), Ke = /* @__PURE__ */ o("wand", { bold: c("m4.5 19.5 10-10m-1 -1 2 2M18.5 3v3.5m-1.75-1.75h3.5M8.5 4v2.5M7.25 5.25h2.5M19.5 13.5V16m-1.25-1.25h2.5") }), qe = /* @__PURE__ */ o("lightbulb", {
	body: c("M9 15.5c0-1.4-.7-2.1-1.7-3A6 6 0 1 1 16.7 12.5c-1 .9-1.7 1.6-1.7 3z"),
	bold: c("M9 18.5h6M10.5 21.25h3")
}), Je = /* @__PURE__ */ o("tag", {
	body: c("M3.5 12.6V5.5a2 2 0 0 1 2-2h7.1l8 8a2 2 0 0 1 0 2.8l-7 7a2 2 0 0 1-2.8 0z"),
	hole: l(8, 8, 1.4)
}), Ye = /* @__PURE__ */ o("hash", { bold: c("M5 9h15M4 15h15M10 4 8 20M16 4l-2 16") }), Xe = /* @__PURE__ */ t({
	AudioBarsIcon: () => lt,
	CameraIcon: () => et,
	ImageIcon: () => Qe,
	ImagesIcon: () => $e,
	MicIcon: () => ct,
	PaletteIcon: () => dt,
	PauseIcon: () => nt,
	PixelIcon: () => ft,
	PlayIcon: () => tt,
	SkipBackIcon: () => it,
	SkipForwardIcon: () => at,
	StopIcon: () => rt,
	VolumeIcon: () => ot,
	VolumeOffIcon: () => st,
	WaveIcon: () => ut
}), Ze = c("M4 9.5h3l4.5-4v13l-4.5-4H4z"), Qe = /* @__PURE__ */ o("image", {
	body: u(3.5, 4.5, 17, 15, 2.5),
	hole: l(9, 9.5, 1.6),
	cut: c("m3.5 17 5-5 4 4 2.5-2.5 5.5 5.5")
}), $e = /* @__PURE__ */ o("images", {
	body: u(3.5, 6.5, 14, 13, 2.5),
	hole: l(13, 10.25, 1.25),
	cut: c("m3.5 16 4-4 3.5 3.5 2-2 4.5 4.5"),
	bold: c("M7 3.5h11a2.5 2.5 0 0 1 2.5 2.5v10")
}), et = /* @__PURE__ */ o("camera", {
	body: c("M4 8.5a2 2 0 0 1 2-2h1.8l1.4-2h5.6l1.4 2H18a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"),
	hole: l(12, 12.5, 3.3)
}), tt = /* @__PURE__ */ o("play", { body: c("M7.5 5.2v13.6a1 1 0 0 0 1.5.9l10.5-6.8a1 1 0 0 0 0-1.7L9 4.4a1 1 0 0 0-1.5.8z") }), nt = /* @__PURE__ */ o("pause", { body: `${u(6.5, 5, 3.5, 14, 1.25)}${u(14, 5, 3.5, 14, 1.25)}` }), rt = /* @__PURE__ */ o("stop", { body: u(6, 6, 12, 12, 2.5) }), it = /* @__PURE__ */ o("skip-back", {
	body: c("M18.5 5.6v12.8a.8.8 0 0 1-1.2.7l-9.3-6.4a.8.8 0 0 1 0-1.4l9.3-6.4a.8.8 0 0 1 1.2.7z"),
	bold: c("M5 5v14")
}), at = /* @__PURE__ */ o("skip-forward", {
	body: c("M5.5 5.6v12.8a.8.8 0 0 0 1.2.7l9.3-6.4a.8.8 0 0 0 0-1.4L6.7 4.9a.8.8 0 0 0-1.2.7z"),
	bold: c("M19 5v14")
}), ot = /* @__PURE__ */ o("volume", {
	body: Ze,
	bold: c("M15 9a4 4 0 0 1 0 6M17.5 6.5a7.5 7.5 0 0 1 0 11")
}), st = /* @__PURE__ */ o("volume-off", {
	body: Ze,
	bold: c("m15.5 9.5 5 5M20.5 9.5l-5 5")
}), ct = /* @__PURE__ */ o("mic", {
	body: u(9, 3, 6, 11, 3),
	bold: c("M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21")
}), lt = /* @__PURE__ */ o("audio-bars", { bold: c("M4 10v4M8 7v10M12 4v16M16 8v8M20 10.5v3") }), ut = /* @__PURE__ */ o("wave", { bold: c("M3 12c2-4.5 4-4.5 6 0s4 4.5 6 0 4-4.5 6 0") }), dt = /* @__PURE__ */ o("palette", {
	body: c("M12 3.5a8.5 8.5 0 0 0 0 17c1.2 0 1.8-.9 1.4-1.9l-.5-1.2a1.6 1.6 0 0 1 1.5-2.2H17a3.5 3.5 0 0 0 3.5-3.5c0-4.5-3.8-8.2-8.5-8.2z"),
	hole: `${l(7.8, 11.5, 1.1)}${l(10, 7.6, 1.1)}${l(14.5, 7.6, 1.1)}`
}), ft = /* @__PURE__ */ o("pixel", {
	body: c("M7 3.5h10v3.5h3.5v10H17v3.5H7V17H3.5V7H7z"),
	hole: `${u(7, 9.5, 2.5, 5)}${u(14.5, 9.5, 2.5, 5)}`
}), pt = /* @__PURE__ */ t({
	AlertCircleIcon: () => yt,
	AlertTriangleIcon: () => vt,
	BanIcon: () => wt,
	BellIcon: () => Et,
	BellOffIcon: () => Dt,
	CheckCircleIcon: () => bt,
	CloseCircleIcon: () => xt,
	HelpIcon: () => _t,
	InfoIcon: () => gt,
	LoaderIcon: () => Tt,
	MinusCircleIcon: () => St,
	PlusCircleIcon: () => Ct
}), mt = c("M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z"), ht = c("M10 20.5a2.2 2.2 0 0 0 4 0"), gt = /* @__PURE__ */ o("info", {
	body: l(12, 12, 8.5),
	cut: `${c("M12 11v5.5")}${f(12, 7.9, .95)}`
}), _t = /* @__PURE__ */ o("help", {
	body: l(12, 12, 8.5),
	cut: `${c("M9.6 9.4a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.2-2.4 3.7")}${f(12, 16.8, .95)}`
}), vt = /* @__PURE__ */ o("alert-triangle", {
	body: c("M10.3 4.3 2.9 17.2A2 2 0 0 0 4.6 20h14.8a2 2 0 0 0 1.7-2.8L13.7 4.3a2 2 0 0 0-3.4 0z"),
	cut: `${c("M12 9.5v4")}${f(12, 16.75, .95)}`
}), yt = /* @__PURE__ */ o("alert-circle", {
	body: l(12, 12, 8.5),
	cut: `${c("M12 7.5V13")}${f(12, 16.25, .95)}`
}), bt = /* @__PURE__ */ o("check-circle", {
	body: l(12, 12, 8.5),
	cut: c("m8.5 12.3 2.4 2.4 4.6-4.9")
}), xt = /* @__PURE__ */ o("close-circle", {
	body: l(12, 12, 8.5),
	cut: c("m9 9 6 6M15 9l-6 6")
}), St = /* @__PURE__ */ o("minus-circle", {
	body: l(12, 12, 8.5),
	cut: c("M8 12h8")
}), Ct = /* @__PURE__ */ o("plus-circle", {
	body: l(12, 12, 8.5),
	cut: c("M12 8v8M8 12h8")
}), wt = /* @__PURE__ */ o("ban", { bold: `${l(12, 12, 8.5)}${c("m6 6 12 12")}` }), Tt = /* @__PURE__ */ o("loader", { bold: c("M12 3.5a8.5 8.5 0 1 0 8.5 8.5") }), Et = /* @__PURE__ */ o("bell", {
	body: mt,
	bold: ht
}), Dt = /* @__PURE__ */ o("bell-off", {
	body: mt,
	bold: ht,
	slash: c("m3.5 3.5 17 17")
}), Ot = /* @__PURE__ */ t({
	BroomIcon: () => Ft,
	DiceIcon: () => Pt,
	FlaskIcon: () => Mt,
	RocketIcon: () => jt,
	ScaleIcon: () => Nt,
	ToolboxIcon: () => At,
	WrenchIcon: () => kt
}), kt = /* @__PURE__ */ o("wrench", { body: c("M14.7 3.6a4.8 4.8 0 0 0-5.3 6.6l-6 6a1.9 1.9 0 0 0 2.7 2.7l6-6a4.8 4.8 0 0 0 6.6-5.3l-2.8 2.8-2.4-.6-.6-2.4z") }), At = /* @__PURE__ */ o("toolbox", {
	body: u(3, 8, 18, 11.5, 2.5),
	cut: c("M3 13h18M8 11.5v3M16 11.5v3"),
	bold: c("M9 8V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v2")
}), jt = /* @__PURE__ */ o("rocket", {
	body: c("M12 2.8c3 2.2 4.5 5.7 4.5 9.7v4h-9v-4c0-4 1.5-7.5 4.5-9.7z"),
	hole: l(12, 10, 1.6),
	bold: c("M7.5 13.5 5 16v3h2.5M16.5 13.5 19 16v3h-2.5M10.5 19.5v1.5M13.5 19.5v1.5")
}), Mt = /* @__PURE__ */ o("flask", {
	body: c("M10 3.5v5.2L4.6 17.6A2 2 0 0 0 6.3 20.5h11.4a2 2 0 0 0 1.7-2.9L14 8.7V3.5z"),
	cut: c("M7.2 14.5h9.6"),
	bold: c("M9.5 3.5h5")
}), Nt = /* @__PURE__ */ o("scale", {
	body: c("m5 7-2.5 6a2.8 2.8 0 0 0 5 0zM19 7l-2.5 6a2.8 2.8 0 0 0 5 0z"),
	bold: c("M12 4v16M7.5 20h9M5 7h14")
}), Pt = /* @__PURE__ */ o("dice", {
	body: u(4, 4, 16, 16, 3.5),
	cut: `${f(8.5, 8.5)}${f(15.5, 8.5)}${f(12, 12)}${f(8.5, 15.5)}${f(15.5, 15.5)}`
}), Ft = /* @__PURE__ */ o("broom", {
	body: c("M9.75 10.75 13.25 14.25 9.75 21.25 2.75 14.25z"),
	cut: c("M7.37 11.91 12.09 16.63M9.21 17.28 7.15 19.33M6.73 14.8 4.67 16.85"),
	bold: c("M20 4 11.5 12.5")
}), It = /* @__PURE__ */ t({
	AppWindowIcon: () => Gt,
	AspectRatioIcon: () => Kt,
	ColumnsIcon: () => Bt,
	CompareIcon: () => Wt,
	GridIcon: () => Lt,
	LayoutEditIcon: () => Jt,
	ListIcon: () => Ht,
	MosaicIcon: () => Rt,
	RowsIcon: () => zt,
	ScaleUpIcon: () => qt,
	SidebarIcon: () => Ut,
	TableIcon: () => Vt
}), Y = u(3.5, 4.5, 17, 15, 2.5), Lt = /* @__PURE__ */ o("grid", { body: `${u(3.5, 3.5, 7, 7, 1.75)}${u(13.5, 3.5, 7, 7, 1.75)}${u(3.5, 13.5, 7, 7, 1.75)}${u(13.5, 13.5, 7, 7, 1.75)}` }), Rt = /* @__PURE__ */ o("mosaic", { body: `${u(3.5, 3.5, 8, 7, 1.75)}${u(14.5, 3.5, 6, 7, 1.75)}${u(3.5, 13.5, 5, 7, 1.75)}${u(11.5, 13.5, 9, 7, 1.75)}` }), zt = /* @__PURE__ */ o("rows", {
	body: Y,
	cut: c("M3.5 9.5h17M3.5 14.5h17")
}), Bt = /* @__PURE__ */ o("columns", {
	body: Y,
	cut: c("M9.17 4.5v15M14.83 4.5v15")
}), Vt = /* @__PURE__ */ o("table", {
	body: Y,
	cut: c("M3.5 9.5h17M3.5 14.5h17M9.5 9.5v10")
}), Ht = /* @__PURE__ */ o("list", { bold: `${c("M9 6.5h11.5M9 12h11.5M9 17.5h11.5")}${f(4.75, 6.5)}${f(4.75, 12)}${f(4.75, 17.5)}` }), Ut = /* @__PURE__ */ o("sidebar", {
	body: Y,
	cut: c("M9.5 4.5v15M6 8.5h1M6 11.5h1")
}), Wt = /* @__PURE__ */ o("compare", {
	body: Y,
	cut: c("m8.5 10.5-2 1.5 2 1.5M15.5 10.5l2 1.5-2 1.5"),
	slash: c("M12 2.5v19")
}), Gt = /* @__PURE__ */ o("app-window", {
	body: u(3, 4.5, 18, 15, 2.5),
	cut: `${c("M3 9h18")}${f(6.25, 6.75, .8)}${f(8.75, 6.75, .8)}`
}), Kt = /* @__PURE__ */ o("aspect-ratio", {
	body: u(3.5, 6, 17, 12, 2),
	cut: c("M7 11V9h2.5M17 13v2h-2.5")
}), qt = /* @__PURE__ */ o("scale-up", {
	body: u(3.5, 12.5, 8, 8, 1.75),
	bold: c("M14 3.5h6.5V10m0-6.5-8 8M3.5 9V5.5a2 2 0 0 1 2-2H9M15 20.5h3.5a2 2 0 0 0 2-2V15")
}), Jt = /* @__PURE__ */ o("layout-edit", { body: `${u(3.5, 3.5, 7, 7, 1.75)}${u(3.5, 13.5, 7, 7, 1.75)}${u(13.5, 3.5, 7, 7, 1.75)}${c("m14 20.5.6-2.6 4.5-4.5a1.4 1.4 0 0 1 2 2l-4.5 4.5z")}` }), Yt = /* @__PURE__ */ t({
	BookIcon: () => an,
	ClipboardIcon: () => nn,
	FileCodeIcon: () => tn,
	FileIcon: () => Zt,
	FileInfoIcon: () => en,
	FilePlusIcon: () => $t,
	FileTextIcon: () => Qt,
	PaperclipIcon: () => rn
}), X = c("M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8z"), Z = c("M14 3.5V8h4.5"), Xt = u(8, 2.5, 8, 4.5, 1.75), Zt = /* @__PURE__ */ o("file", {
	body: X,
	cut: Z
}), Qt = /* @__PURE__ */ o("file-text", {
	body: X,
	cut: `${Z}${c("M9 12.5h6M9 16h4")}`
}), $t = /* @__PURE__ */ o("file-plus", {
	body: X,
	cut: `${Z}${c("M12 11v6M9 14h6")}`
}), en = /* @__PURE__ */ o("file-info", {
	body: X,
	cut: `${Z}${c("M12 12.5v4.5")}${f(12, 9.9, .95)}`
}), tn = /* @__PURE__ */ o("file-code", {
	body: X,
	cut: `${Z}${c("m10 12-2 2.25 2 2.25m4-4.5 2 2.25-2 2.25")}`
}), nn = /* @__PURE__ */ o("clipboard", {
	body: `${c("M8 5H7a2.5 2.5 0 0 0-2.5 2.5V19A2.5 2.5 0 0 0 7 21.5h10a2.5 2.5 0 0 0 2.5-2.5V7.5A2.5 2.5 0 0 0 17 5h-1")}${Xt}`,
	cut: c("M8 5v.25a1.75 1.75 0 0 0 1.75 1.75h4.5A1.75 1.75 0 0 0 16 5.25V5")
}), rn = /* @__PURE__ */ o("paperclip", { bold: `<g transform="rotate(45 12 12)">${c("M10 8.5V14a2 2 0 0 0 4 0V6.5a4 4 0 0 0-8 0v9a6 6 0 0 0 12 0V8")}</g>` }), an = /* @__PURE__ */ o("book", {
	body: c("M5 4.5A1.5 1.5 0 0 1 6.5 3h12v14.5h-12A1.5 1.5 0 0 0 5 19z"),
	cut: c("M9 7.5h6"),
	bold: c("M5 19a1.5 1.5 0 0 0 1.5 1.5h12v-3")
}), on = /* @__PURE__ */ t({
	CalendarIcon: () => cn,
	ClockIcon: () => sn,
	GlobeIcon: () => un,
	HomeIcon: () => Q,
	MapPinIcon: () => dn,
	StoreIcon: () => ln
}), sn = /* @__PURE__ */ o("clock", {
	body: l(12, 12, 8.5),
	cut: c("M12 7.5V12l3 2")
}), cn = /* @__PURE__ */ o("calendar", {
	body: u(3.5, 5, 17, 15.5, 2.5),
	cut: c("M3.5 10h17"),
	bold: c("M8 3v4M16 3v4")
}), Q = /* @__PURE__ */ o("home", {
	body: c("M6 9v9.5A1.5 1.5 0 0 0 7.5 20h9a1.5 1.5 0 0 0 1.5-1.5V9"),
	cut: c("M10 20v-5.5h4V20"),
	bold: c("M4 10.5 12 4l8 6.5")
}), ln = /* @__PURE__ */ o("store", {
	body: `${c("M5.5 4h13L20 9.5a2.67 2.67 0 0 1-5.33 0 2.67 2.67 0 0 1-5.34 0A2.67 2.67 0 0 1 4 9.5z")}${c("M5.5 12v8.5h13V12")}`,
	cut: `${c("M4 9.5a2.67 2.67 0 0 0 5.33 0 2.67 2.67 0 0 0 5.34 0 2.67 2.67 0 0 0 5.33 0")}${c("M10 20.5v-5h4v5")}`
}), un = /* @__PURE__ */ o("globe", {
	body: l(12, 12, 8.5),
	cut: c("M3.5 12h17M12 3.5a13 13 0 0 1 0 17 13 13 0 0 1 0-17z")
}), dn = /* @__PURE__ */ o("map-pin", {
	body: c("M12 21.5s-6.5-5.6-6.5-11.25a6.5 6.5 0 0 1 13 0C18.5 15.9 12 21.5 12 21.5z"),
	hole: l(12, 10.25, 2.25)
}), fn = /* @__PURE__ */ t({
	ArchiveIcon: () => yn,
	DatabaseIcon: () => bn,
	FolderIcon: () => pn,
	FolderMoveIcon: () => gn,
	FolderOpenIcon: () => mn,
	FolderPlusIcon: () => hn,
	FoldersIcon: () => _n,
	InboxIcon: () => vn
}), $ = c("M3.5 7.5a2 2 0 0 1 2-2h3.6l2 2.2h7.4a2 2 0 0 1 2 2v7.8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"), pn = /* @__PURE__ */ o("folder", { body: $ }), mn = /* @__PURE__ */ o("folder-open", {
	body: c("M3.6 18.1 6 12a1.5 1.5 0 0 1 1.4-1h12.4a1 1 0 0 1 .9 1.4l-2.4 6a1.5 1.5 0 0 1-1.4 1H4.5a1 1 0 0 1-.9-1.3z"),
	bold: c("M3.5 17V7.5a2 2 0 0 1 2-2h3.6l2 2.2h6.4a2 2 0 0 1 2 2V11")
}), hn = /* @__PURE__ */ o("folder-plus", {
	body: $,
	cut: c("M12 11v5.5M9.25 13.75h5.5")
}), gn = /* @__PURE__ */ o("folder-move", {
	body: $,
	cut: c("M8.75 13.75h6.5m-2.5-2.5 2.5 2.5-2.5 2.5")
}), _n = /* @__PURE__ */ o("folders", {
	body: c("M3 10a2 2 0 0 1 2-2h3l1.8 2H16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"),
	bold: c("M6.5 6V5.5A2 2 0 0 1 8.5 3.5h2.7l1.8 2h6a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2")
}), vn = /* @__PURE__ */ o("inbox", {
	body: u(3.5, 4.5, 17, 15, 2.5),
	cut: c("M3.5 13.5h4.25l1.5 2.5h5.5l1.5-2.5h4.25")
}), yn = /* @__PURE__ */ o("archive", {
	body: `${u(3, 4, 18, 4.5, 1.5)}${c("M4.5 8.5v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-10")}`,
	cut: c("M3 8.5h18M10 12.5h4")
}), bn = /* @__PURE__ */ o("database", {
	body: `${d(12, 6, 7.5, 2.75)}${c("M4.5 6v12c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75V6")}`,
	cut: c("M4.5 12c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75M4.5 6c0 1.5 3.4 2.75 7.5 2.75S19.5 7.5 19.5 6")
});
export { xt as $, t as $n, De as $t, Lt as A, ae as An, Ge as At, Pt as B, y as Bn, Pe as Bt, Qt as C, N as Cn, ze as Ct, Kt as D, M as Dn, Ye as Dt, Gt as E, j as En, Ue as Et, qt as F, w as Fn, Ie as Ft, kt as G, C as Gn, xe as Gt, jt as H, _ as Hn, je as Ht, Ut as I, v as In, Ae as It, vt as J, f as Jn, ve as Jt, Ot as K, p as Kn, ye as Kt, Vt as L, b as Ln, Me as Lt, Ht as M, re as Mn, Je as Mt, Rt as N, h as Nn, He as Nt, Bt as O, D as On, Re as Ot, zt as P, ie as Pn, Ke as Pt, bt as Q, u as Qn, we as Qt, It as R, x as Rn, ke as Rt, $t as S, k as Sn, We as St, Yt as T, O as Tn, Be as Tt, Nt as U, T as Un, Oe as Ut, Mt as V, g as Vn, Fe as Vt, At as W, E as Wn, be as Wt, Et as X, s as Xn, Se as Xt, wt as Y, o as Yn, Te as Yt, Dt as Z, c as Zn, Ce as Zt, an as _, B as _n, rt as _t, mn as a, ue as an, pt as at, Zt as b, se as bn, ut as bt, vn as c, G as cn, Qe as ct, sn as d, ce as dn, dt, me as en, _t as et, un as f, H as fn, nt as ft, on as g, I as gn, at as gt, ln as h, R as hn, it as ht, gn as i, de as in, Ct as it, Jt as j, m as jn, Le as jt, Wt as k, oe as kn, qe as kt, fn as l, J as ln, $e as lt, dn as m, L as mn, tt as mt, bn as n, pe as nn, Tt as nt, hn as o, q as on, lt as ot, Q as p, F as pn, ft as pt, yt as q, l as qn, Ee as qt, pn as r, K as rn, St as rt, _n as s, W as sn, et as st, yn as t, fe as tn, gt as tt, cn as u, le as un, ct as ut, nn as v, V as vn, ot as vt, rn as w, P as wn, Ve as wt, en as x, A as xn, Xe as xt, tn as y, z as yn, st as yt, Ft as z, S as zn, Ne as zt };
