import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkUXeTPSuFIbXmEmiOouFxGbnElWZgPJM",
  authDomain: "ieee-ic2st.firebaseapp.com",
  projectId: "ieee-ic2st",
  storageBucket: "ieee-ic2st.firebasestorage.app",
  messagingSenderId: "657730235488",
  appId: "1:657730235488:web:c70b160bfab78ad1d0e705",
  measurementId: "G-FW8GERZC2Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { db, analytics };
