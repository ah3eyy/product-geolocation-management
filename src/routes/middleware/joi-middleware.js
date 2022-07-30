const Joi = require('joi');
import ErrorHandler from '../../helpers/error-handler';

const {
    serverResponse,
    validationError
} = ErrorHandler;

const joiMiddleware = (schema, property) => {

    return (req, res, next) => {

        const {error} = schema.validate(req.body);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const {details} = error;
            const message = details.map(i => i.message).join(',');
            return serverResponse(
                res,
                {
                    error: message
                },
                422
            );
        }

    }
}

export default joiMiddleware;
