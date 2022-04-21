import express from "express";
import auth from "../middleware/auth.js";
/** import controllers **/

import {
  getDealsBySearch,
  getDeal,
  getDeals,
  commentDeal,
  createDeal,
  updateDeal,
  deleteDeal,
  likeDeal,
} from "../controllers/deals.js";

const router = express.Router();

router.get("/search", getDealsBySearch);
router.get("/", getDeals);
router.get("/:id", getDeal);
router.post("/", createDeal);
router.patch("/:id", auth, updateDeal);
router.delete("/:id", auth, deleteDeal);
router.patch("/:id/likeDeal", auth, likeDeal);
router.post("/:id/commentDeal", auth, commentDeal);

export default router;
