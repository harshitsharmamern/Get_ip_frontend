
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
let auth;

try {

const firebaseConfig = {
    apiKey: "AIzaSyBSGiSYbKMkcXmZE0nzm5ixsaU-mq_8cqc",
    authDomain: "myyuva-82e8f.firebaseapp.com",
    projectId: "myyuva-82e8f",
    storageBucket: "myyuva-82e8f.appspot.com",
    messagingSenderId: "807676844396",
    appId: "1:807676844396:web:2af9f8171fdb12c666fb49",
    measurementId: "G-YYKRNGQMT9"
  };
  // firebase.initializeApp(firebaseConfig)


  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  auth.useDeviceLanguage();


} catch (error) {
  console.error("Error loading Firebase configuration:", error);
  // Handle the error gracefully (e.g., show a friendly error message)
}

export default { auth };