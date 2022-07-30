const SuccessHelper = {

    /**
     *
     * @param {Response} res
     * @param {Number} statusCode
     * @param {String} message
     */
    successWithMessage(res, statusCode, message) {
        return res.status(statusCode).json({message, status: 'success'});
    },

    /**
     *
     * @param {Response} res
     * @param {Number} statusCode
     * @param {any} data
     */
    successWithData(res, statusCode, data) {
        return res.status(statusCode).json({data, status: 'success'});
    },

    /**
     *
     * @param {Response} res
     * @param {Number} statusCode
     * @param {String} message
     * @param {any} data
     */
    successWithMessageAndData(res, statusCode, message, data) {
        return res.status(statusCode).json({
            data,
            message,
            status: 'success',
        });
    },
}

export default SuccessHelper;
