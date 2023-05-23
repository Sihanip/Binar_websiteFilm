import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCahFSzcXHcFLOnqnz3btFSKvVagTIq5Vw",
  authDomain: "binar-fp-5.firebaseapp.com",
  projectId: "binar-fp-5",
  storageBucket: "binar-fp-5.appspot.com",
  messagingSenderId: "178123073796",
  appId: "1:178123073796:web:7b5ceac64a8f7314120851"
};

const app = initializeApp(firebaseConfig);
export const aouth = getAuth(app);
const providerfb = new FacebookAuthProvider()
const provider = new GoogleAuthProvider();
const providergit = new GithubAuthProvider()

export const signInWithGoogle = () => {

  signInWithPopup(aouth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signInWithFacebook = () => {

  signInWithPopup(aouth, providerfb)
  .then((result) => {
    console.log(result);

  })
  .catch((error) => {
    console.log(error.message);
    // ...
  });
}

export const signInWithGithub = () => {

  signInWithPopup(aouth, providergit)
  .then((result) => {
    console.log(result);

  }).catch((error) => {
    console.log(error.message);
  });
}


export default app