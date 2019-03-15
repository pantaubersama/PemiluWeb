importScripts('https://www.gstatic.com/firebasejs/5.8.6/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.8.6/firebase-messaging.js')

// Initialize Firebase
const config = {
  apiKey: "AIzaSyA59b03CTy5nOfRW4Ld_wb5Fl8ZrEoaThw",
  authDomain: "pantau-bersama-staging.firebaseapp.com",
  databaseURL: "https://pantau-bersama-staging.firebaseio.com",
  projectId: "pantau-bersama-staging",
  storageBucket: "pantau-bersama-staging.appspot.com",
  messagingSenderId: "1007962864024"
};
firebase.initializeApp(config)

const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
});
