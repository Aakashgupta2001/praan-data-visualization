"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
// Assuming these middlewares/modules have default exports. Adjust if they have named exports.
const errorHandler_1 = require("../middlewares/errorHandler");
const wind_1 = __importDefault(require("./wind"));
const auth_1 = __importDefault(require("./auth"));
exports.default = (app) => {
    // getDirectory function for hosting frontend
    function getDir() {
        if (process.pkg) {
            return path_1.default.resolve(`${process.execPath}/..`);
        }
        else {
            return path_1.default.join(require.main ? require.main.path : process.cwd());
        }
    }
    // Enable JSON objects in express
    app.use(express_1.default.json());
    // API paths
    app.use("/api/v1/wind", wind_1.default);
    app.use("/api/v1/auth", auth_1.default);
    // Use static paths for frontend
    app.use(express_1.default.static(`${getDir()}/build`));
    app.use(express_1.default.static("public"));
    // Frontend Path
    app.get("/*", (req, res, next) => {
        res.sendFile(`${getDir()}/build/index.html`);
    });
    // Error handler extended middleware
    app.use(errorHandler_1.useErrorHandler);
};
