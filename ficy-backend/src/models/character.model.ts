// models/Character.ts
import { Schema, model, Document } from "mongoose";
import { unknown } from "zod";

// 1. Define the TypeScript interface for the Character document
export interface ICharacter {
  url: string;
  name: string;
  gender: string;
  culture: string;
  born: string;
  died: string;
  titles: string[];
  aliases: string[];
  father: string;
  mother: string;
  spouse: string;
  allegiances: string[];
  books: string[];
  povBooks: string[];
  tvSeries: string[];
  playedBy: string[];
}
export type CharacterDocument = ICharacter & Document;

const CharacterSchema = new Schema<CharacterDocument>({
  url: { type: String, required: true },
  name: { type: String, default: "" },
  gender: { type: String, default: "unknown" },
  culture: { type: String, default: "" },
  born: { type: String, default: "" },
  died: { type: String, default: "" },
  titles: { type: [String], default: [] },
  aliases: { type: [String], default: [] },
  father: { type: String, default: "" },
  mother: { type: String, default: "" },
  spouse: { type: String, default: "" },
  allegiances: { type: [String], default: [] },
  books: { type: [String], default: [] },
  povBooks: { type: [String], default: [] },
  tvSeries: { type: [String], default: [] },
  playedBy: { type: [String], default: [] },
});

export const Character = model<CharacterDocument>("Character", CharacterSchema);
