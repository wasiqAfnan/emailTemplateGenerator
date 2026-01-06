import { z } from "zod";

const nonNumericString = z
  .string()
  .transform((val) => val.trim())
  .refine((val) => val.length > 0, {
    message: "Field cannot be empty",
  })
  .refine((val) => !/^[0-9]+$/.test(val), {
    message: "Field cannot be only numbers",
  })
  .refine((val) => val.length <= 500, {
    message: "Field cannot exceed 500 characters",
  });

export const emailRequestSchema = z.object({
  purpose: nonNumericString,
  recipient_name: nonNumericString.refine((val) => val.length <= 50, {
    message: "Recipient name cannot exceed 50 characters",
  }),
  tone: nonNumericString.transform((val) => val.toLowerCase()),
});
