import React, { createContext, useContext, useState } from 'react';

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

  // Placeholder for backend submission
  const submitOnboardingProfile = async (profile: OnboardingAnswers) => {
    // TODO: Send profile to backend API
    console.log('Submitting onboarding profile:', profile);
    // Example: await api.post('/user/onboarding', profile);
  };

  return (
    <OnboardingContext.Provider value={{ answers, setAnswers, submitOnboardingProfile }}>
      {children}
    </OnboardingContext.Provider>
  );
}; 