import { setCookie } from "cookies-next";
import firebase from "firebase/app";
import "firebase/messaging";
import { firebaseConfig } from "./constants";
import { deviceToken } from "./services";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

let messaging: firebase.messaging.Messaging;

if (typeof window !== "undefined") {
  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
  }
}

export const getMessagingToken = async () => {
  let currentToken = "";
  if (!messaging) return;
  try {
    currentToken = await messaging.getToken({
      vapidKey: process.env.REACT_APP_FIREBASE_FCM_VAPID_KEY,
    });
    setCookie("device_token", currentToken);
    if (currentToken) await deviceToken(currentToken);
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }
  return currentToken;
};

export const onMessageListener = () => {
  return new Promise((resolve) => {
    messaging?.onMessage((payload) => {
      resolve(payload);
    });
  });
};
