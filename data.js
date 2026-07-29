const VERBS = [
  {
    id: 1, infinitive: "ser", translation: "быть",
    transcription: "СЭР", note: "Неправильный глагол (постоянные признаки)",
    example: { greek: "Soy de Rusia — vivo aquí cinco años.", ru: "Я из России — живу здесь пять лет." },
    present: { "yo": "soy", "tú": "eres", "él/ella/usted": "es", "nosotros": "somos", "vosotros": "sois", "ellos/ellas/ustedes": "son" },
    preterite: { "yo": "fui", "tú": "fuiste", "él/ella/usted": "fue", "nosotros": "fuimos", "vosotros": "fuisteis", "ellos/ellas/ustedes": "fueron" },
    future: { "yo": "seré", "tú": "serás", "él/ella/usted": "será", "nosotros": "seremos", "vosotros": "seréis", "ellos/ellas/ustedes": "serán" }
  },
  {
    id: 2, infinitive: "estar", translation: "быть / находиться",
    transcription: "ЭСТА́Р", note: "Неправильный глагол (временные состояния, местоположение)",
    example: { greek: "Estoy en Madrid — estoy muy contento.", ru: "Я в Мадриде — я очень доволен." },
    present: { "yo": "estoy", "tú": "estás", "él/ella/usted": "está", "nosotros": "estamos", "vosotros": "estáis", "ellos/ellas/ustedes": "están" },
    preterite: { "yo": "estuve", "tú": "estuviste", "él/ella/usted": "estuvo", "nosotros": "estuvimos", "vosotros": "estuvisteis", "ellos/ellas/ustedes": "estuvieron" },
    future: { "yo": "estaré", "tú": "estarás", "él/ella/usted": "estará", "nosotros": "estaremos", "vosotros": "estaréis", "ellos/ellas/ustedes": "estarán" }
  },
  {
    id: 3, infinitive: "tener", translation: "иметь",
    transcription: "ТЭНЭ́Р", note: "Неправильный глагол",
    example: { greek: "Tengo dos hijos y un perro.", ru: "У меня двое детей и одна собака." },
    present: { "yo": "tengo", "tú": "tienes", "él/ella/usted": "tiene", "nosotros": "tenemos", "vosotros": "tenéis", "ellos/ellas/ustedes": "tienen" },
    preterite: { "yo": "tuve", "tú": "tuviste", "él/ella/usted": "tuvo", "nosotros": "tuvimos", "vosotros": "tuvisteis", "ellos/ellas/ustedes": "tuvieron" },
    future: { "yo": "tendré", "tú": "tendrás", "él/ella/usted": "tendrá", "nosotros": "tendremos", "vosotros": "tendréis", "ellos/ellas/ustedes": "tendrán" }
  },
  {
    id: 4, infinitive: "ir", translation: "идти / ехать",
    transcription: "ИР", note: "Неправильный глагол",
    example: { greek: "Voy a Barcelona en agosto.", ru: "Еду в Барселону в августе." },
    present: { "yo": "voy", "tú": "vas", "él/ella/usted": "va", "nosotros": "vamos", "vosotros": "vais", "ellos/ellas/ustedes": "van" },
    preterite: { "yo": "fui", "tú": "fuiste", "él/ella/usted": "fue", "nosotros": "fuimos", "vosotros": "fuisteis", "ellos/ellas/ustedes": "fueron" },
    future: { "yo": "iré", "tú": "irás", "él/ella/usted": "irá", "nosotros": "iremos", "vosotros": "iréis", "ellos/ellas/ustedes": "irán" }
  },
  {
    id: 5, infinitive: "hacer", translation: "делать",
    transcription: "АСЭ́Р", note: "Неправильный глагол (1 л. ед.ч. hago)",
    example: { greek: "¿Qué haces? — Trabajo desde casa.", ru: "Что делаешь? — Работаю из дома." },
    present: { "yo": "hago", "tú": "haces", "él/ella/usted": "hace", "nosotros": "hacemos", "vosotros": "hacéis", "ellos/ellas/ustedes": "hacen" },
    preterite: { "yo": "hice", "tú": "hiciste", "él/ella/usted": "hizo", "nosotros": "hicimos", "vosotros": "hicisteis", "ellos/ellas/ustedes": "hicieron" },
    future: { "yo": "haré", "tú": "harás", "él/ella/usted": "hará", "nosotros": "haremos", "vosotros": "haréis", "ellos/ellas/ustedes": "harán" }
  },
  {
    id: 6, infinitive: "poder", translation: "мочь",
    transcription: "ПОДЭ́Р", note: "Неправильный глагол (o→ue)",
    example: { greek: "¿Puedes ayudarme con el formulario?", ru: "Можешь помочь мне с бланком?" },
    present: { "yo": "puedo", "tú": "puedes", "él/ella/usted": "puede", "nosotros": "podemos", "vosotros": "podéis", "ellos/ellas/ustedes": "pueden" },
    preterite: { "yo": "pude", "tú": "pudiste", "él/ella/usted": "pudo", "nosotros": "pudimos", "vosotros": "pudisteis", "ellos/ellas/ustedes": "pudieron" },
    future: { "yo": "podré", "tú": "podrás", "él/ella/usted": "podrá", "nosotros": "podremos", "vosotros": "podréis", "ellos/ellas/ustedes": "podrán" }
  },
  {
    id: 7, infinitive: "querer", translation: "хотеть / любить",
    transcription: "КЭРЭ́Р", note: "Неправильный глагол (e→ie)",
    example: { greek: "Quiero abrir una cuenta bancaria.", ru: "Хочу открыть банковский счёт." },
    present: { "yo": "quiero", "tú": "quieres", "él/ella/usted": "quiere", "nosotros": "queremos", "vosotros": "queréis", "ellos/ellas/ustedes": "quieren" },
    preterite: { "yo": "quise", "tú": "quisiste", "él/ella/usted": "quiso", "nosotros": "quisimos", "vosotros": "quisisteis", "ellos/ellas/ustedes": "quisieron" },
    future: { "yo": "querré", "tú": "querrás", "él/ella/usted": "querrá", "nosotros": "querremos", "vosotros": "querréis", "ellos/ellas/ustedes": "querrán" }
  },
  {
    id: 8, infinitive: "decir", translation: "говорить / сказать",
    transcription: "ДЭСИ́Р", note: "Неправильный глагол (1 л. ед.ч. digo)",
    example: { greek: "¿Cómo se dice 'contrato' en español?", ru: "Как по-испански 'контракт'?" },
    present: { "yo": "digo", "tú": "dices", "él/ella/usted": "dice", "nosotros": "decimos", "vosotros": "decís", "ellos/ellas/ustedes": "dicen" },
    preterite: { "yo": "dije", "tú": "dijiste", "él/ella/usted": "dijo", "nosotros": "dijimos", "vosotros": "dijisteis", "ellos/ellas/ustedes": "dijeron" },
    future: { "yo": "diré", "tú": "dirás", "él/ella/usted": "dirá", "nosotros": "diremos", "vosotros": "diréis", "ellos/ellas/ustedes": "dirán" }
  },
  {
    id: 9, infinitive: "venir", translation: "приходить / приезжать",
    transcription: "ВЭНИ́Р", note: "Неправильный глагол (1 л. ед.ч. vengo)",
    example: { greek: "Vengo de Rusia, pero vivo en España.", ru: "Я приехал из России, но живу в Испании." },
    present: { "yo": "vengo", "tú": "vienes", "él/ella/usted": "viene", "nosotros": "venimos", "vosotros": "venís", "ellos/ellas/ustedes": "vienen" },
    preterite: { "yo": "vine", "tú": "viniste", "él/ella/usted": "vino", "nosotros": "vinimos", "vosotros": "vinisteis", "ellos/ellas/ustedes": "vinieron" },
    future: { "yo": "vendré", "tú": "vendrás", "él/ella/usted": "vendrá", "nosotros": "vendremos", "vosotros": "vendréis", "ellos/ellas/ustedes": "vendrán" }
  },
  {
    id: 10, infinitive: "salir", translation: "выходить / уезжать",
    transcription: "САЛИ́Р", note: "Неправильный глагол (1 л. ед.ч. salgo)",
    example: { greek: "Salgo de casa a las ocho de la mañana.", ru: "Я выхожу из дома в восемь утра." },
    present: { "yo": "salgo", "tú": "sales", "él/ella/usted": "sale", "nosotros": "salimos", "vosotros": "salís", "ellos/ellas/ustedes": "salen" },
    preterite: { "yo": "salí", "tú": "saliste", "él/ella/usted": "salió", "nosotros": "salimos", "vosotros": "salisteis", "ellos/ellas/ustedes": "salieron" },
    future: { "yo": "saldré", "tú": "saldrás", "él/ella/usted": "saldrá", "nosotros": "saldremos", "vosotros": "saldréis", "ellos/ellas/ustedes": "saldrán" }
  },
  {
    id: 11, infinitive: "poner", translation: "класть / ставить",
    transcription: "ПОНЭ́Р", note: "Неправильный глагол (1 л. ед.ч. pongo)",
    example: { greek: "Pongo los documentos en la carpeta.", ru: "Кладу документы в папку." },
    present: { "yo": "pongo", "tú": "pones", "él/ella/usted": "pone", "nosotros": "ponemos", "vosotros": "ponéis", "ellos/ellas/ustedes": "ponen" },
    preterite: { "yo": "puse", "tú": "pusiste", "él/ella/usted": "puso", "nosotros": "pusimos", "vosotros": "pusisteis", "ellos/ellas/ustedes": "pusieron" },
    future: { "yo": "pondré", "tú": "pondrás", "él/ella/usted": "pondrá", "nosotros": "pondremos", "vosotros": "pondréis", "ellos/ellas/ustedes": "pondrán" }
  },
  {
    id: 12, infinitive: "saber", translation: "знать",
    transcription: "САБЭ́Р", note: "Неправильный глагол (1 л. ед.ч. sé)",
    example: { greek: "Sé un poco de español — nivel A2.", ru: "Знаю немного испанский — уровень A2." },
    present: { "yo": "sé", "tú": "sabes", "él/ella/usted": "sabe", "nosotros": "sabemos", "vosotros": "sabéis", "ellos/ellas/ustedes": "saben" },
    preterite: { "yo": "supe", "tú": "supiste", "él/ella/usted": "supo", "nosotros": "supimos", "vosotros": "supisteis", "ellos/ellas/ustedes": "supieron" },
    future: { "yo": "sabré", "tú": "sabrás", "él/ella/usted": "sabrá", "nosotros": "sabremos", "vosotros": "sabréis", "ellos/ellas/ustedes": "sabrán" }
  },
  {
    id: 13, infinitive: "ver", translation: "видеть / смотреть",
    transcription: "ВЭР", note: "Неправильный глагол (1 л. ед.ч. veo)",
    example: { greek: "Veo películas españolas para aprender el idioma.", ru: "Смотрю испанские фильмы, чтобы учить язык." },
    present: { "yo": "veo", "tú": "ves", "él/ella/usted": "ve", "nosotros": "vemos", "vosotros": "veis", "ellos/ellas/ustedes": "ven" },
    preterite: { "yo": "vi", "tú": "viste", "él/ella/usted": "vio", "nosotros": "vimos", "vosotros": "visteis", "ellos/ellas/ustedes": "vieron" },
    future: { "yo": "veré", "tú": "verás", "él/ella/usted": "verá", "nosotros": "veremos", "vosotros": "veréis", "ellos/ellas/ustedes": "verán" }
  },
  {
    id: 14, infinitive: "dar", translation: "давать",
    transcription: "ДАР", note: "Неправильный глагол (1 л. ед.ч. doy)",
    example: { greek: "¿Me puede dar un recibo, por favor?", ru: "Можете дать мне чек, пожалуйста?" },
    present: { "yo": "doy", "tú": "das", "él/ella/usted": "da", "nosotros": "damos", "vosotros": "dais", "ellos/ellas/ustedes": "dan" },
    preterite: { "yo": "di", "tú": "diste", "él/ella/usted": "dio", "nosotros": "dimos", "vosotros": "disteis", "ellos/ellas/ustedes": "dieron" },
    future: { "yo": "daré", "tú": "darás", "él/ella/usted": "dará", "nosotros": "daremos", "vosotros": "daréis", "ellos/ellas/ustedes": "darán" }
  },
  {
    id: 15, infinitive: "haber", translation: "иметься / быть (вспомогательный)",
    transcription: "АБЭ́Р", note: "Неправильный глагол; hay = 'есть/имеется'",
    example: { greek: "Hay una farmacia cerca de aquí.", ru: "Здесь рядом есть аптека." },
    present: { "yo": "he", "tú": "has", "él/ella/usted": "ha (hay)", "nosotros": "hemos", "vosotros": "habéis", "ellos/ellas/ustedes": "han" },
    preterite: { "yo": "hube", "tú": "hubiste", "él/ella/usted": "hubo", "nosotros": "hubimos", "vosotros": "hubisteis", "ellos/ellas/ustedes": "hubieron" },
    future: { "yo": "habré", "tú": "habrás", "él/ella/usted": "habrá", "nosotros": "habremos", "vosotros": "habréis", "ellos/ellas/ustedes": "habrán" }
  },
  {
    id: 16, infinitive: "hablar", translation: "говорить / разговаривать",
    transcription: "АБЛА́Р", note: "Правильный -ar глагол",
    example: { greek: "Hablo un poco de español — todavía aprendo.", ru: "Говорю немного по-испански — ещё учусь." },
    present: { "yo": "hablo", "tú": "hablas", "él/ella/usted": "habla", "nosotros": "hablamos", "vosotros": "habláis", "ellos/ellas/ustedes": "hablan" },
    preterite: { "yo": "hablé", "tú": "hablaste", "él/ella/usted": "habló", "nosotros": "hablamos", "vosotros": "hablasteis", "ellos/ellas/ustedes": "hablaron" },
    future: { "yo": "hablaré", "tú": "hablarás", "él/ella/usted": "hablará", "nosotros": "hablaremos", "vosotros": "hablaréis", "ellos/ellas/ustedes": "hablarán" }
  },
  {
    id: 17, infinitive: "comer", translation: "есть / кушать",
    transcription: "КОМЭ́Р", note: "Правильный -er глагол",
    example: { greek: "Como paella y bebo sangría en Valencia.", ru: "Ем паэлью и пью сангрию в Валенсии." },
    present: { "yo": "como", "tú": "comes", "él/ella/usted": "come", "nosotros": "comemos", "vosotros": "coméis", "ellos/ellas/ustedes": "comen" },
    preterite: { "yo": "comí", "tú": "comiste", "él/ella/usted": "comió", "nosotros": "comimos", "vosotros": "comisteis", "ellos/ellas/ustedes": "comieron" },
    future: { "yo": "comeré", "tú": "comerás", "él/ella/usted": "comerá", "nosotros": "comeremos", "vosotros": "comeréis", "ellos/ellas/ustedes": "comerán" }
  },
  {
    id: 18, infinitive: "vivir", translation: "жить",
    transcription: "ВИВИ́Р", note: "Правильный -ir глагол",
    example: { greek: "Vivo en Málaga — es una ciudad preciosa.", ru: "Живу в Малаге — это прекрасный город." },
    present: { "yo": "vivo", "tú": "vives", "él/ella/usted": "vive", "nosotros": "vivimos", "vosotros": "vivís", "ellos/ellas/ustedes": "viven" },
    preterite: { "yo": "viví", "tú": "viviste", "él/ella/usted": "vivió", "nosotros": "vivimos", "vosotros": "vivisteis", "ellos/ellas/ustedes": "vivieron" },
    future: { "yo": "viviré", "tú": "vivirás", "él/ella/usted": "vivirá", "nosotros": "viviremos", "vosotros": "viviréis", "ellos/ellas/ustedes": "vivirán" }
  },
  {
    id: 19, infinitive: "trabajar", translation: "работать",
    transcription: "ТРАБАХА́Р", note: "Правильный -ar глагол",
    example: { greek: "Trabajo todos los días de nueve a seis.", ru: "Работаю каждый день с девяти до шести." },
    present: { "yo": "trabajo", "tú": "trabajas", "él/ella/usted": "trabaja", "nosotros": "trabajamos", "vosotros": "trabajáis", "ellos/ellas/ustedes": "trabajan" },
    preterite: { "yo": "trabajé", "tú": "trabajaste", "él/ella/usted": "trabajó", "nosotros": "trabajamos", "vosotros": "trabajasteis", "ellos/ellas/ustedes": "trabajaron" },
    future: { "yo": "trabajaré", "tú": "trabajarás", "él/ella/usted": "trabajará", "nosotros": "trabajaremos", "vosotros": "trabajaréis", "ellos/ellas/ustedes": "trabajarán" }
  },
  {
    id: 20, infinitive: "comprar", translation: "покупать",
    transcription: "КОМПРА́Р", note: "Правильный -ar глагол",
    example: { greek: "Quiero comprar un billete de tren a Sevilla.", ru: "Хочу купить билет на поезд до Севильи." },
    present: { "yo": "compro", "tú": "compras", "él/ella/usted": "compra", "nosotros": "compramos", "vosotros": "compráis", "ellos/ellas/ustedes": "compran" },
    preterite: { "yo": "compré", "tú": "compraste", "él/ella/usted": "compró", "nosotros": "compramos", "vosotros": "comprasteis", "ellos/ellas/ustedes": "compraron" },
    future: { "yo": "compraré", "tú": "comprarás", "él/ella/usted": "comprará", "nosotros": "compraremos", "vosotros": "compraréis", "ellos/ellas/ustedes": "comprarán" }
  },
  {
    id: 21, infinitive: "necesitar", translation: "нуждаться / быть нужным",
    transcription: "НЭСЭСИТА́Р", note: "Правильный -ar глагол",
    example: { greek: "Necesito el DNI y el número de teléfono.", ru: "Мне нужны удостоверение личности и номер телефона." },
    present: { "yo": "necesito", "tú": "necesitas", "él/ella/usted": "necesita", "nosotros": "necesitamos", "vosotros": "necesitáis", "ellos/ellas/ustedes": "necesitan" },
    preterite: { "yo": "necesité", "tú": "necesitaste", "él/ella/usted": "necesitó", "nosotros": "necesitamos", "vosotros": "necesitasteis", "ellos/ellas/ustedes": "necesitaron" },
    future: { "yo": "necesitaré", "tú": "necesitarás", "él/ella/usted": "necesitará", "nosotros": "necesitaremos", "vosotros": "necesitaréis", "ellos/ellas/ustedes": "necesitarán" }
  },
  {
    id: 22, infinitive: "gustar", translation: "нравиться",
    transcription: "ГУСТА́Р", note: "Особый глагол: спрягается с местоимениями me/te/le и т.д.",
    example: { greek: "Me gusta mucho vivir en España.", ru: "Мне очень нравится жить в Испании." },
    present: { "yo": "me gusta", "tú": "te gusta", "él/ella/usted": "le gusta", "nosotros": "nos gusta", "vosotros": "os gusta", "ellos/ellas/ustedes": "les gusta" }
  },
  {
    id: 23, infinitive: "llamar", translation: "звать / звонить",
    transcription: "ЯМА́Р", note: "Правильный -ar глагол (llamarse — зваться)",
    example: { greek: "Me llamo Ana y llamo a mi familia cada semana.", ru: "Меня зовут Анна, и я звоню семье каждую неделю." },
    present: { "yo": "llamo", "tú": "llamas", "él/ella/usted": "llama", "nosotros": "llamamos", "vosotros": "llamáis", "ellos/ellas/ustedes": "llaman" },
    preterite: { "yo": "llamé", "tú": "llamaste", "él/ella/usted": "llamó", "nosotros": "llamamos", "vosotros": "llamasteis", "ellos/ellas/ustedes": "llamaron" },
    future: { "yo": "llamaré", "tú": "llamarás", "él/ella/usted": "llamará", "nosotros": "llamaremos", "vosotros": "llamaréis", "ellos/ellas/ustedes": "llamarán" }
  },
  {
    id: 24, infinitive: "estudiar", translation: "изучать / учиться",
    transcription: "ЭСТУДЬА́Р", note: "Правильный -ar глагол",
    example: { greek: "Estudio español todos los días media hora.", ru: "Изучаю испанский каждый день по полчаса." },
    present: { "yo": "estudio", "tú": "estudias", "él/ella/usted": "estudia", "nosotros": "estudiamos", "vosotros": "estudiáis", "ellos/ellas/ustedes": "estudian" },
    preterite: { "yo": "estudié", "tú": "estudiaste", "él/ella/usted": "estudió", "nosotros": "estudiamos", "vosotros": "estudiasteis", "ellos/ellas/ustedes": "estudiaron" },
    future: { "yo": "estudiaré", "tú": "estudiarás", "él/ella/usted": "estudiará", "nosotros": "estudiaremos", "vosotros": "estudiaréis", "ellos/ellas/ustedes": "estudiarán" }
  },
  {
    id: 25, infinitive: "ayudar", translation: "помогать",
    transcription: "АЮДА́Р", note: "Правильный -ar глагол",
    example: { greek: "¿Me puede ayudar con este formulario?", ru: "Можете помочь мне с этим бланком?" },
    present: { "yo": "ayudo", "tú": "ayudas", "él/ella/usted": "ayuda", "nosotros": "ayudamos", "vosotros": "ayudáis", "ellos/ellas/ustedes": "ayudan" },
    preterite: { "yo": "ayudé", "tú": "ayudaste", "él/ella/usted": "ayudó", "nosotros": "ayudamos", "vosotros": "ayudasteis", "ellos/ellas/ustedes": "ayudaron" },
    future: { "yo": "ayudaré", "tú": "ayudarás", "él/ella/usted": "ayudará", "nosotros": "ayudaremos", "vosotros": "ayudaréis", "ellos/ellas/ustedes": "ayudarán" }
  },
  {
    id: 26, infinitive: "escuchar", translation: "слушать",
    transcription: "ЭСКУЧА́Р", note: "Правильный -ar глагол",
    example: { greek: "Escucho música española en el coche.", ru: "Слушаю испанскую музыку в машине." },
    present: { "yo": "escucho", "tú": "escuchas", "él/ella/usted": "escucha", "nosotros": "escuchamos", "vosotros": "escucháis", "ellos/ellas/ustedes": "escuchan" },
    preterite: { "yo": "escuché", "tú": "escuchaste", "él/ella/usted": "escuchó", "nosotros": "escuchamos", "vosotros": "escuchasteis", "ellos/ellas/ustedes": "escucharon" },
    future: { "yo": "escucharé", "tú": "escucharás", "él/ella/usted": "escuchará", "nosotros": "escucharemos", "vosotros": "escucharéis", "ellos/ellas/ustedes": "escucharán" }
  },
  {
    id: 27, infinitive: "mirar", translation: "смотреть",
    transcription: "МИРА́Р", note: "Правильный -ar глагол",
    example: { greek: "Miro el mapa para encontrar la farmacia.", ru: "Смотрю на карту, чтобы найти аптеку." },
    present: { "yo": "miro", "tú": "miras", "él/ella/usted": "mira", "nosotros": "miramos", "vosotros": "miráis", "ellos/ellas/ustedes": "miran" },
    preterite: { "yo": "miré", "tú": "miraste", "él/ella/usted": "miró", "nosotros": "miramos", "vosotros": "mirasteis", "ellos/ellas/ustedes": "miraron" },
    future: { "yo": "miraré", "tú": "mirarás", "él/ella/usted": "mirará", "nosotros": "miraremos", "vosotros": "miraréis", "ellos/ellas/ustedes": "mirarán" }
  },
  {
    id: 28, infinitive: "comprender", translation: "понимать",
    transcription: "КОМПРЭНДЭ́Р", note: "Правильный -er глагол (синоним entender)",
    example: { greek: "No comprendo bien, ¿puede repetir?", ru: "Я не очень понимаю, можете повторить?" },
    present: { "yo": "comprendo", "tú": "comprendes", "él/ella/usted": "comprende", "nosotros": "comprendemos", "vosotros": "comprendéis", "ellos/ellas/ustedes": "comprenden" },
    preterite: { "yo": "comprendí", "tú": "comprendiste", "él/ella/usted": "comprendió", "nosotros": "comprendimos", "vosotros": "comprendisteis", "ellos/ellas/ustedes": "comprendieron" },
    future: { "yo": "comprenderé", "tú": "comprenderás", "él/ella/usted": "comprenderá", "nosotros": "comprenderemos", "vosotros": "comprenderéis", "ellos/ellas/ustedes": "comprenderán" }
  },
  {
    id: 29, infinitive: "abrir", translation: "открывать",
    transcription: "АБРИ́Р", note: "Правильный -ir глагол",
    example: { greek: "El banco abre a las nueve de la mañana.", ru: "Банк открывается в девять утра." },
    present: { "yo": "abro", "tú": "abres", "él/ella/usted": "abre", "nosotros": "abrimos", "vosotros": "abrís", "ellos/ellas/ustedes": "abren" },
    preterite: { "yo": "abrí", "tú": "abriste", "él/ella/usted": "abrió", "nosotros": "abrimos", "vosotros": "abristeis", "ellos/ellas/ustedes": "abrieron" },
    future: { "yo": "abriré", "tú": "abrirás", "él/ella/usted": "abrirá", "nosotros": "abriremos", "vosotros": "abriréis", "ellos/ellas/ustedes": "abrirán" }
  },
  {
    id: 30, infinitive: "escribir", translation: "писать",
    transcription: "ЭСКРИБИ́Р", note: "Правильный -ir глагол",
    example: { greek: "Escribo mi dirección en el formulario.", ru: "Пишу свой адрес в бланке." },
    present: { "yo": "escribo", "tú": "escribes", "él/ella/usted": "escribe", "nosotros": "escribimos", "vosotros": "escribís", "ellos/ellas/ustedes": "escriben" },
    preterite: { "yo": "escribí", "tú": "escribiste", "él/ella/usted": "escribió", "nosotros": "escribimos", "vosotros": "escribisteis", "ellos/ellas/ustedes": "escribieron" },
    future: { "yo": "escribiré", "tú": "escribirás", "él/ella/usted": "escribirá", "nosotros": "escribiremos", "vosotros": "escribiréis", "ellos/ellas/ustedes": "escribirán" }
  },
  {
    id: 31, infinitive: "leer", translation: "читать",
    transcription: "ЛЭЭ́Р", note: "Правильный -er глагол",
    example: { greek: "Leo el contrato antes de firmarlo.", ru: "Читаю договор перед тем как его подписать." },
    present: { "yo": "leo", "tú": "lees", "él/ella/usted": "lee", "nosotros": "leemos", "vosotros": "leéis", "ellos/ellas/ustedes": "leen" },
    preterite: { "yo": "leí", "tú": "leíste", "él/ella/usted": "leyó", "nosotros": "leímos", "vosotros": "leísteis", "ellos/ellas/ustedes": "leyeron" },
    future: { "yo": "leeré", "tú": "leerás", "él/ella/usted": "leerá", "nosotros": "leeremos", "vosotros": "leeréis", "ellos/ellas/ustedes": "leerán" }
  },
  {
    id: 32, infinitive: "beber", translation: "пить",
    transcription: "БЭБЭ́Р", note: "Правильный -er глагол",
    example: { greek: "Bebo café por la mañana y agua todo el día.", ru: "Пью кофе утром и воду весь день." },
    present: { "yo": "bebo", "tú": "bebes", "él/ella/usted": "bebe", "nosotros": "bebemos", "vosotros": "bebéis", "ellos/ellas/ustedes": "beben" },
    preterite: { "yo": "bebí", "tú": "bebiste", "él/ella/usted": "bebió", "nosotros": "bebimos", "vosotros": "bebisteis", "ellos/ellas/ustedes": "bebieron" },
    future: { "yo": "beberé", "tú": "beberás", "él/ella/usted": "beberá", "nosotros": "beberemos", "vosotros": "beberéis", "ellos/ellas/ustedes": "beberán" }
  },
  {
    id: 33, infinitive: "empezar", translation: "начинать",
    transcription: "ЭМПЭСА́Р", note: "Неправильный глагол (e→ie)",
    example: { greek: "Empiezo a trabajar el lunes que viene.", ru: "Начинаю работать в следующий понедельник." },
    present: { "yo": "empiezo", "tú": "empiezas", "él/ella/usted": "empieza", "nosotros": "empezamos", "vosotros": "empezáis", "ellos/ellas/ustedes": "empiezan" },
    preterite: { "yo": "empecé", "tú": "empezaste", "él/ella/usted": "empezó", "nosotros": "empezamos", "vosotros": "empezasteis", "ellos/ellas/ustedes": "empezaron" },
    future: { "yo": "empezaré", "tú": "empezarás", "él/ella/usted": "empezará", "nosotros": "empezaremos", "vosotros": "empezaréis", "ellos/ellas/ustedes": "empezarán" }
  },
  {
    id: 34, infinitive: "terminar", translation: "заканчивать",
    transcription: "ТЭРМИНА́Р", note: "Правильный -ar глагол",
    example: { greek: "Termino de trabajar a las seis de la tarde.", ru: "Заканчиваю работать в шесть вечера." },
    present: { "yo": "termino", "tú": "terminas", "él/ella/usted": "termina", "nosotros": "terminamos", "vosotros": "termináis", "ellos/ellas/ustedes": "terminan" },
    preterite: { "yo": "terminé", "tú": "terminaste", "él/ella/usted": "terminó", "nosotros": "terminamos", "vosotros": "terminasteis", "ellos/ellas/ustedes": "terminaron" },
    future: { "yo": "terminaré", "tú": "terminarás", "él/ella/usted": "terminará", "nosotros": "terminaremos", "vosotros": "terminaréis", "ellos/ellas/ustedes": "terminarán" }
  },
  {
    id: 35, infinitive: "enviar", translation: "отправлять",
    transcription: "ЭНВЬА́Р", note: "Правильный -ar глагол (é в ударных формах)",
    example: { greek: "Envío el documento por correo electrónico.", ru: "Отправляю документ по электронной почте." },
    present: { "yo": "envío", "tú": "envías", "él/ella/usted": "envía", "nosotros": "enviamos", "vosotros": "enviáis", "ellos/ellas/ustedes": "envían" },
    preterite: { "yo": "envié", "tú": "enviaste", "él/ella/usted": "envió", "nosotros": "enviamos", "vosotros": "enviasteis", "ellos/ellas/ustedes": "enviaron" },
    future: { "yo": "enviaré", "tú": "enviarás", "él/ella/usted": "enviará", "nosotros": "enviaremos", "vosotros": "enviaréis", "ellos/ellas/ustedes": "enviarán" }
  },
  {
    id: 36, infinitive: "preguntar", translation: "спрашивать",
    transcription: "ПРЭГУНТА́Р", note: "Правильный -ar глагол",
    example: { greek: "Pregunto al empleado dónde está la cola.", ru: "Спрашиваю у сотрудника, где очередь." },
    present: { "yo": "pregunto", "tú": "preguntas", "él/ella/usted": "pregunta", "nosotros": "preguntamos", "vosotros": "preguntáis", "ellos/ellas/ustedes": "preguntan" },
    preterite: { "yo": "pregunté", "tú": "preguntaste", "él/ella/usted": "preguntó", "nosotros": "preguntamos", "vosotros": "preguntasteis", "ellos/ellas/ustedes": "preguntaron" },
    future: { "yo": "preguntaré", "tú": "preguntarás", "él/ella/usted": "preguntará", "nosotros": "preguntaremos", "vosotros": "preguntaréis", "ellos/ellas/ustedes": "preguntarán" }
  },
  {
    id: 37, infinitive: "responder", translation: "отвечать",
    transcription: "РЭСПОНДЭ́Р", note: "Правильный -er глагол",
    example: { greek: "Respondo a todos los correos importantes.", ru: "Отвечаю на все важные письма." },
    present: { "yo": "respondo", "tú": "respondes", "él/ella/usted": "responde", "nosotros": "respondemos", "vosotros": "respondéis", "ellos/ellas/ustedes": "responden" },
    preterite: { "yo": "respondí", "tú": "respondiste", "él/ella/usted": "respondió", "nosotros": "respondimos", "vosotros": "respondisteis", "ellos/ellas/ustedes": "respondieron" },
    future: { "yo": "responderé", "tú": "responderás", "él/ella/usted": "responderá", "nosotros": "responderemos", "vosotros": "responderéis", "ellos/ellas/ustedes": "responderán" }
  },
  {
    id: 38, infinitive: "mostrar", translation: "показывать",
    transcription: "МОСТРА́Р", note: "Неправильный глагол (o→ue)",
    example: { greek: "Le muestro mi pasaporte al policía.", ru: "Показываю паспорт полицейскому." },
    present: { "yo": "muestro", "tú": "muestras", "él/ella/usted": "muestra", "nosotros": "mostramos", "vosotros": "mostráis", "ellos/ellas/ustedes": "muestran" },
    preterite: { "yo": "mostré", "tú": "mostraste", "él/ella/usted": "mostró", "nosotros": "mostramos", "vosotros": "mostrasteis", "ellos/ellas/ustedes": "mostraron" },
    future: { "yo": "mostraré", "tú": "mostrarás", "él/ella/usted": "mostrará", "nosotros": "mostraremos", "vosotros": "mostraréis", "ellos/ellas/ustedes": "mostrarán" }
  },
  {
    id: 39, infinitive: "pagar", translation: "платить",
    transcription: "ПАГА́Р", note: "Правильный -ar глагол",
    example: { greek: "Pago el alquiler el día uno de cada mes.", ru: "Я плачу аренду первого числа каждого месяца." },
    present: { "yo": "pago", "tú": "pagas", "él/ella/usted": "paga", "nosotros": "pagamos", "vosotros": "pagáis", "ellos/ellas/ustedes": "pagan" },
    preterite: { "yo": "pagué", "tú": "pagaste", "él/ella/usted": "pagó", "nosotros": "pagamos", "vosotros": "pagasteis", "ellos/ellas/ustedes": "pagaron" },
    future: { "yo": "pagaré", "tú": "pagarás", "él/ella/usted": "pagará", "nosotros": "pagaremos", "vosotros": "pagaréis", "ellos/ellas/ustedes": "pagarán" }
  },
  {
    id: 40, infinitive: "buscar", translation: "искать",
    transcription: "БУСКА́Р", note: "Правильный -ar глагол",
    example: { greek: "Busco piso de alquiler cerca del centro.", ru: "Ищу квартиру в аренду возле центра." },
    present: { "yo": "busco", "tú": "buscas", "él/ella/usted": "busca", "nosotros": "buscamos", "vosotros": "buscáis", "ellos/ellas/ustedes": "buscan" },
    preterite: { "yo": "busqué", "tú": "buscaste", "él/ella/usted": "buscó", "nosotros": "buscamos", "vosotros": "buscasteis", "ellos/ellas/ustedes": "buscaron" },
    future: { "yo": "buscaré", "tú": "buscarás", "él/ella/usted": "buscará", "nosotros": "buscaremos", "vosotros": "buscaréis", "ellos/ellas/ustedes": "buscarán" }
  },
  {
    id: 41, infinitive: "encontrar", translation: "находить",
    transcription: "ЭНКОНТРА́Р", note: "Неправильный глагол (o→ue)",
    example: { greek: "Encuentro trabajo gracias a un amigo.", ru: "Нахожу работу благодаря другу." },
    present: { "yo": "encuentro", "tú": "encuentras", "él/ella/usted": "encuentra", "nosotros": "encontramos", "vosotros": "encontráis", "ellos/ellas/ustedes": "encuentran" },
    preterite: { "yo": "encontré", "tú": "encontraste", "él/ella/usted": "encontró", "nosotros": "encontramos", "vosotros": "encontrasteis", "ellos/ellas/ustedes": "encontraron" },
    future: { "yo": "encontraré", "tú": "encontrarás", "él/ella/usted": "encontrará", "nosotros": "encontraremos", "vosotros": "encontraréis", "ellos/ellas/ustedes": "encontrarán" }
  },
  {
    id: 42, infinitive: "llegar", translation: "приходить / прибывать",
    transcription: "ЕГА́Р", note: "Правильный -ar глагол",
    example: { greek: "Llego a la oficina a las nueve en punto.", ru: "Прихожу в офис ровно в девять." },
    present: { "yo": "llego", "tú": "llegas", "él/ella/usted": "llega", "nosotros": "llegamos", "vosotros": "llegáis", "ellos/ellas/ustedes": "llegan" },
    preterite: { "yo": "llegué", "tú": "llegaste", "él/ella/usted": "llegó", "nosotros": "llegamos", "vosotros": "llegasteis", "ellos/ellas/ustedes": "llegaron" },
    future: { "yo": "llegaré", "tú": "llegarás", "él/ella/usted": "llegará", "nosotros": "llegaremos", "vosotros": "llegaréis", "ellos/ellas/ustedes": "llegarán" }
  },
  {
    id: 43, infinitive: "esperar", translation: "ждать / надеяться",
    transcription: "ЭСПЭРА́Р", note: "Правильный -ar глагол",
    example: { greek: "Espero el autobús en la parada.", ru: "Жду автобус на остановке." },
    present: { "yo": "espero", "tú": "esperas", "él/ella/usted": "espera", "nosotros": "esperamos", "vosotros": "esperáis", "ellos/ellas/ustedes": "esperan" },
    preterite: { "yo": "esperé", "tú": "esperaste", "él/ella/usted": "esperó", "nosotros": "esperamos", "vosotros": "esperasteis", "ellos/ellas/ustedes": "esperaron" },
    future: { "yo": "esperaré", "tú": "esperarás", "él/ella/usted": "esperará", "nosotros": "esperaremos", "vosotros": "esperaréis", "ellos/ellas/ustedes": "esperarán" }
  },
  {
    id: 44, infinitive: "pensar", translation: "думать",
    transcription: "ПЭНСА́Р", note: "Неправильный глагол (e→ie)",
    example: { greek: "Pienso mudarme a Valencia el año que viene.", ru: "Думаю переехать в Валенсию в следующем году." },
    present: { "yo": "pienso", "tú": "piensas", "él/ella/usted": "piensa", "nosotros": "pensamos", "vosotros": "pensáis", "ellos/ellas/ustedes": "piensan" },
    preterite: { "yo": "pensé", "tú": "pensaste", "él/ella/usted": "pensó", "nosotros": "pensamos", "vosotros": "pensasteis", "ellos/ellas/ustedes": "pensaron" },
    future: { "yo": "pensaré", "tú": "pensarás", "él/ella/usted": "pensará", "nosotros": "pensaremos", "vosotros": "pensaréis", "ellos/ellas/ustedes": "pensarán" }
  },
  {
    id: 45, infinitive: "sentir", translation: "чувствовать / сожалеть",
    transcription: "СЭНТИ́Р", note: "Неправильный глагол (e→ie)",
    example: { greek: "Siento mucho llegar tarde a la cita.", ru: "Мне очень жаль опоздать на встречу." },
    present: { "yo": "siento", "tú": "sientes", "él/ella/usted": "siente", "nosotros": "sentimos", "vosotros": "sentís", "ellos/ellas/ustedes": "sienten" },
    preterite: { "yo": "sentí", "tú": "sentiste", "él/ella/usted": "sintió", "nosotros": "sentimos", "vosotros": "sentisteis", "ellos/ellas/ustedes": "sintieron" },
    future: { "yo": "sentiré", "tú": "sentirás", "él/ella/usted": "sentirá", "nosotros": "sentiremos", "vosotros": "sentiréis", "ellos/ellas/ustedes": "sentirán" }
  },
  {
    id: 46, infinitive: "tomar", translation: "брать / пить / садиться (в транспорт)",
    transcription: "ТОМА́Р", note: "Правильный -ar глагол",
    example: { greek: "Tomo el metro para ir al trabajo.", ru: "Езжу на метро на работу." },
    present: { "yo": "tomo", "tú": "tomas", "él/ella/usted": "toma", "nosotros": "tomamos", "vosotros": "tomáis", "ellos/ellas/ustedes": "toman" },
    preterite: { "yo": "tomé", "tú": "tomaste", "él/ella/usted": "tomó", "nosotros": "tomamos", "vosotros": "tomasteis", "ellos/ellas/ustedes": "tomaron" },
    future: { "yo": "tomaré", "tú": "tomarás", "él/ella/usted": "tomará", "nosotros": "tomaremos", "vosotros": "tomaréis", "ellos/ellas/ustedes": "tomarán" }
  },
  {
    id: 47, infinitive: "llevar", translation: "нести / носить / везти",
    transcription: "ЕВА́Р", note: "Правильный -ar глагол",
    example: { greek: "Llevo el pasaporte siempre conmigo.", ru: "Всегда ношу паспорт с собой." },
    present: { "yo": "llevo", "tú": "llevas", "él/ella/usted": "lleva", "nosotros": "llevamos", "vosotros": "lleváis", "ellos/ellas/ustedes": "llevan" },
    preterite: { "yo": "llevé", "tú": "llevaste", "él/ella/usted": "llevó", "nosotros": "llevamos", "vosotros": "llevasteis", "ellos/ellas/ustedes": "llevaron" },
    future: { "yo": "llevaré", "tú": "llevarás", "él/ella/usted": "llevará", "nosotros": "llevaremos", "vosotros": "llevaréis", "ellos/ellas/ustedes": "llevarán" }
  },
  {
    id: 48, infinitive: "dejar", translation: "оставлять / позволять",
    transcription: "ДЭХА́Р", note: "Правильный -ar глагол",
    example: { greek: "Dejo las llaves en la recepción.", ru: "Оставляю ключи на ресепшене." },
    present: { "yo": "dejo", "tú": "dejas", "él/ella/usted": "deja", "nosotros": "dejamos", "vosotros": "dejáis", "ellos/ellas/ustedes": "dejan" },
    preterite: { "yo": "dejé", "tú": "dejaste", "él/ella/usted": "dejó", "nosotros": "dejamos", "vosotros": "dejasteis", "ellos/ellas/ustedes": "dejaron" },
    future: { "yo": "dejaré", "tú": "dejarás", "él/ella/usted": "dejará", "nosotros": "dejaremos", "vosotros": "dejaréis", "ellos/ellas/ustedes": "dejarán" }
  },
  {
    id: 49, infinitive: "pasar", translation: "проходить / проводить (время)",
    transcription: "ПАСА́Р", note: "Правильный -ar глагол",
    example: { greek: "Paso el fin de semana en la playa.", ru: "Провожу выходные на пляже." },
    present: { "yo": "paso", "tú": "pasas", "él/ella/usted": "pasa", "nosotros": "pasamos", "vosotros": "pasáis", "ellos/ellas/ustedes": "pasan" },
    preterite: { "yo": "pasé", "tú": "pasaste", "él/ella/usted": "pasó", "nosotros": "pasamos", "vosotros": "pasasteis", "ellos/ellas/ustedes": "pasaron" },
    future: { "yo": "pasaré", "tú": "pasarás", "él/ella/usted": "pasará", "nosotros": "pasaremos", "vosotros": "pasaréis", "ellos/ellas/ustedes": "pasarán" }
  },
  {
    id: 50, infinitive: "quedar", translation: "оставаться / договариваться о встрече",
    transcription: "КЭДА́Р", note: "Правильный -ar глагол",
    example: { greek: "Quedamos a las seis en la plaza.", ru: "Договариваемся встретиться в шесть на площади." },
    present: { "yo": "quedo", "tú": "quedas", "él/ella/usted": "queda", "nosotros": "quedamos", "vosotros": "quedáis", "ellos/ellas/ustedes": "quedan" },
    preterite: { "yo": "quedé", "tú": "quedaste", "él/ella/usted": "quedó", "nosotros": "quedamos", "vosotros": "quedasteis", "ellos/ellas/ustedes": "quedaron" },
    future: { "yo": "quedaré", "tú": "quedarás", "él/ella/usted": "quedará", "nosotros": "quedaremos", "vosotros": "quedaréis", "ellos/ellas/ustedes": "quedarán" }
  },
  {
    id: 51, infinitive: "usar", translation: "использовать",
    transcription: "УСА́Р", note: "Правильный -ar глагол",
    example: { greek: "Uso una aplicación para aprender español.", ru: "Использую приложение, чтобы учить испанский." },
    present: { "yo": "uso", "tú": "usas", "él/ella/usted": "usa", "nosotros": "usamos", "vosotros": "usáis", "ellos/ellas/ustedes": "usan" },
    preterite: { "yo": "usé", "tú": "usaste", "él/ella/usted": "usó", "nosotros": "usamos", "vosotros": "usasteis", "ellos/ellas/ustedes": "usaron" },
    future: { "yo": "usaré", "tú": "usarás", "él/ella/usted": "usará", "nosotros": "usaremos", "vosotros": "usaréis", "ellos/ellas/ustedes": "usarán" }
  },
  {
    id: 52, infinitive: "entrar", translation: "входить",
    transcription: "ЭНТРА́Р", note: "Правильный -ar глагол",
    example: { greek: "Entro en la tienda a comprar pan.", ru: "Захожу в магазин купить хлеб." },
    present: { "yo": "entro", "tú": "entras", "él/ella/usted": "entra", "nosotros": "entramos", "vosotros": "entráis", "ellos/ellas/ustedes": "entran" },
    preterite: { "yo": "entré", "tú": "entraste", "él/ella/usted": "entró", "nosotros": "entramos", "vosotros": "entrasteis", "ellos/ellas/ustedes": "entraron" },
    future: { "yo": "entraré", "tú": "entrarás", "él/ella/usted": "entrará", "nosotros": "entraremos", "vosotros": "entraréis", "ellos/ellas/ustedes": "entrarán" }
  },
  {
    id: 53, infinitive: "firmar", translation: "подписывать",
    transcription: "ФИРМА́Р", note: "Правильный -ar глагол",
    example: { greek: "Firmo el contrato de alquiler hoy.", ru: "Подписываю договор аренды сегодня." },
    present: { "yo": "firmo", "tú": "firmas", "él/ella/usted": "firma", "nosotros": "firmamos", "vosotros": "firmáis", "ellos/ellas/ustedes": "firman" },
    preterite: { "yo": "firmé", "tú": "firmaste", "él/ella/usted": "firmó", "nosotros": "firmamos", "vosotros": "firmasteis", "ellos/ellas/ustedes": "firmaron" },
    future: { "yo": "firmaré", "tú": "firmarás", "él/ella/usted": "firmará", "nosotros": "firmaremos", "vosotros": "firmaréis", "ellos/ellas/ustedes": "firmarán" }
  },
  {
    id: 54, infinitive: "rellenar", translation: "заполнять (бланк)",
    transcription: "РЭЙЕНА́Р", note: "Правильный -ar глагол",
    example: { greek: "Relleno el formulario para el NIE.", ru: "Заполняю бланк на NIE." },
    present: { "yo": "relleno", "tú": "rellenas", "él/ella/usted": "rellena", "nosotros": "rellenamos", "vosotros": "rellenáis", "ellos/ellas/ustedes": "rellenan" },
    preterite: { "yo": "rellené", "tú": "rellenaste", "él/ella/usted": "rellenó", "nosotros": "rellenamos", "vosotros": "rellenasteis", "ellos/ellas/ustedes": "rellenaron" },
    future: { "yo": "rellenaré", "tú": "rellenarás", "él/ella/usted": "rellenará", "nosotros": "rellenaremos", "vosotros": "rellenaréis", "ellos/ellas/ustedes": "rellenarán" }
  },
  {
    id: 55, infinitive: "reservar", translation: "бронировать",
    transcription: "РЭСЭРВА́Р", note: "Правильный -ar глагол",
    example: { greek: "Reservo una mesa para dos personas.", ru: "Бронирую столик на двоих." },
    present: { "yo": "reservo", "tú": "reservas", "él/ella/usted": "reserva", "nosotros": "reservamos", "vosotros": "reserváis", "ellos/ellas/ustedes": "reservan" },
    preterite: { "yo": "reservé", "tú": "reservaste", "él/ella/usted": "reservó", "nosotros": "reservamos", "vosotros": "reservasteis", "ellos/ellas/ustedes": "reservaron" },
    future: { "yo": "reservaré", "tú": "reservarás", "él/ella/usted": "reservará", "nosotros": "reservaremos", "vosotros": "reservaréis", "ellos/ellas/ustedes": "reservarán" }
  },
  {
    id: 56, infinitive: "cambiar", translation: "менять / обменивать",
    transcription: "КАМБЬА́Р", note: "Правильный -ar глагол",
    example: { greek: "Quiero cambiar euros por dólares.", ru: "Хочу обменять евро на доллары." },
    present: { "yo": "cambio", "tú": "cambias", "él/ella/usted": "cambia", "nosotros": "cambiamos", "vosotros": "cambiáis", "ellos/ellas/ustedes": "cambian" },
    preterite: { "yo": "cambié", "tú": "cambiaste", "él/ella/usted": "cambió", "nosotros": "cambiamos", "vosotros": "cambiasteis", "ellos/ellas/ustedes": "cambiaron" },
    future: { "yo": "cambiaré", "tú": "cambiarás", "él/ella/usted": "cambiará", "nosotros": "cambiaremos", "vosotros": "cambiaréis", "ellos/ellas/ustedes": "cambiarán" }
  },
  {
    id: 57, infinitive: "viajar", translation: "путешествовать",
    transcription: "ВЬЯХА́Р", note: "Правильный -ar глагол",
    example: { greek: "Viajo a Sevilla en tren este verano.", ru: "Еду в Севилью на поезде этим летом." },
    present: { "yo": "viajo", "tú": "viajas", "él/ella/usted": "viaja", "nosotros": "viajamos", "vosotros": "viajáis", "ellos/ellas/ustedes": "viajan" },
    preterite: { "yo": "viajé", "tú": "viajaste", "él/ella/usted": "viajó", "nosotros": "viajamos", "vosotros": "viajasteis", "ellos/ellas/ustedes": "viajaron" },
    future: { "yo": "viajaré", "tú": "viajarás", "él/ella/usted": "viajará", "nosotros": "viajaremos", "vosotros": "viajaréis", "ellos/ellas/ustedes": "viajarán" }
  },
  {
    id: 58, infinitive: "visitar", translation: "посещать / навещать",
    transcription: "ВИСИТА́Р", note: "Правильный -ar глагол",
    example: { greek: "Visito a mis amigos en Barcelona.", ru: "Навещаю друзей в Барселоне." },
    present: { "yo": "visito", "tú": "visitas", "él/ella/usted": "visita", "nosotros": "visitamos", "vosotros": "visitáis", "ellos/ellas/ustedes": "visitan" },
    preterite: { "yo": "visité", "tú": "visitaste", "él/ella/usted": "visitó", "nosotros": "visitamos", "vosotros": "visitasteis", "ellos/ellas/ustedes": "visitaron" },
    future: { "yo": "visitaré", "tú": "visitarás", "él/ella/usted": "visitará", "nosotros": "visitaremos", "vosotros": "visitaréis", "ellos/ellas/ustedes": "visitarán" }
  },
  {
    id: 59, infinitive: "cocinar", translation: "готовить (еду)",
    transcription: "КОСИНА́Р", note: "Правильный -ar глагол",
    example: { greek: "Cocino una tortilla española para la cena.", ru: "Готовлю испанскую тортилью на ужин." },
    present: { "yo": "cocino", "tú": "cocinas", "él/ella/usted": "cocina", "nosotros": "cocinamos", "vosotros": "cocináis", "ellos/ellas/ustedes": "cocinan" },
    preterite: { "yo": "cociné", "tú": "cocinaste", "él/ella/usted": "cocinó", "nosotros": "cocinamos", "vosotros": "cocinasteis", "ellos/ellas/ustedes": "cocinaron" },
    future: { "yo": "cocinaré", "tú": "cocinarás", "él/ella/usted": "cocinará", "nosotros": "cocinaremos", "vosotros": "cocinaréis", "ellos/ellas/ustedes": "cocinarán" }
  },
  {
    id: 60, infinitive: "limpiar", translation: "убирать / чистить",
    transcription: "ЛИМПЬА́Р", note: "Правильный -ar глагол",
    example: { greek: "Limpio el piso los sábados.", ru: "Убираю квартиру по субботам." },
    present: { "yo": "limpio", "tú": "limpias", "él/ella/usted": "limpia", "nosotros": "limpiamos", "vosotros": "limpiáis", "ellos/ellas/ustedes": "limpian" },
    preterite: { "yo": "limpié", "tú": "limpiaste", "él/ella/usted": "limpió", "nosotros": "limpiamos", "vosotros": "limpiasteis", "ellos/ellas/ustedes": "limpiaron" },
    future: { "yo": "limpiaré", "tú": "limpiarás", "él/ella/usted": "limpiará", "nosotros": "limpiaremos", "vosotros": "limpiaréis", "ellos/ellas/ustedes": "limpiarán" }
  },
  {
    id: 61, infinitive: "descansar", translation: "отдыхать",
    transcription: "ДЭСКАНСА́Р", note: "Правильный -ar глагол",
    example: { greek: "Descanso un poco después del trabajo.", ru: "Немного отдыхаю после работы." },
    present: { "yo": "descanso", "tú": "descansas", "él/ella/usted": "descansa", "nosotros": "descansamos", "vosotros": "descansáis", "ellos/ellas/ustedes": "descansan" },
    preterite: { "yo": "descansé", "tú": "descansaste", "él/ella/usted": "descansó", "nosotros": "descansamos", "vosotros": "descansasteis", "ellos/ellas/ustedes": "descansaron" },
    future: { "yo": "descansaré", "tú": "descansarás", "él/ella/usted": "descansará", "nosotros": "descansaremos", "vosotros": "descansaréis", "ellos/ellas/ustedes": "descansarán" }
  },
  {
    id: 62, infinitive: "alquilar", translation: "арендовать / снимать",
    transcription: "АЛЬКИЛА́Р", note: "Правильный -ar глагол",
    example: { greek: "Alquilo un piso en el centro de Valencia.", ru: "Снимаю квартиру в центре Валенсии." },
    present: { "yo": "alquilo", "tú": "alquilas", "él/ella/usted": "alquila", "nosotros": "alquilamos", "vosotros": "alquiláis", "ellos/ellas/ustedes": "alquilan" },
    preterite: { "yo": "alquilé", "tú": "alquilaste", "él/ella/usted": "alquiló", "nosotros": "alquilamos", "vosotros": "alquilasteis", "ellos/ellas/ustedes": "alquilaron" },
    future: { "yo": "alquilaré", "tú": "alquilarás", "él/ella/usted": "alquilará", "nosotros": "alquilaremos", "vosotros": "alquilaréis", "ellos/ellas/ustedes": "alquilarán" }
  },
  {
    id: 63, infinitive: "preparar", translation: "готовить / подготавливать",
    transcription: "ПРЭПАРА́Р", note: "Правильный -ar глагол",
    example: { greek: "Preparo los documentos para la cita.", ru: "Готовлю документы к приёму." },
    present: { "yo": "preparo", "tú": "preparas", "él/ella/usted": "prepara", "nosotros": "preparamos", "vosotros": "preparáis", "ellos/ellas/ustedes": "preparan" },
    preterite: { "yo": "preparé", "tú": "preparaste", "él/ella/usted": "preparó", "nosotros": "preparamos", "vosotros": "preparasteis", "ellos/ellas/ustedes": "prepararon" },
    future: { "yo": "prepararé", "tú": "prepararás", "él/ella/usted": "preparará", "nosotros": "prepararemos", "vosotros": "prepararéis", "ellos/ellas/ustedes": "prepararán" }
  },
  {
    id: 64, infinitive: "aprender", translation: "учить / учиться",
    transcription: "АПРЭНДЭ́Р", note: "Правильный -er глагол",
    example: { greek: "Aprendo español para vivir en España.", ru: "Учу испанский, чтобы жить в Испании." },
    present: { "yo": "aprendo", "tú": "aprendes", "él/ella/usted": "aprende", "nosotros": "aprendemos", "vosotros": "aprendéis", "ellos/ellas/ustedes": "aprenden" },
    preterite: { "yo": "aprendí", "tú": "aprendiste", "él/ella/usted": "aprendió", "nosotros": "aprendimos", "vosotros": "aprendisteis", "ellos/ellas/ustedes": "aprendieron" },
    future: { "yo": "aprenderé", "tú": "aprenderás", "él/ella/usted": "aprenderá", "nosotros": "aprenderemos", "vosotros": "aprenderéis", "ellos/ellas/ustedes": "aprenderán" }
  },
  {
    id: 65, infinitive: "vender", translation: "продавать",
    transcription: "ВЭНДЭ́Р", note: "Правильный -er глагол",
    example: { greek: "Vendo mi coche antes de mudarme.", ru: "Продаю машину перед переездом." },
    present: { "yo": "vendo", "tú": "vendes", "él/ella/usted": "vende", "nosotros": "vendemos", "vosotros": "vendéis", "ellos/ellas/ustedes": "venden" },
    preterite: { "yo": "vendí", "tú": "vendiste", "él/ella/usted": "vendió", "nosotros": "vendimos", "vosotros": "vendisteis", "ellos/ellas/ustedes": "vendieron" },
    future: { "yo": "venderé", "tú": "venderás", "él/ella/usted": "venderá", "nosotros": "venderemos", "vosotros": "venderéis", "ellos/ellas/ustedes": "venderán" }
  },
  {
    id: 66, infinitive: "deber", translation: "быть должным",
    transcription: "ДЭБЭ́Р", note: "Правильный -er глагол",
    example: { greek: "Debo pagar el alquiler antes del día cinco.", ru: "Должен оплатить аренду до пятого числа." },
    present: { "yo": "debo", "tú": "debes", "él/ella/usted": "debe", "nosotros": "debemos", "vosotros": "debéis", "ellos/ellas/ustedes": "deben" },
    preterite: { "yo": "debí", "tú": "debiste", "él/ella/usted": "debió", "nosotros": "debimos", "vosotros": "debisteis", "ellos/ellas/ustedes": "debieron" },
    future: { "yo": "deberé", "tú": "deberás", "él/ella/usted": "deberá", "nosotros": "deberemos", "vosotros": "deberéis", "ellos/ellas/ustedes": "deberán" }
  },
  {
    id: 67, infinitive: "correr", translation: "бегать",
    transcription: "КОРРЭ́Р", note: "Правильный -er глагол",
    example: { greek: "Corro por la playa cada mañana.", ru: "Бегаю по пляжу каждое утро." },
    present: { "yo": "corro", "tú": "corres", "él/ella/usted": "corre", "nosotros": "corremos", "vosotros": "corréis", "ellos/ellas/ustedes": "corren" },
    preterite: { "yo": "corrí", "tú": "corriste", "él/ella/usted": "corrió", "nosotros": "corrimos", "vosotros": "corristeis", "ellos/ellas/ustedes": "corrieron" },
    future: { "yo": "correré", "tú": "correrás", "él/ella/usted": "correrá", "nosotros": "correremos", "vosotros": "correréis", "ellos/ellas/ustedes": "correrán" }
  },
  {
    id: 68, infinitive: "recibir", translation: "получать",
    transcription: "РЭСИБИ́Р", note: "Правильный -ir глагол",
    example: { greek: "Recibo el paquete en casa por la tarde.", ru: "Получаю посылку дома днём." },
    present: { "yo": "recibo", "tú": "recibes", "él/ella/usted": "recibe", "nosotros": "recibimos", "vosotros": "recibís", "ellos/ellas/ustedes": "reciben" },
    preterite: { "yo": "recibí", "tú": "recibiste", "él/ella/usted": "recibió", "nosotros": "recibimos", "vosotros": "recibisteis", "ellos/ellas/ustedes": "recibieron" },
    future: { "yo": "recibiré", "tú": "recibirás", "él/ella/usted": "recibirá", "nosotros": "recibiremos", "vosotros": "recibiréis", "ellos/ellas/ustedes": "recibirán" }
  },
  {
    id: 69, infinitive: "subir", translation: "подниматься / садиться (в транспорт)",
    transcription: "СУБИ́Р", note: "Правильный -ir глагол",
    example: { greek: "Subo al autobús en la próxima parada.", ru: "Сажусь в автобус на следующей остановке." },
    present: { "yo": "subo", "tú": "subes", "él/ella/usted": "sube", "nosotros": "subimos", "vosotros": "subís", "ellos/ellas/ustedes": "suben" },
    preterite: { "yo": "subí", "tú": "subiste", "él/ella/usted": "subió", "nosotros": "subimos", "vosotros": "subisteis", "ellos/ellas/ustedes": "subieron" },
    future: { "yo": "subiré", "tú": "subirás", "él/ella/usted": "subirá", "nosotros": "subiremos", "vosotros": "subiréis", "ellos/ellas/ustedes": "subirán" }
  },
  {
    id: 70, infinitive: "decidir", translation: "решать",
    transcription: "ДЭСИДИ́Р", note: "Правильный -ir глагол",
    example: { greek: "Decido quedarme en España un año más.", ru: "Решаю остаться в Испании ещё на год." },
    present: { "yo": "decido", "tú": "decides", "él/ella/usted": "decide", "nosotros": "decidimos", "vosotros": "decidís", "ellos/ellas/ustedes": "deciden" },
    preterite: { "yo": "decidí", "tú": "decidiste", "él/ella/usted": "decidió", "nosotros": "decidimos", "vosotros": "decidisteis", "ellos/ellas/ustedes": "decidieron" },
    future: { "yo": "decidiré", "tú": "decidirás", "él/ella/usted": "decidirá", "nosotros": "decidiremos", "vosotros": "decidiréis", "ellos/ellas/ustedes": "decidirán" }
  },
  {
    id: 71, infinitive: "permitir", translation: "разрешать",
    transcription: "ПЭРМИТИ́Р", note: "Правильный -ir глагол",
    example: { greek: "El contrato no permite tener animales.", ru: "Договор не разрешает держать животных." },
    present: { "yo": "permito", "tú": "permites", "él/ella/usted": "permite", "nosotros": "permitimos", "vosotros": "permitís", "ellos/ellas/ustedes": "permiten" },
    preterite: { "yo": "permití", "tú": "permitiste", "él/ella/usted": "permitió", "nosotros": "permitimos", "vosotros": "permitisteis", "ellos/ellas/ustedes": "permitieron" },
    future: { "yo": "permitiré", "tú": "permitirás", "él/ella/usted": "permitirá", "nosotros": "permitiremos", "vosotros": "permitiréis", "ellos/ellas/ustedes": "permitirán" }
  },
  {
    id: 72, infinitive: "entender", translation: "понимать",
    transcription: "ЭНТЭНДЭ́Р", note: "Неправильный глагол (e→ie)",
    example: { greek: "No entiendo bien el acento andaluz.", ru: "Я не очень понимаю андалузский акцент." },
    present: { "yo": "entiendo", "tú": "entiendes", "él/ella/usted": "entiende", "nosotros": "entendemos", "vosotros": "entendéis", "ellos/ellas/ustedes": "entienden" },
    preterite: { "yo": "entendí", "tú": "entendiste", "él/ella/usted": "entendió", "nosotros": "entendimos", "vosotros": "entendisteis", "ellos/ellas/ustedes": "entendieron" },
    future: { "yo": "entenderé", "tú": "entenderás", "él/ella/usted": "entenderá", "nosotros": "entenderemos", "vosotros": "entenderéis", "ellos/ellas/ustedes": "entenderán" }
  },
  {
    id: 73, infinitive: "volver", translation: "возвращаться",
    transcription: "ВОЛЬВЭ́Р", note: "Неправильный глагол (o→ue)",
    example: { greek: "Vuelvo a casa a las ocho de la tarde.", ru: "Возвращаюсь домой в восемь вечера." },
    present: { "yo": "vuelvo", "tú": "vuelves", "él/ella/usted": "vuelve", "nosotros": "volvemos", "vosotros": "volvéis", "ellos/ellas/ustedes": "vuelven" },
    preterite: { "yo": "volví", "tú": "volviste", "él/ella/usted": "volvió", "nosotros": "volvimos", "vosotros": "volvisteis", "ellos/ellas/ustedes": "volvieron" },
    future: { "yo": "volveré", "tú": "volverás", "él/ella/usted": "volverá", "nosotros": "volveremos", "vosotros": "volveréis", "ellos/ellas/ustedes": "volverán" }
  },
  {
    id: 74, infinitive: "dormir", translation: "спать",
    transcription: "ДОРМИ́Р", note: "Неправильный глагол (o→ue; 3 л. durmió)",
    example: { greek: "Duermo ocho horas cada noche.", ru: "Сплю восемь часов каждую ночь." },
    present: { "yo": "duermo", "tú": "duermes", "él/ella/usted": "duerme", "nosotros": "dormimos", "vosotros": "dormís", "ellos/ellas/ustedes": "duermen" },
    preterite: { "yo": "dormí", "tú": "dormiste", "él/ella/usted": "durmió", "nosotros": "dormimos", "vosotros": "dormisteis", "ellos/ellas/ustedes": "durmieron" },
    future: { "yo": "dormiré", "tú": "dormirás", "él/ella/usted": "dormirá", "nosotros": "dormiremos", "vosotros": "dormiréis", "ellos/ellas/ustedes": "dormirán" }
  },
  {
    id: 75, infinitive: "pedir", translation: "просить / заказывать",
    transcription: "ПЭДИ́Р", note: "Неправильный глагол (e→i)",
    example: { greek: "Pido la cuenta al camarero.", ru: "Прошу счёт у официанта." },
    present: { "yo": "pido", "tú": "pides", "él/ella/usted": "pide", "nosotros": "pedimos", "vosotros": "pedís", "ellos/ellas/ustedes": "piden" },
    preterite: { "yo": "pedí", "tú": "pediste", "él/ella/usted": "pidió", "nosotros": "pedimos", "vosotros": "pedisteis", "ellos/ellas/ustedes": "pidieron" },
    future: { "yo": "pediré", "tú": "pedirás", "él/ella/usted": "pedirá", "nosotros": "pediremos", "vosotros": "pediréis", "ellos/ellas/ustedes": "pedirán" }
  },
  {
    id: 76, infinitive: "conocer", translation: "знать / быть знакомым",
    transcription: "КОНОСЭ́Р", note: "Неправильный глагол (1 л. ед.ч. conozco)",
    example: { greek: "Conozco un buen restaurante cerca de aquí.", ru: "Знаю хороший ресторан неподалёку." },
    present: { "yo": "conozco", "tú": "conoces", "él/ella/usted": "conoce", "nosotros": "conocemos", "vosotros": "conocéis", "ellos/ellas/ustedes": "conocen" },
    preterite: { "yo": "conocí", "tú": "conociste", "él/ella/usted": "conoció", "nosotros": "conocimos", "vosotros": "conocisteis", "ellos/ellas/ustedes": "conocieron" },
    future: { "yo": "conoceré", "tú": "conocerás", "él/ella/usted": "conocerá", "nosotros": "conoceremos", "vosotros": "conoceréis", "ellos/ellas/ustedes": "conocerán" }
  },
  {
    id: 77, infinitive: "seguir", translation: "следовать / продолжать",
    transcription: "СЭГИ́Р", note: "Неправильный глагол (e→i; sigo)",
    example: { greek: "Sigo todo recto hasta la plaza.", ru: "Иду прямо до площади." },
    present: { "yo": "sigo", "tú": "sigues", "él/ella/usted": "sigue", "nosotros": "seguimos", "vosotros": "seguís", "ellos/ellas/ustedes": "siguen" },
    preterite: { "yo": "seguí", "tú": "seguiste", "él/ella/usted": "siguió", "nosotros": "seguimos", "vosotros": "seguisteis", "ellos/ellas/ustedes": "siguieron" },
    future: { "yo": "seguiré", "tú": "seguirás", "él/ella/usted": "seguirá", "nosotros": "seguiremos", "vosotros": "seguiréis", "ellos/ellas/ustedes": "seguirán" }
  },
  {
    id: 78, infinitive: "jugar", translation: "играть",
    transcription: "ХУГА́Р", note: "Неправильный глагол (u→ue; jugué)",
    example: { greek: "Juego al fútbol con mis vecinos.", ru: "Играю в футбол с соседями." },
    present: { "yo": "juego", "tú": "juegas", "él/ella/usted": "juega", "nosotros": "jugamos", "vosotros": "jugáis", "ellos/ellas/ustedes": "juegan" },
    preterite: { "yo": "jugué", "tú": "jugaste", "él/ella/usted": "jugó", "nosotros": "jugamos", "vosotros": "jugasteis", "ellos/ellas/ustedes": "jugaron" },
    future: { "yo": "jugaré", "tú": "jugarás", "él/ella/usted": "jugará", "nosotros": "jugaremos", "vosotros": "jugaréis", "ellos/ellas/ustedes": "jugarán" }
  },
  {
    id: 79, infinitive: "cerrar", translation: "закрывать",
    transcription: "СЭРРА́Р", note: "Неправильный глагол (e→ie)",
    example: { greek: "La farmacia cierra a las nueve.", ru: "Аптека закрывается в девять." },
    present: { "yo": "cierro", "tú": "cierras", "él/ella/usted": "cierra", "nosotros": "cerramos", "vosotros": "cerráis", "ellos/ellas/ustedes": "cierran" },
    preterite: { "yo": "cerré", "tú": "cerraste", "él/ella/usted": "cerró", "nosotros": "cerramos", "vosotros": "cerrasteis", "ellos/ellas/ustedes": "cerraron" },
    future: { "yo": "cerraré", "tú": "cerrarás", "él/ella/usted": "cerrará", "nosotros": "cerraremos", "vosotros": "cerraréis", "ellos/ellas/ustedes": "cerrarán" }
  },
  {
    id: 80, infinitive: "perder", translation: "терять / опаздывать (на транспорт)",
    transcription: "ПЭРДЭ́Р", note: "Неправильный глагол (e→ie)",
    example: { greek: "No quiero perder el tren de las diez.", ru: "Не хочу опоздать на поезд в десять." },
    present: { "yo": "pierdo", "tú": "pierdes", "él/ella/usted": "pierde", "nosotros": "perdemos", "vosotros": "perdéis", "ellos/ellas/ustedes": "pierden" },
    preterite: { "yo": "perdí", "tú": "perdiste", "él/ella/usted": "perdió", "nosotros": "perdimos", "vosotros": "perdisteis", "ellos/ellas/ustedes": "perdieron" },
    future: { "yo": "perderé", "tú": "perderás", "él/ella/usted": "perderá", "nosotros": "perderemos", "vosotros": "perderéis", "ellos/ellas/ustedes": "perderán" }
  },
  {
    id: 81, infinitive: "contar", translation: "считать / рассказывать",
    transcription: "КОНТА́Р", note: "Неправильный глагол (o→ue)",
    example: { greek: "Te cuento cómo funciona el sistema.", ru: "Расскажу тебе, как работает система." },
    present: { "yo": "cuento", "tú": "cuentas", "él/ella/usted": "cuenta", "nosotros": "contamos", "vosotros": "contáis", "ellos/ellas/ustedes": "cuentan" },
    preterite: { "yo": "conté", "tú": "contaste", "él/ella/usted": "contó", "nosotros": "contamos", "vosotros": "contasteis", "ellos/ellas/ustedes": "contaron" },
    future: { "yo": "contaré", "tú": "contarás", "él/ella/usted": "contará", "nosotros": "contaremos", "vosotros": "contaréis", "ellos/ellas/ustedes": "contarán" }
  },
  {
    id: 82, infinitive: "preferir", translation: "предпочитать",
    transcription: "ПРЭФЭРИ́Р", note: "Неправильный глагол (e→ie; 3 л. prefirió)",
    example: { greek: "Prefiero pagar con tarjeta.", ru: "Предпочитаю платить картой." },
    present: { "yo": "prefiero", "tú": "prefieres", "él/ella/usted": "prefiere", "nosotros": "preferimos", "vosotros": "preferís", "ellos/ellas/ustedes": "prefieren" },
    preterite: { "yo": "preferí", "tú": "preferiste", "él/ella/usted": "prefirió", "nosotros": "preferimos", "vosotros": "preferisteis", "ellos/ellas/ustedes": "prefirieron" },
    future: { "yo": "preferiré", "tú": "preferirás", "él/ella/usted": "preferirá", "nosotros": "preferiremos", "vosotros": "preferiréis", "ellos/ellas/ustedes": "preferirán" }
  },
  {
    id: 83, infinitive: "conducir", translation: "водить (машину)",
    transcription: "КОНДУСИ́Р", note: "Неправильный глагол (1 л. conduzco; прош. conduje)",
    example: { greek: "Conduzco con cuidado en la ciudad.", ru: "Веду машину осторожно в городе." },
    present: { "yo": "conduzco", "tú": "conduces", "él/ella/usted": "conduce", "nosotros": "conducimos", "vosotros": "conducís", "ellos/ellas/ustedes": "conducen" },
    preterite: { "yo": "conduje", "tú": "condujiste", "él/ella/usted": "condujo", "nosotros": "condujimos", "vosotros": "condujisteis", "ellos/ellas/ustedes": "condujeron" },
    future: { "yo": "conduciré", "tú": "conducirás", "él/ella/usted": "conducirá", "nosotros": "conduciremos", "vosotros": "conduciréis", "ellos/ellas/ustedes": "conducirán" }
  },
  {
    id: 84, infinitive: "traer", translation: "приносить",
    transcription: "ТРАЭ́Р", note: "Неправильный глагол (1 л. traigo; прош. traje)",
    example: { greek: "Traigo el DNI y una copia.", ru: "Приношу удостоверение и копию." },
    present: { "yo": "traigo", "tú": "traes", "él/ella/usted": "trae", "nosotros": "traemos", "vosotros": "traéis", "ellos/ellas/ustedes": "traen" },
    preterite: { "yo": "traje", "tú": "trajiste", "él/ella/usted": "trajo", "nosotros": "trajimos", "vosotros": "trajisteis", "ellos/ellas/ustedes": "trajeron" },
    future: { "yo": "traeré", "tú": "traerás", "él/ella/usted": "traerá", "nosotros": "traeremos", "vosotros": "traeréis", "ellos/ellas/ustedes": "traerán" }
  },
  {
    id: 85, infinitive: "oír", translation: "слышать",
    transcription: "ОИ́Р", note: "Неправильный глагол (oigo/oyes; 3 л. oyó)",
    example: { greek: "No te oigo bien, hay mucho ruido.", ru: "Плохо тебя слышу, очень шумно." },
    present: { "yo": "oigo", "tú": "oyes", "él/ella/usted": "oye", "nosotros": "oímos", "vosotros": "oís", "ellos/ellas/ustedes": "oyen" },
    preterite: { "yo": "oí", "tú": "oíste", "él/ella/usted": "oyó", "nosotros": "oímos", "vosotros": "oísteis", "ellos/ellas/ustedes": "oyeron" },
    future: { "yo": "oiré", "tú": "oirás", "él/ella/usted": "oirá", "nosotros": "oiremos", "vosotros": "oiréis", "ellos/ellas/ustedes": "oirán" }
  }
];

const SCENARIOS = [
{
  id: 'bank',
  title: '🏦 В банке',
  icon: '🏦',
  description: 'Открываем счёт в испанском банке',
  steps: [
    {
      situation: 'Вы приходите в банк, чтобы открыть счёт. Сотрудник встречает вас.',
      speaker: 'Empleado — Сотрудник банка',
      greek: 'Buenos días. ¿En qué puedo ayudarle?',
      transcription: 'Буэ́нос ди́ас. Эн ке пуэ́до аюда́рле?',
      translation: 'Добрый день. Чем могу вам помочь?',
      question: 'Поздоровайтесь и скажите, что хотите открыть счёт.',
      options: [
        { text: 'Buenos días. Quiero abrir una cuenta bancaria.', transcription: 'Буэ́нос ди́ас. Кье́ро абри́р у́на куэ́нта банка́рья.', translation: 'Добрый день. Я хочу открыть банковский счёт.', correct: true },
        { text: 'Buenos días. Quiero cambiar dinero.', transcription: 'Буэ́нос ди́ас. Кье́ро камбья́р дине́ро.', translation: 'Добрый день. Я хочу обменять деньги.', correct: false },
        { text: 'Hola. ¿Dónde está el cajero?', transcription: 'О́ла. До́ндэ эста́ эль кахэ́ро?', translation: 'Привет. Где банкомат?', correct: false },
        { text: 'Buenos días. Quiero hacer un ingreso.', transcription: 'Буэ́нос ди́ас. Кье́ро асэ́р ун ингрэ́со.', translation: 'Добрый день. Я хочу сделать вклад.', correct: false }
      ],
      correctFeedback: '«Quiero abrir una cuenta bancaria» — очень важная фраза! «Abrir» стоит в инфинитиве после «quiero».',
      wrongFeedback: 'Скажите «Quiero abrir una cuenta bancaria» — используйте конструкцию quiero + инфинитив.'
    },
    {
      situation: 'Сотрудник просит документы.',
      speaker: 'Empleado — Сотрудник банка',
      greek: 'Necesito su pasaporte y un justificante de domicilio.',
      transcription: 'Нэсэси́то су паспо́ртэ и ун хустифика́нтэ дэ домиси́льо.',
      translation: 'Мне нужен ваш паспорт и подтверждение адреса проживания.',
      question: 'Скажите, что у вас есть паспорт, но нет подтверждения адреса.',
      options: [
        { text: 'Tengo mi pasaporte, pero no tengo justificante de domicilio.', transcription: 'Тэ́нго ми паспо́ртэ, пэ́ро но тэ́нго хустифика́нтэ дэ домиси́льо.', translation: 'У меня есть паспорт, но нет подтверждения адреса.', correct: true },
        { text: 'No tengo ningún documento conmigo.', transcription: 'Но тэ́нго нингу́н докумэ́нто конми́го.', translation: 'У меня нет никаких документов с собой.', correct: false },
        { text: 'Solo tengo mi carné de identidad.', transcription: 'Со́ло тэ́нго ми карнэ́ дэ идентида́д.', translation: 'У меня только удостоверение личности.', correct: false },
        { text: '¿Qué documentos necesita?', transcription: 'Кэ докумэ́нтос нэсэси́та?', translation: 'Какие документы вам нужны?', correct: false }
      ],
      correctFeedback: 'Отлично! «Tengo ... pero no tengo ...» — универсальная конструкция для объяснения ситуации. Запомните: «justificante de domicilio» — подтверждение адреса.',
      wrongFeedback: 'Объясните ситуацию: «Tengo mi pasaporte, pero no tengo justificante de domicilio».'
    },
    {
      situation: 'Сотрудник говорит, что документ можно принести позже. Спрашивает о типе счёта.',
      speaker: 'Empleado — Сотрудник банка',
      greek: 'Vale, puede traerlo más tarde. ¿Quiere una cuenta corriente o de ahorros?',
      transcription: 'Ва́ле, пуэ́дэ траэ́рло мас та́рдэ. Кье́рэ у́на куэ́нта коррье́нтэ о дэ аорро́с?',
      translation: 'Хорошо, можете принести позже. Вы хотите текущий счёт или сберегательный?',
      question: 'Скажите, что хотите текущий счёт.',
      options: [
        { text: 'Quiero una cuenta corriente, por favor.', transcription: 'Кье́ро у́на куэ́нта коррье́нтэ, пор фаво́р.', translation: 'Я хочу текущий счёт, пожалуйста.', correct: true },
        { text: 'No sé la diferencia.', transcription: 'Но сэ ла дифэрэ́нсья.', translation: 'Я не знаю разницы.', correct: false },
        { text: 'Quiero las dos.', transcription: 'Кье́ро лас дос.', translation: 'Я хочу обе.', correct: false },
        { text: 'De ahorros, creo.', transcription: 'Дэ аорро́с, крэ́о.', translation: 'Сберегательный, я думаю.', correct: false }
      ],
      correctFeedback: '«Cuenta corriente» — текущий счёт, «cuenta de ahorros» — сберегательный. Знание этих слов поможет в любом испанском банке!',
      wrongFeedback: 'Выберите тип счёта: «Quiero una cuenta corriente, por favor».'
    },
    {
      situation: 'Сотрудник оформляет счёт и спрашивает, нужна ли карта.',
      speaker: 'Empleado — Сотрудник банка',
      greek: '¿Quiere también una tarjeta de débito con la cuenta?',
      transcription: 'Кье́рэ тамбье́н у́на тархэ́та дэ дэ́бито кон ла куэ́нта?',
      translation: 'Хотите также дебетовую карту к счёту?',
      question: 'Скажите, что да, хотите карту.',
      options: [
        { text: 'Sí, me gustaría una tarjeta de débito, por favor.', transcription: 'Си, мэ густари́а у́на тархэ́та дэ дэ́бито, пор фаво́р.', translation: 'Да, я бы хотел(а) дебетовую карту, пожалуйста.', correct: true },
        { text: 'No, no necesito tarjeta.', transcription: 'Но, но нэсэси́то тархэ́та.', translation: 'Нет, мне не нужна карта.', correct: false },
        { text: 'Ya tengo tarjeta de otro banco.', transcription: 'Я тэ́нго тархэ́та дэ о́тро ба́нко.', translation: 'У меня уже есть карта другого банка.', correct: false },
        { text: '¿Cuánto cuesta la tarjeta?', transcription: 'Куа́нто куэ́ста ла тархэ́та?', translation: 'Сколько стоит карта?', correct: false }
      ],
      correctFeedback: '«Me gustaría» — вежливая форма "я бы хотел(а)". Более вежливо, чем просто «quiero». Используйте её когда просите об услуге!',
      wrongFeedback: 'Вежливо согласитесь: «Sí, me gustaría una tarjeta de débito, por favor».'
    },
    {
      situation: 'Всё готово. Сотрудник протягивает вам бумаги для подписи.',
      speaker: 'Empleado — Сотрудник банка',
      greek: '¡Gracias! Su cuenta ya está lista. Firme aquí, por favor.',
      transcription: 'Гра́сьяс! Су куэ́нта я эста́ ли́ста. Фи́рмэ аки́, пор фаво́р.',
      translation: 'Спасибо! Ваш счёт уже готов. Подпишите здесь, пожалуйста.',
      question: 'Поблагодарите и спросите, когда придёт карта.',
      options: [
        { text: 'Muchas gracias. ¿Cuándo llegará mi tarjeta?', transcription: 'Му́час гра́сьяс. Куа́ндо егара́ ми тархэ́та?', translation: 'Большое спасибо. Когда придёт моя карта?', correct: true },
        { text: 'Vale. Adiós.', transcription: 'Ва́ле. Адьо́с.', translation: 'Ладно. До свидания.', correct: false },
        { text: 'Gracias. ¿Dónde firmo?', transcription: 'Гра́сьяс. До́ндэ фи́рмо?', translation: 'Спасибо. Где подписать?', correct: false },
        { text: '¿Puedo irme ahora?', transcription: 'Пуэ́до и́рмэ ао́ра?', translation: 'Я могу уйти сейчас?', correct: false }
      ],
      correctFeedback: '«¿Cuándo llegará?» — "когда придёт?" Простое будущее время (Futuro Simple) — окончание -á у -ar/-er/-ir глаголов в 3-м лице. Очень полезно знать!',
      wrongFeedback: 'Поблагодарите и уточните детали: «Muchas gracias. ¿Cuándo llegará mi tarjeta?»'
    }
  ]
},
{
  id: 'doctor',
  title: '🏥 У врача',
  icon: '🏥',
  description: 'Приём у терапевта в поликлинике',
  steps: [
    {
      situation: 'Вы записались на приём к терапевту. Врач приглашает вас в кабинет.',
      speaker: 'Doctora — Врач',
      greek: 'Buenos días. Pase y siéntese. ¿Qué le pasa?',
      transcription: 'Буэ́нос ди́ас. Па́сэ и сьентэ́сэ. Кэ ле па́са?',
      translation: 'Добрый день. Проходите и садитесь. Что вас беспокоит?',
      question: 'Скажите, что у вас болит горло уже три дня.',
      options: [
        { text: 'Me duele la garganta desde hace tres días.', transcription: 'Мэ дуэ́лэ ла гарга́нта дэ́сдэ а́сэ трэс ди́ас.', translation: 'У меня болит горло уже три дня.', correct: true },
        { text: 'Estoy muy bien, gracias.', transcription: 'Эсто́й муй бьен, гра́сьяс.', translation: 'Я чувствую себя хорошо, спасибо.', correct: false },
        { text: 'Necesito unas vacaciones.', transcription: 'Нэсэси́то у́нас вакасьо́нэс.', translation: 'Мне нужен отпуск.', correct: false },
        { text: '¿Cuánto cuesta la consulta?', transcription: 'Куа́нто куэ́ста ла консу́льта?', translation: 'Сколько стоит консультация?', correct: false }
      ],
      correctFeedback: '«Me duele + часть тела» — основная конструкция для жалоб на боль. «Desde hace tres días» — "уже три дня" (с указанием длительности).',
      wrongFeedback: 'Опишите симптом: «Me duele la garganta desde hace tres días».'
    },
    {
      situation: 'Врач спрашивает про другие симптомы.',
      speaker: 'Doctora — Врач',
      greek: '¿Tiene fiebre o tos también?',
      transcription: 'Тье́нэ фьэ́брэ о тос тамбье́н?',
      translation: 'У вас есть температура или кашель тоже?',
      question: 'Скажите, что у вас небольшая температура и кашель.',
      options: [
        { text: 'Sí, tengo un poco de fiebre y tos.', transcription: 'Си, тэ́нго ун по́ко дэ фьэ́брэ и тос.', translation: 'Да, у меня небольшая температура и кашель.', correct: true },
        { text: 'No, no tengo nada más.', transcription: 'Но, но тэ́нго на́да мас.', translation: 'Нет, больше у меня ничего нет.', correct: false },
        { text: 'Tengo dolor de cabeza solamente.', transcription: 'Тэ́нго доло́р дэ кабэ́са соламе́нтэ.', translation: 'У меня только головная боль.', correct: false },
        { text: 'No lo sé, no me he medido la temperatura.', transcription: 'Но ло сэ, но мэ э мэди́до ла тэмпэрату́ра.', translation: 'Не знаю, я не измерял температуру.', correct: false }
      ],
      correctFeedback: '«Un poco de» — "немного" — полезная фраза для описания степени симптома. «Tengo fiebre» / «tengo tos» — базовые конструкции.',
      wrongFeedback: 'Ответьте про симптомы: «Sí, tengo un poco de fiebre y tos».'
    },
    {
      situation: 'Врач осматривает горло и ставит предварительный диагноз.',
      speaker: 'Doctora — Врач',
      greek: 'Tiene la garganta un poco inflamada. Le voy a recetar unos antibióticos.',
      transcription: 'Тье́нэ ла гарга́нта ун по́ко инфляма́да. Ле вой а рэсэта́р у́нос антибьо́тикос.',
      translation: 'У вас немного воспалено горло. Я выпишу вам антибиотики.',
      question: 'Спросите, сколько раз в день принимать лекарство.',
      options: [
        { text: '¿Cuántas veces al día tengo que tomarlo?', transcription: 'Куа́нтас вэ́сэс аль ди́а тэ́нго кэ тома́рло?', translation: 'Сколько раз в день мне нужно его принимать?', correct: true },
        { text: '¿Dónde está la farmacia?', transcription: 'До́ндэ эста́ ла фарма́сья?', translation: 'Где находится аптека?', correct: false },
        { text: '¿Es grave?', transcription: 'Эс гра́вэ?', translation: 'Это серьёзно?', correct: false },
        { text: 'No quiero tomar medicinas.', transcription: 'Но кье́ро тома́р мэдиси́нас.', translation: 'Я не хочу принимать лекарства.', correct: false }
      ],
      correctFeedback: '«Tengo que + инфинитив» — "мне нужно/я должен" — важная модальная конструкция для обязательств.',
      wrongFeedback: 'Спросите про дозировку: «¿Cuántas veces al día tengo que tomarlo?»'
    },
    {
      situation: 'Врач объясняет дозировку и даёт рецепт.',
      speaker: 'Doctora — Врач',
      greek: 'Tres veces al día, después de las comidas. Aquí tiene la receta.',
      transcription: 'Трэс вэ́сэс аль ди́а, дэспуэ́с дэ лас коми́дас. Аки́ тьенэ ла рэсэ́та.',
      translation: 'Три раза в день, после еды. Вот ваш рецепт.',
      question: 'Поблагодарите и спросите, нужно ли снова прийти на приём.',
      options: [
        { text: 'Gracias. ¿Tengo que volver a la consulta?', transcription: 'Гра́сьяс. Тэ́нго кэ во́львэр а ла консу́льта?', translation: 'Спасибо. Мне нужно снова прийти на приём?', correct: true },
        { text: 'Gracias, adiós para siempre.', transcription: 'Гра́сьяс, адьо́с па́ра сьэ́мпрэ.', translation: 'Спасибо, прощайте навсегда.', correct: false },
        { text: 'No necesito la receta.', transcription: 'Но нэсэси́то ла рэсэ́та.', translation: 'Мне не нужен рецепт.', correct: false },
        { text: '¿Puedo tomar alcohol con esto?', transcription: 'Пуэ́до тома́р алько́ль кон э́сто?', translation: 'Можно ли мне пить алкоголь с этим?', correct: false }
      ],
      correctFeedback: '«Volver a + инфинитив» — "снова сделать что-то". Отличный способ уточнить дальнейшие шаги лечения.',
      wrongFeedback: 'Уточните дальнейшие действия: «Gracias. ¿Tengo que volver a la consulta?»'
    }
  ]
},
{
  id: 'extranjeria',
  title: '📋 В миграционной службе',
  icon: '📋',
  description: 'Оформляем NIE в Extranjería',
  steps: [
    {
      situation: 'Вы пришли в Extranjería (миграционная служба) для оформления NIE. Подходите к окну.',
      speaker: 'Funcionario — Сотрудник миграционной службы',
      greek: 'Buenos días. ¿Tiene cita previa?',
      transcription: 'Буэ́нос ди́ас. Тье́нэ си́та прэ́вья?',
      translation: 'Добрый день. У вас есть предварительная запись?',
      question: 'Скажите, что да, у вас есть запись на десять часов.',
      options: [
        { text: 'Sí, tengo cita a las diez.', transcription: 'Си, тэ́нго си́та а лас дьес.', translation: 'Да, у меня запись на десять часов.', correct: true },
        { text: 'No, no sabía que era necesario.', transcription: 'Но, но сабиа́ кэ э́ра нэсэса́рьо.', translation: 'Нет, я не знал, что это необходимо.', correct: false },
        { text: '¿Qué es una cita previa?', transcription: 'Кэ эс у́на си́та прэ́вья?', translation: 'Что такое предварительная запись?', correct: false },
        { text: 'Vengo mañana entonces.', transcription: 'Вэ́нго манья́на энто́нсэс.', translation: 'Тогда я приду завтра.', correct: false }
      ],
      correctFeedback: '«Cita previa» — обязательный термин в Испании: предварительная онлайн-запись, без которой во многие учреждения не попасть.',
      wrongFeedback: 'Подтвердите запись: «Sí, tengo cita a las diez».'
    },
    {
      situation: 'Сотрудник просит документы для оформления NIE.',
      speaker: 'Funcionario — Сотрудник миграционной службы',
      greek: 'Necesito su pasaporte, el formulario EX-15 y el justificante de la tasa pagada.',
      transcription: 'Нэсэси́то су паспо́ртэ, эль формула́рьо э́кис-ки́нсэ и эль хустифика́нтэ дэ ла та́са пага́да.',
      translation: 'Мне нужен ваш паспорт, бланк EX-15 и квитанция об оплате пошлины.',
      question: 'Скажите, что у вас всё это с собой, и передайте документы.',
      options: [
        { text: 'Tengo todo eso aquí, aquí tiene los documentos.', transcription: 'Тэ́нго то́до э́со аки́, аки́ тье́нэ лос докумэ́нтос.', translation: 'У меня всё это есть, вот документы.', correct: true },
        { text: 'No traje la tasa pagada.', transcription: 'Но тра́хэ ла та́са пага́да.', translation: 'Я не принёс квитанцию об оплате.', correct: false },
        { text: '¿Puedo pagar la tasa aquí ahora?', transcription: 'Пуэ́до пага́р ла та́са аки́ ао́ра?', translation: 'Могу я оплатить пошлину прямо сейчас?', correct: false },
        { text: 'No entiendo qué es el formulario EX-15.', transcription: 'Но энтье́ндо кэ эс эль формула́рьо э́кис-ки́нсэ.', translation: 'Я не понимаю, что такое бланк EX-15.', correct: false }
      ],
      correctFeedback: 'Отлично! «Aquí tiene» — "вот, возьмите" — стандартная фраза при передаче документов. EX-15 — реальный бланк для получения NIE в Испании.',
      wrongFeedback: 'Подтвердите наличие документов: «Tengo todo eso aquí, aquí tiene los documentos».'
    },
    {
      situation: 'Сотрудник уточняет причину получения NIE.',
      speaker: 'Funcionario — Сотрудник миграционной службы',
      greek: '¿Cuál es el motivo de su solicitud del NIE?',
      transcription: 'Куа́ль эс эль моти́во дэ су соли́сйтуд дэль ни́е?',
      translation: 'Какова причина вашего заявления на NIE?',
      question: 'Скажите, что причина — открытие банковского счёта и работа.',
      options: [
        { text: 'El motivo es abrir una cuenta bancaria y trabajar.', transcription: 'Эль моти́во эс абри́р у́на куэ́нта банка́рья и трабаха́р.', translation: 'Причина — открыть банковский счёт и работать.', correct: true },
        { text: 'No tengo ningún motivo especial.', transcription: 'Но тэ́нго нингу́н моти́во эспэсья́ль.', translation: 'У меня нет особой причины.', correct: false },
        { text: 'Es un secreto.', transcription: 'Эс ун сэкрэ́то.', translation: 'Это секрет.', correct: false },
        { text: '¿Es obligatorio decir el motivo?', transcription: 'Эс облигато́рьо дэси́р эль моти́во?', translation: 'Обязательно ли говорить причину?', correct: false }
      ],
      correctFeedback: '«El motivo es + инфинитив» — стандартная конструкция для объяснения цели. Часто NIE нужен именно для работы и банковских операций.',
      wrongFeedback: 'Объясните цель: «El motivo es abrir una cuenta bancaria y trabajar».'
    },
    {
      situation: 'Сотрудник сообщает, когда будет готов документ.',
      speaker: 'Funcionario — Сотрудник миграционной службы',
      greek: 'Todo está en orden. El NIE estará listo en unas tres semanas.',
      transcription: 'То́до эста́ эн о́рдэн. Эль ни́е эстара́ ли́сто эн у́нас трэс сэма́нас.',
      translation: 'Всё в порядке. NIE будет готов примерно через три недели.',
      question: 'Спросите, как вы узнаете, что документ готов.',
      options: [
        { text: '¿Cómo voy a saber que está listo?', transcription: 'Ко́мо вой а сабэ́р кэ эста́ ли́сто?', translation: 'Как я узнаю, что он готов?', correct: true },
        { text: 'Tres semanas es demasiado tiempo.', transcription: 'Трэс сэма́нас эс дэмасья́до тьэ́мпо.', translation: 'Три недели — это слишком долго.', correct: false },
        { text: 'No me importa cuándo esté listo.', transcription: 'Но мэ импо́рта куа́ндо эстэ́ ли́сто.', translation: 'Мне неважно, когда он будет готов.', correct: false },
        { text: 'Ya me voy, gracias por nada.', transcription: 'Я мэ вой, гра́сьяс пор на́да.', translation: 'Я уже ухожу, спасибо за ничего.', correct: false }
      ],
      correctFeedback: '«Voy a + инфинитив» — конструкция ближайшего будущего "собираюсь сделать". Очень частая в разговорной речи.',
      wrongFeedback: 'Уточните способ получения информации: «¿Cómo voy a saber que está listo?»'
    }
  ]
},
{
  id: 'farmacia',
  title: '💊 В аптеке',
  icon: '💊',
  description: 'Покупаем лекарства и объясняем симптомы',
  steps: [
    {
      situation: 'Вы приходите в аптеку с головной болью.',
      speaker: 'Farmacéutico — Фармацевт',
      greek: 'Buenas tardes. ¿Qué necesita?',
      transcription: 'Буэ́нас та́рдэс. Кэ нэсэси́та?',
      translation: 'Добрый день. Что вам нужно?',
      question: 'Скажите, что у вас болит голова, и спросите, что можно принять.',
      options: [
        { text: 'Me duele la cabeza. ¿Qué me recomienda?', transcription: 'Мэ дуэ́лэ ла кабэ́са. Кэ мэ рэкомье́нда?', translation: 'У меня болит голова. Что вы посоветуете?', correct: true },
        { text: 'Quiero comprar champú.', transcription: 'Кье́ро компра́р чампу́.', translation: 'Я хочу купить шампунь.', correct: false },
        { text: 'Solo estoy mirando, gracias.', transcription: 'Со́ло эсто́й мира́ндо, гра́сьяс.', translation: 'Я просто смотрю, спасибо.', correct: false },
        { text: '¿Dónde está el supermercado?', transcription: 'До́ндэ эста́ эль супэрмэрка́до?', translation: 'Где находится супермаркет?', correct: false }
      ],
      correctFeedback: '«¿Qué me recomienda?» — отличный способ попросить совета у специалиста. «Recomendar» — рекомендовать.',
      wrongFeedback: 'Опишите проблему и попросите совет: «Me duele la cabeza. ¿Qué me recomienda?»'
    },
    {
      situation: 'Фармацевт предлагает лекарство и спрашивает про аллергии.',
      speaker: 'Farmacéutico — Фармацевт',
      greek: 'Le recomiendo este analgésico. ¿Es usted alérgico a algún medicamento?',
      transcription: 'Ле рэкомье́ндо э́стэ анальхэ́сико. Эс устэ́д алэ́рхико а альгу́н мэдикамэ́нто?',
      translation: 'Я рекомендую вам этот анальгетик. У вас есть аллергия на какое-либо лекарство?',
      question: 'Скажите, что у вас нет аллергии.',
      options: [
        { text: 'No, no soy alérgico a nada.', transcription: 'Но, но сой алэ́рхико а на́да.', translation: 'Нет, у меня нет аллергии ни на что.', correct: true },
        { text: 'Sí, soy alérgico a la penicilina.', transcription: 'Си, сой алэ́рхико а ла пэниси́лина.', translation: 'Да, у меня аллергия на пенициллин.', correct: false },
        { text: 'No lo sé.', transcription: 'Но ло сэ.', translation: 'Я не знаю.', correct: false },
        { text: '¿Por qué me pregunta eso?', transcription: 'Пор кэ мэ прэгу́нта э́со?', translation: 'Почему вы меня об этом спрашиваете?', correct: false }
      ],
      correctFeedback: '«Ser alérgico a» — "иметь аллергию на". Важная фраза для любых визитов к врачу или в аптеку.',
      wrongFeedback: 'Ответьте про аллергию: «No, no soy alérgico a nada».'
    },
    {
      situation: 'Фармацевт объясняет, как принимать лекарство.',
      speaker: 'Farmacéutico — Фармацевт',
      greek: 'Tome una pastilla cada ocho horas, con un vaso de agua.',
      transcription: 'То́мэ у́на пасти́лья ка́да о́чо о́рас, кон ун ва́со дэ а́гуа.',
      translation: 'Принимайте по одной таблетке каждые восемь часов, со стаканом воды.',
      question: 'Спросите, можно ли принимать это лекарство натощак.',
      options: [
        { text: '¿Puedo tomarlo en ayunas?', transcription: 'Пуэ́до тома́рло эн аю́нас?', translation: 'Могу я принимать его натощак?', correct: true },
        { text: '¿Es caro este medicamento?', transcription: 'Эс ка́ро э́стэ мэдикамэ́нто?', translation: 'Это лекарство дорогое?', correct: false },
        { text: 'No me gusta tomar pastillas.', transcription: 'Но мэ гу́ста тома́р пасти́льяс.', translation: 'Мне не нравится принимать таблетки.', correct: false },
        { text: '¿Cuántos días dura la caja?', transcription: 'Куа́нтос ди́ас ду́ра ла ка́ха?', translation: 'На сколько дней хватает упаковки?', correct: false }
      ],
      correctFeedback: '«En ayunas» — "натощак" — важное медицинское выражение, часто используется врачами и фармацевтами.',
      wrongFeedback: 'Уточните способ применения: «¿Puedo tomarlo en ayunas?»'
    },
    {
      situation: 'Фармацевт называет цену и предлагает что-то ещё.',
      speaker: 'Farmacéutico — Фармацевт',
      greek: 'Son ocho euros con cincuenta. ¿Necesita algo más?',
      transcription: 'Сон о́чо э́урос кон синкуэ́нта. Нэсэси́та а́льго мас?',
      translation: 'С вас восемь евро пятьдесят центов. Вам нужно что-нибудь ещё?',
      question: 'Скажите, что хотите также купить витамины.',
      options: [
        { text: 'Sí, también quiero comprar vitaminas.', transcription: 'Си, тамбье́н кье́ро компра́р витами́нас.', translation: 'Да, я также хочу купить витамины.', correct: true },
        { text: 'No, eso es todo, gracias.', transcription: 'Но, э́со эс то́до, гра́сьяс.', translation: 'Нет, это всё, спасибо.', correct: false },
        { text: 'Es demasiado caro.', transcription: 'Эс дэмасья́до ка́ро.', translation: 'Это слишком дорого.', correct: false },
        { text: '¿Aceptan tarjeta?', transcription: 'Асэ́птан тархэ́та?', translation: 'Вы принимаете карту?', correct: false }
      ],
      correctFeedback: '«También» — "также" — полезное слово для добавления к покупке. Хороший навык — уметь докупить что-то ещё.',
      wrongFeedback: 'Добавьте покупку: «Sí, también quiero comprar vitaminas».'
    }
  ]
},
{
  id: 'mercado',
  title: '🛒 На рынке и в супермаркете',
  icon: '🛒',
  description: 'Покупаем продукты и общаемся с продавцом',
  steps: [
    {
      situation: 'Вы на рынке у прилавка с фруктами.',
      speaker: 'Vendedor — Продавец',
      greek: '¡Buenos días! ¿Qué le pongo?',
      transcription: 'Буэ́нос ди́ас! Кэ ле по́нго?',
      translation: 'Добрый день! Что вам предложить (букв. что вам положить)?',
      question: 'Попросите килограмм помидоров.',
      options: [
        { text: 'Un kilo de tomates, por favor.', transcription: 'Ун ки́ло дэ тома́тэс, пор фаво́р.', translation: 'Килограмм помидоров, пожалуйста.', correct: true },
        { text: 'Quiero un billete de tren.', transcription: 'Кье́ро ун быйе́тэ дэ трэн.', translation: 'Я хочу билет на поезд.', correct: false },
        { text: 'No quiero nada, gracias.', transcription: 'Но кье́ро на́да, гра́сьяс.', translation: 'Мне ничего не нужно, спасибо.', correct: false },
        { text: '¿A qué hora cierra el mercado?', transcription: 'А кэ о́ра сье́рра эль мэрка́до?', translation: 'Во сколько закрывается рынок?', correct: false }
      ],
      correctFeedback: '«¿Qué le pongo?» — типичная фраза продавца на рынке. «Un kilo de + продукт» — стандартный способ заказать по весу.',
      wrongFeedback: 'Закажите продукт: «Un kilo de tomates, por favor».'
    },
    {
      situation: 'Продавец предлагает что-то ещё.',
      speaker: 'Vendedor — Продавец',
      greek: 'Muy bien. ¿Algo más? Las fresas están muy buenas hoy.',
      transcription: 'Муй бьен. А́льго мас? Лас фрэ́сас эста́н муй буэ́нас ой.',
      translation: 'Отлично. Что-нибудь ещё? Клубника сегодня очень хорошая.',
      question: 'Спросите, сколько стоит клубника.',
      options: [
        { text: '¿Cuánto cuestan las fresas?', transcription: 'Куа́нто куэ́стан лас фрэ́сас?', translation: 'Сколько стоит клубника?', correct: true },
        { text: 'No me gustan las fresas.', transcription: 'Но мэ гу́стан лас фрэ́сас.', translation: 'Мне не нравится клубника.', correct: false },
        { text: 'Ya tengo fresas en casa.', transcription: 'Я тэ́нго фрэ́сас эн ка́са.', translation: 'У меня уже есть клубника дома.', correct: false },
        { text: 'Prefiero las naranjas.', transcription: 'Прэфье́ро лас нара́нхас.', translation: 'Я предпочитаю апельсины.', correct: false }
      ],
      correctFeedback: '«¿Cuánto cuesta/cuestan?» — ключевой вопрос о цене. Форма зависит от числа: cuesta (ед.ч.) / cuestan (мн.ч.).',
      wrongFeedback: 'Спросите цену: «¿Cuánto cuestan las fresas?»'
    },
    {
      situation: 'Продавец называет цену и упаковывает покупки.',
      speaker: 'Vendedor — Продавец',
      greek: 'Tres euros el kilo. ¿Le pongo medio kilo?',
      transcription: 'Трэс э́урос эль ки́ло. Ле по́нго мэ́дьо ки́ло?',
      translation: 'Три евро за килограмм. Положить вам полкило?',
      question: 'Согласитесь и попросите пакет.',
      options: [
        { text: 'Sí, medio kilo, y una bolsa también, por favor.', transcription: 'Си, мэ́дьо ки́ло, и у́на бо́льса тамбье́н, пор фаво́р.', translation: 'Да, полкило, и пакет тоже, пожалуйста.', correct: true },
        { text: 'No quiero bolsa de plástico.', transcription: 'Но кье́ро бо́льса дэ пла́стико.', translation: 'Я не хочу пластиковый пакет.', correct: false },
        { text: 'Mejor un kilo entero.', transcription: 'Мэхо́р ун ки́ло энтэ́ро.', translation: 'Лучше целый килограмм.', correct: false },
        { text: 'No, gracias, nada más.', transcription: 'Но, гра́сьяс, на́да мас.', translation: 'Нет, спасибо, больше ничего.', correct: false }
      ],
      correctFeedback: '«Bolsa» — пакет. Полезно уточнять, нужен ли пакет — во многих испанских магазинах он платный.',
      wrongFeedback: 'Согласитесь и попросите пакет: «Sí, medio kilo, y una bolsa también, por favor».'
    },
    {
      situation: 'Продавец подсчитывает итоговую сумму.',
      speaker: 'Vendedor — Продавец',
      greek: 'En total son seis euros con cincuenta. ¿Cómo va a pagar?',
      transcription: 'Эн тота́ль сон сэйс э́урос кон синкуэ́нта. Ко́мо ва а пага́р?',
      translation: 'Итого шесть евро пятьдесят центов. Как будете платить?',
      question: 'Скажите, что заплатите наличными.',
      options: [
        { text: 'Voy a pagar en efectivo.', transcription: 'Вой а пага́р эн эфэкти́во.', translation: 'Я заплачу наличными.', correct: true },
        { text: 'No tengo dinero.', transcription: 'Но тэ́нго дине́ро.', translation: 'У меня нет денег.', correct: false },
        { text: '¿Puedo pagar mañana?', transcription: 'Пуэ́до пага́р манья́на?', translation: 'Можно заплатить завтра?', correct: false },
        { text: 'Es muy caro para mí.', transcription: 'Эс муй ка́ро па́ра ми.', translation: 'Это слишком дорого для меня.', correct: false }
      ],
      correctFeedback: '«En efectivo» — наличными, «con tarjeta» — картой. Базовые слова для оплаты в любом магазине Испании.',
      wrongFeedback: 'Укажите способ оплаты: «Voy a pagar en efectivo».'
    }
  ]
},
{
  id: 'restaurante',
  title: '🍽️ В кафе и ресторане',
  icon: '🍽️',
  description: 'Заказываем еду и общаемся с официантом',
  steps: [
    {
      situation: 'Вы садитесь за столик в ресторане. Официант подходит с меню.',
      speaker: 'Camarero — Официант',
      greek: 'Buenas tardes. Aquí tienen la carta. ¿Qué van a tomar?',
      transcription: 'Буэ́нас та́рдэс. Аки́ тье́нэн ла ка́рта. Кэ ван а тома́р?',
      translation: 'Добрый день. Вот меню. Что будете заказывать?',
      question: 'Скажите, что вам нужно немного времени, чтобы посмотреть меню.',
      options: [
        { text: 'Necesitamos un momento para mirar la carta.', transcription: 'Нэсэсита́мос ун момэ́нто па́ра мира́р ла ка́рта.', translation: 'Нам нужна минутка, чтобы посмотреть меню.', correct: true },
        { text: 'Ya nos vamos, gracias.', transcription: 'Я нос ва́мос, гра́сьяс.', translation: 'Мы уже уходим, спасибо.', correct: false },
        { text: 'No tenemos hambre.', transcription: 'Но тэнэ́мос а́мбрэ.', translation: 'Мы не голодны.', correct: false },
        { text: '¿Dónde está el baño?', transcription: 'До́ндэ эста́ эль ба́ньо?', translation: 'Где находится туалет?', correct: false }
      ],
      correctFeedback: '«Carta» — меню в ресторане (не путать с «menú», это часто "комплексный обед"). «Necesitar un momento» — вежливая просьба о времени.',
      wrongFeedback: 'Попросите время: «Necesitamos un momento para mirar la carta».'
    },
    {
      situation: 'Официант возвращается принять заказ.',
      speaker: 'Camarero — Официант',
      greek: '¿Ya saben lo que van a pedir?',
      transcription: 'Я са́бэн ло кэ ван а пэди́р?',
      translation: 'Вы уже знаете, что закажете?',
      question: 'Закажите паэлью и салат.',
      options: [
        { text: 'Sí, quiero la paella y una ensalada, por favor.', transcription: 'Си, кье́ро ла паэ́йя и у́на энсала́да, пор фаво́р.', translation: 'Да, я хочу паэлью и салат, пожалуйста.', correct: true },
        { text: 'No sé qué es la paella.', transcription: 'Но сэ кэ эс ла паэ́йя.', translation: 'Я не знаю, что такое паэлья.', correct: false },
        { text: 'Todavía no hemos decidido.', transcription: 'Тодави́а но э́мос дэсиди́до.', translation: 'Мы ещё не решили.', correct: false },
        { text: 'Quiero lo mismo que él.', transcription: 'Кье́ро ло ми́смо кэ эль.', translation: 'Я хочу то же самое, что и он.', correct: false }
      ],
      correctFeedback: '«Pedir» — заказывать (еду). «Quiero + существительное» — простой способ сделать заказ.',
      wrongFeedback: 'Сделайте заказ: «Sí, quiero la paella y una ensalada, por favor».'
    },
    {
      situation: 'Официант уточняет напитки.',
      speaker: 'Camarero — Официант',
      greek: '¿Y para beber?',
      transcription: 'И па́ра бэбэ́р?',
      translation: 'А что будете пить?',
      question: 'Закажите бутылку воды и бокал красного вина.',
      options: [
        { text: 'Una botella de agua y una copa de vino tinto, por favor.', transcription: 'У́на ботэ́йя дэ а́гуа и у́на ко́па дэ ви́но ти́нто, пор фаво́р.', translation: 'Бутылку воды и бокал красного вина, пожалуйста.', correct: true },
        { text: 'No quiero beber nada.', transcription: 'Но кье́ро бэбэ́р на́да.', translation: 'Я не хочу ничего пить.', correct: false },
        { text: 'Solo café, gracias.', transcription: 'Со́ло кафэ́, гра́сьяс.', translation: 'Только кофе, спасибо.', correct: false },
        { text: '¿Tienen cerveza sin alcohol?', transcription: 'Тье́нэн сэрвэ́са син алько́ль?', translation: 'У вас есть безалкогольное пиво?', correct: false }
      ],
      correctFeedback: '«Vino tinto» — красное вино, «vino blanco» — белое. «Copa» — бокал (для вина), «vaso» — стакан.',
      wrongFeedback: 'Закажите напитки: «Una botella de agua y una copa de vino tinto, por favor».'
    },
    {
      situation: 'После еды вы просите счёт.',
      speaker: 'Camarero — Официант',
      greek: '¿Todo bien? ¿Les traigo algo más?',
      transcription: 'То́до бьен? Лес тра́йго а́льго мас?',
      translation: 'Всё хорошо? Принести вам что-нибудь ещё?',
      question: 'Скажите, что всё было отлично, и попросите счёт.',
      options: [
        { text: 'Todo estuvo genial. La cuenta, por favor.', transcription: 'То́до эсту́во хэнья́ль. Ла куэ́нта, пор фаво́р.', translation: 'Всё было замечательно. Счёт, пожалуйста.', correct: true },
        { text: 'La comida estaba fría.', transcription: 'Ла коми́да эста́ба фри́а.', translation: 'Еда была холодной.', correct: false },
        { text: 'Queremos quedarnos aquí toda la noche.', transcription: 'Кэрэ́мос кэда́рнос аки́ то́да ла но́че.', translation: 'Мы хотим остаться здесь на всю ночь.', correct: false },
        { text: 'No nos gustó nada.', transcription: 'Но нос густо́ на́да.', translation: 'Нам ничего не понравилось.', correct: false }
      ],
      correctFeedback: '«La cuenta, por favor» — ключевая фраза для завершения похода в ресторан. «Estuvo genial» — прошедшее время для оценки впечатления.',
      wrongFeedback: 'Попросите счёт: «Todo estuvo genial. La cuenta, por favor».'
    }
  ]
},
{
  id: 'alquiler',
  title: '🏠 Аренда квартиры',
  icon: '🏠',
  description: 'Смотрим квартиру и обсуждаем условия аренды',
  steps: [
    {
      situation: 'Вы приходите на просмотр квартиры. Агент встречает вас у входа.',
      speaker: 'Agente inmobiliario — Агент по недвижимости',
      greek: 'Hola, bienvenido. Este es el piso de dos habitaciones.',
      transcription: 'О́ла, бьенвэни́до. Э́стэ эс эль пи́со дэ дос абитасьо́нэс.',
      translation: 'Привет, добро пожаловать. Это квартира с двумя спальнями.',
      question: 'Спросите, сколько стоит аренда в месяц.',
      options: [
        { text: '¿Cuánto cuesta el alquiler al mes?', transcription: 'Куа́нто куэ́ста эль алькиле́р аль мэс?', translation: 'Сколько стоит аренда в месяц?', correct: true },
        { text: '¿De qué color son las paredes?', transcription: 'Дэ кэ коло́р сон лас парэ́дэс?', translation: 'Какого цвета стены?', correct: false },
        { text: 'No me interesa este piso.', transcription: 'Но мэ интэрэ́са э́стэ пи́со.', translation: 'Мне не интересна эта квартира.', correct: false },
        { text: '¿Cuántos pisos hay en el edificio?', transcription: 'Куа́нтос пи́сос ай эн эль эдифи́сьо?', translation: 'Сколько этажей в здании?', correct: false }
      ],
      correctFeedback: '«Alquiler» — аренда, «al mes» — в месяц. Один из первых вопросов при осмотре жилья.',
      wrongFeedback: 'Спросите цену: «¿Cuánto cuesta el alquiler al mes?»'
    },
    {
      situation: 'Агент называет цену и условия.',
      speaker: 'Agente inmobiliario — Агент по недвижимости',
      greek: 'Son setecientos euros al mes, más una fianza de dos meses.',
      transcription: 'Сон сэтэсье́нтос э́урос аль мэс, мас у́на фья́нса дэ дос мэ́сэс.',
      translation: 'Это семьсот евро в месяц, плюс залог за два месяца.',
      question: 'Спросите, включены ли коммунальные услуги в стоимость.',
      options: [
        { text: '¿Están incluidos los gastos de comunidad?', transcription: 'Эста́н инклуи́дос лос га́стос дэ комуниДА́д?', translation: 'Включены ли коммунальные расходы?', correct: true },
        { text: 'Es demasiado caro, adiós.', transcription: 'Эс дэмасья́до ка́ро, адьо́с.', translation: 'Это слишком дорого, до свидания.', correct: false },
        { text: 'No tengo dinero para la fianza.', transcription: 'Но тэ́нго дине́ро па́ра ла фья́нса.', translation: 'У меня нет денег на залог.', correct: false },
        { text: '¿Puedo traer a mi perro?', transcription: 'Пуэ́до траэ́р а ми пэ́рро?', translation: 'Могу я привести свою собаку?', correct: false }
      ],
      correctFeedback: '«Gastos de comunidad» — коммунальные расходы на общедомовые нужды. «Fianza» — залог, обычно 1-2 месяца аренды.',
      wrongFeedback: 'Уточните условия: «¿Están incluidos los gastos de comunidad?»'
    },
    {
      situation: 'Агент объясняет, что нужно для подписания контракта.',
      speaker: 'Agente inmobiliario — Агент по недвижимости',
      greek: 'Para firmar el contrato, necesita el NIE y un aval bancario o una nómina.',
      transcription: 'Па́ра фирма́р эль контра́то, нэсэси́та эль ни́е и ун ава́ль банка́рьо о у́на но́мина.',
      translation: 'Для подписания контракта нужны NIE и банковская гарантия или справка о доходах.',
      question: 'Скажите, что у вас есть NIE, но спросите про альтернативу справке о доходах.',
      options: [
        { text: 'Tengo el NIE, pero no tengo nómina. ¿Hay otra opción?', transcription: 'Тэ́нго эль ни́е, пэ́ро но тэ́нго но́мина. Ай о́тра опсьо́н?', translation: 'У меня есть NIE, но нет справки о доходах. Есть другой вариант?', correct: true },
        { text: 'No tengo nada de eso.', transcription: 'Но тэ́нго на́да дэ э́со.', translation: 'У меня нет ничего из этого.', correct: false },
        { text: 'No entiendo por qué necesito todo eso.', transcription: 'Но энтье́ндо пор кэ нэсэси́то то́до э́со.', translation: 'Я не понимаю, зачем мне всё это нужно.', correct: false },
        { text: 'Puedo pagar todo en efectivo ahora mismo.', transcription: 'Пуэ́до пага́р то́до эн эфэкти́во ао́ра ми́смо.', translation: 'Я могу заплатить всё наличными прямо сейчас.', correct: false }
      ],
      correctFeedback: '«¿Hay otra opción?» — полезный вопрос когда не хватает документов. «Nómina» — справка о зарплате от работодателя.',
      wrongFeedback: 'Уточните альтернативу: «Tengo el NIE, pero no tengo nómina. ¿Hay otra opción?»'
    },
    {
      situation: 'Агент предлагает встретиться для подписания контракта.',
      speaker: 'Agente inmobiliario — Агент по недвижимости',
      greek: 'Perfecto, podemos usar un avalista. ¿Cuándo puede firmar el contrato?',
      transcription: 'Пэрфэ́кто, подэ́мос уса́р ун авали́ста. Куа́ндо пуэ́дэ фирма́р эль контра́то?',
      translation: 'Отлично, можно использовать поручителя. Когда вы можете подписать контракт?',
      question: 'Скажите, что можете завтра утром.',
      options: [
        { text: 'Puedo mañana por la mañana.', transcription: 'Пуэ́до манья́на пор ла манья́на.', translation: 'Я могу завтра утром.', correct: true },
        { text: 'Nunca voy a poder.', transcription: 'Ну́нка вой а подэ́р.', translation: 'Я никогда не смогу.', correct: false },
        { text: 'No quiero firmar nada.', transcription: 'Но кье́ро фирма́р на́да.', translation: 'Я не хочу ничего подписывать.', correct: false },
        { text: '¿Es obligatorio firmar?', transcription: 'Эс облигато́рьо фирма́р?', translation: 'Обязательно ли подписывать?', correct: false }
      ],
      correctFeedback: '«Avalista» — поручитель, часто заменяет справку о доходах для иностранцев. «Por la mañana» — утром.',
      wrongFeedback: 'Договоритесь о времени: «Puedo mañana por la mañana».'
    }
  ]
},
{
  id: 'metro',
  title: '🚇 В метро и на транспорте',
  icon: '🚇',
  description: 'Покупаем билет и спрашиваем дорогу',
  steps: [
    {
      situation: 'Вы у автомата по продаже билетов в метро.',
      speaker: 'Empleado — Сотрудник метро',
      greek: '¿Necesita ayuda con la máquina?',
      transcription: 'Нэсэси́та аю́да кон ла ма́кина?',
      translation: 'Вам нужна помощь с автоматом?',
      question: 'Скажите да, и что хотите билет на десять поездок.',
      options: [
        { text: 'Sí, quiero un billete de diez viajes.', transcription: 'Си, кье́ро ун бийе́тэ дэ дьес вья́хэс.', translation: 'Да, я хочу билет на десять поездок.', correct: true },
        { text: 'No, gracias, todo bien.', transcription: 'Но, гра́сьяс, то́до бьен.', translation: 'Нет, спасибо, всё хорошо.', correct: false },
        { text: 'No sé usar el metro.', transcription: 'Но сэ уса́р эль мэ́тро.', translation: 'Я не умею пользоваться метро.', correct: false },
        { text: '¿Dónde está la salida?', transcription: 'До́ндэ эста́ ла сали́да?', translation: 'Где выход?', correct: false }
      ],
      correctFeedback: '«Billete de diez viajes» — многоразовый билет, обычно самый выгодный для регулярных поездок в испанских городах.',
      wrongFeedback: 'Попросите нужный билет: «Sí, quiero un billete de diez viajes».'
    },
    {
      situation: 'Сотрудник спрашивает, знаете ли вы, как добраться до нужной станции.',
      speaker: 'Empleado — Сотрудник метро',
      greek: '¿Sabe cómo llegar a Sol?',
      transcription: 'Са́бэ ко́мо ега́р а Соль?',
      translation: 'Вы знаете, как добраться до Соль?',
      question: 'Скажите, что нет, и спросите, какая это линия.',
      options: [
        { text: 'No, ¿qué línea es?', transcription: 'Но, кэ ли́нэа эс?', translation: 'Нет, какая это линия?', correct: true },
        { text: 'Sí, claro, gracias.', transcription: 'Си, кла́ро, гра́сьяс.', translation: 'Да, конечно, спасибо.', correct: false },
        { text: 'No me importa.', transcription: 'Но мэ импо́рта.', translation: 'Мне неважно.', correct: false },
        { text: 'Voy a caminar en su lugar.', transcription: 'Вой а камина́р эн су лу́гар.', translation: 'Я лучше пойду пешком.', correct: false }
      ],
      correctFeedback: '«¿Qué línea es?» — базовый вопрос про линию метро. В Мадриде и Барселоне линии метро обозначаются номерами и цветами.',
      wrongFeedback: 'Уточните направление: «No, ¿qué línea es?»'
    },
    {
      situation: 'Сотрудник объясняет маршрут.',
      speaker: 'Empleado — Сотрудник метро',
      greek: 'Es la línea 2, dirección Las Rosas, cuatro paradas.',
      transcription: 'Эс ла ли́нэа дос, дирексьо́н Лас Ро́сас, куа́тро пара́дас.',
      translation: 'Это вторая линия, направление Лас Росас, четыре остановки.',
      question: 'Поблагодарите и спросите, нужна ли пересадка.',
      options: [
        { text: 'Gracias. ¿Necesito hacer transbordo?', transcription: 'Гра́сьяс. Нэсэси́то асэ́р трансбо́рдо?', translation: 'Спасибо. Мне нужна пересадка?', correct: true },
        { text: 'No entiendo nada.', transcription: 'Но энтье́ндо на́да.', translation: 'Я ничего не понимаю.', correct: false },
        { text: 'Prefiero un taxi.', transcription: 'Прэфье́ро ун та́кси.', translation: 'Я предпочитаю такси.', correct: false },
        { text: '¿Cuánto tarda el autobús?', transcription: 'Куа́нто та́рда эль аутобу́с?', translation: 'Сколько времени идёт автобус?', correct: false }
      ],
      correctFeedback: '«Transbordo» — пересадка. Важное слово при планировании маршрута в метро крупных городов.',
      wrongFeedback: 'Уточните маршрут: «Gracias. ¿Necesito hacer transbordo?»'
    },
    {
      situation: 'Сотрудник подтверждает информацию.',
      speaker: 'Empleado — Сотрудник метро',
      greek: 'No, es directo. Solo tiene que bajarse en la cuarta parada.',
      transcription: 'Но, эс дирэ́кто. Со́ло тьэ́нэ кэ баха́рсэ эн ла куа́рта пара́да.',
      translation: 'Нет, это прямой маршрут. Вам просто нужно выйти на четвёртой остановке.',
      question: 'Поблагодарите за помощь.',
      options: [
        { text: 'Muchas gracias por su ayuda.', transcription: 'Му́час гра́сьяс пор су аю́да.', translation: 'Большое спасибо за вашу помощь.', correct: true },
        { text: 'Ya lo sabía.', transcription: 'Я ло сабиа́.', translation: 'Я уже это знал.', correct: false },
        { text: 'No me sirve de nada.', transcription: 'Но мэ си́рвэ дэ на́да.', translation: 'Мне это ничем не помогло.', correct: false },
        { text: 'Es muy complicado.', transcription: 'Эс муй компликА́до.', translation: 'Это очень сложно.', correct: false }
      ],
      correctFeedback: '«Bajarse» — выходить (из транспорта), «subirse» — заходить. Полезная пара глаголов для передвижения.',
      wrongFeedback: 'Поблагодарите: «Muchas gracias por su ayuda».'
    }
  ]
},
{
  id: 'taxi',
  title: '🚕 На такси',
  icon: '🚕',
  description: 'Заказываем такси и объясняем маршрут',
  steps: [
    {
      situation: 'Вы садитесь в такси. Водитель спрашивает, куда ехать.',
      speaker: 'Taxista — Таксист',
      greek: '¡Hola! ¿A dónde vamos?',
      transcription: 'О́ла! А до́ндэ ва́мос?',
      translation: 'Привет! Куда едем?',
      question: 'Назовите адрес — улица Гран Виа, дом 25.',
      options: [
        { text: 'A la calle Gran Vía, número veinticinco, por favor.', transcription: 'А ла ка́йе Гран Ви́а, ну́мэро вэйнтиси́нко, пор фаво́р.', translation: 'На улицу Гран Виа, дом двадцать пять, пожалуйста.', correct: true },
        { text: 'No sé la dirección.', transcription: 'Но сэ ла дирексьо́н.', translation: 'Я не знаю адрес.', correct: false },
        { text: 'A cualquier lugar.', transcription: 'А куальки́эр лу́гар.', translation: 'Куда угодно.', correct: false },
        { text: '¿Cuánto cuesta un billete de avión?', transcription: 'Куа́нто куэ́ста ун бийе́тэ дэ авьо́н?', translation: 'Сколько стоит билет на самолёт?', correct: false }
      ],
      correctFeedback: '«A la calle + название, número + номер» — стандартная формула для указания адреса водителю.',
      wrongFeedback: 'Назовите адрес: «A la calle Gran Vía, número veinticinco, por favor».'
    },
    {
      situation: 'Водитель уточняет маршрут.',
      speaker: 'Taxista — Таксист',
      greek: '¿Prefiere que vaya por la autopista o por el centro?',
      transcription: 'Прэфьэ́рэ кэ ва́я пор ла аутопи́ста о пор эль сэ́нтро?',
      translation: 'Вы предпочитаете ехать по автомагистрали или через центр?',
      question: 'Скажите, что предпочитаете самый быстрый вариант.',
      options: [
        { text: 'Prefiero la opción más rápida.', transcription: 'Прэфьэ́ро ла опсьо́н мас ра́пида.', translation: 'Я предпочитаю самый быстрый вариант.', correct: true },
        { text: 'No me importa el precio.', transcription: 'Но мэ импо́рта эль прэ́сьо.', translation: 'Мне неважна цена.', correct: false },
        { text: 'Vamos por el camino más largo.', transcription: 'Ва́мос пор эль ками́но мас ла́рго.', translation: 'Поедем самым длинным путём.', correct: false },
        { text: 'Da igual, pare aquí.', transcription: 'Да игуа́ль, па́рэ аки́.', translation: 'Всё равно, остановитесь здесь.', correct: false }
      ],
      correctFeedback: '«Prefiero + существительное/инфинитив» — способ выразить предпочтение. «Más rápido/a» — превосходная степень "самый быстрый".',
      wrongFeedback: 'Выберите вариант: «Prefiero la opción más rápida».'
    },
    {
      situation: 'Вы приближаетесь к пункту назначения.',
      speaker: 'Taxista — Таксист',
      greek: 'Ya casi llegamos. ¿Le dejo justo delante del edificio?',
      transcription: 'Я ка́си ега́мос. Ле дэ́хо ху́сто дэла́нтэ дэль эдифи́сьо?',
      translation: 'Мы почти приехали. Высадить вас прямо перед зданием?',
      question: 'Скажите да, это будет отлично.',
      options: [
        { text: 'Sí, eso sería perfecto.', transcription: 'Си, э́со сэри́а пэрфэ́кто.', translation: 'Да, это было бы отлично.', correct: true },
        { text: 'No, pare aquí mismo en la calle.', transcription: 'Но, па́рэ аки́ ми́смо эн ла ка́йе.', translation: 'Нет, остановите прямо здесь на улице.', correct: false },
        { text: 'No conozco este lugar.', transcription: 'Но коно́ско э́стэ лу́гар.', translation: 'Я не знаю это место.', correct: false },
        { text: 'Sigamos un poco más.', transcription: 'Сига́мос ун по́ко мас.', translation: 'Давайте проедем ещё немного.', correct: false }
      ],
      correctFeedback: '«Sería perfecto» — вежливая форма условного наклонения "было бы идеально". Часто используется для мягкого согласия.',
      wrongFeedback: 'Согласитесь: «Sí, eso sería perfecto».'
    },
    {
      situation: 'Вы приехали. Водитель называет цену поездки.',
      speaker: 'Taxista — Таксист',
      greek: 'Hemos llegado. Son doce euros con veinte.',
      transcription: 'Э́мос ега́до. Сон до́сэ э́урос кон вэ́йнтэ.',
      translation: 'Мы приехали. С вас двенадцать евро двадцать центов.',
      question: 'Спросите, можно ли заплатить картой.',
      options: [
        { text: '¿Puedo pagar con tarjeta?', transcription: 'Пуэ́до пага́р кон тархэ́та?', translation: 'Могу я заплатить картой?', correct: true },
        { text: 'No tengo ni un euro.', transcription: 'Но тэ́нго ни ун э́уро.', translation: 'У меня нет ни евро.', correct: false },
        { text: 'Es demasiado caro para un taxi.', transcription: 'Эс дэмасья́до ка́ро па́ра ун та́кси.', translation: 'Это слишком дорого для такси.', correct: false },
        { text: 'Vuelvo en cinco minutos con el dinero.', transcription: 'Вуэ́льво эн си́нко мину́тос кон эль дине́ро.', translation: 'Я вернусь через пять минут с деньгами.', correct: false }
      ],
      correctFeedback: '«¿Puedo pagar con tarjeta?» — важно уточнить заранее, не все такси в Испании принимают карты.',
      wrongFeedback: 'Уточните способ оплаты: «¿Puedo pagar con tarjeta?»'
    }
  ]
},
{
  id: 'correos',
  title: '📮 На почте',
  icon: '📮',
  description: 'Отправляем посылку и покупаем марки',
  steps: [
    {
      situation: 'Вы приходите на почту, чтобы отправить посылку.',
      speaker: 'Empleada — Сотрудница почты',
      greek: 'Buenos días. ¿Qué desea enviar?',
      transcription: 'Буэ́нос ди́ас. Кэ дэсэ́а энвья́р?',
      translation: 'Добрый день. Что вы хотите отправить?',
      question: 'Скажите, что хотите отправить посылку в Россию.',
      options: [
        { text: 'Quiero enviar un paquete a Rusia.', transcription: 'Кье́ро энвья́р ун пакэ́тэ а Ру́сья.', translation: 'Я хочу отправить посылку в Россию.', correct: true },
        { text: 'Quiero comprar sellos solamente.', transcription: 'Кье́ро компра́р сэ́йос соламе́нтэ.', translation: 'Я хочу купить только марки.', correct: false },
        { text: 'No sé qué necesito.', transcription: 'Но сэ кэ нэсэси́то.', translation: 'Я не знаю, что мне нужно.', correct: false },
        { text: '¿A qué hora abre la oficina?', transcription: 'А кэ о́ра а́брэ ла офиси́на?', translation: 'Во сколько открывается отделение?', correct: false }
      ],
      correctFeedback: '«Enviar un paquete» — отправить посылку. Основная фраза для похода на почту.',
      wrongFeedback: 'Объясните цель визита: «Quiero enviar un paquete a Rusia».'
    },
    {
      situation: 'Сотрудница спрашивает про содержимое и вес.',
      speaker: 'Empleada — Сотрудница почты',
      greek: '¿Qué contiene el paquete y cuánto pesa?',
      transcription: 'Кэ контьэ́нэ эль пакэ́тэ и куа́нто пэ́са?',
      translation: 'Что находится в посылке и сколько она весит?',
      question: 'Скажите, что там одежда и книги, весит два килограмма.',
      options: [
        { text: 'Contiene ropa y libros, pesa dos kilos.', transcription: 'Контьэ́нэ ро́па и ли́брос, пэ́са дос ки́лос.', translation: 'Там одежда и книги, весит два килограмма.', correct: true },
        { text: 'No lo sé exactamente.', transcription: 'Но ло сэ эксактамэ́нтэ.', translation: 'Я точно не знаю.', correct: false },
        { text: 'Es un regalo caro.', transcription: 'Эс ун рэга́ло ка́ро.', translation: 'Это дорогой подарок.', correct: false },
        { text: 'Prefiero no decirlo.', transcription: 'Прэфьэ́ро но дэси́рло.', translation: 'Я предпочитаю не говорить.', correct: false }
      ],
      correctFeedback: '«Contiene» — "содержит" (от глагола contener). Важно точно описывать содержимое международных посылок для таможни.',
      wrongFeedback: 'Опишите содержимое: «Contiene ropa y libros, pesa dos kilos».'
    },
    {
      situation: 'Сотрудница предлагает варианты доставки.',
      speaker: 'Empleada — Сотрудница почты',
      greek: '¿Quiere envío estándar o urgente? El urgente llega en una semana.',
      transcription: 'Кье́рэ энви́о эстанда́р о урхэ́нтэ? Эль урхэ́нтэ е́га эн у́на сэма́на.',
      translation: 'Хотите стандартную или срочную доставку? Срочная приходит за неделю.',
      question: 'Скажите, что выбираете срочную доставку, потому что это важно.',
      options: [
        { text: 'Prefiero el envío urgente, es importante.', transcription: 'Прэфьэ́ро эль энви́о урхэ́нтэ, эс импорта́нтэ.', translation: 'Я предпочитаю срочную доставку, это важно.', correct: true },
        { text: 'No me importa cuándo llegue.', transcription: 'Но мэ импо́рта куа́ндо е́гэ.', translation: 'Мне неважно, когда придёт.', correct: false },
        { text: 'El envío estándar es mejor siempre.', transcription: 'Эль энви́о эстанда́р эс мэхо́р сьэ́мпрэ.', translation: 'Стандартная доставка всегда лучше.', correct: false },
        { text: '¿Puede llegar mañana mismo?', transcription: 'Пуэ́дэ ега́р манья́на ми́смо?', translation: 'Может ли она прийти уже завтра?', correct: false }
      ],
      correctFeedback: '«Envío urgente» vs «envío estándar» — срочная и стандартная доставка. Хороший словарный запас для почтовых и курьерских услуг.',
      wrongFeedback: 'Выберите тип доставки: «Prefiero el envío urgente, es importante».'
    },
    {
      situation: 'Сотрудница называет цену и просит заполнить форму.',
      speaker: 'Empleada — Сотрудница почты',
      greek: 'Son veinticinco euros. Rellene este formulario con la dirección.',
      transcription: 'Сон вэйнтиси́нко э́урос. Рэйе́нэ э́стэ формула́рьо кон ла дирексьо́н.',
      translation: 'С вас двадцать пять евро. Заполните этот бланк с адресом.',
      question: 'Спросите, нужно ли писать адрес на кириллице или латиницей.',
      options: [
        { text: '¿Escribo la dirección en ruso o en alfabeto latino?', transcription: 'Эскри́бо ла дирексьо́н эн ру́со о эн альфабэ́то лати́но?', translation: 'Мне писать адрес по-русски или латиницей?', correct: true },
        { text: 'No sé escribir en español.', transcription: 'Но сэ эскриби́р эн эспаньо́ль.', translation: 'Я не умею писать по-испански.', correct: false },
        { text: 'Prefiero no rellenar nada.', transcription: 'Прэфьэ́ро но рэйена́р на́да.', translation: 'Я предпочитаю ничего не заполнять.', correct: false },
        { text: 'Es demasiado complicado para mí.', transcription: 'Эс дэмасья́до компликА́до па́ра ми.', translation: 'Это слишком сложно для меня.', correct: false }
      ],
      correctFeedback: '«Alfabeto latino» — латинский алфавит. Полезно уточнять при отправке писем в страны с другой письменностью.',
      wrongFeedback: 'Уточните формат: «¿Escribo la dirección en ruso o en alfabeto latino?»'
    }
  ]
},
{
  id: 'hotel',
  title: '🏨 В отеле',
  icon: '🏨',
  description: 'Заселяемся в отель и решаем вопросы с номером',
  steps: [
    {
      situation: 'Вы подходите к стойке регистрации отеля.',
      speaker: 'Recepcionista — Администратор',
      greek: 'Buenas tardes. ¿Tiene una reserva?',
      transcription: 'Буэ́нас та́рдэс. Тье́нэ у́на рэсэ́рва?',
      translation: 'Добрый день. У вас есть бронь?',
      question: 'Скажите да, на имя Иванов, на три ночи.',
      options: [
        { text: 'Sí, a nombre de Ivanov, para tres noches.', transcription: 'Си, а но́мбрэ дэ Ивано́в, па́ра трэс но́чэс.', translation: 'Да, на имя Иванов, на три ночи.', correct: true },
        { text: 'No, ¿tienen habitaciones libres?', transcription: 'Но, тье́нэн абитасьо́нэс ли́брэс?', translation: 'Нет, у вас есть свободные номера?', correct: false },
        { text: 'No recuerdo el nombre de la reserva.', transcription: 'Но рэкуэ́рдо эль но́мбрэ дэ ла рэсэ́рва.', translation: 'Я не помню имя, на которое бронировал.', correct: false },
        { text: '¿Cuánto cuesta una habitación aquí?', transcription: 'Куа́нто куэ́ста у́на абитасьо́н аки́?', translation: 'Сколько стоит номер здесь?', correct: false }
      ],
      correctFeedback: '«A nombre de» — "на имя" — стандартная фраза при бронировании. «Para tres noches» указывает срок пребывания.',
      wrongFeedback: 'Подтвердите бронь: «Sí, a nombre de Ivanov, para tres noches».'
    },
    {
      situation: 'Администратор просит документ.',
      speaker: 'Recepcionista — Администратор',
      greek: '¿Me deja su pasaporte, por favor?',
      transcription: 'Мэ дэ́ха су паспо́ртэ, пор фаво́р?',
      translation: 'Оставите мне ваш паспорт, пожалуйста?',
      question: 'Передайте паспорт и спросите время завтрака.',
      options: [
        { text: 'Aquí tiene. ¿A qué hora es el desayuno?', transcription: 'Аки́ тье́нэ. А кэ о́ра эс эль дэсаю́но?', translation: 'Вот, пожалуйста. Во сколько завтрак?', correct: true },
        { text: 'No tengo pasaporte conmigo.', transcription: 'Но тэ́нго паспо́ртэ конми́го.', translation: 'У меня нет паспорта с собой.', correct: false },
        { text: '¿Por qué necesita mi pasaporte?', transcription: 'Пор кэ нэсэси́та ми паспо́ртэ?', translation: 'Зачем вам нужен мой паспорт?', correct: false },
        { text: 'Prefiero no darlo.', transcription: 'Прэфьэ́ро но да́рло.', translation: 'Я предпочитаю не давать его.', correct: false }
      ],
      correctFeedback: '«Aquí tiene» — вежливая фраза "вот, пожалуйста" при передаче чего-либо. Паспорт обязателен для регистрации в отелях Испании.',
      wrongFeedback: 'Передайте паспорт и спросите про завтрак: «Aquí tiene. ¿A qué hora es el desayuno?»'
    },
    {
      situation: 'Администратор объясняет детали и вручает ключ.',
      speaker: 'Recepcionista — Администратор',
      greek: 'El desayuno es de siete a diez. Su habitación es la 305, en el tercer piso.',
      transcription: 'Эль дэсаю́но эс дэ сьэ́тэ а дьес. Су абитасьо́н эс ла трэсьэ́нтос синко, эн эль тэрсэ́р пи́со.',
      translation: 'Завтрак с семи до десяти. Ваш номер 305, на третьем этаже.',
      question: 'Спросите, есть ли Wi-Fi в номере.',
      options: [
        { text: '¿Hay wifi en la habitación?', transcription: 'Ай ви́фи эн ла абитасьо́н?', translation: 'Есть ли Wi-Fi в номере?', correct: true },
        { text: '¿Hay piscina en el hotel?', transcription: 'Ай писи́на эн эль ото́ль?', translation: 'Есть ли бассейн в отеле?', correct: false },
        { text: 'No necesito internet.', transcription: 'Но нэсэси́то интэрнэ́т.', translation: 'Мне не нужен интернет.', correct: false },
        { text: '¿El tercer piso está muy alto?', transcription: 'Эль тэрсэ́р пи́со эста́ муй а́льто?', translation: 'Третий этаж — это очень высоко?', correct: false }
      ],
      correctFeedback: '«¿Hay + существительное?» — универсальный вопрос "есть ли...?". Один из самых полезных вопросов в путешествиях.',
      wrongFeedback: 'Уточните про интернет: «¿Hay wifi en la habitación?»'
    },
    {
      situation: 'В номере вы замечаете проблему с кондиционером и звоните на ресепшн.',
      speaker: 'Recepcionista — Администратор',
      greek: 'Recepción, ¿en qué le puedo ayudar?',
      transcription: 'Рэсэпсьо́н, эн кэ ле пуэ́до аюда́р?',
      translation: 'Ресепшн, чем могу помочь?',
      question: 'Скажите, что кондиционер в номере не работает.',
      options: [
        { text: 'El aire acondicionado de mi habitación no funciona.', transcription: 'Эль а́йрэ акондисьона́до дэ ми абитасьо́н но фунсьо́на.', translation: 'Кондиционер в моём номере не работает.', correct: true },
        { text: 'Mi habitación es demasiado pequeña.', transcription: 'Ми абитасьо́н эс дэмасья́до пэкэ́нья.', translation: 'Мой номер слишком маленький.', correct: false },
        { text: 'Quiero cambiar de hotel.', transcription: 'Кье́ро камбья́р дэ ото́ль.', translation: 'Я хочу поменять отель.', correct: false },
        { text: 'No me gusta el color de las paredes.', transcription: 'Но мэ гу́ста эль коло́р дэ лас парэ́дэс.', translation: 'Мне не нравится цвет стен.', correct: false }
      ],
      correctFeedback: '«No funciona» — "не работает" — ключевая фраза для жалоб на технику. Работает с любым прибором: la tele no funciona, el wifi no funciona.',
      wrongFeedback: 'Опишите проблему: «El aire acondicionado de mi habitación no funciona».'
    }
  ]
},
{
  id: 'peluqueria',
  title: '💇 В парикмахерской',
  icon: '💇',
  description: 'Стрижёмся и объясняем, что хотим',
  steps: [
    {
      situation: 'Вы приходите в парикмахерскую без записи.',
      speaker: 'Peluquero — Парикмахер',
      greek: 'Hola, ¿tiene cita o quiere esperar?',
      transcription: 'О́ла, тье́нэ си́та о кье́рэ эспэра́р?',
      translation: 'Привет, у вас есть запись или хотите подождать?',
      question: 'Скажите, что у вас нет записи, но вы можете подождать.',
      options: [
        { text: 'No tengo cita, pero puedo esperar.', transcription: 'Но тэ́нго си́та, пэ́ро пуэ́до эспэра́р.', translation: 'У меня нет записи, но я могу подождать.', correct: true },
        { text: 'Tengo mucha prisa, no puedo esperar.', transcription: 'Тэ́нго му́ча при́са, но пуэ́до эспэра́р.', translation: 'Я очень спешу, не могу ждать.', correct: false },
        { text: 'No sé qué es una cita.', transcription: 'Но сэ кэ эс у́на си́та.', translation: 'Я не знаю, что такое запись.', correct: false },
        { text: 'Vuelvo en otro momento.', transcription: 'Вуэ́льво эн о́тро момэ́нто.', translation: 'Я вернусь в другой раз.', correct: false }
      ],
      correctFeedback: '«Cita» здесь означает "запись" (в отличие от «cita previa» в госучреждениях — но смысл похож). «Puedo esperar» — готовность подождать.',
      wrongFeedback: 'Объясните ситуацию: «No tengo cita, pero puedo esperar».'
    },
    {
      situation: 'Подошла ваша очередь. Парикмахер спрашивает, что вы хотите сделать.',
      speaker: 'Peluquero — Парикмахер',
      greek: '¿Qué se va a hacer hoy?',
      transcription: 'Кэ сэ ва а асэ́р ой?',
      translation: 'Что будем делать сегодня?',
      question: 'Скажите, что хотите подстричься и покрасить корни.',
      options: [
        { text: 'Quiero cortarme el pelo y teñirme las raíces.', transcription: 'Кье́ро корта́рмэ эль пэ́ло и тэньи́рмэ лас раи́сэс.', translation: 'Я хочу подстричься и покрасить корни.', correct: true },
        { text: 'Solo quiero mirar revistas.', transcription: 'Со́ло кье́ро мира́р рэви́стас.', translation: 'Я просто хочу посмотреть журналы.', correct: false },
        { text: 'No quiero cambiar nada.', transcription: 'Но кье́ро камбья́р на́да.', translation: 'Я не хочу ничего менять.', correct: false },
        { text: 'Quiero un tatuaje.', transcription: 'Кье́ро ун татуа́хэ.', translation: 'Я хочу тату.', correct: false }
      ],
      correctFeedback: '«Cortarse el pelo» — подстричься, «teñirse» — покраситься. Возвратные глаголы часто используются с частями тела и внешностью.',
      wrongFeedback: 'Опишите желаемую услугу: «Quiero cortarme el pelo y teñirme las raíces».'
    },
    {
      situation: 'Парикмахер уточняет длину стрижки.',
      speaker: 'Peluquero — Парикмахер',
      greek: '¿Cuánto quiere que le corte, mucho o poco?',
      transcription: 'Куа́нто кье́рэ кэ ле ко́ртэ, му́чо о по́ко?',
      translation: 'Сколько состричь, много или мало?',
      question: 'Скажите, что хотите совсем немного, только кончики.',
      options: [
        { text: 'Muy poco, solo las puntas.', transcription: 'Муй по́ко, со́ло лас пу́нтас.', translation: 'Совсем немного, только кончики.', correct: true },
        { text: 'Todo, quiero el pelo muy corto.', transcription: 'То́до, кье́ро эль пэ́ло муй ко́рто.', translation: 'Всё, хочу очень короткие волосы.', correct: false },
        { text: 'No me corte nada, por favor.', transcription: 'Но мэ ко́ртэ на́да, пор фаво́р.', translation: 'Не стригите ничего, пожалуйста.', correct: false },
        { text: 'Usted decide, no me importa.', transcription: 'Устэ́д дэси́дэ, но мэ импо́рта.', translation: 'Решайте сами, мне неважно.', correct: false }
      ],
      correctFeedback: '«Puntas» — кончики волос. Уточнение длины — ключевой момент разговора с парикмахером, чтобы избежать неожиданностей.',
      wrongFeedback: 'Уточните длину: «Muy poco, solo las puntas».'
    },
    {
      situation: 'После стрижки и окрашивания парикмахер показывает результат в зеркале.',
      speaker: 'Peluquero — Парикмахер',
      greek: '¿Qué le parece? ¿Le gusta el resultado?',
      transcription: 'Кэ ле парэ́сэ? Ле гу́ста эль рэсульта́до?',
      translation: 'Как вам? Вам нравится результат?',
      question: 'Скажите, что вам очень нравится, и поблагодарите.',
      options: [
        { text: 'Me encanta, muchas gracias.', transcription: 'Мэ энка́нта, му́час гра́сьяс.', translation: 'Мне очень нравится, большое спасибо.', correct: true },
        { text: 'No me gusta para nada.', transcription: 'Но мэ гу́ста па́ра на́да.', translation: 'Мне совсем не нравится.', correct: false },
        { text: 'Es demasiado corto.', transcription: 'Эс дэмасья́до ко́рто.', translation: 'Это слишком коротко.', correct: false },
        { text: 'No sé qué decir.', transcription: 'Но сэ кэ дэси́р.', translation: 'Не знаю, что сказать.', correct: false }
      ],
      correctFeedback: '«Me encanta» — "мне очень нравится" — сильнее, чем «me gusta». Отличный способ выразить восторг результатом.',
      wrongFeedback: 'Выразите одобрение: «Me encanta, muchas gracias».'
    }
  ]
},
{
  id: 'urgencias',
  title: '🚑 Скорая помощь и больница',
  icon: '🚑',
  description: 'Экстренная ситуация, вызов скорой и приёмный покой',
  steps: [
    {
      situation: 'Ваш сосед потерял сознание. Вы звоните 112.',
      speaker: 'Operador — Оператор экстренной службы',
      greek: 'Emergencias, ¿cuál es su situación?',
      transcription: 'Эмэрхэ́нсьяс, куа́ль эс су ситуасьо́н?',
      translation: 'Экстренные службы, какая у вас ситуация?',
      question: 'Скажите, что человек потерял сознание и нужна скорая помощь.',
      options: [
        { text: 'Una persona ha perdido el conocimiento, necesito una ambulancia.', transcription: 'У́на пэрсо́на а пэрди́до эль коносимье́нто, нэсэси́то у́на амбуля́нсья.', translation: 'Человек потерял сознание, мне нужна скорая помощь.', correct: true },
        { text: 'Todo está bien, gracias.', transcription: 'То́до эста́ бьен, гра́сьяс.', translation: 'Всё хорошо, спасибо.', correct: false },
        { text: 'Solo quiero información.', transcription: 'Со́ло кье́ро информасьо́н.', translation: 'Я просто хочу получить информацию.', correct: false },
        { text: 'No es urgente, puedo esperar.', transcription: 'Но эс урхэ́нтэ, пуэ́до эспэра́р.', translation: 'Это не срочно, я могу подождать.', correct: false }
      ],
      correctFeedback: '«Perder el conocimiento» — потерять сознание. 112 — единый номер экстренных служб в Испании, работает бесплатно.',
      wrongFeedback: 'Опишите ситуацию: «Una persona ha perdido el conocimiento, necesito una ambulancia».'
    },
    {
      situation: 'Оператор просит адрес.',
      speaker: 'Operador — Оператор экстренной службы',
      greek: '¿Cuál es su dirección exacta?',
      transcription: 'Куа́ль эс су дирексьо́н эксáкта?',
      translation: 'Какой у вас точный адрес?',
      question: 'Назовите адрес — улица Майор, дом 12, третий этаж.',
      options: [
        { text: 'Calle Mayor, número doce, tercer piso.', transcription: 'Ка́йе Майо́р, ну́мэро до́сэ, тэрсэ́р пи́со.', translation: 'Улица Майор, дом двенадцать, третий этаж.', correct: true },
        { text: 'No recuerdo la dirección exacta.', transcription: 'Но рэкуэ́рдо ла дирексьо́н эксáкта.', translation: 'Я не помню точный адрес.', correct: false },
        { text: 'Cerca del centro de la ciudad.', transcription: 'Сэ́рка дэль сэ́нтро дэ ла сьюда́д.', translation: 'Рядом с центром города.', correct: false },
        { text: '¿Por qué necesita mi dirección?', transcription: 'Пор кэ нэсэси́та ми дирексьо́н?', translation: 'Зачем вам нужен мой адрес?', correct: false }
      ],
      correctFeedback: 'Точный адрес критически важен в экстренной ситуации. Запомните формулу: calle + número + piso.',
      wrongFeedback: 'Назовите точный адрес: «Calle Mayor, número doce, tercer piso».'
    },
    {
      situation: 'Скорая приехала, врач в приёмном покое спрашивает о состоянии пациента.',
      speaker: 'Médico — Врач',
      greek: '¿Desde cuándo está así? ¿Tiene alguna enfermedad conocida?',
      transcription: 'Дэ́сдэ куа́ндо эста́ аси́? Тье́нэ альгу́на энфэрмэда́д коноси́да?',
      translation: 'С каких пор он в таком состоянии? У него есть известные заболевания?',
      question: 'Скажите, что это случилось полчаса назад, и вы не знаете про заболевания.',
      options: [
        { text: 'Pasó hace media hora, no sé si tiene alguna enfermedad.', transcription: 'Па́со а́сэ мэ́дья о́ра, но сэ си тьэ́нэ альгу́на энфэрмэда́д.', translation: 'Это случилось полчаса назад, не знаю, есть ли у него заболевания.', correct: true },
        { text: 'No sé nada de esta persona.', transcription: 'Но сэ на́да дэ э́ста пэрсо́на.', translation: 'Я вообще ничего не знаю об этом человеке.', correct: false },
        { text: 'Está perfectamente bien.', transcription: 'Эста́ пэрфэктамэ́нтэ бьен.', translation: 'Он в полном порядке.', correct: false },
        { text: 'No quiero hablar de esto.', transcription: 'Но кье́ро абла́р дэ э́сто.', translation: 'Я не хочу говорить об этом.', correct: false }
      ],
      correctFeedback: '«Hace media hora» — "полчаса назад" — важная временная конструкция для описания событий в прошлом.',
      wrongFeedback: 'Дайте информацию врачу: «Pasó hace media hora, no sé si tiene alguna enfermedad».'
    },
    {
      situation: 'Врач сообщает, что пациента направляют на обследование.',
      speaker: 'Médico — Врач',
      greek: 'Vamos a hacerle unas pruebas. Puede esperar en la sala.',
      transcription: 'Ва́мос а асэ́рлэ у́нас пруэ́бас. Пуэ́дэ эспэра́р эн ла са́ла.',
      translation: 'Мы проведём ему несколько обследований. Вы можете подождать в зале.',
      question: 'Спросите, сколько времени займёт обследование.',
      options: [
        { text: '¿Cuánto tiempo van a tardar las pruebas?', transcription: 'Куа́нто тьэ́мпо ван а тарда́р лас пруэ́бас?', translation: 'Сколько времени займут обследования?', correct: true },
        { text: 'No quiero esperar aquí.', transcription: 'Но кье́ро эспэра́р аки́.', translation: 'Я не хочу ждать здесь.', correct: false },
        { text: '¿Puedo irme a casa ahora?', transcription: 'Пуэ́до и́рмэ а ка́са ао́ра?', translation: 'Могу я пойти домой сейчас?', correct: false },
        { text: 'Esto es una pérdida de tiempo.', transcription: 'Э́сто эс у́на пэ́рдида дэ тьэ́мпо.', translation: 'Это пустая трата времени.', correct: false }
      ],
      correctFeedback: '«Tardar» — занимать время (о процессе). «¿Cuánto tiempo va a tardar?» — очень полезный вопрос в медицинских учреждениях.',
      wrongFeedback: 'Уточните время: «¿Cuánto tiempo van a tardar las pruebas?»'
    }
  ]
},
{
  id: 'ropa',
  title: '👕 В магазине одежды',
  icon: '👕',
  description: 'Выбираем и примеряем одежду',
  steps: [
    {
      situation: 'Вы заходите в магазин одежды. Продавец подходит к вам.',
      speaker: 'Dependienta — Продавщица',
      greek: 'Hola, ¿le puedo ayudar en algo?',
      transcription: 'О́ла, ле пуэ́до аюда́р эн а́льго?',
      translation: 'Здравствуйте, могу я вам чем-то помочь?',
      question: 'Скажите, что ищете куртку для зимы.',
      options: [
        { text: 'Busco una chaqueta para el invierno.', transcription: 'Бу́ско у́на чакэ́та па́ра эль инвьэ́рно.', translation: 'Ищу куртку для зимы.', correct: true },
        { text: 'Solo estoy mirando, gracias.', transcription: 'Со́ло эсто́й мира́ндо, гра́сьяс.', translation: 'Я просто смотрю, спасибо.', correct: false },
        { text: 'No me gusta esta tienda.', transcription: 'Но мэ гу́ста э́ста тьэ́нда.', translation: 'Мне не нравится этот магазин.', correct: false },
        { text: '¿Dónde está la salida?', transcription: 'До́ндэ эста́ ла сали́да?', translation: 'Где выход?', correct: false }
      ],
      correctFeedback: '«Busco + существительное» — прямой способ сказать, что ищете. Хорошая альтернатива более пассивному «estoy mirando».',
      wrongFeedback: 'Опишите, что вам нужно: «Busco una chaqueta para el invierno».'
    },
    {
      situation: 'Продавщица предлагает несколько вариантов и спрашивает про размер.',
      speaker: 'Dependienta — Продавщица',
      greek: 'Tenemos varios modelos. ¿Qué talla usa?',
      transcription: 'Тэнэ́мос ва́рьос модэ́лос. Кэ та́йя у́са?',
      translation: 'У нас есть несколько моделей. Какой размер вы носите?',
      question: 'Скажите, что носите размер M, но не уверены в испанских размерах.',
      options: [
        { text: 'Uso la talla M, pero no estoy segura de las tallas españolas.', transcription: 'У́со ла та́йя э́мэ, пэ́ро но эсто́й сэгу́ра дэ лас та́йяс эспаньо́лас.', translation: 'Я ношу размер M, но не уверена насчёт испанских размеров.', correct: true },
        { text: 'No sé mi talla nunca.', transcription: 'Но сэ ми та́йя ну́нка.', translation: 'Я никогда не знаю свой размер.', correct: false },
        { text: 'La talla no me importa.', transcription: 'Ла та́йя но мэ импо́рта.', translation: 'Размер мне неважен.', correct: false },
        { text: 'Compro ropa muy grande siempre.', transcription: 'Ко́мпро ро́па муй гра́ндэ сьэ́мпрэ.', translation: 'Я всегда покупаю очень большую одежду.', correct: false }
      ],
      correctFeedback: '«No estoy segura/o» — "я не уверен(а)" — полезная фраза, особенно с размерами, которые отличаются в разных странах.',
      wrongFeedback: 'Уточните размер: «Uso la talla M, pero no estoy segura de las tallas españolas».'
    },
    {
      situation: 'Продавщица предлагает примерочную.',
      speaker: 'Dependienta — Продавщица',
      greek: 'Puede probársela en el probador de allí.',
      transcription: 'Пуэ́дэ проба́рсэла эн эль пробадо́р дэ айи́.',
      translation: 'Вы можете примерить её в примерочной вон там.',
      question: 'Поблагодарите и спросите, есть ли зеркало внутри.',
      options: [
        { text: 'Gracias. ¿Hay un espejo dentro?', transcription: 'Гра́сьяс. Ай ун эспэ́хо дэ́нтро?', translation: 'Спасибо. Внутри есть зеркало?', correct: true },
        { text: 'No quiero probarme nada.', transcription: 'Но кье́ро проба́рмэ на́да.', translation: 'Я не хочу ничего примерять.', correct: false },
        { text: '¿Dónde está la caja?', transcription: 'До́ндэ эста́ ла ка́ха?', translation: 'Где касса?', correct: false },
        { text: 'Prefiero comprarla sin probar.', transcription: 'Прэфьэ́ро компра́рла син проба́р.', translation: 'Я предпочитаю купить её без примерки.', correct: false }
      ],
      correctFeedback: '«Probador» — примерочная, «probarse» — примерять на себя. Полезная группа слов для шопинга.',
      wrongFeedback: 'Уточните детали: «Gracias. ¿Hay un espejo dentro?»'
    },
    {
      situation: 'Куртка подошла. Вы идёте к кассе.',
      speaker: 'Dependienta — Продавщица',
      greek: '¿Le quedó bien la chaqueta?',
      transcription: 'Ле кэдо́ бьен ла чакэ́та?',
      translation: 'Куртка хорошо на вас села?',
      question: 'Скажите, что да, идеально подошла, и хотите её купить.',
      options: [
        { text: 'Sí, me quedó perfecta. Quiero comprarla.', transcription: 'Си, мэ кэдо́ пэрфэ́кта. Кье́ро компра́рла.', translation: 'Да, села идеально. Я хочу её купить.', correct: true },
        { text: 'No, me queda muy grande.', transcription: 'Но, мэ кэ́да муй гра́ндэ.', translation: 'Нет, она мне слишком большая.', correct: false },
        { text: 'No lo sé todavía.', transcription: 'Но ло сэ тодави́а.', translation: 'Я пока не знаю.', correct: false },
        { text: 'Prefiero pensarlo más.', transcription: 'Прэфьэ́ро пэнса́рло мас.', translation: 'Я предпочитаю подумать ещё.', correct: false }
      ],
      correctFeedback: '«Quedar bien/mal» — "хорошо/плохо сидеть" (об одежде). «Me quedó perfecta» — отличная фраза для завершения примерки.',
      wrongFeedback: 'Подтвердите покупку: «Sí, me quedó perfecta. Quiero comprarla».'
    }
  ]
},
{
  id: 'oficina',
  title: '💼 На работе в офисе',
  icon: '💼',
  description: 'Первый день на новой работе и общение с коллегами',
  steps: [
    {
      situation: 'Ваш первый день на новой работе. Менеджер знакомит вас с офисом.',
      speaker: 'Jefe — Руководитель',
      greek: 'Bienvenido al equipo. Te voy a presentar a tus compañeros.',
      transcription: 'Бьенвэни́до аль экипо. Тэ вой а прэсэнта́р а тус компанье́рос.',
      translation: 'Добро пожаловать в команду. Я представлю тебя коллегам.',
      question: 'Поблагодарите и скажите, что рады быть здесь.',
      options: [
        { text: 'Muchas gracias, estoy muy contento de estar aquí.', transcription: 'Му́час гра́сьяс, эсто́й муй контэ́нто дэ эста́р аки́.', translation: 'Большое спасибо, я очень рад быть здесь.', correct: true },
        { text: 'No conozco a nadie aquí.', transcription: 'Но коно́ско а на́дьэ аки́.', translation: 'Я никого здесь не знаю.', correct: false },
        { text: 'Prefiero trabajar solo.', transcription: 'Прэфьэ́ро трабаха́р со́ло.', translation: 'Я предпочитаю работать один.', correct: false },
        { text: '¿Cuándo es el descanso?', transcription: 'Куа́ндо эс эль дэска́нсо?', translation: 'Когда перерыв?', correct: false }
      ],
      correctFeedback: '«Estoy contento/a de + инфинитив» — способ выразить положительные эмоции. Важно произвести хорошее первое впечатление.',
      wrongFeedback: 'Отреагируйте позитивно: «Muchas gracias, estoy muy contento de estar aquí».'
    },
    {
      situation: 'Коллега объясняет, как пользоваться системой учёта рабочего времени.',
      speaker: 'Compañero — Коллега',
      greek: 'Tienes que fichar cuando entras y cuando sales.',
      transcription: 'Тьэ́нэс кэ фича́р куа́ндо э́нтрас и куа́ндо са́лэс.',
      translation: 'Тебе нужно отмечаться, когда приходишь и когда уходишь.',
      question: 'Спросите, где находится терминал для отметки времени.',
      options: [
        { text: '¿Dónde está el terminal para fichar?', transcription: 'До́ндэ эста́ эль тэрмина́ль па́ра фича́р?', translation: 'Где находится терминал для отметки времени?', correct: true },
        { text: 'No entiendo por qué es necesario.', transcription: 'Но энтье́ндо пор кэ эс нэсэса́рьо.', translation: 'Не понимаю, зачем это нужно.', correct: false },
        { text: 'Nunca voy a recordar esto.', transcription: 'Ну́нка вой а рэкорда́р э́сто.', translation: 'Я никогда это не запомню.', correct: false },
        { text: 'Prefiero no fichar.', transcription: 'Прэфьэ́ро но фича́р.', translation: 'Я предпочитаю не отмечаться.', correct: false }
      ],
      correctFeedback: '«Fichar» — отмечать приход/уход на работе (важное слово в испанской рабочей культуре). «¿Dónde está?» — базовый вопрос о местоположении.',
      wrongFeedback: 'Уточните местоположение: «¿Dónde está el terminal para fichar?»'
    },
    {
      situation: 'Коллега приглашает вас на обеденный перерыв.',
      speaker: 'Compañero — Коллега',
      greek: '¿Quieres venir a comer con nosotros? Solemos ir a un bar cerca.',
      transcription: 'Кье́рэс вэни́р а комэ́р кон носо́трос? Соле́мос ир а ун бар сэ́рка.',
      translation: 'Хочешь пойти пообедать с нами? Мы обычно ходим в бар неподалёку.',
      question: 'Согласитесь с радостью.',
      options: [
        { text: 'Sí, me encantaría, gracias por invitarme.', transcription: 'Си, мэ энкантари́а, гра́сьяс пор инвита́рмэ.', translation: 'Да, я бы с радостью, спасибо за приглашение.', correct: true },
        { text: 'No, prefiero comer solo siempre.', transcription: 'Но, прэфьэ́ро комэ́р со́ло сьэ́мпрэ.', translation: 'Нет, я всегда предпочитаю обедать один.', correct: false },
        { text: 'No tengo hambre nunca.', transcription: 'Но тэ́нго а́мбрэ ну́нка.', translation: 'Я никогда не голоден.', correct: false },
        { text: 'Los bares no me gustan.', transcription: 'Лос ба́рэс но мэ гу́стан.', translation: 'Мне не нравятся бары.', correct: false }
      ],
      correctFeedback: '«Me encantaría» — условное наклонение "я был бы рад" — вежливый и тёплый способ принять приглашение.',
      wrongFeedback: 'Примите приглашение: «Sí, me encantaría, gracias por invitarme».'
    },
    {
      situation: 'После обеда руководитель просит вас подготовить отчёт к пятнице.',
      speaker: 'Jefe — Руководитель',
      greek: '¿Puedes tener listo el informe para el viernes?',
      transcription: 'Пуэ́дэс тэнэ́р ли́сто эль информэ́ па́ра эль вьэ́рнэс?',
      translation: 'Ты можешь подготовить отчёт к пятнице?',
      question: 'Скажите, что да, и он будет готов вовремя.',
      options: [
        { text: 'Sí, claro, estará listo a tiempo.', transcription: 'Си, кла́ро, эстара́ ли́сто а тьэ́мпо.', translation: 'Да, конечно, он будет готов вовремя.', correct: true },
        { text: 'Es imposible, no tengo tiempo.', transcription: 'Эс импоси́блэ, но тэ́нго тьэ́мпо.', translation: 'Это невозможно, у меня нет времени.', correct: false },
        { text: 'No sé hacer informes.', transcription: 'Но сэ асэ́р информэ́с.', translation: 'Я не умею делать отчёты.', correct: false },
        { text: 'Pregúntale a otro compañero.', transcription: 'Прэгу́нталэ а о́тро компанье́ро.', translation: 'Спроси другого коллегу.', correct: false }
      ],
      correctFeedback: '«Estará listo a tiempo» — уверенный ответ с использованием будущего времени. Хороший способ показать надёжность на новой работе.',
      wrongFeedback: 'Согласитесь уверенно: «Sí, claro, estará listo a tiempo».'
    }
  ]
},
{
  id: 'emergencia',
  title: '🆘 Экстренная ситуация',
  icon: '🆘',
  description: 'У вас украли сумку на улице',
  steps: [
    {
      situation: 'У вас украли сумку на улице. Вы идёте в полицейский участок, чтобы заявить о краже.',
      speaker: 'Policía — Полицейский',
      greek: 'Buenas tardes. ¿En qué puedo ayudarle?',
      transcription: 'Буэ́нас та́рдэс. Эн кэ пуэ́до аюда́рле?',
      translation: 'Добрый день. Чем могу вам помочь?',
      question: 'Скажите, что у вас украли сумку.',
      options: [
        { text: 'Me han robado el bolso.', transcription: 'Мэ ан робáдо эль бо́льсо.', translation: 'У меня украли сумку.', correct: true },
        { text: 'He perdido mis llaves.', transcription: 'Э пэрди́до мис я́вэс.', translation: 'Я потерял свои ключи.', correct: false },
        { text: 'Necesito direcciones.', transcription: 'Нэсэси́то дирексьо́нэс.', translation: 'Мне нужны указания направления.', correct: false },
        { text: 'Vengo a pedir información turística.', transcription: 'Вэ́нго а пэди́р информасьо́н тури́стика.', translation: 'Я пришёл спросить туристическую информацию.', correct: false }
      ],
      correctFeedback: '«Me han robado + предмет» — конструкция для заявления о краже (perfecto compuesto с пассивным значением). Ключевая фраза для таких ситуаций.',
      wrongFeedback: 'Сообщите о краже: «Me han robado el bolso».'
    },
    {
      situation: 'Полицейский спрашивает о деталях происшествия.',
      speaker: 'Policía — Полицейский',
      greek: '¿Dónde y cuándo ocurrió esto?',
      transcription: 'До́ндэ и куа́ндо окуррьо́ э́сто?',
      translation: 'Где и когда это произошло?',
      question: 'Скажите, что это случилось на площади, полчаса назад.',
      options: [
        { text: 'Ocurrió en la plaza, hace media hora.', transcription: 'Окуррьо́ эн ла пла́са, а́сэ мэ́дья о́ра.', translation: 'Это случилось на площади, полчаса назад.', correct: true },
        { text: 'No recuerdo nada de lo que pasó.', transcription: 'Но рэкуэ́рдо на́да дэ ло кэ па́со.', translation: 'Я совсем не помню, что произошло.', correct: false },
        { text: 'Fue hace mucho tiempo, no importa.', transcription: 'Фуэ́ а́сэ му́чо тьэ́мпо, но импо́рта.', translation: 'Это было давно, неважно.', correct: false },
        { text: 'Prefiero no hablar de eso.', transcription: 'Прэфьэ́ро но абла́р дэ э́со.', translation: 'Я предпочитаю не говорить об этом.', correct: false }
      ],
      correctFeedback: '«Ocurrir» — происходить, случаться. «Hace media hora» — временная конструкция "полчаса назад", важна для точности заявления.',
      wrongFeedback: 'Дайте детали: «Ocurrió en la plaza, hace media hora».'
    },
    {
      situation: 'Полицейский спрашивает, что было внутри сумки.',
      speaker: 'Policía — Полицейский',
      greek: '¿Qué tenía dentro del bolso?',
      transcription: 'Кэ тэни́а дэ́нтро дэль бо́льсо?',
      translation: 'Что было внутри сумки?',
      question: 'Скажите, что там были документы, телефон и кошелёк.',
      options: [
        { text: 'Tenía documentos, mi móvil y mi cartera.', transcription: 'Тэни́а докумэ́нтос, ми мо́виль и ми картэ́ра.', translation: 'Там были документы, мой телефон и кошелёк.', correct: true },
        { text: 'No tenía nada importante.', transcription: 'Но тэни́а на́да импорта́нтэ.', translation: 'Там не было ничего важного.', correct: false },
        { text: 'No recuerdo qué tenía.', transcription: 'Но рэкуэ́рдо кэ тэни́а.', translation: 'Не помню, что там было.', correct: false },
        { text: 'Solo tenía maquillaje.', transcription: 'Со́ло тэни́а макийя́хэ.', translation: 'Там была только косметика.', correct: false }
      ],
      correctFeedback: '«Tenía dentro» — использование imperfecto для описания состояния в прошлом. Важно перечислить все ценные вещи для заявления.',
      wrongFeedback: 'Перечислите содержимое: «Tenía documentos, mi móvil y mi cartera».'
    },
    {
      situation: 'Полицейский составляет протокол и объясняет дальнейшие действия.',
      speaker: 'Policía — Полицейский',
      greek: 'Voy a hacer la denuncia. Necesitará este documento para el seguro.',
      transcription: 'Вой а асэ́р ла дэну́нсья. Нэсэситара́ э́стэ докумэ́нто па́ра эль сэгу́ро.',
      translation: 'Я оформлю заявление. Вам понадобится этот документ для страховки.',
      question: 'Поблагодарите и спросите, нужно ли заблокировать банковские карты.',
      options: [
        { text: 'Gracias. ¿Debo bloquear mis tarjetas bancarias?', transcription: 'Гра́сьяс. Дэ́бо блокэа́р мис тархэ́тас банка́рьяс?', translation: 'Спасибо. Мне нужно заблокировать мои банковские карты?', correct: true },
        { text: 'No necesito ningún documento.', transcription: 'Но нэсэси́то нингу́н докумэ́нто.', translation: 'Мне не нужен никакой документ.', correct: false },
        { text: 'No tengo seguro.', transcription: 'Но тэ́нго сэгу́ро.', translation: 'У меня нет страховки.', correct: false },
        { text: 'Esto no va a servir de nada.', transcription: 'Э́сто но ва а сэрви́р дэ на́да.', translation: 'От этого не будет никакого толка.', correct: false }
      ],
      correctFeedback: '«Denuncia» — заявление в полицию. «Debo + инфинитив» — "я должен" — важный вопрос про дальнейшие шаги в кризисной ситуации.',
      wrongFeedback: 'Уточните следующие шаги: «Gracias. ¿Debo bloquear mis tarjetas bancarias?»'
    }
  ]
},
{
  id: 'sim',
  title: '📱 SIM-карта и интернет',
  icon: '📱',
  description: 'Покупаем SIM-карту и подключаем тариф',
  steps: [
    {
      situation: 'Вы заходите в салон связи, чтобы купить SIM-карту.',
      speaker: 'Empleado — Сотрудник салона',
      greek: 'Hola, ¿qué desea?',
      transcription: 'О́ла, кэ дэсэ́а?',
      translation: 'Здравствуйте, что вам угодно?',
      question: 'Скажите, что хотите купить SIM-карту с интернетом.',
      options: [
        { text: 'Quiero comprar una tarjeta SIM con internet.', transcription: 'Кье́ро компра́р у́на тархэ́та сим кон интэрнэ́т.', translation: 'Я хочу купить SIM-карту с интернетом.', correct: true },
        { text: 'Quiero comprar un ordenador.', transcription: 'Кье́ро компра́р ун ордэнадо́р.', translation: 'Я хочу купить компьютер.', correct: false },
        { text: 'No necesito teléfono.', transcription: 'Но нэсэси́то тэлэ́фоно.', translation: 'Мне не нужен телефон.', correct: false },
        { text: '¿Dónde está el banco?', transcription: 'До́ндэ эста́ эль ба́нко?', translation: 'Где находится банк?', correct: false }
      ],
      correctFeedback: '«Tarjeta SIM» — SIM-карта. Одна из первых покупок при переезде — важно иметь связь и интернет.',
      wrongFeedback: 'Объясните цель визита: «Quiero comprar una tarjeta SIM con internet».'
    },
    {
      situation: 'Сотрудник объясняет доступные тарифы.',
      speaker: 'Empleado — Сотрудник салона',
      greek: 'Tenemos varias tarifas. ¿Cuántos gigas necesita al mes?',
      transcription: 'Тэнэ́мос ва́рьяс тари́фас. Куа́нтос ги́гас нэсэси́та аль мэс?',
      translation: 'У нас есть несколько тарифов. Сколько гигабайт вам нужно в месяц?',
      question: 'Скажите, что вам нужно около двадцати гигабайт, потому что вы много работаете онлайн.',
      options: [
        { text: 'Necesito unos veinte gigas porque trabajo mucho en línea.', transcription: 'Нэсэси́то у́нос вэ́йнтэ ги́гас по́ркэ трабáхо му́чо эн ли́нэа.', translation: 'Мне нужно около двадцати гигабайт, потому что я много работаю онлайн.', correct: true },
        { text: 'No uso internet nunca.', transcription: 'Но у́со интэрнэ́т ну́нка.', translation: 'Я никогда не пользуюсь интернетом.', correct: false },
        { text: 'No sé cuántos gigas son.', transcription: 'Но сэ куа́нтос ги́гас сон.', translation: 'Не знаю, сколько это гигабайт.', correct: false },
        { text: 'Quiero el plan más barato sin importar los gigas.', transcription: 'Кье́ро эль план мас бара́то син импорта́р лос ги́гас.', translation: 'Хочу самый дешёвый план, неважно сколько гигабайт.', correct: false }
      ],
      correctFeedback: '«Porque trabajo mucho en línea» — использование «porque» для объяснения причины. Важно указывать потребности для выбора правильного тарифа.',
      wrongFeedback: 'Уточните потребность: «Necesito unos veinte gigas porque trabajo mucho en línea».'
    },
    {
      situation: 'Сотрудник просит документы для регистрации SIM-карты.',
      speaker: 'Empleado — Сотрудник салона',
      greek: 'Para registrar la SIM necesito su pasaporte y su NIE.',
      transcription: 'Па́ра рэхистра́р ла сим нэсэси́то су паспо́ртэ и су ни́е.',
      translation: 'Для регистрации SIM-карты мне нужны ваш паспорт и NIE.',
      question: 'Скажите, что у вас есть паспорт, но NIE ещё в процессе оформления.',
      options: [
        { text: 'Tengo pasaporte, pero el NIE está todavía en trámite.', transcription: 'Тэ́нго паспо́ртэ, пэ́ро эль ни́е эста́ тодави́а эн тра́митэ.', translation: 'У меня есть паспорт, но NIE ещё в процессе оформления.', correct: true },
        { text: 'No sé qué es el NIE.', transcription: 'Но сэ кэ эс эль ни́е.', translation: 'Я не знаю, что такое NIE.', correct: false },
        { text: 'No tengo ningún documento.', transcription: 'Но тэ́нго нингу́н докумэ́нто.', translation: 'У меня нет никаких документов.', correct: false },
        { text: 'Puedo conseguirlo después.', transcription: 'Пуэ́до консэги́рло дэспуэ́с.', translation: 'Я могу получить его позже.', correct: false }
      ],
      correctFeedback: '«Estar en trámite» — "быть в процессе оформления" — очень полезная фраза для любых бюрократических ситуаций в Испании.',
      wrongFeedback: 'Объясните ситуацию с документами: «Tengo pasaporte, pero el NIE está todavía en trámite».'
    },
    {
      situation: 'Сотрудник предлагает временное решение.',
      speaker: 'Empleado — Сотрудник салона',
      greek: 'No hay problema, con el pasaporte es suficiente por ahora.',
      transcription: 'Но ай проблэ́ма, кон эль паспо́ртэ эс суфисьэ́нтэ пор ао́ра.',
      translation: 'Не проблема, паспорта пока достаточно.',
      question: 'Поблагодарите и спросите, когда активируется линия.',
      options: [
        { text: 'Gracias. ¿Cuándo se activa la línea?', transcription: 'Гра́сьяс. Куа́ндо сэ акти́ва ла ли́нэа?', translation: 'Спасибо. Когда активируется линия?', correct: true },
        { text: 'No me importa cuándo funcione.', transcription: 'Но мэ импо́рта куа́ндо фунсьо́нэ.', translation: 'Мне неважно, когда она заработает.', correct: false },
        { text: 'Quiero cancelar todo.', transcription: 'Кье́ро кансэла́р то́до.', translation: 'Я хочу всё отменить.', correct: false },
        { text: 'Esto es muy complicado.', transcription: 'Э́сто эс муй компликА́до.', translation: 'Это очень сложно.', correct: false }
      ],
      correctFeedback: '«Activarse» — активироваться. Важно уточнить сроки, обычно SIM-карта активируется в течение нескольких часов.',
      wrongFeedback: 'Уточните сроки: «Gracias. ¿Cuándo se activa la línea?»'
    }
  ]
},
{
  id: 'colegio',
  title: '🎒 В школе у ребёнка',
  icon: '🎒',
  description: 'Записываем ребёнка в школу и общаемся с учителем',
  steps: [
    {
      situation: 'Вы приходите в школу, чтобы записать ребёнка.',
      speaker: 'Secretaria — Секретарь школы',
      greek: 'Buenos días. ¿En qué le puedo ayudar?',
      transcription: 'Буэ́нос ди́ас. Эн кэ ле пуэ́до аюда́р?',
      translation: 'Добрый день. Чем могу вам помочь?',
      question: 'Скажите, что хотите записать сына в первый класс.',
      options: [
        { text: 'Quiero matricular a mi hijo en primero de primaria.', transcription: 'Кье́ро матрикуля́р а ми и́хо эн приме́ро дэ прима́рья.', translation: 'Я хочу записать сына в первый класс начальной школы.', correct: true },
        { text: 'Busco trabajo como profesor.', transcription: 'Бу́ско трабáхо ко́мо профэсо́р.', translation: 'Я ищу работу учителем.', correct: false },
        { text: 'Quiero visitar la escuela solamente.', transcription: 'Кье́ро визита́р ла эску́эла соламе́нтэ.', translation: 'Я просто хочу посетить школу.', correct: false },
        { text: '¿Dónde está el gimnasio?', transcription: 'До́ндэ эста́ эль химна́сьо?', translation: 'Где находится спортзал?', correct: false }
      ],
      correctFeedback: '«Matricular» — записывать/зачислять (в учебное заведение). «Primero de primaria» — первый класс начальной школы.',
      wrongFeedback: 'Объясните цель визита: «Quiero matricular a mi hijo en primero de primaria».'
    },
    {
      situation: 'Секретарь просит необходимые документы.',
      speaker: 'Secretaria — Секретарь школы',
      greek: 'Necesito el libro de familia, el empadronamiento y las vacunas del niño.',
      transcription: 'Нэсэси́то эль ли́бро дэ фами́лья, эль эмпадронамьэ́нто и лас вáку́нас дэль ни́ньо.',
      translation: 'Мне нужны семейная книга, справка о регистрации по месту жительства и прививки ребёнка.',
      question: 'Скажите, что у вас есть всё, кроме справки о прививках, и спросите, где её получить.',
      options: [
        { text: 'Tengo todo menos las vacunas. ¿Dónde puedo conseguirlas?', transcription: 'Тэ́нго то́до мэ́нос лас вáку́нас. До́ндэ пуэ́до консэги́рлас?', translation: 'У меня есть всё, кроме прививок. Где я могу их получить?', correct: true },
        { text: 'No tengo ningún documento.', transcription: 'Но тэ́нго нингу́н докумэ́нто.', translation: 'У меня нет никаких документов.', correct: false },
        { text: 'Mi hijo no tiene vacunas.', transcription: 'Ми и́хо но тьэ́нэ вáку́нас.', translation: 'У моего сына нет прививок.', correct: false },
        { text: '¿Por qué necesita tanta información?', transcription: 'Пор кэ нэсэси́та та́нта информасьо́н?', translation: 'Зачем вам столько информации?', correct: false }
      ],
      correctFeedback: '«Empadronamiento» — регистрация по месту жительства, ключевой документ в Испании для многих процедур. «Menos» — "кроме".',
      wrongFeedback: 'Уточните недостающий документ: «Tengo todo menos las vacunas. ¿Dónde puedo conseguirlas?»'
    },
    {
      situation: 'Учитель знакомится с родителем в первый учебный день.',
      speaker: 'Profesora — Учительница',
      greek: 'Hola, soy la profesora de su hijo. ¿Habla español el niño?',
      transcription: 'О́ла, сой ла профэсо́ра дэ су и́хо. А́бла эспаньо́ль эль ни́ньо?',
      translation: 'Здравствуйте, я учительница вашего сына. Ребёнок говорит по-испански?',
      question: 'Скажите, что он говорит немного, но быстро учится.',
      options: [
        { text: 'Habla un poco, pero aprende rápido.', transcription: 'А́бла ун по́ко, пэ́ро апрэ́ндэ ра́пидо.', translation: 'Он говорит немного, но быстро учится.', correct: true },
        { text: 'No habla nada de español.', transcription: 'Но а́бла на́да дэ эспаньо́ль.', translation: 'Он совсем не говорит по-испански.', correct: false },
        { text: 'Habla español perfectamente.', transcription: 'А́бла эспаньо́ль пэрфэктамэ́нтэ.', translation: 'Он говорит по-испански идеально.', correct: false },
        { text: 'No me importa si aprende o no.', transcription: 'Но мэ импо́рта си апрэ́ндэ о но.', translation: 'Мне неважно, учится он или нет.', correct: false }
      ],
      correctFeedback: '«Aprender rápido» — быстро учиться. Хороший ответ, показывающий реалистичную оценку и оптимизм — учителя ценят честность.',
      wrongFeedback: 'Опишите уровень ребёнка: «Habla un poco, pero aprende rápido».'
    },
    {
      situation: 'Учительница предлагает дополнительную помощь.',
      speaker: 'Profesora — Учительница',
      greek: 'Podemos ofrecerle clases de refuerzo de español si lo necesita.',
      transcription: 'Подэ́мос офрэсэ́рлэ кла́сэс дэ рэфуэ́рсо дэ эспаньо́ль си ло нэсэси́та.',
      translation: 'Мы можем предложить ему дополнительные занятия по испанскому, если нужно.',
      question: 'Согласитесь и поблагодарите за предложение.',
      options: [
        { text: 'Sería genial, muchas gracias por la oferta.', transcription: 'Сэри́а хэнья́ль, му́час гра́сьяс пор ла офэ́рта.', translation: 'Это было бы замечательно, большое спасибо за предложение.', correct: true },
        { text: 'No, mi hijo no necesita ayuda.', transcription: 'Но, ми и́хо но нэсэси́та аю́да.', translation: 'Нет, моему сыну не нужна помощь.', correct: false },
        { text: 'Es demasiado caro seguramente.', transcription: 'Эс дэмасья́до ка́ро сэгурамэ́нтэ.', translation: 'Наверное, это слишком дорого.', correct: false },
        { text: 'No tengo tiempo para esto.', transcription: 'Но тэ́нго тьэ́мпо па́ра э́сто.', translation: 'У меня нет на это времени.', correct: false }
      ],
      correctFeedback: '«Sería genial» — условное наклонение, вежливое и тёплое согласие. Отличный способ принять помощь для ребёнка.',
      wrongFeedback: 'Примите предложение с благодарностью: «Sería genial, muchas gracias por la oferta».'
    }
  ]
},
{
  id: 'gestoria',
  title: '📑 В gestoría (налоги и бумаги)',
  icon: '📑',
  description: 'Оформляем самозанятость и разбираемся с налогами',
  steps: [
    {
      situation: 'Вы приходите в gestoría (контору по оформлению документов), чтобы стать автономо (самозанятым).',
      speaker: 'Gestor — Специалист по оформлению',
      greek: 'Buenos días. ¿Qué trámite necesita hacer?',
      transcription: 'Буэ́нос ди́ас. Кэ тра́митэ нэсэси́та асэ́р?',
      translation: 'Добрый день. Какую процедуру вам нужно оформить?',
      question: 'Скажите, что хотите зарегистрироваться как самозанятый.',
      options: [
        { text: 'Quiero darme de alta como autónomo.', transcription: 'Кье́ро да́рмэ дэ а́льта ко́мо ауто́номо.', translation: 'Я хочу зарегистрироваться как самозанятый.', correct: true },
        { text: 'Quiero cerrar mi empresa.', transcription: 'Кье́ро сэрра́р ми эмпрэ́са.', translation: 'Я хочу закрыть свою компанию.', correct: false },
        { text: 'Busco un abogado.', transcription: 'Бу́ско ун абога́до.', translation: 'Я ищу адвоката.', correct: false },
        { text: 'No sé qué necesito.', transcription: 'Но сэ кэ нэсэси́то.', translation: 'Я не знаю, что мне нужно.', correct: false }
      ],
      correctFeedback: '«Darse de alta como autónomo» — зарегистрироваться как самозанятый — ключевая фраза для фрилансеров и предпринимателей в Испании.',
      wrongFeedback: 'Объясните цель визита: «Quiero darme de alta como autónomo».'
    },
    {
      situation: 'Специалист объясняет, какие взносы нужно платить.',
      speaker: 'Gestor — Специалист по оформлению',
      greek: 'Tendrá que pagar la cuota mensual a la Seguridad Social.',
      transcription: 'Тэндра́ кэ пага́р ла куо́та мэнсуа́ль а ла Сэгуридá́д Соси́аль.',
      translation: 'Вам нужно будет платить ежемесячный взнос в социальное страхование.',
      question: 'Спросите, сколько составляет минимальный взнос.',
      options: [
        { text: '¿Cuánto es la cuota mínima?', transcription: 'Куа́нто эс ла куо́та ми́нима?', translation: 'Сколько составляет минимальный взнос?', correct: true },
        { text: 'No quiero pagar nada.', transcription: 'Но кье́ро пага́р на́да.', translation: 'Я не хочу ничего платить.', correct: false },
        { text: 'Es demasiado complicado, olvídelo.', transcription: 'Эс дэмасья́до компликА́до, ольви́дэло.', translation: 'Это слишком сложно, забудьте.', correct: false },
        { text: 'Prefiero trabajar sin papeles.', transcription: 'Прэфьэ́ро трабаха́р син папэ́лэс.', translation: 'Я предпочитаю работать без документов.', correct: false }
      ],
      correctFeedback: '«Cuota mensual» — ежемесячный взнос. «Seguridad Social» — социальное страхование, обязательный платёж для автономо.',
      wrongFeedback: 'Уточните сумму: «¿Cuánto es la cuota mínima?»'
    },
    {
      situation: 'Специалист объясняет льготу для новых самозанятых.',
      speaker: 'Gestor — Специалист по оформлению',
      greek: 'Los primeros doce meses hay una tarifa plana muy reducida.',
      transcription: 'Лос приме́рос до́сэ мэ́сэс ай у́на тари́фа пля́на муй рэдуси́да.',
      translation: 'Первые двенадцать месяцев есть сильно сниженный фиксированный тариф.',
      question: 'Спросите, что происходит после первых двенадцати месяцев.',
      options: [
        { text: '¿Qué pasa después de los primeros doce meses?', transcription: 'Кэ па́са дэспуэ́с дэ лос приме́рос до́сэ мэ́сэс?', translation: 'Что происходит после первых двенадцати месяцев?', correct: true },
        { text: 'No me interesa el futuro.', transcription: 'Но мэ интэрэ́са эль футу́ро.', translation: 'Меня не интересует будущее.', correct: false },
        { text: 'Doce meses es mucho tiempo.', transcription: 'До́сэ мэ́сэс эс му́чо тьэ́мпо.', translation: 'Двенадцать месяцев — это много времени.', correct: false },
        { text: 'Prefiero pagar la tarifa completa ya.', transcription: 'Прэфьэ́ро пага́р ла тари́фа компле́та я.', translation: 'Я предпочитаю платить полный тариф уже сейчас.', correct: false }
      ],
      correctFeedback: '«Tarifa plana» — фиксированный льготный тариф для новых автономо (реальная льгота в Испании). Важно понимать, что будет после её окончания.',
      wrongFeedback: 'Уточните дальнейшие условия: «¿Qué pasa después de los primeros doce meses?»'
    },
    {
      situation: 'Специалист напоминает про квартальные налоговые декларации.',
      speaker: 'Gestor — Специалист по оформлению',
      greek: 'También tendrá que presentar la declaración trimestral de impuestos.',
      transcription: 'Тамбье́н тэндра́ кэ прэсэнта́р ла дэклярасьо́н тримэстра́ль дэ импуэ́стос.',
      translation: 'Вам также нужно будет подавать квартальную налоговую декларацию.',
      question: 'Спросите, можете ли вы помочь с этим каждый квартал.',
      options: [
        { text: '¿Puede ayudarme con eso cada trimestre?', transcription: 'Пуэ́дэ аюда́рмэ кон э́со ка́да тримэ́стрэ?', translation: 'Можете помогать мне с этим каждый квартал?', correct: true },
        { text: 'No quiero declarar impuestos.', transcription: 'Но кье́ро дэклара́р импуэ́стос.', translation: 'Я не хочу декларировать налоги.', correct: false },
        { text: 'Es un sistema injusto.', transcription: 'Эс ун систэ́ма инху́сто.', translation: 'Это несправедливая система.', correct: false },
        { text: 'Lo voy a hacer solo, sin ayuda.', transcription: 'Ло вой а асэ́р со́ло, син аю́да.', translation: 'Я сделаю это сам, без помощи.', correct: false }
      ],
      correctFeedback: '«Declaración trimestral» — квартальная декларация, обязательна для автономо в Испании. Большинство пользуется помощью gestoría для этого.',
      wrongFeedback: 'Попросите постоянную поддержку: «¿Puede ayudarme con eso cada trimestre?»'
    }
  ]
},
{
  id: 'conocer',
  title: '🤝 Знакомство и светская беседа',
  icon: '🤝',
  description: 'Знакомимся с соседями и заводим small talk',
  steps: [
    {
      situation: 'Вы встречаете нового соседа во дворе дома.',
      speaker: 'Vecino — Сосед',
      greek: 'Hola, ¿eres el nuevo vecino? Yo soy Carlos, vivo en el segundo piso.',
      transcription: 'О́ла, э́рэс эль нуэ́во вэси́но? Ё сой Ка́рлос, ви́во эн эль сэгу́ндо пи́со.',
      translation: 'Привет, ты новый сосед? Я Карлос, живу на втором этаже.',
      question: 'Представьтесь и скажите, что переехали на прошлой неделе.',
      options: [
        { text: 'Hola, encantado. Soy Iván, me mudé la semana pasada.', transcription: 'О́ла, энканта́до. Сой Ива́н, мэ мудэ́ ла сэма́на паса́да.', translation: 'Привет, приятно познакомиться. Я Иван, переехал на прошлой неделе.', correct: true },
        { text: 'No hablo con desconocidos.', transcription: 'Но а́бло кон дэсконоси́дос.', translation: 'Я не разговариваю с незнакомцами.', correct: false },
        { text: 'No tengo tiempo ahora.', transcription: 'Но тэ́нго тьэ́мпо ао́ра.', translation: 'У меня сейчас нет времени.', correct: false },
        { text: '¿Por qué me preguntas eso?', transcription: 'Пор кэ мэ прэгу́нтас э́со?', translation: 'Почему ты меня об этом спрашиваешь?', correct: false }
      ],
      correctFeedback: '«Encantado/a» — "приятно познакомиться". «Mudarse» — переезжать. Отличное начало знакомства с соседями!',
      wrongFeedback: 'Представьтесь дружелюбно: «Hola, encantado. Soy Iván, me mudé la semana pasada».'
    },
    {
      situation: 'Сосед спрашивает, откуда вы.',
      speaker: 'Vecino — Сосед',
      greek: '¿De dónde eres? Noto un acento diferente.',
      transcription: 'Дэ до́ндэ э́рэс? Но́то ун асэ́нто дифэрэ́нтэ.',
      translation: 'Откуда ты? Я замечаю другой акцент.',
      question: 'Скажите, что вы из России и переехали сюда работать.',
      options: [
        { text: 'Soy de Rusia, me mudé aquí para trabajar.', transcription: 'Сой дэ Ру́сья, мэ мудэ́ аки́ па́ра трабаха́р.', translation: 'Я из России, переехал сюда работать.', correct: true },
        { text: 'Eso no es asunto tuyo.', transcription: 'Э́со но эс асу́нто ту́ё.', translation: 'Это не твоё дело.', correct: false },
        { text: 'No quiero hablar de mi pasado.', transcription: 'Но кье́ро абла́р дэ ми паса́до.', translation: 'Я не хочу говорить о своём прошлом.', correct: false },
        { text: 'No tengo acento.', transcription: 'Но тэ́нго асэ́нто.', translation: 'У меня нет акцента.', correct: false }
      ],
      correctFeedback: '«Para + инфинитив» — "чтобы" (цель). «Me mudé aquí para trabajar» — естественный ответ на вопрос о причине переезда.',
      wrongFeedback: 'Расскажите о себе дружелюбно: «Soy de Rusia, me mudé aquí para trabajar».'
    },
    {
      situation: 'Сосед предлагает познакомить вас с другими жильцами дома.',
      speaker: 'Vecino — Сосед',
      greek: 'Si quieres, te puedo presentar a otros vecinos del edificio.',
      transcription: 'Си кье́рэс, тэ пуэ́до прэсэнта́р а о́трос вэси́нос дэль эдифи́сьо.',
      translation: 'Если хочешь, я могу познакомить тебя с другими соседями дома.',
      question: 'Согласитесь с радостью — это было бы очень полезно.',
      options: [
        { text: 'Sí, por favor, sería muy útil.', transcription: 'Си, пор фаво́р, сэри́а муй у́тиль.', translation: 'Да, пожалуйста, это было бы очень полезно.', correct: true },
        { text: 'No, prefiero estar solo.', transcription: 'Но, прэфьэ́ро эста́р со́ло.', translation: 'Нет, я предпочитаю быть один.', correct: false },
        { text: 'No me interesan mis vecinos.', transcription: 'Но мэ интэрэ́сан мис вэси́нос.', translation: 'Меня не интересуют мои соседи.', correct: false },
        { text: 'Ya conozco a todos.', transcription: 'Я коно́ско а то́дос.', translation: 'Я уже всех знаю.', correct: false }
      ],
      correctFeedback: '«Sería muy útil» — условное наклонение "было бы очень полезно". Хороший способ выразить благодарность за предложение помощи.',
      wrongFeedback: 'Примите предложение: «Sí, por favor, sería muy útil».'
    },
    {
      situation: 'Разговор подходит к концу, сосед приглашает на общий двор в выходные.',
      speaker: 'Vecino — Сосед',
      greek: 'Este sábado hacemos una barbacoa en el patio. ¿Te apuntas?',
      transcription: 'Э́стэ саба́до асэ́мос у́на барбакóа эн эль па́тьо. Тэ апу́нтас?',
      translation: 'В эту субботу мы устраиваем барбекю во дворе. Присоединишься?',
      question: 'Согласитесь и спросите, что можно принести.',
      options: [
        { text: 'Claro que sí. ¿Qué puedo traer?', transcription: 'Кла́ро кэ си. Кэ пуэ́до траэ́р?', translation: 'Конечно да. Что я могу принести?', correct: true },
        { text: 'No me gustan las barbacoas.', transcription: 'Но мэ гу́стан лас барбакóас.', translation: 'Мне не нравятся барбекю.', correct: false },
        { text: 'Los sábados siempre estoy ocupado.', transcription: 'Лос саба́дос сьэ́мпрэ эсто́й окупа́до.', translation: 'По субботам я всегда занят.', correct: false },
        { text: 'No como carne.', transcription: 'Но ко́мо ка́рнэ.', translation: 'Я не ем мясо.', correct: false }
      ],
      correctFeedback: '«¿Te apuntas?» — "присоединишься?" — очень частое приглашение среди испанцев. «Claro que sí» — "конечно да" — тёплое и естественное согласие.',
      wrongFeedback: 'Примите приглашение с интересом: «Claro que sí. ¿Qué puedo traer?»'
    }
  ]
},
];

const PLAN_30 = [
  {
    week: 1,
    theme: "Основы — кто ты и что умеешь",
    color: "#58CC02",
    days: [
      { day: 1, topic: "Приветствия и прощания", focus: "Buenos días, Hola, Adiós, Gracias", type: "vocab" },
      { day: 2, topic: "Глагол ser — 'быть'", focus: "Я предприниматель из России", type: "grammar" },
      { day: 3, topic: "Глагол estar — 'быть/находиться'", focus: "Разница между ser и estar", type: "grammar" },
      { day: 4, topic: "querer + poder", focus: "Хочу и умею — ключевые модальные глаголы", type: "grammar" },
      { day: 5, topic: "Сценарий: Знакомство", focus: "Кто ты, откуда, чем занимаешься", type: "scenario" },
      { day: 6, topic: "Повторение недели 1", focus: "Все глаголы и фразы недели", type: "review" },
      { day: 7, topic: "Аудит недели 1", focus: "Тест + анализ ошибок", type: "audit" }
    ]
  },
  {
    week: 2,
    theme: "Повседневная жизнь в Испании",
    color: "#1CB0F6",
    days: [
      { day: 8, topic: "Еда и рестораны", focus: "comer, beber + заказ в ресторане", type: "vocab" },
      { day: 9, topic: "Покупки и деньги", focus: "comprar, pagar + цены на рынке", type: "vocab" },
      { day: 10, topic: "Транспорт и движение", focus: "ir, salir, llegar", type: "grammar" },
      { day: 11, topic: "Сценарий: На рынке и в метро", focus: "Покупки, транспорт, ориентация в городе", type: "scenario" },
      { day: 12, topic: "Время и дни недели", focus: "Сегодня, завтра, на этой неделе", type: "vocab" },
      { day: 13, topic: "Повторение недели 2", focus: "Все глаголы и фразы недели", type: "review" },
      { day: 14, topic: "Аудит недели 2", focus: "Тест + анализ ошибок", type: "audit" }
    ]
  },
  {
    week: 3,
    theme: "Бюрократия и работа по-испански",
    color: "#FF9600",
    days: [
      { day: 15, topic: "Рабочие глаголы", focus: "trabajar, empezar, terminar, enviar", type: "grammar" },
      { day: 16, topic: "Сценарий: NIE и Extranjería", focus: "Оформление документов иностранца", type: "scenario" },
      { day: 17, topic: "Сценарий: Банк и аренда жилья", focus: "Открытие счёта и подписание контракта", type: "scenario" },
      { day: 18, topic: "Технологии и связь", focus: "Лексика для SIM-карты и интернета", type: "vocab" },
      { day: 19, topic: "Глаголы общения", focus: "preguntar, responder, decir, mostrar", type: "grammar" },
      { day: 20, topic: "Повторение недели 3", focus: "Все глаголы и фразы недели", type: "review" },
      { day: 21, topic: "Аудит недели 3", focus: "Тест + анализ ошибок", type: "audit" }
    ]
  },
  {
    week: 4,
    theme: "Уверенная жизнь — финальный рывок",
    color: "#CE82FF",
    days: [
      { day: 22, topic: "Прошедшее время — pretérito", focus: "Что я делал? Рассказ о себе", type: "grammar" },
      { day: 23, topic: "Будущее время — futuro simple", focus: "Мои планы в Испании", type: "grammar" },
      { day: 24, topic: "Семья и личная жизнь", focus: "Члены семьи и близкие — по-испански", type: "vocab" },
      { day: 25, topic: "Сценарий: Скорая помощь и врач", focus: "Экстренные ситуации и здоровье", type: "scenario" },
      { day: 26, topic: "Отрицание и вопросы", focus: "No, nunca + вопросительные слова", type: "grammar" },
      { day: 27, topic: "Сложные диалоги", focus: "Смешанные ситуации", type: "review" },
      { day: 28, topic: "Марафон повторения", focus: "Все 45 глаголов + 5 сценариев", type: "review" },
      { day: 29, topic: "Финальный тест", focus: "Полный экзамен A2+", type: "audit" },
      { day: 30, topic: "День победы!", focus: "Аудит месяца + следующие цели", type: "audit" }
    ]
  }
];

const VOCAB_CATEGORIES = [
  {
    id: 'verbs_basic', emoji: '📚', title: 'Глаголы: основные',
    words: [
      { greek: 'ser', transcription: 'сэр', translation: 'быть (постоянное)', emoji: '🧍' },
      { greek: 'estar', transcription: 'эста́р', translation: 'быть / находиться', emoji: '📍' },
      { greek: 'tener', transcription: 'тэнэ́р', translation: 'иметь', emoji: '🤲' },
      { greek: 'hacer', transcription: 'асэ́р', translation: 'делать', emoji: '🔨' },
      { greek: 'ir', transcription: 'ир', translation: 'идти / ехать', emoji: '🚶' },
      { greek: 'ver', transcription: 'вэр', translation: 'видеть', emoji: '👀' },
      { greek: 'dar', transcription: 'дар', translation: 'давать', emoji: '🎁' },
      { greek: 'saber', transcription: 'сабэ́р', translation: 'знать', emoji: '🧠' },
      { greek: 'querer', transcription: 'кэрэ́р', translation: 'хотеть / любить', emoji: '❤️' },
      { greek: 'poder', transcription: 'подэ́р', translation: 'мочь', emoji: '💪' },
      { greek: 'decir', transcription: 'дэси́р', translation: 'говорить / сказать', emoji: '🗣️' },
      { greek: 'poner', transcription: 'понэ́р', translation: 'класть / ставить', emoji: '📦' },
      { greek: 'venir', transcription: 'вэни́р', translation: 'приходить', emoji: '🚪' },
      { greek: 'salir', transcription: 'сали́р', translation: 'выходить', emoji: '🚶‍♂️' },
      { greek: 'haber', transcription: 'абэ́р', translation: 'иметься (hay)', emoji: '✅' },
      { greek: 'creer', transcription: 'крээ́р', translation: 'думать / считать', emoji: '💭' }
    ]
  },
  {
    id: 'verbs_movement', emoji: '🏃', title: 'Глаголы: движения',
    words: [
      { greek: 'caminar', transcription: 'камина́р', translation: 'идти пешком', emoji: '🚶' },
      { greek: 'correr', transcription: 'коррэ́р', translation: 'бежать', emoji: '🏃' },
      { greek: 'llegar', transcription: 'ега́р', translation: 'прибывать', emoji: '🏁' },
      { greek: 'salir', transcription: 'сали́р', translation: 'выходить / уезжать', emoji: '🚪' },
      { greek: 'entrar', transcription: 'энтра́р', translation: 'входить', emoji: '🚪' },
      { greek: 'subir', transcription: 'суби́р', translation: 'подниматься / садиться в транспорт', emoji: '⬆️' },
      { greek: 'bajar', transcription: 'баха́р', translation: 'спускаться / выходить из транспорта', emoji: '⬇️' },
      { greek: 'volver', transcription: 'вольвэ́р', translation: 'возвращаться', emoji: '↩️' },
      { greek: 'viajar', transcription: 'вьяха́р', translation: 'путешествовать', emoji: '✈️' },
      { greek: 'moverse', transcription: 'мовэ́рсэ', translation: 'двигаться', emoji: '🤸' },
      { greek: 'seguir', transcription: 'сэги́р', translation: 'продолжать / следовать', emoji: '➡️' },
      { greek: 'parar', transcription: 'пара́р', translation: 'останавливаться', emoji: '🛑' },
      { greek: 'cruzar', transcription: 'круса́р', translation: 'переходить / пересекать', emoji: '🚦' },
      { greek: 'girar', transcription: 'хира́р', translation: 'поворачивать', emoji: '↪️' },
      { greek: 'conducir', transcription: 'кондуси́р', translation: 'водить машину', emoji: '🚗' },
      { greek: 'mudarse', transcription: 'муда́рсэ', translation: 'переезжать', emoji: '📦' }
    ]
  },
  {
    id: 'verbs_daily', emoji: '☀️', title: 'Глаголы: повседневные',
    words: [
      { greek: 'levantarse', transcription: 'левanта́рсэ', translation: 'вставать', emoji: '⏰' },
      { greek: 'ducharse', transcription: 'дуча́рсэ', translation: 'принимать душ', emoji: '🚿' },
      { greek: 'desayunar', transcription: 'дэсаюна́р', translation: 'завтракать', emoji: '🍳' },
      { greek: 'comer', transcription: 'комэ́р', translation: 'есть / обедать', emoji: '🍽️' },
      { greek: 'cenar', transcription: 'сэна́р', translation: 'ужинать', emoji: '🌙' },
      { greek: 'dormir', transcription: 'дорми́р', translation: 'спать', emoji: '😴' },
      { greek: 'despertarse', transcription: 'дэспэрта́рсэ', translation: 'просыпаться', emoji: '👁️' },
      { greek: 'vestirse', transcription: 'вэсти́рсэ', translation: 'одеваться', emoji: '👕' },
      { greek: 'lavar', transcription: 'лава́р', translation: 'мыть / стирать', emoji: '🧼' },
      { greek: 'limpiar', transcription: 'лимпья́р', translation: 'убирать', emoji: '🧹' },
      { greek: 'cocinar', transcription: 'коси́на́р', translation: 'готовить еду', emoji: '👩‍🍳' },
      { greek: 'descansar', transcription: 'дэсканса́р', translation: 'отдыхать', emoji: '🛋️' },
      { greek: 'jugar', transcription: 'хуга́р', translation: 'играть', emoji: '🎮' },
      { greek: 'pasear', transcription: 'пасэа́р', translation: 'гулять', emoji: '🚶‍♀️' },
      { greek: 'ducharse', transcription: 'дуча́рсэ', translation: 'принимать душ', emoji: '🚿' },
      { greek: 'acostarse', transcription: 'акоста́рсэ', translation: 'ложиться спать', emoji: '🛏️' }
    ]
  },
  {
    id: 'verbs_business', emoji: '💼', title: 'Глаголы: деловые',
    words: [
      { greek: 'trabajar', transcription: 'трабаха́р', translation: 'работать', emoji: '💼' },
      { greek: 'firmar', transcription: 'фирма́р', translation: 'подписывать', emoji: '✍️' },
      { greek: 'enviar', transcription: 'энвья́р', translation: 'отправлять', emoji: '📤' },
      { greek: 'recibir', transcription: 'рэсиби́р', translation: 'получать', emoji: '📥' },
      { greek: 'reunirse', transcription: 'рэуни́рсэ', translation: 'встречаться (по делу)', emoji: '🤝' },
      { greek: 'contratar', transcription: 'контрата́р', translation: 'нанимать', emoji: '📝' },
      { greek: 'negociar', transcription: 'нэгосья́р', translation: 'вести переговоры', emoji: '🗣️' },
      { greek: 'facturar', transcription: 'фактура́р', translation: 'выставлять счёт', emoji: '🧾' },
      { greek: 'pagar', transcription: 'пага́р', translation: 'платить', emoji: '💳' },
      { greek: 'cobrar', transcription: 'кобра́р', translation: 'получать оплату', emoji: '💰' },
      { greek: 'gestionar', transcription: 'хэстьона́р', translation: 'управлять / оформлять', emoji: '📋' },
      { greek: 'declarar', transcription: 'дэклара́р', translation: 'декларировать', emoji: '📄' },
      { greek: 'invertir', transcription: 'инвэрти́р', translation: 'инвестировать', emoji: '📈' },
      { greek: 'ahorrar', transcription: 'аоррá́р', translation: 'копить / экономить', emoji: '🐖' },
      { greek: 'planificar', transcription: 'планификá́р', translation: 'планировать', emoji: '🗓️' },
      { greek: 'presentar', transcription: 'прэсэнта́р', translation: 'представлять / подавать (документы)', emoji: '📑' }
    ]
  },
  {
    id: 'verbs_b1', emoji: '🎓', title: 'Глаголы B1',
    words: [
      { greek: 'conseguir', transcription: 'консэги́р', translation: 'добиваться / получать', emoji: '🏆' },
      { greek: 'sugerir', transcription: 'сухэри́р', translation: 'предлагать', emoji: '💡' },
      { greek: 'evitar', transcription: 'эвита́р', translation: 'избегать', emoji: '🚫' },
      { greek: 'permitir', transcription: 'пэрмити́р', translation: 'разрешать', emoji: '✅' },
      { greek: 'prohibir', transcription: 'проиби́р', translation: 'запрещать', emoji: '⛔' },
      { greek: 'exigir', transcription: 'эксихи́р', translation: 'требовать', emoji: '❗' },
      { greek: 'sospechar', transcription: 'соспэча́р', translation: 'подозревать', emoji: '🤨' },
      { greek: 'reconocer', transcription: 'рэконосэ́р', translation: 'узнавать / признавать', emoji: '👁️‍🗨️' },
      { greek: 'aprovechar', transcription: 'апровэча́р', translation: 'воспользоваться', emoji: '🎯' },
      { greek: 'atreverse', transcription: 'атрэвэ́рсэ', translation: 'осмеливаться', emoji: '😤' },
      { greek: 'arrepentirse', transcription: 'аррэпэнти́рсэ', translation: 'сожалеть', emoji: '😔' },
      { greek: 'quejarse', transcription: 'кэха́рсэ', translation: 'жаловаться', emoji: '😠' },
      { greek: 'enterarse', transcription: 'энтэра́рсэ', translation: 'узнавать (новость)', emoji: '📰' },
      { greek: 'darse cuenta', transcription: 'да́рсэ куэ́нта', translation: 'осознавать', emoji: '💡' },
      { greek: 'acostumbrarse', transcription: 'акостумбра́рсэ', translation: 'привыкать', emoji: '🔄' },
      { greek: 'convencer', transcription: 'конвэнсэ́р', translation: 'убеждать', emoji: '🎯' }
    ]
  },
  {
    id: 'numbers', emoji: '🔢', title: 'Числа',
    words: [
      { greek: 'uno', transcription: 'у́но', translation: 'один', emoji: '1️⃣' },
      { greek: 'dos', transcription: 'дос', translation: 'два', emoji: '2️⃣' },
      { greek: 'tres', transcription: 'трэс', translation: 'три', emoji: '3️⃣' },
      { greek: 'cuatro', transcription: 'куа́тро', translation: 'четыре', emoji: '4️⃣' },
      { greek: 'cinco', transcription: 'си́нко', translation: 'пять', emoji: '5️⃣' },
      { greek: 'diez', transcription: 'дьес', translation: 'десять', emoji: '🔟' },
      { greek: 'veinte', transcription: 'вэ́йнтэ', translation: 'двадцать', emoji: '🔢' },
      { greek: 'treinta', transcription: 'трэ́йнта', translation: 'тридцать', emoji: '🔢' },
      { greek: 'cien', transcription: 'сьен', translation: 'сто', emoji: '💯' },
      { greek: 'mil', transcription: 'миль', translation: 'тысяча', emoji: '🔢' },
      { greek: 'primero', transcription: 'приме́ро', translation: 'первый', emoji: '🥇' },
      { greek: 'segundo', transcription: 'сэгу́ндо', translation: 'второй', emoji: '🥈' },
      { greek: 'tercero', transcription: 'тэрсэ́ро', translation: 'третий', emoji: '🥉' },
      { greek: 'medio', transcription: 'мэ́дьо', translation: 'половина', emoji: '➗' },
      { greek: 'docena', transcription: 'досэ́на', translation: 'дюжина', emoji: '🔢' },
      { greek: 'par', transcription: 'пар', translation: 'пара', emoji: '👥' }
    ]
  },
  {
    id: 'city', emoji: '🏙️', title: 'Город',
    words: [
      { greek: 'la ciudad', transcription: 'ла сьюда́д', translation: 'город', emoji: '🏙️' },
      { greek: 'la calle', transcription: 'ла ка́йе', translation: 'улица', emoji: '🛣️' },
      { greek: 'la plaza', transcription: 'ла пла́са', translation: 'площадь', emoji: '⛲' },
      { greek: 'el barrio', transcription: 'эль ба́рьо', translation: 'район', emoji: '🏘️' },
      { greek: 'el parque', transcription: 'эль па́ркэ', translation: 'парк', emoji: '🌳' },
      { greek: 'el ayuntamiento', transcription: 'эль аюнтамьэ́нто', translation: 'мэрия', emoji: '🏛️' },
      { greek: 'el semáforo', transcription: 'эль сэма́форо', translation: 'светофор', emoji: '🚦' },
      { greek: 'la acera', transcription: 'ла асэ́ра', translation: 'тротуар', emoji: '🚶' },
      { greek: 'el edificio', transcription: 'эль эдифи́сьо', translation: 'здание', emoji: '🏢' },
      { greek: 'el puente', transcription: 'эль пуэ́нтэ', translation: 'мост', emoji: '🌉' },
      { greek: 'la esquina', transcription: 'ла эски́на', translation: 'угол (улицы)', emoji: '📐' },
      { greek: 'el centro', transcription: 'эль сэ́нтро', translation: 'центр', emoji: '📍' },
      { greek: 'las afueras', transcription: 'лас афуэ́рас', translation: 'окраина / пригород', emoji: '🏡' },
      { greek: 'el mercado', transcription: 'эль мэрка́до', translation: 'рынок', emoji: '🛒' },
      { greek: 'la iglesia', transcription: 'ла игле́сья', translation: 'церковь', emoji: '⛪' },
      { greek: 'el aparcamiento', transcription: 'эль апаркамьэ́нто', translation: 'парковка', emoji: '🅿️' }
    ]
  },
  {
    id: 'family', emoji: '👨‍👩‍👧‍👦', title: 'Семья',
    words: [
      { greek: 'la madre', transcription: 'ла ма́дрэ', translation: 'мать', emoji: '👩' },
      { greek: 'el padre', transcription: 'эль па́дрэ', translation: 'отец', emoji: '👨' },
      { greek: 'el hijo', transcription: 'эль и́хо', translation: 'сын', emoji: '👦' },
      { greek: 'la hija', transcription: 'ла и́ха', translation: 'дочь', emoji: '👧' },
      { greek: 'el hermano', transcription: 'эль эрма́но', translation: 'брат', emoji: '👦' },
      { greek: 'la hermana', transcription: 'ла эрма́на', translation: 'сестра', emoji: '👧' },
      { greek: 'el abuelo', transcription: 'эль абуэ́ло', translation: 'дедушка', emoji: '👴' },
      { greek: 'la abuela', transcription: 'ла абуэ́ла', translation: 'бабушка', emoji: '👵' },
      { greek: 'el marido', transcription: 'эль мари́до', translation: 'муж', emoji: '🤵' },
      { greek: 'la esposa', transcription: 'ла эспо́са', translation: 'жена', emoji: '👰' },
      { greek: 'el tío', transcription: 'эль ти́о', translation: 'дядя', emoji: '👨' },
      { greek: 'la tía', transcription: 'ла ти́а', translation: 'тётя', emoji: '👩' },
      { greek: 'el primo', transcription: 'эль при́мо', translation: 'кузен', emoji: '🧑' },
      { greek: 'los padres', transcription: 'лос па́дрэс', translation: 'родители', emoji: '👨‍👩‍👧' },
      { greek: 'el bebé', transcription: 'эль бэбэ́', translation: 'младенец', emoji: '👶' },
      { greek: 'el suegro', transcription: 'эль суэ́гро', translation: 'тесть / свёкор', emoji: '👴' }
    ]
  },
  {
    id: 'body', emoji: '🧍', title: 'Тело',
    words: [
      { greek: 'la cabeza', transcription: 'ла кабэ́са', translation: 'голова', emoji: '🗣️' },
      { greek: 'los ojos', transcription: 'лос о́хос', translation: 'глаза', emoji: '👀' },
      { greek: 'la nariz', transcription: 'ла нари́с', translation: 'нос', emoji: '👃' },
      { greek: 'la boca', transcription: 'ла бо́ка', translation: 'рот', emoji: '👄' },
      { greek: 'las manos', transcription: 'лас ма́нос', translation: 'руки (кисти)', emoji: '✋' },
      { greek: 'los brazos', transcription: 'лос бра́сос', translation: 'руки (от плеча)', emoji: '💪' },
      { greek: 'las piernas', transcription: 'лас пьэ́рнас', translation: 'ноги', emoji: '🦵' },
      { greek: 'los pies', transcription: 'лос пьес', translation: 'стопы', emoji: '🦶' },
      { greek: 'la espalda', transcription: 'ла эспа́льда', translation: 'спина', emoji: '🧍' },
      { greek: 'el estómago', transcription: 'эль эсто́маго', translation: 'живот', emoji: '🫃' },
      { greek: 'el corazón', transcription: 'эль корасо́н', translation: 'сердце', emoji: '❤️' },
      { greek: 'la garganta', transcription: 'ла гарга́нта', translation: 'горло', emoji: '😮' },
      { greek: 'los dientes', transcription: 'лос дьэ́нтэс', translation: 'зубы', emoji: '🦷' },
      { greek: 'el pelo', transcription: 'эль пэ́ло', translation: 'волосы', emoji: '💇' },
      { greek: 'la piel', transcription: 'ла пьель', translation: 'кожа', emoji: '🖐️' },
      { greek: 'las orejas', transcription: 'лас орэ́хас', translation: 'уши', emoji: '👂' }
    ]
  },
  {
    id: 'adjectives', emoji: '✨', title: 'Прилагательные',
    words: [
      { greek: 'grande', transcription: 'гра́ндэ', translation: 'большой', emoji: '🐘' },
      { greek: 'pequeño', transcription: 'пэкэ́ньо', translation: 'маленький', emoji: '🐁' },
      { greek: 'bueno', transcription: 'буэ́но', translation: 'хороший', emoji: '👍' },
      { greek: 'malo', transcription: 'ма́ло', translation: 'плохой', emoji: '👎' },
      { greek: 'caro', transcription: 'ка́ро', translation: 'дорогой', emoji: '💰' },
      { greek: 'barato', transcription: 'бара́то', translation: 'дешёвый', emoji: '🪙' },
      { greek: 'bonito', transcription: 'бони́то', translation: 'красивый', emoji: '🌸' },
      { greek: 'feo', transcription: 'фэ́о', translation: 'некрасивый', emoji: '👺' },
      { greek: 'nuevo', transcription: 'нуэ́во', translation: 'новый', emoji: '🆕' },
      { greek: 'viejo', transcription: 'вьэ́хо', translation: 'старый', emoji: '👴' },
      { greek: 'rápido', transcription: 'ра́пидо', translation: 'быстрый', emoji: '⚡' },
      { greek: 'lento', transcription: 'лэ́нто', translation: 'медленный', emoji: '🐌' },
      { greek: 'fácil', transcription: 'фа́силь', translation: 'лёгкий', emoji: '✅' },
      { greek: 'difícil', transcription: 'дифи́силь', translation: 'сложный', emoji: '⚠️' },
      { greek: 'importante', transcription: 'импорта́нтэ', translation: 'важный', emoji: '❗' },
      { greek: 'interesante', transcription: 'интэрэса́нтэ', translation: 'интересный', emoji: '🤔' }
    ]
  },
  {
    id: 'food', emoji: '🍽️', title: 'Еда',
    words: [
      { greek: 'el pan', transcription: 'эль пан', translation: 'хлеб', emoji: '🍞' },
      { greek: 'la carne', transcription: 'ла ка́рнэ', translation: 'мясо', emoji: '🥩' },
      { greek: 'el queso', transcription: 'эль кэ́со', translation: 'сыр', emoji: '🧀' },
      { greek: 'el huevo', transcription: 'эль уэ́во', translation: 'яйцо', emoji: '🥚' },
      { greek: 'la ensalada', transcription: 'ла энсала́да', translation: 'салат', emoji: '🥗' },
      { greek: 'el pescado', transcription: 'эль пэска́до', translation: 'рыба', emoji: '🐟' },
      { greek: 'el pollo', transcription: 'эль по́йо', translation: 'курица', emoji: '🍗' },
      { greek: 'el arroz', transcription: 'эль арро́с', translation: 'рис', emoji: '🍚' },
      { greek: 'la fruta', transcription: 'ла фру́та', translation: 'фрукт', emoji: '🍎' },
      { greek: 'la verdura', transcription: 'ла вэрду́ра', translation: 'овощ', emoji: '🥦' },
      { greek: 'el jamón', transcription: 'эль хамо́н', translation: 'хамон / ветчина', emoji: '🍖' },
      { greek: 'la tortilla', transcription: 'ла торти́йя', translation: 'тортилья (испанский омлет)', emoji: '🍳' },
      { greek: 'la paella', transcription: 'ла паэ́йя', translation: 'паэлья', emoji: '🥘' },
      { greek: 'el aceite', transcription: 'эль асэ́йтэ', translation: 'масло (растительное)', emoji: '🫒' },
      { greek: 'la sal', transcription: 'ла саль', translation: 'соль', emoji: '🧂' },
      { greek: 'el postre', transcription: 'эль по́стрэ', translation: 'десерт', emoji: '🍰' }
    ]
  },
  {
    id: 'drinks', emoji: '🥤', title: 'Напитки',
    words: [
      { greek: 'el agua', transcription: 'эль а́гуа', translation: 'вода', emoji: '💧' },
      { greek: 'el café', transcription: 'эль кафэ́', translation: 'кофе', emoji: '☕' },
      { greek: 'el té', transcription: 'эль тэ', translation: 'чай', emoji: '🍵' },
      { greek: 'el vino', transcription: 'эль ви́но', translation: 'вино', emoji: '🍷' },
      { greek: 'la cerveza', transcription: 'ла сэрвэ́са', translation: 'пиво', emoji: '🍺' },
      { greek: 'el zumo', transcription: 'эль су́мо', translation: 'сок', emoji: '🧃' },
      { greek: 'la leche', transcription: 'ла лэ́чэ', translation: 'молоко', emoji: '🥛' },
      { greek: 'la sangría', transcription: 'ла сангри́а', translation: 'сангрия', emoji: '🍹' },
      { greek: 'el refresco', transcription: 'эль рэфрэ́ско', translation: 'газировка', emoji: '🥤' },
      { greek: 'el cava', transcription: 'эль ка́ва', translation: 'кава (испанское шампанское)', emoji: '🥂' },
      { greek: 'la horchata', transcription: 'ла орча́та', translation: 'орчата', emoji: '🥛' },
      { greek: 'el batido', transcription: 'эль бати́до', translation: 'молочный коктейль', emoji: '🥤' },
      { greek: 'el hielo', transcription: 'эль йэ́ло', translation: 'лёд', emoji: '🧊' },
      { greek: 'la botella', transcription: 'ла ботэ́йя', translation: 'бутылка', emoji: '🍾' },
      { greek: 'la copa', transcription: 'ла ко́па', translation: 'бокал', emoji: '🍷' },
      { greek: 'el vaso', transcription: 'эль ва́со', translation: 'стакан', emoji: '🥛' }
    ]
  },
  {
    id: 'transport', emoji: '🚗', title: 'Транспорт',
    words: [
      { greek: 'el coche', transcription: 'эль ко́чэ', translation: 'машина', emoji: '🚗' },
      { greek: 'el autobús', transcription: 'эль аутобу́с', translation: 'автобус', emoji: '🚌' },
      { greek: 'el metro', transcription: 'эль мэ́тро', translation: 'метро', emoji: '🚇' },
      { greek: 'el tren', transcription: 'эль трэн', translation: 'поезд', emoji: '🚆' },
      { greek: 'el taxi', transcription: 'эль та́кси', translation: 'такси', emoji: '🚕' },
      { greek: 'el avión', transcription: 'эль авьо́н', translation: 'самолёт', emoji: '✈️' },
      { greek: 'la bicicleta', transcription: 'ла бисиклэ́та', translation: 'велосипед', emoji: '🚲' },
      { greek: 'la parada', transcription: 'ла пара́да', translation: 'остановка', emoji: '🚏' },
      { greek: 'la estación', transcription: 'ла эстасьо́н', translation: 'станция / вокзал', emoji: '🚉' },
      { greek: 'el billete', transcription: 'эль бийе́тэ', translation: 'билет', emoji: '🎫' },
      { greek: 'el carné de conducir', transcription: 'эль карнэ́ дэ кондуси́р', translation: 'водительские права', emoji: '🪪' },
      { greek: 'el aeropuerto', transcription: 'эль аэропуэ́рто', translation: 'аэропорт', emoji: '🛫' },
      { greek: 'el barco', transcription: 'эль ба́рко', translation: 'корабль', emoji: '🚢' },
      { greek: 'la moto', transcription: 'ла мо́то', translation: 'мотоцикл', emoji: '🏍️' },
      { greek: 'el tráfico', transcription: 'эль тра́фико', translation: 'трафик / пробка', emoji: '🚦' },
      { greek: 'el peaje', transcription: 'эль пэа́хэ', translation: 'платная дорога', emoji: '🛣️' }
    ]
  },
  {
    id: 'house', emoji: '🏠', title: 'Дом и квартира',
    words: [
      { greek: 'el piso', transcription: 'эль пи́со', translation: 'квартира', emoji: '🏢' },
      { greek: 'la casa', transcription: 'ла ка́са', translation: 'дом', emoji: '🏠' },
      { greek: 'la habitación', transcription: 'ла абитасьо́н', translation: 'комната / спальня', emoji: '🛏️' },
      { greek: 'la cocina', transcription: 'ла коси́на', translation: 'кухня', emoji: '🍳' },
      { greek: 'el baño', transcription: 'эль ба́ньо', translation: 'ванная', emoji: '🛁' },
      { greek: 'el salón', transcription: 'эль сало́н', translation: 'гостиная', emoji: '🛋️' },
      { greek: 'la puerta', transcription: 'ла пуэ́рта', translation: 'дверь', emoji: '🚪' },
      { greek: 'la ventana', transcription: 'ла вэнта́на', translation: 'окно', emoji: '🪟' },
      { greek: 'el alquiler', transcription: 'эль алькиле́р', translation: 'аренда', emoji: '🔑' },
      { greek: 'el propietario', transcription: 'эль пропьэта́рьо', translation: 'владелец жилья', emoji: '👤' },
      { greek: 'los muebles', transcription: 'лос муэ́блэс', translation: 'мебель', emoji: '🪑' },
      { greek: 'la nevera', transcription: 'ла нэвэ́ра', translation: 'холодильник', emoji: '🧊' },
      { greek: 'la lavadora', transcription: 'ла лявадо́ра', translation: 'стиральная машина', emoji: '🧺' },
      { greek: 'el balcón', transcription: 'эль бальсо́н', translation: 'балкон', emoji: '🏞️' },
      { greek: 'la llave', transcription: 'ла я́вэ', translation: 'ключ', emoji: '🔑' },
      { greek: 'el vecino', transcription: 'эль вэси́но', translation: 'сосед', emoji: '🧑‍🤝‍🧑' }
    ]
  },
  {
    id: 'nature', emoji: '🌳', title: 'Природа',
    words: [
      { greek: 'el árbol', transcription: 'эль а́рболь', translation: 'дерево', emoji: '🌳' },
      { greek: 'la flor', transcription: 'ла флёр', translation: 'цветок', emoji: '🌸' },
      { greek: 'el mar', transcription: 'эль мар', translation: 'море', emoji: '🌊' },
      { greek: 'la playa', transcription: 'ла пла́я', translation: 'пляж', emoji: '🏖️' },
      { greek: 'la montaña', transcription: 'ла монта́нья', translation: 'гора', emoji: '⛰️' },
      { greek: 'el río', transcription: 'эль ри́о', translation: 'река', emoji: '🏞️' },
      { greek: 'el sol', transcription: 'эль соль', translation: 'солнце', emoji: '☀️' },
      { greek: 'la luna', transcription: 'ла лу́на', translation: 'луна', emoji: '🌙' },
      { greek: 'el cielo', transcription: 'эль сьэ́ло', translation: 'небо', emoji: '🌤️' },
      { greek: 'el bosque', transcription: 'эль бо́скэ', translation: 'лес', emoji: '🌲' },
      { greek: 'la piedra', transcription: 'ла пьэ́дра', translation: 'камень', emoji: '🪨' },
      { greek: 'la arena', transcription: 'ла арэ́на', translation: 'песок', emoji: '🏝️' },
      { greek: 'el campo', transcription: 'эль ка́мпо', translation: 'поле / деревня', emoji: '🌾' },
      { greek: 'la isla', transcription: 'ла и́сла', translation: 'остров', emoji: '🏝️' },
      { greek: 'la estrella', transcription: 'ла эстрэ́йя', translation: 'звезда', emoji: '⭐' },
      { greek: 'la ola', transcription: 'ла о́ла', translation: 'волна', emoji: '🌊' }
    ]
  },
  {
    id: 'weather', emoji: '🌦️', title: 'Погода',
    words: [
      { greek: 'hace sol', transcription: 'а́сэ соль', translation: 'солнечно', emoji: '☀️' },
      { greek: 'hace calor', transcription: 'а́сэ калёр', translation: 'жарко', emoji: '🥵' },
      { greek: 'hace frío', transcription: 'а́сэ фри́о', translation: 'холодно', emoji: '🥶' },
      { greek: 'llueve', transcription: 'йюэ́вэ', translation: 'идёт дождь', emoji: '🌧️' },
      { greek: 'nieva', transcription: 'ньэ́ва', translation: 'идёт снег', emoji: '❄️' },
      { greek: 'hay viento', transcription: 'ай вьэ́нто', translation: 'ветрено', emoji: '💨' },
      { greek: 'está nublado', transcription: 'эста́ нубля́до', translation: 'облачно', emoji: '☁️' },
      { greek: 'la tormenta', transcription: 'ла тормэ́нта', translation: 'гроза', emoji: '⛈️' },
      { greek: 'la temperatura', transcription: 'ла тэмпэрату́ра', translation: 'температура', emoji: '🌡️' },
      { greek: 'el pronóstico', transcription: 'эль проно́стико', translation: 'прогноз погоды', emoji: '📺' },
      { greek: 'húmedo', transcription: 'у́мэдо', translation: 'влажный', emoji: '💦' },
      { greek: 'seco', transcription: 'сэ́ко', translation: 'сухой', emoji: '🏜️' },
      { greek: 'la niebla', transcription: 'ла ньэ́бля', translation: 'туман', emoji: '🌫️' },
      { greek: 'el arcoíris', transcription: 'эль аркои́рис', translation: 'радуга', emoji: '🌈' },
      { greek: 'la primavera', transcription: 'ла примавэ́ра', translation: 'весна', emoji: '🌷' },
      { greek: 'el verano', transcription: 'эль вэра́но', translation: 'лето', emoji: '🌞' }
    ]
  },
  {
    id: 'clothes', emoji: '👕', title: 'Одежда',
    words: [
      { greek: 'la camisa', transcription: 'ла ками́са', translation: 'рубашка', emoji: '👔' },
      { greek: 'la camiseta', transcription: 'ла камисэ́та', translation: 'футболка', emoji: '👕' },
      { greek: 'los pantalones', transcription: 'лос панталёнэс', translation: 'брюки', emoji: '👖' },
      { greek: 'el vestido', transcription: 'эль вэсти́до', translation: 'платье', emoji: '👗' },
      { greek: 'la falda', transcription: 'ла фа́льда', translation: 'юбка', emoji: '👗' },
      { greek: 'la chaqueta', transcription: 'ла чакэ́та', translation: 'куртка / пиджак', emoji: '🧥' },
      { greek: 'el abrigo', transcription: 'эль абри́го', translation: 'пальто', emoji: '🧥' },
      { greek: 'los zapatos', transcription: 'лос сапа́тос', translation: 'туфли', emoji: '👞' },
      { greek: 'las botas', transcription: 'лас бо́тас', translation: 'ботинки / сапоги', emoji: '👢' },
      { greek: 'los calcetines', transcription: 'лос кальсэти́нэс', translation: 'носки', emoji: '🧦' },
      { greek: 'la ropa interior', transcription: 'ла ро́па интэрьо́р', translation: 'нижнее бельё', emoji: '🩲' },
      { greek: 'el sombrero', transcription: 'эль сомбрэ́ро', translation: 'шляпа', emoji: '👒' },
      { greek: 'la bufanda', transcription: 'ла буфа́нда', translation: 'шарф', emoji: '🧣' },
      { greek: 'los guantes', transcription: 'лос гуа́нтэс', translation: 'перчатки', emoji: '🧤' },
      { greek: 'el bañador', transcription: 'эль баньядо́р', translation: 'купальник / плавки', emoji: '🩱' },
      { greek: 'las gafas', transcription: 'лас га́фас', translation: 'очки', emoji: '👓' }
    ]
  },
  {
    id: 'colors', emoji: '🎨', title: 'Цвета',
    words: [
      { greek: 'rojo', transcription: 'ро́хо', translation: 'красный', emoji: '🔴' },
      { greek: 'azul', transcription: 'асу́ль', translation: 'синий', emoji: '🔵' },
      { greek: 'verde', transcription: 'вэ́рдэ', translation: 'зелёный', emoji: '🟢' },
      { greek: 'amarillo', transcription: 'амари́йо', translation: 'жёлтый', emoji: '🟡' },
      { greek: 'negro', transcription: 'нэ́гро', translation: 'чёрный', emoji: '⚫' },
      { greek: 'blanco', transcription: 'бля́нко', translation: 'белый', emoji: '⚪' },
      { greek: 'gris', transcription: 'грис', translation: 'серый', emoji: '🩶' },
      { greek: 'naranja', transcription: 'нара́нха', translation: 'оранжевый', emoji: '🟠' },
      { greek: 'morado', transcription: 'мора́до', translation: 'фиолетовый', emoji: '🟣' },
      { greek: 'rosa', transcription: 'ро́са', translation: 'розовый', emoji: '🩷' },
      { greek: 'marrón', transcription: 'маррон', translation: 'коричневый', emoji: '🟤' },
      { greek: 'dorado', transcription: 'дора́до', translation: 'золотой', emoji: '✨' },
      { greek: 'plateado', transcription: 'платэа́до', translation: 'серебряный', emoji: '⚙️' },
      { greek: 'claro', transcription: 'кла́ро', translation: 'светлый', emoji: '💡' },
      { greek: 'oscuro', transcription: 'оску́ро', translation: 'тёмный', emoji: '🌑' },
      { greek: 'multicolor', transcription: 'мультиколёр', translation: 'разноцветный', emoji: '🌈' }
    ]
  },
  {
    id: 'animals', emoji: '🐾', title: 'Животные',
    words: [
      { greek: 'el perro', transcription: 'эль пэ́рро', translation: 'собака', emoji: '🐕' },
      { greek: 'el gato', transcription: 'эль га́то', translation: 'кот', emoji: '🐈' },
      { greek: 'el caballo', transcription: 'эль каба́йо', translation: 'лошадь', emoji: '🐴' },
      { greek: 'el pájaro', transcription: 'эль па́харо', translation: 'птица', emoji: '🐦' },
      { greek: 'el pez', transcription: 'эль пэс', translation: 'рыба (живая)', emoji: '🐠' },
      { greek: 'la vaca', transcription: 'ла ва́ка', translation: 'корова', emoji: '🐄' },
      { greek: 'el cerdo', transcription: 'эль сэ́рдо', translation: 'свинья', emoji: '🐖' },
      { greek: 'la oveja', transcription: 'ла овэ́ха', translation: 'овца', emoji: '🐑' },
      { greek: 'el león', transcription: 'эль леон', translation: 'лев', emoji: '🦁' },
      { greek: 'el elefante', transcription: 'эль элефа́нтэ', translation: 'слон', emoji: '🐘' },
      { greek: 'el ratón', transcription: 'эль рато́н', translation: 'мышь', emoji: '🐁' },
      { greek: 'la mariposa', transcription: 'ла марипо́са', translation: 'бабочка', emoji: '🦋' },
      { greek: 'la araña', transcription: 'ла ара́нья', translation: 'паук', emoji: '🕷️' },
      { greek: 'la mosca', transcription: 'ла мо́ска', translation: 'муха', emoji: '🪰' },
      { greek: 'la gallina', transcription: 'ла гайи́на', translation: 'курица (домашняя)', emoji: '🐔' },
      { greek: 'el burro', transcription: 'эль бу́рро', translation: 'осёл', emoji: '🫏' }
    ]
  },
  {
    id: 'emotions', emoji: '😊', title: 'Эмоции',
    words: [
      { greek: 'feliz', transcription: 'фэли́с', translation: 'счастливый', emoji: '😊' },
      { greek: 'triste', transcription: 'три́стэ', translation: 'грустный', emoji: '😢' },
      { greek: 'enfadado', transcription: 'энфада́до', translation: 'сердитый', emoji: '😠' },
      { greek: 'cansado', transcription: 'кansа́до', translation: 'уставший', emoji: '😴' },
      { greek: 'nervioso', transcription: 'нэрвьо́со', translation: 'нервный', emoji: '😰' },
      { greek: 'tranquilo', transcription: 'транки́ло', translation: 'спокойный', emoji: '😌' },
      { greek: 'sorprendido', transcription: 'сорпрэнди́до', translation: 'удивлённый', emoji: '😲' },
      { greek: 'preocupado', transcription: 'прэокупа́до', translation: 'обеспокоенный', emoji: '😟' },
      { greek: 'emocionado', transcription: 'эмосьона́до', translation: 'взволнованный / в восторге', emoji: '🤩' },
      { greek: 'orgulloso', transcription: 'оргуйо́со', translation: 'гордый', emoji: '😤' },
      { greek: 'asustado', transcription: 'асуста́до', translation: 'испуганный', emoji: '😨' },
      { greek: 'aburrido', transcription: 'абурри́до', translation: 'скучающий', emoji: '🥱' },
      { greek: 'celoso', transcription: 'сэлё́со', translation: 'ревнивый', emoji: '😒' },
      { greek: 'agradecido', transcription: 'аградэси́до', translation: 'благодарный', emoji: '🙏' },
      { greek: 'confundido', transcription: 'конфунди́до', translation: 'растерянный', emoji: '😵' },
      { greek: 'enamorado', transcription: 'энамора́до', translation: 'влюблённый', emoji: '😍' }
    ]
  },
  {
    id: 'sports', emoji: '⚽', title: 'Спорт',
    words: [
      { greek: 'el fútbol', transcription: 'эль фу́тболь', translation: 'футбол', emoji: '⚽' },
      { greek: 'el baloncesto', transcription: 'эль баленсэ́сто', translation: 'баскетбол', emoji: '🏀' },
      { greek: 'el tenis', transcription: 'эль тэ́нис', translation: 'теннис', emoji: '🎾' },
      { greek: 'nadar', transcription: 'нада́р', translation: 'плавать', emoji: '🏊' },
      { greek: 'correr', transcription: 'коррэ́р', translation: 'бегать', emoji: '🏃' },
      { greek: 'el gimnasio', transcription: 'эль химна́сьо', translation: 'спортзал', emoji: '🏋️' },
      { greek: 'entrenar', transcription: 'энтрэна́р', translation: 'тренироваться', emoji: '💪' },
      { greek: 'el equipo', transcription: 'эль экипо', translation: 'команда', emoji: '🧑‍🤝‍🧑' },
      { greek: 'el partido', transcription: 'эль парти́до', translation: 'матч', emoji: '🏟️' },
      { greek: 'ganar', transcription: 'гана́р', translation: 'выигрывать', emoji: '🏆' },
      { greek: 'perder', transcription: 'пэрдэ́р', translation: 'проигрывать', emoji: '😞' },
      { greek: 'el ciclismo', transcription: 'эль сикли́смо', translation: 'велоспорт', emoji: '🚴' },
      { greek: 'el senderismo', transcription: 'эль сэндэри́смо', translation: 'пеший туризм', emoji: '🥾' },
      { greek: 'el yoga', transcription: 'эль йо́га', translation: 'йога', emoji: '🧘' },
      { greek: 'la pista', transcription: 'ла пи́ста', translation: 'корт / трасса', emoji: '🎾' },
      { greek: 'el árbitro', transcription: 'эль а́рбитро', translation: 'судья', emoji: '🧑‍⚖️' }
    ]
  },
  {
    id: 'technology', emoji: '💻', title: 'Технологии',
    words: [
      { greek: 'el móvil', transcription: 'эль мо́виль', translation: 'мобильный телефон', emoji: '📱' },
      { greek: 'el ordenador', transcription: 'эль ордэнадо́р', translation: 'компьютер', emoji: '💻' },
      { greek: 'internet', transcription: 'интэрнэ́т', translation: 'интернет', emoji: '🌐' },
      { greek: 'la contraseña', transcription: 'ла контрасэ́нья', translation: 'пароль', emoji: '🔒' },
      { greek: 'el wifi', transcription: 'эль ви́фи', translation: 'вайфай', emoji: '📶' },
      { greek: 'la aplicación', transcription: 'ла апликасьо́н', translation: 'приложение', emoji: '📲' },
      { greek: 'el correo electrónico', transcription: 'эль коррэ́о электро́нико', translation: 'электронная почта', emoji: '📧' },
      { greek: 'descargar', transcription: 'дэскарга́р', translation: 'скачивать', emoji: '⬇️' },
      { greek: 'subir', transcription: 'суби́р', translation: 'загружать (в интернет)', emoji: '⬆️' },
      { greek: 'la batería', transcription: 'ла батэри́а', translation: 'батарея', emoji: '🔋' },
      { greek: 'la pantalla', transcription: 'ла панта́йя', translation: 'экран', emoji: '📺' },
      { greek: 'el cargador', transcription: 'эль каргадо́р', translation: 'зарядное устройство', emoji: '🔌' },
      { greek: 'la cámara', transcription: 'ла ка́мара', translation: 'камера', emoji: '📷' },
      { greek: 'la red social', transcription: 'ла рэд сосьяль', translation: 'социальная сеть', emoji: '📱' },
      { greek: 'el archivo', transcription: 'эль арчи́во', translation: 'файл', emoji: '📁' },
      { greek: 'actualizar', transcription: 'актуалиса́р', translation: 'обновлять', emoji: '🔄' }
    ]
  },
  {
    id: 'kitchen', emoji: '🍳', title: 'Кухня',
    words: [
      { greek: 'la sartén', transcription: 'ла сартэ́н', translation: 'сковорода', emoji: '🍳' },
      { greek: 'la olla', transcription: 'ла о́йя', translation: 'кастрюля', emoji: '🍲' },
      { greek: 'el cuchillo', transcription: 'эль кучи́йо', translation: 'нож', emoji: '🔪' },
      { greek: 'el tenedor', transcription: 'эль тэнэдо́р', translation: 'вилка', emoji: '🍴' },
      { greek: 'la cuchara', transcription: 'ла куча́ра', translation: 'ложка', emoji: '🥄' },
      { greek: 'el plato', transcription: 'эль пля́то', translation: 'тарелка', emoji: '🍽️' },
      { greek: 'la taza', transcription: 'ла та́са', translation: 'чашка', emoji: '☕' },
      { greek: 'el horno', transcription: 'эль о́рно', translation: 'духовка', emoji: '🔥' },
      { greek: 'el microondas', transcription: 'эль микроо́ндас', translation: 'микроволновка', emoji: '📦' },
      { greek: 'el fregadero', transcription: 'эль фрэгадэ́ро', translation: 'раковина', emoji: '🚰' },
      { greek: 'la tabla de cortar', transcription: 'ла та́бла дэ корта́р', translation: 'разделочная доска', emoji: '🪵' },
      { greek: 'el mantel', transcription: 'эль манте́ль', translation: 'скатерть', emoji: '🧵' },
      { greek: 'la servilleta', transcription: 'ла сэрвийе́та', translation: 'салфетка', emoji: '🧻' },
      { greek: 'el abrelatas', transcription: 'эль абрэля́тас', translation: 'консервный нож', emoji: '🥫' },
      { greek: 'el colador', transcription: 'эль коладо́р', translation: 'дуршлаг', emoji: '🍝' },
      { greek: 'la nevera', transcription: 'ла нэвэ́ра', translation: 'холодильник', emoji: '🧊' }
    ]
  },
  {
    id: 'office', emoji: '🏢', title: 'Офис',
    words: [
      { greek: 'la oficina', transcription: 'ла офиси́на', translation: 'офис', emoji: '🏢' },
      { greek: 'el escritorio', transcription: 'эль эскрито́рьо', translation: 'письменный стол', emoji: '🖥️' },
      { greek: 'la reunión', transcription: 'ла рэуньо́н', translation: 'совещание', emoji: '🤝' },
      { greek: 'el jefe', transcription: 'эль хэ́фэ', translation: 'начальник', emoji: '👔' },
      { greek: 'el compañero', transcription: 'эль компанье́ро', translation: 'коллега', emoji: '🧑‍💼' },
      { greek: 'el contrato', transcription: 'эль контра́то', translation: 'контракт', emoji: '📄' },
      { greek: 'el sueldo', transcription: 'эль суэ́льдо', translation: 'зарплата', emoji: '💵' },
      { greek: 'el horario', transcription: 'эль ора́рьо', translation: 'расписание', emoji: '🕐' },
      { greek: 'las vacaciones', transcription: 'лас вакасьо́нэс', translation: 'отпуск', emoji: '🏖️' },
      { greek: 'la impresora', transcription: 'ла импрэсо́ра', translation: 'принтер', emoji: '🖨️' },
      { greek: 'el correo', transcription: 'эль коррэ́о', translation: 'почта / письмо', emoji: '✉️' },
      { greek: 'la carpeta', transcription: 'ла карпэ́та', translation: 'папка', emoji: '📁' },
      { greek: 'la factura', transcription: 'ла фактура', translation: 'счёт / инвойс', emoji: '🧾' },
      { greek: 'el proyecto', transcription: 'эль проэ́кто', translation: 'проект', emoji: '📊' },
      { greek: 'la entrevista', transcription: 'ла энтрэви́ста', translation: 'собеседование', emoji: '💬' },
      { greek: 'renunciar', transcription: 'рэнунсья́р', translation: 'увольняться', emoji: '🚪' }
    ]
  },
  {
    id: 'restaurant_menu', emoji: '📜', title: 'Ресторан и меню',
    words: [
      { greek: 'la carta', transcription: 'ла ка́рта', translation: 'меню', emoji: '📜' },
      { greek: 'el menú del día', transcription: 'эль мэну́ дэль ди́а', translation: 'комплексный обед', emoji: '🍽️' },
      { greek: 'el primer plato', transcription: 'эль приме́р пля́то', translation: 'первое блюдо', emoji: '🥣' },
      { greek: 'el segundo plato', transcription: 'эль сэгу́ндо пля́то', translation: 'второе блюдо', emoji: '🍖' },
      { greek: 'la tapa', transcription: 'ла та́па', translation: 'тапас (закуска)', emoji: '🍤' },
      { greek: 'la ración', transcription: 'ла расьо́н', translation: 'порция', emoji: '🍽️' },
      { greek: 'la propina', transcription: 'ла пропи́на', translation: 'чаевые', emoji: '💶' },
      { greek: 'la reserva', transcription: 'ла рэсэ́рва', translation: 'бронь столика', emoji: '📅' },
      { greek: 'el camarero', transcription: 'эль камарэ́ро', translation: 'официант', emoji: '🧑‍🍳' },
      { greek: 'la cuenta', transcription: 'ла куэ́нта', translation: 'счёт', emoji: '🧾' },
      { greek: 'para llevar', transcription: 'па́ра ева́р', translation: 'на вынос', emoji: '🥡' },
      { greek: 'el aperitivo', transcription: 'эль апэрити́во', translation: 'аперитив', emoji: '🍹' },
      { greek: 'vegetariano', transcription: 'вэхэтарья́но', translation: 'вегетарианский', emoji: '🥦' },
      { greek: 'picante', transcription: 'пика́нтэ', translation: 'острый', emoji: '🌶️' },
      { greek: 'el plato del día', transcription: 'эль пля́то дэль ди́а', translation: 'блюдо дня', emoji: '⭐' },
      { greek: 'la terraza', transcription: 'ла тэрра́са', translation: 'терраса', emoji: '🌤️' }
    ]
  },
  {
    id: 'directions', emoji: '🧭', title: 'Направления',
    words: [
      { greek: 'a la derecha', transcription: 'а ла дэрэ́ча', translation: 'направо', emoji: '➡️' },
      { greek: 'a la izquierda', transcription: 'а ла искьэ́рда', translation: 'налево', emoji: '⬅️' },
      { greek: 'todo recto', transcription: 'то́до рэ́кто', translation: 'прямо', emoji: '⬆️' },
      { greek: 'cerca', transcription: 'сэ́рка', translation: 'близко', emoji: '📍' },
      { greek: 'lejos', transcription: 'лэ́хос', translation: 'далеко', emoji: '🗺️' },
      { greek: 'enfrente', transcription: 'энфрэ́нтэ', translation: 'напротив', emoji: '↔️' },
      { greek: 'al lado de', transcription: 'аль ля́до дэ', translation: 'рядом с', emoji: '👉' },
      { greek: 'entre', transcription: 'э́нтрэ', translation: 'между', emoji: '↔️' },
      { greek: 'detrás de', transcription: 'дэтра́с дэ', translation: 'позади', emoji: '⬅️' },
      { greek: 'delante de', transcription: 'дэля́нтэ дэ', translation: 'перед', emoji: '➡️' },
      { greek: 'la dirección', transcription: 'ла дирексьо́н', translation: 'адрес / направление', emoji: '🗺️' },
      { greek: 'el mapa', transcription: 'эль ма́па', translation: 'карта', emoji: '🗺️' },
      { greek: 'perderse', transcription: 'пэрдэ́рсэ', translation: 'заблудиться', emoji: '❓' },
      { greek: 'seguir recto', transcription: 'сэги́р рэ́кто', translation: 'идти прямо', emoji: '⬆️' },
      { greek: 'doblar', transcription: 'добля́р', translation: 'сворачивать', emoji: '↪️' },
      { greek: 'la señal', transcription: 'ла сэнья́ль', translation: 'указатель / знак', emoji: '🪧' }
    ]
  },
  {
    id: 'expressions', emoji: '💬', title: 'Устойчивые выражения',
    words: [
      { greek: 'no pasa nada', transcription: 'но па́са на́да', translation: 'ничего страшного', emoji: '🤷' },
      { greek: 'vale la pena', transcription: 'ва́ле ла пэ́на', translation: 'стоит того', emoji: '👍' },
      { greek: 'dar igual', transcription: 'дар игуа́ль', translation: 'быть всё равно', emoji: '🤷‍♂️' },
      { greek: 'echar de menos', transcription: 'эча́р дэ мэ́нос', translation: 'скучать по кому-то', emoji: '💭' },
      { greek: 'tener ganas de', transcription: 'тэнэ́р га́нас дэ', translation: 'хотеть чего-то', emoji: '😋' },
      { greek: 'tomar el pelo', transcription: 'тома́р эль пэ́ло', translation: 'разыгрывать / дурачить', emoji: '😏' },
      { greek: 'meter la pata', transcription: 'мэтэ́р ла па́та', translation: 'облажаться', emoji: '🙈' },
      { greek: 'estar hasta las narices', transcription: 'эста́р а́ста лас нари́сэс', translation: 'быть сытым по горло', emoji: '😤' },
      { greek: 'ponerse las pilas', transcription: 'понэ́рсэ лас пи́лас', translation: 'взяться за дело', emoji: '🔋' },
      { greek: 'costar un ojo de la cara', transcription: 'коста́р ун о́хо дэ ла ка́ра', translation: 'стоить очень дорого', emoji: '💸' },
      { greek: 'no tener pelos en la lengua', transcription: 'но тэнэ́р пэ́лос эн ла лэ́нгуа', translation: 'говорить прямо, без обиняков', emoji: '🗣️' },
      { greek: 'estar en las nubes', transcription: 'эста́р эн лас ну́бэс', translation: 'витать в облаках', emoji: '☁️' },
      { greek: 'darse prisa', transcription: 'да́рсэ при́са', translation: 'торопиться', emoji: '⏱️' },
      { greek: 'hacer caso', transcription: 'асэ́р ка́со', translation: 'обращать внимание / слушаться', emoji: '👂' },
      { greek: 'llover a cántaros', transcription: 'йёвэ́р а ка́нтарос', translation: 'лить как из ведра', emoji: '🌧️' },
      { greek: 'a lo mejor', transcription: 'а ло мэхо́р', translation: 'возможно', emoji: '🤔' }
    ]
  },
  {
    id: 'proverbs', emoji: '📖', title: 'Пословицы',
    words: [
      { greek: 'A quien madruga, Dios le ayuda.', transcription: 'А кьен мадру́га, Дьос ле аю́да.', translation: 'Кто рано встаёт, тому Бог подаёт.', emoji: '🌅' },
      { greek: 'No hay mal que por bien no venga.', transcription: 'Но ай маль кэ пор бьен но вэ́нга.', translation: 'Нет худа без добра.', emoji: '🍀' },
      { greek: 'Más vale tarde que nunca.', transcription: 'Мас ва́ле та́рдэ кэ ну́нка.', translation: 'Лучше поздно, чем никогда.', emoji: '⏰' },
      { greek: 'En boca cerrada no entran moscas.', transcription: 'Эн бо́ка сэрра́да но э́нтран мо́скас.', translation: 'Слово — серебро, молчание — золото.', emoji: '🤐' },
      { greek: 'Dime con quién andas y te diré quién eres.', transcription: 'Ди́мэ кон кьен а́ндас и тэ дирэ́ кьен э́рэс.', translation: 'Скажи мне, кто твой друг, и я скажу, кто ты.', emoji: '🧑‍🤝‍🧑' },
      { greek: 'Camarón que se duerme, se lo lleva la corriente.', transcription: 'Камаро́н кэ сэ дуэ́рмэ, сэ ло йе́ва ла коррьэ́нтэ.', translation: 'Кто зевает, тот воду хлебает (упусти шанс).', emoji: '🦐' },
      { greek: 'No es oro todo lo que reluce.', transcription: 'Но эс о́ро то́до ло кэ рэлу́сэ.', translation: 'Не всё то золото, что блестит.', emoji: '✨' },
      { greek: 'Del dicho al hecho hay mucho trecho.', transcription: 'Дэль ди́чо аль э́чо ай му́чо трэ́чо.', translation: 'От слова до дела — большая дистанция.', emoji: '📏' },
      { greek: 'Ojos que no ven, corazón que no siente.', transcription: 'О́хос кэ но вэн, корасо́н кэ но сьэ́нтэ.', translation: 'С глаз долой — из сердца вон.', emoji: '👁️' },
      { greek: 'Quien no arriesga, no gana.', transcription: 'Кьен но арьэ́сга, но га́на.', translation: 'Кто не рискует, тот не выигрывает.', emoji: '🎲' },
      { greek: 'A caballo regalado no le mires el diente.', transcription: 'А каба́йо рэгаля́до но ле ми́рэс эль дьэ́нтэ.', translation: 'Дарёному коню в зубы не смотрят.', emoji: '🐴' },
      { greek: 'Cría fama y échate a dormir.', transcription: 'Кри́а фа́ма и э́чатэ а дорми́р.', translation: 'Создай репутацию — и живи на ней.', emoji: '😴' },
      { greek: 'Poco a poco se llega lejos.', transcription: 'По́ко а по́ко сэ йе́га лэ́хос.', translation: 'Тише едешь — дальше будешь.', emoji: '🐢' },
      { greek: 'El que mucho abarca poco aprieta.', transcription: 'Эль кэ му́чо аба́рка по́ко апрьэ́та.', translation: 'За двумя зайцами погонишься — ни одного не поймаешь.', emoji: '🐰' },
      { greek: 'Zapatero, a tus zapatos.', transcription: 'Сапатэ́ро, а тус сапа́тос.', translation: 'Не в своё дело не лезь (сапожник, к своим сапогам).', emoji: '👞' },
      { greek: 'No dejes para mañana lo que puedas hacer hoy.', transcription: 'Но дэ́хэс па́ра манья́на ло кэ пуэ́дас асэ́р ой.', translation: 'Не откладывай на завтра то, что можешь сделать сегодня.', emoji: '📅' }
    ]
  },
  {
    id: 'time', emoji: '⏰', title: 'Время',
    words: [
      { greek: 'hoy', transcription: 'ой', translation: 'сегодня', emoji: '📅' },
      { greek: 'mañana', transcription: 'манья́на', translation: 'завтра', emoji: '🌅' },
      { greek: 'ayer', transcription: 'айэ́р', translation: 'вчера', emoji: '📆' },
      { greek: 'ahora', transcription: 'ао́ра', translation: 'сейчас', emoji: '⏱️' },
      { greek: 'después', transcription: 'дэспуэ́с', translation: 'потом / после', emoji: '⏭️' },
      { greek: 'antes', transcription: 'а́нтэс', translation: 'до / раньше', emoji: '⏮️' },
      { greek: 'la semana', transcription: 'ла сэма́на', translation: 'неделя', emoji: '📅' },
      { greek: 'el mes', transcription: 'эль мэс', translation: 'месяц', emoji: '🗓️' },
      { greek: 'el año', transcription: 'эль а́ньо', translation: 'год', emoji: '📆' },
      { greek: 'la hora', transcription: 'ла о́ра', translation: 'час', emoji: '🕐' },
      { greek: 'el minuto', transcription: 'эль мину́то', translation: 'минута', emoji: '⏲️' },
      { greek: 'temprano', transcription: 'тэмпра́но', translation: 'рано', emoji: '🌄' },
      { greek: 'tarde', transcription: 'та́рдэ', translation: 'поздно', emoji: '🌆' },
      { greek: 'siempre', transcription: 'сьэ́мпрэ', translation: 'всегда', emoji: '♾️' },
      { greek: 'nunca', transcription: 'ну́нка', translation: 'никогда', emoji: '🚫' },
      { greek: 'a veces', transcription: 'а вэ́сэс', translation: 'иногда', emoji: '🔁' }
    ]
  },
  {
    id: 'professions', emoji: '👷', title: 'Профессии',
    words: [
      { greek: 'el médico', transcription: 'эль мэ́дико', translation: 'врач', emoji: '👨‍⚕️' },
      { greek: 'el profesor', transcription: 'эль профэсо́р', translation: 'учитель', emoji: '👨‍🏫' },
      { greek: 'el abogado', transcription: 'эль абога́до', translation: 'юрист', emoji: '⚖️' },
      { greek: 'el ingeniero', transcription: 'эль инхэнье́ро', translation: 'инженер', emoji: '👷' },
      { greek: 'el cocinero', transcription: 'эль коси́нэро', translation: 'повар', emoji: '👨‍🍳' },
      { greek: 'el camarero', transcription: 'эль камарэ́ро', translation: 'официант', emoji: '🧑‍🍳' },
      { greek: 'el policía', transcription: 'эль поли́сйа', translation: 'полицейский', emoji: '👮' },
      { greek: 'el conductor', transcription: 'эль кондукто́р', translation: 'водитель', emoji: '🚗' },
      { greek: 'el peluquero', transcription: 'эль пэлюкэ́ро', translation: 'парикмахер', emoji: '💇' },
      { greek: 'el contable', transcription: 'эль конта́блэ', translation: 'бухгалтер', emoji: '🧮' },
      { greek: 'el programador', transcription: 'эль программадо́р', translation: 'программист', emoji: '💻' },
      { greek: 'el electricista', transcription: 'эль электриси́ста', translation: 'электрик', emoji: '💡' },
      { greek: 'el fontanero', transcription: 'эль фонтанэ́ро', translation: 'сантехник', emoji: '🔧' },
      { greek: 'el autónomo', transcription: 'эль ауто́номо', translation: 'самозанятый', emoji: '💼' },
      { greek: 'el empresario', transcription: 'эль эмпрэса́рьо', translation: 'предприниматель', emoji: '📈' },
      { greek: 'el funcionario', transcription: 'эль функсьона́рьо', translation: 'госслужащий', emoji: '🏛️' }
    ]
  },
  {
    id: 'shopping', emoji: '🛍️', title: 'Шопинг',
    words: [
      { greek: 'la tienda', transcription: 'ла тьэ́нда', translation: 'магазин', emoji: '🏬' },
      { greek: 'el centro comercial', transcription: 'эль сэ́нтро комэрсья́ль', translation: 'торговый центр', emoji: '🏬' },
      { greek: 'las rebajas', transcription: 'лас рэба́хас', translation: 'распродажа', emoji: '🏷️' },
      { greek: 'el descuento', transcription: 'эль дэскуэ́нто', translation: 'скидка', emoji: '💯' },
      { greek: 'el precio', transcription: 'эль прэ́сьо', translation: 'цена', emoji: '💲' },
      { greek: 'probarse', transcription: 'проба́рсэ', translation: 'примерять', emoji: '👗' },
      { greek: 'el probador', transcription: 'эль пробадо́р', translation: 'примерочная', emoji: '🚪' },
      { greek: 'la caja', transcription: 'ла ка́ха', translation: 'касса', emoji: '💰' },
      { greek: 'el recibo', transcription: 'эль рэси́бо', translation: 'чек', emoji: '🧾' },
      { greek: 'la devolución', transcription: 'ла дэволюсьо́н', translation: 'возврат товара', emoji: '↩️' },
      { greek: 'la talla', transcription: 'ла та́йя', translation: 'размер (одежды)', emoji: '📏' },
      { greek: 'la bolsa', transcription: 'ла бо́льса', translation: 'пакет', emoji: '🛍️' },
      { greek: 'el carrito', transcription: 'эль карри́то', translation: 'тележка', emoji: '🛒' },
      { greek: 'la oferta', transcription: 'ла офэ́рта', translation: 'акция', emoji: '🎉' },
      { greek: 'el escaparate', transcription: 'эль эскапара́тэ', translation: 'витрина', emoji: '🪟' },
      { greek: 'el cliente', transcription: 'эль клье́нтэ', translation: 'клиент', emoji: '🧑' }
    ]
  },
  {
    id: 'health', emoji: '🏥', title: 'Здоровье',
    words: [
      { greek: 'el dolor', transcription: 'эль долёр', translation: 'боль', emoji: '😣' },
      { greek: 'la fiebre', transcription: 'ла фьэ́брэ', translation: 'температура', emoji: '🤒' },
      { greek: 'la tos', transcription: 'ла тос', translation: 'кашель', emoji: '😷' },
      { greek: 'el resfriado', transcription: 'эль рэсфрья́до', translation: 'простуда', emoji: '🤧' },
      { greek: 'la receta', transcription: 'ла рэсэ́та', translation: 'рецепт (медицинский)', emoji: '📋' },
      { greek: 'la pastilla', transcription: 'ла пасти́йя', translation: 'таблетка', emoji: '💊' },
      { greek: 'la farmacia', transcription: 'ла фарма́сья', translation: 'аптека', emoji: '💊' },
      { greek: 'el seguro médico', transcription: 'эль сэгу́ро мэ́дико', translation: 'медицинская страховка', emoji: '🩺' },
      { greek: 'la cita', transcription: 'ла си́та', translation: 'запись (к врачу)', emoji: '📅' },
      { greek: 'el hospital', transcription: 'эль оспита́ль', translation: 'больница', emoji: '🏥' },
      { greek: 'la ambulancia', transcription: 'ла амбуля́нсья', translation: 'скорая помощь', emoji: '🚑' },
      { greek: 'la vacuna', transcription: 'ла ваку́на', translation: 'прививка', emoji: '💉' },
      { greek: 'alérgico', transcription: 'алэ́рхико', translation: 'аллергичный', emoji: '🤧' },
      { greek: 'la herida', transcription: 'ла эри́да', translation: 'рана', emoji: '🩹' },
      { greek: 'sano', transcription: 'са́но', translation: 'здоровый', emoji: '💪' },
      { greek: 'enfermo', transcription: 'энфэ́рмо', translation: 'больной', emoji: '🤒' }
    ]
  },
  {
    id: 'documents', emoji: '📄', title: 'Документы и бюрократия',
    words: [
      { greek: 'el NIE', transcription: 'эль ни́е', translation: 'номер иностранца (NIE)', emoji: '🪪' },
      { greek: 'el DNI', transcription: 'эль дэ-э́нэ-и', translation: 'удостоверение личности испанца', emoji: '🪪' },
      { greek: 'el pasaporte', transcription: 'эль паспо́ртэ', translation: 'паспорт', emoji: '📘' },
      { greek: 'el empadronamiento', transcription: 'эль эмпадронамьэ́нто', translation: 'регистрация по адресу', emoji: '🏠' },
      { greek: 'la cita previa', transcription: 'ла си́та прэ́вья', translation: 'предварительная запись', emoji: '📅' },
      { greek: 'el formulario', transcription: 'эль формула́рьо', translation: 'бланк / форма', emoji: '📝' },
      { greek: 'la firma', transcription: 'ла фи́рма', translation: 'подпись', emoji: '✍️' },
      { greek: 'el sello', transcription: 'эль сэ́йо', translation: 'печать', emoji: '🔖' },
      { greek: 'la solicitud', transcription: 'ла солиситу́д', translation: 'заявление', emoji: '📃' },
      { greek: 'el trámite', transcription: 'эль тра́митэ', translation: 'процедура / оформление', emoji: '📋' },
      { greek: 'la tasa', transcription: 'ла та́са', translation: 'государственная пошлина', emoji: '💶' },
      { greek: 'la residencia', transcription: 'ла рэсидэ́нсья', translation: 'вид на жительство', emoji: '🏡' },
      { greek: 'la nacionalidad', transcription: 'ла насьоналида́д', translation: 'гражданство', emoji: '🌍' },
      { greek: 'el certificado', transcription: 'эль сэртифика́до', translation: 'справка / сертификат', emoji: '📜' },
      { greek: 'la extranjería', transcription: 'ла экстранхэри́а', translation: 'миграционная служба', emoji: '🏛️' },
      { greek: 'la gestoría', transcription: 'ла хэстори́а', translation: 'контора по оформлению документов', emoji: '📑' }
    ]
  },
];

const ACHIEVEMENTS = [
  { id: 'first_lesson',    icon: '🎓', title: 'Первый шаг',          desc: 'Пройти первый урок',                    category: 'уроки' },
  { id: 'perfect_lesson',  icon: '💎', title: 'Перфекционист',       desc: 'Урок без единой ошибки',                category: 'уроки' },
  { id: 'lessons_5',       icon: '📚', title: 'Студент',             desc: '5 уроков пройдено',                     category: 'уроки' },
  { id: 'lessons_10',      icon: '🏆', title: 'Упорный',             desc: '10 уроков пройдено',                    category: 'уроки' },
  { id: 'lessons_30',      icon: '🦾', title: 'Марафонец',           desc: '30 уроков пройдено',                    category: 'уроки' },
  { id: 'streak_3',        icon: '🔥', title: 'На разогреве',        desc: '3 дня подряд',                          category: 'стрик' },
  { id: 'streak_7',        icon: '🌟', title: 'Неделя силы',         desc: '7 дней подряд',                         category: 'стрик' },
  { id: 'streak_30',       icon: '👑', title: 'Легенда',             desc: '30 дней подряд',                        category: 'стрик' },
  { id: 'scenario_first',  icon: '🎭', title: 'Актёр',               desc: 'Первый сценарий пройден',               category: 'сценарии' },
  { id: 'scenarios_all',   icon: '🇪🇸', title: 'Готов к Испании',    desc: 'Все 20 сценариев пройдены',             category: 'сценарии' },
  { id: 'nie_master',      icon: '📋', title: 'Мастер бюрократии',   desc: 'Сценарий "Extranjería" пройден',        category: 'сценарии' },
  { id: 'weak_conquered',  icon: '⚔️', title: 'Победил ошибки',      desc: 'Пройден урок повторения слабых мест',   category: 'прогресс' },
  { id: 'xp_500',          icon: '⚡', title: 'Энергичный',          desc: '500 XP набрано',                        category: 'прогресс' },
  { id: 'xp_2000',         icon: '💫', title: 'Опытный',             desc: '2000 XP набрано',                       category: 'прогресс' },
  { id: 'level_5',         icon: '🚀', title: 'Взлёт',               desc: 'Достигнут 5-й уровень',                 category: 'прогресс' },
  { id: 'vocab_master',    icon: '🧠', title: 'Хранитель слов',      desc: 'Выучено 200 слов из словаря',           category: 'прогресс' },
];

const PHRASES = [
  {
    id: 'daily',
    category: 'Каждый день',
    icon: '☀️',
    color: '#58CC02',
    phrases: [
      { greek: 'Vale', transcription: 'Ва́ле', translation: 'Окей / Хорошо / Договорились', note: 'Самое частое испанское слово-ответ. Используется вместо "да, ладно" практически везде.' },
      { greek: 'Venga', transcription: 'Вэ́нга', translation: 'Давай! / Ну ладно / Пошли', note: 'Многозначное слово-паразит испанской речи: призыв к действию, согласие, прощание.' },
      { greek: 'Vale, vale', transcription: 'Ва́ле, ва́ле', translation: 'Хорошо-хорошо / Понял-понял', note: 'Двойное повторение усиливает согласие или показывает, что вы уже поняли собеседника.' },
      { greek: 'No pasa nada', transcription: 'Но па́са на́да', translation: 'Ничего страшного / Всё в порядке', note: 'Кто-то извинился или что-то пошло не так — эта фраза снимает напряжение.' },
      { greek: 'Qué va', transcription: 'Кэ ва', translation: 'Да ладно! / Вовсе нет', note: 'Выражает несогласие или удивление недоверчивым тоном. Очень разговорное.' },
      { greek: 'Por supuesto', transcription: 'Пор супуэ́сто', translation: 'Конечно / Разумеется', note: 'Уверенное подтверждение, более формальное чем "claro".' },
      { greek: 'Claro que sí', transcription: 'Кла́ро кэ си', translation: 'Конечно да!', note: 'Тёплое, дружелюбное согласие. Часто используется среди друзей и соседей.' },
      { greek: 'Buenos días', transcription: 'Буэ́нос ди́ас', translation: 'Доброе утро / Добрый день', note: 'Используется примерно до обеда (до 14:00). Универсальное вежливое приветствие.' },
      { greek: 'Buenas tardes', transcription: 'Буэ́нас та́рдэс', translation: 'Добрый день / Добрый вечер', note: 'С обеда примерно до 20:00. Магазины, офисы — всегда так приветствуют.' },
      { greek: 'Buenas noches', transcription: 'Буэ́нас но́чэс', translation: 'Спокойной ночи / Добрый вечер', note: 'Используется вечером, начиная с наступления темноты, и при прощании на ночь.' },
      { greek: '¿Qué tal?', transcription: 'Кэ таль?', translation: 'Как дела? / Как оно?', note: 'Самый частый неформальный вопрос при встрече, короче чем "¿cómo estás?"' },
      { greek: 'Muy bien, ¿y tú?', transcription: 'Муй бьен, и ту?', translation: 'Очень хорошо, а ты?', note: 'Стандартный позитивный ответ на "¿qué tal?" — испанцы обычно отвечают оптимистично.' },
      { greek: 'Así así', transcription: 'Аси́ аси́', translation: 'Так себе / Ни то ни сё', note: 'Когда дела средне. Буквально "так-так" — честный нейтральный ответ.' },
      { greek: 'No sé', transcription: 'Но сэ', translation: 'Не знаю', note: 'Простая нужная фраза, часто сопровождается пожатием плеч.' },
      { greek: 'No entiendo', transcription: 'Но энтье́ндо', translation: 'Не понимаю', note: 'Скажите это — и большинство испанцев тут же замедлят речь и объяснят проще.' },
      { greek: '¿Puede repetir, por favor?', transcription: 'Пуэ́дэ рэпэти́р, пор фаво́р?', translation: 'Можете повторить, пожалуйста?', note: 'Вежливая просьба повторить фразу — не стесняйтесь использовать её часто.' },
      { greek: '¿Cómo se dice esto en español?', transcription: 'Ко́мо сэ ди́сэ э́сто эн эспаньо́ль?', translation: 'Как это сказать по-испански?', note: 'Золотая фраза для самостоятельного изучения языка — задавайте её каждый день.' },
      { greek: '¿Puede escribirlo?', transcription: 'Пуэ́дэ эскриби́рло?', translation: 'Можете написать это?', note: 'Когда на слух не понимаете — попросите написать. Отлично работает в магазине.' },
      { greek: '¿Tienes tiempo?', transcription: 'Тьэ́нэс тьэ́мпо?', translation: 'У тебя есть время?', note: 'Перед тем как занять человека разговором или просьбой — вежливый вопрос.' },
      { greek: 'Ahora mismo', transcription: 'Ао́ра ми́смо', translation: 'Прямо сейчас / Немедленно', note: 'Обещание сделать что-то сразу. В ресторане официант скажет так, принимая заказ.' },
      { greek: '¿Me haces un favor?', transcription: 'Мэ а́сэс ун фаво́р?', translation: 'Сделаешь мне одолжение?', note: 'Мягкая просьба об услуге, теплее чем просто "помоги мне".' },
      { greek: '¡Vamos!', transcription: 'Ва́мос!', translation: 'Пошли! / Идём!', note: 'Призыв к действию или движению. «¿Vamos a tomar un café?» = "Пошли выпьем кофе?"' },
      { greek: 'Espera un momento', transcription: 'Эспэ́ра ун момэ́нто', translation: 'Подожди минутку', note: 'Когда нужно, чтобы человек подождал совсем немного.' },
      { greek: '¡Mira!', transcription: 'Ми́ра!', translation: 'Смотри! / Погляди!', note: 'Привлечение внимания к чему-то. Также используется как вводное слово "слушай".' },
      { greek: 'Lo siento mucho', transcription: 'Ло сьэ́нто му́чо', translation: 'Мне очень жаль', note: 'Искреннее извинение или соболезнование, серьёзнее чем «perdón».' },
      { greek: 'Perdón', transcription: 'Пэрдо́н', translation: 'Извините / Простите', note: 'Универсальное извинение, а также способ привлечь внимание незнакомца.' },
      { greek: 'Con permiso', transcription: 'Кон пэрми́со', translation: 'С вашего позволения / Разрешите пройти', note: 'Говорят, когда проходят мимо кого-то в толпе или выходят из-за стола.' },
      { greek: 'Tranquilo/a', transcription: 'Транки́ло/а', translation: 'Спокойно / Не переживай', note: 'Совет расслабиться. Испанская культура ценит умение не нервничать по мелочам.' }
    ]
  },
  {
    id: 'emergency',
    category: 'Выживание и экстренные ситуации',
    icon: '🆘',
    color: '#FF4B4B',
    phrases: [
      { greek: '¡Ayuda!', transcription: 'Аю́да!', translation: 'Помогите!', note: 'Главное слово в экстренной ситуации. Кричите громко, если нужна немедленная помощь.' },
      { greek: 'Llame a la policía', transcription: 'Я́мэ а ла поли́сйа', translation: 'Позвоните в полицию', note: 'Официальная просьба о вызове полиции. Номер экстренных служб в Испании — 112.' },
      { greek: 'Necesito una ambulancia', transcription: 'Нэсэси́то у́на амбуля́нсья', translation: 'Мне нужна скорая помощь', note: 'Прямая просьба о медицинской помощи при звонке 112 или на месте происшествия.' },
      { greek: 'Es una emergencia', transcription: 'Эс у́на эмэрхэ́нсья', translation: 'Это срочный случай', note: 'Подчеркните серьёзность ситуации этой фразой в начале разговора.' },
      { greek: 'Me he perdido', transcription: 'Мэ э пэрди́до', translation: 'Я заблудился(-ась)', note: 'Полезно сказать прохожему или в полиции, если вы потеряли дорогу.' },
      { greek: 'Me han robado', transcription: 'Мэ ан робáдо', translation: 'У меня украли (что-то)', note: 'Стандартная фраза для заявления о краже. Добавьте предмет: «me han robado el móvil».' },
      { greek: 'He perdido mi pasaporte', transcription: 'Э пэрди́до ми паспо́ртэ', translation: 'Я потерял(а) паспорт', note: 'Важно сообщить об этом в консульство и полицию как можно скорее.' },
      { greek: 'No me encuentro bien', transcription: 'Но мэ энкуэ́нтро бьен', translation: 'Мне нехорошо', note: 'Мягкий способ сказать о плохом самочувствии, не уточняя деталей.' },
      { greek: 'Me duele mucho', transcription: 'Мэ дуэ́лэ му́чо', translation: 'У меня сильно болит', note: 'Универсальная фраза о сильной боли, можно уточнить часть тела: «me duele la cabeza».' },
      { greek: 'Soy alérgico/a a...', transcription: 'Сой алэ́рхико/а а...', translation: 'У меня аллергия на...', note: 'Критически важная фраза для врачей, официантов и фармацевтов.' },
      { greek: '¿Dónde está el hospital más cercano?', transcription: 'До́ндэ эста́ эль оспита́ль мас сэрка́но?', translation: 'Где ближайшая больница?', note: 'Важный вопрос в незнакомом городе при экстренной ситуации.' },
      { greek: 'Necesito un médico urgentemente', transcription: 'Нэсэси́то ун мэ́дико урхэнтэмэ́нтэ', translation: 'Мне срочно нужен врач', note: 'Подчеркивает срочность обращения за медицинской помощью.' },
      { greek: 'Hay un incendio', transcription: 'Ай ун инсэ́ндьо', translation: 'Пожар!', note: 'Сообщение о пожаре — используйте немедленно и звоните 112.' },
      { greek: 'Cuidado', transcription: 'Куида́до', translation: 'Осторожно!', note: 'Предупреждение об опасности — универсальное слово в любых ситуациях.' },
      { greek: 'Llame a un abogado', transcription: 'Я́мэ а ун абога́до', translation: 'Позвоните адвокату', note: 'В сложной юридической ситуации имеете право потребовать присутствия адвоката.' },
      { greek: 'No hablo bien español', transcription: 'Но а́бло бьен эспаньо́ль', translation: 'Я плохо говорю по-испански', note: 'Объясняет ситуацию с языковым барьером, полезно в стрессовых обстоятельствах.' },
      { greek: '¿Alguien habla inglés o ruso?', transcription: 'А́льгьен а́бла ингле́с о ру́со?', translation: 'Кто-нибудь говорит по-английски или по-русски?', note: 'Может помочь найти переводчика в сложной ситуации.' },
      { greek: 'Necesito llamar a mi embajada', transcription: 'Нэсэси́то ямар а ми эмбаха́да', translation: 'Мне нужно позвонить в посольство', note: 'В серьёзных ситуациях (потеря документов, арест) важно связаться с консульством.' },
      { greek: 'Estoy perdido/a', transcription: 'Эсто́й пэрди́до/а', translation: 'Я потерялся(-лась)', note: 'То же, что «me he perdido», но описывает текущее состояние.' },
      { greek: '¿Puede ayudarme?', transcription: 'Пуэ́дэ аюда́рмэ?', translation: 'Можете мне помочь?', note: 'Вежливая универсальная просьба о помощи в любой ситуации.' },
      { greek: 'No tengo dinero', transcription: 'Но тэ́нго дине́ро', translation: 'У меня нет денег', note: 'Полезно объяснить финансовую ситуацию в случае кражи или потери кошелька.' },
      { greek: 'Se me ha averiado el coche', transcription: 'Сэ мэ а авэрья́до эль ко́чэ', translation: 'У меня сломалась машина', note: 'Пригодится для звонка в страховую компанию или на эвакуатор.' }
    ]
  },
  {
    id: 'conversation',
    category: 'Разговор и знакомство',
    icon: '🤝',
    color: '#1CB0F6',
    phrases: [
      { greek: '¿Cómo te llamas?', transcription: 'Ко́мо тэ я́мас?', translation: 'Как тебя зовут?', note: 'Базовый вопрос при знакомстве, неформальная форма (для «tú»).' },
      { greek: 'Me llamo...', transcription: 'Мэ я́мо...', translation: 'Меня зовут...', note: 'Стандартный ответ на вопрос об имени, используйте возвратный глагол «llamarse».' },
      { greek: 'Encantado/a de conocerte', transcription: 'Энканта́до/а дэ коносэ́ртэ', translation: 'Приятно познакомиться', note: 'Вежливая фраза после знакомства, форма зависит от пола говорящего.' },
      { greek: '¿De dónde eres?', transcription: 'Дэ до́ндэ э́рэс?', translation: 'Откуда ты?', note: 'Частый вопрос при знакомстве в Испании — испанцы любят узнавать про происхождение.' },
      { greek: 'Soy de Rusia', transcription: 'Сой дэ Ру́сья', translation: 'Я из России', note: 'Прямой ответ на вопрос о происхождении, используйте «ser de + страна».' },
      { greek: '¿A qué te dedicas?', transcription: 'А кэ тэ дэди́кас?', translation: 'Чем ты занимаешься? (работа)', note: 'Вежливый вопрос о профессии, более мягкий чем прямое «¿trabajas?»' },
      { greek: '¿Cuánto tiempo llevas aquí?', transcription: 'Куа́нто тьэ́мпо йе́вас аки́?', translation: 'Сколько времени ты уже здесь?', note: 'Частый вопрос эмигрантам — конструкция «llevar + время» описывает длительность.' },
      { greek: 'Llevo un año viviendo aquí', transcription: 'Йе́во ун а́ньо вивьэ́ндо аки́', translation: 'Я живу здесь уже год', note: 'Ответ с использованием той же конструкции «llevar + герундий».' },
      { greek: '¿Tienes hijos?', transcription: 'Тьэ́нэс и́хос?', translation: 'У тебя есть дети?', note: 'Обычный вопрос в личной беседе, особенно среди соседей и коллег.' },
      { greek: '¿Estás casado/a?', transcription: 'Эста́с каса́до/а?', translation: 'Ты женат/замужем?', note: 'Личный вопрос, но в Испании часто задаётся уже при первом знакомстве.' },
      { greek: 'Mucho gusto', transcription: 'Му́чо гу́сто', translation: 'Очень приятно', note: 'Ещё один способ выразить радость от знакомства, короче «encantado».' },
      { greek: '¿Nos tuteamos?', transcription: 'Нос тутэа́мос?', translation: 'Будем на "ты"?', note: 'Вопрос о переходе с формального «usted» на неформальное «tú» — в Испании это происходит быстро.' },
      { greek: 'Igualmente', transcription: 'Игуальмэ́нтэ', translation: 'Взаимно', note: 'Ответ на приятные пожелания или комплименты, означает "то же самое тебе".' },
      { greek: '¿Qué te trae por aquí?', transcription: 'Кэ тэ тра́э пор аки́?', translation: 'Что привело тебя сюда?', note: 'Дружелюбный вопрос о причине переезда или визита.' },
      { greek: 'Vine para trabajar', transcription: 'Ви́нэ па́ра трабаха́р', translation: 'Я приехал(а) работать', note: 'Простой ответ о причине переезда, использует претерито от «venir».' },
      { greek: '¿Qué planes tienes?', transcription: 'Кэ пля́нэс тьэ́нэс?', translation: 'Какие у тебя планы?', note: 'Вопрос о будущих намерениях — в разговоре о жизни или на свидании.' },
      { greek: 'Hablamos luego', transcription: 'Абля́мос луэ́го', translation: 'Поговорим позже', note: 'Тёплое прощание, показывающее желание продолжить общение.' },
      { greek: '¿Nos vemos otro día?', transcription: 'Нос вэ́мос о́тро ди́а?', translation: 'Увидимся в другой день?', note: 'Вежливое предложение продолжить знакомство в будущем.' },
      { greek: 'Te paso mi número', transcription: 'Тэ па́со ми ну́мэро', translation: 'Дам тебе свой номер', note: 'Естественный способ обменяться контактами после приятного разговора.' },
      { greek: 'Un placer hablar contigo', transcription: 'Ун пляcэ́р абля́р конти́го', translation: 'Приятно было с тобой поговорить', note: 'Тёплое завершение разговора — показывает искреннюю симпатию.' }
    ]
  },
  {
    id: 'restaurant',
    category: 'Ресторан и кафе',
    icon: '🍽️',
    color: '#FF9600',
    phrases: [
      { greek: 'Una mesa para dos, por favor', transcription: 'У́на мэ́са па́ра дос, пор фаво́р', translation: 'Столик на двоих, пожалуйста', note: 'Первая фраза при входе в ресторан без брони.' },
      { greek: '¿Tienen mesa libre?', transcription: 'Тьэ́нэн мэ́са ли́брэ?', translation: 'У вас есть свободный столик?', note: 'Вопрос при входе, если не уверены, есть ли места.' },
      { greek: 'La carta, por favor', transcription: 'Ла ка́рта, пор фаво́р', translation: 'Меню, пожалуйста', note: '«Carta» — меню в ресторане, не путать с «menú del día» (комплексный обед).' },
      { greek: '¿Qué me recomienda?', transcription: 'Кэ мэ рэкомьэ́нда?', translation: 'Что вы порекомендуете?', note: 'Отличный способ довериться официанту при выборе блюда.' },
      { greek: 'Para mí, la paella', transcription: 'Па́ра ми, ла паэ́йя', translation: 'Мне паэлью', note: 'Простой способ сделать заказ, указывая на себя.' },
      { greek: '¿Qué lleva este plato?', transcription: 'Кэ йе́ва э́стэ пля́то?', translation: 'Что входит в это блюдо?', note: 'Полезно уточнить состав, особенно при аллергиях или предпочтениях.' },
      { greek: 'Soy vegetariano/a', transcription: 'Сой вэхэтарья́но/а', translation: 'Я вегетарианец/вегетарианка', note: 'Важно сообщить заранее — не все блюда в Испании подходят вегетарианцам.' },
      { greek: 'Sin gluten, por favor', transcription: 'Син глютэ́н, пор фаво́р', translation: 'Без глютена, пожалуйста', note: 'Многие рестораны в Испании предлагают безглютеновые опции по запросу.' },
      { greek: '¿Me trae la carta de vinos?', transcription: 'Мэ тра́э ла ка́рта дэ ви́нос?', translation: 'Принесёте карту вин?', note: 'Отдельное меню вин — обычная практика в испанских ресторанах.' },
      { greek: 'Está muy rico', transcription: 'Эста́ муй ри́ко', translation: 'Это очень вкусно', note: 'Комплимент блюду. «Rico» здесь означает "вкусный", а не "богатый".' },
      { greek: 'La cuenta, por favor', transcription: 'Ла куэ́нта, пор фаво́р', translation: 'Счёт, пожалуйста', note: 'Ключевая фраза для завершения похода в ресторан.' },
      { greek: '¿Está incluida la propina?', transcription: 'Эста́ инклуи́да ла пропи́на?', translation: 'Чаевые включены?', note: 'В Испании чаевые не обязательны, но можно оставить сдачу или 5-10%.' },
      { greek: '¿Puedo pagar con tarjeta?', transcription: 'Пуэ́до пага́р кон тархэ́та?', translation: 'Могу заплатить картой?', note: 'Большинство ресторанов принимают карты, но лучше уточнить заранее.' },
      { greek: 'Vamos a pagar por separado', transcription: 'Ва́мос а пага́р пор сэпара́до', translation: 'Мы будем платить раздельно', note: 'Полезная фраза, когда группа хочет разделить счёт.' },
      { greek: '¿Tienen menú del día?', transcription: 'Тьэ́нэн мэну́ дэль ди́а?', translation: 'У вас есть комплексный обед?', note: '«Menú del día» — выгодный набор из нескольких блюд, обычно в будни на обед.' },
      { greek: 'Para llevar, por favor', transcription: 'Па́ра ева́р, пор фаво́р', translation: 'На вынос, пожалуйста', note: 'Полезно в кафе и фастфуде, когда не хотите есть на месте.' },
      { greek: 'Sin hielo, por favor', transcription: 'Син йэ́ло, пор фаво́р', translation: 'Без льда, пожалуйста', note: 'Уточнение к напитку — многим не нравится слишком холодный напиток.' },
      { greek: '¿Puedo reservar una mesa?', transcription: 'Пуэ́до рэсэрва́р у́на мэ́са?', translation: 'Могу забронировать столик?', note: 'Полезно для популярных ресторанов, особенно вечером в выходные.' }
    ]
  },
  {
    id: 'transport',
    category: 'Транспорт',
    icon: '🚇',
    color: '#2B70C9',
    phrases: [
      { greek: '¿Dónde está la parada de autobús?', transcription: 'До́ндэ эста́ ла пара́да дэ аутобу́с?', translation: 'Где автобусная остановка?', note: 'Базовый вопрос при ориентации в незнакомом городе.' },
      { greek: 'Un billete sencillo, por favor', transcription: 'Ун бийе́тэ сэнси́йо, пор фаво́р', translation: 'Билет в одну сторону, пожалуйста', note: '«Sencillo» — в одну сторону, «de ida y vuelta» — туда-обратно.' },
      { greek: '¿A qué hora sale el próximo tren?', transcription: 'А кэ о́ра са́ле эль про́ксимо трэн?', translation: 'Во сколько отправляется следующий поезд?', note: 'Полезный вопрос на вокзале при планировании поездки.' },
      { greek: '¿Este autobús va al centro?', transcription: 'Э́стэ аутобу́с ва аль сэ́нтро?', translation: 'Этот автобус едет в центр?', note: 'Уточнение маршрута перед посадкой в общественный транспорт.' },
      { greek: '¿Cuánto cuesta el billete?', transcription: 'Куа́нто куэ́ста эль бийе́тэ?', translation: 'Сколько стоит билет?', note: 'Базовый вопрос о цене проезда.' },
      { greek: 'Voy a la estación de tren', transcription: 'Вой а ла эстасьо́н дэ трэн', translation: 'Я еду на железнодорожный вокзал', note: 'Используется при заказе такси или объяснении маршрута.' },
      { greek: '¿Necesito hacer transbordo?', transcription: 'Нэсэси́то асэ́р трансбо́рдо?', translation: 'Мне нужна пересадка?', note: 'Важный вопрос при планировании маршрута в метро или на автобусе.' },
      { greek: 'Pare aquí, por favor', transcription: 'Па́рэ аки́, пор фаво́р', translation: 'Остановите здесь, пожалуйста', note: 'Полезная фраза для водителя такси или автобуса.' },
      { greek: '¿Cuánto tarda el viaje?', transcription: 'Куа́нто та́рда эль вья́хэ?', translation: 'Сколько длится поездка?', note: '«Tardar» — занимать время, часто используется с транспортом.' },
      { greek: 'He perdido el autobús', transcription: 'Э пэрди́до эль аутобу́с', translation: 'Я опоздал на автобус', note: 'Используется для объяснения задержки или необходимости ждать следующий рейс.' },
      { greek: '¿Dónde puedo comprar el billete?', transcription: 'До́ндэ пуэ́до компра́р эль бийе́тэ?', translation: 'Где можно купить билет?', note: 'Полезный вопрос при отсутствии видимого автомата или кассы.' },
      { greek: 'El vuelo está retrasado', transcription: 'Эль вуэ́ло эста́ рэтраса́до', translation: 'Рейс задерживается', note: 'Полезная фраза в аэропорту для объяснения ситуации с рейсом.' },
      { greek: '¿Dónde recojo el equipaje?', transcription: 'До́ндэ рэко́хо эль экипа́хэ?', translation: 'Где забрать багаж?', note: 'Вопрос в аэропорту после прилёта.' },
      { greek: 'Voy con retraso', transcription: 'Вой кон рэтра́со', translation: 'Я опаздываю', note: 'Полезная фраза, если нужно предупредить о задержке.' }
    ]
  },
  {
    id: 'documents',
    category: 'Документы и NIE / Extranjería',
    icon: '📋',
    color: '#9B59B6',
    phrases: [
      { greek: 'Quiero tramitar mi NIE', transcription: 'Кье́ро трамита́р ми ни́е', translation: 'Хочу оформить свой NIE', note: 'NIE — идентификационный номер иностранца, необходим для работы, аренды и банка.' },
      { greek: '¿Necesito cita previa?', transcription: 'Нэсэси́то си́та прэ́вья?', translation: 'Мне нужна предварительная запись?', note: 'В большинстве госучреждений Испании обязательна онлайн-запись заранее.' },
      { greek: '¿Dónde saco la cita previa?', transcription: 'До́ндэ са́ко ла си́та прэ́вья?', translation: 'Где мне взять предварительную запись?', note: 'Обычно записи делаются онлайн на официальном сайте учреждения.' },
      { greek: 'Necesito el empadronamiento', transcription: 'Нэсэси́то эль эмпадронамьэ́нто', translation: 'Мне нужна регистрация по месту жительства', note: 'Empadronamiento — базовый документ, открывающий доступ ко многим услугам в Испании.' },
      { greek: '¿Qué documentos necesito?', transcription: 'Кэ докумэ́нтос нэсэси́то?', translation: 'Какие документы мне нужны?', note: 'Универсальный вопрос перед любой бюрократической процедурой.' },
      { greek: 'Falta un documento', transcription: 'Фа́льта ун докумэ́нто', translation: 'Не хватает документа', note: 'Полезно понимать, если сотрудник указывает на недостающую бумагу.' },
      { greek: '¿Cuánto tiempo tarda el trámite?', transcription: 'Куа́нто тьэ́мпо та́рда эль тра́митэ?', translation: 'Сколько времени займёт оформление?', note: 'Важный вопрос для планирования — бюрократия в Испании может быть небыстрой.' },
      { greek: 'Quiero solicitar la residencia', transcription: 'Кье́ро солисита́р ла рэсидэ́нсья', translation: 'Хочу подать заявление на вид на жительство', note: 'Основная фраза для начала процесса легализации в стране.' },
      { greek: '¿Dónde pago la tasa?', transcription: 'До́ндэ па́го ла та́са?', translation: 'Где мне оплатить пошлину?', note: 'Госпошлины (tasas) часто оплачиваются в банке по специальной форме модело.' },
      { greek: 'Necesito una copia compulsada', transcription: 'Нэсэси́то у́на ко́пья компульса́да', translation: 'Мне нужна заверенная копия', note: 'Официально заверенная копия документа часто требуется для процедур.' },
      { greek: '¿Este documento está caducado?', transcription: 'Э́стэ докумэ́нто эста́ кадука́до?', translation: 'Этот документ просрочен?', note: 'Важно проверять срок действия документов перед подачей.' },
      { greek: 'Quiero renovar mi tarjeta de residencia', transcription: 'Кье́ро рэнова́р ми тархэ́та дэ рэсидэ́нсья', translation: 'Хочу продлить свою карту резидента', note: 'Стандартная фраза при обновлении вида на жительство.' },
      { greek: '¿Puedo hacer el trámite online?', transcription: 'Пуэ́до асэ́р эль тра́митэ онла́йн?', translation: 'Могу я оформить это онлайн?', note: 'Многие процедуры в Испании доступны через электронное правительство (sede electrónica).' },
      { greek: 'Necesito traducción jurada', transcription: 'Нэсэси́то традуксьо́н хура́да', translation: 'Мне нужен присяжный перевод', note: 'Официальные документы часто требуют перевода, заверенного присяжным переводчиком.' },
      { greek: 'El plazo de entrega es de tres meses', transcription: 'Эль пля́со дэ энтрэ́га эс дэ трэс мэ́сэс', translation: 'Срок выдачи — три месяца', note: 'Понимание сроков помогает планировать переезд и другие важные даты.' }
    ]
  },
  {
    id: 'health',
    category: 'Здоровье и аптека',
    icon: '💊',
    color: '#FF4B8A',
    phrases: [
      { greek: 'Me duele la cabeza', transcription: 'Мэ дуэ́лэ ла кабэ́са', translation: 'У меня болит голова', note: 'Конструкция «me duele + часть тела» — основная для жалоб на боль.' },
      { greek: 'Tengo fiebre', transcription: 'Тэ́нго фьэ́брэ', translation: 'У меня температура', note: 'Простая фраза для описания симптома врачу или фармацевту.' },
      { greek: 'Necesito una cita con el médico', transcription: 'Нэсэси́то у́на си́та кон эль мэ́дико', translation: 'Мне нужна запись к врачу', note: 'В Испании обычно нужна предварительная запись даже к семейному врачу.' },
      { greek: '¿Qué me recomienda para el dolor?', transcription: 'Кэ мэ рэкомьэ́нда па́ра эль долёр?', translation: 'Что вы посоветуете от боли?', note: 'Хороший способ попросить совета у фармацевта без рецепта.' },
      { greek: 'Soy alérgico/a a la penicilina', transcription: 'Сой алэ́рхико/а а ла пэниси́лина', translation: 'У меня аллергия на пенициллин', note: 'Критически важная информация для любого врача или фармацевта.' },
      { greek: '¿Cuántas veces al día lo tomo?', transcription: 'Куа́нтас вэ́сэс аль ди́а ло то́мо?', translation: 'Сколько раз в день это принимать?', note: 'Уточнение дозировки лекарства при покупке в аптеке.' },
      { greek: '¿Necesito receta para esto?', transcription: 'Нэсэси́то рэсэ́та па́ра э́сто?', translation: 'Мне нужен рецепт на это?', note: 'Некоторые лекарства в Испании продаются только по рецепту врача.' },
      { greek: 'Tengo el seguro médico privado', transcription: 'Тэ́нго эль сэгу́ро мэ́дико прива́до', translation: 'У меня частная медицинская страховка', note: 'Полезная фраза при первом визите в частную клинику.' },
      { greek: '¿Aceptan la tarjeta sanitaria?', transcription: 'Асэ́птан ла тархэ́та санита́рья', translation: 'Вы принимаете медицинскую карту?', note: 'Уточнение перед визитом в поликлинику по государственному страхованию.' },
      { greek: 'Estoy embarazada', transcription: 'Эсто́й эмбараса́да', translation: 'Я беременна', note: 'Важная информация для врача, фармацевта или в экстренной ситуации.' },
      { greek: 'Tengo náuseas', transcription: 'Тэ́нго на́усэас', translation: 'Меня тошнит', note: 'Ещё один частый симптом, полезный для описания состояния.' },
      { greek: 'Me he hecho daño', transcription: 'Мэ э э́чо да́ньо', translation: 'Я поранился(-лась)', note: 'Общая фраза о травме, можно уточнить: «me he hecho daño en la pierna».' },
      { greek: 'Necesito un análisis de sangre', transcription: 'Нэсэси́то ун ана́лисис дэ са́нгрэ', translation: 'Мне нужен анализ крови', note: 'Полезная фраза для лаборатории или направления от врача.' },
      { greek: '¿Dónde está la farmacia de guardia?', transcription: 'До́ндэ эста́ ла фарма́сья дэ гуа́рдья', translation: 'Где дежурная аптека?', note: 'Дежурные аптеки работают круглосуточно по очереди — полезно знать ночью.' },
      { greek: 'Estoy tomando otros medicamentos', transcription: 'Эсто́й тома́ндо о́трос мэдикамэ́нтос', translation: 'Я принимаю другие лекарства', note: 'Важно сообщить об этом врачу или фармацевту, чтобы избежать несовместимости.' },
      { greek: '¿Cuál es el horario de la farmacia?', transcription: 'Куа́ль эс эль ора́рьо дэ ла фарма́сья?', translation: 'Какой график работы аптеки?', note: 'Полезный вопрос — многие аптеки в Испании закрываются на сиесту.' },
      { greek: 'Necesito vendas y desinfectante', transcription: 'Нэсэси́то вэ́ндас и дэсинфэкта́нтэ', translation: 'Мне нужны бинты и антисептик', note: 'Стандартный запрос для лечения небольших ран в аптеке.' }
    ]
  },
  {
    id: 'work',
    category: 'Работа и бизнес',
    icon: '💼',
    color: '#1E88E5',
    phrases: [
      { greek: 'Busco trabajo en este sector', transcription: 'Бу́ско трабáхо эн э́стэ сэ́ктор', translation: 'Ищу работу в этой сфере', note: 'Полезная фраза при поиске вакансий или на собеседовании.' },
      { greek: 'Tengo experiencia en...', transcription: 'Тэ́нго экспэрьэ́нсья эн...', translation: 'У меня есть опыт в...', note: 'Ключевая фраза для резюме и собеседований.' },
      { greek: '¿Cuál es el horario de trabajo?', transcription: 'Куа́ль эс эль ора́рьо дэ трабáхо?', translation: 'Какой рабочий график?', note: 'Важный вопрос при обсуждении условий работы.' },
      { greek: '¿Cuál es el sueldo?', transcription: 'Куа́ль эс эль суэ́льдо?', translation: 'Какая зарплата?', note: 'Прямой вопрос об оплате труда — в Испании это нормально спрашивать открыто.' },
      { greek: 'Quiero darme de alta como autónomo', transcription: 'Кье́ро да́рмэ дэ а́льта ко́мо ауто́номо', translation: 'Хочу зарегистрироваться как самозанятый', note: 'Ключевая фраза для фрилансеров и предпринимателей в Испании.' },
      { greek: 'Necesito un contrato de trabajo', transcription: 'Нэсэси́то ун контра́то дэ трабáхо', translation: 'Мне нужен трудовой договор', note: 'Официальный контракт необходим для многих процедур — виза, аренда, кредит.' },
      { greek: '¿Cuándo puedo empezar?', transcription: 'Куа́ндо пуэ́до эмпэса́р?', translation: 'Когда я могу начать?', note: 'Уточнение даты начала работы после успешного собеседования.' },
      { greek: 'Tengo una reunión a las diez', transcription: 'Тэ́нго у́на рэуньо́н а лас дьес', translation: 'У меня встреча в десять', note: 'Стандартная фраза для планирования рабочего дня.' },
      { greek: 'Voy a enviar el informe por correo', transcription: 'Вой а энвья́р эль информэ́ пор коррэ́о', translation: 'Отправлю отчёт по почте', note: 'Полезная фраза для делового общения с коллегами.' },
      { greek: '¿Puede firmar aquí, por favor?', transcription: 'Пуэ́дэ фирма́р аки́, пор фаво́р?', translation: 'Можете подписать здесь, пожалуйста?', note: 'Стандартная просьба при оформлении документов.' },
      { greek: 'Necesito hablar con mi jefe', transcription: 'Нэсэси́то абля́р кон ми хэ́фэ', translation: 'Мне нужно поговорить с начальником', note: 'Прямая фраза для организации рабочей встречи.' },
      { greek: 'Estoy trabajando en un proyecto nuevo', transcription: 'Эсто́й трабаха́ндо эн ун проэ́кто нуэ́во', translation: 'Я работаю над новым проектом', note: 'Полезно для описания текущей деятельности на собеседовании.' },
      { greek: 'Quiero pedir un aumento de sueldo', transcription: 'Кье́ро пэди́р ун ауме́нто дэ суэ́льдо', translation: 'Хочу попросить повышение зарплаты', note: 'Важная фраза для переговоров с работодателем.' },
      { greek: '¿Cuáles son mis vacaciones?', transcription: 'Куа́лес сон мис вакасьо́нэс?', translation: 'Сколько у меня дней отпуска?', note: 'Полезный вопрос при подписании контракта.' },
      { greek: 'Envío mi currículum adjunto', transcription: 'Энви́о ми куррику́люм адху́нто', translation: 'Отправляю резюме во вложении', note: 'Стандартная фраза для делового письма при отклике на вакансию.' },
      { greek: 'Quiero renunciar a mi puesto', transcription: 'Кье́ро рэнунсья́р а ми пуэ́сто', translation: 'Хочу уволиться со своей должности', note: '«Renunciar» — уходить с работы по собственному желанию.' },
      { greek: 'Necesito facturar este servicio', transcription: 'Нэсэси́то фактура́р э́стэ сэрви́сьо', translation: 'Мне нужно выставить счёт за эту услугу', note: 'Полезно для автономо (самозанятых) при работе с клиентами.' },
      { greek: 'Trabajo desde casa', transcription: 'Трабáхо дэ́сдэ ка́са', translation: 'Я работаю из дома', note: 'Всё более частая фраза среди эмигрантов на удалёнке в Испании.' },
      { greek: '¿Tenéis oficinas en otra ciudad?', transcription: 'Тэнэ́ис офиси́нас эн о́тра сьюда́д?', translation: 'У вас есть офисы в другом городе?', note: 'Вопрос о структуре компании при рассмотрении вакансии.' },
      { greek: 'Estoy disponible a partir del lunes', transcription: 'Эсто́й диспони́блэ а парти́р дэль лу́нэс', translation: 'Я доступен(-на) начиная с понедельника', note: 'Полезная фраза для согласования начала работы или встречи.' }
    ]
  },
  {
    id: 'shopping',
    category: 'Шопинг',
    icon: '🛍️',
    color: '#E67E22',
    phrases: [
      { greek: 'Solo estoy mirando, gracias', transcription: 'Со́ло эсто́й мира́ндо, гра́сьяс', translation: 'Я просто смотрю, спасибо', note: 'Вежливый ответ продавцу, если пока не нужна помощь.' },
      { greek: '¿Cuánto cuesta esto?', transcription: 'Куа́нто куэ́ста э́сто?', translation: 'Сколько это стоит?', note: 'Базовый вопрос о цене товара.' },
      { greek: '¿Tiene esto en otra talla?', transcription: 'Тьэ́нэ э́сто эн о́тра та́йя?', translation: 'Есть это в другом размере?', note: 'Уточнение при покупке одежды или обуви.' },
      { greek: '¿Puedo probármelo?', transcription: 'Пуэ́до проба́рмэло?', translation: 'Могу я это примерить?', note: 'Стандартный вопрос перед примеркой одежды.' },
      { greek: '¿Dónde está el probador?', transcription: 'До́ндэ эста́ эль пробадо́р?', translation: 'Где примерочная?', note: 'Полезно спросить сразу при выборе нескольких вещей на примерку.' },
      { greek: 'Me lo llevo', transcription: 'Мэ ло йе́во', translation: 'Я это беру', note: 'Простая фраза для завершения выбора и перехода к оплате.' },
      { greek: '¿Tienen descuento?', transcription: 'Тьэ́нэн дэскуэ́нто?', translation: 'У вас есть скидка?', note: 'Полезный вопрос, особенно во время сезонных распродаж.' },
      { greek: '¿Puedo pagar con tarjeta?', transcription: 'Пуэ́до пага́р кон тархэ́та?', translation: 'Могу заплатить картой?', note: 'Практически везде в Испании принимают карты, но лучше уточнить.' },
      { greek: 'Quiero devolver esto', transcription: 'Кье́ро дэволвэ́р э́сто', translation: 'Хочу вернуть это', note: 'Полезная фраза для возврата товара — сохраняйте чек!' },
      { greek: '¿Tiene el recibo?', transcription: 'Тьэ́нэ эль рэси́бо?', translation: 'У вас есть чек?', note: 'Обычно продавец спрашивает это при возврате товара.' },
      { greek: 'Busco algo más barato', transcription: 'Бу́ско а́льго мас бара́то', translation: 'Ищу что-то подешевле', note: 'Полезно, если предложенный товар слишком дорог.' },
      { greek: '¿Hasta qué hora abren?', transcription: 'А́ста кэ о́ра а́брэн?', translation: 'До скольки вы открыты?', note: 'Многие магазины в Испании закрываются на сиесту днём.' },
      { greek: '¿Tienen esto en otro color?', transcription: 'Тьэ́нэн э́сто эн о́тро колёр?', translation: 'Есть это в другом цвете?', note: 'Полезный вопрос при выборе одежды или аксессуаров.' },
      { greek: 'Estoy buscando un regalo', transcription: 'Эсто́й буска́ндо ун рэга́ло', translation: 'Я ищу подарок', note: 'Полезная фраза, продавец может предложить помощь с выбором.' },
      { greek: '¿Hacen envoltorio para regalo?', transcription: 'А́сэн энволто́рьо па́ра рэга́ло?', translation: 'Вы делаете подарочную упаковку?', note: 'Многие магазины предлагают бесплатную упаковку подарков.' },
      { greek: 'Está agotado', transcription: 'Эста́ агота́до', translation: 'Это закончилось / нет в наличии', note: 'Часто услышите этот ответ, если товара нет на складе.' },
      { greek: '¿Cuándo llega nuevo stock?', transcription: 'Куа́ндо йе́га нуэ́во сток?', translation: 'Когда поступит новая партия?', note: 'Вопрос, если нужный товар временно отсутствует.' },
      { greek: 'Prefiero pagar en efectivo', transcription: 'Прэфьэ́ро пага́р эн эфэкти́во', translation: 'Предпочитаю платить наличными', note: 'Полезная фраза, особенно на рынках и в маленьких магазинах.' },
      { greek: '¿Puedo cambiarlo por otra talla?', transcription: 'Пуэ́до камбья́рло пор о́тра та́йя?', translation: 'Могу поменять на другой размер?', note: 'Стандартный запрос при обмене товара.' },
      { greek: 'Es un poco caro para mí', transcription: 'Эс ун по́ко ка́ро па́ра ми', translation: 'Это немного дорого для меня', note: 'Мягкий способ отказаться от покупки, не обижая продавца.' }
    ]
  },
  {
    id: 'neighbors',
    category: 'Квартира и соседи',
    icon: '🏠',
    color: '#16A085',
    phrases: [
      { greek: 'Busco un piso de alquiler', transcription: 'Бу́ско ун пи́со дэ алькиле́р', translation: 'Ищу квартиру в аренду', note: 'Базовая фраза для поиска жилья на сайтах или у агентов.' },
      { greek: '¿Cuánto es el alquiler al mes?', transcription: 'Куа́нто эс эль алькиле́р аль мэс?', translation: 'Сколько аренда в месяц?', note: 'Ключевой вопрос при просмотре квартиры.' },
      { greek: '¿Están incluidos los gastos?', transcription: 'Эста́н инклуи́дос лос га́стос?', translation: 'Коммунальные расходы включены?', note: 'Важно уточнять, входят ли в стоимость аренды коммунальные платежи.' },
      { greek: 'Necesito un aval para el contrato', transcription: 'Нэсэси́то ун ава́ль па́ра эль контра́то', translation: 'Мне нужен поручитель для контракта', note: 'Часто требуется для аренды, особенно без постоянного дохода в Испании.' },
      { greek: '¿Se admiten mascotas?', transcription: 'Сэ адми́тэн маско́тас?', translation: 'Домашние животные разрешены?', note: 'Важный вопрос для владельцев питомцев при выборе квартиры.' },
      { greek: 'Voy a pagar la fianza', transcription: 'Вой а пага́р ла фья́нса', translation: 'Я заплачу залог', note: 'Обычно требуется залог в размере одного-двух месяцев аренды.' },
      { greek: 'Hay mucho ruido por las noches', transcription: 'Ай му́чо руи́до пор лас но́чэс', translation: 'Ночью очень шумно', note: 'Полезная жалоба соседям или арендодателю на шум.' },
      { greek: '¿Puede bajar el volumen, por favor?', transcription: 'Пуэ́дэ баха́р эль волю́мэн, пор фаво́р?', translation: 'Можете сделать потише, пожалуйста?', note: 'Вежливая просьба к шумным соседям.' },
      { greek: 'La calefacción no funciona', transcription: 'Ла калефаксьо́н но фунсьо́на', translation: 'Отопление не работает', note: 'Стандартная жалоба владельцу жилья на неисправность.' },
      { greek: 'Necesito llamar al fontanero', transcription: 'Нэсэси́то ямар аль фонтанэ́ро', translation: 'Мне нужно вызвать сантехника', note: 'Полезная фраза при проблемах с водопроводом.' },
      { greek: 'Hay una fuga de agua', transcription: 'Ай у́на фу́га дэ а́гуа', translation: 'Есть протечка воды', note: 'Срочная проблема, требующая немедленного вызова специалиста.' },
      { greek: 'El casero es muy amable', transcription: 'Эль касэ́ро эс муй ама́блэ', translation: 'Хозяин квартиры очень любезный', note: '«Casero» — разговорное слово для владельца арендуемого жилья.' },
      { greek: '¿Podemos hacer una fiesta?', transcription: 'Подэ́мос асэ́р у́на фьэ́ста?', translation: 'Можно устроить вечеринку?', note: 'Вежливо предупредить соседей заранее — хороший испанский обычай.' },
      { greek: 'Voy a renovar el contrato', transcription: 'Вой а рэнова́р эль контра́то', translation: 'Я собираюсь продлить контракт', note: 'Полезная фраза при обсуждении дальнейшей аренды с владельцем.' },
      { greek: '¿A qué comunidad de vecinos pertenece?', transcription: 'А кэ комуниДА́д дэ вэси́нос пэртэнэ́сэ?', translation: 'К какому объединению соседей относится дом?', note: '«Comunidad de vecinos» — совет жильцов дома, обычная структура в Испании.' }
    ]
  },
  {
    id: 'compliments',
    category: 'Комплименты и реакции',
    icon: '👏',
    color: '#FFC800',
    phrases: [
      { greek: '¡Qué bien!', transcription: 'Кэ бьен!', translation: 'Как здорово!', note: 'Универсальная реакция на хорошую новость.' },
      { greek: '¡Qué guapo/a!', transcription: 'Кэ гуа́по/а!', translation: 'Какой(-ая) красивый(-ая)!', note: 'Частый комплимент внешности в Испании, используется свободно.' },
      { greek: 'Me encanta', transcription: 'Мэ энка́нта', translation: 'Мне очень нравится', note: 'Сильнее чем «me gusta», выражает настоящий восторг.' },
      { greek: '¡Qué buena idea!', transcription: 'Кэ буэ́на идэ́а!', translation: 'Какая хорошая идея!', note: 'Одобрение чужого предложения или плана.' },
      { greek: 'Está riquísimo', transcription: 'Эста́ рикиси́мо', translation: 'Это невероятно вкусно', note: 'Превосходная степень от «rico» (вкусный) — сильный комплимент еде.' },
      { greek: '¡Enhorabuena!', transcription: 'Энорабуэ́на!', translation: 'Поздравляю!', note: 'Используется по любому хорошему поводу — от новой работы до рождения ребёнка.' },
      { greek: '¡Qué suerte tienes!', transcription: 'Кэ суэ́ртэ тьэ́нэс!', translation: 'Как тебе повезло!', note: 'Дружеская реакция на хорошую новость собеседника.' },
      { greek: 'Lo has hecho genial', transcription: 'Ло ас э́чо хэнья́ль', translation: 'Ты сделал(а) это отлично', note: 'Похвала за хорошо выполненную работу или задачу.' },
      { greek: '¡Qué pena!', transcription: 'Кэ пэ́на!', translation: 'Как жаль!', note: 'Выражение сочувствия по поводу плохой новости.' },
      { greek: '¡Vaya!', transcription: 'Ва́я!', translation: 'Ничего себе! / Ого!', note: 'Восклицание удивления, положительного или отрицательного.' },
      { greek: '¡No me lo puedo creer!', transcription: 'Но мэ ло пуэ́до крээ́р!', translation: 'Не могу в это поверить!', note: 'Сильная реакция удивления на неожиданную новость.' },
      { greek: 'Eres muy amable', transcription: 'Э́рэс муй ама́блэ', translation: 'Ты очень любезен(-зна)', note: 'Благодарность за доброту или помощь.' },
      { greek: '¡Qué mona/o!', transcription: 'Кэ мо́на/о!', translation: 'Какая прелесть!', note: 'Часто говорят о детях, животных или милых вещах.' },
      { greek: 'Me alegro mucho por ti', transcription: 'Мэ алэ́гро му́чо пор ти', translation: 'Я очень рад(а) за тебя', note: 'Тёплая реакция на хорошую новость друга.' },
      { greek: '¡Qué horror!', transcription: 'Кэ орро́р!', translation: 'Какой ужас!', note: 'Реакция на что-то неприятное или пугающее, часто с юмором.' },
      { greek: 'Eso no tiene sentido', transcription: 'Э́со но тьэ́нэ сэнти́до', translation: 'В этом нет смысла', note: 'Мягкое выражение несогласия или недоумения.' },
      { greek: 'Estoy muy orgulloso/a de ti', transcription: 'Эсто́й муй оргуйо́со/а дэ ти', translation: 'Я очень горжусь тобой', note: 'Сильное выражение поддержки и гордости за близкого человека.' },
      { greek: '¡Qué rabia!', transcription: 'Кэ ра́бья!', translation: 'Как обидно! / Вот досада!', note: 'Реакция на разочарование или неудачу.' },
      { greek: 'Tienes toda la razón', transcription: 'Тьэ́нэс то́да ла расо́н', translation: 'Ты абсолютно прав(а)', note: 'Полное согласие с мнением собеседника.' },
      { greek: 'No tengo palabras', transcription: 'Но тэ́нго пала́брас', translation: 'У меня нет слов', note: 'Сильная эмоциональная реакция на что-то впечатляющее.' }
    ]
  },
  {
    id: 'leisure',
    category: 'Природа и досуг',
    icon: '🌲',
    color: '#27AE60',
    phrases: [
      { greek: 'Vamos a la playa este fin de semana', transcription: 'Ва́мос а ла пла́я э́стэ фин дэ сэма́на', translation: 'Поедем на пляж в эти выходные', note: 'Пляж — центральная часть испанского досуга, особенно летом.' },
      { greek: 'Me encanta hacer senderismo', transcription: 'Мэ энка́нта асэ́р сэндэри́смо', translation: 'Я обожаю пеший туризм', note: 'Испания предлагает множество маршрутов для хайкинга в горах.' },
      { greek: '¿Quieres dar un paseo?', transcription: 'Кье́рэс дар ун пасэ́о?', translation: 'Хочешь прогуляться?', note: 'Простое предложение для совместного досуга.' },
      { greek: 'Hace un día precioso', transcription: 'А́сэ ун ди́а прэсьо́со', translation: 'Сегодня прекрасный день', note: 'Естественная фраза для начала разговора о погоде и планах.' },
      { greek: 'Voy a coger el sol', transcription: 'Вой а кохэ́р эль соль', translation: 'Пойду позагораю', note: 'Частая фраза летом на пляже или в парке.' },
      { greek: '¿Te apetece ir al cine?', transcription: 'Тэ апэтэ́сэ ир аль си́нэ?', translation: 'Хочешь пойти в кино?', note: '«Apetecer» — хотеться (о желании), часто заменяет «querer» в приглашениях.' },
      { greek: 'Vamos de excursión al campo', transcription: 'Ва́мос дэ экскурсьо́н аль ка́мпо', translation: 'Поедем на экскурсию за город', note: 'Частое времяпрепровождение испанских семей по выходным.' },
      { greek: 'Me gusta pasear por el parque', transcription: 'Мэ гу́ста пасэа́р пор эль па́ркэ', translation: 'Мне нравится гулять в парке', note: 'Простая фраза для описания приятного досуга.' },
      { greek: '¿Sabes bucear?', transcription: 'Са́бэс бусэа́р?', translation: 'Ты умеешь нырять с аквалангом?', note: 'Побережье Испании популярно для дайвинга.' },
      { greek: 'Vamos a hacer una barbacoa', transcription: 'Ва́мос а асэ́р у́на барбакóа', translation: 'Устроим барбекю', note: 'Популярное занятие среди друзей и соседей в тёплое время года.' },
      { greek: 'Me relaja mucho la naturaleza', transcription: 'Мэ рэля́ха му́чо ла натурале́са', translation: 'Природа меня очень расслабляет', note: 'Хорошая фраза для разговора о хобби и отдыхе.' },
      { greek: '¿Hay una piscina cerca?', transcription: 'Ай у́на писи́на сэ́рка?', translation: 'Есть бассейн неподалёку?', note: 'Полезный вопрос летом, особенно в жарких регионах Испании.' },
      { greek: 'Me gusta ver el atardecer', transcription: 'Мэ гу́ста вэр эль атардэсэ́р', translation: 'Мне нравится смотреть закат', note: 'Испанские побережья славятся красивыми закатами.' },
      { greek: 'Vamos de acampada este verano', transcription: 'Ва́мос дэ акампа́да э́стэ вэра́но', translation: 'Поедем в поход с палатками этим летом', note: 'Кемпинг — популярный вид летнего отдыха в Испании.' },
      { greek: '¿Te gusta la montaña o el mar?', transcription: 'Тэ гу́ста ла монта́нья о эль мар?', translation: 'Тебе больше нравятся горы или море?', note: 'Классический вопрос для беседы об отдыхе.' },
      { greek: 'Vamos a coger setas al bosque', transcription: 'Ва́мос а кохэ́р сэ́тас аль бо́скэ', translation: 'Пойдём собирать грибы в лес', note: 'Осенью в Испании также популярен сбор грибов, особенно на севере.' },
      { greek: 'Este parque natural es precioso', transcription: 'Э́стэ па́ркэ натура́ль эс прэсьо́со', translation: 'Этот природный парк прекрасен', note: 'В Испании много национальных парков, стоящих посещения.' },
      { greek: 'Voy a hacer una ruta en bici', transcription: 'Вой а асэ́р у́на ру́та эн би́си', translation: 'Проеду на велосипеде по маршруту', note: 'Велотуризм становится всё популярнее в испанских городах.' },
      { greek: '¿Vamos de picnic al parque?', transcription: 'Ва́мос дэ пикни́к аль па́ркэ?', translation: 'Устроим пикник в парке?', note: 'Простое предложение для приятного дня на свежем воздухе.' },
      { greek: 'Me apunto a la excursión', transcription: 'Мэ апу́нто а ла экскурсьо́н', translation: 'Я записываюсь на экскурсию', note: '«Apuntarse» — записаться, присоединиться к мероприятию.' }
    ]
  },
  {
    id: 'education',
    category: 'Образование',
    icon: '🎓',
    color: '#8E44AD',
    phrases: [
      { greek: 'Quiero matricular a mi hijo en el colegio', transcription: 'Кье́ро матрикуля́р а ми и́хо эн эль колэ́хьо', translation: 'Хочу записать сына в школу', note: 'Основная фраза при поступлении ребёнка в испанскую школу.' },
      { greek: '¿En qué curso está?', transcription: 'Эн кэ ку́рсо эста́?', translation: 'В каком он классе?', note: 'Стандартный вопрос о классе/курсе ребёнка в школе.' },
      { greek: 'Estoy estudiando español', transcription: 'Эсто́й эстудья́ндо эспаньо́ль', translation: 'Я изучаю испанский язык', note: 'Простая фраза о текущем обучении, полезна на курсах.' },
      { greek: '¿Hay clases de español para adultos?', transcription: 'Ай кла́сэс дэ эспаньо́ль па́ра адульто́с?', translation: 'Есть курсы испанского для взрослых?', note: 'Многие муниципалитеты Испании предлагают бесплатные курсы для иностранцев.' },
      { greek: 'Necesito homologar mi título', transcription: 'Нэсэси́то омолёга́р ми ти́туло', translation: 'Мне нужно признать (нострифицировать) мой диплом', note: 'Важная процедура для тех, кто хочет работать по специальности в Испании.' },
      { greek: '¿Cuánto cuesta la matrícula?', transcription: 'Куа́нто куэ́ста ла матри́куля?', translation: 'Сколько стоит запись на обучение?', note: 'Полезный вопрос при выборе учебного заведения или курсов.' },
      { greek: 'Voy a hacer un examen', transcription: 'Вой а асэ́р ун эксáмэн', translation: 'Я буду сдавать экзамен', note: 'Простая фраза о предстоящей проверке знаний.' },
      { greek: 'Mi hijo va a la guardería', transcription: 'Ми и́хо ва а ла гуардэри́а', translation: 'Мой сын ходит в детский сад', note: '«Guardería» — детский сад для малышей до трёх лет в Испании.' },
      { greek: '¿Ofrecen clases de refuerzo?', transcription: 'Офрэ́сэн кла́сэс дэ рэфуэ́рсо?', translation: 'Вы предлагаете дополнительные занятия?', note: 'Полезно спросить для детей, которым нужна помощь с языком.' },
      { greek: 'Estoy preparando el examen DELE', transcription: 'Эсто́й прэпара́ндо эль эксáмэн ДЭЛЕ', translation: 'Я готовлюсь к экзамену DELE', note: 'DELE — официальный экзамен на знание испанского языка для иностранцев.' },
      { greek: '¿Cuál es el horario escolar?', transcription: 'Куа́ль эс эль ора́рьо эсколя́р?', translation: 'Какой график занятий в школе?', note: 'Полезный вопрос для родителей при выборе школы.' },
      { greek: 'Mi hija está en la universidad', transcription: 'Ми и́ха эста́ эн ла унивэрсида́д', translation: 'Моя дочь учится в университете', note: 'Простая фраза для описания образования членов семьи.' },
      { greek: 'Necesito el certificado de notas', transcription: 'Нэсэси́то эль сэртифика́до дэ но́тас', translation: 'Мне нужна справка об оценках', note: 'Полезный документ при переводе ребёнка в другую школу.' },
      { greek: '¿Se puede pedir una beca?', transcription: 'Сэ пуэ́дэ пэди́р у́на бэ́ка?', translation: 'Можно подать заявку на стипендию?', note: 'В Испании существует система государственных стипендий (becas) для студентов.' },
      { greek: 'Los deberes son para mañana', transcription: 'Лос дэбэ́рэс сон па́ра манья́на', translation: 'Домашнее задание нужно сдать завтра', note: 'Частая фраза в общении с детьми или учителями.' },
      { greek: 'Quiero apuntarme a un curso online', transcription: 'Кье́ро апунта́рмэ а ун ку́рсо онла́йн', translation: 'Хочу записаться на онлайн-курс', note: 'Полезная фраза для дистанционного обучения.' },
      { greek: 'Aprendo mejor con práctica', transcription: 'Апрэ́ндо мэхо́р кон пра́ктика', translation: 'Я лучше учусь на практике', note: 'Полезная фраза при обсуждении своего стиля обучения с преподавателем.' },
      { greek: '¿Cuántos años dura la carrera?', transcription: 'Куа́нтос а́ньос ду́ра ла карре́ра?', translation: 'Сколько лет длится обучение (специальность)?', note: '«Carrera» в Испании также означает "специальность/направление в вузе".' },
      { greek: 'Voy a hacer prácticas en una empresa', transcription: 'Вой а асэ́р пра́ктикас эн у́на эмпрэ́са', translation: 'Я пройду стажировку в компании', note: 'Прохождение стажировки (prácticas) — обычная часть образования в Испании.' },
      { greek: 'Necesito mejorar mi nivel de español', transcription: 'Нэсэси́то мэхора́р ми ни́вэль дэ эспаньо́ль', translation: 'Мне нужно улучшить свой уровень испанского', note: 'Честное признание, полезное при записи на курсы соответствующего уровня.' }
    ]
  },
  {
    id: 'culture',
    category: 'Культура Испании',
    icon: '💃',
    color: '#D35400',
    phrases: [
      { greek: 'Vamos a ver una corrida', transcription: 'Ва́мос а вэр у́на корри́да', translation: 'Пойдём посмотреть корриду', note: 'Коррида — традиционное, но спорное культурное явление Испании, не во всех регионах разрешена.' },
      { greek: 'Me encanta el flamenco', transcription: 'Мэ энка́нта эль фляме́нко', translation: 'Мне очень нравится фламенко', note: 'Фламенко — символ испанской культуры, особенно популярен в Андалусии.' },
      { greek: '¿Cuándo es la fiesta del pueblo?', transcription: 'Куа́ндо эс ла фьэ́ста дэль пуэ́бло?', translation: 'Когда местный праздник?', note: 'Почти в каждом испанском городе есть свои местные фиесты (fiestas patronales).' },
      { greek: 'Vamos a las Fallas de Valencia', transcription: 'Ва́мос а лас Фа́йяс дэ Валэ́нсья', translation: 'Поедем на Фальяс в Валенсию', note: 'Fallas — знаменитый мартовский праздник с огромными фигурами и фейерверками.' },
      { greek: 'La siesta es sagrada', transcription: 'Ла сьэ́ста эс сагра́да', translation: 'Сиеста священна', note: 'Традиция дневного отдыха, влияющая на график работы многих заведений.' },
      { greek: 'Los españoles cenan muy tarde', transcription: 'Лос эспаньо́лэс сэ́нан муй та́рдэ', translation: 'Испанцы ужинают очень поздно', note: 'Культурная особенность: ужин обычно после 21:00, иногда даже позже.' },
      { greek: 'Vamos a las uvas de Nochevieja', transcription: 'Ва́мос а лас у́вас дэ Ночэвьэ́ха', translation: 'Съедим виноградины в новогоднюю ночь', note: 'Испанская традиция — съесть 12 виноградин под бой курантов на Новый год.' },
      { greek: 'La Semana Santa es muy importante aquí', transcription: 'Ла Сэма́на Са́нта эс муй импорта́нтэ аки́', translation: 'Страстная неделя здесь очень важна', note: 'Религиозные процессии на Пасху — важная культурная традиция во многих городах.' },
      { greek: 'Me gusta el tapeo con amigos', transcription: 'Мэ гу́ста эль тапэ́о кон ами́гос', translation: 'Мне нравится ходить по тапас-барам с друзьями', note: '«Tapeo» — традиция посещать несколько баров, пробуя тапас в каждом.' },
      { greek: '¿Has probado el gazpacho?', transcription: 'Ас проба́до эль гаспа́чо?', translation: 'Ты пробовал гаспачо?', note: 'Гаспачо — холодный овощной суп, символ андалузской кухни.' },
      { greek: 'Los Reyes Magos traen regalos', transcription: 'Лос Рэ́йес Ма́гос тра́эн рэга́лос', translation: 'Волхвы приносят подарки', note: 'В Испании главный праздник для детей — 6 января, День Волхвов (Reyes Magos).' },
      { greek: 'Es típico tomar el vermú los domingos', transcription: 'Эс ти́пико тома́р эль вэрму́ лос доми́нгос', translation: 'Традиционно пить вермут по воскресеньям', note: '«El vermú» — популярная традиция аперитива перед воскресным обедом.' },
      { greek: 'Vamos a bailar sevillanas', transcription: 'Ва́мос а байля́р сэвийя́нас', translation: 'Потанцуем севильяны', note: 'Севильяны — народный танец, особенно популярный на ярмарке в Севилье (Feria de Abril).' },
      { greek: 'El jamón ibérico es un tesoro nacional', transcription: 'Эль хамо́н ибэ́рико эс ун тэсо́ро насьона́ль', translation: 'Иберийский хамон — национальное сокровище', note: 'Хамон — важная часть испанской гастрономической культуры.' },
      { greek: 'Aquí se respeta mucho la familia', transcription: 'Аки́ сэ рэспэ́та му́чо ла фами́лья', translation: 'Здесь очень уважают семью', note: 'Семейные ценности играют центральную роль в испанском обществе.' }
    ]
  },
  {
    id: 'technology_media',
    category: 'Технологии и медиа',
    icon: '📱',
    color: '#3498DB',
    phrases: [
      { greek: '¿Cuál es tu número de teléfono?', transcription: 'Куа́ль эс ту ну́мэро дэ тэлэ́фоно?', translation: 'Какой у тебя номер телефона?', note: 'Базовый вопрос для обмена контактами.' },
      { greek: 'Te mando un mensaje', transcription: 'Тэ ма́ндо ун мэнса́хэ', translation: 'Отправлю тебе сообщение', note: 'Стандартная фраза для координации через мессенджеры.' },
      { greek: '¿Tienes WhatsApp?', transcription: 'Тьэ́нэс Ватсáп?', translation: 'У тебя есть WhatsApp?', note: 'WhatsApp — основной мессенджер в Испании для личного и делового общения.' },
      { greek: 'Se me ha quedado sin batería el móvil', transcription: 'Сэ мэ а кэда́до син батэри́а эль мо́виль', translation: 'У меня разрядился телефон', note: 'Полезная фраза для объяснения, почему вы не отвечали.' },
      { greek: '¿Hay wifi gratis aquí?', transcription: 'Ай ви́фи гра́тис аки́?', translation: 'Здесь есть бесплатный Wi-Fi?', note: 'Частый вопрос в кафе, отелях и общественных местах.' },
      { greek: '¿Cuál es la contraseña del wifi?', transcription: 'Куа́ль эс ла контрасэ́нья дэль ви́фи?', translation: 'Какой пароль от Wi-Fi?', note: 'Практичный вопрос в любом заведении с интернетом.' },
      { greek: 'Voy a subir una foto', transcription: 'Вой а суби́р у́на фо́то', translation: 'Выложу фото (в соцсети)', note: 'Разговорная фраза про публикацию контента в интернете.' },
      { greek: 'No me llega la señal', transcription: 'Но мэ йе́га ла сэнья́ль', translation: 'У меня нет сигнала', note: 'Полезная фраза при проблемах со связью.' },
      { greek: 'Voy a descargar la aplicación', transcription: 'Вой а дэскарга́р ла апликасьо́н', translation: 'Скачаю приложение', note: 'Стандартная фраза при установке нового приложения на телефон.' },
      { greek: 'Se me ha bloqueado la cuenta', transcription: 'Сэ мэ а блокэа́до ла куэ́нта', translation: 'У меня заблокировался аккаунт', note: 'Полезная фраза для обращения в техподдержку.' },
      { greek: 'Necesito comprar un cargador', transcription: 'Нэсэси́то компра́р ун каргадо́р', translation: 'Мне нужно купить зарядное устройство', note: 'Практичная фраза в магазине электроники.' },
      { greek: 'Prefiero ver las noticias en internet', transcription: 'Прэфьэ́ро вэр лас ноти́сьяс эн интэрнэ́т', translation: 'Предпочитаю смотреть новости в интернете', note: 'Фраза о медиапредпочтениях в разговоре.' },
      { greek: '¿Has visto la última serie española?', transcription: 'Ас ви́сто ла у́льтима сэ́рье эспаньо́ла?', translation: 'Ты смотрел последний испанский сериал?', note: 'Испанские сериалы (например, «La Casa de Papel») очень популярны в мире.' },
      { greek: 'Sígueme en Instagram', transcription: 'Си́гэмэ эн Инста́грам', translation: 'Подпишись на меня в Instagram', note: 'Частая фраза при обмене социальными сетями.' },
      { greek: 'Voy a hacer una videollamada', transcription: 'Вой а асэ́р у́на видэоямá́да', translation: 'Сделаю видеозвонок', note: 'Полезная фраза для связи с семьёй на родине.' },
      { greek: 'Este enlace no funciona', transcription: 'Э́стэ энла́сэ но фунсьо́на', translation: 'Эта ссылка не работает', note: 'Практичная фраза для сообщений о технических проблемах.' },
      { greek: '¿Puedes mandarme el enlace?', transcription: 'Пуэ́дэс манда́рмэ эль энла́сэ?', translation: 'Можешь отправить мне ссылку?', note: 'Простая просьба поделиться информацией онлайн.' },
      { greek: 'Voy a comprar unos auriculares', transcription: 'Вой а компра́р у́нос аурикуля́рэс', translation: 'Куплю наушники', note: 'Практичная фраза для похода в магазин электроники.' },
      { greek: 'Tengo un correo sin leer', transcription: 'Тэ́нго ун коррэ́о син лээ́р', translation: 'У меня непрочитанное письмо', note: 'Полезная фраза для описания рабочей почты.' },
      { greek: 'Voy a actualizar el sistema', transcription: 'Вой а актуалиса́р эль систэ́ма', translation: 'Обновлю систему', note: 'Техническая фраза при работе с компьютером или телефоном.' },
      { greek: '¿Cómo me doy de baja de esta lista?', transcription: 'Ко́мо мэ дой дэ ба́ха дэ э́ста ли́ста?', translation: 'Как отписаться от этой рассылки?', note: 'Полезная фраза для управления подписками по электронной почте.' },
      { greek: 'La conexión va muy lenta', transcription: 'Ла конэксьо́н ва муй лэ́нта', translation: 'Соединение очень медленное', note: 'Частая жалоба на качество интернета.' },
      { greek: 'Voy a hacer una copia de seguridad', transcription: 'Вой а асэ́р у́на ко́пья дэ сэгуридá́д', translation: 'Сделаю резервную копию', note: 'Полезная техническая фраза для защиты важных файлов.' },
      { greek: 'He recibido spam', transcription: 'Э рэсиби́до спам', translation: 'Я получил спам', note: 'Практичное слово, используемое почти так же, как и в русском.' },
      { greek: 'Prefiero pagar con el móvil', transcription: 'Прэфьэ́ро пага́р кон эль мо́виль', translation: 'Предпочитаю платить телефоном', note: 'Бесконтактные платежи через телефон широко распространены в Испании.' },
      { greek: '¿Tienes una cuenta de correo?', transcription: 'Тьэ́нэс у́на куэ́нта дэ коррэ́о?', translation: 'У тебя есть электронная почта?', note: 'Полезный вопрос при обмене контактами для официальной переписки.' },
      { greek: 'Voy a grabar un vídeo', transcription: 'Вой а грабáр ун ви́дэо', translation: 'Сниму видео', note: 'Простая фраза для описания действия с камерой телефона.' },
      { greek: 'Este vídeo se ha hecho viral', transcription: 'Э́стэ ви́дэо сэ а э́чо вира́ль', translation: 'Это видео стало вирусным', note: 'Современное выражение, актуальное для соцсетей.' },
      { greek: 'Necesito un plan de datos móviles', transcription: 'Нэсэси́то ун план дэ да́тос мови́лэс', translation: 'Мне нужен тариф на мобильный интернет', note: 'Практичная фраза при покупке SIM-карты.' },
      { greek: 'Voy a comprar una tarjeta de memoria', transcription: 'Вой а компра́р у́на тархэ́та дэ мэмо́рья', translation: 'Куплю карту памяти', note: 'Полезная фраза для покупки в магазине электроники.' }
    ]
  },
];
