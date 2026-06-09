import { initializeApp, getApps } from "firebase/app";
import { initializeFirestore, doc, getDoc, setDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import appletConfig from "../firebase-applet-config.json";

export const firebaseConfig = {
  apiKey: appletConfig.apiKey,
  authDomain: appletConfig.authDomain,
  projectId: appletConfig.projectId,
  storageBucket: appletConfig.storageBucket,
  messagingSenderId: appletConfig.messagingSenderId,
  appId: appletConfig.appId,
};

export const firebaseDatabaseId = appletConfig.firestoreDatabaseId;

const hasConfig = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.authDomain
);

let app: any = null;
let db: any = null;
let auth: any = null;

if (hasConfig) {
  try {
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    db = initializeFirestore(app, {
      experimentalForceLongPolling: true,
      useFetchStreams: false,
    } as any, firebaseDatabaseId);
    auth = getAuth(app);
    
    // Share config with admin dashboard on same domain
    const configToShare = { ...firebaseConfig, firestoreDatabaseId: firebaseDatabaseId };
    localStorage.setItem("david_louis_firebase_config_shared", JSON.stringify(configToShare));

    // Register dynamic real-time Firestore sync listeners
    if (typeof window !== "undefined") {
      console.log("🔥 [Firebase Real-time Sync] Mengaktifkan listener real-time Firestore...");
      
      // 1. Projects
      onSnapshot(collection(db, "projects"), (snapshot) => {
        const list: any[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() });
        });
        if (list.length > 0) {
          localStorage.setItem("david_louis_portfolio_projects", JSON.stringify(list));
          window.dispatchEvent(new Event("local-storage-update"));
        }
      }, (err) => {
        console.warn("Gagal menyinkronkan proyek secara real-time:", err);
      });

      // 2. Skills
      onSnapshot(collection(db, "skills"), (snapshot) => {
        const list: any[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() });
        });
        if (list.length > 0) {
          localStorage.setItem("david_louis_portfolio_skills", JSON.stringify(list));
          window.dispatchEvent(new Event("local-storage-update"));
        }
      }, (err) => {
        console.warn("Gagal menyinkronkan keahlian secara real-time:", err);
      });

      // 3. Experiences
      onSnapshot(collection(db, "experiences"), (snapshot) => {
        const list: any[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() });
        });
        if (list.length > 0) {
          localStorage.setItem("david_louis_portfolio_experiences", JSON.stringify(list));
          window.dispatchEvent(new Event("local-storage-update"));
        }
      }, (err) => {
        console.warn("Gagal menyinkronkan riwayat pengalaman secara real-time:", err);
      });

      // 4. Stages (Journey)
      onSnapshot(collection(db, "stages"), (snapshot) => {
        const list: any[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() });
        });
        if (list.length > 0) {
          localStorage.setItem("david_louis_portfolio_stages", JSON.stringify(list));
          window.dispatchEvent(new Event("local-storage-update"));
        }
      }, (err) => {
        console.warn("Gagal menyinkronkan fasa perjalanan secara real-time:", err);
      });

      // 5. Settings / Profile
      onSnapshot(doc(db, "settings", "profile"), (docSnap) => {
        if (docSnap.exists()) {
          const profileData = docSnap.data();
          localStorage.setItem("david_louis_portfolio_profile", JSON.stringify(profileData));
          window.dispatchEvent(new Event("local-storage-update"));
        }
      }, (err) => {
        console.warn("Gagal menyinkronkan profil secara real-time:", err);
      });
    }
  } catch (error) {
    console.error("Gagal menginisialisasi Firebase:", error);
  }
}

export { app, db, auth };
export const isFirebaseEnabled = hasConfig && db !== null;

// Manual fallback sync to force pull fresh database data to localStorage on startup
export async function forceSyncFromCloud(): Promise<boolean> {
  if (!isFirebaseEnabled) return false;
  try {
    console.log("☁️ [Firebase Manual Sync] Memulai sinkronisasi manual dari Cloud Firestore...");
    
    // 1. Projects
    const projectsSnapshot = await getDocs(collection(db, "projects"));
    if (!projectsSnapshot.empty) {
      const fetchedProjects: any[] = [];
      projectsSnapshot.forEach((docSnap) => {
        fetchedProjects.push({ id: docSnap.id, ...docSnap.data() });
      });
      localStorage.setItem("david_louis_portfolio_projects", JSON.stringify(fetchedProjects));
    }

    // 2. Skills
    const skillsSnapshot = await getDocs(collection(db, "skills"));
    if (!skillsSnapshot.empty) {
      const fetchedSkills: any[] = [];
      skillsSnapshot.forEach((docSnap) => {
        fetchedSkills.push({ id: docSnap.id, ...docSnap.data() });
      });
      localStorage.setItem("david_louis_portfolio_skills", JSON.stringify(fetchedSkills));
    }

    // 3. Experiences
    const experiencesSnapshot = await getDocs(collection(db, "experiences"));
    if (!experiencesSnapshot.empty) {
      const fetchedExperiences: any[] = [];
      experiencesSnapshot.forEach((docSnap) => {
        fetchedExperiences.push({ id: docSnap.id, ...docSnap.data() });
      });
      localStorage.setItem("david_louis_portfolio_experiences", JSON.stringify(fetchedExperiences));
    }

    // 4. Stages (Journey)
    const stagesSnapshot = await getDocs(collection(db, "stages"));
    if (!stagesSnapshot.empty) {
      const fetchedStages: any[] = [];
      stagesSnapshot.forEach((docSnap) => {
        fetchedStages.push({ id: docSnap.id, ...docSnap.data() });
      });
      localStorage.setItem("david_louis_portfolio_stages", JSON.stringify(fetchedStages));
    }

    // 5. Profile Settings
    const profileSnap = await getDoc(doc(db, "settings", "profile"));
    if (profileSnap.exists()) {
      localStorage.setItem("david_louis_portfolio_profile", JSON.stringify(profileSnap.data()));
    }

    // Trigger local updates across active React components
    window.dispatchEvent(new Event("local-storage-update"));
    console.log("✅ [Firebase Manual Sync] Berhasil menyelaraskan data portfolio terbaru dari cloud!");
    return true;
  } catch (error) {
    console.warn("⚠️ [Firebase Manual Sync] Gagal menyelaraskan data portfolio dari cloud:", error);
    return false;
  }
}

// Generic helper to get data from Firestore
export async function fetchCollectionData(collectionName: string): Promise<any[] | null> {
  if (!isFirebaseEnabled) return null;
  try {
    const colRef = collection(db, collectionName);
    const querySnapshot = await getDocs(colRef);
    if (querySnapshot.empty) return [];
    
    const items: any[] = [];
    querySnapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() });
    });
    return items;
  } catch (err) {
    console.warn(`Gagal membaca koleksi [${collectionName}] dari Firestore:`, err);
    return null;
  }
}

// Helper to save item to Firestore
export async function saveCollectionItem(collectionName: string, docId: string, data: any): Promise<boolean> {
  if (!isFirebaseEnabled) return false;
  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data, { merge: true });
    return true;
  } catch (err) {
    console.error(`Gagal menyimpan ke Firestore [${collectionName}/${docId}]:`, err);
    return false;
  }
}
