# @fireact/core

Core components and utilities for Fireact applications.

## Installation

```bash
npm install @fireact/core
```

## Setup

1. Install the required peer dependencies:

```bash
npm install firebase react-router-dom i18next react-i18next @headlessui/react @heroicons/react tailwindcss
```

2. Set up Tailwind CSS:

```bash
npx tailwindcss init
```

Update your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@fireact/core/dist/**/*.{js,mjs}" // Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add Tailwind directives to your CSS:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Create a config.json file in your src directory:

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
  "socialLogin": {
    "google": true,    // Enable/disable Google sign-in
    "microsoft": false, // Enable/disable Microsoft sign-in
    "facebook": false,  // Enable/disable Facebook sign-in
    "apple": false,    // Enable/disable Apple sign-in
    "github": false,   // Enable/disable GitHub sign-in
    "twitter": false,  // Enable/disable Twitter sign-in
    "yahoo": false     // Enable/disable Yahoo sign-in
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
  }
}
```

### Social Login Configuration

To enable or disable social login providers:

1. Set the corresponding provider to `true` in the `socialLogin` section of your config.json
2. Configure the provider in your Firebase Console:
   - Go to Authentication > Sign-in method
   - Enable the providers you want to use
   - Configure the OAuth settings for each provider
   - Add the authorized domains

For example, to enable Google and GitHub authentication:
```json
{
  "socialLogin": {
    "google": true,
    "github": true,
    "microsoft": false,
    "facebook": false,
    "apple": false,
    "twitter": false,
    "yahoo": false
  }
}
```

The SignIn component will automatically display the enabled social login buttons based on your configuration.

4. Create an App.tsx file in your project:

```tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
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
} from '@fireact/core';
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
      en: { translation: en },
      zh: { translation: zh }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Initialize Firebase with your config
const app = initializeApp(config.firebase);

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

5. Set up i18n:

Create a directory structure in your project:
```
src/
  i18n/
    locales/
      en.ts
      zh.ts
```

Download the language files from:
https://github.com/chaoming/fireact/tree/main/src/i18n/locales

The i18n initialization is handled directly in the App.tsx file, where the language resources are imported and configured.

6. Create index.css with Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

7. Create main.tsx:

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

## Available Components

- Avatar - User avatar display
- ChangePassword - Password change form
- Dashboard - User dashboard
- DeleteAccount - Account deletion interface
- DesktopMenuItems - Desktop navigation menu
- EditEmail - Email editing form
- EditName - Name editing form
- LanguageSwitcher - Language selection component
- Logo - Application logo
- Message - Message display component
- MobileMenuItems - Mobile navigation menu
- PrivateRoute - Protected route component
- Profile - User profile component
- ResetPassword - Password reset form
- SignIn - Sign in form
- SignUp - Sign up form

## Contexts

- AuthContext - Firebase authentication context
- ConfigProvider - Application configuration context
- LoadingContext - Loading state management

## Layouts

- AuthenticatedLayout - Layout for authenticated pages
- PublicLayout - Layout for public pages

## Utils

- userUtils - User-related utility functions

## License

MIT
