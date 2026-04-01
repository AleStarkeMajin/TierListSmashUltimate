import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";
import firebaseConfig from "./firebase-applet-config.json";

// Initialize Firebase SDK
const app = initializeApp(firebaseConfig);
// Use the modular API's getFirestore with the initialized app.
// Passing a second argument (like firestoreDatabaseId) is not part of the standard
// SDK signature; use `getFirestore(app)` and reference any custom database id
// from the config only if you need it for non-default behaviour.
export const db = getFirestore(app);
export const auth = getAuth(app);

// Test connection to Firestore
async function testConnection() {
  try {
    // Attempt to read a non-existent document to check connectivity
    await getDocFromServer(doc(db, "test", "connection"));
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("the client is offline")
    ) {
      console.error(
        "Please check your Firebase configuration. The client appears to be offline.",
      );
    }
    // Other errors (like permission denied) are expected since we haven't set up rules yet
  }
}

testConnection();

// Sign in anonymously to allow database access if rules require authentication
signInAnonymously(auth).catch((err) =>
  console.error("Error signing in anonymously:", err),
);
