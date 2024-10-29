import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export interface UserData {
  display_name: string;
  create_time: any;
  email: string;
  avatar_url: string | null;
}

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { t } = useTranslation();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data() as UserData;
            console.log('Fetched user data:', data);
            setUserData(data);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setLoading(false);
    }

    fetchUserData();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
        <h1 className="text-2xl font-medium text-gray-900">
          {userData?.display_name ? t('welcomeBack', { name: userData.display_name }) : t('welcome')}
        </h1>
      </div>
    </div>
  );
}
