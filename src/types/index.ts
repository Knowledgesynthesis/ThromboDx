// Core domain types for the hematology education app

export type LearnerLevel = 'medical-student' | 'resident' | 'fellow' | 'attending';

export type LearningContext = 'exam-prep' | 'bedside' | 'research';

export type BloomLevel = 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';

export type ClinicalDomain = 'pathophysiology' | 'diagnosis' | 'management' | 'complications';

export type Syndrome = 'DIC' | 'TTP' | 'ITP' | 'HUS' | 'aHUS' | 'STEC-HUS';

export interface Reference {
  id: string;
  citation: string;
  year: number;
  url?: string;
}

export interface ContentNode {
  id: string;
  title: string;
  description: string;
  bloomLevel: BloomLevel;
  clinicalDomain: ClinicalDomain;
  prerequisites: string[]; // IDs of prerequisite nodes
  references: Reference[];
  estimatedMinutes: number;
}

export interface Lesson extends ContentNode {
  content: string; // Markdown content
  learnerLevel: LearnerLevel[];
  keyPoints: string[];
  pitfalls: string[];
  clinicalPearls: string[];
}

export interface LabValue {
  name: string;
  value: number;
  unit: string;
  normalRange: { min: number; max: number };
  isAbnormal: boolean;
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'select' | 'boolean' | 'range';
  unit?: string;
  options?: { value: string | number | boolean; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  required: boolean;
  validation?: {
    min?: number;
    max?: number;
    message?: string;
  };
}

export interface CalculatorResult {
  score?: number;
  interpretation: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
  warnings?: string[];
  references: Reference[];
}

export interface Calculator {
  id: string;
  name: string;
  description: string;
  version: string;
  versionYear: number;
  inputs: CalculatorInput[];
  calculate: (values: Record<string, any>) => CalculatorResult;
}

export interface CaseTimelineEvent {
  time: string; // e.g., "Day 1, 08:00"
  type: 'presentation' | 'labs' | 'imaging' | 'intervention' | 'outcome';
  description: string;
  labs?: LabValue[];
  decision?: {
    prompt: string;
    options: CaseOption[];
  };
}

export interface CaseOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
  consequences?: string;
  nextEventId?: string;
}

export interface Case {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  syndrome: Syndrome;
  learnerLevel: LearnerLevel[];
  scenario: string;
  timeline: CaseTimelineEvent[];
  learningObjectives: string[];
  debrief: {
    keyTakeaways: string[];
    pitfalls: string[];
    references: Reference[];
  };
}

export interface AssessmentItem {
  id: string;
  type: 'mcq' | 'multiple-select' | 'drag-drop' | 'free-text';
  question: string;
  options?: { id: string; text: string }[];
  correctAnswers: string[];
  explanation: string;
  whyNotExplanations?: Record<string, string>; // For incorrect options
  difficulty: 'easy' | 'medium' | 'hard';
  bloomLevel: BloomLevel;
  tags: string[];
  references: Reference[];
}

export interface LearnerProgress {
  userId: string;
  completedLessons: string[];
  completedCases: string[];
  assessmentScores: Record<string, number>;
  masteredTopics: string[];
  lastActiveDate: Date;
  totalTimeMinutes: number;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  units: 'us' | 'si';
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
  learnerLevel: LearnerLevel;
  learningContext: LearningContext;
}

export interface GlossaryEntry {
  term: string;
  plainDefinition: string;
  formalDefinition: string;
  synonyms?: string[];
  relatedTerms?: string[];
  references: Reference[];
}

export interface ComparisonTableRow {
  category: string;
  DIC: string | string[];
  TTP: string | string[];
  ITP: string | string[];
  HUS: string | string[];
}

export interface AnalyticsEvent {
  eventType: 'view' | 'interact' | 'submit' | 'complete' | 'hint-used';
  timestamp: Date;
  data: Record<string, any>;
}
