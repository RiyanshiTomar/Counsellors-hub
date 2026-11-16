/* ============================================================
   GEW Counsellor Hub — core exam data (SSC, Banking, Railways)
   Rules for editing:
   • minEdu: 1 = 10th, 2 = 12th, 3 = Graduate
   • verify:true shows an amber "Verify" badge — confirm on the official site before quoting
   • Dates marked tentative come from the official calendars; they can change.
   ============================================================ */
window.GEW_DATA = { categories: [], exams: [], states: [] };

GEW_DATA.categories = [
  { id: "ssc", name: "SSC", full: "Staff Selection Commission", blurb: "Central govt. jobs from 10th pass to graduate level", site: "https://ssc.gov.in", tone: "indigo" },
  { id: "banking", name: "Banking & Insurance", full: "Banking & Insurance", blurb: "IBPS, SBI, RBI, LIC and NICL recruitments", site: "https://www.ibps.in", tone: "navy" },
  { id: "railways", name: "Railways (RRB)", full: "Railway Recruitment Boards", blurb: "NTPC, Group D, ALP, Technician and station-side posts", site: "https://indianrailways.gov.in", tone: "saffron" },
  { id: "state", name: "State-Level Exams", full: "State-Level Exams", blurb: "Police, revenue, clerical and panchayat posts across 11 states", site: "", tone: "teal" }
];

