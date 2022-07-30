import bodyParser from "body-parser";
import cors from "cors";
import apiRoutes from "../routes/api-routes";
import config from "./index";
import ErrorHandlerMiddleware from "../routes/middleware/error-handler-middleware";
import JwtHandler from "../routes/middleware/jwt-handler";
import expressListRoutes from "express-list-routes";

export default async (app, router, event) => {

    app.use(cors());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // attached event to req
    app.use((req, res, next) => {
        req['event'] = event;
        next();
    });

    app.use(JwtHandler());

    app.get('/', (req, res) => {
        res.status(202).send({
            memory_useage: process.memoryUsage(),
            up_time: process.uptime(),
            pid: process.pid,
            uid: process.getuid,
            allowedNodeENV: process.allowedNodeEnvironmentFlags
        });
    });

    app.use(config.api.prefix, apiRoutes(router));

    app.use((req, res, next) => {
        const err = new Error('Route Not Found');
        err.status = 404;
        next(err);
    });

    app.use(ErrorHandlerMiddleware);

    return app;
};

