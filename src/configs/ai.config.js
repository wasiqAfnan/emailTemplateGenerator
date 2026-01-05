import OpenAI from "openai";
import constants from "../constants.js";

export const aiClient = new OpenAI({
  apiKey: constants.OPENAI_API_KEY,
});