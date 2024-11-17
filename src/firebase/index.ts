import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
	apiKey: 'AIzaSyDdhjFoPX-Y0tolJyQmHKKdXiD4Hjzpl60',
	authDomain: 'gym-training-eea21.firebaseapp.com',
	projectId: 'gym-training-eea21',
	storageBucket: 'gym-training-eea21.firebasestorage.app',
	messagingSenderId: '291139213507',
	appId: '1:291139213507:web:4f415e71f0fcaf3bda6a76',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
