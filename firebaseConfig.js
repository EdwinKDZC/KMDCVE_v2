import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCQEh5b6q1uN1BLZ_H3C7sAiC2tRoYh6is",
  authDomain: "login-g-50d70.firebaseapp.com",
  databaseURL: "https://login-g-50d70-default-rtdb.firebaseio.com",
  projectId: "login-g-50d70",
  storageBucket: "login-g-50d70.appspot.com",
  messagingSenderId: "796130904433",
  appId: "1:796130904433:web:fbcdd5ffa941751d998ed0"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const db = getFirestore(app)
//IOS: 314118162756-1v6e723s0f3te5uv02r2k3rdvkn0nvch.apps.googleusercontent.com
//ANDROID: 314118162756-t1r2hapn6d60p6sk7e1abp6ee2sr1vpm.apps.googleusercontent.com
