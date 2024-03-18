import { z } from "zod";

export function getSchema(isSignupForm: boolean, isRegistration: boolean) {
  let schema = z.object({
    email: z
      .string()
      .email("Invalid Email")
      .max(30, "Email too long")
      .min(6, "Email too short"),
    password: z
      .string()
      .max(20, "Password too long")
      .min(6, "Password too short"),
  });

  if (isRegistration) {
    schema = z.object({
      email: z
        .string()
        .email("Invalid Email")
        .max(30, "Email too long")
        .min(6, "Email too short"),
      password: z
        .string()
        .max(20, "Password too long")
        .min(6, "Password too short"),
      name: z.string().max(20, "Name too long").min(6, "Name too short"),
      shop_name: z.string().max(30, "Name too long").min(6, "Name too short"),
      shop_desc: z.string().max(100, "Name too long"),
    });
  }
  if (isSignupForm) {
    schema = z.object({
      email: z
        .string()
        .email("Invalid Email")
        .max(30, "Email too long")
        .min(6, "Email too short"),
      password: z
        .string()
        .max(20, "Password too long")
        .min(6, "Password too short"),
      name: z.string().max(20, "Name too long").min(6, "Name too short"),
    });
  }

  return schema;
}
