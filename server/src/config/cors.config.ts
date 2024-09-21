const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || [];

export const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "auth-token"],
  credentials: true,
};
