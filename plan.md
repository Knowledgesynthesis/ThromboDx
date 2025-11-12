# MASTER PROMPT — Hematology Masterpiece App Generator
## Focus: DIC, TTP, ITP, HUS (plus essential prerequisites, differentials, and contiguous syndromes)

## Role & Mission
You are a combined team (Clinical Product Manager + Hematology Attending + Senior Instructional Designer + Staff React/TypeScript Engineer + UX Writer + QA Lead). Your mission is to design and (optionally) scaffold a **mobile-first, dark-mode, offline-ready** interactive educational app that fully teaches **Disseminated Intravascular Coagulation (DIC), Thrombotic Thrombocytopenic Purpura (TTP), Immune Thrombocytopenia (ITP), and Hemolytic Uremic Syndrome (HUS)**—including **prerequisites** and **differentials**—for **all learner levels** (medical school → residency/fellowship → attending) and **all contexts** (exam prep, bedside application, research methods). The output must be internally consistent and clinically accurate with zero conflicting logic.

---

## Fixed Inputs (Use these EXACTLY)
- **Primary Topics:** DIC, TTP, ITP, HUS  
- **Scope Includes (Related/Prereq Concepts):** 
  - Hemostasis overview (primary vs secondary), platelet physiology, coagulation cascade, fibrinolysis
  - Microangiopathic hemolytic anemia (MAHA) and schistocytes
  - ADAMTS13 biology and ultra-large vWF multimers
  - Complement pathway basics and atypical HUS (aHUS)
  - Shiga toxin–associated HUS (STEC-HUS)
  - Consumptive coagulopathy vs isolated thrombocytopenia
  - Laboratory interpretation: platelet count trends, PT/INR, aPTT, fibrinogen, D-dimer, LDH, haptoglobin, bilirubin, creatinine, peripheral smear
  - Scoring/decision tools: **ISTH Overt DIC score**, **PLASMIC score for TTP**, (include differential awareness of HIT 4Ts without expanding beyond relevance)
  - Treatment frameworks: plasma exchange, caplacizumab, immunosuppression (steroids, rituximab), IVIG, eculizumab (aHUS), antimicrobial stewardship (STEC caution with antibiotics), blood product stewardship (when/when not to transfuse platelets/cryoprecipitate/FFP), anticoagulation considerations
  - Red-flag complications and supportive care: organ ischemia, AKI, neuro changes, obstetric settings, sepsis, malignancy, trauma, massive transfusion
- **Target Learner Levels:** Medical student, Intern/Resident, Fellow, Attending
- **Learner Contexts:** Exam preparation, point-of-care/bedside reasoning, research design & methods
- **Product Constraints/Preferences:** Mobile-first, dark mode, no login, printable handouts, offline-ready, HIPAA-safe dummy data only, **scientifically accurate without conflicting logic**
- **Voice & Tone:** Clear, succinct, clinically authoritative; plain language first, formal precision second
- **Localization:** US English defaults; SI/US unit toggles where relevant

---

## Accuracy & Safety Protocol (MANDATORY)
Implement and show these safeguards throughout:
1. **Source-Gated Content:** Prefer high-grade guidelines/consensus statements and standard references (e.g., hematology society guidelines, peer-reviewed reviews). Cite each non-trivial claim inline (short parenthetical references list) and gather a reference section at the end.
2. **Versioning & Date Stamps:** Annotate guideline/version year for all criteria, scores, and therapies. If evidence varies by year, display a “variation banner” with a short note and citations.
3. **Contradiction Checks:** Before finalizing each lesson/case/algorithm, run a “consistency sweep” that flags conflicting thresholds, lab patterns, or treatment indications—resolve with citations and note rationale.
4. **Units & Ranges Validation:** Surface units (e.g., g/L vs mg/dL; ×10⁹/L for platelets) and add automated sanity checks in interactives.
5. **Clinical Safety Rails:** Prominent disclaimers; do not substitute for clinical judgment; no patient data. Add “must-not-miss” alerts (e.g., suspected TTP → **do not delay plasma exchange** while confirming).
6. **Uncertainty Handling:** If knowledge is evolving (e.g., complement-mediated aHUS nuances), show “What’s evolving” boxes with cautious language and references.

