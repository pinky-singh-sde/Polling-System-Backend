import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import http from "http";

import { Server } from "socket.io";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import nomineeRoutes from "./routes/nominee.routes.js";
import voteRoutes from "./routes/vote.routes.js";

import seedDatabase from "./seeders/seed.js";

import setupSocket from "./sockets/socket.js";

dotenv.config();

const app = express();

const server = http.createServer(app);

const CLIENT_URL =
  "https://polling-system-frontend-pi.vercel.app";

// EXPORT IO
export const io = new Server(server, {
   cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },

  transports: ["websocket", "polling"],
});

// SOCKET SETUP
setupSocket(io);

// MIDDLEWARES
app.use( cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }));

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/nominees", nomineeRoutes);

app.use("/api/vote", voteRoutes);

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Polling Server Running...");
});

const PORT = process.env.PORT || 5000;

// START SERVER
const startServer = async () => {
  try {
    await connectDB();

    await seedDatabase();

    server.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

startServer();