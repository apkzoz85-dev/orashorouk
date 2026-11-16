/* ============================================================
 *  بيانات مشاريع أورا — الأسعار من قائمة المتاح (نوفمبر 2026)
 *  عدّل أي سعر أو وحدة هنا وسيتغير في كل الصفحات.
 * ========================================================== */

export type Region = "east" | "west" | "coast";

export type Unit = {
  type: string;
  spec: string;
  /** بالجنيه — null = السعر عند الطلب */
  price: number | null;
  image: string;
};

export type Phase = {
  id: string;
  name: string;
  en: string;
  tag?: string;
  intro: string;
  plan: string;
  /** نسبة المقدم الأولى */
  down: number;
  years: number;
  finish: string;
  image: string;
  units: Unit[];
};

export type Project = {
  slug: string;
  name: string;
  en: string;
  region: Region;
  city: string;
  place: string;
  tagline: string;
  hero: string;
  card: string;
  aboutImage: string;
  gallery: string[];
  facts: { value: string; label: string }[];
  about: string[];
  types: string[];
  /** ملخص السداد للكروت وجدول المقارنة */
  downLabel: string;
  yearsLabel: string;
  distances: [string, string][];
  nearby: string[];
  mapQuery: string;
  /** أسعار غير مؤكدة من المطوّر */
  priceNote?: string;
  phases: Phase[];
};

const img = (n: string) => `/images/${n}.webp`;
const P5_10 = "مقدم 5%، ثم 5% بعد 3 أشهر، والباقي على 10 سنوات";

export const REGIONS: { id: Region; name: string }[] = [
  { id: "east", name: "شرق القاهرة" },
  { id: "west", name: "غرب القاهرة" },
  { id: "coast", name: "الساحل الشمالي" },
];

