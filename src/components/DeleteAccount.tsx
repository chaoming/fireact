import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useLoading } from '../contexts/LoadingContext';
import { User, deleteUser } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Message from './Message';
import { useConfig } from '../contexts/ConfigContext';

const DeleteAccount: React.FC = () => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser as User | null;
  const [confirmUUID, setConfirmUUID] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setLoading: setGlobalLoading } = useLoading();
  const navigate = useNavigate();
  const { pages } = useConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    if (confirmUUID !== currentUser.uid) {
      setMessage({ type: 'error', text: t('uuidMismatch') });
      return;
    }

    setIsSubmitting(true);
    setGlobalLoading(true);
    setMessage(null);

    try {
      await deleteUser(currentUser);
      setMessage({ 
        type: 'success', 
        text: t('accountDeleted')
      });
      setTimeout(() => {
        navigate(pages.home);
      }, 2000);
    } catch (error) {
      console.error('Error deleting account:', error);
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/requires-recent-login') {
          setMessage({ type: 'error', text: t('reAuthenticationRequired') });
        } else {
          setMessage({ type: 'error', text: t('accountDeletionError') });
        }
      } else {
        setMessage({ type: 'error', text: t('accountDeletionError') });
      }
      setIsSubmitting(false);
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">{t('deleteAccount')}</h2>
          <div className="mt-2">
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{t('warning')}</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{t('deleteAccountWarning')}</p>
                    <p className="mt-2">{t('confirmDeleteAccount')}</p>
                    <p className="mt-2 font-mono bg-red-100 p-2 rounded">{currentUser?.uid}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                <label htmlFor="uuid" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('confirmUUID')}
                </label>
                <input
                  type="text"
                  name="uuid"
                  id="uuid"
                  value={confirmUUID}
                  onChange={(e) => setConfirmUUID(e.target.value)}
                  className="block w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate(pages.profile)}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="bg-red-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed inline-flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('deleteAccount')}
                  </>
                ) : (
                  t('deleteAccount')
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
