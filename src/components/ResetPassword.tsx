import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { auth } = useAuth();

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      setError('');
      await sendPasswordResetEmail(auth, email);
      setMessage(t('passwordResetEmailSent')); // Use translation for message
    } catch (err) {
      setError(t('failedToSendResetEmail')); // Use translation for error
    } finally {
      setLoading(false); // Set loading to false after the process
    }
  }

  return (
    <PublicLayout loading={loading}>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t('resetPassword')}
        </h2>
      </div>
      {message && <div className="text-green-500 text-center mt-2">{message}</div>}
      {error && <div className="text-red-500 text-center mt-2">{error}</div>}
      <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
        <div className="space-y-4">
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
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {t('sendResetEmail')}
          </button>
        </div>
      </form>
      <div className="text-center mt-4">
        <button
          onClick={() => navigate('/signin')}
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          {t('backToSignIn')}
        </button>
      </div>
    </PublicLayout>
  );
}
