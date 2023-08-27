import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDhKvoIYHQi7KEfxijjnihxpSEgMBMKEAI",
	authDomain: "prezellin-clothing-db.firebaseapp.com",
	projectId: "prezellin-clothing-db",
	storageBucket: "prezellin-clothing-db.appspot.com",
	messagingSenderId: "295690047742",
	appId: "1:295690047742:web:7d82aaf41051423302d5af",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, "users", userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	// if user data does not exists
	// create / set the document with the data from userAuth in my collection
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.log("error creating the user ", error.message);
		}
	}

	// If user does exist,

	// return userDocRef
};
