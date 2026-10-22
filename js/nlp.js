/* NLP engine: tokenization, stop-word removal, Porter stemming, TF-IDF and cosine similarity. */
(function (global) {
  "use strict";

  const STOP_WORDS = new Set(
    ("a an the is are was were be been being am do does did doing have has had having i me my we our you your " +
      "he she it its they them their this that these those of in on at to for from by with about as into over " +
      "and or but if then so than too very can could would should will shall may might must just also please " +
      "what which who whom whose when where why how there here any some all each every more most other such " +
      "tell know want need like get give let us me okay ok hi hello hey").split(" ")
  );
  // Small greeting/closing words are kept for intent matching even though they look like stop words.
  const KEEP = new Set(["hi", "hello", "hey", "thank", "thanks", "bye", "goodbye", "how", "when", "where"]);

  // Map informal words and abbreviations to one canonical term before stemming.
  const SYNONYMS = {
    fee: "fees", cost: "fees", charges: "fees", tuition: "fees", price: "fees", payment: "fees",
    admission: "admissions", admit: "admissions", enroll: "admissions", enrol: "admissions", apply: "admissions", application: "admissions",
    course: "courses", branch: "courses", branches: "courses", program: "courses", programme: "courses", degree: "courses", stream: "courses",
    btech: "engineering",
    job: "placements", jobs: "placements", placement: "placements", recruit: "placements", recruiters: "placements", recruitment: "placements", package: "placements", salary: "placements", internship: "internships",
    exam: "examinations", exams: "examinations", examination: "examinations", test: "examinations", sem: "semester",
    hostel: "accommodation", hostels: "accommodation", room: "accommodation", stay: "accommodation", pg: "accommodation",
    scholarship: "scholarships", freeship: "scholarships", financial: "scholarships", stipend: "scholarships",
    books: "library", book: "library",
    bus: "transport", buses: "transport", travel: "transport", station: "transport",
    timing: "timings", time: "timings", hours: "timings", schedule: "timings",
    phone: "contact", email: "contact", number: "contact", address: "contact", call: "contact",
    doc: "documents", docs: "documents", certificates: "documents", certificate: "documents",
    club: "clubs", fest: "events", festival: "events", event: "events",
    cet: "entrance", mhtcet: "entrance", jee: "entrance", cutoff: "entrance", rank: "entrance", percentile: "entrance",
    food: "canteen", mess: "canteen", cafeteria: "canteen",
    gym: "sports", games: "sports", ground: "sports",
    attend: "attendance", absent: "attendance", leave: "attendance",
    thx: "thanks", ty: "thanks", thankyou: "thanks",
  };

  // ------------------------------------------------------------ Porter stemmer (M. F. Porter, 1980)
  const step2list = { ational: "ate", tional: "tion", enci: "ence", anci: "ance", izer: "ize", bli: "ble", alli: "al",
    entli: "ent", eli: "e", ousli: "ous", ization: "ize", ation: "ate", ator: "ate", alism: "al", iveness: "ive",
    fulness: "ful", ousness: "ous", aliti: "al", iviti: "ive", biliti: "ble", logi: "log" };
  const step3list = { icate: "ic", ative: "", alize: "al", iciti: "ic", ical: "ic", ful: "", ness: "" };
  const c = "[^aeiou]", v = "[aeiouy]", C = c + "[^aeiouy]*", V = v + "[aeiou]*";
  const mgr0 = new RegExp("^(" + C + ")?" + V + C), meq1 = new RegExp("^(" + C + ")?" + V + C + "(" + V + ")?$");
  const mgr1 = new RegExp("^(" + C + ")?" + V + C + V + C), sV = new RegExp("^(" + C + ")?" + v);

  function stem(w) {
    if (w.length < 3) return w;
    let re, re2, re3, re4, fp, firstch = w[0];
    if (firstch === "y") w = "Y" + w.slice(1);
    re = /^(.+?)(ss|i)es$/; re2 = /^(.+?)([^s])s$/;
    if (re.test(w)) w = w.replace(re, "$1$2"); else if (re2.test(w)) w = w.replace(re2, "$1$2");
    re = /^(.+?)eed$/; re2 = /^(.+?)(ed|ing)$/;
    if (re.test(w)) { fp = re.exec(w); if (mgr0.test(fp[1])) w = w.slice(0, -1); }
    else if (re2.test(w)) {
      fp = re2.exec(w);
      if (sV.test(fp[1])) {
        w = fp[1];
        re2 = /(at|bl|iz)$/; re3 = /([^aeiouylsz])\1$/; re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
        if (re2.test(w)) w += "e"; else if (re3.test(w)) w = w.slice(0, -1); else if (re4.test(w)) w += "e";
      }
    }
    re = /^(.+?)y$/;
    if (re.test(w)) { fp = re.exec(w); if (sV.test(fp[1])) w = fp[1] + "i"; }
    re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
    if (re.test(w)) { fp = re.exec(w); if (mgr0.test(fp[1])) w = fp[1] + step2list[fp[2]]; }
    re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
    if (re.test(w)) { fp = re.exec(w); if (mgr0.test(fp[1])) w = fp[1] + step3list[fp[2]]; }
    re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/; re2 = /^(.+?)(s|t)(ion)$/;
    if (re.test(w)) { fp = re.exec(w); if (mgr1.test(fp[1])) w = fp[1]; }
    else if (re2.test(w)) { fp = re2.exec(w); if (mgr1.test(fp[1] + fp[2])) w = fp[1] + fp[2]; }
    re = /^(.+?)e$/;
    if (re.test(w)) {
      fp = re.exec(w); re2 = new RegExp("^" + C + v + "[^aeiouwxy]$");
      if (mgr1.test(fp[1]) || (meq1.test(fp[1]) && !re2.test(fp[1]))) w = fp[1];
    }
    if (/ll$/.test(w) && mgr1.test(w)) w = w.slice(0, -1);
    if (firstch === "y") w = "y" + w.slice(1);
    return w;
  }

  // ------------------------------------------------------------ preprocessing pipeline
  function tokenize(text) {
    return text.toLowerCase().replace(/[’']/g, "").match(/[a-z0-9]+/g) || [];
  }

  function preprocess(text) {
    const tokens = tokenize(text);
    const normalized = tokens.map((t) => SYNONYMS[t] || t);
    const filtered = normalized.filter((t) => KEEP.has(t) || !STOP_WORDS.has(t));
    const stems = filtered.map(stem);
    return { tokens, normalized, filtered, stems };
  }

  // ------------------------------------------------------------ TF-IDF vector space model
  class TfidfIndex {
    constructor(docs) {
      // docs: [{ id, text }]
      this.docs = docs.map((d) => ({ id: d.id, terms: preprocess(d.text).stems }));
      const df = new Map();
      this.docs.forEach((d) => new Set(d.terms).forEach((t) => df.set(t, (df.get(t) || 0) + 1)));
      const N = this.docs.length;
      this.idf = new Map([...df].map(([t, n]) => [t, Math.log((N + 1) / (n + 1)) + 1])); // smoothed IDF
      this.vectors = this.docs.map((d) => this.vectorize(d.terms));
      this.vocabulary = df.size;
    }

    vectorize(terms) {
      const tf = new Map();
      terms.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));
      const vec = new Map();
      let norm = 0;
      tf.forEach((count, t) => {
        if (!this.idf.has(t)) return; // unknown words carry no weight
        const w = (count / terms.length) * this.idf.get(t);
        vec.set(t, w);
        norm += w * w;
      });
      return { vec, norm: Math.sqrt(norm) };
    }

    static cosine(a, b) {
      if (!a.norm || !b.norm) return 0;
      let dot = 0;
      const [small, large] = a.vec.size < b.vec.size ? [a.vec, b.vec] : [b.vec, a.vec];
      small.forEach((w, t) => { if (large.has(t)) dot += w * large.get(t); });
      return dot / (a.norm * b.norm);
    }

    /** Returns documents ranked by cosine similarity to the query. */
    search(stems) {
      const q = this.vectorize(stems);
      return this.vectors
        .map((v, i) => ({ id: this.docs[i].id, score: TfidfIndex.cosine(q, v) }))
        .sort((a, b) => b.score - a.score);
    }
  }

  global.NLP = { STOP_WORDS, SYNONYMS, stem, tokenize, preprocess, TfidfIndex };
})(window);
