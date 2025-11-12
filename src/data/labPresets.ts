// Lab value presets for different pathologies and severity levels
// Based on standard hematology textbooks and clinical guidelines

export interface LabPreset {
  id: string;
  name: string;
  category: 'normal' | 'ttp' | 'hus' | 'dic' | 'itp' | 'mixed';
  severity: 'normal' | 'mild' | 'moderate' | 'severe';
  description: string;
  values: {
    platelets: number;
    hemoglobin: number;
    ldh: number;
    haptoglobin: number;
    indirectBilirubin: number;
    creatinine: number;
    schistocytes: 'none' | 'rare' | 'moderate' | 'numerous';
  };
  clinicalContext: string;
  references?: string[];
}

export const labPresets: LabPreset[] = [
  {
    id: 'normal',
    name: 'Normal Lab Values',
    category: 'normal',
    severity: 'normal',
    description: 'Typical normal values for a healthy adult',
    values: {
      platelets: 250,
      hemoglobin: 14.5,
      ldh: 180,
      haptoglobin: 100,
      indirectBilirubin: 0.5,
      creatinine: 1.0,
      schistocytes: 'none',
    },
    clinicalContext: 'No evidence of hemolysis, normal platelet count, normal renal function',
  },
  {
    id: 'ttp-mild',
    name: 'TTP - Early/Mild',
    category: 'ttp',
    severity: 'mild',
    description: 'Early presentation of TTP with moderate thrombocytopenia',
    values: {
      platelets: 45,
      hemoglobin: 10.2,
      ldh: 680,
      haptoglobin: 15,
      indirectBilirubin: 1.8,
      creatinine: 1.1,
      schistocytes: 'moderate',
    },
    clinicalContext: 'Patient with headache and mild confusion. PLASMIC score likely 6-7. Early recognition critical.',
    references: ['Bendapudi PK, et al. Lancet Haematol. 2017'],
  },
  {
    id: 'ttp-severe',
    name: 'TTP - Severe',
    category: 'ttp',
    severity: 'severe',
    description: 'Severe TTP with marked hemolysis and thrombocytopenia',
    values: {
      platelets: 8,
      hemoglobin: 6.8,
      ldh: 2400,
      haptoglobin: 5,
      indirectBilirubin: 3.5,
      creatinine: 1.4,
      schistocytes: 'numerous',
    },
    clinicalContext: 'Altered mental status, fever, severe MAHA. Immediate plasma exchange required. DO NOT DELAY.',
    references: ['Zheng XL, et al. J Thromb Haemost. 2020'],
  },
  {
    id: 'dic-mild',
    name: 'DIC - Non-Overt/Compensated',
    category: 'dic',
    severity: 'mild',
    description: 'Early DIC with mild consumption',
    values: {
      platelets: 95,
      hemoglobin: 11.5,
      ldh: 420,
      haptoglobin: 25,
      indirectBilirubin: 1.2,
      creatinine: 1.3,
      schistocytes: 'rare',
    },
    clinicalContext: 'Patient with sepsis, falling platelets. ISTH score 3-4. Serial monitoring required.',
    references: ['Taylor FB Jr, et al. Thromb Haemost. 2001'],
  },
  {
    id: 'dic-severe',
    name: 'DIC - Overt/Decompensated',
    category: 'dic',
    severity: 'severe',
    description: 'Overt DIC with severe consumption and bleeding',
    values: {
      platelets: 35,
      hemoglobin: 8.5,
      ldh: 850,
      haptoglobin: 10,
      indirectBilirubin: 2.1,
      creatinine: 2.4,
      schistocytes: 'moderate',
    },
    clinicalContext: 'Septic shock with oozing from IV sites. ISTH score ≥5. Requires PT/aPTT, fibrinogen, D-dimer.',
    references: ['Levi M, et al. Br J Haematol. 2009'],
  },
  {
    id: 'itp-moderate',
    name: 'ITP - Moderate',
    category: 'itp',
    severity: 'moderate',
    description: 'Immune thrombocytopenia without hemolysis',
    values: {
      platelets: 35,
      hemoglobin: 13.8,
      ldh: 195,
      haptoglobin: 95,
      indirectBilirubin: 0.6,
      creatinine: 0.9,
      schistocytes: 'none',
    },
    clinicalContext: 'Isolated thrombocytopenia, no hemolysis. Petechiae present. Diagnosis of exclusion.',
    references: ['Neunert C, et al. Blood Adv. 2019'],
  },
  {
    id: 'itp-severe',
    name: 'ITP - Severe',
    category: 'itp',
    severity: 'severe',
    description: 'Severe ITP with bleeding risk',
    values: {
      platelets: 8,
      hemoglobin: 13.2,
      ldh: 205,
      haptoglobin: 88,
      indirectBilirubin: 0.7,
      creatinine: 0.95,
      schistocytes: 'none',
    },
    clinicalContext: 'Severe thrombocytopenia with mucosal bleeding. NO evidence of hemolysis or schistocytes.',
    references: ['Provan D, et al. Blood Adv. 2019'],
  },
  {
    id: 'hus-moderate',
    name: 'HUS - Moderate',
    category: 'hus',
    severity: 'moderate',
    description: 'HUS with renal impairment and MAHA',
    values: {
      platelets: 78,
      hemoglobin: 9.1,
      ldh: 920,
      haptoglobin: 12,
      indirectBilirubin: 2.3,
      creatinine: 2.8,
      schistocytes: 'moderate',
    },
    clinicalContext: 'STEC-HUS, history of bloody diarrhea. Significant renal impairment (hallmark feature).',
    references: ['Loirat C, et al. Pediatr Nephrol. 2016'],
  },
  {
    id: 'hus-severe',
    name: 'HUS - Severe',
    category: 'hus',
    severity: 'severe',
    description: 'Severe HUS requiring dialysis',
    values: {
      platelets: 42,
      hemoglobin: 6.9,
      ldh: 1650,
      haptoglobin: 5,
      indirectBilirubin: 3.8,
      creatinine: 5.2,
      schistocytes: 'numerous',
    },
    clinicalContext: 'Severe renal failure requiring dialysis. Marked MAHA. If atypical HUS, consider eculizumab.',
    references: ['Legendre CM, et al. N Engl J Med. 2013'],
  },
  {
    id: 'maha-no-coag',
    name: 'MAHA Without Coagulopathy',
    category: 'mixed',
    severity: 'moderate',
    description: 'Microangiopathic hemolysis with normal coagulation',
    values: {
      platelets: 52,
      hemoglobin: 8.7,
      ldh: 1280,
      haptoglobin: 8,
      indirectBilirubin: 2.9,
      creatinine: 1.6,
      schistocytes: 'numerous',
    },
    clinicalContext: 'MAHA pattern suggests TMA (TTP/HUS). Normal PT/aPTT argues against DIC. Need ADAMTS13.',
    references: ['George JN, et al. N Engl J Med. 2014'],
  },
  {
    id: 'comparison-ttp-vs-itp',
    name: 'Teaching: TTP vs ITP Comparison',
    category: 'mixed',
    severity: 'moderate',
    description: 'Two scenarios for educational comparison',
    values: {
      platelets: 15,
      hemoglobin: 7.2,
      ldh: 1850,
      haptoglobin: 5,
      indirectBilirubin: 3.2,
      creatinine: 1.3,
      schistocytes: 'numerous',
    },
    clinicalContext: 'Compare with ITP preset: TTP has hemolysis, schistocytes, elevated LDH. ITP has none of these.',
  },
  {
    id: 'pregnancy-ttp',
    name: 'Pregnancy-Associated TTP',
    category: 'ttp',
    severity: 'severe',
    description: 'TTP in 3rd trimester pregnancy',
    values: {
      platelets: 18,
      hemoglobin: 7.8,
      ldh: 1920,
      haptoglobin: 5,
      indirectBilirubin: 3.1,
      creatinine: 1.2,
      schistocytes: 'numerous',
    },
    clinicalContext: '28 weeks pregnant, confusion, headache. Distinguish from HELLP (check PT/aPTT, AST/ALT).',
    references: ['Scully M, et al. N Engl J Med. 2019'],
  },
  {
    id: 'post-transfusion',
    name: 'Post-Massive Transfusion',
    category: 'dic',
    severity: 'moderate',
    description: 'Dilutional coagulopathy with consumption',
    values: {
      platelets: 62,
      hemoglobin: 9.2,
      ldh: 480,
      haptoglobin: 35,
      indirectBilirubin: 1.4,
      creatinine: 1.8,
      schistocytes: 'rare',
    },
    clinicalContext: 'Trauma patient, 15 units PRBCs. Dilution + consumption. Monitor fibrinogen, consider TXA.',
  },
  {
    id: 'atypical-hus',
    name: 'Atypical HUS (aHUS)',
    category: 'hus',
    severity: 'severe',
    description: 'Complement-mediated HUS',
    values: {
      platelets: 48,
      hemoglobin: 7.5,
      ldh: 1420,
      haptoglobin: 8,
      indirectBilirubin: 2.8,
      creatinine: 4.1,
      schistocytes: 'numerous',
    },
    clinicalContext: 'No diarrhea history, recurrent episodes. Check complement studies. Eculizumab consideration.',
    references: ['Loirat C, et al. Pediatr Nephrol. 2016'],
  },
];

// Helper function to get presets by category
export function getPresetsByCategory(category: LabPreset['category']): LabPreset[] {
  return labPresets.filter(preset => preset.category === category);
}

// Helper function to get presets by severity
export function getPresetsBySeverity(severity: LabPreset['severity']): LabPreset[] {
  return labPresets.filter(preset => preset.severity === severity);
}