/* ---------- SSC ---------- */
GEW_DATA.exams.push(
{
  id: "ssc-cgl", cat: "ssc", name: "SSC CGL", full: "Combined Graduate Level Examination", body: "Staff Selection Commission (SSC)",
  minEdu: 3, level: "Graduate", qual: "Bachelor's degree from a recognised university (some posts need specific subjects, e.g. Statistics for JSO / Statistical Investigator).",
  ageMin: 18, ageMax: 32, ageText: "18–32 years, post-wise (18–27, 20–30, 18–30 or 18–32). CGL 2026 reference date: 01-08-2026.", relax: true,
  posts: ["Assistant Section Officer (CSS / MEA / others)", "Inspector (Income Tax / Central Excise / Preventive Officer / Examiner)", "Assistant Audit Officer / Assistant Accounts Officer", "Sub-Inspector (CBI, NIA)", "Junior Statistical Officer / Statistical Investigator Gr-II", "Tax Assistant, Auditor, Postal Assistant, UDC"],
  pay: "Basic pay roughly ₹25,500 – ₹1,51,100 (Pay Level 4 to Level 8, post-wise).",
  mode: "Computer-based (CBT)", fee: "₹100 (women, SC, ST, PwBD, ExSM exempt).",
  stages: ["Tier-I (CBT, qualifying)", "Tier-II (CBT, merit stage)", "Document Verification (+ skill/CPT/DEST for specific posts)"],
  pattern: [
    { title: "Tier-I", cols: ["Section", "Questions", "Marks"], rows: [["General Intelligence & Reasoning", "25", "50"], ["General Awareness", "25", "50"], ["Quantitative Aptitude", "25", "50"], ["English Comprehension", "25", "50"], ["Total", "100", "200"]], note: "60 minutes. Negative marking: 0.50 per wrong answer. CGL 2026 introduced sectional timings." },
    { title: "Tier-II", cols: ["Paper", "Applies to", "Notes"], rows: [["Paper-I (Maths, Reasoning, English, General Awareness, Computer Knowledge)", "All posts", "Mandatory for everyone"], ["Paper-II (Statistics)", "JSO / Statistical Investigator Gr-II", "Only for those posts"], ["Paper-III (General Studies – Finance & Economics)", "Assistant Audit / Accounts Officer", "Only for those posts"]], note: "Exact marks, sections and timings are given in the year's notification — confirm before quoting." }
  ],
  syllabus: [
    { area: "Reasoning", topics: "Analogy, series, coding-decoding, syllogism, blood relations, direction sense, Venn diagrams, matrix, non-verbal" },
    { area: "Quant", topics: "Number system, percentage, ratio, profit & loss, SI/CI, time & work, speed-distance, algebra, geometry, mensuration, trigonometry, data interpretation" },
    { area: "English", topics: "Reading comprehension, cloze test, error spotting, sentence improvement, para jumbles, vocabulary" },
    { area: "General Awareness", topics: "History, polity, geography, economy, general science, static GK, current affairs" }
  ],
  status: { text: "CGL 2026 notification came on 21 May 2026 for 12,256 vacancies; applications closed in June 2026. Tier-I was scheduled Sep–Oct 2026 (sources differ on exact dates); Tier-II is tentatively Dec 2026.", verify: true },
  site: "https://ssc.gov.in", tags: ["cgl", "graduate", "ssc cgl", "inspector", "aso"]
},
{
  id: "ssc-chsl", cat: "ssc", name: "SSC CHSL", full: "Combined Higher Secondary Level Examination", body: "Staff Selection Commission (SSC)",
  minEdu: 2, level: "12th pass", qual: "12th (Senior Secondary) pass or equivalent. DEO in some departments needs Science stream with Maths.",
  ageMin: 18, ageMax: 27, ageText: "18–27 years for most posts.", relax: true,
  posts: ["Lower Division Clerk (LDC) / Junior Secretariat Assistant (JSA)", "Postal Assistant / Sorting Assistant", "Data Entry Operator (DEO)", "DEO in Govt. of India offices"],
  pay: "LDC/JSA: Level 2 (₹19,900–63,200). PA/SA & DEO: Level 4 (₹25,500–81,100). DEO (some offices): Level 5 (₹29,200–92,300).",
  mode: "Computer-based (CBT) + skill/typing test", fee: "₹100 (women, SC, ST, PwBD, ExSM exempt).",
  stages: ["Tier-I (CBT)", "Tier-II (CBT)", "Skill Test / Typing Test (post-wise)", "Document Verification"],
  pattern: [
    { title: "Tier-I", cols: ["Section", "Questions", "Marks"], rows: [["General Intelligence", "25", "50"], ["General Awareness", "25", "50"], ["Quantitative Aptitude", "25", "50"], ["English Language", "25", "50"], ["Total", "100", "200"]], note: "60 minutes. Negative marking: 0.50 per wrong answer." },
    { title: "Skill / typing test", cols: ["Post", "Requirement"], rows: [["LDC / JSA", "35 wpm English or 30 wpm Hindi (qualifying)"], ["DEO", "Data-entry speed test — 8,000 key depressions per hour"], ["Postal / Sorting Assistant", "As per notification"]], note: "Tier-II structure and typing norms can change year to year — confirm in the current notification." }
  ],
  syllabus: [
    { area: "Reasoning", topics: "Verbal and non-verbal reasoning, series, analogy, classification, puzzles" },
    { area: "Quant", topics: "Arithmetic, basic algebra and geometry, DI (Class 10 level)" },
    { area: "English", topics: "Grammar, vocabulary, comprehension, error detection" },
    { area: "General Awareness", topics: "Static GK, current affairs, basic science, polity, geography" }
  ],
  status: { text: "CHSL 2026 notification was reported on 7 Sep 2026 with about 2,536 tentative vacancies. Check ssc.gov.in for application and exam dates.", verify: true },
  site: "https://ssc.gov.in", tags: ["chsl", "12th", "ldc", "jsa", "deo", "postal assistant"]
},
{
  id: "ssc-cpo", cat: "ssc", name: "SSC CPO", full: "Sub-Inspector in Delhi Police, CAPFs & ASI in CISF", body: "Staff Selection Commission (SSC)",
  minEdu: 3, level: "Graduate", qual: "Bachelor's degree. Delhi Police SI (Male) also needs a valid driving licence (LMV/MCW) by the PET/PST stage.",
  ageMin: 20, ageMax: 25, ageText: "20–25 years (relaxation as per rules).", relax: true,
  posts: ["Sub-Inspector (GD) in CAPFs: BSF, CRPF, CISF, ITBP, SSB", "Sub-Inspector (Executive) in Delhi Police", "Assistant Sub-Inspector (Executive) in CISF"],
  pay: "SI posts: Level 6 (₹35,400–1,12,400). ASI (CISF): Level 5 (₹29,200–92,300).",
  mode: "Computer-based (CBT) + physical", fee: "₹100 (women, SC, ST, ExSM exempt).",
  stages: ["Paper-I (CBT)", "PET / PST", "Paper-II (CBT)", "Detailed Medical Examination", "Document Verification"],
  pattern: [
    { title: "Paper-I", cols: ["Section", "Questions", "Marks"], rows: [["General Intelligence & Reasoning", "50", "50"], ["General Knowledge & Awareness", "50", "50"], ["Quantitative Aptitude", "50", "50"], ["English Comprehension", "50", "50"], ["Total", "200", "200"]], note: "2 hours. Negative marking: 0.25 per wrong answer." },
    { title: "Paper-II", cols: ["Section", "Questions", "Marks"], rows: [["English Language & Comprehension", "200", "200"]], note: "2 hours. Negative marking: 0.25. Only for those who qualify PET/PST." },
    { title: "Physical standards (male, general)", cols: ["Test", "Standard"], rows: [["Height / Chest", "170 cm / 80 cm (+5 cm expansion)"], ["100 m race", "16 seconds"], ["1.6 km race", "6.5 minutes"], ["Long jump / High jump / Shot put", "3.65 m / 1.2 m / 4.5 m"]], note: "Female: height 157 cm; 100 m in 18 s; 800 m in 4 min; long jump 2.7 m; high jump 0.9 m. Relaxations apply for ST and some regions." }
  ],
  syllabus: [
    { area: "Paper-I", topics: "Reasoning, GK, Quant, English at graduate level" },
    { area: "Paper-II", topics: "English grammar, vocabulary, comprehension, error spotting, cloze" }
  ],
  status: { text: "SSC calendar 2026–27 lists CPO 2026 with an exam window of Oct–Nov 2026. Confirm notification and dates on ssc.gov.in.", verify: true },
  site: "https://ssc.gov.in", tags: ["cpo", "si", "delhi police", "capf", "cisf"]
},
{
  id: "ssc-mts", cat: "ssc", name: "SSC MTS & Havaldar", full: "Multi-Tasking (Non-Technical) Staff & Havaldar in CBIC / CBN", body: "Staff Selection Commission (SSC)",
  minEdu: 1, level: "10th pass", qual: "Matriculation (10th) pass.",
  ageMin: 18, ageMax: 27, ageText: "MTS: 18–25 years. Havaldar (CBIC & CBN): 18–27 years.", capNote: "MTS 25, Havaldar 27 before relaxation", relax: true,
  posts: ["Multi-Tasking Staff (Non-Technical)", "Havaldar in CBIC", "Havaldar in CBN"],
  pay: "Level 1 (₹18,000–56,900).",
  mode: "Computer-based (CBT) + PET/PST for Havaldar", fee: "₹100 (women, SC, ST, PwBD, ExSM exempt).",
  stages: ["Session-I & Session-II (CBT)", "PET / PST (Havaldar only)", "Document Verification"],
  pattern: [
    { title: "CBT", cols: ["Session", "Section", "Questions", "Marks"], rows: [["I", "Numerical & Mathematical Ability", "20", "60"], ["I", "Reasoning Ability & Problem Solving", "20", "60"], ["II", "General Awareness", "25", "75"], ["II", "English Language & Comprehension", "25", "75"], ["", "Total", "90", "270"]], note: "Each question carries 3 marks. Negative marking applies — check the current notification for the exact deduction." },
    { title: "Havaldar physical test", cols: ["Gender", "Walking", "Cycling"], rows: [["Male", "1,600 m in 15 minutes", "8 km in 30 minutes"], ["Female", "1 km in 20 minutes", "3 km in 25 minutes"]], note: "Height and chest standards are specified in the notification." }
  ],
  syllabus: [
    { area: "Maths", topics: "Number system, percentage, ratio, average, profit & loss, time & work, basic geometry and mensuration (Class 10 level)" },
    { area: "Reasoning", topics: "Series, analogy, coding-decoding, classification, puzzles, non-verbal" },
    { area: "English", topics: "Basic grammar, vocabulary, comprehension" },
    { area: "General Awareness", topics: "Static GK, current affairs, basic science, polity, geography" }
  ],
  status: { text: "SSC calendar lists MTS & Havaldar 2026 with exams in Sep–Nov 2026. In Sep 2026 the notification was still awaited — check ssc.gov.in.", verify: true },
  site: "https://ssc.gov.in", tags: ["mts", "havaldar", "10th", "matric"]
},
{
  id: "ssc-gd", cat: "ssc", name: "SSC GD Constable", full: "Constable (GD) in CAPFs, NIA, SSF & Rifleman (GD) in Assam Rifles", body: "Staff Selection Commission (SSC)",
  minEdu: 1, level: "10th pass", qual: "Matriculation (10th) pass.",
  ageMin: 18, ageMax: 23, ageText: "18–23 years (reference date is 1 January of the exam year).", relax: true,
  posts: ["Constable (GD) in BSF, CISF, CRPF, SSB, ITBP", "Constable (GD) in NIA and SSF", "Rifleman (GD) in Assam Rifles", "Sepoy in NCB"],
  pay: "Level 3 (₹21,700–69,100) for most forces; NCB Sepoy is Level 1.",
  mode: "Computer-based (CBE) + physical", fee: "₹100 (women, SC, ST, ExSM exempt).",
  stages: ["Computer-Based Exam", "PET / PST", "Medical Examination", "Document Verification"],
  pattern: [
    { title: "CBE", cols: ["Part", "Questions", "Marks"], rows: [["General Intelligence & Reasoning", "20", "40"], ["General Knowledge & Awareness", "20", "40"], ["Elementary Mathematics", "20", "40"], ["English / Hindi", "20", "40"], ["Total", "80", "160"]], note: "60 minutes. Negative marking: 0.50 per wrong answer." },
    { title: "Physical standards (general)", cols: ["Test", "Male", "Female"], rows: [["Race", "5 km in 24 minutes", "1.6 km in 8.5 minutes"], ["Height", "170 cm", "157 cm"], ["Chest", "80 cm (+5 cm expansion)", "—"]], note: "Relaxations apply for ST, ex-servicemen and some regions; special standards for Ladakh." }
  ],
  syllabus: [
    { area: "Reasoning", topics: "Analogy, classification, series, coding, direction sense, blood relations" },
    { area: "GK", topics: "Static GK, current affairs, science, history, geography, polity" },
    { area: "Maths", topics: "Number system, percentage, ratio, average, profit & loss, time & work, mensuration" },
    { area: "English / Hindi", topics: "Basic grammar, vocabulary, comprehension" }
  ],
  status: { text: "SSC GD 2027 notification was due around 30 Sep 2026 with applications till about 31 Oct 2026; CBE tentatively Jan–Mar 2027. Confirm on ssc.gov.in.", verify: true },
  site: "https://ssc.gov.in", tags: ["gd", "constable", "capf", "bsf", "crpf", "cisf", "10th"]
},
{
  id: "ssc-steno", cat: "ssc", name: "SSC Stenographer", full: "Stenographer Grade 'C' & 'D' Examination", body: "Staff Selection Commission (SSC)",
  minEdu: 2, level: "12th pass", qual: "12th (Senior Secondary) pass or equivalent.",
  ageMin: 18, ageMax: 30, ageText: "Grade C: 18–30 years. Grade D: 18–27 years.", relax: true,
  posts: ["Stenographer Grade 'C' (Group B, non-gazetted)", "Stenographer Grade 'D' (Group C)"],
  pay: "Grade C: Level 7 (₹44,900–1,42,400). Grade D: Level 4 (₹25,500–81,100).",
  mode: "Computer-based (CBT) + skill test", fee: "₹100 (women, SC, ST, PwBD, ExSM exempt).",
  stages: ["Computer-Based Exam", "Skill Test (shorthand dictation + transcription)", "Document Verification"],
  pattern: [
    { title: "CBT", cols: ["Part", "Questions", "Marks"], rows: [["General Intelligence & Reasoning", "50", "50"], ["General Awareness", "50", "50"], ["English Language & Comprehension", "100", "100"], ["Total", "200", "200"]], note: "2 hours. Negative marking: 0.25 per wrong answer." },
    { title: "Skill test", cols: ["Grade", "Dictation", "Transcription"], rows: [["C", "100 wpm for 10 minutes", "40 min (English) / 55 min (Hindi)"], ["D", "80 wpm for 10 minutes", "50 min (English) / 65 min (Hindi)"]], note: "Skill test is qualifying in nature." }
  ],
  syllabus: [
    { area: "Reasoning", topics: "Verbal and non-verbal reasoning" },
    { area: "General Awareness", topics: "Current affairs, static GK, polity, science" },
    { area: "English", topics: "Grammar, vocabulary, comprehension, error spotting" }
  ],
  status: { text: "SSC calendar 2026–27 lists Stenographer 2026 with an exam window of Aug–Sep 2026. Confirm status on ssc.gov.in.", verify: true },
  site: "https://ssc.gov.in", tags: ["steno", "stenographer", "shorthand", "12th"]
}
);

