import { User } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export async function saveUserToFirestore(user: User, displayName: string) {
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    create_time: serverTimestamp(),
    display_name: displayName,
    email: user.email,
    avatar_url: user.photoURL,
  }, { merge: true }); // Use merge to avoid overwriting existing data
}
