#!/usr/bin/env node
/*
 * Генератор спряжений глаголов IziSpanish.
 * Читает VERBS из data.js, достраивает preterite (pretérito indefinido)
 * и future (futuro simple) по регулярным правилам + таблицам неправильных.
 * present НЕ трогает (выверен вручную). Перезаписывает блок VERBS в data.js.
 *
 * Наращивание до 300: добавляй глаголы в data.js (или сюда в EXTRA) —
 * достаточно infinitive + present; времена достроятся автоматически,
 * неправильные — через таблицы ниже.
 */
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'data.js');
const PRON = ["yo", "tú", "él/ella/usted", "nosotros", "vosotros", "ellos/ellas/ustedes"];

// --- futuro simple: основа + [é, ás, á, emos, éis, án] ---
const FUT_END = ["é", "ás", "á", "emos", "éis", "án"];
const FUT_STEM = {
  tener: "tendr", salir: "saldr", poner: "pondr", poder: "podr", querer: "querr",
  saber: "sabr", decir: "dir", haber: "habr", hacer: "har", venir: "vendr",
};
function futuro(inf) {
  const stem = FUT_STEM[inf] || inf;
  const o = {};
  PRON.forEach((p, i) => o[p] = stem + FUT_END[i]);
  return o;
}

// --- pretérito indefinido ---
// Полностью неправильные (fuertes и особые) — заданы явно.
const PRET_IRREGULAR = {
  ser:   ["fui","fuiste","fue","fuimos","fuisteis","fueron"],
  ir:    ["fui","fuiste","fue","fuimos","fuisteis","fueron"],
  estar: ["estuve","estuviste","estuvo","estuvimos","estuvisteis","estuvieron"],
  tener: ["tuve","tuviste","tuvo","tuvimos","tuvisteis","tuvieron"],
  hacer: ["hice","hiciste","hizo","hicimos","hicisteis","hicieron"],
  poder: ["pude","pudiste","pudo","pudimos","pudisteis","pudieron"],
  querer:["quise","quisiste","quiso","quisimos","quisisteis","quisieron"],
  decir: ["dije","dijiste","dijo","dijimos","dijisteis","dijeron"],
  venir: ["vine","viniste","vino","vinimos","vinisteis","vinieron"],
  poner: ["puse","pusiste","puso","pusimos","pusisteis","pusieron"],
  saber: ["supe","supiste","supo","supimos","supisteis","supieron"],
  dar:   ["di","diste","dio","dimos","disteis","dieron"],
  haber: ["hube","hubiste","hubo","hubimos","hubisteis","hubieron"],
  ver:   ["vi","viste","vio","vimos","visteis","vieron"],
  // орфографические изменения в 1 л. ед.ч. (-car/-gar/-zar)
  empezar:["empecé","empezaste","empezó","empezamos","empezasteis","empezaron"],
  pagar:  ["pagué","pagaste","pagó","pagamos","pagasteis","pagaron"],
  llegar: ["llegué","llegaste","llegó","llegamos","llegasteis","llegaron"],
  buscar: ["busqué","buscaste","buscó","buscamos","buscasteis","buscaron"],
  // i→y в 3-м лице
  leer:   ["leí","leíste","leyó","leímos","leísteis","leyeron"],
  // -ir с e→i в 3-м лице
  sentir: ["sentí","sentiste","sintió","sentimos","sentisteis","sintieron"],
};
// Глаголы без preterite/future (дефективные / особые)
const SKIP_TENSES = new Set(["gustar"]);

function preterito(inf) {
  if (PRET_IRREGULAR[inf]) {
    const o = {}; PRON.forEach((p, i) => o[p] = PRET_IRREGULAR[inf][i]); return o;
  }
  const stem = inf.slice(0, -2);
  const end = inf.endsWith("ar")
    ? ["é","aste","ó","amos","asteis","aron"]
    : ["í","iste","ió","imos","isteis","ieron"];
  const o = {}; PRON.forEach((p, i) => o[p] = stem + end[i]); return o;
}

// --- сериализация одного глагола в стиле data.js ---
function j(s) { return JSON.stringify(s); }
function tenseLine(name, obj) {
  return `${name}: { ` + PRON.map(p => `${j(p)}: ${j(obj[p])}`).join(", ") + " }";
}
function serializeVerb(v) {
  const L = [];
  L.push(`    id: ${v.id}, infinitive: ${j(v.infinitive)}, translation: ${j(v.translation)},`);
  L.push(`    transcription: ${j(v.transcription)}${v.note ? `, note: ${j(v.note)}` : ""},`);
  if (v.example) L.push(`    example: { greek: ${j(v.example.greek)}, ru: ${j(v.example.ru)} },`);
  const tenses = [tenseLine("present", v.present)];
  if (v.preterite) tenses.push(tenseLine("preterite", v.preterite));
  if (v.future) tenses.push(tenseLine("future", v.future));
  L.push("    " + tenses.join(",\n    "));
  return "  {\n" + L.join("\n") + "\n  }";
}

// --- загрузка существующих VERBS ---
const src = fs.readFileSync(DATA, "utf8");
const m = src.match(/const VERBS = (\[[\s\S]*?\n\]);/);
if (!m) { console.error("Не найден блок const VERBS"); process.exit(1); }
const VERBS = eval(m[1]);

let added = 0, skipped = 0;
for (const v of VERBS) {
  if (SKIP_TENSES.has(v.infinitive)) { skipped++; continue; }
  if (!v.preterite) v.preterite = preterito(v.infinitive);
  if (!v.future) v.future = futuro(v.infinitive);
  added++;
}

const block = "const VERBS = [\n" + VERBS.map(serializeVerb).join(",\n") + "\n];";
const out = src.replace(/const VERBS = \[[\s\S]*?\n\];/, block);
fs.writeFileSync(DATA, out, "utf8");

console.log(`Глаголов всего: ${VERBS.length}, времена добавлены: ${added}, пропущено (дефективные): ${skipped}`);
// контрольный вывод
["ser","hablar","empezar","sentir","tener","leer"].forEach(inf => {
  const v = VERBS.find(x => x.infinitive === inf);
  if (v) console.log(`\n${inf}: pret yo=${v.preterite?.["yo"]}, pret él=${v.preterite?.["él/ella/usted"]}, fut yo=${v.future?.["yo"]}`);
});
