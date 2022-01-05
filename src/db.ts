import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDoc,
  setDoc,
  doc,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore/lite';

const firebaseConfig = {
  projectId: 'crowdloan-app-cef78'
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// const fetchEvent = async () => {
//   const docRef = doc(db, 'board-list-s/data');
//   const docData = await getDoc(docRef);
//   // console.log('snap', docData.data())
//   return docData.data();
// };

const isAlreadyAppliedForBonus = async (lockOwner) => {
  const docRef = doc(db, 'bonus-user', lockOwner);
  const docData = await getDoc(docRef);
  return docData.data() !== undefined;
};

const saveForBonusUser = async (infoData) => {
  const docRef = doc(db, 'bonus-user', infoData.prevInfo.lockOwner);
  await setDoc(docRef, infoData);
};

export { db, saveForBonusUser, isAlreadyAppliedForBonus };
