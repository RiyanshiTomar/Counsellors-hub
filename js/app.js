/* ============================================================
   GEW Counsellor Hub — app
   Hash router + views. No build step: deploy the folder as-is.
   ============================================================ */
(function () {
  "use strict";

  var CFG = window.GEW_CONFIG, D = window.GEW_DATA, T = window.GEW_TRAINING;
  var view = document.getElementById("view");

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var examById = {}, catById = {}, stateById = {};
  D.exams.forEach(function (e) { examById[e.id] = e; });
  D.categories.forEach(function (c) { catById[c.id] = c; });
  D.states.forEach(function (s) { stateById[s.id] = s; });

  var EDU = { 1: "10th pass", 2: "12th pass", 3: "Graduate" };
  var ICON = {
    pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    medal: '<circle cx="12" cy="9" r="5"/><path d="M9 13.5L7.5 21 12 18.5 16.5 21 15 13.5"/>',
    screen: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    book: '<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5zM4 19a2 2 0 012-2h13"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM17 5h3v2a3 3 0 01-3 3M7 5H4v2a3 3 0 003 3"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.01"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 012-2h9"/>',
    link: '<path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h4"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };
  function svg(name, cls) { return '<svg class="ico' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" aria-hidden="true">' + ICON[name] + "</svg>"; }

  var toastTimer;
  function toast(msg) {
    var t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }
  function copyText(text, okMsg) {
    function done() { toast(okMsg || "Copied"); }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else { fallback(); }
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { toast("Copy failed — select the text manually"); }
      document.body.removeChild(ta);
    }
  }
  function catOf(e) { return catById[e.cat]; }
  function verifyBadge(e) { return e.status && e.status.verify ? '<span class="badge verify" title="Confirm on the official site before quoting">Verify</span>' : ""; }
  function ageShort(e) {
    if (e.ageMin && e.ageMax) return e.ageMin + "–" + e.ageMax + " yrs";
    return "Age: see notification";
  }

  /* ---------- exam card ---------- */
  function examCard(e, extra) {
    var st = e.state ? '<span class="xstate">' + esc(stateById[e.state].name) + "</span>" : "";
    return '<a class="xcard tone-' + e.cat + '" href="#/e/' + e.id + '">' +
      '<div class="xcard-top"><h3>' + esc(e.name) + "</h3>" + verifyBadge(e) + "</div>" +
      st + '<p class="xfull">' + esc(e.full) + "</p>" +
      '<div class="xmeta"><span class="chip">' + esc(e.level) + '</span><span class="chip">' + esc(ageShort(e)) + "</span>" + (extra || "") + "</div></a>";
  }

  /* ---------- router ---------- */
  function parseHash() {
    var h = location.hash.replace(/^#\/?/, "");
    var bits = h.split("?"), path = bits[0], qs = bits[1] || "";
    var q = {}; qs.split("&").forEach(function (kv) { if (!kv) return; var p = kv.split("="); q[decodeURIComponent(p[0])] = decodeURIComponent((p[1] || "").replace(/\+/g, " ")); });
    return { parts: path.split("/").filter(Boolean), q: q };
  }
  function setNav(key) {
    $$("[data-nav]").forEach(function (a) { var on = a.getAttribute("data-nav") === key; a.classList.toggle("on", on); if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  }
  var carTimer = null;
  function route() {
    clearInterval(carTimer);
    var r = parseHash(), p = r.parts;
    $("#top").classList.remove("search-open");
    closeSugg();
    if (!p.length) { setNav("home"); return viewHome(); }
    if (p[0] === "c" && catById[p[1]]) { setNav("c"); return viewCategory(p[1], r.q); }
    if (p[0] === "e" && examById[p[1]]) { setNav("c"); return viewExam(p[1], r.q); }
    if (p[0] === "finder") { setNav("finder"); return viewFinder(r.q); }
    if (p[0] === "selections") { setNav("selections"); return viewSelections(); }
    if (p[0] === "vacancies") { setNav("vacancies"); return viewVacancies(); }
    if (p[0] === "training") { setNav("training"); return viewTraining(); }
    setNav(""); notFound();
  }
  function mount(html, title, noScroll) {
    view.innerHTML = html;
    document.title = (title ? title + " — " : "") + "Govt Exam Wallah Counsellor Hub";
    if (!noScroll) { window.scrollTo(0, 0); }
  }
  function notFound() {
    mount('<div class="wrap sec"><div class="empty"><b>Page not found</b>That link does not match any page. <a href="#/">Go to home</a>.</div></div>', "Not found");
  }

  /* ============================================================
     HOME
     ============================================================ */
  function viewHome() {
    var counts = {}; D.exams.forEach(function (e) { counts[e.cat] = (counts[e.cat] || 0) + 1; });
    var total = D.exams.length;
    var byCat = function (c, n) { return D.exams.filter(function (e) { return e.cat === c; }).slice(0, n).map(function (e) { return '<span class="chip">' + esc(e.name) + "</span>"; }).join(""); };

    var slides = [
      '<div class="slide"><div class="dslide d-hero"><div class="hero-l"><h3>Counsellor Training Hub</h3><p class="hero-sub">Every exam, its eligibility and its pattern, ready before the student walks in.</p><span class="pill-saf">SSC, Banking, Railways &amp; State Exams</span></div><img class="hero-photo" src="assets/mentor.png" alt="" width="172" height="172"><div class="hero-r"><div class="logo-card"><img src="assets/logo-full.png" alt="Govt Exam Wallah" width="260" height="55"><span>Powered by Physics Wallah</span></div><p class="hero-line">' + esc(CFG.centres) + ' centres &nbsp;|&nbsp; ' + esc(CFG.selections) + ' selections</p><a class="hero-call" href="tel:+91' + esc(CFG.helpline) + '">Helpline: ' + esc(CFG.helpline) + '</a></div></div></div>',
      '<div class="slide"><div class="dslide d-bank"><h3>Banking &amp; Insurance</h3><p>' + counts.banking + ' exams: IBPS, SBI, RBI, LIC and NICL, with patterns and 2026–27 dates.</p><div class="chips">' + byCat("banking", 6) + '</div><a class="btn saf sm" href="#/c/banking">See banking exams</a></div></div>',
      '<div class="slide"><div class="dslide d-rail"><h3>Railways (RRB)</h3><p>NTPC, Group D, ALP &amp; Technician and station-side posts, with stages and physical standards.</p><div class="chips">' + byCat("railways", 4) + '</div><a class="btn sm" href="#/c/railways">See railway exams</a></div></div>',
      '<div class="slide"><div class="dslide d-state"><h3>State-Level Exams</h3><p>' + counts.state + ' exams across ' + D.states.length + ' states: police, revenue, clerical and panchayat posts.</p><div class="chips">' + D.states.slice(0, 6).map(function (s) { return '<span class="chip">' + esc(s.name) + "</span>"; }).join("") + '<span class="chip">+5 more</span></div><a class="btn saf sm" href="#/c/state">See state exams</a></div></div>'
    ];

    var tiles = D.categories.map(function (c) {
      var n = counts[c.id] || 0;
      var sub = c.id === "state" ? n + " exams in " + D.states.length + " states" : n + " exams";
      return '<a class="tile tone-' + c.id + '" href="#/c/' + c.id + '"><div class="tile-h"><h3>' + esc(c.name) + "</h3><span>" + sub + '</span></div><div class="tile-b"><p>' + esc(c.blurb) + '</p><div class="chips">' + byCat(c.id, 4) + '</div><span class="tile-go">Open ' + svg("arrow") + "</span></div></a>";
    }).join("");


    mount(
      '<section class="hero"><div class="wrap hero-in">' +
        '<div class="hero-copy"><h1>Know the exam before you counsel</h1>' +
        '<p class="lead">Eligibility, patterns, dates and talking points for SSC, Banking, Railways and ' + D.states.length + ' state exam families, in one place.</p>' +
        '<div class="cta"><a class="btn saf" href="#/finder">Find an exam for a student</a><a class="btn ghost" href="#/c/ssc">Browse all ' + total + ' exams</a></div></div>' +
        '<div class="car" id="car" aria-roledescription="carousel" aria-label="Featured"><div class="car-track" id="carTrack">' + slides.join("") + '</div><div class="dots" id="dots"></div></div>' +
      "</div></section>" +

      '<div class="wrap"><div class="stats">' +
        '<div class="stat">' + svg("pin") + "<div><b>" + esc(CFG.centres) + "</b><span>Centres</span></div></div>" +
        '<div class="stat">' + svg("medal") + "<div><b>" + esc(CFG.selections) + "</b><span>Selections</span></div></div>" +
        '<div class="stat">' + svg("screen") + "<div><b>Smart</b><span>Classrooms</span></div></div>" +
        '<div class="stat">' + svg("book") + "<div><b>" + total + "</b><span>Exams covered</span></div></div>" +
      "</div></div>" +

      '<section class="wrap sec"><div class="sec-h"><h2>Explore by exam</h2><p>Pick a family to see every exam inside it.</p></div><div class="tiles">' + tiles + "</div></section>" +

      '<section class="wrap sec"><div class="sec-h"><h2>Counsellor tools</h2></div><div class="tools">' +
        '<a class="tool" href="#/finder">' + svg("target") + "<div><h3>Eligibility Finder</h3><p>Enter qualification, age and category. Get the exams the student can apply for.</p></div></a>" +
        '<a class="tool" href="#/selections">' + svg("trophy") + "<div><h3>Selections</h3><p>Show students the Govt Exam Wallah results, filterable by exam.</p></div></a>" +
        '<a class="tool" href="#/training">' + svg("book") + "<div><h3>Training playbook</h3><p>Counselling flow, discovery questions and scripts for common objections.</p></div></a>" +
      "</div></section>" +

      '<section class="wrap sec"><div class="sec-h"><h2>Coming up</h2><p>Next dates from the official exam calendars.</p></div><ol class="up" id="upList"><li class="up-load">Loading dates…</li></ol>' +
      '<p class="note">As of <span id="upAsOf">' + esc(CFG.lastUpdated) + '</span>. Past dates hide automatically. Calendar dates are tentative until the exam notice. <span class="badge verify sm">Verify</span> on ssc.gov.in or ibps.in before quoting.</p></section>',
      ""
    );

    loadUpcoming();
    initCarousel();
  }

  function todayISO() { var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  function csvRows(text) {
    var rows = [], row = [], cur = "", q = false, i, ch;
    text = text.replace(/^\uFEFF/, "");
    for (i = 0; i < text.length; i++) {
      ch = text[i];
      if (q) { if (ch === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += ch; }
      else if (ch === '"') q = true;
      else if (ch === ",") { row.push(cur); cur = ""; }
      else if (ch === "\n" || ch === "\r") { if (ch === "\r" && text[i + 1] === "\n") i++; row.push(cur); rows.push(row); row = []; cur = ""; }
      else cur += ch;
    }
    if (cur.length || row.length) { row.push(cur); rows.push(row); }
    return rows;
  }
  var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function whenText(s, e) {
    var a = s.split("-"), b = (e || s).split("-");
    var f = function (p) { return +p[2] + " " + MON[+p[1] - 1] + " " + p[0]; };
    return s === (e || s) ? f(a) : f(a) + " – " + f(b);
  }
  function sheetItems(txt) {
    var rows = csvRows(txt).filter(function (r) { return r.some(function (c) { return String(c).trim(); }); });
    if (rows.length < 2) throw new Error("empty");
    var h = rows[0].map(function (c) { return String(c).trim().toLowerCase(); });
    var ix = function (n) { return h.indexOf(n); };
    var iso = /^\d{4}-\d{2}-\d{2}$/;
    return rows.slice(1).map(function (r) {
      var g = function (n) { var k = ix(n); return k < 0 ? "" : String(r[k] || "").trim(); };
      var st = g("start"), en = g("end") || st;
      if (!iso.test(st) || !iso.test(en)) return null;
      return { start: st, end: en, when: g("when") || whenText(st, en), title: g("title"), id: g("examid"), tentative: /^(y|yes|true|1)$/i.test(g("tentative")) };
    }).filter(function (x) { return x && x.title; });
  }
  function paintUpcoming(items, updated) {
    var box = $("#upList"); if (!box) return;
    var t = todayISO();
    var list = items.filter(function (u) { return (u.end || u.start) >= t; }).sort(function (x, y) { return x.start < y.start ? -1 : 1; });
    if (updated && $("#upAsOf")) $("#upAsOf").textContent = updated;
    box.innerHTML = list.length ? list.map(function (u) {
      var inner = '<span class="when">' + esc(u.when) + '</span><span class="what">' + esc(u.title) + (u.tentative ? ' <span class="badge verify sm">Tentative</span>' : "") + "</span>";
      return "<li>" + (u.id && examById[u.id] ? '<a href="#/e/' + esc(u.id) + '">' + inner + "</a>" : '<a href="#/c/ssc" onclick="return false" style="cursor:default">' + inner + "</a>") + "</li>";
    }).join("") : '<li class="up-load">Abhi koi naya date listed nahi hai. Official calendar check karo: ssc.gov.in, ibps.in, rrbapply.gov.in.</li>';
  }
  function loadUpcoming() {
    if (!$("#upList")) return;
    function fromFile() {
      return fetch("data/upcoming.json", { cache: "no-cache" }).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
        .then(function (j) { paintUpcoming(j.items || [], j.updated); })
        .catch(function () { var b = $("#upList"); if (b) b.innerHTML = '<li class="up-load">Dates abhi load nahi ho paaye. Official calendar check karo: ssc.gov.in, ibps.in.</li>'; });
    }
    var sid = CFG.upcomingSheetId;
    if (!sid) return fromFile();
    var url = "https://docs.google.com/spreadsheets/d/" + sid + "/gviz/tq?tqx=out:csv" + (CFG.upcomingSheetTab ? "&sheet=" + encodeURIComponent(CFG.upcomingSheetTab) : "");
    fetch(url, { cache: "no-store" }).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
      .then(function (txt) { if (/^\s*</.test(txt)) throw new Error("not public"); var it = sheetItems(txt); if (!it.length) throw new Error("no rows"); paintUpcoming(it, "live from sheet"); })
      .catch(fromFile);
  }

  function initCarousel() {
    var track = $("#carTrack"), dotsBox = $("#dots");
    var slides = $$(".slide", track), idx = 0;
    dotsBox.innerHTML = slides.map(function (_, i) { return '<button type="button" aria-label="Show slide ' + (i + 1) + '"' + (i === 0 ? ' aria-current="true"' : "") + "></button>"; }).join("");
    var dots = $$("button", dotsBox);
    function go(i) { idx = (i + slides.length) % slides.length; track.scrollTo({ left: slides[idx].offsetLeft, behavior: "smooth" }); }
    dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); }); });
    track.addEventListener("scroll", function () {
      var i = Math.round(track.scrollLeft / track.clientWidth);
      if (i !== idx || !dots[i].hasAttribute("aria-current")) {
        idx = i; dots.forEach(function (d, k) { if (k === i) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
      }
    }, { passive: true });
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    var paused = false;
    ["mouseenter", "focusin", "touchstart"].forEach(function (ev) { $("#car").addEventListener(ev, function () { paused = true; }, { passive: true }); });
    ["mouseleave", "focusout"].forEach(function (ev) { $("#car").addEventListener(ev, function () { paused = false; }); });
    carTimer = setInterval(function () { if (!paused && !document.hidden) go(idx + 1); }, 6500);
  }

  /* ---------- lightbox ---------- */
  function openLightbox(src, alt) {
    var lb = $("#lightbox"); $("#lbImg").src = src; $("#lbImg").alt = alt || "";
    lb.hidden = false; document.body.style.overflow = "hidden"; $("#lbClose").focus();
  }
  function closeLightbox() { $("#lightbox").hidden = true; document.body.style.overflow = ""; }
  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lightbox").addEventListener("click", function (e) { if (e.target === this) closeLightbox(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { if (!$("#lightbox").hidden) closeLightbox(); closeSugg(); } });

  /* ============================================================
     CATEGORY
     ============================================================ */
  function viewCategory(id, q) {
    var c = catById[id], list = D.exams.filter(function (e) { return e.cat === id; });
    var stateId = id === "state" && stateById[q.state] ? q.state : "";
    var pills = "";
    if (id === "state") {
      pills = '<div class="pills" role="group" aria-label="Filter by state"><a class="pill' + (stateId ? "" : " on") + '" href="#/c/state">All states</a>' +
        D.states.map(function (s) {
          var n = list.filter(function (e) { return e.state === s.id; }).length;
          return '<a class="pill' + (stateId === s.id ? " on" : "") + '" href="#/c/state?state=' + s.id + '">' + esc(s.name) + " (" + n + ")</a>";
        }).join("") + "</div>";
    }
    mount(
      '<section class="phead tone-' + id + '"><div class="wrap"><div class="crumbs"><a href="#/">Home</a><span>/</span><span>' + esc(c.name) + "</span></div>" +
      "<h1>" + esc(c.name) + "</h1><p>" + esc(c.blurb) + '.</p>' +
      '<div class="chips"><span class="chip on-dark">' + list.length + " exams</span>" + (c.site ? '<a class="chip on-dark" href="' + esc(c.site) + '" target="_blank" rel="noopener">Official site</a>' : "") + "</div></div></section>" +
      '<div class="wrap">' + pills +
      '<div class="filters"><input type="search" id="cf" placeholder="Filter within ' + esc(c.name) + '" aria-label="Filter exams"><select id="ce" aria-label="Qualification"><option value="0">Any qualification</option><option value="1">10th pass level</option><option value="2">12th pass level</option><option value="3">Graduate level</option></select></div>' +
      '<p class="count-line" id="cc"></p><div class="xgrid" id="cl"></div></div>',
      c.name
    );
    function draw() {
      var t = $("#cf").value.trim().toLowerCase(), edu = +$("#ce").value;
      var out = list.filter(function (e) {
        if (stateId && e.state !== stateId) return false;
        if (edu && e.minEdu !== edu) return false;
        if (t && haystack(e).indexOf(t) < 0) return false;
        return true;
      });
      $("#cc").textContent = out.length + (out.length === 1 ? " exam" : " exams") + (stateId ? " in " + stateById[stateId].name : "");
      $("#cl").innerHTML = out.length ? out.map(function (e) { return examCard(e); }).join("") : '<div class="empty" style="grid-column:1/-1"><b>No exams match</b>Clear the filter or choose another qualification.</div>';
    }
    $("#cf").addEventListener("input", draw); $("#ce").addEventListener("change", draw); draw();
  }
  function haystack(e) {
    return [e.name, e.full, e.body, e.level, (e.tags || []).join(" "), (e.posts || []).join(" "), e.state ? stateById[e.state].name : ""].join(" ").toLowerCase();
  }

  /* ============================================================
     EXAM PAGE
     ============================================================ */
  function negNote(e) {
    for (var i = 0; i < e.pattern.length; i++) { var n = e.pattern[i].note || ""; var m = n.match(/[^.]*[Nn]egative marking[^.]*\./); if (m) return m[0].trim(); }
    return "";
  }
  function backups(e) {
    var same = D.exams.filter(function (x) { return x.id !== e.id && x.cat === e.cat && (e.cat !== "state" || x.state === e.state) && x.minEdu <= e.minEdu && x.minEdu >= e.minEdu - 1; });
    if (same.length < 3) {
      var extra = D.exams.filter(function (x) { return x.cat !== "state" && x.id !== e.id && x.minEdu === e.minEdu && same.indexOf(x) < 0; });
      same = same.concat(extra);
    }
    return same.slice(0, 3);
  }
  function relaxNote(e) {
    return e.relax ? "Standard central relaxation: SC/ST +5 years, OBC (non-creamy layer) +3 years, PwBD +10 years (plus the category add-on), ex-servicemen as per rules. Check the reference date in the notification." : e.stateNote;
  }
  function waSummary(e) {
    var lines = ["*" + e.name + "* — " + e.full, "Conducted by: " + e.body, "Qualification: " + e.qual, "Age: " + e.ageText, "Stages: " + e.stages.join(" → "), "Pay: " + e.pay];
    var neg = negNote(e); if (neg) lines.push(neg);
    if (e.status) lines.push("Latest: " + e.status.text + (e.status.verify ? " (tentative — confirm on the official site)" : ""));
    if (e.site) lines.push("Official site: " + e.site);
    lines.push("", "— Govt Exam Wallah, helpline " + CFG.helpline);
    return lines.join("\n");
  }

  function viewExam(id, q) {
    var e = examById[id], c = catOf(e);
    var tabs = [["overview", "Overview"], ["eligibility", "Eligibility"], ["pattern", "Pattern"], ["syllabus", "Syllabus"], ["kit", "Counsellor kit"]];
    var tab = tabs.some(function (t) { return t[0] === q.tab; }) ? q.tab : "overview";

    var crumbs = '<a href="#/">Home</a><span>/</span><a href="#/c/' + c.id + (e.state ? "?state=" + e.state : "") + '">' + esc(c.name) + "</a>" + (e.state ? "<span>/</span><span>" + esc(stateById[e.state].name) + "</span>" : "") + "<span>/</span><span>" + esc(e.name) + "</span>";

    var head =
      '<section class="phead tone-' + e.cat + '"><div class="wrap"><div class="crumbs">' + crumbs + "</div><h1>" + esc(e.name) + "</h1><p>" + esc(e.full) + " &mdash; " + esc(e.body) + '.</p>' +
      '<div class="chips"><span class="chip on-dark">' + esc(e.level) + '</span><span class="chip on-dark">' + esc(ageShort(e)) + '</span><span class="chip on-dark">' + esc(e.mode) + "</span></div>" +
      '<div class="acts"><button class="btn saf sm" id="waBtn" type="button">' + svg("copy") + 'Copy for WhatsApp</button>' + (e.site ? '<a class="btn ghost sm" href="' + esc(e.site) + '" target="_blank" rel="noopener">' + svg("link") + "Official site</a>" : "") + "</div></div></section>";

    var status = e.status ? '<div class="status">' + svg("info") + "<div><span class=\"when\">Latest update · " + esc(CFG.lastUpdated) + "</span><p>" + esc(e.status.text) + "</p>" + (e.status.verify ? '<p style="margin-top:6px"><span class="badge verify">Verify</span> Confirm on the official site before quoting dates or numbers.</p>' : "") + "</div></div>" : "";

    var facts =
      '<aside class="side"><div class="facts"><h2>Quick facts</h2><dl>' +
      fact("Qualification", e.qual) + fact("Age", e.ageText) + fact("Pay", e.pay) + fact("Application fee", e.fee) + fact("Mode", e.mode) +
      "</dl></div></aside>";

    mount(
      head + '<div class="wrap">' + status +
      '<div class="egrid"><div class="main"><div class="tabs" role="tablist" aria-label="Exam sections">' +
      tabs.map(function (t) { return '<button class="tab" role="tab" id="t-' + t[0] + '" data-tab="' + t[0] + '" aria-selected="' + (t[0] === tab) + '" aria-controls="panel">' + t[1] + "</button>"; }).join("") +
      '</div><div id="panel" role="tabpanel" tabindex="0"></div></div>' + facts + "</div></div>",
      e.name
    );

    $("#waBtn").addEventListener("click", function () { copyText(waSummary(e), "Summary copied. Paste it in WhatsApp."); });
    function showTab(t) {
      tab = t; $$(".tab").forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-tab") === t ? "true" : "false"); });
      $("#panel").setAttribute("aria-labelledby", "t-" + t);
      $("#panel").innerHTML = panelHTML(e, t);
      history.replaceState(null, "", "#/e/" + e.id + (t === "overview" ? "" : "?tab=" + t));
      bindPanel(e);
    }
    $$(".tab").forEach(function (b) { b.addEventListener("click", function () { showTab(b.getAttribute("data-tab")); }); });
    showTab(tab);
  }
  function fact(k, v) { return "<div class=\"fact\"><dt>" + esc(k) + "</dt><dd>" + esc(v) + "</dd></div>"; }

  function panelHTML(e, t) {
    if (t === "overview") {
      return '<div class="panel"><h2>Overview</h2><dl class="kv">' +
        kv("Conducted by", e.body) + kv("Level", e.level) + kv("Mode", e.mode) + kv("Application fee", e.fee) + kv("Pay", e.pay) + "</dl></div>" +
        '<div class="panel"><h2>Selection stages</h2><ol class="steps">' + e.stages.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol></div>" +
        '<div class="panel"><h2>Posts</h2>' + (e.posts.length ? '<ul class="list">' + e.posts.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" : "<p>Posts are listed in the notification.</p>") + (e.scope ? '<p class="tnote" style="margin-top:12px"><b>' + esc(e.scope) + "</b></p>" : "") + "</div>";
    }
    if (t === "eligibility") {
      return '<div class="panel"><h2>Eligibility</h2><dl class="kv">' +
        kv("Qualification", e.qual) + kv("Age limit", e.ageText) + kv("Relaxation", relaxNote(e)) + kv("Nationality", "Indian citizen. Other categories are listed in the notification.") + "</dl>" +
        '<p class="tnote" style="margin-top:12px">Use the <a href="#/finder">Eligibility Finder</a> to check a student quickly.</p></div>';
    }
    if (t === "pattern") {
      if (!e.pattern.length) return '<div class="panel"><h2>Exam pattern</h2><p>The detailed pattern comes with the official notification for this exam. Stages: ' + esc(e.stages.join(" → ")) + ".</p>" + (e.site ? '<p><a class="btn line sm" href="' + esc(e.site) + '" target="_blank" rel="noopener">Open official site</a></p>' : "") + "</div>";
      return e.pattern.map(function (p) {
        return '<div class="panel"><h2>' + esc(p.title) + '</h2><div class="tbl-wrap"><table><thead><tr>' + p.cols.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "</tr></thead><tbody>" +
          p.rows.map(function (r) { var tot = r.some(function (c) { return /^(objective )?total/i.test(c); }); return "<tr" + (tot ? ' class="tot"' : "") + ">" + r.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>"; }).join("") +
          "</tbody></table></div>" + (p.note ? '<p class="tnote">' + esc(p.note) + "</p>" : "") + "</div>";
      }).join("");
    }
    if (t === "syllabus") {
      if (!e.syllabus.length) return '<div class="panel"><h2>Syllabus</h2><p>The syllabus is published with the notification for this exam.</p></div>';
      return '<div class="panel"><h2>Syllabus areas</h2><dl class="kv">' + e.syllabus.map(function (s) { return kv(s.area, s.topics); }).join("") + "</dl></div>";
    }
    /* counsellor kit */
    var pitch = (T.quickPitch[e.cat] || []);
    var talk = pitch.concat(["Pay: " + e.pay, "Stages: " + e.stages.join(" → ")]);
    var ask = ["Qualification and final-result date?", "Current age and category (to check relaxation)?", "Roughly how many hours a day can the student study?", "Any earlier attempt at this exam? What went wrong?"];
    if (/Physical|PET|PST/i.test(e.stages.join(" ") + e.pattern.map(function (p) { return p.title; }).join(" "))) ask.push("Is the student ready for the physical tests (height, chest, running)?");
    var faq = [
      ["Who can apply for " + e.name + "?", e.qual + " Age: " + e.ageText],
      ["What are the selection stages?", e.stages.join(" → ") + "."],
      ["What is the pay?", e.pay],
      ["What is the application fee?", e.fee]
    ];
    var neg = negNote(e); if (neg) faq.push(["Is there negative marking?", neg]);
    var bk = backups(e);
    if (bk.length) faq.push(["What should the student prepare alongside?", "Suggested backups: " + bk.map(function (b) { return b.name; }).join(", ") + ". They share a similar qualification level and syllabus base."]);

    var dreamLine = (T.dream && T.dream.byCat[e.cat]) || "";
    return '<div class="panel"><h2>Talking points</h2><ul class="list">' + talk.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
      '<div class="copy-row"><button class="btn line sm" type="button" data-copy="talk">' + svg("copy") + "Copy talking points</button></div></div>" +
      '<div class="panel"><h2>Dream selling</h2>' + (dreamLine ? "<p>" + esc(dreamLine) + "</p>" : "") + '<ul class="list">' + [e.pay ? "Shuruaati pay: " + e.pay : "", "Sapna dikhao, par selection ki guarantee kabhi mat do."].filter(Boolean).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul><p class="tnote" style="margin-top:10px">Poore dream selling points aur scripts: <a href="#/training">Training page</a>.</p></div>' +
      '<div class="panel"><h2>Questions to ask the student</h2><ul class="list">' + ask.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="panel"><h2>Common student questions</h2>' + faq.map(function (f) { return '<details class="faq"><summary>' + esc(f[0]) + '</summary><div class="ans">' + esc(f[1]) + "</div></details>"; }).join("") + "</div>" +
      (bk.length ? '<div class="panel"><h2>Backup exams</h2><div class="xgrid" style="grid-template-columns:1fr">' + bk.map(function (b) { return examCard(b); }).join("") + "</div></div>" : "");
  }
  function kv(k, v) { return "<dt>" + esc(k) + "</dt><dd>" + esc(v) + "</dd>"; }
  function bindPanel(e) {
    var b = $("[data-copy=talk]");
    if (b) b.addEventListener("click", function () {
      var pitch = (T.quickPitch[e.cat] || []).concat(["Pay: " + e.pay, "Stages: " + e.stages.join(" → ")]);
      copyText("*" + e.name + " — talking points*\n" + pitch.map(function (x) { return "• " + x; }).join("\n"), "Talking points copied");
    });
  }

  /* ============================================================
     ELIGIBILITY FINDER
     ============================================================ */
  var RELAX = { general: 0, ews: 0, obc: 3, scst: 5, pwd: 10 };
  function viewFinder(q) {
    mount(
      '<section class="phead tone-ssc"><div class="wrap"><div class="crumbs"><a href="#/">Home</a><span>/</span><span>Eligibility Finder</span></div><h1>Eligibility Finder</h1><p>Enter the student\'s qualification, age and category. See which exams they can apply for.</p></div></section>' +
      '<div class="wrap"><form class="form" id="ff" novalidate>' +
      '<label>Qualification<select id="fe"><option value="1">10th pass</option><option value="2">12th pass</option><option value="3" selected>Graduate</option></select></label>' +
      '<label>Age (years)<input id="fa" type="number" inputmode="numeric" min="14" max="60" placeholder="e.g. 24" required></label>' +
      '<label>Category<select id="fc"><option value="general">General</option><option value="ews">EWS</option><option value="obc">OBC (non-creamy layer)</option><option value="scst">SC / ST</option><option value="pwd">PwBD (General)</option></select></label>' +
      '<label>Exam family<select id="ft"><option value="">All</option>' + D.categories.map(function (c) { return '<option value="' + c.id + '">' + esc(c.name) + "</option>"; }).join("") + "</select></label>" +
      '<button class="btn saf" type="submit">Find exams</button></form>' +
      '<div id="fr"><div class="empty"><b>No search yet</b>Fill in the form and press Find exams.</div></div></div>',
      "Eligibility Finder"
    );
    $("#ff").addEventListener("submit", function (ev) {
      ev.preventDefault();
      var edu = +$("#fe").value, age = parseInt($("#fa").value, 10), cat = $("#fc").value, fam = $("#ft").value;
      if (!age || age < 14 || age > 60) { toast("Enter a valid age"); $("#fa").focus(); return; }
      var ok = [], chk = [], young = [], old = [];
      D.exams.forEach(function (e) {
        if (fam && e.cat !== fam) return;
        if (edu < e.minEdu) return;
        if (e.ageMax == null || !e.ageMin) { chk.push(e); return; }
        var cap = e.ageMax + (e.relax ? RELAX[cat] : 0);
        if (age < e.ageMin) { young.push(e); return; }
        if (age > cap) { old.push(e); return; }
        ok.push({ e: e, cap: cap });
      });
      var h = "";
      h += group("Can apply (age and qualification match)", ok.map(function (o) { return examCard(o.e, '<span class="chip ageok">Age cap for this student: ' + o.cap + (o.e.capNote ? " (" + esc(o.e.capNote) + ")" : "") + "</span>"); }), "No central exam matches on age. Check the groups below.");
      h += group("Qualification matches. Check age in the notification", chk.map(function (e) { return examCard(e); }), "", "State rules decide the age limit.");
      h += group("Not old enough yet", young.map(function (e) { return examCard(e, '<span class="chip">Minimum age ' + e.ageMin + "</span>"); }), "");
      h += group("Over the age limit", old.map(function (e) { return examCard(e); }), "", "Age caps shown include the category relaxation entered.");
      h += '<p class="note">Age limits depend on the reference date in each year\'s notification, so a student near the limit must be checked against the exact date. Category relaxation shown is the standard central norm and applies to central exams only.</p>';
      $("#fr").innerHTML = h;
      $("#fr").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    function group(title, cards, emptyMsg, sub) {
      if (!cards.length && !emptyMsg) return "";
      return '<h2 class="group-h">' + esc(title) + " <small>" + cards.length + (cards.length === 1 ? " exam" : " exams") + (sub ? " · " + esc(sub) : "") + "</small></h2>" +
        (cards.length ? '<div class="xgrid">' + cards.join("") + "</div>" : '<div class="empty">' + esc(emptyMsg) + "</div>");
    }
  }

  /* ============================================================
     SELECTIONS (live from Google Sheet, with CSV fallback)
     ============================================================ */
  var selCache = null;

  function photoUrl(u) {
    if (!u) return "";
    var m = u.match(/drive\.google\.com\/file\/d\/([^/?#]+)/) || (/drive\.google\.com/.test(u) && u.match(/[?&]id=([^&]+)/));
    if (m) return "https://drive.google.com/thumbnail?id=" + m[1] + "&sz=w240";
    return /^https?:\/\//i.test(u) ? u : "";
  }
  function loadSelections() {
    if (selCache) return Promise.resolve(selCache);
    return fetch(CFG.selectionsFile, { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (list) { selCache = { list: Array.isArray(list) ? list : [] }; return selCache; })
      .catch(function () { selCache = { list: [] }; return selCache; });
  }


  function vacRows(txt) {
    var rows = csvRows(txt).filter(function (r) { return r.some(function (c) { return String(c).trim(); }); });
    if (rows.length < 2) throw new Error("empty");
    var h = rows[0].map(function (c) { return String(c).trim().toLowerCase(); });
    return rows.slice(1).map(function (r) {
      var g = function (n) { var k = h.indexOf(n); return k < 0 ? "" : String(r[k] || "").trim(); };
      return { cat: g("category"), exam: g("exam"), post: g("post"), vac: g("vacancies"), last: g("lastdate"), link: g("link"), note: g("notes") };
    }).filter(function (x) { return x.exam || x.post; });
  }
  function loadVacancies() {
    function fromFile() { return fetch("data/vacancies.json", { cache: "no-cache" }).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); }).then(function (j) { return { items: j.items || [], src: j.updated || "" }; }); }
    var sid = CFG.vacanciesSheetId || CFG.upcomingSheetId;
    if (!sid || !CFG.vacanciesSheetTab) return fromFile();
    var url = "https://docs.google.com/spreadsheets/d/" + sid + "/gviz/tq?tqx=out:csv&sheet=" + encodeURIComponent(CFG.vacanciesSheetTab);
    return fetch(url, { cache: "no-store" }).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
      .then(function (t) { if (/^\s*</.test(t)) throw new Error("not public"); var it = vacRows(t); if (!it.length) throw new Error("none"); return { items: it, src: "live from sheet" }; })
      .catch(fromFile);
  }
  function viewVacancies() {
    mount(
      '<section class="phead tone-ssc"><div class="wrap"><div class="crumbs"><a href="#/">Home</a><span>/</span><span>Vacancies</span></div><h1>Latest vacancies</h1><p>Open recruitments across SSC, Banking, Railways and State exams. Closed ones disappear automatically. <span id="vAsOf"></span></p></div></section>' +
      '<div class="wrap" id="vacBody"><div class="loading"><span class="spin"></span>Loading vacancies…</div></div>');
    loadVacancies().then(function (res) {
      var t = todayISO();
      var items = res.items.filter(function (v) { return !/^\d{4}-\d{2}-\d{2}$/.test(v.last) || v.last >= t; })
        .sort(function (x, y) { return (x.last || "9999") < (y.last || "9999") ? -1 : 1; });
      if ($("#vAsOf") && res.src) $("#vAsOf").textContent = "(" + res.src + ")";
      var cats = []; items.forEach(function (v) { if (v.cat && cats.indexOf(v.cat) < 0) cats.push(v.cat); });
      $("#vacBody").innerHTML = '<div class="filters"><input type="search" id="vq" placeholder="Search exam or post" aria-label="Search vacancies"><select id="vc" aria-label="Category"><option value="">All categories</option>' + cats.map(function (c) { return "<option>" + esc(c) + "</option>"; }).join("") + '</select></div><p class="muted" id="vn" style="margin:8px 0"></p><div id="vl"></div>';
      function draw() {
        var q = $("#vq").value.toLowerCase(), c = $("#vc").value;
        var f = items.filter(function (v) { return (!c || v.cat === c) && (!q || (v.exam + " " + v.post).toLowerCase().indexOf(q) >= 0); });
        $("#vn").textContent = f.length + " open";
        $("#vl").innerHTML = f.length ? f.map(function (v) {
          var left = "";
          if (/^\d{4}-\d{2}-\d{2}$/.test(v.last)) { var d = Math.round((new Date(v.last + "T00:00:00") - new Date(t + "T00:00:00")) / 864e5); left = d === 0 ? "Last day today" : d + " days left"; }
          var safe = /^https?:\/\//.test(v.link);
          return '<div class="card" style="margin:10px 0;padding:14px"><b>' + esc(v.exam) + '</b>' + (v.cat ? ' <span class="badge ok sm">' + esc(v.cat) + "</span>" : "") + (v.post ? "<div>" + esc(v.post) + "</div>" : "") +
            '<div class="muted" style="font-size:.9rem;margin-top:4px">' + (v.vac ? "Vacancies: " + esc(v.vac) + " · " : "") + (v.last ? "Last date: " + esc(v.last) + (left ? " (" + left + ")" : "") : "Last date: see notification") + "</div>" + (v.note ? '<div class="muted" style="font-size:.9rem">' + esc(v.note) + "</div>" : "") +
            (safe ? '<a class="btn" style="margin-top:8px" target="_blank" rel="noopener noreferrer" href="' + esc(v.link) + '">Official notification</a>' : "") + "</div>";
        }).join("") : '<div class="empty"><b>Koi open vacancy nahi mili</b>Official sites check karo: ssc.gov.in, ibps.in, rrbapply.gov.in.</div>';
      }
      $("#vq").addEventListener("input", draw); $("#vc").addEventListener("change", draw); draw();
    }).catch(function () { $("#vacBody").innerHTML = '<div class="empty" style="margin-top:20px"><b>Vacancies load nahi hui</b>Official sites check karo: ssc.gov.in, ibps.in, rrbapply.gov.in.</div>'; });
  }

  function viewSelections() {
    mount(
      '<section class="phead tone-railways"><div class="wrap"><div class="crumbs"><a href="#/">Home</a><span>/</span><span>Selections</span></div><h1>Our selections</h1><p>Results of Govt Exam Wallah students. Use this to show a student what is possible.</p></div></section>' +
      '<div class="wrap" id="selBody"><div class="loading"><span class="spin"></span>Loading selections…</div></div>',
      "Selections"
    );
    loadSelections().then(function (res) {
      if (!$("#selBody")) return;
      var list = res.list;
      if (!list.length) {
        $("#selBody").innerHTML = '<div class="empty" style="margin-top:20px"><b>No selections added yet</b>Run <code>tools/build_selections.py</code> on the results sheet to create <code>data/selections.json</code>. Steps are in the README.</div>';
        return;
      }
      var exams = {}, years = {}, sessions = {};
      list.forEach(function (x) { if (x.exam) exams[x.exam] = (exams[x.exam] || 0) + 1; if (x.centre) years[x.centre] = 1; if (x.year) sessions[x.year] = 1; });
      var examNames = Object.keys(exams).sort(function (a, b) { return exams[b] - exams[a]; });
      var yearNames = Object.keys(years).sort();
      var sessNames = Object.keys(sessions).sort().reverse();
      var top = examNames.slice(0, 8), max = exams[top[0]] || 1;

      $("#selBody").innerHTML =
        '<div class="sel-stats"><div class="stat">' + svg("medal") + "<div><b>" + list.length + "</b><span>Selections listed</span></div></div>" +
        '<div class="stat">' + svg("book") + "<div><b>" + examNames.length + "</b><span>Exams</span></div></div>" +
        (sessNames.length > 1 ? '<div class="stat">' + svg("book") + "<div><b>" + sessNames.length + "</b><span>Years</span></div></div>" : "") + (yearNames.length ? '<div class="stat">' + svg("trophy") + "<div><b>" + yearNames.length + "</b><span>Centres</span></div></div>" : "") + "</div>" +
        (top.length ? '<div class="bars" aria-label="Selections by exam">' + top.map(function (n) { return '<div class="bar"><span>' + esc(n) + '</span><i style="width:' + Math.max(3, Math.round(exams[n] / max * 100)) + '%"></i><b>' + exams[n] + "</b></div>"; }).join("") + "</div>" : "") +
        '<div class="filters"><input type="search" id="sq" placeholder="Search by name, exam or post" aria-label="Search selections"><select id="se" aria-label="Exam"><option value="">All exams</option>' + examNames.map(function (n) { return "<option>" + esc(n) + "</option>"; }).join("") + "</select>" +
        (sessNames.length > 1 ? '<select id="ss" aria-label="Year"><option value="">All years</option>' + sessNames.map(function (n) { return "<option>" + esc(n) + "</option>"; }).join("") + "</select>" : "") + (yearNames.length ? '<select id="sy" aria-label="Centre"><option value="">All centres</option>' + yearNames.map(function (n) { return "<option>" + esc(n) + "</option>"; }).join("") + "</select>" : "") + "</div>" +
        '<p class="count-line" id="sc"></p><div class="sgrid" id="sg"></div><div class="more" id="sm"></div>';

      var shown = 48, filtered = list;
      function draw() {
        var t = $("#sq").value.trim().toLowerCase(), ex = $("#se").value, yr = $("#sy") ? $("#sy").value : "", ses = $("#ss") ? $("#ss").value : "";
        filtered = list.filter(function (x) {
          if (ex && x.exam !== ex) return false;
          if (yr && x.centre !== yr) return false;
          if (ses && x.year !== ses) return false;
          if (t && (x.name + " " + x.exam + " " + x.post + " " + x.centre + " " + (x.year || "")).toLowerCase().indexOf(t) < 0) return false;
          return true;
        });
        $("#sc").textContent = filtered.length + (filtered.length === 1 ? " selection" : " selections");
        paint();
      }
      function paint() {
        var part = filtered.slice(0, shown);
        $("#sg").innerHTML = part.length ? part.map(selCard).join("") : '<div class="empty" style="grid-column:1/-1"><b>No matches</b>Try a different search.</div>';
        $("#sm").innerHTML = filtered.length > shown ? '<button class="btn line" type="button" id="moreBtn">Show more (' + (filtered.length - shown) + " left)</button>" : "";
        var mb = $("#moreBtn"); if (mb) mb.addEventListener("click", function () { shown += 48; paint(); });
        $$(".avatar img", $("#sg")).forEach(function (img) { img.addEventListener("error", function () { img.parentNode.textContent = img.getAttribute("data-i"); }); });
      }
      ["input", "change"].forEach(function (ev) { ["sq", "se", "ss", "sy"].forEach(function (id) { var el = $("#" + id); if (el) el.addEventListener(ev, function () { shown = 48; draw(); }); }); });
      draw();
    });
  }
  function initials(n) { var p = String(n || "?").trim().split(/\s+/); return ((p[0] || "?")[0] + (p.length > 1 ? p[p.length - 1][0] : "")).toUpperCase(); }
  function selCard(x) {
    var ph = photoUrl(x.photo);
    var av = ph ? '<div class="avatar"><img src="' + esc(ph) + '" alt="" loading="lazy" referrerpolicy="no-referrer" data-i="' + esc(initials(x.name)) + '"></div>' : '<div class="avatar" aria-hidden="true">' + esc(initials(x.name)) + "</div>";
    var meta = [x.post, x.rank ? "Rank/Score: " + x.rank : "", x.centre, x.year].filter(Boolean).map(esc).join(" · ");
    return '<article class="sel">' + av + "<div><h3>" + esc(x.name || "Selected student") + "</h3>" + (x.exam ? '<span class="badge">' + esc(x.exam) + "</span>" : "") + (meta ? "<p>" + meta + "</p>" : "") + "</div></article>";
  }

  /* ============================================================
     TRAINING
     ============================================================ */
  function inr(n, d) { return "₹" + Number(n).toLocaleString("en-IN", { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); }
  function feeSplit(total, months, cls) {
    var days = months * 365 / 12, month = total / months, week = month / 4.33, day = total / days;
    return { days: days, month: month, week: week, day: day, cls: day / cls };
  }
  function feePitchText(total, months, cls) {
    var r = feeSplit(total, months, cls);
    return "Is course ki total fees " + inr(total) + " hai aur validity " + months + " mahine (" + (months / 12 % 1 === 0 ? months / 12 + " saal" : (months / 12).toFixed(1) + " saal") + ") ki hai. " +
      "Isko todkar dekhein to har mahine lagbhag " + inr(r.month) + ", har hafte " + inr(r.week) + ", roz " + inr(r.day, 2) + ", aur agar roz " + cls + " classes hon to ek class " + inr(r.cls, 2) + " ki padti hai.";
  }
  function cardList(items, fn) { return items.map(fn).join(""); }
  function scriptCards(list, attr) {
    return list.map(function (x, i) {
      return '<details class="faq"><summary>' + esc(x.title) + '</summary><div class="ans"><div class="say">' + esc(x.text) + '</div><div class="copy-row"><button class="btn line sm" type="button" data-' + attr + '="' + i + '">' + svg("copy") + "Copy script</button></div></div></details>";
    }).join("");
  }

  function viewTraining() {
    var F = T.fee, DR = T.dream;
    mount(
      '<section class="phead tone-banking"><div class="wrap"><div class="crumbs"><a href="#/">Home</a><span>/</span><span>Training</span></div><h1>Counsellor training</h1><p>Ek simple flow, sahi sawal, fees ko todkar batane ka tareeka, sapne dikhane ke points aur objections ke imaandar jawab.</p>' +
      '<div class="acts"><a class="btn saf sm" href="#fee">Fee Pitch Calculator</a><a class="btn ghost sm" href="#dream">Dream selling</a></div></div></section>' +
      '<div class="wrap">' +
      '<section class="sec"><div class="sec-h"><h2>The counselling flow</h2></div><div class="panel"><ol class="steps">' + T.flow.map(function (s) { return "<li><div><b>" + esc(s.step) + "</b><br><span>" + esc(s.body) + "</span></div></li>"; }).join("") + "</ol></div></section>" +

      '<section class="sec"><div class="sec-h"><h2>Jaanch-Partal</h2><button class="btn line sm" type="button" id="cpq">' + svg("copy") + "Copy all</button></div><div class=\"panel\"><ul class=\"list\">" + T.discovery.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div></section>" +

      '<section class="sec" id="fee"><div class="sec-h"><h2>Fees ko todkar batana</h2><p>' + esc(F.intro) + "</p></div>" +
      '<div class="calc"><div class="calc-in"><label>Total course fee (₹)<input id="cf1" type="number" inputmode="numeric" min="1" value="25000"></label><label>Validity (months)<input id="cf2" type="number" inputmode="numeric" min="1" max="120" value="36"></label><label>Classes per day<input id="cf3" type="number" inputmode="numeric" min="1" max="10" value="2"></label></div>' +
      '<div class="calc-out" id="cout"></div><div class="calc-pitch" id="cpitch"></div><div class="copy-row"><button class="btn saf sm" type="button" id="cfcopy">' + svg("copy") + 'Copy fee pitch</button></div></div>' +
      '<div class="two" style="margin-top:14px"><div class="dd good"><h3>Best practice</h3><ul>' + cardList(F.principles, function (x) { return "<li><b>" + esc(x.t) + ".</b> " + esc(x.d) + "</li>"; }) + '</ul></div><div class="dd bad"><h3>Ye galtiyan mat karo</h3><ul>' + cardList(F.mistakes, function (x) { return "<li>" + esc(x) + "</li>"; }) + "</ul></div></div>" +
      '<h3 class="group-h" style="margin-top:20px">Fee pitch scripts</h3>' + scriptCards(F.scripts, "fs") + "</section>" +

      '<section class="sec" id="dream"><div class="sec-h"><h2>Dream selling</h2><p>' + esc(DR.intro) + "</p></div>" +
      '<div class="two"><div class="dd"><h3>Sapne jagane wale sawal</h3><ul class="list">' + cardList(DR.questions, function (x) { return "<li>" + esc(x) + "</li>"; }) + '</ul></div><div class="dd"><h3>Sarkari naukri ke dream points</h3><ul class="list">' + cardList(DR.points, function (x) { return "<li><b>" + esc(x.t) + ":</b> " + esc(x.d) + "</li>"; }) + "</ul></div></div>" +
      '<h3 class="group-h" style="margin-top:20px">Exam family ke hisaab se sapna</h3><div class="two">' + D.categories.map(function (c) { return '<div class="dd"><h3>' + esc(c.name) + "</h3><p style=\"margin:0\">" + esc(DR.byCat[c.id] || "") + "</p></div>"; }).join("") + "</div>" +
      '<h3 class="group-h" style="margin-top:20px">Dream selling scripts</h3>' + scriptCards(DR.scripts, "ds") +
      '<div class="dd good" style="margin-top:14px"><h3>Reality check: imaandari se</h3><ul>' + cardList(DR.reality, function (x) { return "<li>" + esc(x) + "</li>"; }) + "</ul></div></section>" +

      '<section class="sec"><div class="sec-h"><h2>Handling objections</h2><p>Apne shabdon me bolo. Kabhi result ka vaada mat karo.</p></div>' +
      T.objections.map(function (o, i) { return '<details class="faq"><summary>“' + esc(o.q) + '”</summary><div class="ans"><div class="say">' + esc(o.a) + '</div><div class="copy-row"><button class="btn line sm" type="button" data-obj="' + i + '">' + svg("copy") + "Copy script</button></div></div></details>"; }).join("") + "</section>" +
      '<section class="sec"><div class="sec-h"><h2>Do and don\'t</h2></div><div class="two"><div class="dd good"><h3>Do</h3><ul>' + T.dos.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul></div><div class="dd bad"><h3>Don\'t</h3><ul>' + T.donts.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div></div></section>" +
      '<section class="sec"><div class="sec-h"><h2>Why each exam family</h2></div><div class="two">' + D.categories.map(function (c) { return '<div class="dd"><h3>' + esc(c.name) + "</h3><ul class=\"list\" style=\"list-style:none\">" + (T.quickPitch[c.id] || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>"; }).join("") + "</div></section>" +
      "</div>",
      "Training"
    );
    $("#cpq").addEventListener("click", function () { copyText(T.discovery.map(function (x) { return "• " + x; }).join("\n"), "Questions copied"); });
    $$("[data-obj]").forEach(function (b) { b.addEventListener("click", function () { copyText(T.objections[+b.getAttribute("data-obj")].a, "Script copied"); }); });
    $$("[data-fs]").forEach(function (b) { b.addEventListener("click", function () { copyText(F.scripts[+b.getAttribute("data-fs")].text, "Script copied"); }); });
    $$("[data-ds]").forEach(function (b) { b.addEventListener("click", function () { copyText(DR.scripts[+b.getAttribute("data-ds")].text, "Script copied"); }); });

    function vals() { return [Math.max(0, parseFloat($("#cf1").value) || 0), Math.max(0, parseFloat($("#cf2").value) || 0), Math.max(0, parseFloat($("#cf3").value) || 0)]; }
    function calc() {
      var v = vals(), out = $("#cout"), pt = $("#cpitch");
      if (!v[0] || !v[1] || !v[2]) { out.innerHTML = '<p class="tnote">Fee, validity aur classes per day teeno daalo.</p>'; pt.textContent = ""; return; }
      var r = feeSplit(v[0], v[1], v[2]);
      function box(l, val, how) { return '<div class="cbox"><span>' + l + "</span><b>" + val + "</b><small>" + how + "</small></div>"; }
      out.innerHTML =
        '<div class="ctotal"><span>Total course fee</span><b>' + inr(v[0]) + "</b><small>Validity: " + v[1] + " months</small></div>" +
        '<div class="cgrid">' + box("Per month", inr(r.month), inr(v[0]) + " ÷ " + v[1]) + box("Per week", inr(r.week), inr(r.month) + " ÷ 4.33") + box("Per day", inr(r.day, 2), inr(v[0]) + " ÷ " + Math.round(r.days).toLocaleString("en-IN") + " days") + box("Per class (" + v[2] + " daily)", inr(r.cls, 2), inr(r.day, 2) + " ÷ " + v[2]) + "</div>";
      pt.textContent = feePitchText(v[0], v[1], v[2]);
    }
    ["cf1", "cf2", "cf3"].forEach(function (id) { $("#" + id).addEventListener("input", calc); });
    $("#cfcopy").addEventListener("click", function () { var v = vals(); if (v[0] && v[1] && v[2]) copyText(feePitchText(v[0], v[1], v[2]), "Fee pitch copied"); else toast("Pehle sahi numbers daalo"); });
    calc();
    if (location.hash.indexOf("#fee") === 0 || location.hash.indexOf("#dream") === 0) { /* in-page anchors handled below */ }
    $$('a[href="#fee"], a[href="#dream"]').forEach(function (l) { l.addEventListener("click", function (ev) { ev.preventDefault(); var t = $(l.getAttribute("href")); if (t) t.scrollIntoView({ behavior: "smooth", block: "start" }); }); });
  }

  /* ============================================================
     GLOBAL SEARCH
     ============================================================ */
  var qEl = $("#q"), sugg = $("#sugg"), suggItems = [], suggIdx = -1;
  function closeSugg() { sugg.hidden = true; qEl.setAttribute("aria-expanded", "false"); suggIdx = -1; }
  function score(e, t) {
    var n = e.name.toLowerCase(), h = haystack(e);
    if (n === t) return 100; if (n.indexOf(t) === 0) return 80; if (n.indexOf(t) > -1) return 60;
    if ((e.tags || []).some(function (x) { return x.toLowerCase().indexOf(t) > -1; })) return 40;
    if (h.indexOf(t) > -1) return 20; return 0;
  }
  function drawSugg() {
    var t = qEl.value.trim().toLowerCase();
    if (t.length < 2) { closeSugg(); return; }
    var words = t.split(/\s+/);
    suggItems = D.exams.map(function (e) {
      var s = score(e, t);
      if (!s && words.length > 1) { var h = haystack(e); if (words.every(function (w) { return h.indexOf(w) > -1; })) s = 10; }
      return { e: e, s: s };
    }).filter(function (x) { return x.s > 0; }).sort(function (a, b) { return b.s - a.s; }).slice(0, 8);
    sugg.innerHTML = suggItems.length ? suggItems.map(function (x, i) {
      return '<li role="option"><a href="#/e/' + x.e.id + '" data-i="' + i + '"><b>' + esc(x.e.name) + "</b><small>" + esc(x.e.state ? stateById[x.e.state].name : catOf(x.e).name) + "</small></a></li>";
    }).join("") : '<li class="none">No exam found. Try a short name such as CGL, PO or Patwari.</li>';
    sugg.hidden = false; qEl.setAttribute("aria-expanded", "true"); suggIdx = -1;
  }
  qEl.addEventListener("input", drawSugg);
  qEl.addEventListener("focus", drawSugg);
  qEl.addEventListener("keydown", function (ev) {
    var links = $$("a", sugg);
    if (ev.key === "ArrowDown") { ev.preventDefault(); suggIdx = Math.min(links.length - 1, suggIdx + 1); mark(links); }
    else if (ev.key === "ArrowUp") { ev.preventDefault(); suggIdx = Math.max(0, suggIdx - 1); mark(links); }
    else if (ev.key === "Enter") { var pick = links[suggIdx >= 0 ? suggIdx : 0]; if (pick) { ev.preventDefault(); location.hash = pick.getAttribute("href"); qEl.value = ""; qEl.blur(); } }
  });
  function mark(links) { links.forEach(function (a, i) { a.classList.toggle("act", i === suggIdx); }); }
  sugg.addEventListener("click", function (ev) { if (ev.target.closest("a")) { qEl.value = ""; closeSugg(); } });
  document.addEventListener("click", function (ev) { if (!ev.target.closest("#searchBox") && !ev.target.closest("#searchToggle")) closeSugg(); });
  $("#searchToggle").addEventListener("click", function () {
    var top = $("#top"), open = top.classList.toggle("search-open");
    this.setAttribute("aria-expanded", String(open));
    if (open) qEl.focus();
  });

  /* ---------- boot ---------- */
  $("#callTop").setAttribute("href", "tel:+91" + CFG.helpline);
  $("#callNum").textContent = CFG.helpline;
  $("#lastUpd").textContent = CFG.lastUpdated;
  window.addEventListener("hashchange", route);
  route();
})();