/* ---------- BANKING & INSURANCE ---------- */
GEW_DATA.exams.push(
{
  id: "ibps-po", cat: "banking", name: "IBPS PO", full: "Probationary Officer / Management Trainee (CRP PO/MT)", body: "Institute of Banking Personnel Selection (IBPS)",
  minEdu: 3, level: "Graduate", qual: "Bachelor's degree in any discipline (final-year students may apply with proof, as per notification).",
  ageMin: 20, ageMax: 30, ageText: "20–30 years.", relax: true,
  posts: ["Probationary Officer / Management Trainee in participating public sector banks"],
  pay: "Starting basic about ₹48,480 (Scale I), plus allowances.",
  mode: "Computer-based, 3 stages", fee: "₹850 (₹175 for SC/ST/PwBD).",
  stages: ["Preliminary Exam", "Main Exam (objective + descriptive)", "Interview", "Provisional allotment"],
  pattern: [
    { title: "Prelims", cols: ["Section", "Questions", "Marks", "Time"], rows: [["English Language", "30", "30", "20 min"], ["Quantitative Aptitude", "35", "35", "20 min"], ["Reasoning Ability", "35", "35", "20 min"], ["Total", "100", "100", "60 min"]], note: "Qualifying. Negative marking: 0.25 per wrong answer." },
    { title: "Mains", cols: ["Section", "Questions", "Marks"], rows: [["Reasoning & Computer Aptitude", "45", "60"], ["General / Economy / Banking Awareness", "40", "40"], ["English Language", "35", "40"], ["Data Analysis & Interpretation", "35", "60"], ["Objective total (3 hours)", "155", "200"], ["Descriptive (letter + essay, 30 min)", "2", "25"]], note: "Interview is 100 marks. Final merit uses Mains and Interview weightage as per notification." }
  ],
  syllabus: [
    { area: "Reasoning", topics: "Puzzles, seating arrangement, syllogism, inequality, input-output, data sufficiency" },
    { area: "Quant / DI", topics: "Simplification, number series, quadratic equations, data interpretation, arithmetic" },
    { area: "English", topics: "Reading comprehension, cloze, error spotting, para jumbles, vocabulary" },
    { area: "Banking Awareness", topics: "Banking and financial awareness, economy, current affairs" }
  ],
  status: { text: "IBPS calendar 2026–27: PO Prelims 22–23 Aug 2026, Mains 4 Oct 2026. All IBPS dates are tentative until the notification — confirm on ibps.in.", verify: true },
  site: "https://www.ibps.in", tags: ["ibps", "po", "bank po", "probationary officer"]
},
{
  id: "ibps-clerk", cat: "banking", name: "IBPS Clerk", full: "Customer Service Associate (CRP CSA)", body: "Institute of Banking Personnel Selection (IBPS)",
  minEdu: 3, level: "Graduate", qual: "Bachelor's degree in any discipline. Computer literacy and local-language proficiency are needed.",
  ageMin: 20, ageMax: 28, ageText: "20–28 years.", relax: true,
  posts: ["Clerk / Customer Service Associate in participating public sector banks"],
  pay: "Starting basic about ₹24,050, plus allowances.",
  mode: "Computer-based, 2 stages", fee: "₹850 (₹175 for SC/ST/PwBD).",
  stages: ["Preliminary Exam", "Main Exam", "Local Language Test / provisional allotment"],
  pattern: [
    { title: "Prelims", cols: ["Section", "Questions", "Marks"], rows: [["English Language", "30", "30"], ["Numerical Ability", "35", "35"], ["Reasoning Ability", "35", "35"], ["Total (60 min)", "100", "100"]], note: "Negative marking: 0.25 per wrong answer." },
    { title: "Mains", cols: ["Section", "Questions", "Marks"], rows: [["General / Financial Awareness", "50", "50"], ["General English", "40", "40"], ["Reasoning Ability & Computer Aptitude", "50", "60"], ["Quantitative Aptitude", "50", "50"], ["Total (160 min)", "190", "200"]], note: "No interview for Clerk posts." }
  ],
  syllabus: [
    { area: "English", topics: "Comprehension, cloze, error spotting, vocabulary" },
    { area: "Numerical Ability", topics: "Simplification, series, arithmetic, DI" },
    { area: "Reasoning", topics: "Puzzles, seating, syllogism, inequality" },
    { area: "Awareness", topics: "Banking, economy, current affairs, computer basics" }
  ],
  status: { text: "IBPS calendar 2026–27: Clerk Prelims 10–11 Oct 2026, Mains 27 Dec 2026 (tentative). Confirm on ibps.in.", verify: true },
  site: "https://www.ibps.in", tags: ["ibps", "clerk", "csa", "bank clerk"]
},
{
  id: "ibps-rrb-po", cat: "banking", name: "IBPS RRB PO", full: "Officers Scale-I, II & III — Regional Rural Banks (CRP RRB)", body: "Institute of Banking Personnel Selection (IBPS)",
  minEdu: 3, level: "Graduate", qual: "Bachelor's degree. Scale II and III have extra experience or specialist requirements.",
  ageMin: 18, ageMax: 30, ageText: "Scale I: 18–30. Scale II: 21–32. Scale III: 21–40.", relax: true,
  posts: ["Officer Scale-I (Assistant Manager)", "Officer Scale-II (Manager, General Banking Officer and specialists)", "Officer Scale-III (Senior Manager)"],
  pay: "As per the RRB officer scale — see notification.",
  mode: "Computer-based", fee: "Per notification (reduced for SC/ST/PwBD).",
  stages: ["Preliminary Exam (Scale I)", "Main Exam (Scale I)", "Interview (Scale I)", "Single Exam + Interview (Scale II & III)"],
  pattern: [
    { title: "Scale I Prelims", cols: ["Section", "Questions", "Marks"], rows: [["Reasoning", "40", "40"], ["Quantitative Aptitude", "40", "40"], ["Total (45 min)", "80", "80"]], note: "Qualifying. Negative marking: 0.25 per wrong answer." },
    { title: "Scale I Mains", cols: ["Section", "Questions", "Marks"], rows: [["Reasoning", "40", "50"], ["General Awareness", "40", "40"], ["English / Hindi Language", "40", "40"], ["Quantitative Aptitude", "40", "50"], ["Computer Knowledge", "40", "20"], ["Total (120 min)", "200", "200"]], note: "Scale I is shortlisted for Interview from Mains." }
  ],
  syllabus: [
    { area: "Reasoning", topics: "Puzzles, seating arrangement, inequality, syllogism, input-output" },
    { area: "Quant", topics: "Simplification, series, DI, arithmetic" },
    { area: "Awareness & Computer", topics: "Banking, economy, current affairs, computer basics" }
  ],
  status: { text: "IBPS calendar 2026–27: RRB PO (Scale I) Prelims 21–22 Nov 2026, Mains 20 Dec 2026. Officer Scale II & III single exam on 20 Dec 2026 (tentative).", verify: true },
  site: "https://www.ibps.in", tags: ["rrb", "regional rural bank", "gramin bank", "scale 1", "officer scale"]
},
{
  id: "ibps-rrb-clerk", cat: "banking", name: "IBPS RRB Clerk", full: "Office Assistant (Multipurpose) — Regional Rural Banks", body: "Institute of Banking Personnel Selection (IBPS)",
  minEdu: 3, level: "Graduate", qual: "Bachelor's degree. Working knowledge of the local language is preferred.",
  ageMin: 18, ageMax: 28, ageText: "18–28 years.", relax: true,
  posts: ["Office Assistant (Multipurpose) in Regional Rural Banks"],
  pay: "As per RRB scale — see notification.",
  mode: "Computer-based", fee: "Per notification (reduced for SC/ST/PwBD).",
  stages: ["Preliminary Exam", "Main Exam", "Document verification / allotment"],
  pattern: [
    { title: "Prelims", cols: ["Section", "Questions", "Marks"], rows: [["Reasoning", "40", "40"], ["Numerical Ability", "40", "40"], ["Total (45 min)", "80", "80"]], note: "Qualifying. Negative marking: 0.25." },
    { title: "Mains", cols: ["Section", "Questions", "Marks"], rows: [["Reasoning", "40", "50"], ["Numerical Ability", "40", "50"], ["General Awareness", "40", "40"], ["English / Hindi Language", "40", "40"], ["Computer Knowledge", "40", "20"], ["Total (120 min)", "200", "200"]], note: "No interview for Office Assistant." }
  ],
  syllabus: [
    { area: "Reasoning", topics: "Puzzles, seating, syllogism, inequality" },
    { area: "Numerical", topics: "Simplification, series, arithmetic, DI" },
    { area: "Awareness & Computer", topics: "Banking, current affairs, computer basics" }
  ],
  status: { text: "IBPS calendar 2026–27: RRB Clerk Prelims 6, 12 & 13 Dec 2026, Mains 30 Jan 2027 (tentative).", verify: true },
  site: "https://www.ibps.in", tags: ["rrb", "office assistant", "gramin bank"]
},
{
  id: "sbi-po", cat: "banking", name: "SBI PO", full: "State Bank of India — Probationary Officer", body: "State Bank of India",
  minEdu: 3, level: "Graduate", qual: "Bachelor's degree in any discipline (final-year students may apply, as per notification).",
  ageMin: 21, ageMax: 30, ageText: "21–30 years.", relax: true,
  posts: ["Probationary Officer (Deputy Manager after probation)"],
  pay: "Starting basic about ₹48,480, plus allowances.",
  mode: "Computer-based, 3 phases", fee: "Per notification (SC/ST/PwBD exempt).",
  stages: ["Phase I — Prelims", "Phase II — Mains (objective + descriptive)", "Phase III — Psychometric test, Group Exercise, Interview"],
  pattern: [
    { title: "Prelims", cols: ["Section", "Questions", "Marks", "Time"], rows: [["English Language", "30", "30", "20 min"], ["Quantitative Aptitude", "35", "35", "20 min"], ["Reasoning Ability", "35", "35", "20 min"], ["Total", "100", "100", "60 min"]], note: "Qualifying. Negative marking: 0.25 per wrong answer." },
    { title: "Mains", cols: ["Section", "Questions", "Marks"], rows: [["Reasoning & Computer Aptitude", "45", "60"], ["Data Analysis & Interpretation", "35", "60"], ["General / Economy / Banking Awareness", "40", "40"], ["English Language", "35", "40"], ["Objective total (3 hours)", "155", "200"], ["Descriptive (30 min)", "2", "50"]], note: "Phase III carries 50 marks (Group Exercise + Interview). Final merit combines scaled Phase II and Phase III scores." }
  ],
  syllabus: [
    { area: "Reasoning", topics: "Puzzles, seating, syllogism, coding-decoding, data sufficiency" },
    { area: "Quant / DI", topics: "Simplification, series, quadratic equations, DI, arithmetic" },
    { area: "English", topics: "Comprehension, cloze, error spotting, vocabulary, letter and essay writing" },
    { area: "Banking Awareness", topics: "Banking, economy, current affairs" }
  ],
  status: { text: "SBI releases notifications on its own timeline. Check sbi.co.in/careers for the current cycle.", verify: true },
  site: "https://sbi.co.in/web/careers", tags: ["sbi", "po", "state bank"]
},
{
  id: "sbi-clerk", cat: "banking", name: "SBI Clerk", full: "State Bank of India — Junior Associate (Customer Support & Sales)", body: "State Bank of India",
  minEdu: 3, level: "Graduate", qual: "Bachelor's degree in any discipline. Local-language proficiency is tested.",
  ageMin: 20, ageMax: 28, ageText: "20–28 years.", relax: true,
  posts: ["Junior Associate (Customer Support & Sales)"],
  pay: "Starting basic about ₹26,730, plus allowances.",
  mode: "Computer-based", fee: "Per notification (SC/ST/PwBD exempt).",
  stages: ["Preliminary Exam", "Main Exam", "Local Language Test"],
  pattern: [
    { title: "Prelims", cols: ["Section", "Questions", "Marks"], rows: [["English Language", "30", "30"], ["Numerical Ability", "35", "35"], ["Reasoning Ability", "35", "35"], ["Total (60 min)", "100", "100"]], note: "Negative marking: 0.25 per wrong answer." },
    { title: "Mains", cols: ["Section", "Questions", "Marks"], rows: [["General / Financial Awareness", "50", "50"], ["General English", "40", "40"], ["Quantitative Aptitude", "50", "50"], ["Reasoning & Computer Aptitude", "50", "60"], ["Total (160 min)", "190", "200"]], note: "Local Language Test is qualifying." }
  ],
  syllabus: [
    { area: "English", topics: "Comprehension, cloze, error spotting, vocabulary" },
    { area: "Numerical", topics: "Simplification, series, arithmetic, DI" },
    { area: "Reasoning", topics: "Puzzles, seating, syllogism" },
    { area: "Awareness", topics: "Banking, economy, current affairs" }
  ],
  status: { text: "SBI Clerk notifications are not on a fixed schedule. Check sbi.co.in/careers for the current cycle.", verify: true },
  site: "https://sbi.co.in/web/careers", tags: ["sbi", "clerk", "junior associate"]
},
{
  id: "rbi-grade-b", cat: "banking", name: "RBI Grade B", full: "Reserve Bank of India — Officers in Grade 'B' (DR)", body: "Reserve Bank of India",
  minEdu: 3, level: "Graduate", qual: "Bachelor's degree with at least 60% marks (50% for SC/ST/PwBD), or Master's with at least 55%. Specialist streams (DEPR, DSIM) need specific postgraduate degrees.",
  ageMin: 21, ageMax: 30, ageText: "21–30 years for General stream.", relax: true,
  posts: ["Officer Grade B (General)", "Officer Grade B (DEPR — Economic & Policy Research)", "Officer Grade B (DSIM — Statistics & Information Management)"],
  pay: "Starting basic about ₹78,450 (with advance increments) — verify in the current notification.",
  mode: "Computer-based, 3 stages", fee: "Per notification (SC/ST/PwBD concession).",
  stages: ["Phase I (Objective)", "Phase II (3 papers)", "Interview"],
  pattern: [
    { title: "Phase I", cols: ["Section", "Questions", "Marks"], rows: [["General Awareness", "80", "80"], ["English Language", "30", "30"], ["Quantitative Aptitude", "30", "30"], ["Reasoning", "60", "60"], ["Total (120 min)", "200", "200"]], note: "Qualifying for Phase II. Negative marking: 0.25 per wrong answer. Section split follows the recent pattern — confirm in the current notification." },
    { title: "Phase II", cols: ["Paper", "Marks", "Time"], rows: [["Paper I — Economic & Social Issues", "90", "90 min"], ["Paper II — English (Writing Skills)", "100", "90 min"], ["Paper III — Finance & Management", "90", "90 min"]], note: "Interview carries 75 marks. Final merit uses Phase II + Interview." }
  ],
  syllabus: [
    { area: "Phase I", topics: "General awareness (banking, economy, current affairs), English, Quant, Reasoning" },
    { area: "Phase II", topics: "Economic and social issues (growth, development, Indian economy), English writing, finance and management" }
  ],
  status: { text: "RBI notifies Grade B roughly once a year. Check opportunities.rbi.org.in for the current cycle.", verify: true },
  site: "https://opportunities.rbi.org.in", tags: ["rbi", "grade b", "officer", "reserve bank"]
},
{
  id: "rbi-assistant", cat: "banking", name: "RBI Assistant", full: "Reserve Bank of India — Assistant", body: "Reserve Bank of India",
  minEdu: 3, level: "Graduate", qual: "Bachelor's degree with at least 50% marks (SC/ST/PwBD relaxed). Computer knowledge needed.",
  ageMin: 20, ageMax: 28, ageText: "20–28 years.", relax: true,
  posts: ["Assistant (office-wise vacancies across RBI offices)"],
  pay: "Per the current RBI notification — verify.",
  mode: "Computer-based", fee: "Per notification.",
  stages: ["Preliminary Exam", "Main Exam", "Language Proficiency Test (LPT)"],
  pattern: [
    { title: "Prelims", cols: ["Section", "Questions", "Marks"], rows: [["English Language", "30", "30"], ["Numerical Ability", "35", "35"], ["Reasoning Ability", "35", "35"], ["Total (60 min)", "100", "100"]], note: "Qualifying. Negative marking: 0.25 per wrong answer." },
    { title: "Mains", cols: ["Section", "Questions", "Marks"], rows: [["Reasoning", "40", "40"], ["English Language", "40", "40"], ["Numerical Ability", "40", "40"], ["General Awareness", "40", "40"], ["Computer Knowledge", "40", "40"], ["Total (135 min)", "200", "200"]], note: "LPT is in the language of the state of application." }
  ],
  syllabus: [
    { area: "Core", topics: "English, numerical ability, reasoning, general awareness, computer knowledge" }
  ],
  status: { text: "RBI Assistant recruitment is irregular. Check opportunities.rbi.org.in.", verify: true },
  site: "https://opportunities.rbi.org.in", tags: ["rbi", "assistant"]
},
{
  id: "lic", cat: "banking", name: "LIC (AAO, ADO, Assistant)", full: "Life Insurance Corporation of India", body: "Life Insurance Corporation of India (LIC)",
  minEdu: 3, level: "Graduate", qual: "Bachelor's degree. AAO Specialist posts (CA, Actuarial, IT, Legal, Rajbhasha) need specific qualifications.",
  ageMin: 21, ageMax: 30, ageText: "21–30 years (post-wise).", relax: true,
  posts: ["Assistant Administrative Officer (AAO) — Generalist & Specialist", "Apprentice Development Officer (ADO)", "Assistant"],
  pay: "AAO starting basic about ₹53,600. ADO and Assistant — see notification.",
  mode: "Computer-based", fee: "Per notification.",
  stages: ["Preliminary Exam", "Main Exam (objective + descriptive)", "Interview (AAO / ADO)"],
  pattern: [
    { title: "Prelims (typical)", cols: ["Section", "Questions", "Marks"], rows: [["Reasoning Ability", "35", "35"], ["Numerical Ability", "35", "35"], ["English Language (qualifying)", "30", "—"]], note: "Prelims is qualifying. Section marks change by year and post — confirm in the notification." }
  ],
  syllabus: [
    { area: "Prelims", topics: "Reasoning, numerical ability, English" },
    { area: "Mains", topics: "Reasoning, general knowledge, data analysis, insurance and financial market awareness, descriptive writing" }
  ],
  status: { text: "LIC notifies posts irregularly. Check licindia.in/careers for the current cycle.", verify: true },
  site: "https://licindia.in/careers", tags: ["lic", "aao", "ado", "insurance"]
},
{
  id: "nicl", cat: "banking", name: "NICL (AO & Assistant)", full: "National Insurance Company Limited", body: "National Insurance Company Limited (NICL)",
  minEdu: 3, level: "Graduate", qual: "Bachelor's degree. Specialist Administrative Officer posts need professional qualifications.",
  ageMin: 21, ageMax: 30, ageText: "AO: 21–30 years. Assistant: 18–30 years (check notification).", relax: true,
  posts: ["Administrative Officer (Generalist & Specialist)", "Assistant"],
  pay: "Per the current NICL notification.",
  mode: "Computer-based", fee: "Per notification.",
  stages: ["Preliminary Exam", "Main Exam", "Interview (AO) / Regional Language Test (Assistant)"],
  pattern: [],
  syllabus: [{ area: "Core", topics: "English, reasoning, quantitative aptitude, general awareness, insurance and financial awareness" }],
  status: { text: "NICL recruitment is irregular. Check nationalinsurance.nic.co.in for notices.", verify: true },
  site: "https://nationalinsurance.nic.co.in", tags: ["nicl", "national insurance", "insurance"]
}
);

