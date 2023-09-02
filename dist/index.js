"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// Configuring env variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// Allowing cross URL requests
app.use((0, cors_1.default)());
// Routes (assuming you have default export for your routes in "./app/routes")
// If it's not a default export, adjust accordingly (e.g., `import * as routes from "./app/routes"`)
const routes_1 = __importDefault(require("./routes"));
(0, routes_1.default)(app);
// Connecting to MongoDB
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => {
    console.log("Connected To Mongo");
})
    .catch((error) => {
    console.log(error);
});
// Starting server
const port = process.env.PORT || 3001;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`Server is running on port ${port}`);
    }
});
