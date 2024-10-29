import { User } from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc, Firestore } from 'firebase/firestore';

export async function saveUserToFirestore(user: User, displayName: string, db: Firestore) {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    await setDoc(userRef, {
      create_time: userDoc.exists() && userDoc.data()?.create_time ? userDoc.data().create_time : serverTimestamp(),
      display_name: displayName,
      avatar_url: user.photoURL,
    }, { merge: true });
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
    throw error;
  }
}
