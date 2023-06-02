import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, GithubAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCahFSzcXHcFLOnqnz3btFSKvVagTIq5Vw",
  authDomain: "binar-fp-5.firebaseapp.com",
  projectId: "binar-fp-5",
  storageBucket: "binar-fp-5.appspot.com",
  messagingSenderId: "178123073796",
  appId: "1:178123073796:web:7b5ceac64a8f7314120851"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const providerfb = new FacebookAuthProvider()
const providergit = new GithubAuthProvider()

export { auth, providerfb, providergit}

