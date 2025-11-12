import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Unit conversion utilities
export function convertPlateletCount(value: number, from: 'us' | 'si', to: 'us' | 'si'): number {
  if (from === to) return value;
  // US: ×10³/μL, SI: ×10⁹/L (same numeric value)
  return value;
}

export function convertHemoglobin(value: number, from: 'us' | 'si', to: 'us' | 'si'): number {
  if (from === to) return value;
  // US: g/dL, SI: g/L
  return from === 'us' ? value * 10 : value / 10;
}

export function convertFibrinogen(value: number, from: 'us' | 'si', to: 'us' | 'si'): number {
  if (from === to) return value;
  // US: mg/dL, SI: g/L
  return from === 'us' ? value / 100 : value * 100;
}

export function convertCreatinine(value: number, from: 'us' | 'si', to: 'us' | 'si'): number {
  if (from === to) return value;
  // US: mg/dL, SI: μmol/L
  return from === 'us' ? value * 88.4 : value / 88.4;
}

export function convertBilirubin(value: number, from: 'us' | 'si', to: 'us' | 'si'): number {
  if (from === to) return value;
  // US: mg/dL, SI: μmol/L
  return from === 'us' ? value * 17.1 : value / 17.1;
}

// Format numbers with appropriate precision
export function formatLabValue(value: number, precision: number = 1): string {
  return value.toFixed(precision);
}

// Check if a lab value is within normal range
export function isValueNormal(value: number, range: { min: number; max: number }): boolean {
  return value >= range.min && value <= range.max;
}

// Generate unique IDs
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Format time for display
export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

// Safe localStorage access
export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Calculate percentage
export function calculatePercentage(part: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
}

// Shuffle array (for randomizing questions)
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Deep clone object
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
