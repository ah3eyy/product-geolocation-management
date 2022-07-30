import server from "./src/config/server";
import express from 'express';
import database from "./src/models/database";
import event from "events";
import eventInstance from "./src/subscribers";

const startServer = async () => {
    const app = express();
    const {PORT} = process.env;

    app.listen(PORT, (err) => {
        if (err) throw new Error(err);
        console.log(`Server is running on http://localhost:${PORT}`);
    });

    const router = express.Router();

    const startEvent = new event.EventEmitter();

    await eventInstance(startEvent);
    await server(app, router, startEvent);
    await database();
};

startServer();