---

## Required Deliverables (Produce ALL)
1. **Executive Summary & App Names**
   - 2–3 name options + one-sentence value proposition (e.g., “ThromboLens: Master DIC, TTP, ITP, HUS—from smear to systems.”)
   - Audience, settings (exam/bedside/research), success criteria with measurable outcomes.

2. **Personas & Use Cases**
   - At least 3 personas (MS3 on heme/onc, IM resident on night float, heme attending teaching on rounds) with goals, pain points, prior knowledge, and success signals.
   - Key use cases: urgent bedside differentiation of TTP vs DIC; exam review sprints; research planning for MAHA cohorts.

3. **Curriculum Map & Knowledge Graph**
   - Modules → Lessons → Micro-concepts with prerequisite arrows.
   - Tag each node with Bloom level, clinical domain (diagnosis/management/pathophys), and assessment type.

4. **Reasoning Frameworks & Core Explainers**
   - Side-by-side “Compare & Contrast” tables:
     - **DIC vs TTP vs ITP vs HUS** (typical triggers, platelet level, hemolysis features, coagulation tests, organ involvement, smear, ADAMTS13/complement findings)
   - “Pitfalls & Pearls,” “Look-alikes & how to rule them in/out,” and quick-diagnosis tells.
   - Canonical diagnostic criteria & when to doubt them.

5. **Interactive Tools (Specify each with purpose, inputs, outputs, presets, guardrails)**
   - **MAHA Lab Interpreter:** sliders/inputs for Hb, platelets, LDH, haptoglobin, bilirubin, creatinine, smear findings → outputs probability hints for TTP/HUS/DIC/ITP with caution notes.
   - **Coagulation Panel Simulator:** adjust PT/INR, aPTT, fibrinogen, D-dimer, platelet count → differential hints (consumptive vs immune vs microthrombotic).
   - **ISTH DIC Calculator:** live score with threshold explanation; embeds management considerations (fibrinogen replacement, platelet transfusion caveats).
   - **PLASMIC Score Assistant:** auto-compute; show urgency banner for plasma exchange if high-risk; rationale for each component.
   - **ADAMTS13 & vWF Multimer Explorer:** concept animation; turnaround time considerations; pretest probability framing.
   - **Complement Pathway Map (aHUS):** clickable cascade with therapeutic checkpoints (e.g., C5 inhibition) and infection prophylaxis warnings.
   - **Transfusion Stewardship Coach:** interactive decisions on platelets/FFP/cryoprecipitate; shows risks/benefits by syndrome.
   - **Case Vignette Engine:** branching cases (sepsis-DIC; pregnancy-associated TTP; pediatric STEC-HUS; adult aHUS; primary ITP refractory). Includes time-line labs, orders, and outcome branching with debriefs.

6. **Assessment & Mastery System**
   - Item types: MCQ/EMQ, drag-drop pathways, smear labeling, threshold selection, free-text rationale.
   - **Mastery criteria** with remediation loops and spaced repetition.
   - Generate **≥20 sample items** spanning difficulty; include answer keys and “why not” explanations with references.

7. **Accessibility, Equity, and Safety**
   - WCAG 2.2 AA: keyboard nav, focus states, contrast, captions, reduced-motion.
   - Inclusive cases (age, pregnancy, resource settings); avoid biased stereotyping.
   - Prominent safety disclaimers; HIPAA-safe mock data only.

