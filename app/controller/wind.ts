import moment from "moment";
import * as XLSX from "xlsx";
import WindDataSchema from "../model/WindData";
import * as error from "../middlewares/errorHandler";
import { responseHandler } from "../middlewares/response-handler";
import * as service from "../service/service";
import { Request, Response, NextFunction } from "express";

interface WindData {
  t: Date;
  device: string;
  w?: number;
  h?: string;
  p1: number;
  p25: number;
  p10: number;
}

interface WindyData {
  time: string;
  speed: number;
  direction: string;
  p1: number;
  p25: number;
  p10: number;
}

interface ExcelEntry {
  device: string;
  t: string;
  w: string;
  h: string;
  p1: string;
  p25: string;
  p10: string;
}

export const dashboard = async (req: Request, res: Response): Promise<void> => {
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
        $gte: new Date(req.query.startDateTime as string).toISOString(),
        $lte: new Date(req.query.endDateTime as string).toISOString(),
      };
    }

    // searching through database
    const results: WindData[] = await service.find(WindDataSchema, filter);

    let weekFilter = {
      t: {
        $gte: moment(filter.t["$gte"]).startOf("week").toISOString(),
        $lte: moment(filter.t["$gte"]).endOf("week").toISOString(),
      },
    };

    console.log("week filter", weekFilter);
    const weekData: any[] = await service.find(WindDataSchema, weekFilter);

    // formatting data and time
    const formattedMappingData = results.map((entry) => ({
      time: moment(entry.t).format("DD-MM-YYYY h:mm:ss a"),
      device: entry.device,
      speed: entry.w,
      direction: entry.h,
      p1: entry.p1,
      p25: entry.p25,
      p10: entry.p10,
    }));

    let mostWindy: WindyData = {
      time: "",
      speed: 0,
      direction: "",
      p1: 0,
      p25: 0,
      p10: 0,
    };

    let direction: { [key: string]: string } = {
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
          time: moment(entry.t).format("ddd Do MMM YYYY"),
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
    return responseHandler(data, res);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Internal Server Error");
  }
};

export const migrate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      throw new error.BadRequest("No File Uploaded");
    }

    // reading the excel file and creating a json object
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const jsonData: ExcelEntry[] = XLSX.utils.sheet_to_json(worksheet);

    // formatting the object to filter out the entries that do not have all the fields and formatting the date into a valid date object
    const formattedData = jsonData
      .filter((entry) => {
        return entry.device && entry.t && !+entry.t && entry.w && entry.h && entry.p1 && entry.p25 && entry.p10; // Assuming all fields are mandatory
      })
      .map((entry) => ({
        ...entry,
        t: parseDate(entry.t),
      }));

    // inserting all the data in db
    await WindDataSchema.insertMany(formattedData);

    // returning response using response handler for uniform response throughout the app
    return responseHandler({ message: "Data Inserted Successfully" }, res);
  } catch (err) {
    console.error("Error processing file:", err);
    next(err);
  }
};

export const pdata = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const devices: string = req.query.devices as string; // Explicit type casting

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
        $gte: new Date(req.query.startDateTime as string).toISOString(),
        $lte: new Date(req.query.endDateTime as string).toISOString(),
      };
    }

    // searching data through api
    const results: any[] = await service.find(WindDataSchema, filter, {}, {}, "device p1 p25 p10 t");

    // Organizing data per device
    const data: Record<string, any> = {};
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
    return responseHandler(data, res);
  } catch (err) {
    console.error("Error fetching data:", err);
    next(err);
  }
};

export const perDeviceData = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: any = {
      t: {
        $gte: new Date("2021-03-19T03:31:46.000+00:00").toISOString(),
        $lte: new Date("2021-03-19T03:50:46.000+00:00").toISOString(),
      },
    };

    if (req.query.startDateTime && req.query.endDateTime) {
      filter.t = {
        $gte: new Date(req.query.startDateTime as string).toISOString(),
        $lte: new Date(req.query.endDateTime as string).toISOString(),
      };
    }

    if (req.query.device) {
      filter.device = req.query.device as string;
    }

    const results: any[] = await service.find(WindDataSchema, filter);

    const formattedMappingData = results.map((entry) => ({
      time: moment(entry.t).format("DD-MM-YYYY h:mm:ss a"),
      device: entry.device,
      speed: entry.w,
      direction: entry.h,
      p1: entry.p1,
      p25: entry.p25,
      p10: entry.p10,
    }));

    return responseHandler(formattedMappingData, res);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Internal Server Error");
  }
};

//function to parse date into a Valid Date Object
function parseDate(input: string): Date | undefined {
  try {
    // input format -- 21/03/19,09:01:46
    const [datePart, timePart] = input.split(",");
    const [year, month, day] = datePart.split("/").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);

    const fullYear = 2000 + year;

    return new Date(fullYear, month - 1, day, hour, minute, second);
  } catch (err) {
    console.log("error on this input - ", input);
    console.log(err);
    return undefined;
  }
}
