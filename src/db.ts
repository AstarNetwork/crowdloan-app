import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore/lite';

const firebaseConfig = {
  projectId: 'crowdloan-app-cef78'
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const fetchEvent = async () => {
  const docRef = doc(db, 'board-list/data');
  const docData = await getDoc(docRef);
  // console.log('snap', docData.data())
  return docData.data();
};

export { db, fetchEvent };
