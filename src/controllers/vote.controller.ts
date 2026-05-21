import type { Request, Response } from "express";

import Vote from "../models/Vote.js";
import Nominee from "../models/Nominee.js";

import { io } from "../server.js";

export const submitVote = async (
  req: Request,
  res: Response
) => {
  try {
    const { nomineeId, sessionId } = req.body;

    // CHECK REQUIRED FIELDS
    if (!nomineeId || !sessionId) {
      res.status(400).json({
        message: "Missing required fields",
      });

      return;
    }

    // CHECK IF USER ALREADY VOTED
    const existingVote = await Vote.findOne({
      sessionId,
    });

    if (existingVote) {
      res.status(400).json({
        message: "You have already voted",
      });

      return;
    }

    // CHECK NOMINEE EXISTS
    const nominee = await Nominee.findById(
      nomineeId
    );

    if (!nominee) {
      res.status(404).json({
        message: "Nominee not found",
      });

      return;
    }

    // SAVE VOTE
    await Vote.create({
      nomineeId,
      sessionId,
    });

    // INCREMENT VOTE COUNT
    nominee.votes += 1;

    await nominee.save();

    // EMIT REALTIME EVENT
    io.emit("voteUpdated");

    res.status(200).json({
      message: "Vote submitted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to submit vote",
    });
  }
};

export const getResults = async (
  req: Request,
  res: Response
) => {
  try {
    const nominees = await Nominee.find();

    const totalVotes = nominees.reduce(
      (acc, nominee) => acc + nominee.votes,
      0
    );

    res.status(200).json({
      totalVotes,
      nominees,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch results",
    });
  }
};