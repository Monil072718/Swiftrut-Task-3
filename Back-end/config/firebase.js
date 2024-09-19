// config/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require(process.env.FIREBASE_ADMIN_SDK_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendNotification = async (deviceToken, message) => {
  try {
    await admin.messaging().send({
      token: deviceToken,
      notification: message,
    });
  } catch (error) {
    console.error('Failed to send notification', error);
  }
};

module.exports = { sendNotification };
