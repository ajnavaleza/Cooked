import React, { createContext, useContext, useState } from 'react';
import * as auth from '../../api/auth';

export type OnboardingAnswers = {
  // Signup fields
  name?: string;
  email?: string;
  password?: string;
  birthday?: string;
  // Quiz fields
  cuisines: string[];
  diets: string[];
  recipeTypes: string[];
  allergies: string[];
  allergyOther?: string;
};

const defaultAnswers: OnboardingAnswers = {
  name: '',
  email: '',
  password: '',
  birthday: '',
  cuisines: [],
  diets: [],
  recipeTypes: [],
  allergies: [],
  allergyOther: '',
};

const OnboardingContext = createContext<{
  answers: OnboardingAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<OnboardingAnswers>>;
  submitOnboardingProfile: (answers: OnboardingAnswers) => Promise<void>;
}>({
  answers: defaultAnswers,
  setAnswers: () => {},
  submitOnboardingProfile: async () => {},
});

export const useOnboarding = () => useContext(OnboardingContext);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<OnboardingAnswers>(defaultAnswers);

  const submitOnboardingProfile = async (profile: OnboardingAnswers) => {
    try {
      // Extract only the preferences-related fields
      const preferences = {
        cuisines: profile.cuisines || [],
        diets: profile.diets || [],
        recipeTypes: profile.recipeTypes || [],
        allergies: profile.allergies || [],
        allergyOther: profile.allergyOther || '',
      };

      // Update user preferences in the backend
      await auth.updatePreferences(preferences);
    } catch (error: any) {
      console.error('Error submitting onboarding profile:', error);
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      } else if (error.message) {
        throw new Error(error.message);
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