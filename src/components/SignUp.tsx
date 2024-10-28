import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PublicLayout from '../layouts/PublicLayout';
import { auth } from '../firebase'; // Importing auth from firebase.ts
import { saveUserToFirestore } from '../utils/userUtils'; // Import the utility function
import config from '../config.json';

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      setError('');
      const userCredential = await signup(email, password, fullName);
      // Save user to Firestore using the new utility function
      await saveUserToFirestore(userCredential.user, fullName);
      navigate('/dashboard');
    } catch (err) {
      setError(t('failedSignUp'));
    } finally {
      setLoading(false); // Set loading to false after the process
    }
  }

  return (
    <PublicLayout loading={loading}>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t('createAccount')}
        </h2>
      </div>
      {error && <div className="text-red-500 text-center mt-2">{error}</div>}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              {t('fullName')}
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t('password')}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {t('createAccount')}
          </button>
        </div>
      </form>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          {t('alreadyHaveAccount')}{' '}
          <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
            {t('signin')}
          </Link>
        </p>
      </div>
    </PublicLayout>
  );
}
