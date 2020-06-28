import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDJVFodlAl_T8trmOo9oRFOsoJsS6b5Ddw",
  databaseURL: "https://mobile-phone-data.firebaseio.com",
  projectId: "mobile-phone-data",
};

firebase.initializeApp(config);

export const db = firebase.firestore();
