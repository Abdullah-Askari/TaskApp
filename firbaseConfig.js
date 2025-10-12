import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBYVbkrfZtW5ORG59qU_7FCPi5c-c8ZPBc",
  authDomain: "mobileapp-ba01d.firebaseapp.com",
  projectId: "mobileapp-ba01d",
  storageBucket: "mobileapp-ba01d.firebasestorage.app",
  messagingSenderId: "974429787689",
  appId: "1:974429787689:web:2eea80a99195d8fc71ee38",
  measurementId: "G-JCGK642HD3"
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});