import express from "express";
import auth from "../middleware/auth.js";
/** import controllers **/

import {
  getDeals,
  createDeal,
 
} from "../controllers/deals.js";

const router = express.Router();


router.get("/", getDeals);
router.post("/", createDeal);


export default router;
