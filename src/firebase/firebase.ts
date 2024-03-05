import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArDHMHhK8cLV1KE1qvORtcmJw2P3EaiDc",
  authDomain: "testproject-f9268.firebaseapp.com",
  projectId: "testproject-f9268",
  storageBucket: "testproject-f9268.appspot.com",
  messagingSenderId: "64491408716",
  appId: "1:64491408716:web:cad7a3d476bd6b660993e9",
};

/* const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
 */

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Methods for Auth Page
// Login

export const logIn = (options: Record<string, string>) => {
  return signInWithEmailAndPassword(auth, options.email, options.password);
};

// SignUp with setting up an USER NAME

export const signUp = async (options: Record<string, string>) => {
  try {
    await createUserWithEmailAndPassword(auth, options.email, options.password1);
    await updateProfile(auth.currentUser!, { displayName: options.firstName + " " + options.lastName });
    return new Promise<void>((resolve) => resolve());
  } catch (err) {
    return new Promise<void>((_, reject) => reject(err));
  }
};

// Forgot Password

export const forgotpassword = (options: Record<string, string>) => {
  return sendPasswordResetEmail(auth, options.email);
};

// Reset Password (if user not logged-in - returning Error with error code to display the toast notification)

export const resetPassword = (options: Record<string, string>) => {
  if (auth.currentUser) {
    return updatePassword(auth.currentUser, options.password1);
  } else {
    return new Promise<void>((_, reject) => reject({ code: "You need log-in first!" }));
  }
};

// Set UserName

export const setUserName = (options: Record<string, string>) => {
  return updateProfile(auth.currentUser!, { displayName: options.userName });
};

// Set Avatar

export const setUserAvatar = ({ userAvatar }: { userAvatar: string }) => {
  return updateProfile(auth.currentUser!, { photoURL: userAvatar });
};
