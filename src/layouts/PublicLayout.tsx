import { ReactNode } from 'react';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Logo from '../components/Logo';

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <Logo className="w-20 h-20" />
          <div className="absolute top-4 right-4">
            <LanguageSwitcher />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}