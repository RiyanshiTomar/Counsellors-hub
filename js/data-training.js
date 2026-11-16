/* ============================================================
   GEW Counsellor Hub — training content
   Edit freely: this is plain text. Scripts are in Hinglish on purpose.
   Rule for every script: never promise selection or a fixed result.
   ============================================================ */
window.GEW_TRAINING = {

  flow: [
    { step: "Greet and set the agenda", body: "Introduce yourself, ask the student's name, and say in one line what the call or visit will cover: finding the right exam, the plan, and next steps." },
    { step: "Understand the student", body: "Ask four things: qualification, age, target (job type or department), and how much time they can give daily. Note what they have already tried." },
    { step: "Check eligibility", body: "Use the Eligibility Finder on this site. Check qualification, age with category relaxation, and any physical or trade requirement." },
    { step: "Match the exam", body: "Shortlist one primary exam and one or two backup exams with a similar syllabus (for example CGL with CHSL and Banking)." },
    { step: "Explain the road ahead", body: "Walk through stages, pattern, pay level, and the realistic preparation window. Show the exam page so the student sees the numbers themselves." },
    { step: "Handle doubts", body: "Use the objection scripts below. Listen fully, repeat the worry back, then answer with facts." },
    { step: "Agree the next step", body: "Book a demo class, a centre visit, or a registration. Confirm the date and send a short summary on WhatsApp." }
  ],

  discovery: [
    "Aapki qualification kya hai aur final result kab aaya?",
    "Abhi aapki age kitni hai, aur category kya hai? (relaxation check karne ke liye)",
    "Aap kaunsi type ki job chahte ho: office, bank, railway, police ya revenue?",
    "Roz kitne ghante padhai de sakte ho, aur kya job ke saath padhna hai?",
    "Pehle kisi exam ki tayyari ki hai? Kaunsa attempt tha aur kya dikkat aayi?",
    "Kisi state ya city mein hi job chahiye, ya poore India mein chalega?",
    "Physical test (police/defence) ke liye fitness par kaam kar rahe ho?"
  ],

  objections: [
    { q: "Mere paas time nahi hai.", a: "Samajh sakta hoon. Is liye hum time-table aapke schedule ke hisaab se banate hain. Roz 3–4 ghante bhi ho to ek clear plan se aage badh sakte ho. Aap batao kaunsa time free rehta hai?" },
    { q: "Fees zyada lag rahi hai.", a: "Pehle value dekhte hain: classes, tests, doubt support aur centre ka environment. Hum ek baar saath mein batch ka breakdown dekhte hain, aur jo payment options available hain wo bhi bata deta hoon." },
    { q: "Selection ki guarantee kya hai?", a: "Seedhi baat: koi bhi institute selection ki guarantee nahi de sakta. Hum structure, practice aur guidance dete hain, aur mehnat aapki hoti hai. Hamare centre se selected students ki list main aapko dikha sakta hoon." },
    { q: "Main online padh loonga / self-study karunga.", a: "Self-study kaam karti hai, bas consistency aur testing chahiye. Offline centre mein routine, peer group aur doubt solving milti hai. Aap ek demo class attend karke compare kar lo." },
    { q: "Ghar wale nahi maan rahe.", a: "Aap parents ko centre visit ke liye bula sakte ho. Hum unhe batch, schedule aur results dikha denge. Chaho to main unse seedha baat kar leta hoon." },
    { q: "Pehle try kiya tha, nahi hua.", a: "Ek attempt se aap kam nahi ho jate. Chalo dekhte hain pichli baar kahan marks gaye: concept, speed ya revision. Uske hisaab se is baar ka plan banate hain." },
    { q: "Mujhe pata nahi kaunsa exam chahiye.", a: "Koi baat nahi. Mujhe apni qualification aur age batao, main eligibility ke hisaab se 2–3 options dikhata hoon, phir aap compare karke chuno." },
    { q: "Main baad mein sochkar bataunga.", a: "Bilkul. Bas ek cheez batao: kis baat par sochna hai? Fees, time ya exam choice? Main us point par details bhej deta hoon taaki decision aasan ho." }
  ],

  dos: [
    "Check eligibility and age relaxation before recommending any exam.",
    "Quote dates, vacancies and pay only from the official source or this site's verified fields.",
    "Say clearly when a detail is tentative: dates can shift.",
    "Give a primary exam and a backup exam with overlapping syllabus.",
    "Follow up with a short WhatsApp summary after every conversation."
  ],
  donts: [
    "Do not promise selection, ranks, or guaranteed results.",
    "Do not compare competitors negatively.",
    "Do not quote a vacancy count that is not in an official notification.",
    "Do not pressure the student to decide on the first call.",
    "Do not share a student's personal details outside the team."
  ],

  quickPitch: {
    ssc: [
      "Central government jobs with a clear career ladder, from 10th-pass to graduate level.",
      "One syllabus base covers CGL, CHSL and several other SSC exams, so preparation overlaps.",
      "All major SSC exams are computer-based, and results are published as merit lists on ssc.gov.in."
    ],
    banking: [
      "Bank jobs combine stable pay with a structured promotion path.",
      "Prelims and Mains syllabus overlaps across IBPS, SBI and RRB exams.",
      "Graduates of any stream can apply; most posts have 20–30 age brackets."
    ],
    railways: [
      "Railways is one of the largest recruiters in India, with posts from 10th pass to graduate.",
      "Fixed pay levels, allowances and a pension framework under the central pay matrix.",
      "NTPC, Group D and ALP share a base of maths, reasoning and general awareness."
    ],
    state: [
      "State jobs give local postings and a strong chance to work near home.",
      "Police and revenue posts are among the most applied-for state posts.",
      "Always check the state's domicile, age and language rules before advising."
    ]
  }
};
