import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { aiClient } from "../config/ai.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const systemPrompt = fs.readFileSync(
  path.join(__dirname, "../prompts/email.system.txt"),
  "utf-8"
);

export const generateEmailFromAI = async ({
  purpose,
  recipient_name,
  tone,
}) => {
  const startTime = Date.now();

  const response = await aiClient.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
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
    email: response.choices[0].message.content.trim(),
    responseTimeMs: endTime - startTime,
  };
};
