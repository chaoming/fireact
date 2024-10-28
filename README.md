# Fireact

Fireact is a React web application built with TypeScript, TailwindCSS, and Firebase Authentication. This project provides user sign-up, sign-in, and password reset functionalities, along with a user dashboard.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Creating config.json](#creating-configjson)
- [Firebase Setup](#firebase-setup)
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
  }
}
```

Replace the placeholders with your Firebase project credentials. You can find these in your Firebase console under Project Settings.

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
   - Follow the prompts to set up your project.

4. Create the Firestore rules file (`firestore.rules`) and set the rules to allow authenticated users to access their own documents.

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
