
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-10977.firebaseapp.com",
  projectId: "interviewiq-10977",
  storageBucket: "interviewiq-10977.firebasestorage.app",
  messagingSenderId: "269447736499",
  appId: "1:269447736499:web:d73c5739ec757e7f36d4c6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };