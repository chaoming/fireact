import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useLoading } from '../contexts/LoadingContext';
import { User, updatePassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Message from './Message';

const ChangePassword: React.FC = () => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser as User | null;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setLoading: setGlobalLoading } = useLoading();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: t('passwordMismatch') });
      return;
    }

    if (currentUser) {
      setIsSubmitting(true);
      setGlobalLoading(true);
      setMessage(null);
      try {
        await updatePassword(currentUser, password);
        setMessage({ type: 'success', text: t('passwordUpdateSuccess') });
        setTimeout(() => {
          navigate('/profile');
        }, 1500);
      } catch (error) {
        console.error('Error updating password:', error);
        if (error instanceof FirebaseError) {
          if (error.code === 'auth/requires-recent-login') {
            setMessage({ type: 'error', text: t('reAuthenticationRequired') });
          } else {
            setMessage({ type: 'error', text: t('passwordUpdateError') });
          }
        } else {
          setMessage({ type: 'error', text: t('passwordUpdateError') });
        }
        setIsSubmitting(false);
      } finally {
        setGlobalLoading(false);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">{t('changePassword')}</h2>
          {message && (
            <div className="mt-4">
              <Message type={message.type}>
                {message.text}
              </Message>
            </div>
          )}
        </div>
        <div className="border-t border-gray-200">
          <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('newPassword')}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                  disabled={isSubmitting}
                  minLength={6}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('confirmPassword')}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                  disabled={isSubmitting}
                  minLength={6}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed inline-flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('save')}
                  </>
                ) : (
                  t('save')
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
