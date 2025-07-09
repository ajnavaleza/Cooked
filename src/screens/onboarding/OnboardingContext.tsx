import React, { createContext, useContext, useState } from 'react';
import * as auth from '../../api/auth';

export interface OnboardingAnswers {
  // Signup fields
  name?: string;
  email?: string;
  password?: string;
  birthday?: string;
  // Quiz fields
  cuisines: string[];
  diets: string[];
  allergies: string[];
  allergyOther?: string;
}

interface OnboardingContextType {
  answers: OnboardingAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<OnboardingAnswers>>;
  submitOnboardingProfile: (answers: OnboardingAnswers) => Promise<void>;
}

const defaultAnswers: OnboardingAnswers = {
  name: '',
  email: '',
  password: '',
  birthday: '',
  cuisines: [],
  diets: [],
  allergies: [],
  allergyOther: '',
};

const OnboardingContext = createContext<OnboardingContextType>({
  answers: defaultAnswers,
  setAnswers: () => {},
  submitOnboardingProfile: async () => {},
});

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<OnboardingAnswers>(defaultAnswers);

  const submitOnboardingProfile = async (profile: OnboardingAnswers) => {
    try {
      await auth.updatePreferences(profile);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Failed to update preferences. Please try again.');
      }
    }
  };

  return (
    <OnboardingContext.Provider value={{ answers, setAnswers, submitOnboardingProfile }}>
      {children}
    </OnboardingContext.Provider>
  );
}; 