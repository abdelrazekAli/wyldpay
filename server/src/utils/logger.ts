import winston from "winston";
import path from "path";

// Define the log directory
const logDirectory = path.join(__dirname, "../..", "logs");

// Create a Winston logger with separate transports for each log level
const logger = winston.createLogger({
  level: "info", // Default log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Console transport
    new winston.transports.Console(),

    // Info level logs
    new winston.transports.File({
      filename: path.join(logDirectory, "info.log"),
      level: "info",
    }),

    // Error level logs
    new winston.transports.File({
      filename: path.join(logDirectory, "error.log"),
      level: "error",
    }),

    // Warning level logs
    new winston.transports.File({
      filename: path.join(logDirectory, "warn.log"),
      level: "warn",
    }),
  ],
});

export default logger;
