import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppSettings, LearnerProgress, AnalyticsEvent } from '@/types';
import { getStorageItem, setStorageItem } from '@/lib/utils';

interface AppState {
  // Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;

  // Learner Progress
  progress: LearnerProgress;
  completeLesson: (lessonId: string) => void;
  completeCase: (caseId: string) => void;
  updateAssessmentScore: (assessmentId: string, score: number) => void;
  addMasteredTopic: (topicId: string) => void;
  updateActiveTime: (minutes: number) => void;

  // Analytics
  events: AnalyticsEvent[];
  trackEvent: (event: Omit<AnalyticsEvent, 'timestamp'>) => void;

  // UI State
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

const defaultSettings: AppSettings = {
  theme: 'dark',
  units: 'us',
  reducedMotion: false,
  fontSize: 'medium',
  learnerLevel: 'resident',
  learningContext: 'exam-prep',
};

const defaultProgress: LearnerProgress = {
  userId: 'default-user',
  completedLessons: [],
  completedCases: [],
  assessmentScores: {},
  masteredTopics: [],
  lastActiveDate: new Date(),
  totalTimeMinutes: 0,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      settings: getStorageItem('settings', defaultSettings),
      progress: getStorageItem('progress', defaultProgress),
      events: [],
      sidebarOpen: false,

      // Settings actions
      updateSettings: (newSettings) => {
        set((state) => {
          const updatedSettings = { ...state.settings, ...newSettings };
          setStorageItem('settings', updatedSettings);

          // Apply theme
          if (newSettings.theme) {
            if (newSettings.theme === 'dark') {
              document.documentElement.classList.add('dark');
            } else if (newSettings.theme === 'light') {
              document.documentElement.classList.remove('dark');
            } else {
              // System theme
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              if (prefersDark) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            }
          }

          return { settings: updatedSettings };
        });
      },

      // Progress actions
      completeLesson: (lessonId) => {
        set((state) => {
          const completedLessons = state.progress.completedLessons.includes(lessonId)
            ? state.progress.completedLessons
            : [...state.progress.completedLessons, lessonId];

          const updatedProgress = {
            ...state.progress,
            completedLessons,
            lastActiveDate: new Date(),
          };

          setStorageItem('progress', updatedProgress);
          return { progress: updatedProgress };
        });
      },

      completeCase: (caseId) => {
        set((state) => {
          const completedCases = state.progress.completedCases.includes(caseId)
            ? state.progress.completedCases
            : [...state.progress.completedCases, caseId];

          const updatedProgress = {
            ...state.progress,
            completedCases,
            lastActiveDate: new Date(),
          };

          setStorageItem('progress', updatedProgress);
          return { progress: updatedProgress };
        });
      },

      updateAssessmentScore: (assessmentId, score) => {
        set((state) => {
          const updatedProgress = {
            ...state.progress,
            assessmentScores: {
              ...state.progress.assessmentScores,
              [assessmentId]: score,
            },
            lastActiveDate: new Date(),
          };

          setStorageItem('progress', updatedProgress);
          return { progress: updatedProgress };
        });
      },

      addMasteredTopic: (topicId) => {
        set((state) => {
          const masteredTopics = state.progress.masteredTopics.includes(topicId)
            ? state.progress.masteredTopics
            : [...state.progress.masteredTopics, topicId];

          const updatedProgress = {
            ...state.progress,
            masteredTopics,
            lastActiveDate: new Date(),
          };

          setStorageItem('progress', updatedProgress);
          return { progress: updatedProgress };
        });
      },

      updateActiveTime: (minutes) => {
        set((state) => {
          const updatedProgress = {
            ...state.progress,
            totalTimeMinutes: state.progress.totalTimeMinutes + minutes,
            lastActiveDate: new Date(),
          };

          setStorageItem('progress', updatedProgress);
          return { progress: updatedProgress };
        });
      },

      // Analytics actions
      trackEvent: (event) => {
        set((state) => ({
          events: [
            ...state.events,
            {
              ...event,
              timestamp: new Date(),
            },
          ],
        }));
      },

      // UI actions
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    {
      name: 'thrombolens-storage',
      partialize: (state) => ({
        settings: state.settings,
        progress: state.progress,
      }),
    }
  )
);

// Initialize theme on load
if (typeof window !== 'undefined') {
  const settings = getStorageItem('settings', defaultSettings);
  if (settings.theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (settings.theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }
}
