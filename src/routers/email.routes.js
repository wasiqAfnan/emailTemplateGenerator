import { Router } from "express";
import {generateEmail} from "../controllers/email.controller.js";

const emailRoutes = Router();

/**
 * POST /api/email/generate
 * Body: { purpose, recipient_name, tone }
 */
emailRoutes.post("/generate", generateEmail);

export default emailRoutes;