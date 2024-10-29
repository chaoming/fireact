import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export default function MobileMenuItems() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <Link
      to="/dashboard"
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        location.pathname === '/dashboard'
          ? 'bg-indigo-100 text-indigo-600'
          : 'text-gray-200 hover:bg-gray-700'
      }`}
    >
      {t('dashboard')}
    </Link>
  );
}
