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
  oír: "oir", // инфинитив с акцентом, но в futuro основа без него: oiré
};
function futuro(inf) {
  const stem = FUT_STEM[inf] || inf;
  const o = {};
  PRON.forEach((p, i) => o[p] = stem + FUT_END[i]);
  return o;
}

// --- presente для ПРАВИЛЬНЫХ глаголов (неправильным present задаётся явно) ---
const PRES_END = {
  ar: ["o","as","a","amos","áis","an"],
  er: ["o","es","e","emos","éis","en"],
  ir: ["o","es","e","imos","ís","en"],
};
function presente(inf) {
  const type = inf.slice(-2);
  const end = PRES_END[type];
  if (!end) throw new Error("Не -ar/-er/-ir: " + inf);
  const stem = inf.slice(0, -2);
  const o = {}; PRON.forEach((p, i) => o[p] = stem + end[i]); return o;
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
  oír:    ["oí","oíste","oyó","oímos","oísteis","oyeron"],
  // -ir с e→i в 3-м лице
  sentir: ["sentí","sentiste","sintió","sentimos","sentisteis","sintieron"],
  dormir: ["dormí","dormiste","durmió","dormimos","dormisteis","durmieron"],
  pedir:  ["pedí","pediste","pidió","pedimos","pedisteis","pidieron"],
  seguir: ["seguí","seguiste","siguió","seguimos","seguisteis","siguieron"],
  preferir:["preferí","preferiste","prefirió","preferimos","preferisteis","prefirieron"],
  // pretéritos fuertes с основой на j (-cir → -je-)
  conducir:["conduje","condujiste","condujo","condujimos","condujisteis","condujeron"],
  traer:  ["traje","trajiste","trajo","trajimos","trajisteis","trajeron"],
  // орфографическое -gar (только 1 л. ед.ч.)
  jugar:  ["jugué","jugaste","jugó","jugamos","jugasteis","jugaron"],
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

// --- НОВЫЕ глаголы (present у правильных достроится авто; у неправильных задан явно) ---
// Блок id 46-85: частотная лексика для жизни в Испании.
const P = (list) => { const o = {}; PRON.forEach((p, i) => o[p] = list[i]); return o; };
const NEW_VERBS = [
  { id: 46, infinitive: "tomar", translation: "брать / пить / садиться (в транспорт)", transcription: "ТОМА́Р", note: "Правильный -ar глагол", example: { greek: "Tomo el metro para ir al trabajo.", ru: "Езжу на метро на работу." } },
  { id: 47, infinitive: "llevar", translation: "нести / носить / везти", transcription: "ЕВА́Р", note: "Правильный -ar глагол", example: { greek: "Llevo el pasaporte siempre conmigo.", ru: "Всегда ношу паспорт с собой." } },
  { id: 48, infinitive: "dejar", translation: "оставлять / позволять", transcription: "ДЭХА́Р", note: "Правильный -ar глагол", example: { greek: "Dejo las llaves en la recepción.", ru: "Оставляю ключи на ресепшене." } },
  { id: 49, infinitive: "pasar", translation: "проходить / проводить (время)", transcription: "ПАСА́Р", note: "Правильный -ar глагол", example: { greek: "Paso el fin de semana en la playa.", ru: "Провожу выходные на пляже." } },
  { id: 50, infinitive: "quedar", translation: "оставаться / договариваться о встрече", transcription: "КЭДА́Р", note: "Правильный -ar глагол", example: { greek: "Quedamos a las seis en la plaza.", ru: "Договариваемся встретиться в шесть на площади." } },
  { id: 51, infinitive: "usar", translation: "использовать", transcription: "УСА́Р", note: "Правильный -ar глагол", example: { greek: "Uso una aplicación para aprender español.", ru: "Использую приложение, чтобы учить испанский." } },
  { id: 52, infinitive: "entrar", translation: "входить", transcription: "ЭНТРА́Р", note: "Правильный -ar глагол", example: { greek: "Entro en la tienda a comprar pan.", ru: "Захожу в магазин купить хлеб." } },
  { id: 53, infinitive: "firmar", translation: "подписывать", transcription: "ФИРМА́Р", note: "Правильный -ar глагол", example: { greek: "Firmo el contrato de alquiler hoy.", ru: "Подписываю договор аренды сегодня." } },
  { id: 54, infinitive: "rellenar", translation: "заполнять (бланк)", transcription: "РЭЙЕНА́Р", note: "Правильный -ar глагол", example: { greek: "Relleno el formulario para el NIE.", ru: "Заполняю бланк на NIE." } },
  { id: 55, infinitive: "reservar", translation: "бронировать", transcription: "РЭСЭРВА́Р", note: "Правильный -ar глагол", example: { greek: "Reservo una mesa para dos personas.", ru: "Бронирую столик на двоих." } },
  { id: 56, infinitive: "cambiar", translation: "менять / обменивать", transcription: "КАМБЬА́Р", note: "Правильный -ar глагол", example: { greek: "Quiero cambiar euros por dólares.", ru: "Хочу обменять евро на доллары." } },
  { id: 57, infinitive: "viajar", translation: "путешествовать", transcription: "ВЬЯХА́Р", note: "Правильный -ar глагол", example: { greek: "Viajo a Sevilla en tren este verano.", ru: "Еду в Севилью на поезде этим летом." } },
  { id: 58, infinitive: "visitar", translation: "посещать / навещать", transcription: "ВИСИТА́Р", note: "Правильный -ar глагол", example: { greek: "Visito a mis amigos en Barcelona.", ru: "Навещаю друзей в Барселоне." } },
  { id: 59, infinitive: "cocinar", translation: "готовить (еду)", transcription: "КОСИНА́Р", note: "Правильный -ar глагол", example: { greek: "Cocino una tortilla española para la cena.", ru: "Готовлю испанскую тортилью на ужин." } },
  { id: 60, infinitive: "limpiar", translation: "убирать / чистить", transcription: "ЛИМПЬА́Р", note: "Правильный -ar глагол", example: { greek: "Limpio el piso los sábados.", ru: "Убираю квартиру по субботам." } },
  { id: 61, infinitive: "descansar", translation: "отдыхать", transcription: "ДЭСКАНСА́Р", note: "Правильный -ar глагол", example: { greek: "Descanso un poco después del trabajo.", ru: "Немного отдыхаю после работы." } },
  { id: 62, infinitive: "alquilar", translation: "арендовать / снимать", transcription: "АЛЬКИЛА́Р", note: "Правильный -ar глагол", example: { greek: "Alquilo un piso en el centro de Valencia.", ru: "Снимаю квартиру в центре Валенсии." } },
  { id: 63, infinitive: "preparar", translation: "готовить / подготавливать", transcription: "ПРЭПАРА́Р", note: "Правильный -ar глагол", example: { greek: "Preparo los documentos para la cita.", ru: "Готовлю документы к приёму." } },
  { id: 64, infinitive: "aprender", translation: "учить / учиться", transcription: "АПРЭНДЭ́Р", note: "Правильный -er глагол", example: { greek: "Aprendo español para vivir en España.", ru: "Учу испанский, чтобы жить в Испании." } },
  { id: 65, infinitive: "vender", translation: "продавать", transcription: "ВЭНДЭ́Р", note: "Правильный -er глагол", example: { greek: "Vendo mi coche antes de mudarme.", ru: "Продаю машину перед переездом." } },
  { id: 66, infinitive: "deber", translation: "быть должным", transcription: "ДЭБЭ́Р", note: "Правильный -er глагол", example: { greek: "Debo pagar el alquiler antes del día cinco.", ru: "Должен оплатить аренду до пятого числа." } },
  { id: 67, infinitive: "correr", translation: "бегать", transcription: "КОРРЭ́Р", note: "Правильный -er глагол", example: { greek: "Corro por la playa cada mañana.", ru: "Бегаю по пляжу каждое утро." } },
  { id: 68, infinitive: "recibir", translation: "получать", transcription: "РЭСИБИ́Р", note: "Правильный -ir глагол", example: { greek: "Recibo el paquete en casa por la tarde.", ru: "Получаю посылку дома днём." } },
  { id: 69, infinitive: "subir", translation: "подниматься / садиться (в транспорт)", transcription: "СУБИ́Р", note: "Правильный -ir глагол", example: { greek: "Subo al autobús en la próxima parada.", ru: "Сажусь в автобус на следующей остановке." } },
  { id: 70, infinitive: "decidir", translation: "решать", transcription: "ДЭСИДИ́Р", note: "Правильный -ir глагол", example: { greek: "Decido quedarme en España un año más.", ru: "Решаю остаться в Испании ещё на год." } },
  { id: 71, infinitive: "permitir", translation: "разрешать", transcription: "ПЭРМИТИ́Р", note: "Правильный -ir глагол", example: { greek: "El contrato no permite tener animales.", ru: "Договор не разрешает держать животных." } },
  { id: 72, infinitive: "entender", translation: "понимать", transcription: "ЭНТЭНДЭ́Р", note: "Неправильный глагол (e→ie)", example: { greek: "No entiendo bien el acento andaluz.", ru: "Я не очень понимаю андалузский акцент." }, present: P(["entiendo","entiendes","entiende","entendemos","entendéis","entienden"]) },
  { id: 73, infinitive: "volver", translation: "возвращаться", transcription: "ВОЛЬВЭ́Р", note: "Неправильный глагол (o→ue)", example: { greek: "Vuelvo a casa a las ocho de la tarde.", ru: "Возвращаюсь домой в восемь вечера." }, present: P(["vuelvo","vuelves","vuelve","volvemos","volvéis","vuelven"]) },
  { id: 74, infinitive: "dormir", translation: "спать", transcription: "ДОРМИ́Р", note: "Неправильный глагол (o→ue; 3 л. durmió)", example: { greek: "Duermo ocho horas cada noche.", ru: "Сплю восемь часов каждую ночь." }, present: P(["duermo","duermes","duerme","dormimos","dormís","duermen"]) },
  { id: 75, infinitive: "pedir", translation: "просить / заказывать", transcription: "ПЭДИ́Р", note: "Неправильный глагол (e→i)", example: { greek: "Pido la cuenta al camarero.", ru: "Прошу счёт у официанта." }, present: P(["pido","pides","pide","pedimos","pedís","piden"]) },
  { id: 76, infinitive: "conocer", translation: "знать / быть знакомым", transcription: "КОНОСЭ́Р", note: "Неправильный глагол (1 л. ед.ч. conozco)", example: { greek: "Conozco un buen restaurante cerca de aquí.", ru: "Знаю хороший ресторан неподалёку." }, present: P(["conozco","conoces","conoce","conocemos","conocéis","conocen"]) },
  { id: 77, infinitive: "seguir", translation: "следовать / продолжать", transcription: "СЭГИ́Р", note: "Неправильный глагол (e→i; sigo)", example: { greek: "Sigo todo recto hasta la plaza.", ru: "Иду прямо до площади." }, present: P(["sigo","sigues","sigue","seguimos","seguís","siguen"]) },
  { id: 78, infinitive: "jugar", translation: "играть", transcription: "ХУГА́Р", note: "Неправильный глагол (u→ue; jugué)", example: { greek: "Juego al fútbol con mis vecinos.", ru: "Играю в футбол с соседями." }, present: P(["juego","juegas","juega","jugamos","jugáis","juegan"]) },
  { id: 79, infinitive: "cerrar", translation: "закрывать", transcription: "СЭРРА́Р", note: "Неправильный глагол (e→ie)", example: { greek: "La farmacia cierra a las nueve.", ru: "Аптека закрывается в девять." }, present: P(["cierro","cierras","cierra","cerramos","cerráis","cierran"]) },
  { id: 80, infinitive: "perder", translation: "терять / опаздывать (на транспорт)", transcription: "ПЭРДЭ́Р", note: "Неправильный глагол (e→ie)", example: { greek: "No quiero perder el tren de las diez.", ru: "Не хочу опоздать на поезд в десять." }, present: P(["pierdo","pierdes","pierde","perdemos","perdéis","pierden"]) },
  { id: 81, infinitive: "contar", translation: "считать / рассказывать", transcription: "КОНТА́Р", note: "Неправильный глагол (o→ue)", example: { greek: "Te cuento cómo funciona el sistema.", ru: "Расскажу тебе, как работает система." }, present: P(["cuento","cuentas","cuenta","contamos","contáis","cuentan"]) },
  { id: 82, infinitive: "preferir", translation: "предпочитать", transcription: "ПРЭФЭРИ́Р", note: "Неправильный глагол (e→ie; 3 л. prefirió)", example: { greek: "Prefiero pagar con tarjeta.", ru: "Предпочитаю платить картой." }, present: P(["prefiero","prefieres","prefiere","preferimos","preferís","prefieren"]) },
  { id: 83, infinitive: "conducir", translation: "водить (машину)", transcription: "КОНДУСИ́Р", note: "Неправильный глагол (1 л. conduzco; прош. conduje)", example: { greek: "Conduzco con cuidado en la ciudad.", ru: "Веду машину осторожно в городе." }, present: P(["conduzco","conduces","conduce","conducimos","conducís","conducen"]) },
  { id: 84, infinitive: "traer", translation: "приносить", transcription: "ТРАЭ́Р", note: "Неправильный глагол (1 л. traigo; прош. traje)", example: { greek: "Traigo el DNI y una copia.", ru: "Приношу удостоверение и копию." }, present: P(["traigo","traes","trae","traemos","traéis","traen"]) },
  { id: 85, infinitive: "oír", translation: "слышать", transcription: "ОИ́Р", note: "Неправильный глагол (oigo/oyes; 3 л. oyó)", example: { greek: "No te oigo bien, hay mucho ruido.", ru: "Плохо тебя слышу, очень шумно." }, present: P(["oigo","oyes","oye","oímos","oís","oyen"]) },
];

// --- загрузка существующих VERBS ---
const src = fs.readFileSync(DATA, "utf8");
const m = src.match(/const VERBS = (\[[\s\S]*?\n\]);/);
if (!m) { console.error("Не найден блок const VERBS"); process.exit(1); }
const VERBS = eval(m[1]);

// добавляем новые глаголы (дедуп по infinitive)
const have = new Set(VERBS.map(v => v.infinitive));
let appended = 0;
for (const nv of NEW_VERBS) {
  if (have.has(nv.infinitive)) continue;
  VERBS.push(nv); have.add(nv.infinitive); appended++;
}

let added = 0, skipped = 0;
for (const v of VERBS) {
  if (SKIP_TENSES.has(v.infinitive)) { skipped++; continue; }
  if (!v.present) v.present = presente(v.infinitive);
  if (!v.preterite) v.preterite = preterito(v.infinitive);
  v.future = futuro(v.infinitive); // future детерминирован таблицами — пересобираем всегда
  added++;
}
console.log(`Новых глаголов добавлено: ${appended}`);

const block = "const VERBS = [\n" + VERBS.map(serializeVerb).join(",\n") + "\n];";
const out = src.replace(/const VERBS = \[[\s\S]*?\n\];/, block);
fs.writeFileSync(DATA, out, "utf8");

console.log(`Глаголов всего: ${VERBS.length}, времена добавлены: ${added}, пропущено (дефективные): ${skipped}`);
// контрольный вывод
["ser","hablar","empezar","sentir","tener","leer"].forEach(inf => {
  const v = VERBS.find(x => x.infinitive === inf);
  if (v) console.log(`\n${inf}: pret yo=${v.preterite?.["yo"]}, pret él=${v.preterite?.["él/ella/usted"]}, fut yo=${v.future?.["yo"]}`);
});
