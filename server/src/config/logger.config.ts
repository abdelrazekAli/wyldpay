import path from "path";
import winston from "winston";

// Define the log directory
const logDirectory = path.join(__dirname, "../..", "logs");

// Create a Winston logger configuration
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Console transport
    new winston.transports.Console({
      level: "info",
    }),

    // Info level logs
    new winston.transports.File({
      filename: path.join(logDirectory, "info.log"),
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format((info) => {
          if (info.level === "error") return false; // Skip errors
          return info;
        })()
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
