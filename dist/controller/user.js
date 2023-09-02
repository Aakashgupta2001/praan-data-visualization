"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const User_1 = __importDefault(require("../model/User"));
const service = __importStar(require("../service/service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_handler_1 = require("../middlewares/response-handler");
const errorHandler = __importStar(require("../middlewares/errorHandler"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        // Checking for existing user
        const existingUser = yield service.findOne(User_1.default, {
            email: body.email,
        });
        if (existingUser) {
            throw new errorHandler.BadRequest("User already exist");
        }
        // Throwing error if not a valid password
        if (!body.password || body.password.length < 5) {
            res.status(406).send("Password required");
            return;
        }
        body.email = body.email.toLowerCase();
        // Encrypting password
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashPassword = yield bcrypt_1.default.hash(body.password, salt);
        body.password = hashPassword;
        // Creating user using encrypted password
        const user = yield service.create(User_1.default, body);
        const returnBody = {
            email: user.email,
        };
        return (0, response_handler_1.responseHandler)(returnBody, res);
    }
    catch (err) {
        next(err);
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || !req.body.email || !req.body.password) {
            throw new errorHandler.BadRequest("error bad request");
        }
        const filter = {
            email: req.body.email.toLowerCase(),
        };
        //checking if user exists
        const user = yield service.findOne(User_1.default, filter);
        if (!user) {
            throw new errorHandler.BadRequest("User does not exist");
        }
        //comparing the given password with encrypted password
        const result = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!result) {
            throw new errorHandler.BadRequest("Incorrect Password");
        }
        //generating jwt token
        const token = yield jsonwebtoken_1.default.sign({ email: user.email, _id: user._id }, process.env.SECRET_KEY);
        // returning response using response handler for uniform response throughout the app
        (0, response_handler_1.responseHandler)({
            token: token,
            email: user.email,
        }, res, "Signin Successful");
    }
    catch (err) {
        next(err);
    }
});
exports.login = login;
