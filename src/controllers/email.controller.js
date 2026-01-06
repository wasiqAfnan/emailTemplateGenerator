import { generateEmailTemplate } from "../services/Email.service.js";
import { emailRequestSchema } from "../validators/email.schema.js";

export const generateEmail = async (req, res) => {
  try {
    // Zod validation
    const parsedData = emailRequestSchema.parse(req.body);

    const result = await generateEmailTemplate(parsedData);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    // Zod validation error
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        errors: error.errors.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }

    console.log("Email generation error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to generate email",
    });
  }
};
