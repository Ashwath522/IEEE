import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkUXeTPSuFIbXmEmiOouFxGbnElWZgPJM",
  authDomain: "ieee-ic2st.firebaseapp.com",
  projectId: "ieee-ic2st",
  storageBucket: "ieee-ic2st.firebasestorage.app",
  messagingSenderId: "657730235488",
  appId: "1:657730235488:web:c70b160bfab78ad1d0e705",
  measurementId: "G-FW8GERZC2Z",
  databaseURL: "https://ieee-ic2st-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { db, analytics };
