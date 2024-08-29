import express from "express"
import details from "../controllers/profile.controller.js";
import { upload } from "../middleware/multer.js";
import protectedRoutes from "../middleware/protectedRoutes.js"

const router = express.Router();

router.use(protectedRoutes);

router.post("/", upload.single('resume'), details);

export default router;