import { initializeApp } from '@firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // Import GoogleAuthProvider
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCbqK_0xWLQZ7gPbI5YMAh1z1KzcVQSygQ",
  authDomain: "jobsintech-b3d1c.firebaseapp.com",
  projectId: "jobsintech-b3d1c",
  storageBucket: "jobsintech-b3d1c.firebasestorage.app",
  messagingSenderId: "946004317553",
  appId: "1:946004317553:web:739c952935b482bbc512d0",
  measurementId: "G-MYXRYH0DBJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize GoogleAuthProvider
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const idToken = await user.getIdToken(); // 🔹 Get Firebase ID token

    return { success: true, user, idToken }; // 🔹 Return token
  } catch (error) {
    console.error(error);
    return { success: false, error };
  }
};

export { app, auth, db };


