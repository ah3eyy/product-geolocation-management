import emailHelper from "../helpers/email-helper";
import smsHandler from "../helpers/sms-handler";

const notificationService = {

    process: async (data) => {

        for (let i = 0; i < data.length; i++) {
            await emailNotification(data[i].email, data[i].message);
            await smsNotification(data[i].phone_number, data[i].message);
        }

    },


}

const smsNotification = async (phone_number, message) => {
    await smsHandler(phone_number, message);
}

const emailNotification = async (email, message) => {
    await emailHelper(email, message);
}

export default notificationService;

