import fireStoreEvent from "./firestore-event";
import notificationEvent from "./notification-event";

const eventInstance = async (event) => {

    await fireStoreEvent(event);
    await notificationEvent(event);

}

export default eventInstance;
