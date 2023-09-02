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
exports.perDeviceData = exports.pdata = exports.migrate = exports.dashboard = void 0;
const moment_1 = __importDefault(require("moment"));
const XLSX = __importStar(require("xlsx"));
const WindData_1 = __importDefault(require("../model/WindData"));
const error = __importStar(require("../middlewares/errorHandler"));
const response_handler_1 = require("../middlewares/response-handler");
const service = __importStar(require("../service/service"));
const dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // initial filter object
        let filter = {
            device: "DeviceA",
            t: {
                $gte: new Date("2021-03-19T03:31:46.000+00:00").toISOString(),
                $lte: new Date("2021-03-19T03:50:46.000+00:00").toISOString(),
            },
        };
        // if date and time filter is requested, adding mongo filter query in filter object
        if (req.query.startDateTime && req.query.endDateTime) {
            filter.t = {
                $gte: new Date(req.query.startDateTime).toISOString(),
                $lte: new Date(req.query.endDateTime).toISOString(),
            };
        }
        // searching through database
        const results = yield service.find(WindData_1.default, filter);
        let weekFilter = {
            t: {
                $gte: (0, moment_1.default)(filter.t["$gte"]).startOf("week").toISOString(),
                $lte: (0, moment_1.default)(filter.t["$gte"]).endOf("week").toISOString(),
            },
        };
        console.log("week filter", weekFilter);
        const weekData = yield service.find(WindData_1.default, weekFilter);
        // formatting data and time
        const formattedMappingData = results.map((entry) => ({
            time: (0, moment_1.default)(entry.t).format("DD-MM-YYYY h:mm:ss a"),
            device: entry.device,
            speed: entry.w,
            direction: entry.h,
            p1: entry.p1,
            p25: entry.p25,
            p10: entry.p10,
        }));
        let mostWindy = {
            time: "",
            speed: 0,
            direction: "",
            p1: 0,
            p25: 0,
            p10: 0,
        };
        let direction = {
            N: "North",
            NE: "North East",
            NW: "North West",
            E: "East",
            W: "West",
            S: "South",
            SE: "South East",
            SW: "South West",
        };
        // searching the most windy day of the week
        weekData.forEach((entry) => {
            if (entry.w > mostWindy.speed) {
                mostWindy = {
                    time: (0, moment_1.default)(entry.t).format("ddd Do MMM YYYY"),
                    speed: entry.w,
                    direction: direction[entry.h],
                    p1: entry.p1,
                    p25: entry.p25,
                    p10: entry.p10,
                };
            }
        });
        const data = {
            mappingData: formattedMappingData,
            mostWindy: mostWindy,
        };
        // returning response using response handler for uniform response throughout the app
        return (0, response_handler_1.responseHandler)(data, res);
    }
    catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Internal Server Error");
    }
});
exports.dashboard = dashboard;
const migrate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            throw new error.BadRequest("No File Uploaded");
        }
        // reading the excel file and creating a json object
        const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        // formatting the object to filter out the entries that do not have all the fields and formatting the date into a valid date object
        const formattedData = jsonData
            .filter((entry) => {
            return entry.device && entry.t && !+entry.t && entry.w && entry.h && entry.p1 && entry.p25 && entry.p10; // Assuming all fields are mandatory
        })
            .map((entry) => (Object.assign(Object.assign({}, entry), { t: parseDate(entry.t) })));
        // inserting all the data in db
        yield WindData_1.default.insertMany(formattedData);
        // returning response using response handler for uniform response throughout the app
        return (0, response_handler_1.responseHandler)({ message: "Data Inserted Successfully" }, res);
    }
    catch (err) {
        console.error("Error processing file:", err);
        next(err);
    }
});
exports.migrate = migrate;
const pdata = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const devices = req.query.devices; // Explicit type casting
        if (!devices) {
            throw new error.BadRequest("No devices specified.");
        }
        // creating an array of requested devices
        const deviceList = devices.split(",").map((device) => device.trim());
        let filter = {
            device: { $in: deviceList },
            t: {
                $gte: new Date("2021-03-19T03:31:46.000+00:00").toISOString(),
                $lte: new Date("2021-03-19T03:50:46.000+00:00").toISOString(),
            },
        };
        if (req.query.startDateTime && req.query.endDateTime) {
            filter.t = {
                $gte: new Date(req.query.startDateTime).toISOString(),
                $lte: new Date(req.query.endDateTime).toISOString(),
            };
        }
        // searching data through api
        const results = yield service.find(WindData_1.default, filter, {}, {}, "device p1 p25 p10 t");
        // Organizing data per device
        const data = {};
        deviceList.forEach((deviceId) => {
            const deviceData = results.filter((entry) => entry.device === deviceId);
            data[deviceId] = {
                p1: deviceData.map((entry) => {
                    return { val: entry.p1, time: entry.t };
                }),
                p25: deviceData.map((entry) => {
                    return { val: entry.p25, time: entry.t };
                }),
                p10: deviceData.map((entry) => {
                    return { val: entry.p10, time: entry.t };
                }),
            };
        });
        // returning response using response handler for uniform response throughout the app
        return (0, response_handler_1.responseHandler)(data, res);
    }
    catch (err) {
        console.error("Error fetching data:", err);
        next(err);
    }
});
exports.pdata = pdata;
const perDeviceData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {
            t: {
                $gte: new Date("2021-03-19T03:31:46.000+00:00").toISOString(),
                $lte: new Date("2021-03-19T03:50:46.000+00:00").toISOString(),
            },
        };
        if (req.query.startDateTime && req.query.endDateTime) {
            filter.t = {
                $gte: new Date(req.query.startDateTime).toISOString(),
                $lte: new Date(req.query.endDateTime).toISOString(),
            };
        }
        if (req.query.device) {
            filter.device = req.query.device;
        }
        const results = yield service.find(WindData_1.default, filter);
        const formattedMappingData = results.map((entry) => ({
            time: (0, moment_1.default)(entry.t).format("DD-MM-YYYY h:mm:ss a"),
            device: entry.device,
            speed: entry.w,
            direction: entry.h,
            p1: entry.p1,
            p25: entry.p25,
            p10: entry.p10,
        }));
        return (0, response_handler_1.responseHandler)(formattedMappingData, res);
    }
    catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Internal Server Error");
    }
});
exports.perDeviceData = perDeviceData;
//function to parse date into a Valid Date Object
function parseDate(input) {
    try {
        // input format -- 21/03/19,09:01:46
        const [datePart, timePart] = input.split(",");
        const [year, month, day] = datePart.split("/").map(Number);
        const [hour, minute, second] = timePart.split(":").map(Number);
        const fullYear = 2000 + year;
        return new Date(fullYear, month - 1, day, hour, minute, second);
    }
    catch (err) {
        console.log("error on this input - ", input);
        console.log(err);
        return undefined;
    }
}
