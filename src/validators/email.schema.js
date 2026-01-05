import { z } from "zod";

const nonNumericString = z
  .string()
  .transform((val) => val.trim())
  .refine((val) => val.length > 0, {
    message: "Field cannot be empty",
  })
  .refine((val) => !/^[0-9]+$/.test(val), {
    message: "Field cannot be only numbers",
  });

export const emailRequestSchema = z.object({
  purpose: nonNumericString,
  recipient_name: nonNumericString,
  tone: nonNumericString.transform((val) => val.toLowerCase()),
});
