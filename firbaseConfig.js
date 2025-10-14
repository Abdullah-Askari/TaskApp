// firebaseConfig.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import {
  initializeFirestore
} from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYVbkrfZtW5ORG59qU_7FCPi5c-c8ZPBc",
  authDomain: "mobileapp-ba01d.firebaseapp.com",
  projectId: "mobileapp-ba01d",
  storageBucket: "mobileapp-ba01d.firebasestorage.app",
  messagingSenderId: "974429787689",
  appId: "1:974429787689:web:2eea80a99195d8fc71ee38",
  measurementId: "G-JCGK642HD3"
};

// ✅ Initialize Firebase app only if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Initialize Firestore (use long polling for React Native/Expo)
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

// ✅ Initialize Auth safely (avoid "already initialized" error)
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}

export { app, auth };
