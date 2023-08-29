var path = require("path");
const fs = require("fs");
const csv = require("fast-csv");
const moment = require("moment");

exports.getWind = async (req, res, next) => {
  try {
    const data = {
      mappingData: [],
      windyData: [],
      mostWindy: {
        time: "",
        speed: 0,
        direction: "",
        p1: "",
        p25: "",
        p10: "",
      },
    };

    //time filter object with default start and end time
    const filter = {
      startDate: new Date("2019-03-19T03:40:51.000Z"),
      endDate: new Date("2019-03-19T03:51:51.000Z"),
    };

    if (req.query.startDateTime && req.query.endDateTime) {
      filter.startDate = new Date(req.query.startDateTime);
      filter.endDate = new Date(req.query.endDateTime);
    }

    const readStream = fs.createReadStream(path.join("./common/db.csv"));

    await new Promise((resolve, reject) => {
      readStream
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => console.error(error))
        .on("data", (row) => {
          if (row.t) {
            let date = new Date(parseDate(row.t));

            // Finding max wind speed within the same week of the filter date
            const startWeek = moment(filter.startDate).isoWeek();
            if (startWeek === moment(date).isoWeek() && row.w > data.mostWindy.speed) {
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
              data.mostWindy = {
                time: moment(date).format("ddd Do MMM YYYY"),
                speed: row.w,
                direction: direction[row.h],
                p1: row.p1,
                p25: row.p25,
                p10: row.p10,
              };
            }

            // if (date > filter.endDate) {
            // readStream.destroy();
            // resolve();
            // } else

            // grouping data withing the given time filter
            if (date >= filter.startDate && date <= filter.endDate) {
              data.mappingData.push({
                time: moment(date).format("DD-MM-YYYY h:mm:ss a"),
                speed: row.w,
                direction: row.h,
                p1: row.p1,
                p25: row.p25,
                p10: row.p10,
              });
            }
          }
        })
        .on("end", () => {
          console.log("finished processing data");
          resolve();
        });
    });

    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
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
