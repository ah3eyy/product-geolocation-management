import admin from "firebase-admin";
import LoggerInstance from "../loader/logger";
import config from "../config/index";

const serviceAccountPath = JSON.parse(JSON.stringify(config.firestore));

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
