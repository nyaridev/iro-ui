// src/effects/backdrop/glsl/layer.ts
var e = [
	"var(--iro-glow-1)",
	"var(--iro-glow-2)",
	"var(--iro-glow-3)"
], t = {
	colors: e,
	settings: {
		height: [
			1,
			.3,
			2.5
		],
		rays: [
			1,
			0,
			1
		],
		curtains: [
			3,
			1,
			3
		]
	},
	glsl: "\nvec4 aurora(vec2 px, vec2 size) {\n  vec2 uv = px / size;\n  // Wider windows show more of the sky instead of stretching it.\n  float x = uv.x * (1.0 + size.x / 900.0);\n  float now = aurora_time;\n  vec3 light = vec3(0.0);\n  float amount = 0.0;\n  for (int i = 0; i < 3; i++) {\n    float layer = float(i);\n    if (layer >= aurora_curtains) break;\n    float depth = 1.0 - layer * 0.32;\n    float t = now * (0.045 - layer * 0.01);\n    float xs = x * (1.0 + layer * 0.4) + layer * 3.7;\n    float edge = (0.34 + layer * 0.06) * aurora_height\n      + (fbm(vec2(xs * 0.9 + t, layer * 7.3)) - 0.5) * 0.34\n      + 0.07 * sin(xs * 1.7 + now * 0.1 + layer * 2.0)\n      + 0.02 * sin(xs * 5.3 - now * 0.2 + layer);\n    float up = edge - uv.y;\n    // Rays: two widths of soft vertical streaks that bend and drift.\n    float bend = 1.2 * fbm(vec2(xs * 2.5, now * 0.03 + layer));\n    float rays = 0.6 * noise(vec2(xs * 22.0 + bend, up * 1.5 + now * 0.08 + layer * 5.0))\n      + 0.4 * noise(vec2(xs * 55.0 + bend * 2.0, up * 3.0 - now * 0.05));\n    rays = mix(1.0, smoothstep(0.2, 0.85, rays), aurora_rays);\n    // The curtain starts just above its edge, softly, so it has no hard line; smooth curtains (no rays) softer still.\n    float above = smoothstep(-mix(0.07, 0.03, aurora_rays), 0.012, up);\n    float curtain = above * exp(-max(up, 0.0) * (3.6 + layer * 1.6) / aurora_height) * (0.3 + 0.7 * rays);\n    // The lower edge: a thin bright seam with a soft glow just under it.\n    float seam = exp(-up * up * 1400.0) * (0.6 + 0.4 * rays) + exp(min(up, 0.0) * 40.0) * 0.25 * (1.0 - above);\n    // Folds: a wave with a noisy phase, so a few always show wherever the noise is.\n    float phase = 4.0 * fbm(vec2(xs * 0.5 - t * 1.4, layer * 3.1 + 9.0));\n    float fold = smoothstep(0.1, 0.9, 0.5 + 0.5 * sin(xs * 2.6 + phase + t * 2.0));\n    // On light backgrounds the seam would read as an ink line, so it stays soft there.\n    float glow = (curtain + seam * fold * mix(0.45, 1.0, dark)) * (0.04 + 0.96 * fold) * depth;\n    // The colors climb with the curtain, so taller curtains keep the same bands.\n    float rise = up / aurora_height;\n    vec3 tint = mix(aurora_c2, aurora_c1, smoothstep(0.02, 0.2, rise));\n    tint = mix(tint, aurora_c3, smoothstep(0.16, 0.42, rise) * 0.45);\n    // The seam burns paler on dark backgrounds.\n    tint = mix(tint, vec3(1.0), dark * 0.45 * exp(-up * up * 2500.0));\n    light += tint * glow;\n    amount += glow;\n  }\n  // A faint wash of sky behind the curtains.\n  float haze = exp(-uv.y * 3.5 / aurora_height) * 0.14;\n  light += mix(aurora_c1, aurora_c2, uv.x) * haze;\n  amount += haze;\n  // Fades out toward the bottom; hung lower, the fade starts lower, but always before the bottom edge.\n  float fade = 1.0 - smoothstep(min(0.55 * aurora_height, 0.9), 1.02, uv.y);\n  float a = (1.0 - exp(-amount * mix(0.6, 1.4, dark))) * fade;\n  return vec4(light / max(amount, 1e-4) * a, a);\n}"
}, n = {
	colors: [
		"var(--iro-accent)",
		"var(--iro-glow-2)",
		"var(--iro-glow-3)"
	],
	settings: {
		density: [
			1,
			.3,
			3
		],
		scale: [
			1,
			.3,
			4
		],
		width: [
			1,
			.3,
			4
		]
	},
	glsl: "\nvec4 contours(vec2 px, vec2 size) {\n  vec2 p = px / (280.0 * contours_scale);\n  float t = contours_time * 0.012;\n  vec2 warp = vec2(fbm(p * 0.6 + vec2(t, 0.0)), fbm(p * 0.6 + vec2(3.1, -t))) - 0.5;\n  float h = fbm(p + warp * 0.9 + vec2(-t * 0.5, t * 0.3));\n  float levels = h * 42.0 * contours_density;\n  // Distance to the nearest contour, in canvas pixels.\n  float spacing = max(fwidth(levels), 1e-4);\n  float dist = min(fract(levels), 1.0 - fract(levels)) / spacing;\n  float major = 1.0 - step(0.5, mod(floor(levels + 0.5), 5.0));\n  float width = mix(0.5, 0.9, major) * contours_width * scale;\n  float line = 1.0 - smoothstep(width - 0.6, width + 0.6, dist);\n  // Where lines crowd under about three pixels apart, each would shimmer; they blend into the tone they'd average to\n  // instead, so none drops out.\n  float crowd = smoothstep(0.3, 0.6, spacing);\n  line = mix(line, min(2.0 * width * spacing, 1.0), crowd);\n  float glow = exp(-dist * dist / (20.0 * scale * scale)) * major * dark * 0.1 * (1.0 - crowd);\n\n  vec3 tint = mix(contours_c1, contours_c2, (1.0 - smoothstep(0.25, 0.45, h)) * 0.55);\n  tint = mix(tint, contours_c3, smoothstep(0.6, 0.8, h) * 0.5);\n  tint = mix(tint, vec3(1.0), dark * 0.15);\n  float a = min(line * mix(0.26, 0.5, mix(major, 0.2, crowd)) + glow, 1.0);\n  // A faint wash by height between the lines, so the hills read.\n  float wash = smoothstep(0.35, 0.75, h) * mix(0.03, 0.05, dark);\n  return over(vec4(tint * a, a), vec4(tint * wash, wash));\n}"
}, r = {
	colors: e,
	settings: {
		count: [
			1,
			0,
			3
		],
		size: [
			1,
			.3,
			3
		],
		shafts: [
			1,
			0,
			3
		]
	},
	glsl: "\n/** How much window light falls at px: soft diagonal shafts, fading away from the top left. */\nfloat dustShafts(vec2 px, vec2 size) {\n  vec2 along = normalize(vec2(1.0, 0.6));\n  float across = dot(px, vec2(-along.y, along.x));\n  float shaft = smoothstep(0.3, 0.8, noise(vec2(across / 70.0, dust_time * 0.025)));\n  shaft *= 0.6 + 0.4 * noise(vec2(across / 23.0 + 9.0, dust_time * 0.04));\n  return shaft * exp(-dot(px, along) / max(size.x, size.y) * 1.1) * dust_shafts;\n}\n\nvec4 dust(vec2 px, vec2 size) {\n  float now = dust_time;\n  float shafts = dustShafts(px, size);\n  vec3 sun = mix(dust_c3, vec3(1.0), 0.55);\n  float beam = min(shafts * mix(0.1, 0.15, dark), 1.0);\n  vec4 color = vec4(sun * beam, beam);\n\n  // Far to near, so the near specks lie on top.\n  for (int i = 0; i < 3; i++) {\n    float layer = float(i);\n    float near = layer / 2.0;\n    float radius = mix(1.1, 13.0, near * near) * dust_size;\n    float cell = mix(30.0, 96.0, near) * max(1.0, dust_size);\n    vec2 q = px + vec2(sin(now * 0.07 + layer) * 14.0, now * mix(3.0, 9.0, near));\n    q += (vec2(noise(q / 180.0 + now * 0.05), noise(q / 180.0 + 7.3 - now * 0.05)) - 0.5) * 24.0;\n    vec2 id = floor(q / cell);\n    float seed = hash(id + layer * 31.0);\n    vec2 spot = (0.5 + (vec2(hash(id + 1.3), hash(id + 7.7)) - 0.5) * max(1.0 - 2.4 * radius / cell, 0.0)) * cell;\n    float d = length(q - id * cell - spot);\n    float r = radius * (0.7 + 0.6 * hash(id + 3.9));\n    float soft = mix(0.7, r * 0.3, near);\n    float disc = 1.0 - smoothstep(r - soft, r + soft, d);\n    float rim = near * exp(-pow((d - r * 0.85) / max(r * 0.12, 0.5), 2.0)) * 0.3;\n    float twinkle = 0.55 + 0.45 * sin(now * (0.7 + seed * 1.8) + seed * 40.0);\n    // A share of the cells hold a speck: fewer near, and the count setting scales the share.\n    float shown = step(1.0 - (1.0 - mix(0.55, 0.72, near)) * dust_count, seed);\n    float a = (disc * (1.0 - near * 0.4) + rim * disc) * shown * twinkle * (0.3 + 1.4 * shafts) * mix(0.28, 0.75, dark);\n    a = min(a, 1.0);\n    // Pale motes on dark backgrounds; on light ones, soft grey-tinted specks rather than colored confetti.\n    vec3 tint = mix(dust_c3, dust_c1, hash(id + 2.2));\n    tint = mix(mix(tint, muted, 0.45), mix(tint, vec3(1.0), 0.5), dark);\n    color = over(vec4(tint * a, a), color);\n  }\n  return color;\n}"
}, i = {
	colors: e,
	settings: {
		gap: [
			22,
			8,
			80
		],
		size: [
			1,
			.3,
			3
		],
		reach: [
			150,
			40,
			600
		],
		lens: [
			1,
			0,
			2
		]
	},
	glsl: "\nvec4 grid(vec2 px, vec2 size) {\n  float reach = grid_reach;\n  vec2 d = px - pointer.xy;\n  float lens = exp(-dot(d, d) / (reach * reach)) * pointer.z;\n  // Sampling nearer the pointer magnifies the dots there.\n  vec2 s = px - d * 0.3 * lens * grid_lens;\n  vec2 cell = floor(s / grid_gap + 0.5);\n  float dist = length(s - cell * grid_gap);\n\n  float radius = mix(0.9, 1.9, lens) * grid_size;\n  float soft = 0.75 / scale;\n  float dotShape = 1.0 - smoothstep(radius - soft, radius + soft, dist);\n  float halo = exp(-dist * dist / (14.0 * grid_size * grid_size)) * lens * 0.45;\n\n  vec2 uv = px / size;\n  float edges = smoothstep(0.0, 0.14, uv.x) * smoothstep(0.0, 0.14, 1.0 - uv.x)\n    * smoothstep(0.0, 0.14, uv.y) * smoothstep(0.0, 0.14, 1.0 - uv.y);\n  float shimmer = 0.45 + 0.55 * smoothstep(0.25, 0.85, noise(cell * 0.11 + vec2(grid_time * 0.07, -grid_time * 0.05)));\n\n  vec3 hot = mix(grid_c1, grid_c2, smoothstep(-reach, reach, d.x));\n  hot = mix(hot, grid_c3, smoothstep(0.0, reach, -d.y) * 0.45);\n  vec3 tint = mix(muted, hot, smoothstep(0.0, 0.6, lens));\n  float a = min(dotShape * mix(0.42 * shimmer * edges, 1.0, lens) + halo, 1.0);\n  return vec4(tint * a, a);\n}"
}, a = {
	colors: e,
	settings: {
		scale: [
			1,
			.3,
			3
		],
		coverage: [
			.5,
			0,
			1
		]
	},
	glsl: "\nvec4 ink(vec2 px, vec2 size) {\n  vec2 p = px / max(size.x, size.y) * 2.4 / ink_scale;\n  float t = ink_time * 0.022;\n  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));\n  vec2 r = vec2(fbm(p + 2.0 * q + vec2(1.7, 9.2) + 0.5 * t), fbm(p + 2.0 * q + vec2(8.3, 2.8) - 0.4 * t));\n  float f = fbm(p + 2.2 * r);\n\n  // The waterline breathes, so pools spread and draw back.\n  float waterline = mix(0.7, 0.36, ink_coverage) + 0.035 * sin(ink_time * 0.06);\n  float pool = smoothstep(waterline, waterline + 0.12, f);\n  float rim = smoothstep(waterline - 0.015, waterline + 0.01, f) * (1.0 - smoothstep(waterline + 0.01, waterline + 0.07, f));\n  // Deeper in a pool the pigment thins out again, as a wash does.\n  float body = pool * (0.75 - 0.35 * smoothstep(waterline + 0.12, waterline + 0.3, f));\n  float granules = 0.78 + 0.44 * noise(px / 2.4) * noise(px / 9.0 + 3.0);\n  float density = (body + rim * 0.7) * granules;\n\n  vec3 pigment = mix(fg, ink_c1, 0.28);\n  float a = min(density * mix(0.34, 0.24, dark), 1.0);\n  float side = smoothstep(0.52, 0.72, r.y) * (1.0 - pool) * mix(0.14, 0.12, dark) * granules;\n  return over(vec4(pigment * a, a), vec4(ink_c2 * side, side));\n}"
}, o = {
	colors: e,
	settings: { scale: [
		1,
		.4,
		3
	] },
	glsl: "\nvec3 toOklab(vec3 c) {\n  c = pow(c, vec3(2.2));\n  vec3 lms = mat3(0.4122, 0.2119, 0.0883, 0.5363, 0.6807, 0.2817, 0.0514, 0.1074, 0.6300) * c;\n  lms = pow(max(lms, 0.0), vec3(1.0 / 3.0));\n  return mat3(0.2105, 1.9780, 0.0259, 0.7936, -2.4286, 0.7828, -0.0041, 0.4506, -0.8087) * lms;\n}\n\nvec3 fromOklab(vec3 lab) {\n  vec3 lms = mat3(1.0, 1.0, 1.0, 0.3963, -0.1056, -0.0895, 0.2158, -0.0639, -1.2915) * lab;\n  lms = lms * lms * lms;\n  vec3 c = mat3(4.0767, -1.2684, -0.0042, -3.3077, 2.6098, -0.7034, 0.2310, -0.3413, 1.7076) * lms;\n  return pow(clamp(c, 0.0, 1.0), vec3(1.0 / 2.2));\n}\n\n/** How much of a point shows at squared distance d2: wide and soft, so the colors meet in long gradients. */\nfloat meshWeight(float d2, float reach) { return exp(-d2 / (reach * mesh_scale * mesh_scale)); }\n\nvec4 mesh(vec2 px, vec2 size) {\n  float aspect = size.x / size.y;\n  vec2 p = px / size;\n  p.x *= aspect;\n  float t = mesh_time * 0.06;\n  vec2 n = p / mesh_scale;\n  vec2 warp = vec2(fbm(n * 1.1 + vec2(t, -t * 0.7)), fbm(n * 1.1 + vec2(-t * 0.8, t) + 5.2)) - 0.5;\n  p += warp * 0.3 * mesh_scale;\n\n  vec2 a = vec2(aspect * (0.18 + 0.16 * sin(t * 1.10)), 0.20 + 0.14 * cos(t * 0.90));\n  vec2 b = vec2(aspect * (0.84 + 0.12 * cos(t * 0.80 + 1.3)), 0.82 + 0.12 * sin(t * 1.20 + 0.4));\n  vec2 c = vec2(aspect * (0.82 + 0.14 * sin(t * 0.70 + 2.1)), 0.16 + 0.12 * cos(t * 1.00 + 2.7));\n  vec2 d = vec2(aspect * (0.20 + 0.14 * cos(t * 0.95 + 4.0)), 0.86 + 0.10 * sin(t * 0.75 + 1.9));\n  float wa = meshWeight(dot(p - a, p - a), 0.22);\n  float wb = meshWeight(dot(p - b, p - b), 0.2);\n  float wc = meshWeight(dot(p - c, p - c), 0.07);\n  float wd = meshWeight(dot(p - d, p - d), 0.16);\n\n  // The background carries a steady share, so the colors float in it instead of filling every corner.\n  float strength = mix(0.5, 0.7, dark);\n  vec3 lab = toOklab(bg) * 0.35;\n  lab += toOklab(mix(bg, mesh_c1, strength)) * wa;\n  lab += toOklab(mix(bg, mesh_c2, strength * 0.85)) * wb;\n  // The third color is often a warm one that turns olive when dimmed, so it's a small, bright spot instead.\n  lab += toOklab(mix(bg, mesh_c3, min(strength * 1.15, 0.85))) * wc;\n  lab += toOklab(mix(bg, mix(mesh_c1, mesh_c2, 0.5), strength * 0.7)) * wd;\n  lab /= 0.35 + wa + wb + wc + wd;\n\n  // Folds of light and shade, drifting with the warp.\n  float fold = smoothstep(0.25, 0.75, fbm(n * 1.2 + warp * 1.5 + vec2(t * 0.5, -t * 0.3)));\n  lab.x *= 1.0 + mix(0.05, 0.12, dark) * (fold - 0.5);\n  return vec4(fromOklab(lab), 1.0);\n}"
}, s = {
	colors: [
		"rgb(255 240 209)",
		"var(--iro-glow-2)",
		"var(--iro-glow-3)"
	],
	settings: {
		animated: [
			0,
			0,
			1
		],
		fibers: [
			1,
			0,
			3
		],
		warmth: [
			1,
			0,
			3
		]
	},
	glsl: "\nfloat paperHeight(vec2 px) {\n  float tooth = 0.6 * noise(px / 1.7) + 0.4 * noise(px / 4.1 + 11.0);\n  float fibers = 0.0;\n  for (int i = 0; i < 3; i++) {\n    // Each set of fibers turns slowly across the sheet, so no direction lines up into a hatch.\n    float angle = float(i) * 2.1 + 0.4 + 2.5 * (noise(px / 260.0 + float(i) * 13.0) - 0.5);\n    vec2 q = mat2(cos(angle), sin(angle), -sin(angle), cos(angle)) * px;\n    float strand = noise(vec2(q.x / 46.0, q.y / 1.3) + float(i) * 17.0);\n    // Strands show in patches, as fibers do; more fibers widen the patches.\n    float patches = smoothstep(0.85 - 0.3 * min(paper_fibers, 2.0), 0.95, noise(q / 34.0 + float(i) * 5.0));\n    fibers += (1.0 - smoothstep(0.0, 0.05, abs(strand - 0.5))) * patches;\n  }\n  float pulp = fbm(px / 110.0);\n  return tooth * 0.4 + fibers * 0.3 * paper_fibers + pulp * 1.6;\n}\n\nvec4 paper(vec2 px, vec2 size) {\n  float h = paperHeight(px);\n  vec2 slope = vec2(paperHeight(px + vec2(0.7, 0.0)), paperHeight(px + vec2(0.0, 0.7))) - h;\n  // The light comes from the top left; animated, it sways around that.\n  float angle = 0.785 + paper_animated * 0.7 * sin(paper_time * 0.12);\n  vec2 toward = vec2(cos(angle), sin(angle)) * 1.414;\n  float lit = clamp(-dot(slope, toward) * 1.6, -1.0, 1.0);\n  float mottle = (fbm(px / 70.0 + 4.0 + paper_animated * vec2(paper_time * 0.01, 0.0)) - 0.5) * 0.35;\n  float shade = lit + mottle;\n  float strength = mix(0.1, 0.08, dark);\n  vec4 color = shade > 0.0 ? vec4(vec3(1.0), 1.0) * shade * strength : vec4(0.0, 0.0, 0.0, 1.0) * -shade * strength * 1.3;\n  // A warm sheet on light backgrounds.\n  float warm = min((1.0 - dark) * 0.07 * paper_warmth, 1.0);\n  return over(color, vec4(paper_c1 * warm, warm));\n}"
}, c = {
	colors: e,
	settings: {
		size: [
			1,
			.3,
			3
		],
		specks: [
			1,
			0,
			3
		]
	},
	glsl: "\nvec4 spotlight(vec2 px, vec2 size) {\n  float on = pointer.z;\n  if (on < 0.002) return vec4(0.0);\n  float now = spotlight_time;\n  vec2 d = (px - pointer.xy) / spotlight_size;\n  float speed = length(drift);\n  if (speed > 1.0) {\n    vec2 way = drift / speed;\n    float along = dot(d, way);\n    d = d - way * along + way * along / (1.0 + min(speed / 1400.0, 0.7));\n  }\n  float r2 = dot(d, d);\n  float core = exp(-r2 / 3600.0);\n  float halo = exp(-r2 / 30000.0);\n\n  vec2 q = px / 220.0;\n  float flow = fbm(q + vec2(now * 0.05, -now * 0.035));\n  float flow2 = fbm(q * 1.6 - vec2(now * 0.04, 0.0) + 3.0);\n  vec3 tint = mix(spotlight_c1, spotlight_c2, smoothstep(0.32, 0.68, flow));\n  tint = mix(tint, spotlight_c3, smoothstep(0.55, 0.85, flow2) * 0.55);\n  tint = mix(tint, vec3(1.0), core * 0.3 * dark);\n\n  // Dust: one speck in some 16 px cells, drifting up and twinkling, seen only where the light falls.\n  vec2 drifting = px + vec2(sin(now * 0.3) * 6.0, now * 9.0);\n  vec2 cell = floor(drifting / 16.0);\n  float seed = hash(cell);\n  vec2 spot = (cell + 0.25 + 0.5 * vec2(hash(cell + 7.1), hash(cell + 3.3))) * 16.0;\n  float speck = step(0.86, seed) * exp(-dot(drifting - spot, drifting - spot) / 1.2)\n    * (0.5 + 0.5 * sin(now * 2.5 + seed * 60.0)) * halo * spotlight_specks;\n\n  float a = (halo * mix(0.26, 0.38, dark) * (0.7 + 0.6 * flow) + core * 0.22) * on;\n  vec3 color = tint * a + mix(spotlight_c3, vec3(1.0), 0.6) * speck * mix(0.5, 0.9, dark) * on;\n  a = min(a + speck * 0.5 * on, 1.0);\n  return vec4(min(color, vec3(a)), a);\n}"
}, l = null;
function u(e) {
	if (l ??= document.createElement("canvas").getContext("2d", { willReadFrequently: !0 }), !l) return [
		0,
		0,
		0,
		0
	];
	l.clearRect(0, 0, 1, 1), l.fillStyle = "transparent", l.fillStyle = e, l.fillRect(0, 0, 1, 1);
	let [t, n, r, i] = l.getImageData(0, 0, 1, 1).data;
	return [
		t,
		n,
		r,
		i / 255
	];
}
function d(e, t) {
	let n = document.createElement("span");
	n.style.color = t, n.style.display = "none", e.appendChild(n);
	let [r, i, a] = u(getComputedStyle(n).color);
	return n.remove(), [
		r,
		i,
		a
	];
}
var f = ([e, t, n], r = 1) => `rgb(${e} ${t} ${n} / ${r})`;
// src/effects/motion.ts
function p(e) {
	let t = e?.closest("[data-iro-style]")?.getAttribute("data-iro-motion");
	return t === "full" || t === "smooth" || t === "reduced" || t === "off" ? t : window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "reduced" : "full";
}
// src/effects/backdrop/shader.ts
var m = "#version 300 es\nin vec2 position;\nvoid main() { gl_Position = vec4(position, 0.0, 1.0); }", h = "\nfloat hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }\n\nfloat noise(vec2 p) {\n  vec2 i = floor(p);\n  vec2 f = fract(p);\n  vec2 u = f * f * (3.0 - 2.0 * f);\n  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),\n             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);\n}\n\nfloat fbm(vec2 p) {\n  float value = 0.0;\n  float amplitude = 0.5;\n  for (int i = 0; i < 4; i++) {\n    value += amplitude * noise(p);\n    p = p * 2.03 + vec2(1.7, 9.2);\n    amplitude *= 0.5;\n  }\n  return value;\n}", g = {
	full: 1,
	smooth: .6,
	reduced: 0,
	off: 0
}, _ = 40 + Math.random() * 40;
function v(e, t, n) {
	let r = e.createShader(t);
	return r ? (e.shaderSource(r, n), e.compileShader(r), r) : null;
}
function y(e, t, n, r) {
	let { density: i, pointer: a } = r;
	e.useProgram(t);
	let o = e.createBuffer();
	e.bindBuffer(e.ARRAY_BUFFER, o), e.bufferData(e.ARRAY_BUFFER, new Float32Array([
		-1,
		-1,
		3,
		-1,
		-1,
		3
	]), e.STATIC_DRAW);
	let s = e.getAttribLocation(t, "position");
	e.enableVertexAttribArray(s), e.vertexAttribPointer(s, 2, e.FLOAT, !1, 0, 0);
	let c = /* @__PURE__ */ new Map(), l = (n) => (c.has(n) || c.set(n, e.getUniformLocation(t, n)), c.get(n) ?? null), u = {
		x: 0,
		y: 0,
		on: 0,
		vx: 0,
		vy: 0
	}, f = _, m = performance.now(), h = 0, v = 0, y = () => {
		e.uniform1f(l("time"), f);
		for (let [t, n] of Object.entries(r.values ?? {})) e.uniform1f(l(t), n);
		e.drawArrays(e.TRIANGLES, 0, 3);
	}, b = (t) => {
		if (!a) return !1;
		let n = +!!a.inside;
		u.on < .01 && n && Object.assign(u, {
			x: a.x,
			y: a.y,
			vx: 0,
			vy: 0
		});
		let r = 1 - Math.exp(-t * 12), i = (a.x - u.x) * r, o = (a.y - u.y) * r;
		u.x += i, u.y += o;
		let s = 1 - Math.exp(-t * 8);
		return u.vx += (i / Math.max(t, .001) - u.vx) * s, u.vy += (o / Math.max(t, .001) - u.vy) * s, u.on += (n - u.on) * (1 - Math.exp(-t * 5)), e.uniform4f(l("pointer"), u.x, u.y, u.on, 0), e.uniform2f(l("drift"), u.vx, u.vy), n === 1 || u.on > .003;
	}, x = () => {
		let t = n.parentElement ?? n;
		for (let [n, i] of Object.entries(r.colors)) {
			let r = d(t, i);
			e.uniform3f(l(n), r[0] / 255, r[1] / 255, r[2] / 255);
		}
		let [i, a, o] = d(t, "var(--iro-bg)");
		e.uniform1f(l("dark"), +(.2126 * i + .7152 * a + .0722 * o < 128)), y();
	}, S = () => {
		let t = i * (devicePixelRatio || 1);
		n.width = Math.max(1, Math.round(n.clientWidth * t)), n.height = Math.max(1, Math.round(n.clientHeight * t)), e.viewport(0, 0, n.width, n.height), e.uniform2f(l("resolution"), n.width, n.height), e.uniform1f(l("scale"), n.width / Math.max(1, n.clientWidth)), y();
	}, C = (e) => {
		v = requestAnimationFrame(C);
		let t = Math.min((e - m) / 1e3, .1);
		m = e;
		let i = r.still ? 0 : g[p(n)];
		f += t * i * (r.speed ?? 1), r.tick?.(t * i);
		let a = b(t);
		!a && e - h < 33 || !a && i === 0 || (h = e, y());
	}, w = n.closest("[data-iro-style]"), T = new MutationObserver(() => requestAnimationFrame(x));
	w && T.observe(w, {
		attributes: !0,
		attributeFilter: [
			"data-iro-style",
			"data-iro-theme",
			"data-iro-accent"
		]
	});
	let E = matchMedia("(prefers-color-scheme: dark)");
	E.addEventListener("change", x);
	let D = new ResizeObserver(S);
	return D.observe(n), x(), S(), v = requestAnimationFrame(C), {
		stop: () => {
			cancelAnimationFrame(v), _ = f, T.disconnect(), D.disconnect(), E.removeEventListener("change", x), e.deleteBuffer(o);
		},
		refresh: x
	};
}
function b(e, t) {
	let n = e.getContext("webgl2", {
		antialias: !1,
		alpha: t.transparent ?? !1,
		premultipliedAlpha: !0,
		powerPreference: "low-power"
	}), r = n && v(n, n.VERTEX_SHADER, m), i = n && v(n, n.FRAGMENT_SHADER, t.fragment), a = n?.createProgram();
	if (!n || !r || !i || !a) return null;
	n.attachShader(a, r), n.attachShader(a, i), n.linkProgram(a);
	let o = n.getExtension("KHR_parallel_shader_compile"), s = 0, c = null, l = () => {
		o && !n.getProgramParameter(a, o.COMPLETION_STATUS_KHR) ? s = requestAnimationFrame(l) : n.getProgramParameter(a, n.LINK_STATUS) ? c = y(n, a, e, t) : e.remove();
	};
	return l(), {
		stop: () => {
			cancelAnimationFrame(s), c?.stop(), n.deleteProgram(a), n.deleteShader(r), n.deleteShader(i);
		},
		refresh: () => c?.refresh()
	};
}
// src/effects/backdrop/layers.ts
var x = {
	mesh: o,
	ink: a,
	paper: s,
	contours: n,
	aurora: t,
	dust: r,
	grid: i,
	spotlight: c
}, S = {
	speed: [
		1,
		0,
		4
	],
	intensity: [
		1,
		0,
		2
	]
}, C = [
	"grid",
	"contours",
	"paper"
], w = {
	bg: "var(--iro-bg)",
	fg: "var(--iro-fg)",
	muted: "var(--iro-fg-4)"
}, T = (e) => ({
	...S,
	...x[e].settings
});
function E(e, [t, n, r]) {
	let i = typeof e == "boolean" ? Number(e) : e;
	return typeof i == "number" && Number.isFinite(i) ? Math.min(r, Math.max(n, i)) : t;
}
var D = Object.keys(x);
Object.fromEntries(D.map((e) => [e, T(e)]));
function O(e, t, n) {
	let r = D.filter((e) => t[e]), i = {}, a = { ...w };
	for (let e of r) i[`${e}_time`] = 40 + Math.random() * 40;
	let o = {
		fragment: "",
		colors: a,
		values: i,
		density: r.some((e) => C.includes(e)) ? 1 : .5,
		transparent: !0,
		still: !1,
		pointer: n,
		tick: (e) => {
			for (let t of r) i[`${t}_time`] += e * i[`${t}_speed`];
		}
	}, s = (e) => {
		for (let t of r) {
			let n = typeof e[t] == "object" ? { ...e[t] } : {};
			for (let [e, r] of Object.entries(T(t))) i[`${t}_${e}`] = E(n[e], r);
			x[t].colors.forEach((e, r) => {
				a[`${t}_c${r + 1}`] = n.colors?.[r] ?? e;
			});
		}
		o.still = r.every((e) => i[`${e}_speed`] === 0 || e === "paper" && i.paper_animated === 0);
	};
	s(t), o.fragment = `#version 300 es
precision highp float;
uniform vec2 resolution;
uniform float scale;
uniform float time;
uniform float dark;
uniform vec4 pointer;
uniform vec2 drift;
${Object.keys(w).map((e) => `uniform vec3 ${e};`).join("\n")}
${r.map((e) => [
		`uniform float ${e}_time;`,
		...Object.keys(T(e)).map((t) => `uniform float ${e}_${t};`),
		...[
			1,
			2,
			3
		].map((t) => `uniform vec3 ${e}_c${t};`)
	].join("\n")).join("\n")}
out vec4 fragColor;
${h}

vec4 over(vec4 top, vec4 under) { return top + under * (1.0 - top.a); }

// A layer's color at a multiple of its strength, still a valid premultiplied color.
vec4 tone(vec4 color, float amount) {
  color *= amount;
  float a = min(color.a, 1.0);
  return vec4(min(color.rgb, vec3(a)), a);
}
${r.map((e) => x[e].glsl).join("\n")}

void main() {
  vec2 size = resolution / scale;
  vec2 px = vec2(gl_FragCoord.x, resolution.y - gl_FragCoord.y) / scale;
  vec4 color = vec4(0.0);
  ${r.map((e) => `color = over(tone(${e}(px, size), ${e}_intensity), color);`).join("\n  ")}
  // A touch of noise keeps the long gradients from banding.
  color.rgb += (hash(gl_FragCoord.xy) - 0.5) / 255.0 * color.a;
  fragColor = color;
}`;
	let c = b(e, o);
	return c && {
		stop: c.stop,
		update: (e) => {
			s(e), c.refresh();
		}
	};
}
// src/effects/options.ts
function k(e, t, n, r) {
	return typeof e == "number" && Number.isFinite(e) ? Math.min(r, Math.max(n, e)) : t;
}
function A(e, t) {
	if (!e) return {
		x: t.left + t.width / 2,
		y: t.top + t.height / 2
	};
	if (!(e instanceof Element)) return e;
	let n = e.getBoundingClientRect();
	return {
		x: n.left + n.width / 2,
		y: n.top + n.height / 2
	};
}
// src/effects/backdrop/liquid.ts
var j = `#version 300 es
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float liquid_intensity;
uniform vec3 colorA;
uniform vec3 colorB;
uniform vec3 colorC;
uniform vec3 colorD;
out vec4 fragColor;
${h}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.y * 1.3;
  float t = time * 0.06;
  vec2 q = vec2(fbm(uv + vec2(0.0, t)), fbm(uv + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(uv + 2.2 * q + vec2(1.7, 9.2) + 0.7 * t), fbm(uv + 2.2 * q + vec2(8.3, 2.8) - 0.6 * t));
  float f = fbm(uv + 2.4 * r);
  vec3 color = mix(colorA, colorB, smoothstep(0.25, 0.85, f));
  color = mix(color, colorC, smoothstep(0.45, 1.1, length(q)) * 0.85);
  color = mix(color, colorD, smoothstep(0.55, 0.95, r.x) * 0.6);
  fragColor = vec4(clamp(mix(colorA, color, liquid_intensity), 0.0, 1.0), 1.0);
}`, M = [
	76,
	87,
	91
];
function N(e, t = {}) {
	let n = {
		fragment: j,
		colors: {},
		values: {},
		density: .5,
		speed: 1
	}, r = (e) => {
		n.speed = k(e.speed, 1, 0, 4), n.values = { liquid_intensity: k(e.intensity, 1, 0, 2) }, n.colors = {
			colorA: "var(--iro-bg)",
			...Object.fromEntries(M.map((t, n) => [`color${"BCD"[n]}`, `color-mix(in oklab, var(--iro-bg) ${t}%, ${e.colors?.[n] ?? `var(--iro-glow-${n + 1})`})`]))
		};
	};
	r(t);
	let i = b(e, n);
	return i && {
		stop: i.stop,
		update: (e) => {
			r(e), i.refresh();
		}
	};
}
// src/effects/backdrop/pointer.ts
function P(e) {
	let t = (t) => {
		if (t.pointerType === "touch") return;
		let n = e.getBoundingClientRect();
		r.x = t.clientX - n.left, r.y = t.clientY - n.top;
		let i = p(e);
		r.inside = (i === "full" || i === "smooth") && r.x >= 0 && r.y >= 0 && r.x <= n.width && r.y <= n.height;
	}, n = (e) => {
		e.relatedTarget || (r.inside = !1);
	}, r = {
		x: 0,
		y: 0,
		inside: !1,
		stop: () => {
			window.removeEventListener("pointermove", t), document.removeEventListener("pointerout", n);
		}
	};
	return window.addEventListener("pointermove", t, { passive: !0 }), document.addEventListener("pointerout", n), r;
}
// src/effects/backdrop/backdrop.ts
var F = /* @__PURE__ */ new WeakMap();
function I(e, t, n = "div") {
	let r = document.createElement(n);
	return r.className = `iro-backdrop-${t}`, e.appendChild(r), r;
}
function L(e, t, n) {
	let r = I(e, t, "canvas"), i = n(r);
	return i || r.remove(), i;
}
var R = (e) => [e.liquid ? "liquid" : "", ...D.filter((t) => e[t])].join(" ");
function z(e) {
	F.get(e)?.stop(), F.delete(e);
}
function B(e, t = {}) {
	z(e), e.classList.add("iro-backdrop"), e.setAttribute("aria-hidden", "true"), I(e, "glows");
	let n = typeof t.liquid == "object" ? t.liquid : {}, r = t.liquid ? L(e, "liquid", (e) => N(e, n)) : null, i = t.spotlight || t.grid ? P(e) : void 0, a = R(t), o = D.some((e) => t[e]) ? L(e, "layers", (e) => O(e, t, i)) : null;
	return I(e, "grain"), I(e, "vignette"), F.set(e, {
		shape: a,
		liquid: r,
		layers: o,
		stop: () => {
			r?.stop(), o?.stop(), i?.stop(), e.replaceChildren(), e.classList.remove("iro-backdrop");
		}
	}), () => z(e);
}
function V(e, t) {
	let n = F.get(e);
	return !n || n.shape !== R(t) ? B(e, t) : (n.liquid?.update(typeof t.liquid == "object" ? t.liquid : {}), n.layers?.update(t), () => z(e));
}
export { p as a, d as c, A as i, V as n, f as o, k as r, u as s, B as t };
