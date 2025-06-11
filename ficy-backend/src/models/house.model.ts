// models/House.ts

import { Document, Schema, model } from "mongoose";

export interface IHouse {
  url: string;
  name: string;
  region: string;
  coatOfArms: string;
  words: string;
  titles: string[];
  seats: string[];
  currentLord: string; // URL of character
  heir: string;
  overlord: string;
  founded: string;
  founder: string;
  diedOut: string;
  ancestralWeapons: string[];
  cadetBranches: string[]; // URLs of house branches
  swornMembers: string[]; // URLs of characters
}
export type HouseDocument = IHouse & Document;

const HouseSchema = new Schema<HouseDocument>({
  url: { type: String, required: true },
  name: { type: String, required: true },
  region: { type: String, required: true },
  coatOfArms: { type: String, required: true },
  words: { type: String, default: "" },
  titles: { type: [String], default: [] },
  seats: { type: [String], default: [] },
  currentLord: { type: String, default: "" },
  heir: { type: String, default: "" },
  overlord: { type: String, default: "" },
  founded: { type: String, default: "" },
  founder: { type: String, default: "" },
  diedOut: { type: String, default: "" },
  ancestralWeapons: { type: [String], default: [] },
  cadetBranches: { type: [String], default: [] },
  swornMembers: { type: [String], default: [] },
});

export const House = model<HouseDocument>("Houses", HouseSchema);
