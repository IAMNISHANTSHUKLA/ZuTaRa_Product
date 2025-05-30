
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage"; // If you need storage

// Your web app's Firebase configuration
// These values are expected to be set in your environment variables (e.g., .env.local)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app;
let auth;
let db;
// let storage; // Uncomment if you need storage

try {
  // Check if any essential configuration values are missing
  if (
    !firebaseConfig.apiKey ||
    !firebaseConfig.authDomain ||
    !firebaseConfig.projectId ||
    // storageBucket is often optional if not using Firebase Storage
    // !firebaseConfig.storageBucket || 
    !firebaseConfig.messagingSenderId ||
    !firebaseConfig.appId
  ) {
    console.error(`
**********************************************************************
** WARNING: FIREBASE CONFIGURATION IS INCOMPLETE!                   **
**                                                                  **
** One or more Firebase environment variables (NEXT_PUBLIC_FIREBASE_*) **
** are not set. Please ensure all required variables are defined in **
** your .env.local file or environment.                             **
**                                                                  **
** This will likely cause Firebase initialization to fail.          **
**                                                                  **
** Missing values for:                                              **
${!firebaseConfig.apiKey ? "- NEXT_PUBLIC_FIREBASE_API_KEY\n" : ""}${!firebaseConfig.authDomain ? "- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN\n" : ""}${!firebaseConfig.projectId ? "- NEXT_PUBLIC_FIREBASE_PROJECT_ID\n" : ""}${!firebaseConfig.messagingSenderId ? "- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID\n" : ""}${!firebaseConfig.appId ? "- NEXT_PUBLIC_FIREBASE_APP_ID\n" : ""}
**********************************************************************
    `);
    // Optionally, throw an error here if you want to halt execution,
    // or let initializeApp fail naturally.
    // throw new Error("Firebase configuration is incomplete. Check environment variables.");
  }

  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  // storage = getStorage(app); // Uncomment if you need storage
} catch (error) {
  console.error(`
**********************************************************************
** FATAL: FAILED TO INITIALIZE FIREBASE!                            **
**                                                                  **
** This could be due to missing or incorrect Firebase project       **
** configuration in your environment variables, or issues with      **
** the Firebase SDKs themselves.                                    **
**                                                                  **
** Please double-check your NEXT_PUBLIC_FIREBASE_* variables.       **
**                                                                  **
** Error details: ${error}                                          **
**********************************************************************
  `);
  // Depending on your app's needs, you might want to re-throw the error
  // or set these to null/undefined to be handled elsewhere.
  // For now, they will remain potentially uninitialized if an error occurs.
}

export { app, auth, db /*, storage */ };
