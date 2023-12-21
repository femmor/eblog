import express from "express";
import dotenv from "dotenv";
import connectDB from "./connectDb.js";
import authRoutes from "./routes/auth/index.js";
import morgan from "morgan";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
