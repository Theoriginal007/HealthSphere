// firebase/storage.js
import { storage } from './config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// Upload file to Firebase Storage
export const uploadFile = async (file) => {
  const storageRef = ref(storage, `healthDataFiles/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed', 
    (snapshot) => {
      // Handle progress (if needed)
    }, 
    (error) => {
      console.log(error);
    }, 
    async () => {
      // Get the download URL after successful upload
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log('File available at', downloadURL);
    });
};
