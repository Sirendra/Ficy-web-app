import { Request, Response } from "express";
import * as bookService from "../services/book.service";
import {
  paginationSchema,
  searchQuerySchema,
  idParamSchema,
  idsParamSchema,
} from "../validations/commonQuery.schema";
import { buildResponseJson } from "../helpers/helperFunctions";

export const getById = async (req: Request, res: Response): Promise<any> => {
  const parse = idParamSchema.safeParse(req.params);
  if (!parse.success)
    return res.status(400).json({ message: parse.error.errors[0].message });

  try {
    const book = await bookService.getBookByUrl(parse.data.id);
    res
      .status(200)
      .json(buildResponseJson({ status: 200, message: "Success", data: book }));
  } catch (e: any) {
    res.status(404).json({ message: e.message });
  }
};

export const getPaginated = async (
  req: Request,
  res: Response
): Promise<any> => {
  const parse = paginationSchema.safeParse(req.query);
  if (!parse.success)
    return res.status(400).json({ message: parse.error.errors[0].message });

  const { page = "1", limit = "12" } = parse.data;
  const data = await bookService.getBooksPaginated(Number(page), Number(limit));
  res
    .status(200)
    .json(buildResponseJson({ status: 200, message: "Success", data }));
};

export const search = async (req: Request, res: Response): Promise<any> => {
  const parse = searchQuerySchema.safeParse(req.query);
  if (!parse.success)
    return res.status(400).json({ message: parse.error.errors[0].message });

  const data = await bookService.searchBooks(parse.data.keyword);
  res
    .status(200)
    .json(buildResponseJson({ status: 200, message: "Success", data }));
};

export const getByIds = async (req: Request, res: Response): Promise<any> => {
  const parse = idsParamSchema.safeParse(req.body?.ids);
  if (!parse.success)
    return res.status(400).json({ message: parse.error.errors[0].message });

  try {
    const book = await bookService.getBookByUrls(parse.data);
    res
      .status(200)
      .json(buildResponseJson({ status: 200, message: "Success", data: book }));
  } catch (e: any) {
    res.status(404).json({ message: e.message });
  }
};
