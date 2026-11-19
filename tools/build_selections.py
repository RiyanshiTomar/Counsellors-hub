#!/usr/bin/env python3
"""
Build data/selections.json from the "Selection Result 2025-26" Google Sheet.

HOW TO RUN
  1. Google Sheet -> File -> Download -> Microsoft Excel (.xlsx)   (do this for each year's sheet)
  2. pip install openpyxl
  3. python tools/build_selections.py "2025-26=results-2025-26.xlsx" "2026-27=results-2026-27.xlsx"
     (the text before = is the year label shown on the website; one file also works)
  4. Commit data/selections.json and redeploy.

WHAT IT KEEPS
  Only rows whose final-result column says "Selected".
  Output fields: name, exam, post (bank / post name), centre (branch), year, photo (only if it is a real https link).

WHAT IT NEVER WRITES
  Mobile numbers, PW registration numbers, exam roll numbers, "Not Qualified" / "Reserve List" students.

OPTIONS
  --accept "selected,final selected,ok"   result values that count as selected (comma separated)
  --out data/selections.json           output path
The script prints, per tab, how many rows it kept and which result values it saw, so you can spot
tabs that use other words (for example "Qualified" in a Final column) and add them with --accept.
"""
import argparse, json, re, sys
from collections import Counter

try:
    from openpyxl import load_workbook
except ImportError:
    sys.exit("Please run: pip install openpyxl")

EXAM_NAMES = {
    "rrb alp": "RRB ALP", "rbi assistant": "RBI Assistant", "ib security assistant": "IB Security Assistant",
    "ssc cgl 2025 tier-1": "SSC CGL", "upsi": "UP Police SI", "ibps po pre/mains": "IBPS PO",
    "ssc chsl 2025": "SSC CHSL", "new ibps clerk pre 25-26": "IBPS Clerk", "idbi jam bhopal-2026": "IDBI JAM",
    "sbi clerk": "SBI Clerk", "ibps rrb clerk": "IBPS RRB Clerk", "ibps rrb po 25-26": "IBPS RRB PO",
    "mpsi pre 2026": "MP SI", "ssc gd 2025 final": "SSC GD", "ssc gd": "SSC GD",
    "wbp constable 2024 pre": "WB Police Constable", "wbp si": "WB Police SI", "niacl mains": "NIACL",
    "agniveer airforce": "Agniveer (Air Force)", "ibps so": "IBPS SO", "indian navy": "Indian Navy",
    "ib sa": "IB Security Assistant", "rrb ntpc cbt-2": "RRB NTPC", "nabard da": "NABARD",
    "sbi po final": "SBI PO", "wbcs": "WBCS", "mp police constable": "MP Police Constable",
    "ib lucknow": "IB", "afcat result 2026": "AFCAT",
}
BANK_FIX = {"bank of broda": "Bank of Baroda", "canara bank": "Canara Bank", "indian bank": "Indian Bank",
            "union bank of india": "Union Bank of India", "punjab national bank": "Punjab National Bank",
            "uco bank": "UCO Bank", "bank of india": "Bank of India", "central bank of india": "Central Bank of India",
            "bank of baroda": "Bank of Baroda"}
SKIP_TAB = re.compile(r"pivot|^index$|^sheet\d*$|detail", re.I)
EXAM_FIX = {"upp": "UP Police", "rrb-po": "IBPS RRB PO", "ssc gd cbt": "SSC GD", "ssc mts": "SSC MTS"}

def clean(v):
    return re.sub(r"\s+", " ", str(v).strip()) if v is not None else ""

def nice_name(v):
    v = clean(v)
    return v.title() if v and (v.isupper() or v.islower()) else v

def nice_text(v):
    v = clean(v)
    low = v.lower()
    if low in BANK_FIX:
        return BANK_FIX[low]
    if v and len(v) <= 4 and v.isupper():
        return v  # keep acronyms such as SBI, PNB
    return v.title() if v and (v.isupper() or v.islower()) else v

def find_header(rows):
    for i, r in enumerate(rows[:6]):
        cells = [clean(c).lower() for c in r]
        if any(re.search(r"name of student|name of candidate|student name|^name$", c) for c in cells):
            return i, cells
    return None, None

def col(cells, pattern, exclude=None):
    for i, c in enumerate(cells):
        if re.search(pattern, c) and not (exclude and re.search(exclude, c)):
            return i
    return None

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("inputs", nargs="+", help="LABEL=file.xlsx (for example 2026-27=results.xlsx) or just file.xlsx")
    ap.add_argument("--accept", default="selected,final selected,ok")
    ap.add_argument("--out", default="data/selections.json")
    args = ap.parse_args()
    accept = {x.strip().lower() for x in args.accept.split(",") if x.strip()}

    out, seen = [], set()
    for spec in args.inputs:
        if "=" in spec:
            year, path = spec.split("=", 1)
        else:
            path = spec
            m = re.search(r"(20\d\d)\s*[-_]\s*(\d\d)", spec)
            year = f"{m.group(1)}-{m.group(2)}" if m else ""
        print(f"\n=== {path}  (year: {year or 'not set'}) ===")
        wb = load_workbook(path, read_only=True, data_only=True)
        for ws in wb.worksheets:
            title = clean(ws.title)
            if SKIP_TAB.search(title):
                continue
            rows = [list(r) for r in ws.iter_rows(values_only=True)]
            hi, cells = find_header(rows)
            if hi is None:
                print(f"[skip] {title}: no 'Name of Student' header")
                continue
            c_name = col(cells, r"name of student|name of candidate|student name|^name$")
            c_branch = col(cells, r"^branch|^centre|^center")
            c_res = [i for i, c in enumerate(cells)
                     if re.search(r"final|result", c) and not re.search(r"link|pdf|photo|pic|reg|roll|image", c)]
            c_exam = col(cells, r"^exam name|^name of exam")
            c_cat = col(cells, r"^category$")
            c_post = col(cells, r"bank name|post name|^post$|department")
            c_photo = col(cells, r"photo|pic")
            exam_default = EXAM_NAMES.get(title.lower(), title)
            kept, seen_vals = 0, Counter()
            for r in rows[hi + 1:]:
                def g(i):
                    return r[i] if i is not None and i < len(r) else None
                name = nice_name(g(c_name))
                if not name:
                    continue
                vals = [clean(g(i)).lower() for i in c_res if clean(g(i))]
                for v in vals:
                    seen_vals[v] += 1
                if not any(v in accept for v in vals):
                    continue
                exam = clean(g(c_exam)) or exam_default
                exam = EXAM_FIX.get(exam.lower(), exam)
                if c_cat is not None and clean(g(c_cat)).lower() == "ssc" and not exam.lower().startswith("ssc"):
                    exam = "SSC " + exam
                key = (name.lower(), exam.lower(), year)
                if key in seen:
                    continue
                seen.add(key)
                item = {"name": name, "exam": exam, "post": nice_text(g(c_post)), "centre": nice_text(g(c_branch)), "year": year}
                photo = clean(g(c_photo))
                if photo.lower().startswith("https://"):
                    item["photo"] = photo
                out.append(item)
                kept += 1
            top = ", ".join(f"{k}={n}" for k, n in seen_vals.most_common(5)) or "no result values found"
            print(f"[{title}] kept {kept}  | result values seen: {top}")


    out.sort(key=lambda x: (x.get("year",""), x["exam"].lower(), x["name"].lower()))
    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print(f"\nWrote {len(out)} selections to {args.out}")

if __name__ == "__main__":
    main()
