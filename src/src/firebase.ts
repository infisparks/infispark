// src/firebase.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0G0CULNoh32uSgK3YYsV_rFzPXJOf-7E",
  authDomain: "infispark-1f305.firebaseapp.com",
  databaseURL: "https://infispark-1f305-default-rtdb.firebaseio.com",
  projectId: "infispark-1f305",
  storageBucket: "infispark-1f305.firebasestorage.app",
  messagingSenderId: "633143367000",
  appId: "1:633143367000:web:31721d8795eb8b82e5012d",
  measurementId: "G-PX7MXMFER1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
