import { z } from "zod";
export const loginValidationObject = {
  email: z.preprocess(
    (val: any) => {
      if (typeof val === "string") return val.trim();
      return val;
    },
    z
      .string({
        required_error: "Email is required",
      })
      .nonempty("Email is required")
  ),

  password: z.preprocess(
    (val: any) => {
      if (typeof val === "string") return val.trim();
      return val;
    },
    z
      .string({
        required_error: "Password is required",
      })
      .nonempty("Password is required")
  ),
};

export const loginUserSchema = z.object(loginValidationObject);

export type LoginUserSchemaType = z.infer<typeof loginUserSchema>;
