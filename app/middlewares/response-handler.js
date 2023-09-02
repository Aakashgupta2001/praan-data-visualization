"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = void 0;
const responseHandler = (data, res, message, status) => {
    const statusCode = status || 200;
    const messageData = message || "Success";
    res.status(statusCode).json({
        status: "success",
        message: messageData,
        data: data,
    });
};
exports.responseHandler = responseHandler;
