// firebase/firestore.js
import { firestore } from './config';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const healthDataCollection = collection(firestore, 'healthData');

// Add health data to Firestore
export const addHealthData = async (data) => {
  try {
    const docRef = await addDoc(healthDataCollection, data);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// Get all health data from Firestore
export const getHealthData = async () => {
  const querySnapshot = await getDocs(healthDataCollection);
  return querySnapshot.docs.map(doc => doc.data());
};
