# Cooked.

A React Native mobile application for discovering and sharing recipes, tailored for students.

## Project Structure

```
CookedApp/
├── app.json
├── App.tsx
├── assets/
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
├── cooked-backend/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── user.js
│   └── server.js
├── src/
│   ├── api/
│   │   ├── auth.ts
│   │   └── index.ts
│   ├── assets/
│   │   ├── auth/
│   │   │   ├── create-acc-page/
│   │   │   ├── landing-page/
│   │   │   ├── login-loading/
│   │   │   └── login-page/
│   │   ├── main-page/
│   │   │   └── main-page-bg.jpg
│   │   └── recipes/
│   │       └── placeholder.txt
│   ├── components/
│   │   ├── Logo.tsx
│   │   └── Screen.tsx
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   └── MainAppNavigator.tsx
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── CreateAccountScreen.tsx
│   │   │   ├── LandingScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   └── LoginScreenLoading.tsx
│   │   ├── main/
│   │   │   ├── ExploreScreen.tsx
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── ProfileScreen.tsx
│   │   │   └── RecipesScreen.tsx
│   │   └── onboarding/
│   │       ├── AllergiesScreen.tsx
│   │       ├── CompletionScreen.tsx
│   │       ├── CuisinesScreen.tsx
│   │       ├── DietsScreen.tsx
│   │       ├── OnboardingContext.tsx
│   │       ├── OnboardingNavigator.tsx
│   │       └── RecipesScreen.tsx
│   ├── styles/
│   │   ├── auth/
│   │   │   ├── CreateAccountScreen.styles.ts
│   │   │   ├── LandingScreen.styles.ts
│   │   │   ├── LoginScreen.styles.ts
│   │   │   └── LoginScreenLoading.styles.ts
│   │   ├── main/
│   │   │   ├── ExploreScreen.styles.ts
│   │   │   ├── HomeScreen.styles.ts
│   │   │   ├── ProfileScreen.styles.ts
│   │   │   └── RecipesScreen.styles.ts
│   │   ├── onboarding/
│   │   │   ├── AllergiesScreen.styles.ts
│   │   │   ├── CompletionScreen.styles.ts
│   │   │   ├── CuisinesScreen.styles.ts
│   │   │   ├── DietsScreen.styles.ts
│   │   │   └── RecipesScreen.styles.ts
│   │   └── typography.ts
│   └── types/
├── package.json
└── tsconfig.json
```

## Features

### Authentication
- Landing page with login/signup options
- Email/password login with validation
- Social login options (Google, Apple)
- Account creation flow
- Loading states and transitions

### Onboarding
- Multi-step preference setup:
  - Cuisine preferences
  - Dietary restrictions
  - Recipe types
  - Allergies
- Progress tracking
- Preference saving

### Main App
- Bottom tab navigation with:
  - Home: Featured recipes and recommendations
  - Explore: Browse and search recipes
  - Recipes: Saved and favorite recipes
  - Profile: User settings and preferences
- Recipe browsing and search
- Newsletter subscription
- Social media integration

## Dependencies

- React Native
- Expo
- React Navigation
- MongoDB (backend)
- Express.js (backend)
