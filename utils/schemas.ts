import { z } from "zod";
export const SignUpSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
  userName: z.string().min(3, "Must be at least 3 characters"),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

export const UpdateDataSchema = z.object({
  userName: z.string().min(3, "Must be at least 3 characters").optional(),
  email: z.string().email("Invalid email").optional(),
  avatar: z.instanceof(File).optional(),
});

export const ChangePasswordSchema = z.object({
  newPassword: z.string().min(8, "Must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Must be at least 8 characters"),
});
