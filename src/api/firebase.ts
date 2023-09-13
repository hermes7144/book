import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

  storageBucket: 'book-e546f.appspot.com',
  messagingSenderId: '1053525039228',
  appId: '1:1053525039228:web:2ebba00ec2c0d67b0991f9',
  measurementId: 'G-4W4PY7NP0R',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);
export const fireStore = getFirestore(app);

export async function login() {
  return signInWithPopup(auth, provider).then(async (result) => {
    const user = result.user;

    await setUser(user);
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

export async function addNewBook(book: any) {
  const id = uuid();
  await set(ref(database, `books/${id}`), {
    ...book,
    id,
    price: parseInt(book.price),
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

export async function getUser(uid) {
  const res = await getDoc(doc(fireStore, 'users', uid));
  return res;
}

export async function setUser(user: any) {
  try {
    const res = await getDoc(doc(fireStore, 'users', user.uid));

    await setDoc(doc(fireStore, 'users', user.uid), {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    });

    if (!res.exists()) {
      await setDoc(doc(fireStore, 'users', user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      });
    }
    await setDoc(doc(fireStore, 'userChats', user.uid), {});
  } catch (err) {
    console.log(err);
  }
}
