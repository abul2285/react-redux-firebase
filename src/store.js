import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import { createStore, combineReducers, compose } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";

const fbConfig = {
  apiKey: "AIzaSyAF9vKijMiJ4WG-O7U_gee1ouJKLPHg0YU",
  authDomain: "react-redux-firebase-c8cca.firebaseapp.com",
  databaseURL: "https://react-redux-firebase-c8cca.firebaseio.com",
  projectId: "react-redux-firebase-c8cca",
  storageBucket: "react-redux-firebase-c8cca.appspot.com",
  messagingSenderId: "153677416128",
  appId: "1:153677416128:web:94307a8e0e1d9eb1430f25"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  presence: "presence",
  sessions: "sessions",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  // profileFactory: (userData, profileData, firebase) => {
  //   // how profiles are stored in database
  //   const { user } = userData;
  //   return {
  //     email: user.email,
  //     displayName: ""
  //   };
  // },
  enableClaims: true // Get custom claims along with the profile
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

// Initialize other services on firebase instance
firebase.firestore();
firebase.database();

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
);

// Create store with reducers and initial state
const initialState = {};
const store = createStore(rootReducer, initialState, enhancers);
export default store;

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};
