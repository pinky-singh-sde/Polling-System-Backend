import express from "express";

import { getNominees } from "../controllers/nominee.controller.js";

const router = express.Router();

router.get("/", getNominees);

export default router;