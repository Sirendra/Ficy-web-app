import { GenericResponse } from "../interfaces/genericReponse.interface";

export const buildResponseJson = (response: GenericResponse<any>) => ({
  message: response.message,
  ...(response.data && { data: response.data }),
  ...(response.error && { error: response.error }),
});

export const buildRegExpForWord = (keyword: string) => new RegExp(keyword, "i");

export const buildRegExpForExactIgnoreCase = (keyword: string) =>
  new RegExp(`^${keyword}$`, "i");

export const capitalizeSmart = (str: string) => {
  if (!str) return "";

  return str
    .split(/([\s'-])/g)
    .map((part) =>
      /^[a-zA-Z]/.test(part)
        ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        : part
    )
    .join("");
};
