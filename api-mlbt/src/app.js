import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { healthRoutes } from "./routes/health.routes.js";
import { notFoundHandler } from "./middlewares/not-found.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "API MLBT disponible",
    project: "MLBT Project - Maria La Bonita Taqueria",
    evidence: "GA7-220501096-AA5-EV03",
    endpoints: {
      health: "/api/health"
    }
  });
});

app.use("/api/health", healthRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
