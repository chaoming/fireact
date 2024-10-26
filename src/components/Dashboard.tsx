import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { t } = useTranslation();

  return (
    <AuthenticatedLayout>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">{t('userProfile')}</h2>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{t('email')}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {currentUser?.email}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{t('userId')}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 break-all">
                  {currentUser?.uid}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{t('emailVerified')}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {currentUser?.emailVerified ? t('yes') : t('no')}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
