import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import appletConfig from "../firebase-applet-config.json" assert { type: "json" };

const firebaseConfig = {
  apiKey: appletConfig.apiKey,
  authDomain: appletConfig.authDomain,
  projectId: appletConfig.projectId,
  storageBucket: appletConfig.storageBucket,
  messagingSenderId: appletConfig.messagingSenderId,
  appId: appletConfig.appId,
};

async function diagnose() {
  console.log("Connecting to Firestore:", appletConfig.firestoreDatabaseId);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app, appletConfig.firestoreDatabaseId);
  
  const testId = "test-proj-id";
  const testRef = doc(db, "projects", testId);
  
  console.log("Attempting to write test document...");
  await setDoc(testRef, {
    id: testId,
    judul: "Test Project Success!",
    kategori: "Web Development",
    deskripsi: "This verifies Firestore read and write permissions are fully functional.",
    gambar: "https://images.unsplash.com/photo-1590736969955-71cb94801759"
  });
  console.log("Write success!");

  console.log("Reading back from projects collection...");
  const querySnapshot = await getDocs(collection(db, "projects"));
  console.log("Total projects found:", querySnapshot.size);
  querySnapshot.forEach((doc) => {
    console.log(`- Project ID: ${doc.id}, Judul: ${doc.data().judul}`);
  });

  console.log("Cleaning up test document...");
  await deleteDoc(testRef);
  console.log("Cleanup success. Database operations are fully verified!");
  process.exit(0);
}

diagnose().catch((err) => {
  console.error("Database test failed:", err);
  process.exit(1);
});
