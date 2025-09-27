import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your Firebase Config (from Firebase console)
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
// const analytics = getAnalytics(app);
const messaging = getMessaging(app);

// Request notification permission and get token
export const requestForToken = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: "BKs7igMKMwockn1jj3bm7E5AQNc0kVMv21k6AIZXwzTJoTssJtBJA6h5RX2fiUgDyzQaxwzfD1yKJxe_aDwPJcI" });
    if (token) {
      console.log("FCM Token:", token);
      console.log("Token is genrated ",token)
      return token;
    } else {
      console.warn("No registration token available.");
    }
  } catch (err) {
    console.error("Error getting token", err);
  }
};

// Foreground message listener
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
