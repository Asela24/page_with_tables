import { z } from "zod";

export const usernameSchema = z
  .string({ required_error: "Username is required" })
  .regex(/^(user|User)\d+$/, "Username should follow the pattern UserNumber");

export const passwordSchema = z
  .string({ required_error: "Password is required" })
  .regex(/^[a-zA-Z]+$/, "Password must contain only Latin letters");

export const loginFormSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});
