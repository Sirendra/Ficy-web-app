import { Book } from "../models/book.model";
import { buildRegExpForWord } from "../helpers/helperFunctions";

export const getBookByUrl = async (url: string) => {
  const book = await Book.findOne({ url });
  if (!book) throw new Error("Book not found");
  return book;
};

export const getBooksPaginated = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return await Book.find().skip(skip).limit(limit);
};

export const searchBooks = async (keyword: string) => {
  const regex = buildRegExpForWord(keyword);

  return await Book.find({
    $or: [
      { name: regex },
      { isbn: regex },
      { publisher: regex },
      { country: regex },
      { mediaType: regex },
      { authors: regex },
    ],
  });
};

export const getBookByUrls = async (urls: string[]) => {
  const characters = await Book.find({ url: { $in: urls } });
  if (!characters?.length) throw new Error("Character not found");
  return characters;
};
