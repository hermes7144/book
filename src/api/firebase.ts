import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export async function login() {
  return signInWithPopup(auth, provider).then((result) => {
    const user = result.user;
    return user;
  });
}
export async function logout() {
  return signOut(auth)
    .then(() => null)
    .catch(console.error);
}

export function onUserStateChange(callback: any) {
  onAuthStateChanged(auth, async (user) => {
    let updatedUser = user ? await adminUser(user) : null;

    callback(updatedUser);
  });
}

export async function adminUser(user: any) {
  return get(ref(database, 'admins'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      } else {
        return user;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getBooks() {
  return get(ref(database, 'books')).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      return [];
    }
  });
}

export async function addNewProduct(product: any) {
  const id = uuid();
  return set(ref(database, `books/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    createdDate: new Date().toISOString(), // 현재 시간을 ISO 문자열로 저장
  });
}

export async function getNeighborhood(user: any) {
  return get(ref(database, `users/${user.uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const neighborhood = snapshot.val().neighborhood;
        return neighborhood;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function setNeighborhood(id: string, neighborhood: string) {
  return set(ref(database, `users/${id}`), {
    neighborhood,
  });
}
