// Firebase Service Worker for background messages
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAGrLe_SQavDRgZJvTaSdHKJ8TsUToYm78",
  authDomain: "touriestsafety-d2064.firebaseapp.com",
  projectId: "touriestsafety-d2064",
  messagingSenderId: "1077257855101",
  appId: "1:1077257855101:web:fffe75f712590ec6711114",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message:", payload);
  const { title, body } = payload.notification;
  return self.registration.showNotification(title, {
    body,
    icon: "/logo192.png", // optional
  });
});
