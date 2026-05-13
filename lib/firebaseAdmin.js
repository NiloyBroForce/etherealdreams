import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccountJSON = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountJSON) {
	throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not set.");
}

const serviceAccount = JSON.parse(serviceAccountJSON);

let firebaseApp;
if (!getApps().length) {
	firebaseApp = initializeApp({
		credential: cert(serviceAccount),
	});
} else {
	firebaseApp = getApps()[0];
}

export const db = getFirestore(firebaseApp);
export { firebaseApp };
