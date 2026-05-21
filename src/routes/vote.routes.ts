import express from "express";

import {
  submitVote,
  getResults,
} from "../controllers/vote.controller.js";

const router = express.Router();

router.post("/", submitVote);

router.get("/results", getResults);

export default router;