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
