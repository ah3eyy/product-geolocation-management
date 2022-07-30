import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (!envFound) {
    throw new Error("⚠ Couldn't find .env file  ⚠️");
}

export default {
    port: process.env.PORT,
    databaseURL: process.env.databaseURL,
    api: {
        prefix: '/api'
    },
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    geo_locator: {
        token: process.env.GEOLOCATOR_TOKEN,
        provider: process.env.GEOLOCATOR_PROVIDER
    },
    jwt_token: process.env.JWT_TOKEN,
    cloudinary: {
        name: process.env.CLOUDINARY_NAME,
        api_token: process.env.CLOUDINARY_API_KEY,
        secret: process.env.CLOUDINARY_API_SECRET
    },
    default_radius: process.env.DEFAULT_RADIUS,
    event_constants: {
        NEW_PRODUCT: 'NEW-PRODUCT',
        NEW_NOTIFICATION: 'NEW-NOTIFICATION'
    },
    mail: {
        token: process.env.MAIL_TOKEN,
        sender_email: process.env.MAIL_SENDER,
        user: process.env.MAIL_USER,
        password: process.env.MAIL_PASSWORD
    }
};
