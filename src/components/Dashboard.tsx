import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Dashboard() {
  const { currentUser, signout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  async function handleSignOut() {
    try {
      await signout();
      navigate('/');
    } catch (error) {
      console.error('Failed to sign out');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">{t('dashboard')}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <button
                onClick={handleSignOut}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {t('signout')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">{t('userProfile')}</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">{t('email')}:</span>{' '}
                {currentUser?.email}
              </p>
              <p>
                <span className="font-medium">{t('userId')}:</span>{' '}
                {currentUser?.uid}
              </p>
              <p>
                <span className="font-medium">{t('emailVerified')}:</span>{' '}
                {currentUser?.emailVerified ? t('yes') : t('no')}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
