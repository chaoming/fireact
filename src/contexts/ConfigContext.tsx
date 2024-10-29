import { createContext, useContext, ReactNode } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

interface ConfigContextType {
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
  socialLogin: {
    google: boolean;
    microsoft: boolean;
    facebook: boolean;
    apple: boolean;
    github: boolean;
    twitter: boolean;
    yahoo: boolean;
  };
  pages: Record<string, string>;
  auth: Auth;
  db: Firestore;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ config, children }: { config: Omit<ConfigContextType, 'auth' | 'db'>, children: ReactNode }) {
  // Initialize Firebase
  const app = initializeApp(config.firebase);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const value = {
    ...config,
    auth,
    db
  };

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
