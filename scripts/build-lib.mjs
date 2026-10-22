/**
 *  build:lib — prépare le paquet distribuable illaWeightCss
 *  - compile src/sass/main.scss -> illaWeightCss.css (expanded) + .min.css
 *  - re-écrit url("/fonts/...) en relatif (CDN jsDelivr + bundlers)
 *  - copie public/fonts -> ./fonts (livrées avec le paquet)
 *  Lancé automatiquement par "prepack" (npm publish / npm pack).
 */
import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

/* fonts: recopie fraîche depuis public/fonts */
rmSync("fonts", { recursive: true, force: true });
mkdirSync("fonts", { recursive: true });
cpSync("public/fonts", "fonts", { recursive: true });

/* CSS : expanded + compressed */
execFileSync("node_modules/.bin/sass", [
    "--no-source-map",
    "--style", "expanded",
    "src/sass/main.scss",
    "illaWeightCss.css",
]);
execFileSync("node_modules/.bin/sass", [
    "--no-source-map",
    "--style", "compressed",
    "src/sass/main.scss",
    "illaWeightCss.min.css",
]);

/* chemins de polices : absolus site -> relatifs paquet */
for (const file of ["illaWeightCss.css", "illaWeightCss.min.css"]) {
    writeFileSync(
        file,
        readFileSync(file, "utf8").replaceAll("/fonts/", "fonts/"),
    );
}

console.log("lib : illaWeightCss(.min).css + fonts/ générés");
