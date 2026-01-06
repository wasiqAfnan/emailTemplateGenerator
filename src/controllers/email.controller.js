import { generateEmailTemplate } from "../services/Email.service.js";
import { emailRequestSchema } from "../middlewares/email.schema.js";
import { ZodError } from "zod";
import { log } from "../utils/logger.js";

export const generateEmail = async (req, res) => {
  try {
    // Zod validation
    const parsedData = emailRequestSchema.parse(req.body);

    const result = await generateEmailTemplate(parsedData);

    const responsePayload = {
      success: true,
      data: result,
    };

    // Log the response
    log("info", "Response sent", {
      statusCode: 200,
      aiResponseTimeMs: result.responseTimeMs,
      response: responsePayload
    });

    // Return the response
    return res.status(200).json(responsePayload);
  } catch (error) {
    // Handle Zod validation errors FIRST
    if (error instanceof ZodError) {
      log("error", "Validation failed", {
        issues: error.issues.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      });

      return res.status(400).json({
        success: false,
        errors: error.issues.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }

    // Log non-validation errors
    log("error", "Email generation failed", {
      error: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Failed to generate email",
    });
  }
};
