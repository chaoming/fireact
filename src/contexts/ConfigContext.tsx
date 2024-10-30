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

interface ConfigProviderProps {
  config: {
    firebase: ConfigContextType['firebase'];
    socialLogin: ConfigContextType['socialLogin'];
    pages: ConfigContextType['pages'];
  };
  children: ReactNode;
}

export function ConfigProvider({ config, children }: ConfigProviderProps) {
  // Initialize Firebase
  const app = initializeApp(config.firebase);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const value: ConfigContextType = {
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
