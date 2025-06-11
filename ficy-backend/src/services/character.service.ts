import { Character } from "../models/character.model";
import { buildRegExpForWord } from "../helpers/helperFunctions";

export const getCharacterByUrl = async (url: string) => {
  const character = await Character.findOne({ url });
  if (!character) throw new Error("Character not found");
  return character;
};

export const getCharacterByUrls = async (urls: string[]) => {
  const characters = await Character.find({ url: { $in: urls } });
  if (!characters?.length) throw new Error("Character not found");
  return characters;
};

export const getCharactersPaginated = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return await Character.find().skip(skip).limit(limit);
};

export const searchCharacters = async (keyword: string) => {
  const regex = buildRegExpForWord(keyword);

  return await Character.find({
    $or: [
      { name: regex },
      { gender: regex },
      { culture: regex },
      { aliases: regex },
      { father: regex },
      { mother: regex },
      { playedBy: regex },
    ],
  });
};
