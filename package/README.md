# @fireact.dev/core

Core components and utilities for Fireact applications.

## Table of Contents
- [Installation](#installation)
- [Project Setup](#project-setup)
  - [Tailwind CSS Configuration](#tailwind-css-configuration)
  - [Firebase Configuration](#firebase-configuration)
  - [Social Login Configuration](#social-login-configuration)
  - [Internationalization Setup](#internationalization-setup)
  - [Application Setup](#application-setup)
- [Firebase Deployment](#firebase-deployment)
- [Components Reference](#components-reference)
- [License](#license)

## Installation

```bash
npm install @fireact.dev/core
```

Install the required peer dependencies:

```bash
npm install firebase react-router-dom i18next react-i18next @headlessui/react@^1.7.15 @heroicons/react tailwindcss i18next-browser-languagedetector
```

Note: Make sure to use @headlessui/react version ^1.7.15 as it's a required peer dependency.

## Project Setup

### Tailwind CSS Configuration

1. Initialize Tailwind:
```bash
npx tailwindcss init
```

2. Update your `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@fireact.dev/core/dist/**/*.{js,mjs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. Add Tailwind directives to your `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Firebase Configuration

Create `src/config.json` with your Firebase configuration:

```json
{
  "firebase": {
    "apiKey": "your-api-key",
    "authDomain": "your-auth-domain",
    "projectId": "your-project-id",
    "storageBucket": "your-storage-bucket",
    "messagingSenderId": "your-messaging-sender-id",
    "appId": "your-app-id"
  },
  "pages": {
    "home": "/",
    "dashboard": "/dashboard",
    "profile": "/profile",
    "editName": "/edit-name",
    "editEmail": "/edit-email",
    "changePassword": "/change-password",
    "deleteAccount": "/delete-account",
    "signIn": "/signin",
    "signUp": "/signup",
    "resetPassword": "/reset-password"
  },
  "socialLogin": {
    "google": false,
    "microsoft": false,
    "facebook": false,
    "apple": false,
    "github": false,
    "twitter": false,
    "yahoo": false
  }
}
```

Note: The ConfigProvider will automatically initialize Firebase using this configuration.

### Social Login Configuration

To enable social login providers:

1. Set the desired providers to `true` in the `socialLogin` section of your config.json
2. Configure each enabled provider in your Firebase Console:
   - Navigate to Authentication > Sign-in method
   - Enable the desired providers
   - Configure OAuth settings
   - Add authorized domains

### Internationalization Setup

1. Create the i18n directory structure:
```
src/
  i18n/
    locales/
      en.ts
      zh.ts
```

2. Download the base language files from:
https://github.com/chaoming/fireact/tree/main/src/i18n/locales

3. Adding or modifying labels:
Each language file (e.g., en.ts) follows this structure:
```typescript
export default {
  email: "Email",
  password: "Password",
  // Add more labels as needed
}
```

4. Adding a new language:
   1. Create a new file in the locales directory (e.g., `fr.ts` for French)
   2. Copy the structure from en.ts
   3. Translate all labels to the new language
   4. Add the language to i18n initialization in App.tsx:

```typescript
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      zh: {
        translation: zh
      },
      fr: {
        translation: fr  // Add your new language here
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
```

5. Using translations in your components:
```typescript
import { useTranslation } from 'react-i18next';

function YourComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('common.title')}</h1>
      <p>{t('common.description')}</p>
    </div>
  );
}
```

### Application Setup

1. Create `src/main.tsx`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

2. Create `src/App.tsx`:

```tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  AuthProvider,
  ConfigProvider,
  LoadingProvider,
  PublicLayout,
  AuthenticatedLayout,
  SignIn,
  SignUp,
  ResetPassword,
  Dashboard,
  Profile,
  EditName,
  EditEmail,
  ChangePassword,
  DeleteAccount,
  DesktopMenuItems,
  MobileMenuItems,
  Logo
} from '@fireact.dev/core';
import config from './config.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './i18n/locales/en';
import zh from './i18n/locales/zh';

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      zh: {
        translation: zh
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

function App() {
  return (
    <Router>
      <ConfigProvider config={config}>
        <AuthProvider>
          <LoadingProvider>
            <Routes>
              <Route element={
                <AuthenticatedLayout 
                  desktopMenuItems={<DesktopMenuItems />}
                  mobileMenuItems={<MobileMenuItems />}
                  logo={<Logo className="w-10 h-10" />}
                />
              }>
                <Route path={config.pages.home} element={<Navigate to={config.pages.dashboard} />} />
                <Route path={config.pages.dashboard} element={<Dashboard />} />
                <Route path={config.pages.profile} element={<Profile />} />
                <Route path={config.pages.editName} element={<EditName />} />
                <Route path={config.pages.editEmail} element={<EditEmail />} />
                <Route path={config.pages.changePassword} element={<ChangePassword />} />
                <Route path={config.pages.deleteAccount} element={<DeleteAccount />} />
              </Route>
              <Route element={<PublicLayout logo={<Logo className="w-20 h-20" />} />}>
                <Route path={config.pages.signIn} element={<SignIn />} />
                <Route path={config.pages.signUp} element={<SignUp />} />
                <Route path={config.pages.resetPassword} element={<ResetPassword />} />
              </Route>
            </Routes>
          </LoadingProvider>
        </AuthProvider>
      </ConfigProvider>
    </Router>
  );
}

export default App;
```

## Firebase Deployment

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project:
```bash
firebase init
```

Select the following options:
- Choose "Hosting" when prompted for features
- Select your Firebase project or create a new one
- Set build directory to 'dist' (for Vite projects)
- Configure as a single-page application: Yes
- Don't overwrite index.html

4. Build and deploy:
```bash
npm run build
firebase deploy
```

Your app will be available at:
- https://your-project-id.web.app
- https://your-project-id.firebaseapp.com

## Components Reference

### Authentication Components
- SignIn - Sign in form
- SignUp - Sign up form
- ResetPassword - Password reset form
- PrivateRoute - Protected route component

### User Management Components
- Profile - User profile component
- EditName - Name editing form
- EditEmail - Email editing form
- ChangePassword - Password change form
- DeleteAccount - Account deletion interface
- Avatar - User avatar display

### Navigation Components
- DesktopMenuItems - Desktop navigation menu
- MobileMenuItems - Mobile navigation menu
- Logo - Application logo
- LanguageSwitcher - Language selection component

### Layout Components
- AuthenticatedLayout - Layout for authenticated pages
- PublicLayout - Layout for public pages
- Message - Message display component
- Dashboard - User dashboard

### Context Providers
- AuthContext - Firebase authentication context
- ConfigProvider - Application configuration context
- LoadingContext - Loading state management

### Utilities
- userUtils - User-related utility functions

## License

MIT
