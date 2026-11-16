/* ============================================================
   GEW Counsellor Hub — state-level exams
   State recruitment rules (age, domicile, reservation, language) change
   often. Every entry is flagged "Verify" — read the latest state
   notification before quoting numbers to a student.
   ============================================================ */
(function () {
  var D = window.GEW_DATA;

  D.states = [
    { id: "up", name: "Uttar Pradesh", short: "UP" },
    { id: "bihar", name: "Bihar", short: "BR" },
    { id: "mp", name: "Madhya Pradesh", short: "MP" },
    { id: "jk", name: "Jammu & Kashmir", short: "J&K" },
    { id: "cg", name: "Chhattisgarh", short: "CG" },
    { id: "odisha", name: "Odisha", short: "OD" },
    { id: "wb", name: "West Bengal", short: "WB" },
    { id: "uk", name: "Uttarakhand", short: "UK" },
    { id: "assam", name: "Assam", short: "AS" },
    { id: "maharashtra", name: "Maharashtra", short: "MH" },
    { id: "ap", name: "Andhra Pradesh", short: "AP" }
  ];

  var STATE_WARNING = "State rules on age, domicile, reservation and local language differ from central exams. Read the latest state notification before quoting numbers.";
  var GENERIC_STATUS = { text: "State recruitment is notified irregularly. Check the official site of the conducting body for the current vacancy and exam dates.", verify: true };

  function S(o) {
    var e = {
      id: o.id, cat: "state", state: o.state, name: o.name, full: o.full || o.name, body: o.body,
      minEdu: o.minEdu, level: o.level, qual: o.qual,
      ageMin: o.ageMin || null, ageMax: o.ageMax || null, ageText: o.ageText || "As per the state notification (post-wise, with state relaxations).",
      relax: false,
      posts: o.posts || [], pay: o.pay || "As per the state pay matrix for the post — see notification.",
      mode: o.mode || "As notified", fee: o.fee || "As per notification.",
      stages: o.stages, pattern: o.pattern || [], syllabus: o.syllabus || [],
      status: o.status || GENERIC_STATUS, site: o.site, tags: o.tags || [],
      stateNote: o.stateNote || STATE_WARNING, scope: o.scope || ""
    };
    D.exams.push(e);
  }

  /* ---------------- UTTAR PRADESH ---------------- */
  S({ id: "upsssc-pet", state: "up", name: "UPSSSC PET", full: "Preliminary Eligibility Test", body: "Uttar Pradesh Subordinate Service Selection Commission (UPSSSC)",
    minEdu: 1, level: "10th pass", qual: "High School (10th) pass or equivalent.",
    ageText: "Minimum 18 years. Upper age limit is checked against the post at the time of the main recruitment.",
    posts: ["PET score is the entry gate for most UPSSSC Group-C posts, such as Junior Assistant, Lekhpal, VDO and others"],
    stages: ["PET (objective, OMR/CBT)", "Post-specific main exam / merit as notified"],
    pattern: [{ title: "PET (recent pattern)", cols: ["Detail", "Value"], rows: [["Questions / Marks", "100 / 100"], ["Duration", "2 hours"], ["Negative marking", "0.25 per wrong answer"]], note: "Confirm the validity period of the PET score in the latest notice." }],
    syllabus: [{ area: "Core", topics: "General Hindi, English, Maths, reasoning, general knowledge, current affairs, science, Indian polity, history, geography, economy, UP-specific GK" }],
    site: "https://upsssc.gov.in", tags: ["upsssc", "pet", "uttar pradesh", "up", "10th"] });

  S({ id: "upsssc-vdo", state: "up", name: "UPSSSC VDO", full: "Village Development Officer (Gram Panchayat / Gram Vikas Adhikari)", body: "UPSSSC",
    minEdu: 3, level: "Graduate", qual: "Bachelor's degree. A valid PET score is required for UPSSSC recruitments.",
    ageText: "Generally 21–40 years under UP state rules (relaxation as per category).",
    posts: ["Village Development Officer / Gram Panchayat Adhikari"],
    stages: ["PET score (eligibility)", "Mains / written exam as notified", "Document Verification"],
    site: "https://upsssc.gov.in", tags: ["vdo", "upsssc", "gram vikas adhikari", "uttar pradesh", "up"] });

  S({ id: "up-police-constable", state: "up", name: "UP Police Constable", full: "Constable Recruitment — UP Police", body: "Uttar Pradesh Police Recruitment & Promotion Board (UPPRPB)",
    minEdu: 2, level: "12th pass", qual: "12th (Intermediate) pass or equivalent.",
    ageText: "Generally 18–22 years for general category, with relaxation for reserved categories and some other groups.",
    posts: ["Constable (Civil Police, PAC and other units)"],
    stages: ["Written exam", "Document Verification", "Physical Standard Test (PST) / Physical Efficiency Test (PET)"],
    pattern: [{ title: "Written exam (recent pattern)", cols: ["Detail", "Value"], rows: [["Questions / Marks", "150 / 300"], ["Duration", "2 hours"], ["Subjects", "General Hindi, General Knowledge, Numerical & Mental Ability, Mental Aptitude / IQ / Reasoning"], ["Negative marking", "0.25 per wrong answer"]], note: "Confirm in the latest notification." }],
    site: "https://uppbpb.gov.in", tags: ["up police", "constable", "uttar pradesh", "up", "police"] });

  S({ id: "up-police-si", state: "up", name: "UP Police SI", full: "Sub-Inspector (Civil Police, Platoon Commander, Fire and others)", body: "UPPRPB",
    minEdu: 3, level: "Graduate", qual: "Bachelor's degree.",
    ageText: "Generally 21–28 years under UP rules, with category relaxations.",
    posts: ["Sub-Inspector (Civil Police)", "Platoon Commander (PAC)", "other SI-level posts as notified"],
    stages: ["Online written exam", "Document Verification & PST / PET", "Final merit"],
    site: "https://uppbpb.gov.in", tags: ["up police", "si", "sub inspector", "uttar pradesh", "up", "police"] });

  S({ id: "allahabad-hc", state: "up", name: "Allahabad High Court", full: "Group C & D and other staff recruitment", body: "High Court of Judicature at Allahabad",
    minEdu: 1, level: "10th / 12th / Graduate (post-wise)", qual: "Varies by post — e.g. Junior Assistant, Stenographer, Driver, Peon, Review Officer.",
    posts: ["Junior Assistant", "Stenographer", "Driver", "Review Officer / Assistant Review Officer", "Group D staff"],
    stages: ["Written exam", "Skill / typing / stenography test (post-wise)", "Document Verification"],
    site: "https://www.allahabadhighcourt.in", tags: ["allahabad high court", "ahc", "court", "uttar pradesh", "up"] });

  /* ---------------- BIHAR ---------------- */
  S({ id: "bssc-cgl", state: "bihar", name: "BSSC CGL", full: "Combined Graduate Level Examination", body: "Bihar Staff Selection Commission (BSSC)",
    minEdu: 3, level: "Graduate", qual: "Bachelor's degree.",
    posts: ["Graduate-level posts across Bihar government departments"],
    stages: ["Written exam (Prelims and Mains as notified)", "Document Verification"],
    site: "https://bssc.bihar.gov.in", tags: ["bssc", "cgl", "bihar"] });

  S({ id: "bssc-inter", state: "bihar", name: "BSSC Inter Level", full: "Inter Level (12th pass) Combined Competitive Examination", body: "Bihar Staff Selection Commission (BSSC)",
    minEdu: 2, level: "12th pass", qual: "12th (Intermediate) pass.",
    posts: ["Clerical and other Inter-level posts in Bihar government departments"],
    stages: ["Written exam", "Document Verification"],
    site: "https://bssc.bihar.gov.in", tags: ["bssc", "inter level", "bihar", "12th"] });

  S({ id: "bihar-police-constable", state: "bihar", name: "Bihar Police Constable", full: "Constable Recruitment — Bihar Police", body: "Central Selection Board of Constable (CSBC), Bihar",
    minEdu: 2, level: "12th pass", qual: "12th (Intermediate) pass.",
    posts: ["Constable (Bihar Police)"],
    stages: ["Written exam", "Physical Efficiency Test (PET)", "Document Verification & Medical"],
    site: "https://csbc.bihar.gov.in", tags: ["bihar police", "constable", "csbc", "bihar", "police"] });

  S({ id: "bihar-police-si", state: "bihar", name: "Bihar Police SI", full: "Sub-Inspector of Police", body: "Bihar Police Sub-ordinate Services Commission (BPSSC)",
    minEdu: 3, level: "Graduate", qual: "Bachelor's degree.",
    posts: ["Sub-Inspector of Police"],
    stages: ["Preliminary exam", "Main exam", "Physical Efficiency Test (PET)", "Medical & Document Verification"],
    site: "https://bpssc.bihar.gov.in", tags: ["bihar police", "si", "sub inspector", "bpssc", "bihar", "police"] });

  /* ---------------- MADHYA PRADESH ---------------- */
  S({ id: "mpesb", state: "mp", name: "MP Vyapam / MPESB", full: "MP Employees Selection Board — Police Constable, Patwari, Group-4 and other posts", body: "Madhya Pradesh Employees Selection Board (MPESB, formerly Vyapam)",
    minEdu: 1, level: "10th / 12th / Graduate (post-wise)", qual: "Varies by post — Police Constable (12th), Patwari (graduate), Group-4 and others (post-wise).",
    posts: ["Police Constable", "Patwari", "Group-4 / clerical posts", "other posts notified by MPESB"],
    stages: ["Written exam (CBT)", "Physical tests for police posts", "Document Verification"],
    site: "https://esb.mp.gov.in", tags: ["vyapam", "mpesb", "esb", "madhya pradesh", "mp", "patwari", "police"] });

  /* ---------------- JAMMU & KASHMIR ---------------- */
  var JKSSB = "Jammu & Kashmir Services Selection Board (JKSSB)";
  S({ id: "jk-police-constable", state: "jk", name: "J&K Police Constable", full: "Constable (Executive) — J&K Police", body: JKSSB,
    minEdu: 2, level: "12th pass", qual: "12th pass.", posts: ["Constable (Executive)"],
    stages: ["Written exam", "Physical Standard & Endurance Test", "Document Verification"],
    site: "https://jkssb.nic.in", tags: ["jk", "j&k", "jammu", "kashmir", "constable", "police", "jkssb"] });
  S({ id: "jk-police-si", state: "jk", name: "J&K Police SI", full: "Sub-Inspector — J&K Police", body: JKSSB,
    minEdu: 3, level: "Graduate", qual: "Bachelor's degree.", posts: ["Sub-Inspector (Executive)"],
    stages: ["Written exam", "Physical tests", "Interview / Document Verification as notified"],
    site: "https://jkssb.nic.in", tags: ["jk", "j&k", "jammu", "kashmir", "si", "sub inspector", "police", "jkssb"] });
  S({ id: "jk-junior-assistant", state: "jk", name: "JKSSB Junior Assistant", full: "Junior Assistant", body: JKSSB,
    minEdu: 2, level: "12th pass", qual: "12th pass; computer proficiency as specified.", posts: ["Junior Assistant"],
    stages: ["Written exam", "Computer / typing test as notified", "Document Verification"],
    site: "https://jkssb.nic.in", tags: ["jk", "j&k", "junior assistant", "jkssb", "clerk"] });
  S({ id: "jk-naib-tehsildar", state: "jk", name: "JKSSB Naib Tehsildar", full: "Naib Tehsildar", body: JKSSB,
    minEdu: 3, level: "Graduate", qual: "Bachelor's degree; knowledge of Urdu is required — check the notification.", posts: ["Naib Tehsildar"],
    stages: ["Written exam", "Document Verification"],
    site: "https://jkssb.nic.in", tags: ["jk", "j&k", "naib tehsildar", "revenue", "jkssb"] });
  S({ id: "jk-patwari", state: "jk", name: "JKSSB Patwari", full: "Patwari", body: JKSSB,
    minEdu: 2, level: "12th pass", qual: "12th pass; knowledge of Urdu is required — check the notification.", posts: ["Patwari"],
    stages: ["Written exam", "Document Verification"],
    site: "https://jkssb.nic.in", tags: ["jk", "j&k", "patwari", "revenue", "jkssb"] });
  S({ id: "jk-panchayat-secretary", state: "jk", name: "JKSSB Panchayat Secretary", full: "Panchayat Secretary", body: JKSSB,
    minEdu: 2, level: "12th pass", qual: "12th pass — check the notification.", posts: ["Panchayat Secretary (Rural Development)"],
    stages: ["Written exam", "Document Verification"],
    site: "https://jkssb.nic.in", tags: ["jk", "j&k", "panchayat secretary", "jkssb"] });
  S({ id: "jk-teacher-gl", state: "jk", name: "J&K General Line Teacher", full: "Teacher (General Line) — School Education Department", body: JKSSB,
    minEdu: 3, level: "Graduate + teaching qualification", qual: "Graduation with the required teaching qualification — check the notification.", posts: ["Teacher (General Line)"],
    stages: ["Written exam", "Document Verification"],
    site: "https://jkssb.nic.in", tags: ["jk", "j&k", "teacher", "general line", "jkssb"] });

  /* ---------------- CHHATTISGARH ---------------- */
  var CGV = "Chhattisgarh Professional Examination Board (Vyapam) / department as notified";
  S({ id: "cg-patwari", state: "cg", name: "Chhattisgarh Patwari", full: "Patwari", body: CGV,
    minEdu: 2, level: "12th / Graduate (check notification)", qual: "As specified in the latest notification — qualification and computer requirements change between cycles.", posts: ["Patwari"],
    stages: ["Written exam", "Document Verification"], site: "https://vyapam.cgstate.gov.in", tags: ["chhattisgarh", "cg", "patwari", "vyapam"] });
  S({ id: "cg-ri", state: "cg", name: "Chhattisgarh Revenue Inspector", full: "Revenue Inspector", body: CGV,
    minEdu: 3, level: "Graduate", qual: "Bachelor's degree — check the notification.", posts: ["Revenue Inspector"],
    stages: ["Written exam", "Document Verification"], site: "https://vyapam.cgstate.gov.in", tags: ["chhattisgarh", "cg", "revenue inspector", "ri", "vyapam"] });
  S({ id: "cg-hostel-warden", state: "cg", name: "Chhattisgarh Hostel Warden", full: "Hostel / Ashram Warden", body: CGV,
    minEdu: 2, level: "As per notification", qual: "As specified in the latest notification.", posts: ["Hostel / Ashram Warden"],
    stages: ["Written exam", "Document Verification"], site: "https://vyapam.cgstate.gov.in", tags: ["chhattisgarh", "cg", "hostel warden", "vyapam"] });
  S({ id: "cg-police", state: "cg", name: "Chhattisgarh Police (Constable & SI)", full: "Constable and Sub-Inspector", body: CGV,
    minEdu: 2, level: "12th (Constable) / Graduate (SI)", qual: "Constable: 12th pass. SI: Bachelor's degree.", posts: ["Constable", "Sub-Inspector"],
    stages: ["Written exam", "Physical Standard & Efficiency Tests", "Document Verification & Medical"], site: "https://vyapam.cgstate.gov.in", tags: ["chhattisgarh", "cg", "police", "constable", "si", "vyapam"] });

  /* ---------------- ODISHA ---------------- */
  S({ id: "odisha-police", state: "odisha", name: "Odisha Police (SI & Constable)", full: "Sub-Inspector and Constable", body: "Odisha Police recruitment board / commission as notified",
    minEdu: 2, level: "12th (Constable) / Graduate (SI)", qual: "Constable: 12th pass (check notification). SI: Bachelor's degree.", posts: ["Sub-Inspector", "Constable"],
    stages: ["Written exam", "Physical Standard & Efficiency Tests", "Document Verification & Medical"], site: "https://odishapolice.gov.in", tags: ["odisha", "police", "si", "constable", "odisha police"] });
  S({ id: "ossc-cgl", state: "odisha", name: "OSSC CGL", full: "Combined Graduate Level Examination", body: "Odisha Staff Selection Commission (OSSC)",
    minEdu: 3, level: "Graduate", qual: "Bachelor's degree.", posts: ["Graduate-level posts in Odisha government departments"],
    stages: ["Written exam", "Document Verification"], site: "https://ossc.gov.in", tags: ["ossc", "cgl", "odisha"] });
  S({ id: "ossc-chsl", state: "odisha", name: "OSSC CHSL", full: "Combined Higher Secondary Level Examination", body: "Odisha Staff Selection Commission (OSSC)",
    minEdu: 2, level: "12th pass", qual: "12th pass.", posts: ["Higher-secondary-level posts in Odisha government departments"],
    stages: ["Written exam", "Skill test as notified", "Document Verification"], site: "https://ossc.gov.in", tags: ["ossc", "chsl", "odisha", "12th"] });
  S({ id: "osssc-revenue", state: "odisha", name: "Odisha RI / ARI / Amin", full: "Revenue Inspector, ARI and Amin", body: "Odisha Sub-ordinate Staff Selection Commission (OSSSC)",
    minEdu: 2, level: "As per notification", qual: "As specified in the latest OSSSC notification.", posts: ["Revenue Inspector (RI)", "ARI", "Amin"],
    stages: ["Written exam", "Document Verification"], site: "https://osssc.gov.in", tags: ["odisha", "ri", "ari", "amin", "revenue inspector", "osssc"] });
  S({ id: "odisha-steno-ja", state: "odisha", name: "Odisha Stenographer & Junior Assistant", full: "Stenographer and Junior Assistant", body: "OSSC / OSSSC as notified",
    minEdu: 2, level: "12th / Graduate (post-wise)", qual: "As specified in the latest notification.", posts: ["Stenographer", "Junior Assistant"],
    stages: ["Written exam", "Skill / shorthand test as notified", "Document Verification"], site: "https://ossc.gov.in", tags: ["odisha", "stenographer", "junior assistant", "ossc", "osssc"] });
  S({ id: "odisha-peo", state: "odisha", name: "Odisha PEO", full: "Panchayat Executive Officer", body: "OSSSC",
    minEdu: 2, level: "As per notification", qual: "As specified in the latest OSSSC notification.", posts: ["Panchayat Executive Officer (PEO)"],
    stages: ["Written exam", "Document Verification"], site: "https://osssc.gov.in", tags: ["odisha", "peo", "panchayat executive officer", "osssc"] });
  S({ id: "odisha-auditor-ics", state: "odisha", name: "Odisha Auditor & Inspector of Co-operative Societies", full: "Auditor and Inspector of Co-operative Societies", body: "OSSC / OSSSC as notified",
    minEdu: 3, level: "Graduate", qual: "Bachelor's degree — check the notification.", posts: ["Auditor", "Inspector of Co-operative Societies"],
    stages: ["Written exam", "Document Verification"], site: "https://ossc.gov.in", tags: ["odisha", "auditor", "inspector of cooperative societies", "ossc", "osssc"] });

  /* ---------------- WEST BENGAL ---------------- */
  S({ id: "wb-police", state: "wb", name: "WB Police (SI & Constable)", full: "Sub-Inspector and Constable — West Bengal Police", body: "West Bengal Police Recruitment Board",
    minEdu: 2, level: "12th (Constable) / Graduate (SI)", qual: "Constable: Madhyamik / 12th as notified. SI: Bachelor's degree.", posts: ["Sub-Inspector", "Constable"],
    stages: ["Preliminary exam", "Physical Measurement & Efficiency Test", "Main exam (SI) / Final exam", "Medical & Document Verification"], site: "https://wbpolice.gov.in", tags: ["west bengal", "wb", "wbp", "police", "si", "constable"] });
  S({ id: "kp-police", state: "wb", name: "Kolkata Police (SI & Constable)", full: "Sub-Inspector and Constable — Kolkata Police", body: "Kolkata Police Recruitment Board",
    minEdu: 2, level: "12th (Constable) / Graduate (SI)", qual: "As specified in the latest Kolkata Police notification.", posts: ["Sub-Inspector", "Constable"],
    stages: ["Preliminary exam", "Physical tests", "Main exam", "Medical & Document Verification"], site: "https://kolkatapolice.gov.in", tags: ["kolkata police", "kp", "west bengal", "wb", "si", "constable", "police"] });
  S({ id: "wbpsc-food-si", state: "wb", name: "WBPSC Food SI", full: "Food Sub-Inspector", body: "West Bengal Public Service Commission (WBPSC)",
    minEdu: 3, level: "Graduate", qual: "Bachelor's degree — check the notification.", posts: ["Food Sub-Inspector"],
    stages: ["Preliminary exam", "Main exam", "Personality test / Document Verification"], site: "https://wbpsc.gov.in", tags: ["wbpsc", "food si", "west bengal", "wb"] });
  S({ id: "wbpsc-icds", state: "wb", name: "WBPSC ICDS Supervisor", full: "ICDS Supervisor", body: "WBPSC",
    minEdu: 3, level: "Graduate", qual: "As specified in the latest notification.", posts: ["ICDS Supervisor"],
    stages: ["Written exam", "Interview / Document Verification"], site: "https://wbpsc.gov.in", tags: ["wbpsc", "icds", "supervisor", "west bengal", "wb"] });
  S({ id: "wbpsc-clerkship", state: "wb", name: "WBPSC Clerkship", full: "Clerkship Examination", body: "WBPSC",
    minEdu: 1, level: "As per notification", qual: "As specified in the latest notification.", posts: ["Clerk and equivalent posts in West Bengal government offices"],
    stages: ["Preliminary exam", "Main exam", "Document Verification"], site: "https://wbpsc.gov.in", tags: ["wbpsc", "clerkship", "clerk", "west bengal", "wb"] });
  S({ id: "wbpsc-ido", state: "wb", name: "WB IDO", full: "IDO recruitment (as notified by WBPSC)", body: "WBPSC",
    minEdu: 3, level: "Graduate", qual: "As specified in the latest notification.", posts: ["IDO post as notified"],
    stages: ["Written exam", "Interview / Document Verification"], site: "https://wbpsc.gov.in", tags: ["wbpsc", "ido", "west bengal", "wb"] });

  /* ---------------- UTTARAKHAND ---------------- */
  var UKS = "Uttarakhand Subordinate Service Selection Commission (UKSSSC)";
  S({ id: "uk-vdo", state: "uk", name: "UKSSSC VDO / VPO", full: "Village Development Officer / Village Panchayat Officer", body: UKS,
    minEdu: 3, level: "Graduate", qual: "Bachelor's degree — check the notification.", posts: ["Village Development Officer (VDO)", "Village Panchayat Officer (VPO)"],
    stages: ["Written exam", "Document Verification"], site: "https://sssc.uk.gov.in", tags: ["uttarakhand", "uk", "ukssc", "vdo", "vpo"] });
  S({ id: "uk-patwari", state: "uk", name: "UKSSSC Patwari / Lekhpal", full: "Patwari / Lekhpal", body: UKS,
    minEdu: 2, level: "As per notification", qual: "As specified in the latest notification.", posts: ["Patwari", "Lekhpal"],
    stages: ["Written exam", "Document Verification"], site: "https://sssc.uk.gov.in", tags: ["uttarakhand", "uk", "patwari", "lekhpal"] });
  S({ id: "uk-forester", state: "uk", name: "UKSSSC Forester", full: "Forester", body: UKS,
    minEdu: 2, level: "As per notification", qual: "As specified in the latest notification.", posts: ["Forester"],
    stages: ["Written exam", "Physical tests as notified", "Document Verification"], site: "https://sssc.uk.gov.in", tags: ["uttarakhand", "uk", "forester", "forest"] });
  S({ id: "uk-junior-assistant", state: "uk", name: "UKSSSC Junior Assistant", full: "Junior Assistant", body: UKS,
    minEdu: 2, level: "12th / Graduate (check notification)", qual: "As specified in the latest notification.", posts: ["Junior Assistant"],
    stages: ["Written exam", "Computer / typing test as notified", "Document Verification"], site: "https://sssc.uk.gov.in", tags: ["uttarakhand", "uk", "junior assistant", "clerk"] });
  S({ id: "uk-assistant-accountant", state: "uk", name: "UKSSSC Assistant Accountant", full: "Assistant Accountant", body: UKS,
    minEdu: 3, level: "Graduate", qual: "As specified in the latest notification.", posts: ["Assistant Accountant"],
    stages: ["Written exam", "Document Verification"], site: "https://sssc.uk.gov.in", tags: ["uttarakhand", "uk", "assistant accountant"] });
  S({ id: "uk-driver-pa", state: "uk", name: "UKSSSC Vehicle Driver & Personal Assistant", full: "Vehicle Driver and Personal Assistant", body: UKS,
    minEdu: 1, level: "As per notification", qual: "As specified in the latest notification (driving licence for Driver; shorthand/typing for PA).", posts: ["Vehicle Driver", "Personal Assistant"],
    stages: ["Written exam", "Driving / shorthand-typing test as notified", "Document Verification"], site: "https://sssc.uk.gov.in", tags: ["uttarakhand", "uk", "driver", "personal assistant", "pa"] });
  S({ id: "uk-agri-tech", state: "uk", name: "UKSSSC Agriculture & Technical Posts", full: "Agriculture and Technical Posts", body: UKS,
    minEdu: 2, level: "As per notification", qual: "As specified in the latest notification.", posts: ["Agriculture and technical posts"],
    stages: ["Written exam", "Document Verification"], site: "https://sssc.uk.gov.in", tags: ["uttarakhand", "uk", "agriculture", "technical"] });
  S({ id: "uk-police", state: "uk", name: "Uttarakhand Police Constable", full: "Constable — Uttarakhand Police", body: "Uttarakhand Police recruitment as notified",
    minEdu: 2, level: "12th pass", qual: "12th pass — check the notification.", posts: ["Constable"],
    stages: ["Written exam", "Physical Standard & Efficiency Tests", "Document Verification & Medical"], site: "https://uttarakhandpolice.uk.gov.in", tags: ["uttarakhand", "uk", "police", "constable"] });

  /* ---------------- ASSAM ---------------- */
  S({ id: "assam-adre", state: "assam", name: "ADRE / Assam SLRC (Grade III & IV)", full: "Assam Direct Recruitment Examination — Grade III and Grade IV posts", body: "State Level Recruitment Commission (SLRC), Assam",
    minEdu: 1, level: "10th (Grade IV) / 12th (Grade III)", qual: "Grade IV: 10th (HSLC) pass. Grade III: 12th (HS) pass. Check the latest notification.", posts: ["Grade III posts", "Grade IV posts across Assam government departments"],
    stages: ["Written exam (CBT/OMR as notified)", "Document Verification"], site: "", tags: ["assam", "adre", "slrc", "grade iii", "grade iv", "grade 3", "grade 4"] });
  S({ id: "assam-slprb", state: "assam", name: "Assam SLPRB (SI & Constable)", full: "Sub-Inspector and Constable — Assam Police", body: "State Level Police Recruitment Board (SLPRB), Assam",
    minEdu: 2, level: "12th (Constable) / Graduate (SI)", qual: "Constable: 12th pass. SI: Bachelor's degree — check the notification.", posts: ["Sub-Inspector", "Constable"],
    stages: ["Physical Standard & Efficiency Tests", "Written exam", "Medical & Document Verification"], site: "", tags: ["assam", "slprb", "police", "si", "constable"] });

  /* ---------------- MAHARASHTRA ---------------- */
  var MH = "Maharashtra government departments / Zilla Parishads via the state recruitment portal";
  S({ id: "mh-talathi", state: "maharashtra", name: "Talathi Bharti", full: "Talathi (Village Revenue Officer)", body: MH,
    minEdu: 3, level: "Graduate", qual: "Bachelor's degree; knowledge of Marathi and basic computer skills — check the notification.", posts: ["Talathi"],
    stages: ["Online written exam", "Document Verification"], site: "", tags: ["maharashtra", "talathi", "mh", "revenue"] });
  S({ id: "mh-gram-sevak", state: "maharashtra", name: "Gram Sevak Bharti", full: "Gram Sevak (Zilla Parishad)", body: MH,
    minEdu: 2, level: "As per notification", qual: "As specified in the latest notification.", posts: ["Gram Sevak"],
    stages: ["Written exam", "Document Verification"], site: "https://mahapariksha.gov.in", tags: ["maharashtra", "gram sevak", "zilla parishad", "mh"] });
  S({ id: "mh-police", state: "maharashtra", name: "Maharashtra Police Bharti", full: "Police Constable Recruitment", body: "Maharashtra Police recruitment cell",
    minEdu: 2, level: "12th pass", qual: "12th pass — check the notification.", posts: ["Police Constable and related posts"],
    stages: ["Physical test", "Written exam", "Document Verification"], site: "", tags: ["maharashtra", "police bharti", "mh", "police", "constable"] });
  S({ id: "mh-forest-guard", state: "maharashtra", name: "Forest Guard Bharti", full: "Forest Guard (Vanrakshak)", body: "Maharashtra Forest Department",
    minEdu: 2, level: "12th pass", qual: "12th pass — check the notification.", posts: ["Forest Guard"],
    stages: ["Physical tests", "Written exam", "Document Verification"], site: "https://mahaforest.gov.in", tags: ["maharashtra", "forest guard", "vanrakshak", "mh"] });
  S({ id: "mh-health-worker", state: "maharashtra", name: "Health Worker Bharti", full: "Health Worker (Zilla Parishad)", body: MH,
    minEdu: 2, level: "As per notification", qual: "As specified in the latest notification.", posts: ["Health Worker"],
    stages: ["Written exam", "Document Verification"], scope: "Counselling scope: general core sections only. Domain subjects are not covered.",
    site: "https://mahapariksha.gov.in", tags: ["maharashtra", "health worker", "zilla parishad", "mh"] });
  S({ id: "mh-extension-officer", state: "maharashtra", name: "Extension Officer Bharti", full: "Extension Officer (Zilla Parishad)", body: MH,
    minEdu: 3, level: "Graduate", qual: "As specified in the latest notification.", posts: ["Extension Officer"],
    stages: ["Written exam", "Document Verification"], scope: "Counselling scope: general core sections only. The domain subject is not covered.",
    site: "https://mahapariksha.gov.in", tags: ["maharashtra", "extension officer", "zilla parishad", "mh"] });
  S({ id: "mh-junior-clerk", state: "maharashtra", name: "Junior Clerk / Typist Bharti", full: "Junior Clerk-cum-Typist", body: MH,
    minEdu: 2, level: "12th pass", qual: "12th pass with typing proficiency and computer certification as specified in the notification.", posts: ["Junior Clerk-cum-Typist"],
    stages: ["Written exam", "Typing test", "Document Verification"], site: "https://mahapariksha.gov.in", tags: ["maharashtra", "junior clerk", "typist", "mh", "clerk"] });

  /* ---------------- ANDHRA PRADESH ---------------- */
  S({ id: "appsc-group2", state: "ap", name: "APPSC Group 2", full: "Group-II Services — Executive and Non-Executive posts", body: "Andhra Pradesh Public Service Commission (APPSC)",
    minEdu: 3, level: "Graduate", qual: "Bachelor's degree in any discipline.",
    ageText: "Generally 18–42 years under AP rules, with category relaxations — verify in the notification.",
    posts: ["Deputy Tahsildar", "Assistant Section Officer", "Assistant Commercial Tax Officer", "Sub-Registrar Grade-II", "Municipal Commissioner Grade-III", "Assistant Labour Officer", "Excise Sub-Inspector", "Assistant Development Officer", "Extension Officer", "Auditor", "Accountant", "and other similar Group-2 posts"],
    stages: ["Screening Test (Prelims)", "Main exam", "Document Verification"],
    site: "https://psc.ap.gov.in", tags: ["appsc", "group 2", "group ii", "andhra pradesh", "ap", "deputy tahsildar", "excise si"] });
})();
