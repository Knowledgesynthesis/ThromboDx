import type { Case } from '@/types';

export const cases: Case[] = [
  {
    id: 'case-sepsis-dic',
    title: 'Sepsis-Associated DIC',
    difficulty: 'advanced',
    syndrome: 'DIC',
    learnerLevel: ['resident', 'fellow', 'attending'],
    scenario: `A 48-year-old man with diabetes presents to the ED with fever, confusion, and hypotension.
    He was in his usual state of health until 2 days ago when he developed cough and fever.`,
    timeline: [
      {
        time: 'Day 1, 08:00 - ED Presentation',
        type: 'presentation',
        description: `Vital signs: BP 85/50, HR 125, RR 28, T 39.2°C, SpO2 88% on RA
        Physical exam: Confused, warm extremities, bilateral crackles on lung exam
        PMH: Type 2 diabetes, hypertension
        Medications: Metformin, lisinopril`,
        labs: [
          { name: 'WBC', value: 22.5, unit: '×10⁹/L', normalRange: { min: 4.5, max: 11 }, isAbnormal: true },
          { name: 'Platelets', value: 145, unit: '×10⁹/L', normalRange: { min: 150, max: 450 }, isAbnormal: true },
          { name: 'Hemoglobin', value: 13.2, unit: 'g/dL', normalRange: { min: 13, max: 17 }, isAbnormal: false },
          { name: 'Creatinine', value: 1.8, unit: 'mg/dL', normalRange: { min: 0.7, max: 1.3 }, isAbnormal: true },
          { name: 'Lactate', value: 4.2, unit: 'mmol/L', normalRange: { min: 0.5, max: 2.2 }, isAbnormal: true },
        ],
        decision: {
          prompt: 'Initial management approach?',
          options: [
            {
              id: 'opt1',
              text: 'Aggressive fluid resuscitation, broad-spectrum antibiotics, vasopressors',
              isCorrect: true,
              feedback: 'Correct! This patient has septic shock requiring urgent source control and hemodynamic support. The qSOFA score is 3 (hypotension, altered mentation, tachypnea).',
              consequences: 'Patient stabilizes initially with fluids and norepinephrine. Blood cultures drawn, antibiotics administered.',
              nextEventId: 'day1-evening',
            },
            {
              id: 'opt2',
              text: 'CT chest/abdomen first, then start antibiotics',
              isCorrect: false,
              feedback: 'Time to antibiotics is critical in septic shock. Initial resuscitation and antibiotics should not be delayed for imaging.',
              consequences: 'Delayed antibiotics. Patient continues to deteriorate.',
            },
            {
              id: 'opt3',
              text: 'Start antibiotics, wait to see response before escalating care',
              isCorrect: false,
              feedback: 'This patient is in septic shock and requires immediate aggressive resuscitation including vasopressors.',
              consequences: 'Inadequate hemodynamic support leads to worsening organ dysfunction.',
            },
          ],
        },
      },
      {
        time: 'Day 1, 20:00 - ICU Transfer',
        type: 'labs',
        description: `Patient admitted to ICU on norepinephrine. CXR shows bilateral infiltrates.
        Blood cultures pending. New labs drawn:`,
        labs: [
          { name: 'Platelets', value: 95, unit: '×10⁹/L', normalRange: { min: 150, max: 450 }, isAbnormal: true },
          { name: 'PT', value: 16.2, unit: 'sec', normalRange: { min: 11, max: 13.5 }, isAbnormal: true },
          { name: 'INR', value: 1.5, unit: '', normalRange: { min: 0.8, max: 1.2 }, isAbnormal: true },
          { name: 'aPTT', value: 42, unit: 'sec', normalRange: { min: 25, max: 35 }, isAbnormal: true },
          { name: 'Fibrinogen', value: 180, unit: 'mg/dL', normalRange: { min: 200, max: 400 }, isAbnormal: true },
          { name: 'D-dimer', value: 6800, unit: 'ng/mL', normalRange: { min: 0, max: 500 }, isAbnormal: true },
        ],
        decision: {
          prompt: 'What is happening with the coagulation system?',
          options: [
            {
              id: 'opt1',
              text: 'Developing DIC - check ISTH score',
              isCorrect: true,
              feedback: 'Correct! Falling platelets, prolonged PT/aPTT, low fibrinogen, and markedly elevated D-dimer suggest consumptive coagulopathy.',
              consequences: 'ISTH DIC score calculated: Platelets <100 (1pt) + D-dimer strong increase (3pts) + PT >6sec prolonged (2pts) + Fibrinogen <200 (1pt) = 7 points = Overt DIC',
              nextEventId: 'day2-morning',
            },
            {
              id: 'opt2',
              text: 'Heparin effect from DVT prophylaxis',
              isCorrect: false,
              feedback: 'Prophylactic heparin does not cause this degree of abnormality. The falling platelets and low fibrinogen indicate consumption.',
              consequences: 'Missed DIC diagnosis delays appropriate monitoring and management.',
            },
            {
              id: 'opt3',
              text: 'Dilutional coagulopathy from resuscitation',
              isCorrect: false,
              feedback: 'Dilution would not explain falling platelets, low fibrinogen, and markedly elevated D-dimer. This is consumption.',
              consequences: 'Inappropriate diagnosis leads to inadequate monitoring.',
            },
          ],
        },
      },
      {
        time: 'Day 2, 08:00 - DIC Management',
        type: 'intervention',
        description: `Overt DIC confirmed. Patient remains on vasopressors. No active bleeding currently.
        Blood cultures from admission growing Gram-positive cocci in clusters.`,
        decision: {
          prompt: 'Management approach for DIC in this patient?',
          options: [
            {
              id: 'opt1',
              text: 'Continue treating sepsis, transfuse only if bleeding or procedures planned',
              isCorrect: true,
              feedback: 'Correct! Treating the underlying condition is paramount. Prophylactic transfusion is not recommended without bleeding or planned invasive procedures.',
              consequences: 'Appropriate management. Blood cultures finalize as MRSA. Patient continues on vancomycin.',
              nextEventId: 'day3',
            },
            {
              id: 'opt2',
              text: 'Prophylactic FFP, platelets, and cryoprecipitate to normalize labs',
              isCorrect: false,
              feedback: 'Prophylactic blood product transfusion in non-bleeding DIC patients is not recommended and may worsen outcomes.',
              consequences: 'Unnecessary transfusion risks including volume overload and transfusion reactions.',
            },
            {
              id: 'opt3',
              text: 'Start therapeutic heparin to prevent microthrombi',
              isCorrect: false,
              feedback: 'Anticoagulation in DIC is controversial and only considered in specific thrombotic-predominant presentations (e.g., purpura fulminans). Not indicated here.',
              consequences: 'Increased bleeding risk without clear benefit.',
            },
          ],
        },
      },
      {
        time: 'Day 3, 08:00 - Clinical Improvement',
        type: 'outcome',
        description: `Patient showing signs of improvement. Off vasopressors, mental status clearing.
        Repeat labs show improvement:`,
        labs: [
          { name: 'Platelets', value: 125, unit: '×10⁹/L', normalRange: { min: 150, max: 450 }, isAbnormal: true },
          { name: 'PT', value: 14.1, unit: 'sec', normalRange: { min: 11, max: 13.5 }, isAbnormal: true },
          { name: 'INR', value: 1.3, unit: '', normalRange: { min: 0.8, max: 1.2 }, isAbnormal: true },
          { name: 'Fibrinogen', value: 250, unit: 'mg/dL', normalRange: { min: 200, max: 400 }, isAbnormal: false },
          { name: 'D-dimer', value: 2200, unit: 'ng/mL', normalRange: { min: 0, max: 500 }, isAbnormal: true },
        ],
      },
    ],
    learningObjectives: [
      'Recognize the clinical presentation of sepsis-associated DIC',
      'Calculate and interpret ISTH DIC score',
      'Understand that treating the underlying condition is paramount',
      'Apply appropriate transfusion thresholds in DIC',
      'Monitor coagulation parameters serially in at-risk patients',
    ],
    debrief: {
      keyTakeaways: [
        'DIC is always secondary to an underlying condition - treatment of the primary disorder is essential',
        'ISTH DIC score helps identify overt DIC: score ≥5 in a patient with an underlying disorder',
        'Prophylactic blood product transfusion is NOT recommended in non-bleeding DIC patients',
        'Serial monitoring of platelets, PT/INR, aPTT, fibrinogen, and D-dimer guides management',
        'Septic shock requires early recognition and aggressive management (fluids, antibiotics, source control)',
      ],
      pitfalls: [
        'Waiting for "classic" findings - DIC is dynamic and may present with subtle abnormalities initially',
        'Over-transfusing non-bleeding patients - may worsen outcomes',
        'Ignoring the underlying condition - DIC will not resolve without treating the primary disorder',
        'Missing the transition from compensated to decompensated DIC',
      ],
      references: [
        {
          id: 'isth-dic',
          citation: 'Taylor FB Jr, et al. Towards definition, clinical and laboratory criteria, and a scoring system for disseminated intravascular coagulation. Thromb Haemost. 2001;86(5):1327-1330.',
          year: 2001,
        },
        {
          id: 'levi-dic',
          citation: 'Levi M, et al. Guidelines for the diagnosis and management of disseminated intravascular coagulation. Br J Haematol. 2009;145(1):24-33.',
          year: 2009,
        },
      ],
    },
  },
  {
    id: 'case-ttp-pregnancy',
    title: 'Pregnancy-Associated TTP',
    difficulty: 'intermediate',
    syndrome: 'TTP',
    learnerLevel: ['resident', 'fellow', 'attending'],
    scenario: `A 32-year-old woman at 28 weeks gestation presents with headache, confusion, and petechiae.
    She has had a normal pregnancy until now.`,
    timeline: [
      {
        time: 'Day 1, 10:00 - ED Presentation',
        type: 'presentation',
        description: `G2P1 at 28 weeks by dates, complaining of severe headache for 2 days
        This morning developed confusion per husband
        Vital signs: BP 145/92, HR 110, T 37.8°C
        Exam: Confused, oriented to person only, scattered petechiae on arms`,
        labs: [
          { name: 'Platelets', value: 18, unit: '×10⁹/L', normalRange: { min: 150, max: 450 }, isAbnormal: true },
          { name: 'Hemoglobin', value: 7.2, unit: 'g/dL', normalRange: { min: 11, max: 16 }, isAbnormal: true },
          { name: 'LDH', value: 1850, unit: 'U/L', normalRange: { min: 140, max: 280 }, isAbnormal: true },
          { name: 'Haptoglobin', value: 5, unit: 'mg/dL', normalRange: { min: 30, max: 200 }, isAbnormal: true },
          { name: 'Creatinine', value: 1.3, unit: 'mg/dL', normalRange: { min: 0.6, max: 1.1 }, isAbnormal: true },
        ],
        decision: {
          prompt: 'What is the most likely diagnosis?',
          options: [
            {
              id: 'opt1',
              text: 'Thrombotic Thrombocytopenic Purpura (TTP)',
              isCorrect: true,
              feedback: 'Correct! Severe thrombocytopenia, hemolytic anemia, neurologic symptoms in pregnancy. HELLP syndrome also in differential but this presentation favors TTP.',
              consequences: 'Team mobilized for urgent evaluation and plasma exchange consideration.',
              nextEventId: 'day1-labs',
            },
            {
              id: 'opt2',
              text: 'HELLP syndrome',
              isCorrect: false,
              feedback: 'HELLP is possible, but the severe neurologic symptoms and profound thrombocytopenia are more concerning for TTP.',
              consequences: 'Delayed recognition of TTP could be fatal. These conditions can overlap but require different urgency.',
            },
            {
              id: 'opt3',
              text: 'Immune Thrombocytopenia (ITP)',
              isCorrect: false,
              feedback: 'ITP does not cause hemolytic anemia or neurologic symptoms. The hemolysis and confusion indicate a microangiopathic process.',
              consequences: 'Missing TTP diagnosis leads to delayed definitive treatment.',
            },
          ],
        },
      },
      {
        time: 'Day 1, 12:00 - Additional Labs',
        type: 'labs',
        description: `Peripheral smear: Numerous schistocytes, polychromasia
        Additional labs rushed:`,
        labs: [
          { name: 'PT', value: 12.1, unit: 'sec', normalRange: { min: 11, max: 13.5 }, isAbnormal: false },
          { name: 'INR', value: 1.0, unit: '', normalRange: { min: 0.8, max: 1.2 }, isAbnormal: false },
          { name: 'aPTT', value: 28, unit: 'sec', normalRange: { min: 25, max: 35 }, isAbnormal: false },
          { name: 'AST', value: 125, unit: 'U/L', normalRange: { min: 10, max: 40 }, isAbnormal: true },
          { name: 'ALT', value: 95, unit: 'U/L', normalRange: { min: 10, max: 55 }, isAbnormal: true },
        ],
        decision: {
          prompt: 'Calculate PLASMIC score and determine next step:',
          options: [
            {
              id: 'opt1',
              text: 'PLASMIC 7/7 - START PLASMA EXCHANGE IMMEDIATELY, send ADAMTS13',
              isCorrect: true,
              feedback: 'Correct! PLASMIC score: Plts <30 (1), Hemolysis (1), No cancer (1), No transplant (1), MCV likely <90 (1), INR <1.5 (1), Cr <2.0 (1) = 7. DO NOT DELAY PLEX!',
              consequences: 'ADAMTS13 sent stat, plasma exchange initiated within 4 hours. Hematology consulted.',
              nextEventId: 'day2',
            },
            {
              id: 'opt2',
              text: 'Wait for ADAMTS13 results before starting plasma exchange',
              isCorrect: false,
              feedback: 'CRITICAL ERROR: In high PLASMIC score TTP, plasma exchange should NOT be delayed for ADAMTS13 results. Mortality approaches 90% without treatment.',
              consequences: 'Patient deteriorates rapidly with worsening neurologic status. Delayed PLEX increases mortality risk.',
            },
            {
              id: 'opt3',
              text: 'Transfuse platelets for severe thrombocytopenia',
              isCorrect: false,
              feedback: 'CONTRAINDICATED in TTP! Platelet transfusion may worsen microvascular thrombosis. Only give for life-threatening bleeding.',
              consequences: 'Platelet transfusion worsens condition, patient develops seizures.',
            },
          ],
        },
      },
      {
        time: 'Day 2, 08:00 - Post-PLEX #1',
        type: 'intervention',
        description: `Patient underwent plasma exchange overnight. Also started on high-dose steroids.
        Neurologic status slightly improved. Repeat labs:`,
        labs: [
          { name: 'Platelets', value: 28, unit: '×10⁹/L', normalRange: { min: 150, max: 450 }, isAbnormal: true },
          { name: 'Hemoglobin', value: 8.1, unit: 'g/dL', normalRange: { min: 11, max: 16 }, isAbnormal: true },
          { name: 'LDH', value: 1420, unit: 'U/L', normalRange: { min: 140, max: 280 }, isAbnormal: true },
        ],
        decision: {
          prompt: 'Management plan?',
          options: [
            {
              id: 'opt1',
              text: 'Continue daily plasma exchange, add caplacizumab if available',
              isCorrect: true,
              feedback: 'Correct! Daily PLEX continues until platelets normalize and LDH improves. Caplacizumab (anti-vWF) speeds recovery.',
              consequences: 'Appropriate management continues. ADAMTS13 activity returns at <5% confirming TTP.',
              nextEventId: 'day5',
            },
            {
              id: 'opt2',
              text: 'One plasma exchange is sufficient, monitor closely',
              isCorrect: false,
              feedback: 'TTP requires daily plasma exchange until clinical and laboratory remission. Stopping early leads to relapse.',
              consequences: 'Platelets drop again, patient deteriorates.',
            },
            {
              id: 'opt3',
              text: 'Deliver baby emergently to help resolve TTP',
              isCorrect: false,
              feedback: 'TTP in pregnancy responds to plasma exchange. Emergent delivery not indicated unless fetal or maternal distress from other causes.',
              consequences: 'Unnecessary iatrogenic prematurity. TTP must be treated regardless.',
            },
          ],
        },
      },
      {
        time: 'Day 5, 08:00 - Clinical Response',
        type: 'outcome',
        description: `After 4 daily plasma exchanges, patient showing marked improvement.
        Neurologically back to baseline. Labs improving:`,
        labs: [
          { name: 'Platelets', value: 105, unit: '×10⁹/L', normalRange: { min: 150, max: 450 }, isAbnormal: true },
          { name: 'Hemoglobin', value: 9.5, unit: 'g/dL', normalRange: { min: 11, max: 16 }, isAbnormal: true },
          { name: 'LDH', value: 380, unit: 'U/L', normalRange: { min: 140, max: 280 }, isAbnormal: true },
        ],
      },
    ],
    learningObjectives: [
      'Recognize TTP in pregnancy and distinguish from HELLP syndrome',
      'Calculate and apply PLASMIC score for urgent decision-making',
      'Understand that plasma exchange should NOT be delayed for ADAMTS13 results',
      'Know that platelet transfusion is contraindicated in TTP',
      'Manage pregnancy-associated TTP with multidisciplinary approach',
    ],
    debrief: {
      keyTakeaways: [
        'TTP is a hematologic emergency - plasma exchange should begin immediately for high PLASMIC scores',
        'DO NOT delay PLEX while waiting for ADAMTS13 results - send ADAMTS13 before starting PLEX when possible',
        'AVOID platelet transfusion in TTP unless life-threatening bleeding',
        'Daily plasma exchange continues until clinical and lab remission (platelet recovery, LDH normalization)',
        'Pregnancy-associated TTP requires continued OB monitoring but does not require emergent delivery',
        'Caplacizumab and rituximab are adjunctive therapies that improve outcomes',
      ],
      pitfalls: [
        'Delaying plasma exchange to wait for ADAMTS13 - this can be fatal',
        'Transfusing platelets - may worsen thrombosis',
        'Confusing TTP with HELLP syndrome - key differentiators are coagulation studies (normal in TTP) and severity of hemolysis',
        'Stopping plasma exchange too early based on single lab improvement',
      ],
      references: [
        {
          id: 'plasmic-score',
          citation: 'Bendapudi PK, et al. Derivation and external validation of the PLASMIC score for rapid assessment of adults with thrombotic microangiopathies: a cohort study. Lancet Haematol. 2017;4(4):e157-e164.',
          year: 2017,
        },
        {
          id: 'ttp-guidelines',
          citation: 'Zheng XL, et al. ISTH guidelines for treatment of thrombotic thrombocytopenic purpura. J Thromb Haemost. 2020;18(10):2496-2502.',
          year: 2020,
        },
      ],
    },
  },
  {
    id: 'case-pediatric-stec-hus',
    title: 'Pediatric STEC-HUS',
    difficulty: 'beginner',
    syndrome: 'HUS',
    learnerLevel: ['medical-student', 'resident'],
    scenario: `A 5-year-old previously healthy girl presents with decreased urine output and lethargy.
    Her mother reports she had bloody diarrhea 5 days ago that has since resolved.`,
    timeline: [
      {
        time: 'Day 1, 14:00 - ED Presentation',
        type: 'presentation',
        description: `Parents report 3-4 days of watery then bloody diarrhea last week
        Now with decreased energy, pale appearance, minimal urine output x 24 hours
        Vital signs: BP 110/70, HR 125, T 37.2°C
        Exam: Pale, mild periorbital edema, otherwise well-appearing`,
        labs: [
          { name: 'WBC', value: 18.2, unit: '×10⁹/L', normalRange: { min: 4.5, max: 13.5 }, isAbnormal: true },
          { name: 'Platelets', value: 68, unit: '×10⁹/L', normalRange: { min: 150, max: 450 }, isAbnormal: true },
          { name: 'Hemoglobin', value: 7.8, unit: 'g/dL', normalRange: { min: 11, max: 15 }, isAbnormal: true },
          { name: 'Creatinine', value: 3.2, unit: 'mg/dL', normalRange: { min: 0.3, max: 0.7 }, isAbnormal: true },
          { name: 'BUN', value: 42, unit: 'mg/dL', normalRange: { min: 7, max: 18 }, isAbnormal: true },
          { name: 'LDH', value: 1240, unit: 'U/L', normalRange: { min: 140, max: 280 }, isAbnormal: true },
        ],
        decision: {
          prompt: 'What is the most likely diagnosis?',
          options: [
            {
              id: 'opt1',
              text: 'Shiga toxin-producing E. coli HUS (STEC-HUS)',
              isCorrect: true,
              feedback: 'Correct! Classic triad: MAHA, thrombocytopenia, AKI following bloody diarrhea. This is typical STEC-HUS.',
              consequences: 'Stool culture and Shiga toxin assay sent. Diagnosis confirmed.',
            },
            {
              id: 'opt2',
              text: 'ITP with coincidental renal disease',
              isCorrect: false,
              feedback: 'ITP does not cause hemolytic anemia or renal failure. The elevated LDH and creatinine indicate a microangiopathic process.',
              consequences: 'Missed diagnosis delays appropriate supportive care.',
            },
            {
              id: 'opt3',
              text: 'TTP',
              isCorrect: false,
              feedback: 'While TTP is possible, the age, preceding diarrhea, and prominent renal involvement strongly suggest STEC-HUS. TTP is rare in children.',
              consequences: 'ADAMTS13 sent unnecessarily. Consider STEC-HUS first in this clinical context.',
            },
          ],
        },
      },
      {
        time: 'Day 1, 18:00 - Additional Studies',
        type: 'labs',
        description: `Peripheral smear reviewed: Numerous schistocytes, helmet cells
        Stool culture sent for E. coli O157:H7
        Urine output: 0.5 mL/kg/hr (oliguria)`,
        decision: {
          prompt: 'What is the appropriate initial management?',
          options: [
            {
              id: 'opt1',
              text: 'Supportive care: IV fluids, monitor renal function, avoid antibiotics',
              isCorrect: true,
              feedback: 'Correct! STEC-HUS is managed supportively. DO NOT give antibiotics - they increase Shiga toxin release and worsen outcome.',
              consequences: 'Appropriate supportive care initiated. Patient admitted to PICU for close monitoring.',
            },
            {
              id: 'opt2',
              text: 'Start antibiotics to treat E. coli infection',
              isCorrect: false,
              feedback: 'CRITICAL ERROR: Antibiotics in STEC-HUS increase Shiga toxin release and significantly worsen outcomes. They are CONTRAINDICATED.',
              consequences: 'Increased toxin release worsens renal injury. This is a well-established contraindication.',
            },
            {
              id: 'opt3',
              text: 'Immediate plasma exchange',
              isCorrect: false,
              feedback: 'Plasma exchange is not indicated for typical STEC-HUS. It is used for TTP and atypical HUS, not STEC-HUS.',
              consequences: 'Unnecessary procedure with risks. STEC-HUS is managed supportively.',
            },
          ],
        },
      },
      {
        time: 'Day 3, 08:00 - Clinical Course',
        type: 'intervention',
        description: `Patient with worsening oliguria, now anuric
        Developed hypertension and volume overload
        Stool culture confirms E. coli O157:H7`,
        labs: [
          { name: 'Creatinine', value: 4.8, unit: 'mg/dL', normalRange: { min: 0.3, max: 0.7 }, isAbnormal: true },
          { name: 'Potassium', value: 6.2, unit: 'mmol/L', normalRange: { min: 3.5, max: 5.0 }, isAbnormal: true },
          { name: 'Platelets', value: 45, unit: '×10⁹/L', normalRange: { min: 150, max: 450 }, isAbnormal: true },
        ],
        decision: {
          prompt: 'Management for worsening renal failure?',
          options: [
            {
              id: 'opt1',
              text: 'Initiate dialysis for volume overload, hyperkalemia, and renal failure',
              isCorrect: true,
              feedback: 'Correct! Dialysis indications: severe hyperkalemia, volume overload, uremia. Many STEC-HUS patients require temporary dialysis.',
              consequences: 'Hemodialysis initiated. Patient stabilizes over subsequent days.',
            },
            {
              id: 'opt2',
              text: 'Continue conservative management without dialysis',
              isCorrect: false,
              feedback: 'With K+ 6.2 and anuria, dialysis is urgently needed. Severe hyperkalemia and volume overload require renal replacement therapy.',
              consequences: 'Dangerous hyperkalemia and fluid overload worsen. Patient at risk for cardiac arrhythmias.',
            },
            {
              id: 'opt3',
              text: 'Give eculizumab for complement inhibition',
              isCorrect: false,
              feedback: 'Eculizumab is for atypical HUS, not typical STEC-HUS. This patient has confirmed STEC infection.',
              consequences: 'Expensive medication without benefit for STEC-HUS. Dialysis still needed.',
            },
          ],
        },
      },
      {
        time: 'Day 10, 08:00 - Recovery Phase',
        type: 'outcome',
        description: `After 7 days of dialysis, urine output improving
        Platelets recovering, hemolysis resolving
        Creatinine trending down`,
        labs: [
          { name: 'Platelets', value: 125, unit: '×10⁹/L', normalRange: { min: 150, max: 450 }, isAbnormal: true },
          { name: 'Hemoglobin', value: 9.2, unit: 'g/dL', normalRange: { min: 11, max: 15 }, isAbnormal: true },
          { name: 'Creatinine', value: 1.8, unit: 'mg/dL', normalRange: { min: 0.3, max: 0.7 }, isAbnormal: true },
          { name: 'LDH', value: 420, unit: 'U/L', normalRange: { min: 140, max: 280 }, isAbnormal: true },
        ],
      },
    ],
    learningObjectives: [
      'Recognize the classic presentation of STEC-HUS in children',
      'Understand that antibiotics are CONTRAINDICATED in STEC-HUS',
      'Identify indications for dialysis in HUS',
      'Distinguish STEC-HUS from atypical HUS and TTP',
      'Provide appropriate supportive care for pediatric HUS',
    ],
    debrief: {
      keyTakeaways: [
        'STEC-HUS typically follows bloody diarrhea (3-7 days after onset) in children',
        'Classic triad: Microangiopathic hemolytic anemia, thrombocytopenia, acute kidney injury',
        'DO NOT give antibiotics for STEC infection - increases Shiga toxin release and worsens outcome',
        'Management is supportive: IV fluids, electrolyte management, dialysis if needed',
        'Most children recover renal function, but ~30% may have long-term renal impairment',
        'Differentiate from atypical HUS (no diarrhea prodrome, may need eculizumab) and TTP (rare in children)',
      ],
      pitfalls: [
        'Giving antibiotics - well-established contraindication',
        'Confusing with TTP or atypical HUS - clinical context guides diagnosis',
        'Delaying dialysis when indicated (severe hyperkalemia, volume overload)',
        'Over-transfusing - maintain Hb ~7-8 g/dL unless symptomatic',
      ],
      references: [
        {
          id: 'wong-antibiotics',
          citation: 'Wong CS, et al. The risk of the hemolytic-uremic syndrome after antibiotic treatment of Escherichia coli O157:H7 infections. N Engl J Med. 2000;342(26):1930-1936.',
          year: 2000,
        },
        {
          id: 'loirat-hus',
          citation: 'Loirat C, Fakhouri F, Ariceta G, et al. An international consensus approach to the management of atypical hemolytic uremic syndrome in children. Pediatr Nephrol. 2016;31(1):15-39.',
          year: 2016,
        },
      ],
    },
  },
  {
    id: 'case-refractory-itp',
    title: 'Refractory ITP',
    difficulty: 'intermediate',
    syndrome: 'ITP',
    learnerLevel: ['resident', 'fellow'],
    scenario: `A 42-year-old woman with a 6-month history of ITP presents with persistent severe thrombocytopenia
    despite multiple treatment attempts.`,
    timeline: [
      {
        time: 'Initial Presentation',
        type: 'presentation',
        description: `PMH: Diagnosed with ITP 6 months ago after workup for bruising
        Treatments tried: Prednisone (responded initially, relapsed), IVIG (temporary response), Rituximab (no sustained response)
        Current: Platelet count 8 × 10⁹/L, bruising, petechiae, no active bleeding`,
        labs: [
          { name: 'Platelets', value: 8, unit: '×10⁹/L', normalRange: { min: 150, max: 450 }, isAbnormal: true },
          { name: 'Hemoglobin', value: 13.5, unit: 'g/dL', normalRange: { min: 12, max: 16 }, isAbnormal: false },
          { name: 'WBC', value: 6.8, unit: '×10⁹/L', normalRange: { min: 4.5, max: 11 }, isAbnormal: false },
          { name: 'LDH', value: 195, unit: 'U/L', normalRange: { min: 140, max: 280 }, isAbnormal: false },
          { name: 'PT/INR', value: 1.0, unit: '', normalRange: { min: 0.8, max: 1.2 }, isAbnormal: false },
          { name: 'aPTT', value: 28, unit: 'sec', normalRange: { min: 25, max: 35 }, isAbnormal: false },
        ],
        decision: {
          prompt: 'Before considering additional therapy, what should be reassessed?',
          options: [
            {
              id: 'opt1',
              text: 'Review diagnosis - ensure truly ITP and not secondary cause or pseudothrombocytopenia',
              isCorrect: true,
              feedback: 'Correct! In refractory cases, always reconsider the diagnosis. Check for secondary causes (HIV, HCV, H. pylori, SLE, CVID).',
              consequences: 'Peripheral smear reviewed - no clumping, true thrombocytopenia. HIV/HCV negative. H. pylori testing sent.',
            },
            {
              id: 'opt2',
              text: 'Immediately proceed to splenectomy',
              isCorrect: false,
              feedback: 'While splenectomy is an option for refractory ITP, should first rule out secondary causes and consider thrombopoietin agonists.',
              consequences: 'Rushing to splenectomy without full workup risks missing treatable secondary causes.',
            },
            {
              id: 'opt3',
              text: 'Repeat high-dose steroid pulse',
              isCorrect: false,
              feedback: 'Patient already failed steroids. Repeated high-dose steroids have significant side effects and unlikely to provide sustained benefit.',
              consequences: 'Steroid side effects without sustained platelet response.',
            },
          ],
        },
      },
      {
        time: 'Week 2 - Additional Testing',
        type: 'labs',
        description: `H. pylori testing returns positive
        No other secondary causes identified
        Bone marrow biopsy (if not done previously): Megakaryocytes present and increased`,
        decision: {
          prompt: 'Next management step?',
          options: [
            {
              id: 'opt1',
              text: 'Treat H. pylori infection',
              isCorrect: true,
              feedback: 'Correct! H. pylori eradication leads to platelet response in ~50% of infected ITP patients. Simple intervention that should be tried first.',
              consequences: 'H. pylori triple therapy started. Will reassess platelets after treatment completion.',
            },
            {
              id: 'opt2',
              text: 'Ignore H. pylori and proceed with splenectomy',
              isCorrect: false,
              feedback: 'H. pylori treatment is recommended before proceeding to splenectomy. It may lead to remission and avoid surgery.',
              consequences: 'Missed opportunity for non-invasive treatment that could avoid splenectomy.',
            },
            {
              id: 'opt3',
              text: 'Start immunosuppression with azathioprine',
              isCorrect: false,
              feedback: 'Should treat H. pylori first before escalating to additional immunosuppression.',
              consequences: 'Unnecessary immunosuppression before trying simpler H. pylori treatment.',
            },
          ],
        },
      },
      {
        time: 'Week 8 - Post H. pylori Treatment',
        type: 'labs',
        description: `H. pylori successfully eradicated, but platelet count remains low at 12 × 10⁹/L
        Patient desires to avoid splenectomy if possible
        Quality of life significantly impacted by bleeding restrictions`,
        labs: [
          { name: 'Platelets', value: 12, unit: '×10⁹/L', normalRange: { min: 150, max: 450 }, isAbnormal: true },
        ],
        decision: {
          prompt: 'What is the next best treatment option?',
          options: [
            {
              id: 'opt1',
              text: 'Start thrombopoietin receptor agonist (eltrombopag or romiplostim)',
              isCorrect: true,
              feedback: 'Correct! TPO agonists are effective for refractory ITP and avoid surgery. Response rates ~70-80%. Good option before splenectomy.',
              consequences: 'Started on eltrombopag with gradual dose escalation. Close monitoring of platelets and liver function.',
            },
            {
              id: 'opt2',
              text: 'Proceed with splenectomy now',
              isCorrect: false,
              feedback: 'Splenectomy is effective (~60-70% durable response) but should typically be tried after TPO agonists given surgical risks.',
              consequences: 'Surgical risks and lifelong infection risk. TPO agonists should be tried first.',
            },
            {
              id: 'opt3',
              text: 'Continue watching and waiting',
              isCorrect: false,
              feedback: 'With platelets at 12 and failed multiple therapies, patient needs treatment. Quality of life is impaired and bleeding risk present.',
              consequences: 'Ongoing bleeding risk and impaired quality of life without treatment.',
            },
          ],
        },
      },
      {
        time: 'Week 16 - Treatment Response',
        type: 'outcome',
        description: `After 8 weeks of eltrombopag at optimal dose
        Excellent platelet response achieved`,
        labs: [
          { name: 'Platelets', value: 95, unit: '×10⁹/L', normalRange: { min: 150, max: 450 }, isAbnormal: true },
          { name: 'Hemoglobin', value: 13.8, unit: 'g/dL', normalRange: { min: 12, max: 16 }, isAbnormal: false },
        ],
      },
    ],
    learningObjectives: [
      'Approach to refractory ITP - always reconsider diagnosis',
      'Recognize and treat secondary causes (H. pylori)',
      'Understand treatment escalation pathway for ITP',
      'Know indications and efficacy of TPO receptor agonists',
      'Balance treatment options: medical vs surgical (splenectomy)',
    ],
    debrief: {
      keyTakeaways: [
        'In refractory ITP, always reconsider the diagnosis and rule out secondary causes',
        'H. pylori testing recommended - eradication leads to response in ~50% of infected patients',
        'Treatment ladder: steroids → IVIG → rituximab → TPO agonists → splenectomy',
        'Thrombopoietin receptor agonists (eltrombopag, romiplostim) effective in ~70-80% of refractory cases',
        'Splenectomy offers ~60-70% durable response but has surgical risks and lifelong infection risk',
        'ITP is diagnosis of exclusion - always rule out other causes of thrombocytopenia',
      ],
      pitfalls: [
        'Failing to reconsider diagnosis in refractory cases',
        'Missing secondary causes (HIV, HCV, H. pylori, autoimmune conditions)',
        'Rushing to splenectomy without trying TPO agonists',
        'Over-treating with repeated high-dose steroids',
        'Not checking for pseudothrombocytopenia (platelet clumping)',
      ],
      references: [
        {
          id: 'ash-itp-guidelines',
          citation: 'Neunert C, et al. American Society of Hematology 2019 guidelines for immune thrombocytopenia. Blood Adv. 2019;3(23):3829-3866.',
          year: 2019,
        },
        {
          id: 'h-pylori-itp',
          citation: 'Stasi R, Provan D. Helicobacter pylori and chronic ITP. Hematology Am Soc Hematol Educ Program. 2008:206-211.',
          year: 2008,
        },
      ],
    },
  },
];
