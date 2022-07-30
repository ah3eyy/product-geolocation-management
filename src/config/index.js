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
    },
    firestore: {
        "type": "service_account",
        "project_id": "the-program-357911",
        "private_key_id": "1ffdc3574ce3ec1d9f5f29b8038fa81cd756812c",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzL1ionA6L4tJW\nBNjYVR6a5C9VEEbt8IfVzr3vEBOe+A4som0pPU+yI3/NUaol/F+yKT2t5jVSwRtc\nszUhOndC/Q32NQDiAx80rS1wbWE/BErQzCm/JttKBP9Et2IXg9iS9rrt9tLWCLZi\n8kjaJV06+dKpqr9GcQmqgqmbEma13V9R8a/6/XSKMT0NoD6VMJPVn/NAGQ9qmD2O\nCSnwfsszYhijTHxV9WhmJKPxxbkIuSUdoIoHncPPK9BT5Mw5Xmg7fnIfm/dczEGI\nDkljyviEKhGpdZIY4t3GsTR/qIp3Mrx7wOuQxKca1jveMzBNdueeulKODu2t/ylK\nZaV5TFbtAgMBAAECggEADFQpZD6KlK7oXIFMX0QqDSu+ovpx+uymF/y33lNLmlBE\nf2c0nhYJHf9py3l/PMpa1kIWq5ivmhBN3ui4st7YNlx9ga9/bk2bL89rlTT9cC3O\nLQQjKjMU+wiRfMumXOpWNDR0Q6vMMWxbij7T6uiPu99VEpX8P69G5DvFyjTvqrsh\nEBost+n7aA6xJa0P10VUKHL4W7x4XO5Yu/BrMTa5D28JdZIz5LWoSoRa9hEnnhfv\nqPvoj7UTyL72DqSGlreJJCyZrvFq02qAaLIvc+EIrRznswWiO+WOy9vMJOBsowx0\nNRqhRqQLAI3KssSF9NKzo6XBtK3bLz8lj/0nhTvvSQKBgQD2jrJxSzcjKVcdz3v3\nKMKukdXD4A7+esNJdguJcEFifBRcpSoJRlLH9V1Hnpep8wYFnphqEbqxCqWLnFwp\nSuqIF6IhkTwHypMxieYFN+aVNO3cGehBrBzPmAG0HnM6v6cqz3fRInYBq7y9X2SL\nRcSCdILaoZaMToYCUMgUvlj55QKBgQC6DB1nlgC/JSaGmqA9eDMrNOE7NvIsctYC\nMxc86j0GQ5/yUUvwEHD+XDgKXU6ivDH+lkpN8Hxb1E6zGsROGZtMNU3o4z5TW5bn\nE8SYIkUf5f03iag876U3Rqb8ShHXmk1nND//hQpiPRSuu/Ay0CoogyugJoQrF8eQ\nwyidNlj4aQKBgE+h8RJUd798h62SKPjACnj1kzRLdqxMnCxq2vkN76BOcQknMzeB\nphT9M56BI3z5iBVijtmbVk/+H0/DNaUElFFWSMBMtzXRAM98OXWwA2JnkPeIypID\nc968urghKZhs9CIIlitO1QxfGnuThtbQttJnrSfODuDML84ppyXEANrdAoGBAK8f\nojoUJ4XFOXtwZy8VSsz7zJrJgLG4MpwFbXVIY8LWuuMEBT/mqgWz1ohjBhcGoOSs\noSq2GMjzklTi+C8vyU+1yS1TYiJizyuaHu65K2n4Oh8h83vQdCsQ1TQboKnas8tW\nkns5xulr52EGxPV/nn9d4R2xw60wiAhKu5soQh0pAoGAZxLw2LZcsF4Hrtnjcu1Z\n72OW5p5IkhGnJelDcjPnEwr5VyYLR1U9ZNEzkuewZsaDLB8oqWIPz+p3iP+e7uNh\nop2guWF4vShv423cLbT9V/h3mqwlaFRrrVq0txSI7BfKme1sStJByCqNRNqkr081\nHfDXnmCpKU/CbFCAik8r1pc=\n-----END PRIVATE KEY-----\n",
        "client_email": "the-program-357911@appspot.gserviceaccount.com",
        "client_id": "109596952716865227026",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/the-program-357911%40appspot.gserviceaccount.com"
    }
};
