import { z } from "zod";
export const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  name: z
    .string()
    .min(4, { message: "Please add a name with at least 4 characters" }),
});