export const PROJECTS: Project[] = [
  /* ───────────── ZED EAST ───────────── */
  {
    slug: "zed-east",
    name: "زد إيست",
    en: "ZED East",
    region: "east",
    city: "القاهرة الجديدة",
    place: "التجمع الخامس — نهاية التسعين الجنوبي",
    tagline: "مجتمع أورا في التجمع الخامس حول نادي ZED الرياضي، والآن مع ليفورا تاور.",
    hero: img("ze-hero"),
    card: img("ze-card"),
    aboutImage: img("ze-about"),
    gallery: ["ze-g1", "ze-g2", "ze-g3", "ze-g4", "ze-g5", "ze-g6"].map(img),
    facts: [
      { value: "40", label: "فدان نادي ZED الرياضي" },
      { value: "G+30", label: "ليفورا تاور" },
      { value: "0%", label: "مقدم في كلوب سايد" },
      { value: "10", label: "سنوات تقسيط" },
      { value: "20 د", label: "من العاصمة الإدارية" },
      { value: "4", label: "طروحات متاحة" },
    ],
    about: [
      "زد إيست مجتمع أورا في القاهرة الجديدة، مبني على فلسفة «المساحة رفاهية»: مسافات واسعة بين المباني، وإطلالات على حدائق وساحات مفتوحة أو على نادي ZED الرياضي الممتد على 40 فدانًا، مع منطقة تجارية في قلب المشروع.",
      "يضم المشروع اليوم أربعة طروحات: ليفورا تاور (برج G+30 شقق فندقية مخدومة)، كلوب سايد ريزيدنس (شقق مخدومة تطل على النادي)، ذا إميرالد كوليكشن (آخر طرح منازل مستقلة حول بحيرة)، وزد ستريب للوحدات الإدارية.",
      "بدأ تسليم المراحل الأولى في زد إيست، وأنظمة السداد تصل إلى 10 سنوات، مع طرح بدون مقدم في كلوب سايد ريزيدنس.",
    ],
    types: ["شقق مخدومة", "شقق فندقية", "ڤيلات", "إداري"],
    downLabel: "من 0%",
    yearsLabel: "10 سنوات",
    distances: [
      ["20 دقيقة", "العاصمة الإدارية"],
      ["20 دقيقة", "شارع التسعين"],
      ["35 دقيقة", "مطار القاهرة الدولي"],
      ["40 دقيقة", "وسط القاهرة"],
    ],
    nearby: ["لافيستا سيتي", "هايد بارك", "الطريق الدائري الأوسط", "الجامعة الأمريكية"],
    mapQuery: "ZED East New Cairo",
    phases: [
      {
        id: "levora",
        name: "ليفورا تاور",
        en: "Levora Tower",
        tag: "طرح جديد",
        intro:
          "برج G+30 شقق فندقية مخدومة بأنظمة ذكية متكاملة، بإدارة وتشغيل OPM، كاملة التشطيب بالتكييفات والمطبخ، والكلوب هاوس مشمول في السعر.",
        plan: P5_10,
        down: 5,
        years: 10,
        finish: "كامل + تكييفات + مطبخ",
        image: img("ze-levora"),
        units: [
          { type: "شقة غرفة نوم", spec: "64 م²", price: 13_500_000, image: img("ze-lv-1") },
          { type: "شقة غرفتين", spec: "95 م² + تراس", price: 20_400_000, image: img("ze-lv-2") },
          { type: "شقة 3 غرف + مربية", spec: "146 م²", price: 30_500_000, image: img("ze-lv-3") },
        ],
      },
      {
        id: "csr",
        name: "كلوب سايد ريزيدنس",
        en: "Club Side Residence",
        tag: "بدون مقدم",
        intro: "شقق مخدومة كاملة التشطيب بالتكييفات تطل على نادي ZED الرياضي، من ستوديو حتى 3 غرف نوم.",
        plan: "بدون مقدم، وتقسيط على 10 سنوات",
        down: 0,
        years: 10,
        finish: "كامل + تكييفات",
        image: img("ze-csr-2"),
        units: [
          { type: "ستوديو", spec: "65 م²", price: 8_900_000, image: img("ze-csr-1") },
          { type: "شقة غرفة نوم", spec: "86 م²", price: 11_700_000, image: img("ze-csr-2") },
          { type: "شقة غرفتين", spec: "115 م²", price: 16_100_000, image: img("ze-csr-3") },
          { type: "شقة 3 غرف", spec: "140 م²", price: 23_600_000, image: img("ze-csr-4") },
        ],
      },
      {
        id: "emerald",
        name: "ذا إميرالد كوليكشن",
        en: "The Emerald Collection",
        tag: "آخر طرح ڤيلات",
        intro: "آخر مجتمع منازل مستقلة يُطرح في زد إيست، حول بحيرة ومساحات خضراء، كامل التشطيب.",
        plan: P5_10,
        down: 5,
        years: 10,
        finish: "كامل التشطيب",
        image: img("ze-g3"),
        units: [
          { type: "دوبلكس", spec: "215 م²", price: 26_300_000, image: img("ze-duplex") },
          { type: "فوربلكس", spec: "174 م² + حديقة 300 م²", price: 32_900_000, image: img("ze-fourplex") },
          { type: "تاون هاوس", spec: "215 م²", price: 38_200_000, image: img("ze-townhouse") },
          { type: "ڤيلا مستقلة", spec: "253 م²", price: 57_800_000, image: img("ze-villa") },
        ],
      },
      {
        id: "strip",
        name: "زد ستريب",
        en: "ZED Strip",
        tag: "إداري",
        intro: "وحدات إدارية في زد ستريب، الشريط التجاري والإداري لزد إيست بمطاعمه وكافيهاته ومحلاته.",
        plan: P5_10,
        down: 5,
        years: 10,
        finish: "إداري",
        image: img("ze-strip"),
        units: [{ type: "وحدة إدارية", spec: "من 86 م²", price: 18_500_000, image: img("ze-strip") }],
      },
    ],
  },

  /* ───────────── SOLANA EAST ───────────── */
  {
    slug: "solana-east",
    name: "سولانا إيست",
    en: "Solana East",
    region: "east",
    city: "القاهرة الجديدة",
    place: "التجمع الخامس — شارع التسعين الجنوبي",
    tagline: "شقق وڤيلات ومكاتب، ومعها طرح إيست لين: شقق فندقية وعيادات ميديكا على التسعين.",
    hero: img("se-hero"),
    card: img("se-card"),
    aboutImage: img("se-about"),
    gallery: ["se-med-plaza", "se-res-cd", "se-med-reception", "se-res-lm", "se-med-street", "se-res-a"].map(img),
    facts: [
      { value: "26.6", label: "فدان — سولانا إيست لين" },
      { value: "5%", label: "مقدم" },
      { value: "8–9", label: "سنوات تقسيط" },
      { value: "G+3.5", label: "مباني الشقق الفندقية" },
      { value: "5", label: "طروحات متاحة" },
      { value: "8.9 م", label: "سعر البداية" },
    ],
    about: [
      "سولانا إيست مشروع أورا على شارع التسعين الجنوبي في التجمع الخامس، ويجمع بين السكن والخدمات في مكان واحد: شقق كاملة التشطيب، تاون هاوس وتوين هاوس وڤيلات مستقلة، ومكاتب إدارية.",
      "طرح سولانا إيست لين يمتد على 26.6 فدان على واجهة التسعين مباشرة، ويضم شقق فندقية مخدومة بالكامل في مباني G+3.5 وسط اللاندسكيب، ومبنى ميديكا: المبنى الطبي الوحيد في المشروع بعيادات متشطبة بالكامل.",
      "السداد بمقدم 5% ثم 5% بعد 3 أشهر، والباقي على 8 سنوات بأقساط متساوية في الشقق والڤيلات والمكاتب، وحتى 9 سنوات في الشقق الفندقية.",
    ],
    types: ["شقق", "شقق فندقية", "ڤيلات", "عيادات", "مكاتب"],
    downLabel: "5%",
    yearsLabel: "حتى 9 سنوات",
    distances: [
      ["مباشرة", "شارع التسعين الجنوبي"],
      ["قريب من", "الجامعة الأمريكية"],
      ["قريب من", "الطريق الدائري الأوسط"],
      ["قريب من", "زد إيست"],
    ],
    nearby: ["التسعين الجنوبي", "الجامعة الأمريكية", "زد إيست", "هايد بارك"],
    mapQuery: "Solana East ORA New Cairo",
    phases: [
      {
        id: "east-lane",
        name: "إيست لين — شقق فندقية",
        en: "East Lane Serviced",
        tag: "طرح جديد",
        intro: "شقق فندقية مخدومة بالكامل في مباني G+3.5 وسط اللاندسكيب، غرفة وغرفتين و3 غرف — للسكن أو للإيجار.",
        plan: "جدية حجز 5%، وتقسيط حتى 9 سنوات",
        down: 5,
        years: 9,
        finish: "مخدومة بالكامل",
        image: img("se-card"),
        units: [
          { type: "شقة فندقية", spec: "غرفة نوم واحدة", price: 8_900_000, image: img("se-res-a") },
          { type: "شقة فندقية", spec: "غرفتين نوم", price: 13_900_000, image: img("se-res-cd") },
          { type: "شقة فندقية", spec: "3 غرف نوم", price: 18_000_000, image: img("se-res-lm") },
        ],
      },
      {
        id: "medica",
        name: "ميديكا — عيادات",
        en: "Medica Clinics",
        tag: "مبنى عيادات واحد",
        intro: "المبنى الطبي الوحيد في سولانا إيست لين على واجهة التسعين. عيادات من 57 إلى 155 م² متشطبة بالكامل، في مبنى G+3 بردهة استقبال مشتركة.",
        plan: "مقدم 5%، ثم 5% بعد 3 أشهر، والباقي على 8.5 سنة",
        down: 5,
        years: 8.5,
        finish: "كامل بدورات المياه",
        image: img("se-med-plaza"),
        units: [
          { type: "عيادة", spec: "57 – 65 م²", price: 14_000_000, image: img("se-med-clinic") },
          { type: "عيادة", spec: "73 م²", price: 18_000_000, image: img("se-med-office") },
          { type: "عيادة", spec: "83 م²", price: 20_000_000, image: img("se-med-reception") },
          { type: "عيادة", spec: "93 م²", price: 23_000_000, image: img("se-med-facade") },
          { type: "عيادة", spec: "135 – 155 م²", price: 36_000_000, image: img("se-med-street") },
        ],
      },
      {
        id: "apartments",
        name: "شقق سولانا إيست",
        en: "Apartments",
        intro: "شقق كاملة التشطيب بالتكييفات من غرفة حتى 3 غرف نوم.",
        plan: "مقدم 5%، ثم 5% بعد 3 أشهر، والباقي على 8 سنوات متساوية",
        down: 5,
        years: 8,
        finish: "كامل + تكييفات",
        image: img("se-about"),
        units: [
          { type: "شقة غرفة نوم", spec: "كاملة التشطيب بالتكييفات", price: 13_500_000, image: img("se-about") },
          { type: "شقة غرفتين", spec: "كاملة التشطيب بالتكييفات", price: 20_000_000, image: img("se-res-cd") },
          { type: "شقة 3 غرف", spec: "كاملة التشطيب بالتكييفات", price: 28_000_000, image: img("se-res-lm") },
        ],
      },
      {
        id: "villas",
        name: "ڤيلات سولانا إيست",
        en: "Villas",
        intro: "تاون هاوس وتوين هاوس وڤيلات مستقلة كاملة التشطيب.",
        plan: "مقدم 5%، ثم 5% بعد 3 أشهر، والباقي على 8 سنوات متساوية",
        down: 5,
        years: 8,
        finish: "كامل التشطيب",
        image: img("se-card"),
        units: [
          { type: "تاون هاوس", spec: "كامل التشطيب", price: 44_000_000, image: img("se-card") },
          { type: "توين هاوس", spec: "كامل التشطيب", price: 54_000_000, image: img("se-about") },
          { type: "ڤيلا مستقلة", spec: "كاملة التشطيب", price: 119_000_000, image: img("se-res-a") },
        ],
      },
      {
        id: "offices",
        name: "مكاتب سولانا إيست",
        en: "Offices",
        tag: "إداري",
        intro: "مكاتب إدارية بتشطيب Core & Shell.",
        plan: "مقدم 5%، ثم 5% بعد 3 أشهر، والباقي على 8 سنوات متساوية",
        down: 5,
        years: 8,
        finish: "Core & Shell",
        image: img("se-med-facade"),
        units: [{ type: "مكتب إداري", spec: "58 م²", price: 15_000_000, image: img("se-med-facade") }],
      },
    ],
  },

  /* ───────────── ZED WEST ───────────── */
  {
    slug: "zed-west",
    name: "زد ويست",
    en: "ZED West",
    region: "west",
    city: "الشيخ زايد",
    place: "قلب الشيخ زايد — حول ZED Park",
    tagline: "165 فدان حول ZED Park في قلب الشيخ زايد، وشقق بارك سايد بدون مقدم.",
    hero: img("zw-hero"),
    card: img("zw-card"),
    aboutImage: img("zw-about"),
    gallery: ["zw-g1", "zw-g2", "zw-g3", "zw-g4", "zw-g5", "zw-g6"].map(img),
    facts: [
      { value: "165", label: "فدان مساحة المشروع" },
      { value: "0%", label: "مقدم" },
      { value: "10", label: "سنوات تقسيط" },
      { value: "ZED Park", label: "في قلب المشروع" },
      { value: "كامل", label: "تشطيب + تكييفات + مطبخ" },
      { value: "10 م", label: "سعر البداية" },
    ],
    about: [
      "زد ويست (ZED الشيخ زايد) مشروع أورا في قلب مدينة الشيخ زايد على 165 فدان، يحيط بحديقة ZED Park، بواجهة على طريق النزهة وبالقرب من محور 26 يوليو وطريق الإسكندرية الصحراوي.",
      "ZED Park أكبر مساحة خضراء في المنطقة، وتضم مرافق رياضية للمحترفين والهواة، ومسارات جري ولياقة ويوجا وسط الخضرة.",
      "المتاح حاليًا شقق بارك سايد ريزيدنس (PSR) من ستوديو حتى 3 غرف نوم، كاملة التشطيب بالتكييفات والمطبخ، بدون مقدم وعلى 10 سنوات.",
    ],
    types: ["ستوديو", "شقق"],
    downLabel: "0%",
    yearsLabel: "10 سنوات",
    distances: [
      ["مباشرة", "طريق النزهة"],
      ["قريب من", "محور 26 يوليو"],
      ["قريب من", "طريق الإسكندرية الصحراوي"],
      ["داخل المشروع", "ZED Park"],
    ],
    nearby: ["ZED Park", "محور 26 يوليو", "طريق الإسكندرية الصحراوي", "هايبر وان"],
    mapQuery: "ZED Sheikh Zayed ORA",
    phases: [
      {
        id: "psr",
        name: "بارك سايد ريزيدنس",
        en: "Park Side Residence",
        tag: "بدون مقدم",
        intro: "شقق Park Side Residence في زد ويست، كاملة التشطيب بالتكييفات والمطبخ، من ستوديو حتى 3 غرف.",
        plan: "بدون مقدم، وتقسيط على 10 سنوات",
        down: 0,
        years: 10,
        finish: "كامل + تكييفات + مطبخ",
        image: img("zw-card"),
        units: [
          { type: "ستوديو", spec: "كامل + تكييفات + مطبخ", price: 10_000_000, image: img("zw-g6") },
          { type: "شقة غرفة نوم", spec: "كاملة + تكييفات + مطبخ", price: 11_100_000, image: img("zw-u-bed") },
          { type: "شقة غرفتين", spec: "كاملة + تكييفات + مطبخ", price: 14_000_000, image: img("zw-u-living") },
          { type: "شقة 3 غرف", spec: "كاملة + تكييفات + مطبخ", price: 21_000_000, image: img("zw-about") },
        ],
      },
    ],
  },

  /* ───────────── SOLANA WEST ───────────── */
  {
    slug: "solana-west",
    name: "سولانا ويست",
    en: "Solana West",
    region: "west",
    city: "نيو زايد",
    place: "نيو زايد — بين محور الضبعة والدائري الأوسط",
    tagline: "شقق وتاون هاوس وڤيلات مستقلة في نيو زايد، بدون مقدم وعلى 10 سنوات.",
    hero: img("sw-hero"),
    card: img("sw-card"),
    aboutImage: img("sw-about"),
    gallery: ["sw-g1", "sw-g2", "sw-g3", "sw-g4", "sw-g5", "sw-g6"].map(img),
    facts: [
      { value: "0%", label: "مقدم" },
      { value: "10", label: "سنوات تقسيط" },
      { value: "5", label: "أنواع وحدات" },
      { value: "15 د", label: "من محور 26 يوليو" },
      { value: "15 د", label: "من ميدان جهينة" },
      { value: "11 م", label: "سعر البداية" },
    ],
    about: [
      "سولانا ويست مشروع أورا في نيو زايد، بين محور الضبعة والطريق الدائري الأوسط، وعلى بُعد نحو 15 دقيقة من محور 26 يوليو وميدان جهينة.",
      "المشروع يقدّم أنواعًا متعددة من الوحدات: شقق غرفتين و3 غرف، تاون هاوس، توين هاوس، وڤيلات مستقلة، حول حدائق داخلية وكلوب هاوس ومنطقة تجارية.",
      "كل الوحدات المتاحة بتشطيب Core & Shell، بدون مقدم وتقسيط على 10 سنوات.",
    ],
    types: ["شقق", "تاون هاوس", "توين هاوس", "ڤيلات"],
    downLabel: "0%",
    yearsLabel: "10 سنوات",
    distances: [
      ["15 دقيقة", "محور 26 يوليو"],
      ["15 دقيقة", "ميدان جهينة"],
      ["20 دقيقة", "ZED Park"],
      ["6 دقائق", "وصلة دهشور"],
    ],
    nearby: ["محور الضبعة", "الطريق الدائري الأوسط", "مطار سفنكس", "وصلة دهشور"],
    mapQuery: "Solana West ORA New Zayed",
    phases: [
      {
        id: "apartments",
        name: "شقق سولانا ويست",
        en: "Apartments",
        tag: "بدون مقدم",
        intro: "شقق غرفتين و3 غرف نوم بتشطيب Core & Shell.",
        plan: "بدون مقدم، وتقسيط على 10 سنوات",
        down: 0,
        years: 10,
        finish: "Core & Shell",
        image: img("sw-g5"),
        units: [
          { type: "شقة غرفتين", spec: "88 م²", price: 11_000_000, image: img("sw-g5") },
          { type: "شقة 3 غرف", spec: "131 م²", price: 14_100_000, image: img("sw-g6") },
        ],
      },
      {
        id: "villas",
        name: "ڤيلات سولانا ويست",
        en: "Villas",
        tag: "بدون مقدم",
        intro: "تاون هاوس وتوين هاوس وڤيلات مستقلة بتشطيب Core & Shell.",
        plan: "بدون مقدم، وتقسيط على 10 سنوات",
        down: 0,
        years: 10,
        finish: "Core & Shell",
        image: img("sw-card"),
        units: [
          { type: "تاون هاوس", spec: "172 م²", price: 22_500_000, image: img("sw-u-town") },
          { type: "توين هاوس", spec: "184 م²", price: 28_000_000, image: img("sw-u-twin") },
          { type: "ڤيلا مستقلة", spec: "195 م²", price: 31_500_000, image: img("sw-u-villa") },
        ],
      },
    ],
  },

  /* ───────────── SILVERSANDS ───────────── */
  {
    slug: "silversands",
    name: "سيلڤر ساندس",
    en: "Silversands",
    region: "coast",
    city: "الساحل الشمالي",
    place: "سيدي حنيش — الساحل الشمالي",
    tagline: "وجهة أورا على الساحل الشمالي: أكثر من كيلومتر شاطئ ورمال بيضاء وبحيرات.",
    hero: img("ss-hero"),
    card: img("ss-card"),
    aboutImage: img("ss-about"),
    gallery: ["ss-g1", "ss-g2", "ss-g3", "ss-g4", "ss-g5", "ss-g6"].map(img),
    facts: [
      { value: "506", label: "فدان مساحة المشروع" },
      { value: "+1 كم", label: "واجهة شاطئية" },
      { value: "5", label: "أنواع وحدات" },
      { value: "سيدي حنيش", label: "الساحل الشمالي" },
    ],
    about: [
      "سيلڤر ساندس وجهة أورا الساحلية في سيدي حنيش بالساحل الشمالي، على مساحة 506 فدان وبواجهة شاطئية تتجاوز الكيلومتر من الرمال البيضاء.",
      "المشروع يضم ڤيلات وتاون هاوس وتوين هاوس وشاليهات وشققًا، مع فنادق بوتيك وبحيرات ومرافق ترفيهية تجعله وجهة طوال العام وليس للصيف فقط.",
      "الأسعار وأنظمة السداد تختلف حسب المرحلة — اطلب آخر متاح من مستشار المبيعات.",
    ],
    types: ["شاليهات", "تاون هاوس", "توين هاوس", "ڤيلات"],
    downLabel: "عند الطلب",
    yearsLabel: "عند الطلب",
    distances: [
      ["سيدي حنيش", "الموقع"],
      ["+1 كم", "واجهة على البحر"],
      ["قريب من", "ألماظة باي"],
      ["الساحل الشمالي", "طريق الإسكندرية — مطروح"],
    ],
    nearby: ["سيدي حنيش", "ألماظة باي", "رأس الحكمة", "مطروح"],
    mapQuery: "Silversands North Coast ORA Sidi Heneish",
    priceNote: "أسعار سيلڤر ساندس تختلف حسب المرحلة وتُرسل عند الطلب.",
    phases: [
      {
        id: "main",
        name: "سيلڤر ساندس",
        en: "Silversands",
        intro: "شاليهات وتاون هاوس وتوين هاوس وڤيلات مستقلة قريبة من البحر والبحيرات.",
        plan: "نظام السداد حسب المرحلة — يُرسل عند الطلب",
        down: 0,
        years: 0,
        finish: "حسب المرحلة",
        image: img("ss-card"),
        units: [
          { type: "شاليه", spec: "قريب من البحيرات", price: null, image: img("ss-g4") },
          { type: "تاون هاوس", spec: "حديقة خاصة", price: null, image: img("ss-about") },
          { type: "توين هاوس", spec: "حديقة خاصة", price: null, image: img("ss-g3") },
          { type: "ڤيلا مستقلة", spec: "صفوف أولى على البحر", price: null, image: img("ss-g2") },
        ],
      },
    ],
  },
];

