import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCBh-dWkDxskCWL7JNpvzoyIPQogLJEH1U",
  authDomain: "horizon-e9c14.firebaseapp.com",
  databaseURL: "https://horizon-e9c14.firebaseio.com",
  projectId: "horizon-e9c14",
  storageBucket: "horizon-e9c14.appspot.com",
  messagingSenderId: "682125302409",
  appId: "1:682125302409:web:65e76db791cc844d438458",
  measurementId: "G-4Q9KCNFRKE"
};

firebase.initialiseApp(firebaseConfig);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/signedIn",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
};

function SignInScreen() {
  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default SignInScreen;
