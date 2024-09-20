import path from "path";
import winston from "winston";

// Define the log directory
const logDirectory = path.join(__dirname, "../..", "logs");

// Create a Winston logger with separate transports for each log level
const logger = winston.createLogger({
  level: "info", // Default log level for the logger
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Console transport
    new winston.transports.Console({
      level: "info", // Only show logs of level 'info' and higher
    }),

    // Info level logs
    new winston.transports.File({
      filename: path.join(logDirectory, "info.log"),
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),

    // Error level logs
    new winston.transports.File({
      filename: path.join(logDirectory, "error.log"),
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

export default logger;
