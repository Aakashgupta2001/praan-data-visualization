const moment = require("moment");
const XLSX = require("xlsx");
const WindDataSchema = require("../model/WindData");
const error = require("../middlewares/errorHandler");
const { responseHandler } = require("../middlewares/response-handler");
const service = require("../service/service");

exports.dashboard = async (req, res) => {
  try {
    //initial filter object
    let filter = {
      device: "DeviceA",
    };

    filter.t = {
      $gte: new Date("2021-03-19T03:31:46.000+00:00").toISOString(),
      $lte: new Date("2021-03-19T03:50:46.000+00:00").toISOString(),
    };

    //if date and time filter is requested, adding mongo filter query in filter object
    if (req.query.startDateTime && req.query.endDateTime) {
      filter.t = {
        $gte: new Date(req.query.startDateTime).toISOString(),
        $lte: new Date(req.query.endDateTime).toISOString(),
      };
    }

    //searching through database
    const results = await service.find(WindDataSchema, filter);

    //formatting data and time
    const formattedMappingData = results.map((entry) => ({
      time: moment(entry.t).format("DD-MM-YYYY h:mm:ss a"),
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
      p1: "",
      p25: "",
      p10: "",
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

    //searching the most windy day of the week
    results.forEach((entry) => {
      if (entry.w > mostWindy.speed) {
        mostWindy = {
          time: moment(entry.t).format("ddd Do MMM YYYY"),
          speed: entry.w,
          direction: direction[entry.h],
          p1: entry.p1,
          p25: entry.p25,
          p10: entry.p10,
        };
      }
    });

    data = {
      mappingData: formattedMappingData,
      mostWindy: mostWindy,
    };

    // returning response using response handler for uniform response throuout the app
    return responseHandler(data, res);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.migrate = async (req, res, next) => {
  try {
    if (!req.file) {
      throw error.BadRequest("No File Uploaded");
    }

    //reading the excel file and creating a json object
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    //formatting the object to filterout the entries that does not have all the feilds and formatting the date into a valid date object
    const formattedData = jsonData
      .filter((entry) => {
        return entry.device && entry.t && !+entry.t && entry.w && entry.h && entry.p1 && entry.p25 && entry.p10; // Assuming all fields are mandatory
      })
      .map((entry) => ({
        ...entry,
        t: parseDate(entry.t),
      }));

    //inserting all the data in db
    await WindDataSchema.insertMany(formattedData);

    // returning response using response handler for uniform response throuout the app
    return responseHandler({ message: "Data Inserted Successfully" }, res);
  } catch (error) {
    console.error("Error processing file:", error);
    next(error);
  }
};

exports.pdata = async (req, res, next) => {
  try {
    const { devices } = req.query; // e.g., "device1,device2,device3"

    if (!devices) {
      return res.status(400).send("No devices specified.");
    }

    //creating an array of requested devices
    const deviceList = devices.split(",");
    deviceList.forEach((device, i) => {
      deviceList[i] = device.trim();
    });

    let filter = {
      device: { $in: deviceList },
    };

    //filter for time
    filter.t = {
      $gte: new Date("2021-03-19T03:31:46.000+00:00").toISOString(),
      $lte: new Date("2021-03-19T03:50:46.000+00:00").toISOString(),
    };

    if (req.query.startDateTime && req.query.endDateTime) {
      filter.t = {
        $gte: new Date(req.query.startDateTime).toISOString(),
        $lte: new Date(req.query.endDateTime).toISOString(),
      };
    }

    //searching data through api
    const results = await service.find(WindDataSchema, filter, {}, {}, {}, "", "device p1 p25 p10 t");

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

    // returning response using response handler for uniform response throuout the app
    return responseHandler(data, res);
  } catch (err) {
    console.error("Error fetching data:", err);
    next(err);
  }
};

exports.perDeviceData = async (req, res) => {
  try {
    //initial filter object

    let filter = {};

    //default start date and time
    filter.t = {
      $gte: new Date("2021-03-19T03:31:46.000+00:00").toISOString(),
      $lte: new Date("2021-03-19T03:50:46.000+00:00").toISOString(),
    };

    //if date and time filter is requested, adding mongo filter query in filter object
    if (req.query.startDateTime && req.query.endDateTime) {
      filter.t = {
        $gte: new Date(req.query.startDateTime).toISOString(),
        $lte: new Date(req.query.endDateTime).toISOString(),
      };
    }

    //filter for device id
    if (req.query.device) {
      filter["device"] = req.query.device;
    }

    //searching through database
    const results = await service.find(WindDataSchema, filter);

    //formatting data and time
    const formattedMappingData = results.map((entry) => ({
      time: moment(entry.t).format("DD-MM-YYYY h:mm:ss a"),
      device: entry.device,
      speed: entry.w,
      direction: entry.h,
      p1: entry.p1,
      p25: entry.p25,
      p10: entry.p10,
    }));

    // returning response using response handler for uniform response throuout the app
    return responseHandler(formattedMappingData, res);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Internal Server Error");
  }
};

//function to parse date into a Valid Date Object
function parseDate(input) {
  try {
    //input format -- 21/03/19,09:01:46

    const [datePart, timePart] = input.split(",");
    const [year, month, day] = datePart.split("/").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);

    const fullYear = 2000 + year;

    return new Date(fullYear, month - 1, day, hour, minute, second);
  } catch (err) {
    console.log("error on this input - ", input);
    console.log(err);
  }
}
