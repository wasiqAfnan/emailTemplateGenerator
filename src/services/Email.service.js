import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { aiClient } from "../configs/ai.config.js";
import constants from "../constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load system prompt from services folder
const systemPrompt = fs.readFileSync(
  path.join(__dirname, "email.system.txt"),
  "utf-8"
);

// console.log(systemPrompt)

export const generateEmailTemplate = async ({
  purpose,
  recipient_name,
  tone,
}) => {
  try {
    const startTime = Date.now();

    const response = await aiClient.responses.create({
      model: constants.OPENAI_API_MODEL,
      input: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Purpose: ${purpose}
                Recipient Name: ${recipient_name}
                Tone: ${tone}`,
        },
      ],
    });

    const endTime = Date.now();

    return {
      email: response.output_text,
      responseTimeMs: endTime - startTime,
    };
  } catch (error) {
    console.log(error);
    throw error; // handled by the controller
  }
};
