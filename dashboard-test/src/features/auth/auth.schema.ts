import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").nonempty("Please Enter your username"),
  password: z.string().min(4, "Password must be at least 4 characters").nonempty("Please Enter your password"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
