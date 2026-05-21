
import type { Request, Response } from "express";

import bcrypt from "bcryptjs";

import Admin from "../models/Admin.js";

import generateToken from "../utils/generateToken.js";

export const loginAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const { username, password } = req.body;

    // CHECK REQUIRED FIELDS
    if (!username || !password) {
      res.status(400).json({
        message: "Username and password are required",
      });

      return;
    }

    // FIND ADMIN
    const admin = await Admin.findOne({ username });

    if (!admin) {
      res.status(401).json({
        message: "Invalid credentials",
      });

      return;
    }

    // CHECK PASSWORD
    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordCorrect) {
      res.status(401).json({
        message: "Invalid credentials",
      });

      return;
    }

    // GENERATE TOKEN
    const token = generateToken(admin._id.toString());

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
    });
  }
};