// models/Book.ts

import { Document, Schema, model } from "mongoose";

export interface IBook {
  url: string;
  name: string;
  isbn: string;
  authors: string[];
  numberOfPages: number;
  publisher: string;
  country: string;
  mediaType: string;
  released: Date;
  characters: string[];
  povCharacters: string[];
}

export type BookDocument = IBook & Document;

const BookSchema = new Schema<BookDocument>({
  url: { type: String, required: true },
  name: { type: String, default: "" },
  isbn: { type: String, default: "" },
  authors: { type: [String], default: [] },
  numberOfPages: { type: Number },
  publisher: { type: String, default: "" },
  country: { type: String, default: "" },
  mediaType: { type: String, default: "" },
  released: { type: Date },
  characters: { type: [String], default: [] },
  povCharacters: { type: [String], default: [] },
});

export const Book = model<BookDocument>("Book", BookSchema);
