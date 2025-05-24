import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage"; // If you need storage

// Define placeholder values to check against
const PLACEHOLDER_API_KEY = "YOUR_API_KEY";
const PLACEHOLDER_AUTH_DOMAIN = "YOUR_AUTH_DOMAIN";
const PLACEHOLDER_PROJECT_ID = "YOUR_PROJECT_ID";
const PLACEHOLDER_STORAGE_BUCKET = "YOUR_STORAGE_BUCKET";
const PLACEHOLDER_MESSAGING_SENDER_ID = "YOUR_MESSAGING_SENDER_ID";
const PLACEHOLDER_APP_ID = "YOUR_APP_ID";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || PLACEHOLDER_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || PLACEHOLDER_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || PLACEHOLDER_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || PLACEHOLDER_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || PLACEHOLDER_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || PLACEHOLDER_APP_ID,
};

// Check if any configuration values are still placeholders
if (
  firebaseConfig.apiKey === PLACEHOLDER_API_KEY ||
  firebaseConfig.authDomain === PLACEHOLDER_AUTH_DOMAIN ||
  firebaseConfig.projectId === PLACEHOLDER_PROJECT_ID ||
  firebaseConfig.storageBucket === PLACEHOLDER_STORAGE_BUCKET ||
  firebaseConfig.messagingSenderId === PLACEHOLDER_MESSAGING_SENDER_ID ||
  firebaseConfig.appId === PLACEHOLDER_APP_ID
) {
  console.warn(`
**********************************************************************
** WARNING: FIREBASE CONFIGURATION IS USING PLACEHOLDER VALUES! **
**                                                                  **
** Please ensure you have set up your Firebase project credentials  **
** correctly in your environment variables (e.g., .env.local) or  **
** by replacing the placeholder strings directly in               **
** src/lib/firebase.ts.                                           **
**                                                                  **
** Using placeholder values WILL CAUSE Firebase to fail and can   **
** lead to 'Internal Server Error' or other runtime issues.       **
**                                                                  **
** Current API Key: ${firebaseConfig.apiKey}                        **
** Current Project ID: ${firebaseConfig.projectId}                  **
**********************************************************************
  `);
}

// Initialize Firebase
let app;
let auth;
let db;
// let storage; // Uncomment if you need storage

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  // storage = getStorage(app); // Uncomment if you need storage
} catch (error) {
  console.error(`
**********************************************************************
** FATAL: FAILED TO INITIALIZE FIREBASE!                            **
**                                                                  **
** This is very likely due to incorrect Firebase project            **
** configuration. Please double-check your credentials in         **
** src/lib/firebase.ts or your environment variables.             **
**                                                                  **
** Error details: ${error}                                          **
**********************************************************************
  `);
  // Depending on your app's needs, you might want to re-throw the error
  // or set these to null/undefined to be handled elsewhere.
  // For now, they will remain potentially uninitialized if an error occurs.
}

export { app, auth, db /*, storage */ };
