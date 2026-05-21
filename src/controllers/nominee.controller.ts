import type { Request, Response } from "express";

import Nominee from "../models/Nominee.js";

export const getNominees = async (
  req: Request,
  res: Response
) => {
  try {
    const nominees = await Nominee.find();

    res.status(200).json(nominees);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch nominees",
    });
  }
};