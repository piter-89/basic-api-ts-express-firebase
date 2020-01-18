import * as admin from 'firebase-admin';

const serviceAccount = require("./key/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://only-test-be063.firebaseio.com"
});

export const verifyIdToken = (idToken: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      resolve(decodedToken.uid);
    } catch (err) {
      reject(err);
    }
  });
}