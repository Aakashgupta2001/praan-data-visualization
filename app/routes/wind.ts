import { Router } from "express";
import multer from "multer";
import * as windController from "../controller/wind";
import * as auth from "../middlewares/auth";

const router = Router();

// For uploading excel file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes for wind API's with middleware to verify JWT token
router.get("/", auth.verifyToken, windController.dashboard);
router.get("/pdata", auth.verifyToken, windController.pdata);
router.get("/device", auth.verifyToken, windController.perDeviceData);
router.post("/migrate", auth.verifyToken, upload.single("file"), windController.migrate);

export default router;