/* ───────────── Helpers ───────────── */
export const projectOf = (slug: string) => PROJECTS.find((p) => p.slug === slug)!;

/** 13500000 → "13.5" */
export const fmtM = (n: number) => String(Number((n / 1e6).toFixed(2)));
export const fmt = (n: number) => n.toLocaleString("en-US");

export const minPriceOf = (p: Project) => {
  const xs = p.phases.flatMap((ph) => ph.units.map((u) => u.price)).filter((x): x is number => x != null);
  return xs.length ? Math.min(...xs) : null;
};

export const MIN_PRICE = Math.min(
  ...PROJECTS.map(minPriceOf).filter((x): x is number => x != null),
);

export type FlatUnit = Unit & {
  key: string;
  project: string;
  projectName: string;
  projectEn: string;
  phaseId: string;
  phase: string;
  phaseEn: string;
  plan: string;
  finish: string;
};

export const ALL_UNITS: FlatUnit[] = PROJECTS.flatMap((p) =>
  p.phases.flatMap((ph) =>
    ph.units.map((u, i) => ({
      ...u,
      key: `${p.slug}-${ph.id}-${i}`,
      project: p.slug,
      projectName: p.name,
      projectEn: p.en,
      phaseId: ph.id,
      phase: ph.name,
      phaseEn: ph.en,
      plan: ph.plan,
      finish: ph.finish,
    })),
  ),
);

export const DEVELOPER = [
  "أورا للتطوير العقاري (ORA Developers) أسسها المهندس نجيب ساويرس، ومن أقوى الأسماء في السوق المصري.",
  "تضم محفظتها في مصر: ZED في الشيخ زايد، زد إيست في القاهرة الجديدة، سولانا في نيو زايد، سولانا إيست في التجمع الخامس، وسيلڤر ساندس في الساحل الشمالي، إلى جانب مشاريع خارج مصر.",
];
