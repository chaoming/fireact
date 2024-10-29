# Fireact

Fireact is a React web application built with TypeScript, TailwindCSS, and Firebase Authentication. This project provides user sign-up, sign-in, and password reset functionalities, along with a user dashboard.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Creating config.json](#creating-configjson)
- [Firebase Setup](#firebase-setup)
- [Build Process](#build-process)
- [Running the Application](#running-the-application)
- [Deploying to Firebase](#deploying-to-firebase)
- [Customizing the Logo](#customizing-the-logo)
- [Internationalization (i18n)](#internationalization-i18n)

## Prerequisites
- Node.js (v14 or later)
- npm (Node Package Manager)
- Firebase account

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fireact.git
   cd fireact
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Creating config.json
Create a `config.json` file in the `src` directory with the following structure:

```json
{
  "firebase": {
    "apiKey": "YOUR_API_KEY",
    "authDomain": "YOUR_AUTH_DOMAIN",
    "projectId": "YOUR_PROJECT_ID",
    "storageBucket": "YOUR_STORAGE_BUCKET",
    "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
    "appId": "YOUR_APP_ID"
  },
  "socialLogin": {
    "google": true,
    "microsoft": false,
    "facebook": false,
    "apple": false,
    "github": false,
    "twitter": false,
    "yahoo": false
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

Replace the placeholders with your Firebase project credentials. You can find these in your Firebase console under Project Settings.

### Controlling Sign-In Methods
In the `socialLogin` section of the `config.json` file, you can enable or disable specific sign-in methods by setting their values to `true` or `false`. For example, to enable only Google sign-in, set the configuration as follows:

```json
"socialLogin": {
  "google": true,
  "microsoft": false,
  "facebook": false,
  "apple": false,
  "github": false,
  "twitter": false,
  "yahoo": false
}
```

This allows you to control which sign-in methods are available in your application without needing to modify the code in `SignIn.tsx`.

### Configuring Page Paths
The `pages` section in the `config.json` file centralizes all the application's page paths. This makes it easier to manage and update routes throughout the application. Here's the default configuration with all available pages:

```json
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
```

You can modify these paths according to your needs. The application will automatically use these configured paths for routing and navigation. This centralized approach makes it easy to:
- Change page URLs without modifying multiple components
- Maintain consistency in navigation throughout the application
- Add new pages by simply adding them to the config

## Internationalization (i18n)

The application supports multiple languages through React-i18next. Language files are stored in `src/i18n/locales/` with each language having its own file (e.g., `en.ts`, `zh.ts`).

### Adding a New Language

1. Create a new file in `src/i18n/locales/` for your language (e.g., `ja.ts` for Japanese)
2. Copy the structure from an existing language file (e.g., `en.ts`)
3. Translate all the labels to your new language
4. Add the language name in its native form as the first entry:
   ```typescript
   export default {
     "languageName": "日本語", // Native name of the language
     // ... rest of the translations
   }
   ```
5. Import and add the new language in `App.tsx`:
   ```typescript
   import ja from './i18n/locales/ja';

   // In the i18n.init configuration:
   resources: {
     en: {
       translation: en
     },
     zh: {
       translation: zh
     },
     ja: {
       translation: ja
     }
   }
   ```

The language switcher will automatically display the new language option.

### Adding New Labels

To add new labels to the application:

1. Add the new label to ALL language files in `src/i18n/locales/`:
   ```typescript
   // In en.ts
   export default {
     "languageName": "English",
     "myNewLabel": "My New Label",
     // ... existing labels
   }

   // In zh.ts
   export default {
     "languageName": "中文",
     "myNewLabel": "我的新标签",
     // ... existing labels
   }

   // Add to all other language files
   ```

2. Use the new label in your components with the `useTranslation` hook:
   ```typescript
   import { useTranslation } from 'react-i18next';

   function MyComponent() {
     const { t } = useTranslation();
     return <div>{t('myNewLabel')}</div>;
   }
   ```

Important notes:
- Always add new labels to ALL language files to avoid missing translations
- Use descriptive keys that reflect the content
- Keep translations organized in a similar order across all language files
- The language switcher uses the "languageName" key to display language options in their native form

### Customizing the Logo
The application's logo is centrally managed in the `App.tsx` file, making it easy to replace or modify. The Logo component is passed as a prop to both the authenticated and public layouts, which means you only need to update it in one place to change it throughout the application.

To replace the logo:

1. Create your custom logo component in `src/components/Logo.tsx`, or modify the existing one. The component should accept a className prop for styling:
   ```tsx
   interface LogoProps {
     className?: string;
   }

   export default function Logo({ className }: LogoProps) {
     return (
       // Your custom logo implementation
     );
   }
   ```

2. The logo is rendered in two different sizes:
   - In the authenticated layout (top navbar): 40x40 pixels (w-10 h-10)
   - In the public layout (sign-in/sign-up pages): 80x80 pixels (w-20 h-20)

3. These sizes are configured in `App.tsx`:
   ```tsx
   <AuthenticatedLayout 
     desktopMenuItems={<DesktopMenuItems />}
     mobileMenuItems={<MobileMenuItems />}
     logo={<Logo className="w-10 h-10" />}
   />

   <PublicLayout logo={<Logo className="w-20 h-20" />} />
   ```

You can adjust these sizes by modifying the className props in `App.tsx`. The sizing follows TailwindCSS conventions.

## Firebase Setup
1. Initialize Firebase in your project:
   - Install Firebase CLI if you haven't already:
     ```bash
     npm install -g firebase-tools
     ```

2. Log in to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init
   ```
   - Select Firestore and Hosting.
   - When prompted for the public directory, specify `dist` to ensure Firebase deploys the correct folder.
   - Follow the prompts to set up your project.

4. Create the Firestore rules file (`firestore.rules`) and set the rules to allow authenticated users to access their own documents.

## Build Process
Before deploying to Firebase, you need to build the application. Use the following command to create a production build:

```bash
npm run build
```

This will generate the necessary files in the `dist` folder, which will be used for deployment.

## Running the Application
To run the application locally, use:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

## Deploying to Firebase
To deploy your application to Firebase Hosting, use:
```bash
firebase deploy
```

This will upload your application to Firebase and make it accessible via the provided hosting URL.

## License
This project is open source and available under the MIT License.
