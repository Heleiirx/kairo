const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:8080",
  "https://kairo-self.vercel.app",
  "https://vercel.com/heleiirxs-projects/kairo/7wUJ1VxPbPvcrbBMQxC8VYgjTJTU",
];

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
