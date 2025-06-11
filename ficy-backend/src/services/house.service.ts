import { House } from "../models/house.model";
import { buildRegExpForWord } from "../helpers/helperFunctions";

export const getHouseByUrl = async (url: string) => {
  const house = await House.findOne({ url });
  if (!house) throw new Error("House not found");
  return house;
};

export const getHouseByUrls = async (urls: string[]) => {
  const characters = await House.find({ url: { $in: urls } });
  if (!characters?.length) throw new Error("Character not found");
  return characters;
};

export const getHousesPaginated = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return await House.find().skip(skip).limit(limit);
};

export const searchHouses = async (keyword: string) => {
  const regex = buildRegExpForWord(keyword);

  return await House.find({
    $or: [
      { name: regex },
      { region: regex },
      { coatOfArms: regex },
      { founder: regex },
      { currentLord: regex },
      { titles: regex },
      { playedBy: regex },
    ],
  });
};
