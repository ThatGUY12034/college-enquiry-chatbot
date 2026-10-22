/* CampusAsk chatbot: matches questions to the knowledge base and renders the chat and NLP inspector. */
(function () {
  "use strict";

  const ANSWER_THRESHOLD = 0.3; // minimum cosine similarity for a confident answer
  const SUGGEST_THRESHOLD = 0.12; // below this the question is treated as unknown

  const intents = new Map(window.KNOWLEDGE.map((k) => [k.id, k]));
  const index = new NLP.TfidfIndex(
    window.KNOWLEDGE.flatMap((k) => k.patterns.map((p) => ({ id: k.id, text: p + " " + k.label })))
  );

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const timeNow = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  /** Classifies a question; returns the best intent, ranked alternatives and the NLP trace. */
  function understand(question) {
    const trace = NLP.preprocess(question);
    const best = new Map(); // best score per intent across its patterns
    index.search(trace.stems).forEach((r) => {
      if (!best.has(r.id) || best.get(r.id) < r.score) best.set(r.id, r.score);
    });
    const ranked = [...best].map(([id, score]) => ({ id, score })).sort((a, b) => b.score - a.score);
    const top = ranked[0];
    let status = "unknown";
    if (top && top.score >= ANSWER_THRESHOLD) status = "answered";
    else if (top && top.score >= SUGGEST_THRESHOLD) status = "suggest";
    return { trace, ranked: ranked.filter((r) => r.score > 0).slice(0, 4), top, status };
  }

  function reply(result) {
    const { top, ranked, status } = result;
    if (status === "answered") return { text: intents.get(top.id).answer, meta: `${intents.get(top.id).label} · ${(top.score * 100).toFixed(0)}% match` };
    if (status === "suggest") {
      const opts = ranked.filter((r) => r.score >= SUGGEST_THRESHOLD).slice(0, 3);
      return {
        text: "I'm not completely sure what you mean. Did you want to know about one of these?",
        options: opts.map((r) => intents.get(r.id).label),
        meta: "Low confidence",
      };
    }
    return {
      text: "Sorry, I couldn't understand that question. I can help with courses, admissions, eligibility, fees, scholarships, placements, exams, hostel, library and campus facilities.",
      options: ["Courses offered", "Admission process", "Fees", "Placements"],
      meta: "No match",
    };
  }

  // ------------------------------------------------------------ rendering
  function addMessage(who, text, extra = {}) {
    const wrap = document.createElement("div");
    wrap.className = `msg ${who}`;
    let html = `<div class="bubble">${esc(text)}`;
    if (extra.options) {
      html += `<div class="opt-row">${extra.options.map((o) => `<button type="button" class="opt" data-ask="${esc(o)}">${esc(o)}</button>`).join("")}</div>`;
    }
    html += `</div><div class="meta">${extra.meta ? esc(extra.meta) + " · " : ""}${timeNow()}</div>`;
    wrap.innerHTML = html;
    $("#messages").appendChild(wrap);
    wrap.querySelectorAll("[data-ask]").forEach((b) => (b.onclick = () => ask(b.dataset.ask)));
    $("#messages").scrollTop = $("#messages").scrollHeight;
  }

  function showTyping() {
    const el = document.createElement("div");
    el.className = "msg bot typing";
    el.innerHTML = '<div class="bubble"><span></span><span></span><span></span></div>';
    $("#messages").appendChild(el);
    $("#messages").scrollTop = $("#messages").scrollHeight;
    return el;
  }

  function chips(el, items, cls = "") {
    el.innerHTML = items.length
      ? items.map((t) => `<span class="chip ${typeof t === "object" ? t.cls : cls}">${esc(typeof t === "object" ? t.text : t)}</span>`).join("")
      : '<span class="muted">(none)</span>';
  }

  function renderInspector(result) {
    const { trace, ranked, status, top } = result;
    $("#inspectorEmpty").hidden = true;
    $("#inspector").hidden = false;
    chips($("#stTokens"), trace.tokens);
    const kept = new Set(trace.filtered);
    chips(
      $("#stFiltered"),
      trace.normalized.map((t, i) => ({
        text: t !== trace.tokens[i] ? `${trace.tokens[i]} → ${t}` : t,
        cls: kept.has(t) ? (t !== trace.tokens[i] ? "syn" : "keep") : "drop",
      }))
    );
    chips($("#stStems"), trace.stems, "stem");
    $("#stScores").innerHTML = ranked.length
      ? ranked
          .map(
            (r, i) => `<div class="score-row ${i === 0 && status === "answered" ? "win" : ""}">
              <span class="score-label">${esc(intents.get(r.id).label)}</span>
              <span class="bar"><i style="width:${Math.max(2, r.score * 100)}%"></i></span>
              <span class="score-val">${r.score.toFixed(3)}</span></div>`
          )
          .join("")
      : '<span class="muted">No known terms in the question.</span>';
    const decisions = {
      answered: `Matched <b>${esc(intents.get(top.id).label)}</b> (similarity ${top.score.toFixed(3)} ≥ ${ANSWER_THRESHOLD})`,
      suggest: `Best similarity ${top ? top.score.toFixed(3) : "0"} is below ${ANSWER_THRESHOLD}, so the bot asks for clarification`,
      unknown: `No intent reached ${SUGGEST_THRESHOLD}, so the fallback reply is used`,
    };
    $("#stDecision").className = `decision ${status}`;
    $("#stDecision").innerHTML = decisions[status];
  }

  function ask(question) {
    const q = question.trim();
    if (!q) return;
    addMessage("user", q);
    $("#question").value = "";
    const result = understand(q);
    renderInspector(result);
    const typing = showTyping();
    setTimeout(() => {
      typing.remove();
      const r = reply(result);
      addMessage("bot", r.text, r);
    }, 450);
  }

  function greet() {
    $("#messages").innerHTML = "";
    addMessage("bot", "Hi! I'm CampusAsk, your college enquiry assistant. Type a question or pick a topic below to get started.");
  }

  // ------------------------------------------------------------ init
  $("#topics").innerHTML = window.QUICK_TOPICS.map(([label, q]) => `<button type="button" class="topic" data-ask="${esc(q)}">${esc(label)}</button>`).join("");
  $("#topics").querySelectorAll("[data-ask]").forEach((b) => (b.onclick = () => ask(b.dataset.ask)));
  $("#chatForm").onsubmit = (e) => {
    e.preventDefault();
    ask($("#question").value);
  };
  $("#clearBtn").onclick = () => {
    greet();
    $("#inspector").hidden = true;
    $("#inspectorEmpty").hidden = false;
  };
  const patterns = window.KNOWLEDGE.reduce((n, k) => n + k.patterns.length, 0);
  $("#kbStats").innerHTML = `<div><b>${window.KNOWLEDGE.length}</b><span>intents</span></div><div><b>${patterns}</b><span>training questions</span></div><div><b>${index.vocabulary}</b><span>vocabulary terms</span></div>`;
  greet();

  window.CampusAsk = { understand }; // exposed for testing in the console
})();
