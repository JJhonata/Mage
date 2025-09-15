import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAWN1hZDy_CyVt8yZ4lPAH8-_YIrOu-qc8",
    authDomain: "mage-19174.firebaseapp.com",
    databaseURL: "https://mage-19174-default-rtdb.firebaseio.com",
    projectId: "mage-19174",
    storageBucket: "mage-19174.appspot.com",
    messagingSenderId: "604505405673",
    appId: "1:604505405673:web:40f2fc1eab424882281878"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar serviços
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;