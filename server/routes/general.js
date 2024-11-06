import express from "express";
import {getUser} from "../controllers/general.js";
import { getDataSenSors } from "../controllers/dataSensor.js";
import { getActionHistorys } from "../controllers/actionHistory.js";
import { saveActionHistory } from "../controllers/actionHistory.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/datasensor", getDataSenSors);
router.get("/actionhistory", getActionHistorys);

//router for post request
router.post("/actionhistory", saveActionHistory);


export default router;