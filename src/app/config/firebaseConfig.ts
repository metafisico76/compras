// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";


export const firebaseConfig = {
	apiKey: "XXX",
	authDomain: "comprasapp-5f265.firebaseapp.com",
	databaseURL: "https://comprasapp-5f265.firebaseio.com",
	projectId: "comprasapp-5f265",
	storageBucket: "comprasapp-5f265.appspot.com",
	messagingSenderId: "89340073021",
	appId: "1:89340073021:web:eca1983317eea827c30654",
	measurementId: "G-91SLNJFZNX"
  };

  // Initialize Firebase
if(!firebase.apps.length){
	firebase.initializeApp(firebaseConfig);
}  




/*export const config = {
    production: false,
    firebase: {
	  apiKey: "XXX",
	  authDomain: "comprasapp-5f265.firebaseapp.com",
	  databaseURL: "https://comprasapp-5f265.firebaseio.com",
	  projectId: "comprasapp-5f265",
      storageBucket:"comprasapp-5f265.appspot.com",
	  messagingSenderId: "89340073021",
	  appId: "1:89340073021:web:eca1983317eea827c30654",
	  measurementId: "G-91SLNJFZNX"
    }
} */