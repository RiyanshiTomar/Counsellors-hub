/* ============================================================
   GEW Counsellor Hub — training content
   Edit freely: this is plain text. Scripts are in Hinglish on purpose.
   Golden rule for every script: never promise selection or a fixed result.
   ============================================================ */
window.GEW_TRAINING = {

  flow: [
    { step: "Greet and set the agenda", body: "Apna parichay do, student ka naam poochho, aur ek line me batao ki aaj kya hoga: sahi exam chunna, plan samajhna aur agla kadam." },
    { step: "Jaanch-Partal", body: "Chaar cheezein jaano: qualification, age, target (kaunsi type ki job) aur roz kitna time de sakte hain. Ye bhi poochho ki pehle kya try kiya hai." },
    { step: "Check eligibility", body: "Is site ka Eligibility Finder use karo. Qualification, category ke saath age relaxation, aur physical ya trade ki shart check karo." },
    { step: "Match the exam", body: "Ek main exam aur ek-do backup exam chuno jinka syllabus milta ho (jaise CGL ke saath CHSL aur Banking)." },
    { step: "Sapne se jodo (dream selling)", body: "Student ko uski naukri ke baad ki zindagi dikhao: security, samman, parivaar. Phir wapas lao ki ye sapna kaise banega." },
    { step: "Explain the road ahead", body: "Stages, pattern, pay level aur tayyari ka realistic time dikhao. Exam page khol ke numbers student ko khud dikhao." },
    { step: "Fees ko todkar batao", body: "Pehle total fee saaf batao, phir usse mahine, hafte, din aur class me baanto. Fee Pitch Calculator use karo." },
    { step: "Handle doubts", body: "Neeche ke scripts use karo. Pehle poori baat suno, uski chinta dohrao, phir facts ke saath jawab do." },
    { step: "Agree the next step", body: "Demo class, centre visit ya registration me se ek tay karo. Tarikh pakki karo aur WhatsApp par chhota summary bhejo." }
  ],

  discovery: [
    "Aapki qualification kya hai aur final result kab aaya?",
    "Abhi aapki age kitni hai, aur category kya hai? (relaxation check karne ke liye)",
    "Aap kaunsi type ki job chahte ho: office, bank, railway, police ya revenue?",
    "Roz kitne ghante padhai de sakte ho, aur kya job ke saath padhna hai?",
    "Pehle kisi exam ki tayyari ki hai? Kaunsa attempt tha aur kya dikkat aayi?",
    "Kisi state ya city mein hi job chahiye, ya poore India mein chalega?",
    "Physical test (police/defence) ke liye fitness par kaam kar rahe ho?",
    "Is decision me parivaar me kaun-kaun shamil hai? Agar fees parents dete hain to unhe baat me shuru se jodo."
  ],

  /* ---------- Fee handling ---------- */
  fee: {
    intro: "Fees ek bada number lagti hai jab use ek saath bolo. Jab wahi fees mahine, hafte, din aur class me baant kar batao, to student ko dikhta hai ki wo roz kitna nivesh kar raha hai. Isi ko 'fees ko todkar batana' kehte hain.",
    principles: [
      { t: "Pehle value, phir fees", d: "Fees ki baat tab karo jab student ko apna exam, plan aur sapna saaf dikh chuka ho." },
      { t: "Total fee chhupao mat", d: "Poori fees aur validity pehle saaf shabdon me batao. Breakup uske baad aata hai, uski jagah nahi." },
      { t: "Validity saath batao", d: "36 mahine ka matlab poore 3 saal. Student ko dikhna chahiye ki ye lambe samay ka saath hai." },
      { t: "Chaar tarah se todo", d: "Per month, per week, per day aur per class. Chhota number samajhna aur yaad rakhna aasan hota hai." },
      { t: "Roz ke kharche se jodo", d: "Per day ya per class ka number student ke roz ke kharche (chai, snacks, recharge) se milao. Dabav ke bina, bas ek tulna." },
      { t: "Parents ko shamil karo", d: "Agar fees parents dete hain to unse baat karwane ka offer do. Zabardasti kabhi nahi." },
      { t: "Jo pakka nahi, wo mat bolo", d: "Discount, EMI ya installment ke baare me tabhi bolo jab centre head se confirm ho." }
    ],
    scripts: [
      { title: "Fees batane ka tareeka", text: "Is course ki total fees ₹25,000 hai aur validity 36 mahine, yaani poore 3 saal ki hai. Isko todkar dekhein to har mahine lagbhag ₹694, har hafte ₹160, roz ₹22.83, aur agar roz 2 classes hon to ek class ₹11.42 ki padti hai." },
      { title: "Roz ke kharche se tulna", text: "Ek class ki keemat lagbhag ek chai ke barabar hai. 3 saal tak roz ek chhota sa nivesh, ek pakki sarkari naukri ki taiyari ke liye." },
      { title: "Fees ko sapne se jodo", text: "Aaj ka ₹22.83 roz ka nivesh us din ke liye hai jab aap joining letter haath me lekar khade honge. Aap bataiye, kya wo din is nivesh ke layak lagta hai?" },
      { title: "Salary se tulna (guarantee ke bina)", text: "Government job ki shuruaat ki salary post ke hisaab se aksar ek mahine me hi fees ke ek bade hisse ke barabar hoti hai. Hum selection ki guarantee nahi dete, par aap mehnat karenge to mauka bahut bada hai." },
      { title: "Parents ke saath baat", text: "Chaliye hum fees ka ye breakup aapke parents ko bhi dikha dete hain. Aap unhe centre bula sakte ho, hum batch, schedule aur selected students ke results unke saamne rakh denge." }
    ],
    mistakes: [
      "Bina value samjhaye seedha fees bol dena.",
      "Sirf per-day number batana aur total fees na batana.",
      "Selection ki guarantee dena ya 'paisa wapas' jaisi baat bina confirm kiye bolna.",
      "Student ko turant paisa dene ke liye dabaana."
    ]
  },

  /* ---------- Dream selling ---------- */
  dream: {
    intro: "Sarkari naukri sirf salary nahi hoti, wo ek surakshit zindagi, samman aur parivaar ke liye ek sapna hoti hai. Dream selling ka matlab hai student ko wo zindagi dikhana, aur phir imaandari se batana ki wahan tak ka raasta kaisa hai.",
    questions: [
      "Aap 5 saal baad apne aap ko kahan dekhna chahte ho?",
      "Agar aaj aapko sarkari naukri mil jaye, to sabse pehle kya karoge?",
      "Aapke parents ka aapke liye kya sapna hai?",
      "Selection ki khabar sabse pehle kise sunana chahoge?",
      "Ghar me sabse badi chinta kya hai jo ek pakki naukri se door ho jayegi?"
    ],
    points: [
      { t: "Job security", d: "Sarkari naukri me stable income hoti hai. Market ke utaar-chadhav ka dar kam rehta hai." },
      { t: "Pay aur allowances", d: "Basic pay ke saath DA, HRA aur anya allowances post ke niyam ke hisaab se milte hain." },
      { t: "Retirement ke baad suraksha", d: "Retirement ke baad pension ya retirement benefits milte hain (scheme aur niyam ke anusaar)." },
      { t: "Samman aur pehchaan", d: "Samaj me samman milta hai, aur parents ko apne bachche par garv hota hai." },
      { t: "Parivaar ki suraksha", d: "Medical suvidha, chhuttiyaan aur parivaar ke liye anya labh (post aur department ke hisaab se)." },
      { t: "Tarakki ka raasta", d: "Departmental promotion aur seniority ke saath career me aage badhne ka saaf raasta hota hai." },
      { t: "Ghar ke paas posting", d: "State jobs me aksar apne rajya ya shehar me hi posting ka mauka milta hai (post ke hisaab se)." },
      { t: "Financial stability", d: "Pakki naukri hone se home loan jaise bade financial faisle lena aksar aasan hota hai." }
    ],
    scripts: [
      { title: "Sapna dikhane ka script", text: "Socho, 3 saal baad aapke haath me joining letter hai. Ghar me sab ki aankhon me garv hai, aur aapke parents ko ab aapke bhavishya ki chinta nahi. Wo din sach ho sakta hai, bas aaj sahi plan aur sahi saath chahiye." },
      { title: "Sapna aur mehnat ko jodna", text: "Sapna tabhi sach hota hai jab uske peeche roz ki tayyari ho. Hum aapko plan, classes aur practice dete hain, aur mehnat aapko karni hogi. Hamare selected students ki list isi lagatar mehnat ka nateeja hai." },
      { title: "Dream aur fees ek saath", text: "Aap jis zindagi ki baat kar rahe hain, uske liye roz lagbhag ₹22 ka nivesh hai. Ye aapke bhavishya ke liye ek chhota sa kadam hai. Kya hum aaj hi isse shuru karein?" }
    ],
    byCat: {
      ssc: "Central government me Inspector aur Assistant Section Officer jaisi posts tak ka raasta, poore desh me pehchaan ke saath.",
      banking: "Bank me officer ban kar branch manager aur usse aage tak ka saaf career path, stable income ke saath.",
      railways: "Indian Railways ki badi pehchaan: Station Master, Loco Pilot jaisi posts jahan zimmedari bhi hai aur samman bhi.",
      state: "Apne rajya me, apne logon ke beech sarkari seva karne ka mauka, aksar ghar ke paas."
    },
    reality: [
      "Sapne dikhao, par selection ki guarantee kabhi mat do.",
      "Mehnat, consistency aur practice ki zarurat saaf shabdon me batao.",
      "Salary, allowances aur pension jaise numbers sirf official source ya is site se hi bolo.",
      "Student ko kabhi dabav me mat daalo. Sapna madad karta hai, majboori nahi."
    ]
  },

  objections: [
    { q: "Mere paas time nahi hai.", a: "Samajh sakta hoon. Isi liye hum time-table aapke schedule ke hisaab se banate hain. Roz 3–4 ghante bhi ho to ek clear plan se aage badh sakte ho. Aap batao kaunsa time free rehta hai?" },
    { q: "Fees zyada lag rahi hai.", a: "Aapki baat bilkul theek hai, fees ek bada faisla hota hai. Chaliye isse tod kar dekhte hain: 36 mahine ki validity me ₹25,000 ka matlab lagbhag ₹694 mahina, ₹160 hafta aur sirf ₹22.83 roz, yaani ek class ke ₹11.42. Ye roz ke ek chhote kharche jitna hai, aur badle me ek pakki sarkari naukri ka mauka. Aap batao, ye breakup dekh kar kaisa lag raha hai?" },
    { q: "Fees ek saath dena mushkil hai.", a: "Samajh gaya. Pehle aap bas ye dekh lijiye ki fees ka poora breakup kya hai. Payment ke jo bhi options available hain, main centre head se confirm karke aapko saaf-saaf bata dunga. Aap chaho to parents ko bhi saath bula sakte ho." },
    { q: "Selection ki guarantee kya hai?", a: "Seedhi baat: koi bhi institute selection ki guarantee nahi de sakta. Hum structure, practice aur guidance dete hain, aur mehnat aapki hoti hai. Hamare centre se selected students ki list main aapko dikha sakta hoon." },
    { q: "Main online padh loonga / self-study karunga.", a: "Self-study kaam karti hai, bas consistency aur testing chahiye. Offline centre mein routine, peer group aur doubt solving milti hai. Aap ek demo class attend karke compare kar lo." },
    { q: "Ghar wale nahi maan rahe.", a: "Aap parents ko centre visit ke liye bula sakte ho. Hum unhe batch, schedule aur results dikha denge. Chaho to main unse seedha baat kar leta hoon." },
    { q: "Pehle try kiya tha, nahi hua.", a: "Ek attempt se aap kam nahi ho jate. Chalo dekhte hain pichli baar kahan marks gaye: concept, speed ya revision. Uske hisaab se is baar ka plan banate hain." },
    { q: "Mujhe pata nahi kaunsa exam chahiye.", a: "Koi baat nahi. Mujhe apni qualification aur age batao, main eligibility ke hisaab se 2–3 options dikhata hoon, phir aap compare karke chuno." },
    { q: "Main baad mein sochkar bataunga.", a: "Bilkul. Bas ek cheez batao: kis baat par sochna hai? Fees, time ya exam choice? Main us point par details bhej deta hoon taaki decision aasan ho." }
  ],

  dos: [
    "Recommend karne se pehle eligibility aur age relaxation check karo.",
    "Dates, vacancies aur pay sirf official source ya is site ke verified fields se bolo.",
    "Jo tentative ho use saaf bolo: dates badal sakti hain.",
    "Ek main exam aur ek backup exam do jinka syllabus milta ho.",
    "Fees hamesha total aur breakup dono me batao.",
    "Har baatcheet ke baad WhatsApp par chhota summary bhejo."
  ],
  donts: [
    "Selection, rank ya guaranteed result ka vaada mat karo.",
    "Competitors ke baare me bura mat bolo.",
    "Official notification ke bina vacancy ka number mat batao.",
    "Pehli call me hi decision ke liye dabav mat banao.",
    "Student ki personal details team ke bahar share mat karo."
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
