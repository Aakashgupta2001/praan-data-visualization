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

    let windyCount = new Map();

    const readStream = fs.createReadStream(path.join("./common/db.csv"));
    await new Promise((resolve, reject) => {
      readStream
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => console.error(error))
        .on("data", (row) => {
          // console.log(parseDate(row.t));

          if (row.t) {
            let date = parseDate(row.t);

            //condition to filter by given date and time
            if (new Date(date).getTime() > new Date("2019-03-21T03:51:51.000Z").getTime()) {
              readStream.destroy();
              resolve();
            } else {
              //add condition to add object in most windy day,
              //find top 7 most windy day

              data.mappingData.push({
                time: moment(date).format("DD-MM-YYYY h:mm:ss a"),
                speed: row.w,
                direction: row.h,
                p1: row.p1,
                p25: row.p25,
                p10: row.p10,
              });

              if (row.w > data.mostWindy.speed) {
                data.mostWindy = {
                  time: moment(date).format("DD-MM-YYYY h:mm:ss a"),
                  speed: row.w,
                  direction: row.h,
                  p1: row.p1,
                  p25: row.p25,
                  p10: row.p10,
                };
              }
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

//function to parse existing date string into a valid date object for filter
function parseDate(input) {
  try {
    const [datePart, timePart] = input.split(",");
    const [day, month, year] = datePart.split("/").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);

    const fullYear = 2000 + year;

    return new Date(fullYear, month - 1, day, hour, minute, second);
  } catch (err) {
    console.log("error on this input - ", input);
    console.log(err);
  }
}

//target response object
target = {
  mappingData: [
    {
      time: "21/03/19,09:01:46",
      speeD: 2,
      direction: "SE",
      p1: 30,
      p25: 48,
      p10: 62,
    },
  ],
  //top 7 fastest days only in the given time range
  windyData: [
    {
      day: "monday",
      speed: 2,
      direction: "SE",
    },
  ],
  //windiest Day in the given time range
  mostWindy: {
    day: "monday",
    speed: 2,
    direction: "SE",
  },
};
