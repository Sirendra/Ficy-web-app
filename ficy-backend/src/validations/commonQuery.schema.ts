import { z } from "zod";

export const paginationSchema = z.object({
  page: z.string().regex(/^\d+$/).optional(),
  limit: z.string().regex(/^\d+$/).optional(),
});

export const searchQuerySchema = z.object({
  keyword: z.string().min(1),
});

export const idParamSchema = z.object({
  id: z.string().min(1, "ID is required"),
});
export const idsParamSchema = z.array(z.string());
