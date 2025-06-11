import { z } from "zod";
import { loginValidationObject } from "./loginUser.schema";

export const registerUserSchema = z.object({
  ...loginValidationObject,
  fullName: z.preprocess(
    (val: any) => {
      if (typeof val === "string") return val.trim();
      return val;
    },
    z
      .string({
        required_error: "Full name is required",
      })
      .nonempty("Full name is required")
  ),
});

export type RegisterUserSchemaType = z.infer<typeof registerUserSchema>;
