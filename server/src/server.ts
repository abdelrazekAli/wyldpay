import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import allRoutes from "./routes";
import connect from "./utils/connection";
import express, { Application } from "express";

// Initialize Express app
const app: Application = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// API routes
app.use("/api/v1", allRoutes);

// Serve static files for production
app.use(express.static("./client/build"));
app.get("*", (req, res) => {
  res.sendFile("index.html", {
    root: __dirname + "/client/build",
  });
});

// Start server
const port = process.env.PORT || 8000;
app.listen(port, async () => {
  console.log("listening on the port", port);
  await connect();
});

export default app; // Export app to use in testing
