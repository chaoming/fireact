# Fireact Core Demo

This is a demo application showcasing the [@fireact/core](https://github.com/chaoming/fireact/tree/main/core) package. It demonstrates how to build a full-featured React application with Firebase authentication, social logins, and internationalization support.

## Features

- Firebase Authentication
- Social Login Support (Google, Microsoft, Facebook, Apple, GitHub, Twitter, Yahoo)
- Internationalization (English and Chinese)
- Protected Routes
- User Profile Management
- Responsive Design with Tailwind CSS

## Project Structure

```
src/
  ├── config.json         # Application configuration
  ├── App.tsx            # Main application component
  ├── index.css          # Global styles
  └── i18n/
      └── locales/       # Translation files
          ├── en.ts      # English translations
          └── zh.ts      # Chinese translations
```

## Configuration

The application is configured through `src/config.json`:

- `firebase`: Firebase configuration (apiKey, authDomain, etc.)
- `socialLogin`: Enable/disable different social login providers
- `pages`: Application route paths

## Internationalization

Language support is implemented using i18next and configured in `App.tsx`. The application supports:
- English (en)
- Chinese (zh)

Translation files are stored in `src/i18n/locales/`.

## Available Routes

- `/signin` - Sign in page with email/password and social login options
- `/signup` - New user registration
- `/reset-password` - Password reset functionality
- `/dashboard` - Main dashboard (protected route)
- `/profile` - User profile management
- `/edit-name` - Update display name
- `/edit-email` - Update email
- `/change-password` - Change password
- `/delete-account` - Account deletion

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Firebase Setup

This demo uses Firebase for authentication and database services. The demo is configured to use a development Firebase project. To use your own Firebase project:

1. Create a new project in the [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and configure the desired sign-in methods
3. Update `src/config.json` with your Firebase configuration
4. Update the `socialLogin` settings in `config.json` to match your enabled providers

## Social Login Configuration

To enable social login providers:

1. Configure the providers in your Firebase Console (Authentication > Sign-in method)
2. Enable the desired providers in `src/config.json`:
```json
{
  "socialLogin": {
    "google": true,
    "microsoft": false,
    "facebook": false,
    "apple": false,
    "github": false,
    "twitter": false,
    "yahoo": false
  }
}
```

## Development

This demo app is built with:
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Firebase
- i18next

The UI components and authentication logic are provided by the @fireact/core package, demonstrating how to integrate and use the package in a real application.

## Learn More

For more information about the @fireact/core package and its features, visit the [package documentation](https://github.com/chaoming/fireact/tree/main/core).
