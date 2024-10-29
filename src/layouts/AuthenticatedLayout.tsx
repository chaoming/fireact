import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Logo from '../components/Logo';
import Avatar from '../components/Avatar';
import { Outlet } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { UserData } from '../components/Dashboard';
import PrivateRoute from '../components/PrivateRoute';

export default function AuthenticatedLayout() {
  const { signout, currentUser } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data() as UserData;
            setUserData(data);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    }

    fetchUserData();
  }, [currentUser]);

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
      {/* Top Navigation */}
      <nav className="bg-gray-900 shadow w-full">
        <div className="px-4">
          <div className="flex justify-between h-16 w-full">
            <div className="flex px-2 lg:px-0">
              <div className="flex items-center">
                <div className="flex items-center flex-shrink-0">
                  <Logo className="w-10 h-10" />
                  <span className="ml-2 text-xl font-bold text-white">Fireact</span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="ml-4 p-2 rounded-md text-gray-400 hover:text-gray-200 focus:outline-none hidden lg:block"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={isSidebarOpen ? "M4 6h16M4 12h16M4 18h16" : "M4 6h16M4 12h16M4 18h16"}
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile menu and language selector */}
            <div className="flex items-center space-x-2 lg:hidden">
              <LanguageSwitcher />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-200 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>

            {/* Desktop nav items */}
            <div className="hidden lg:flex lg:items-center lg:space-x-4 pr-4">
              <LanguageSwitcher />
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <Avatar userData={userData} />
                  <span className="text-gray-400 text-sm">{userData?.display_name}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {t('myProfile')}
                      </Link>
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          handleSignOut();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        {t('signout')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:hidden bg-gray-900`}>
            {/* Divider */}
            <div className="border-t border-gray-700"></div>
            
            {/* Menu Items */}
            <div className="pt-2 pb-3">
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
              <Link
                to="/profile"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/profile'
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'text-gray-200 hover:bg-gray-700'
                }`}
              >
                {t('myProfile')}
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-3 py-2 text-base font-medium text-gray-200 hover:bg-gray-700 rounded-md"
              >
                {t('signout')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar - hidden on mobile, visible on desktop */}
        <div
          className={`${
            isSidebarOpen ? 'w-64' : 'w-20'
          } transition-all duration-300 ease-in-out transform hidden lg:block
          fixed lg:relative lg:translate-x-0 z-30 bg-white shadow min-vh100`}
        >
          <nav className="mt-5 px-2">
            <Link
              to="/dashboard"
              className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                location.pathname === '/dashboard'
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <svg
                className={`${isSidebarOpen ? 'mr-4' : 'mx-auto'} h-6 w-6 ${
                  location.pathname === '/dashboard'
                    ? 'text-indigo-600'
                    : 'text-gray-400 group-hover:text-gray-500'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {isSidebarOpen && <span>{t('dashboard')}</span>}
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-vh100 transition-all duration-300 ease-in-out">
          <main className="py-6 px-4 sm:px-6 lg:px-8">
            <PrivateRoute>
              <Outlet />
            </PrivateRoute>
          </main>
        </div>
      </div>
    </div>
  );
}
