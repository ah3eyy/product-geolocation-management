import config from "../config/index";
import notificationService from "../services/notification-service";

const notificationEvent = (event) => {

    event.on(config.event_constants.NEW_NOTIFICATION, async (data) => {
        await notificationService.process(data);
    });

    return event;
};

export default notificationEvent;
