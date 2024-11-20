// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuración obtenida de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDCxnnAWr0OGE7srlkkhQvwll1n45st3x4",
  authDomain: "fir-connection-7d14d.firebaseapp.com",
  projectId: "fir-connection-7d14d",
  storageBucket: "fir-connection-7d14d.appspot.com",
  messagingSenderId: "15107131537",
  appId: "1:15107131537:web:0c11d0224859cab2205730"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export { db };
