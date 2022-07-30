const ErrorHandler = {
    validationError: (res, error) => {
        return res.status(400).json({
            status: 'error',
            error: {
                message: error.details[0].message
            }
        })
    },
    serverResponse: (res, message, status) => {
        return res.status(status).json({
            status: 'error',
            message
        })
    },
}

export default ErrorHandler;
