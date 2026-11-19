# Govt Exam Wallah — Counsellor Hub (v5)

Static website (HTML + CSS + JS). No build step, no npm.

## Deploy on Vercel
1. Is folder ko GitHub repo me push karo (ya `vercel` CLI se deploy karo).
2. Vercel -> Add New Project -> repo select -> Framework Preset: **Other** -> Deploy.
   (Build command aur output directory khali chhod do.)

## Selections ka data (important)
Website `data/selections.json` se selections dikhati hai. Isme sirf **final Selected** students aate hain.
Mobile numbers, registration numbers aur Not Qualified / Reserve List wale students file me kabhi nahi jaate,
isliye public site par kuch private leak nahi hota.

Is zip me **2024-25 ke 48 selections** aur **IBPS Clerk (2025-26) ke 20 selections** already added hain. Script chalane par ye file poori tarah naye data se replace ho jati hai. Baaki sab tabs ke liye:

1. Har saal ki Google Sheet -> File -> Download -> **Microsoft Excel (.xlsx)**
2. `pip install openpyxl`
3. `python tools/build_selections.py "2024-25=results-2024-25.xlsx" "2025-26=results-2025-26.xlsx" "2026-27=results-2026-27.xlsx"`
   (`=` se pehle ka text website par year ke roop me dikhta hai. Ek hi file ho to bhi chalega.)
4. Script har tab ka report print karti hai (kitne rows kept, kaunse result words mile).
   Agar kisi tab me "Selected" ki jagah koi aur word hai (jaise "Qualified"), to chalao:
   `python tools/build_selections.py file.xlsx --accept "selected,final selected,qualified"`
5. `data/selections.json` commit karo aur redeploy karo.

Photos: sheet me Student Photo column me zyadatar sirf file ke naam hain, link nahi. Isliye cards par initials dikhte hain.
Agar photo ka https link ho (ya Drive share link), to wo script se aa jata hai.

## Kya kahan edit karna hai
| File | Kya hai |
|------|---------|
| `js/config.js` | Helpline, centres, selections count, last-updated date |
| `js/data-core.js` | SSC, Banking, Railways exams + "Coming up" dates |
| `js/data-states.js` | State-level exams |
| `js/data-training.js` | Training flow, Jaanch-Partal, fee pitch, dream selling, objection scripts |
| `data/selections.json` | Selected students (script se banta hai) |
| `assets/` | Logo, poster |

## Data accuracy
- `verify: true` wale items par site "Verify" badge dikhati hai. Student ko quote karne se pehle official site check karo.
- Dates SSC / IBPS / RRB ke official calendars se hain aur tentative hain.
- Update ke baad `js/config.js` me `lastUpdated` badlo.
