import { CardDataType } from '../enums/card-data-type.enum';

export const urls = {
  [CardDataType.HOUSE]: 'https://anapioficeandfire.com/api/houses/',
  [CardDataType.CHARACTER]: 'https://anapioficeandfire.com/api/characters/',
  [CardDataType.BOOK]: 'https://anapioficeandfire.com/api/books/',
};

export const constructUrlByIds = (
  ids: number[],
  type: CardDataType
): string[] => ids.map((id) => `${urls[type]}${id}`);
