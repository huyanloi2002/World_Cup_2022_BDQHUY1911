const ErrorHandlder = require('../utils/errorHandler')

module.exports = (err, req, res, next) => {
    err.statusCode = err.status || 500;
    err.message = err.message || 'Internal Server Error';

    res.status(err.statusCode).json({
        success: false,
        error: err
    })
}