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
];
