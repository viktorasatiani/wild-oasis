import { z } from "zod";
export const SignUpSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
  userName: z.string().min(3, "Must be at least 3 characters"),
});
