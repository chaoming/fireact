import { User } from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export async function saveUserToFirestore(user: User, displayName: string) {
  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);
  
  await setDoc(userRef, {
    create_time: userDoc.exists() && userDoc.data()?.create_time ? userDoc.data().create_time : serverTimestamp(),
    display_name: displayName,
    avatar_url: user.photoURL,
  }, { merge: true }); // Use merge to avoid overwriting existing data
}
