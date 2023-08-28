import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
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
// eslint-disable-next-line no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation
) => {
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
				...additionalInformation,
			});
		} catch (error) {
			console.log("error creating the user ", error.message);
		}
	}

	// If user does exist,
	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};
