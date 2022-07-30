import ErrorHandler from "../../helpers/error-handler";
import ErrorResponse from "../../helpers/error-response";
import _ from 'lodash';

const {
    serverResponse,
    validationError
} = ErrorHandler;

const ErrorHandlerMiddleware = (err, req, res, next) => {

    let error = {
        ...err
    };

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400)
    }

    if (err.name === "UnauthorizedError") {
        const message = "Unauthorized";
        error = new ErrorResponse(message, 401)
    }

    if (err.code === 11000) {
        const message = `Duplicate entries please check fields`;
        error = new ErrorResponse(message, 400);
    }

    return serverResponse(
        res,
        {
            error: error.message || `${err.message}; ${_.get(err, 'response.data', '')}` || error || err || "Internal server error contact TradePot for help",
        },
        error.statusCode || _.get(err, 'response.status', 500) || 500
    );
}

export default ErrorHandlerMiddleware;
