import express from "express";
import dotenv from "dotenv";
import connectDB from "./connectDb.js";
import authRoutes from "./routes/auth/index.js";
import morgan from "morgan";
import cors from "cors";
import admin from "firebase-admin";
import serviceAccountKey from "./eblog-c9db6-firebase-adminsdk-y3ld0-2ee4640f9e.json" assert { type: "json" };

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 3001;

// Initialize firebase service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
