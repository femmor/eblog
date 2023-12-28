import express from "express";
import { getImageUploadUrl } from "../../controllers/post/index.js";

const router = express.Router();

router.get("/image-upload-url", getImageUploadUrl);

export default router;
