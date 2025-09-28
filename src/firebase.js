import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAGrLe_SQavDRgZJvTaSdHKJ8TsUToYm78",
  authDomain: "touriestsafety-d2064.firebaseapp.com",
  projectId: "touriestsafety-d2064",
  storageBucket: "touriestsafety-d2064.firebasestorage.app",
  messagingSenderId: "1077257855101",
  appId: "1:1077257855101:web:fffe75f712590ec6711114",
  measurementId: "G-4NEBCBCZ2R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request notification permission and get FCM token
export const requestForToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BKs7igMKMwockn1jj3bm7E5AQNc0kVMv21k6AIZXwzTJoTssJtBJA6h5RX2fiUgDyzQaxwzfD1yKJxe_aDwPJcI"
    });

    if (token) {
      // Send token to backend
      await axios.post("http://localhost:3000/api/v2/save-token", { token });
      console.log("Token saved to database:", token);
      return token;
    } else {
      console.warn("No registration token available.");
      return null;
    }
  } catch (err) {
    console.error("Error getting token", err);
    return null;
  }
};

// Foreground message listener (subscription style)
export const onMessageListener = (callback) => {
  const unsubscribe = onMessage(messaging, (payload) => {
    callback(payload); // called for every message
  });
  return unsubscribe; // allows cleanup
};
