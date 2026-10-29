/** Palette FINALE illaWeightCss AA — vérification exhaustive */
const hsl=(h,s,l)=>{s/=100;l/=100;const k=n=>(n+h/30)%12,a=s*Math.min(l,1-l);
 const f=n=>l-a*Math.max(-1,Math.min(k(n)-3,9-k(n),1));return {h,s,l:l*100,rgb:[f(0),f(8),f(4)]};};
const lum=c=>c.rgb.map(v=>v<=0.03928?v/12.92:((v+.055)/1.055)**2.4).reduce((a,v,i)=>a+[.2126,.7152,.0722][i]*v,0);
const ratio=(f,b)=>{const a=lum(f),b2=lum(b),h=Math.max(a,b2),l=Math.min(a,b2);return (h+.05)/(l+.05);};
const blend=(src,a,bg)=>({rgb:src.rgb.map((v,i)=>v*a+bg.rgb[i]*(1-a))});
const scaleL=(c,p)=>hsl(c.h,c.s,p<0?c.l*(1+p/100):c.l+(100-c.l)*p/100);
const n=c=>`hsl(${c.h},${c.s}%,${Math.round(c.l*10)/10}%)`;

/* palette finale */
const P={
 gray:[0,15,30,45,75,86,91,94,100].map(l=>hsl(0,0,l)),
 bgL:hsl(0,0,98),bgD:hsl(0,0,15.7),
 primary:hsl(203,96,38),primaryF:hsl(203,96,30),primaryD:hsl(203,96,50),primaryDF:hsl(203,96,56),
 secondary:hsl(0,0,30),secondaryF:hsl(0,0,45),
 success:hsl(186,96,27),successF:hsl(186,96,19),successD:hsl(186,96,37),successDF:hsl(186,96,45),
 danger:hsl(28,87,37),dangerF:hsl(28,87,29),dangerD:hsl(28,87,49),dangerDF:hsl(28,87,55),
 error:hsl(332,90,45),errorF:hsl(332,90,37),errorD:hsl(332,90,66),errorDF:hsl(332,90,66),
 link:hsl(186,96,27),linkD:hsl(186,96,37),
 visited:hsl(210,66,45),visitedD:hsl(210,66,60),
 active:hsl(332,90,45),activeD:hsl(332,90,66),
 linkFocus:hsl(210,66,45),linkFocusD:hsl(210,66,62),
 highlight:hsl(191,97,85),border:hsl(0,0,55),white:hsl(0,0,100),muted:hsl(0,0,45),
};
P.borderD=hsl(0,0,71);
const G=i=>P.gray[i];
const gray7Tex=hsl(0,0,13);
function theme(dark){
 return {dark,bg:dark?P.bgD:P.bgL,
  gray:dark?[G(8),G(7),G(6),G(5),G(4),G(3),G(2),G(1),G(0)]:P.gray,
  primary:dark?P.primaryD:P.primary,secondary:P.secondary,
  success:dark?P.successD:P.success,danger:dark?P.dangerD:P.danger,error:dark?P.errorD:P.error,
  link:dark?P.linkD:P.link,visited:dark?P.visitedD:P.visited,active:dark?P.activeD:P.active,linkFocus:dark?P.linkFocusD:P.linkFocus,
  highlight:P.highlight,border:dark?P.borderD:P.border,mutedSolid:P.muted};}
/* SOLIDES constants (blanc sur fond) */
const solids={primary:P.primary,success:P.success,warning:P.danger,error:P.error,
 secondary:P.secondary,muted:P.muted};
const rows=[];const chk=(ev,fg,bg,t)=>rows.push({ev,c:t,r:ratio(fg,bg),fg:n(fg),bg:n(bg)});
for(const th of [theme(false),theme(true)]){
 const t=th.dark?"sombre ":"clair ";const bg=th.bg;const C=4.5;
 chk(`${t}| body gray-1`,th.gray[1],bg,C);
 chk(`${t}| headings gray-0`,th.gray[0],bg,C);
 chk(`${t}| lien`,th.link,bg,C);chk(`${t}| lien visited`,th.visited,bg,C);
 chk(`${t}| lien actif`,th.active,bg,C);chk(`${t}| lien focus`,th.linkFocus,bg,C);
 chk(`${t}| .text-primary`,th.primary,bg,C);chk(`${t}| .text-secondary (gray-3)`,th.gray[3],bg,C);
 chk(`${t}| .text-success`,th.success,bg,C);chk(`${t}| .text-warning`,th.danger,bg,C);
 chk(`${t}| .text-error`,th.error,bg,C);chk(`${t}| .text-muted (gray-3)`,th.gray[3],bg,C);
 for(const[k,c]of Object.entries(solids))chk(`${t}| badge/${k} (blanc)`,P.white,c,C);
 chk(`${t}| skip-link/pag (blanc sur primary-solid)`,P.white,solids.primary,C);
 chk(`${t}| boutons statiques (blanc / $primary)`,P.white,P.primary,C);
 chk(`${t}| bouton primary en survol (−28%)`,P.white,scaleL(P.primary,-28),C);
 chk(`${t}| bouton success (blanc)`,P.white,P.success,C);
 chk(`${t}| bouton warning (blanc)`,P.white,P.danger,C);
 chk(`${t}| bouton error (blanc)`,P.white,P.error,C);
 chk(`${t}| bouton secondary (blanc \$gray-3)`,P.white,th.gray?hsl(0,0,45):hsl(0,0,45),C);
 chk(`${t}| mark (link-text noir sur highlight)`,P.gray[0],th.highlight,C);
 chk(`${t}| navigation a (gray-2)`,th.gray[2],bg,C);
 chk(`${t}| nav en survol (primary)`,th.primary,bg,C);
 for(const[nm,base]of[["primary",P.primary],["success",P.success],["warning",P.danger],["error",P.error]]){
  const acc=scaleL(base,-40),panel=blend(base,0.8,bg);
  chk(`${t}| alert-${nm} titre (gray-0 sur panneau)`,th.gray[0],panel,C);
  chk(`${t}| alert-${nm} texte (gray-0 sur panneau)`,th.gray[0],panel,C);
  chk(`${t}| alert-${nm} icône (blanc sur accent)`,P.white,acc,C);
 }
 chk(`${t}| bordures (≥3:1)`,th.border,bg,3);
 chk(`${t}| pagination.disabled (INFO)`,th.gray[5],bg,null);
}
let f=0;
console.table(rows.filter(r=>r.c).map(x=>({contexte:x.ev,cible:x.c,ratio:x.r.toFixed(2),
 verdict:x.r>=x.c?"PASS ✅":"FAIL ❌"})).filter(r=>{const m=Object.values(r);return m}));
/* détail violations */
const bad=rows.filter(r=>r.c&&r.r<r.c);
if(bad.length){console.log("ÉCHECS:");for(const x of bad)console.log(` ✗ ${x.ev} ratio=${x.r.toFixed(2)} (cible ${x.c})`);}
const info=rows.filter(r=>!r.c);
console.log("\nINFO(exempt/déco):");for(const x of info)console.log(` · ${x.ev} ratio=${x.r.toFixed(2)}`);
console.log(`\n=== ${f+bad.length} échec(s) — ${rows.length} paires ===`);
