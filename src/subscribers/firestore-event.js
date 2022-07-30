import FireStoreService from "../services/fire-store-service";

const fireStoreEvent = (event) => {

    event.on('NEW-PRODUCT', async (data) => {
        await FireStoreService.syncNewProduct(data);
    });


    return event;
};

export default fireStoreEvent;
