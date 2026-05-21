import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const protectAdmin: RequestHandler = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string);

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default protectAdmin;