/* ---------- RAILWAYS ---------- */
GEW_DATA.exams.push(
{
  id: "rrb-ntpc", cat: "railways", name: "RRB NTPC", full: "Non-Technical Popular Categories (Graduate & Undergraduate)", body: "Railway Recruitment Boards (RRB)",
  minEdu: 2, level: "12th pass / Graduate", qual: "Undergraduate posts: 12th pass. Graduate posts: Bachelor's degree in any discipline.",
  ageMin: 18, ageMax: 33, ageText: "Undergraduate: 18–30 years. Graduate: 18–33 years.", relax: true,
  posts: ["Graduate: Station Master, Goods Train Manager, Traffic Assistant, Chief Commercial-cum-Ticket Supervisor, Junior Account Assistant-cum-Typist, Senior Clerk-cum-Typist", "Undergraduate: Commercial-cum-Ticket Clerk, Accounts Clerk-cum-Typist, Junior Clerk-cum-Typist, Trains Clerk"],
  pay: "Graduate posts: Level 5–6 (₹29,200–35,400 starting). Undergraduate posts: Level 2–3 (₹19,900–21,700 starting).",
  mode: "Computer-based (CBT) + skill test", fee: "General ₹500 (₹400 refunded on appearing in CBT). SC/ST/ExSM/women/PwBD etc. ₹250 (refunded on appearing).",
  stages: ["CBT-1", "CBT-2", "Typing Skill Test / CBAT (post-wise)", "Document Verification", "Medical Examination"],
  pattern: [
    { title: "CBT-1", cols: ["Section", "Questions"], rows: [["Mathematics", "30"], ["General Intelligence & Reasoning", "30"], ["General Awareness", "40"], ["Total (90 min)", "100"]], note: "Negative marking: 1/3 mark per wrong answer. Qualifying for CBT-2." },
    { title: "CBT-2", cols: ["Section", "Questions"], rows: [["Mathematics", "35"], ["General Intelligence & Reasoning", "35"], ["General Awareness", "50"], ["Total (90 min)", "120"]], note: "Negative marking: 1/3 mark. Typing test applies to clerk/typist posts; CBAT applies to Station Master and similar posts." }
  ],
  syllabus: [
    { area: "Mathematics", topics: "Number system, percentage, ratio, time & work, SI/CI, geometry, mensuration, trigonometry, statistics" },
    { area: "Reasoning", topics: "Analogy, series, coding-decoding, syllogism, puzzles, Venn diagrams" },
    { area: "General Awareness", topics: "Current affairs, static GK, science, polity, history, geography, economy" }
  ],
  status: { text: "RRB calendar 2026–27 (released 5 Dec 2025) puts fresh NTPC notifications around the end of 2026. Check the regional RRB websites and rrbapply.gov.in.", verify: true },
  site: "https://www.rrbcdg.gov.in", tags: ["ntpc", "railway", "station master", "clerk", "rrb"]
},
{
  id: "rrb-group-d", cat: "railways", name: "RRB Group D", full: "Level-1 Posts (Track Maintainer, Helper/Assistant, Pointsman and more)", body: "Railway Recruitment Boards (RRB)",
  minEdu: 1, level: "10th pass / ITI", qual: "10th pass, ITI, or NCVT National Apprenticeship Certificate (as per notification).",
  ageMin: 18, ageMax: 33, ageText: "18–33 years.", relax: true,
  posts: ["Track Maintainer Grade IV", "Assistant (Track Machine, Bridge, S&T, Workshop, Loco Shed, Carriage & Wagon)", "Pointsman", "Hospital Assistant and other Level-1 posts"],
  pay: "Level 1 (₹18,000–56,900).",
  mode: "Computer-based (CBT) + physical test", fee: "General ₹500 (₹400 refunded on appearing in CBT). SC/ST/ExSM/women/PwBD etc. ₹250 (refunded on appearing).",
  stages: ["CBT", "Physical Efficiency Test (PET)", "Document Verification", "Medical Examination"],
  pattern: [
    { title: "CBT", cols: ["Section", "Questions"], rows: [["Mathematics", "25"], ["General Intelligence & Reasoning", "30"], ["General Science", "25"], ["General Awareness & Current Affairs", "20"], ["Total (90 min)", "100"]], note: "Negative marking: 1/3 mark per wrong answer." },
    { title: "PET (male)", cols: ["Test", "Standard"], rows: [["Lift and carry weight", "35 kg for 100 m in 2 minutes"], ["Run", "1,000 m in 4 min 15 sec"]], note: "Female: 20 kg for 100 m in 2 minutes; 1,000 m run in 5 min 40 sec. PET is qualifying." }
  ],
  syllabus: [
    { area: "Mathematics", topics: "Number system, BODMAS, percentage, ratio, time & work, SI/CI, geometry, mensuration" },
    { area: "Reasoning", topics: "Analogy, series, coding-decoding, puzzles, Venn diagrams" },
    { area: "General Science", topics: "Physics, chemistry, life sciences up to Class 10" },
    { area: "Current Affairs", topics: "Recent events, sports, awards, static GK" }
  ],
  status: { text: "A Group D (Level-1) cycle with 32,438 posts (CEN 08/2024) reached the PET stage; a fresh Level-1 notification of about 22,195 posts was reported in early 2026. Check rrbapply.gov.in for the current CEN.", verify: true },
  site: "https://www.rrbcdg.gov.in", tags: ["group d", "level 1", "track maintainer", "pointsman", "railway"]
},
{
  id: "rrb-alp", cat: "railways", name: "RRB ALP & Technician", full: "Assistant Loco Pilot and Technician Grades", body: "Railway Recruitment Boards (RRB)",
  minEdu: 1, level: "10th + ITI / Diploma", qual: "Matric/SSLC plus ITI in notified trades, or Diploma/Degree in notified engineering streams (post-wise).",
  ageMin: 18, ageMax: 33, ageText: "ALP and Technician Gr III: 18–30 years. Technician Gr I Signal: 18–33 years.", relax: true,
  posts: ["Assistant Loco Pilot (ALP)", "Technician Grade I (Signal)", "Technician Grade III"],
  pay: "ALP and Technician Gr III: Level 2 (₹19,900–63,200). Technician Gr I Signal: Level 5 (₹29,200–92,300).",
  mode: "Computer-based (CBT); CBAT for ALP", fee: "General ₹500 (₹400 refunded on appearing in CBT). SC/ST/ExSM/women/PwBD etc. ₹250 (refunded on appearing).",
  stages: ["CBT-1", "CBT-2 (Part A + Part B)", "Computer-Based Aptitude Test (CBAT) — ALP only", "Document Verification", "Medical Examination"],
  pattern: [
    { title: "CBT-1 (ALP)", cols: ["Detail", "Value"], rows: [["Questions / Marks", "75 / 75"], ["Duration", "60 minutes"], ["Subjects", "Mathematics, Reasoning, Basic Science & Engineering, General Awareness"]], note: "Negative marking: 1/3 mark per wrong answer." },
    { title: "CBT-2 (ALP)", cols: ["Part", "Questions", "Time"], rows: [["Part A (core subjects)", "100", "90 min"], ["Part B (trade subject)", "75", "60 min"]], note: "Part B is qualifying (minimum marks apply) and is based on the ITI/Diploma trade. CBAT is a qualifying aptitude test for ALP." }
  ],
  syllabus: [
    { area: "Maths & Reasoning", topics: "Arithmetic, algebra, geometry, reasoning" },
    { area: "Basic Science & Engineering", topics: "Physics, chemistry and basic engineering up to Class 10 / ITI level" },
    { area: "Trade Subject (Part B)", topics: "Based on ITI or diploma trade" }
  ],
  status: { text: "ALP cycle CEN 01/2025 is in progress as per the RRB calendar. Fresh Technician and ALP notifications follow the 2026–27 RRB calendar — check the regional RRB sites.", verify: true },
  site: "https://www.rrbcdg.gov.in", tags: ["alp", "technician", "loco pilot", "iti", "diploma"]
},
{
  id: "rrb-asm", cat: "railways", name: "RRB ASM / Station Master", full: "Assistant Station Master / Station Master (NTPC graduate stream) and Section Controller", body: "Railway Recruitment Boards (RRB)",
  minEdu: 3, level: "Graduate", qual: "Bachelor's degree in any discipline.",
  ageMin: 18, ageMax: 33, ageText: "Station Master: 18–33 years. Section Controller: 20–33 years (check notification).", relax: true,
  posts: ["Station Master (via NTPC graduate stream)", "Assistant Station Master / Traffic Assistant", "Section Controller (separate CEN)"],
  pay: "Level 6 (₹35,400 starting) for Station Master.",
  mode: "Computer-based (CBT) + aptitude test", fee: "General ₹500 (₹400 refunded on appearing in CBT). SC/ST/ExSM/women/PwBD etc. ₹250 (refunded on appearing).",
  stages: ["CBT-1", "CBT-2", "Computer-Based Aptitude Test (CBAT)", "Document Verification", "Medical Examination (high standard)"],
  pattern: [{ title: "Written stages", cols: ["Stage", "Pattern"], rows: [["CBT-1 and CBT-2", "Same as RRB NTPC (Maths, Reasoning, General Awareness)"], ["CBAT", "Aptitude test; qualifying, required for Station Master and similar posts"]], note: "Section Controller has its own CEN and pattern — read the current notification." }],
  syllabus: [{ area: "Core", topics: "Same as RRB NTPC: Maths, Reasoning, General Awareness" }],
  status: { text: "Section Controller CEN 04/2025 (368 posts) was in progress in 2026. Station Master hiring follows NTPC graduate notifications.", verify: true },
  site: "https://www.rrbcdg.gov.in", tags: ["asm", "station master", "section controller", "traffic assistant"]
}
);

/* ---------- COMING UP (shown on Home) ----------
   Sorted by date. All dates come from official calendars and are tentative until the notice.
   Remove past rows and add new ones as the cycle moves on. */
GEW_DATA.upcoming = [
  { when: "21–22 Nov 2026", title: "IBPS RRB PO — Prelims", id: "ibps-rrb-po" },
  { when: "6, 12 & 13 Dec 2026", title: "IBPS RRB Clerk — Prelims", id: "ibps-rrb-clerk" },
  { when: "Dec 2026 (tentative)", title: "SSC CGL — Tier-II", id: "ssc-cgl" },
  { when: "20 Dec 2026", title: "IBPS RRB PO — Mains; Officer Scale II & III single exam", id: "ibps-rrb-po" },
  { when: "27 Dec 2026", title: "IBPS Clerk — Mains", id: "ibps-clerk" },
  { when: "Jan–Mar 2027 (tentative)", title: "SSC GD Constable — CBE", id: "ssc-gd" },
  { when: "30 Jan 2027", title: "IBPS RRB Clerk — Mains", id: "ibps-rrb-clerk" }
];
