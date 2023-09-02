"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useErrorHandler = exports.InsufficientAccessError = exports.ApplicationError = exports.Unauthorized = exports.NotFound = exports.BadRequest = exports.GeneralError = void 0;
class GeneralError extends Error {
    constructor(message) {
        super(message);
    }
    getCode() {
        if (this instanceof BadRequest) {
            return 400;
        }
        if (this instanceof NotFound) {
            return 404;
        }
        if (this instanceof Unauthorized) {
            return 401;
        }
        if (this instanceof ApplicationError) {
            return 400;
        }
        if (this instanceof InsufficientAccessError) {
            return 403;
        }
        return 400;
    }
}
exports.GeneralError = GeneralError;
class BadRequest extends GeneralError {
}
exports.BadRequest = BadRequest;
class NotFound extends GeneralError {
}
exports.NotFound = NotFound;
class Unauthorized extends GeneralError {
}
exports.Unauthorized = Unauthorized;
class ApplicationError extends GeneralError {
}
exports.ApplicationError = ApplicationError;
class InsufficientAccessError extends GeneralError {
}
exports.InsufficientAccessError = InsufficientAccessError;
const useErrorHandler = (err, req, res, next) => {
    if (err instanceof GeneralError) {
        return res.status(err.getCode()).json({
            status: "error",
            message: typeof err.message === "string" ? err.message : err.message,
        });
    }
    return res.status(400).json({
        status: "error",
        message: typeof err.message === "string" ? err.message : err.message,
    });
};
exports.useErrorHandler = useErrorHandler;
process.on("uncaughtException", (err) => {
    console.log(err);
});
process.on("unhandledRejection", (reason, promise) => {
    console.log(reason);
});
