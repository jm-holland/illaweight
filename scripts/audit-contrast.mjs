/**
 * Audit WCAG 2.1 des contrastes — illaWeightCss
 * usage : node audit-contrast.mjs [current|prop]
 */
const MODE = process.argv[2] ?? "current";
const pick = (prop, cur) => (MODE === "prop" ? prop : cur);

/* ---------- maths ---------- */
const hsl = (h, s, l) => {
  s /= 100; l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return { h, s, l: l * 100, rgb: [f(0), f(8), f(4)] };
};
const hslOf = c => c; // {h,s,l,rgb}
const hex = s => {
  const n = parseInt(s.replace("#", ""), 16);
  return hsl(0, 0, 0) && (() => {
    const r = [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
    return { rgb: r };
  })();
};
const lum = rgb => rgb.map(v => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  .reduce((acc, v, i) => acc + [0.2126, 0.7152, 0.0722][i] * v, 0);
const ratio = (fg, bg) => {
  const a = lum(fg.rgb ?? fg), b = lum(bg.rgb ?? bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
};
const rgbOf = c => c.rgb;
/** rgba(c, a) posé sur fond opaque */
const blend = (src, a, bgc) => ({
  rgb: rgbOf(src).map((v, i) => v * a + rgbOf(bgc)[i] * (1 - a)),
});
/** color.scale($lightness: pct%) — déplacement % vers la borne 0 (pct<0) ou 100 */
const scaleL = (c, pct) =>
  hsl(c.h, c.s, c.l === undefined ? 0 : pct < 0 ? c.l * (1 + pct / 100) : c.l + ((100 - c.l) * pct) / 100);
const cStr = c => c.h !== undefined
  ? `hsl(${c.h},${c.s}%,${Math.round(c.l * 10) / 10}%)`
  : `rgb(${c.rgb.map(v => Math.round(v * 255)).join(",")})`;

/* ---------- palettes ---------- */
const cur = {
  gray: [0, 15, 30, 45, 75, 86, 91, 94, 100].map(l => hsl(0, 0, l)),
  bgLight: hex("#fafafa"), bgDark: hex("#282828"),
  primary: hsl(203, 96, 48), primaryF: hsl(203, 87, 61),
  secondary: hsl(0, 0, 30), secondaryF: hsl(0, 0, 45),
  success: hsl(186, 96, 38), successF: hsl(186, 98, 50),
  danger: hsl(28, 87, 59), dangerF: hsl(28, 77, 67),
  error: hsl(332, 90, 50), errorF: hsl(332, 88, 67),
  link: hsl(186, 96, 38), visited: hsl(210, 66, 47),
  linkActive: hsl(332, 90, 50), linkFocus: hsl(210, 66, 52),
  highlight: hsl(191, 97, 85), border: hsl(0, 0, 71), white: hsl(0, 0, 100),
};
const prop = {
  gray: cur.gray,
  bgLight: hex("#fafafa"), bgDark: hex("#282828"),
  primary: hsl(203, 96, 45), primaryF: hsl(203, 87, 61),
  secondary: hsl(0, 0, 30), secondaryF: hsl(0, 0, 45),
  success: hsl(186, 96, 38), successF: hsl(186, 96, 62),
  danger: hsl(28, 87, 44), dangerF: hsl(28, 77, 67),
  error: hsl(332, 90, 44), errorF: hsl(332, 88, 67),
  link: hsl(186, 96, 38), visited: hsl(210, 66, 42),
  linkActive: hsl(332, 90, 44), linkFocus: hsl(210, 66, 33),
  highlight: hsl(191, 97, 85), border: hsl(0, 0, 56), white: hsl(0, 0, 100),
};
const P = {};
for (const k of Object.keys(cur)) P[k] = pick(prop[k], cur[k]);
const G = i => P.gray[i];

/* ---------- runtime par thème ---------- */
function theme(dark) {
  const g = dark ? [G(8), G(7), G(6), G(5), G(4), G(3), G(2), G(1), G(0)] : P.gray;
  return {
    dark, bg: dark ? P.bgDark : P.bgLight, gray: g,
    primary: dark ? P.primaryF : P.primary,
    secondary: P.secondary, secondaryF: P.secondaryF,
    success: dark ? P.successF : P.success,
    danger: dark ? P.dangerF : P.danger,
    error: dark ? P.errorF : P.error,
    link: P.link, visited: P.visited, linkActive: P.linkActive, linkFocus: P.linkFocus,
    highlight: P.highlight, border: P.border,
  };
}

/* ---------- audit ---------- */
const rows = [];
function check(name, cat, fg, bg, target, note) {
  const r = ratio(fg, bg);
  rows.push({ name, cat, target, ratio: r, note, bgColor: cStr(bg), fgColor: cStr(fg) });
}
for (const th of [theme(false), theme(true)]) {
  const t = th.dark ? "dark " : "light";
  const bg = th.bg;
  const c45 = 4.5;
  check(`${t}| body (gray-1)`, "texte", th.gray[1], bg, c45);
  check(`${t}| headings (gray-0)`, "texte", th.gray[0], bg, c45);
  check(`${t}| lien`, "texte", th.link, bg, c45);
  check(`${t}| lien visited`, "texte", th.visited, bg, c45);
  check(`${t}| lien active`, "texte", th.linkActive, bg, c45);
  check(`${t}| lien focus`, "texte", th.linkFocus, bg, c45);
  check(`${t}| .text-primary`, "texte", th.primary, bg, c45);
  check(`${t}| .text-secondary`, "texte", th.secondary, bg, c45);
  check(`${t}| .text-success`, "texte", th.success, bg, c45);
  check(`${t}| .text-warning (danger)`, "texte", th.danger, bg, c45);
  check(`${t}| .text-error`, "texte", th.error, bg, c45);
  check(`${t}| .text-muted`, "texte", th.gray[6], bg, c45);
  for (const [n, c] of [["primary", th.primary], ["secondary", th.secondary],
    ["success", th.success], ["warning", th.danger], ["error", th.error]])
    check(`${t}| badge/${n} (blanc)`, "texte", P.white, c, c45);
  check(`${t}| badge/muted (blanc sur gray-6)`, "texte", P.white, th.gray[6], c45);
  check(`${t}| skip-link / pag.active (blanc sur primary)`, "texte", P.white, th.primary, c45);
  check(`${t}| bouton primary (blanc, statique)`, "texte", P.white, P.primary, c45);
  check(`${t}| bouton primary:hover (static −28%)`, "texte", P.white, scaleL(P.primary, -28), c45);
  check(`${t}| bouton secondary (blanc, statique)`, "texte", P.white, P.secondary, c45);
  check(`${t}| bouton success (blanc, statique)`, "texte", P.white, P.success, c45);
  check(`${t}| bouton warning (blanc, statique)`, "texte", P.white, P.danger, c45);
  check(`${t}| bouton error (blanc, statique)`, "texte", P.white, P.error, c45);
  check(`${t}| mark (gray-1 sur highlight)`, "texte", th.gray[1], th.highlight, c45);
  for (const [n, base] of [["primary", P.primary], ["success", P.success],
    ["warning", P.danger], ["error", P.error]]) {
    const acc = scaleL(base, -40);           // color.scale($lightness, -40%)
    const bgAlert = blend(base, 0.8, bg);    // rgba($color, .8) sur la page
    const bgIcon = acc;                      // l'icône utilise l'accent opaque
    check(`${t}| alert-${n} .text-1 (accent 21px gras)`, "texte", acc, bgAlert, 3);
    check(`${t}| alert-${n} .text-2 (gray-1)`, "texte", th.gray[1], bgAlert, c45);
    check(`${t}| alert-${n} icône (blanc sur accent)`, "texte", P.white, bgIcon, c45);
  }
  /* non-textuel 3:1 */
  check(`${t}| bordures (input/pagination)`, "UI", th.border, bg, 3);
  check(`${t}| scrollbar (primary)`, "UI", th.primary, bg, 3);
  /* exemptés */
  check(`${t}| pagination.disabled (gray-5)`, "info", th.gray[5], bg, null, "disabled → exempt");
}

/* ---------- rapport ---------- */
const grp = cat => rows.filter(r => r.cat === cat);
let fail = 0;
console.log(MODE === "prop" ? "PROPOSITION — WCAG 2.1 AA\n" : "ÉTAT ACTUEL — WCAG 2.1 AA\n");
for (const [cat, ttl] of [["texte", "Texte"], ["UI", "Non-textuel"], ["info", "Infos (exemptés)"]]) {
  fail += grp(cat).filter(r => r.ratio < r.target).length;
  if (cat === "info") continue;
  console.log(`── ${ttl} ──`);
  console.table(grp(cat).map(r => ({
    context: r.name, cible: r.target, ratio: r.ratio.toFixed(2),
    verdict: r.ratio >= r.target ? "PASS ✅" : "FAIL ❌",
    note: r.note ?? "",
  })));
}
console.log("── Infos (exemptés) ──");
console.table(grp("info").map(r => ({ context: r.name, ratio: r.ratio.toFixed(2), note: r.note ?? "" })));
