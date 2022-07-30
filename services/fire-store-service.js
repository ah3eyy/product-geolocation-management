import admin from "firebase-admin";
import LoggerInstance from "../loader/logger";

const serviceAccountPath = require('../config/the-program-357911-1ffdc3574ce3.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
});

const db = admin.firestore();

const FireStoreService = {
    syncNewProduct: async (data) => {
        try {
            await db.collection('products').doc(data.id).set(JSON.parse(JSON.stringify(data)));
        } catch (e) {
            LoggerInstance.error(e);
        }
    }
};

export default FireStoreService;
