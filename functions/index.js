// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// A sample function to trigger when a new document is created
exports.newUserCreated = functions.firestore
  .document('users/{userId}')
  .onCreate((snap, context) => {
    const newValue = snap.data();
    console.log('New user created:', newValue);
    // You can add more logic here like sending a welcome email, etc.
  });
