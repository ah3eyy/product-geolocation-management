import authenticationController from "../controllers/authentication-controller";
import joiMiddleware from "./middleware/joi-middleware";
import joiSchema from "../models/joi-schema";

export default function (route) {
    route.post('/register', joiMiddleware(joiSchema.register), authenticationController.registerUser);
    route.post('/login', joiMiddleware(joiSchema.login), authenticationController.loginUser);
    route.get('/profile', authenticationController.profile);
    return route;
};
