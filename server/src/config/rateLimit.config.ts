import rateLimit from "express-rate-limit";

// General rate limiter (for most routes)
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
  message: "Too many requests from this IP, please try again after 15 minutes",
});

// Authentication-specific rate limiter (for auth routes)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 login attempts
  message: "Too many login attempts. Please try again later.",
});

// Email-specific rate limiter (for email actions like password resets)
export const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // limit each IP to 5 email sends per hour
  message: "Too many email requests. Please try again after an hour.",
});