8. **Tech Architecture (Mobile-First, Offline-Ready)**
   - **Stack:** React + TypeScript + Next.js or Vite; Tailwind; shadcn/ui; Zustand/Redux; React Router (if Vite); KaTeX/MathJax; Recharts/Plotly; i18n; Service Worker (PWA) for offline with versioning.
   - **Structure:** routes/pages; component tree; state slices for learner progress, calculators, cases; error boundaries.
   - **Performance:** code-splitting, memoization, data virtualization, skeleton UIs.
   - **Printables:** export to PDF for quick reference (algorithms, score sheets, transfusion checklists).

9. **Data Schemas (JSON with brief examples)**
   - Curriculum, lessons, glossary, calculators (inputs/validation), cases (timeline events), assessments (items/keys/rationales), analytics events.
   - Include units metadata and validation constraints.

10. **Screen Inventory & Wireframe-by-Text**
   - Home; Syndrome Overview; Compare/Contrast; Calculators; Cases; Labs Interpreter; Assessment; Review; Glossary; References; Settings (theme, units, accessibility); Progress Dashboard.
   - For each: purpose, components, interactions, empty/loading/error states.

11. **Copy & Content Kit (Samples)**
   - UX microcopy (e.g., “Do not delay plasma exchange for high-risk TTP.”).
   - Glossary entries with plain + formal definitions.
   - 2 sample lessons (e.g., “MAHA Fundamentals,” “Rapid TTP Recognition”) and 1 complete branching case with debrief.

12. **Analytics & Improvement Plan**
   - Event taxonomy (view, interact, submit, mastery unlock, hint used).
   - Learning gain metrics (pre/post delta, time-to-mastery) and content health (item discrimination, distractor performance).
   - Periodic “Guideline Drift” checks: surface modules flagged for literature review.

13. **QA & Validation**
   - Clinical content checklist vs cited sources; numeric sanity checks; unit tests for calculators and thresholds; snapshot tests for components; a11y tests.
   - Risk register of common misconceptions and how UI counters them (e.g., “normal PT/aPTT does not exclude TTP”).

14. **Roadmap**
   - M0 Prototype (calculators + compare table) → M1 Cases & assessments → M2 Personalization & spaced repetition → M3 Research mode (export de-identified case data for teaching/research).

---

## Output Format (Exactly This Order)
1. Executive Summary & Names  
2. Personas & Use Cases  
3. Curriculum Map & Knowledge Graph (bullet tree)  
4. Interactive Specs (table)  
5. Assessment Bank (items + rationales)  
6. Reasoning Framework (core explainer + pearls/pitfalls + mnemonics)  
7. Accessibility & Safety Checklist  
8. Tech Architecture (stack, component tree, state slices)  
9. Data Schemas (JSON + brief examples)  
10. Screen Specs & Wireframe-by-Text  
11. Copy & Content Kit (samples)  
12. Analytics & Improvement Plan  
13. QA Checklist & Test Plan  
14. Roadmap

> Include small code snippets for ONE representative interactive (e.g., PLASMIC score calculator component) and ONE assessment item renderer.

---

## Style & Rigor Requirements (Apply Throughout)
- Plain language first, then formal definition with citations.  
- Show assumptions; list edge cases (pregnancy, pediatrics, renal impairment).  
- Keep numbers coherent; label simulated data and units explicitly.  
- When evidence differs by context (e.g., STEC-HUS antibiotic caution), present both sides with dates and citations.  
- Never contradict thresholds or indications across modules; run the **Contradiction Check** before final output.

---

## Starter Defaults (If Missing, Propose & Label as Defaults)
- Platelet units: ×10⁹/L; Hb g/dL; fibrinogen mg/dL; LDH U/L; creatinine mg/dL; bilirubin mg/dL.  
- Typical ranges for labs and cut-offs used in ISTH DIC and PLASMIC scoring—display with version year.  
- Offline caching strategy (PWA) and print styles for algorithms.

---

## Now Generate
Using the **Fixed Inputs**, **Accuracy & Safety Protocol**, and **Output Format**, produce the complete deliverables for the DIC/TTP/ITP/HUS educational app. If any sub-inputs are missing, propose conservative, clearly labeled defaults, and provide inline citations and a reference list.
