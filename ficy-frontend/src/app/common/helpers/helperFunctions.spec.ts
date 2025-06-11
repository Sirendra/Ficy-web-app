import { CardDataType } from '../enums/card-data-type.enum';
import { getThreeUniqueRandomNumbers } from './random.helper';
import { extractDataFromResponse } from './response.helper';
import { constructUrlByIds } from './url.helper';

describe('all helpers func', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return exactly 3 unique numbers within the specified range', () => {
    const result = getThreeUniqueRandomNumbers(10);
    expect(result).toHaveLength(3);
    expect(new Set(result).size).toBe(3);
    result.forEach((num) => expect(num).toBeGreaterThanOrEqual(1));
    result.forEach((num) => expect(num).toBeLessThanOrEqual(10));
  });
  it('should return the data property from the response', () => {
    const response = { data: { id: 1, name: 'Test' } };
    const result = extractDataFromResponse(response as any);
    expect(result).toEqual({ id: 1, name: 'Test' });
  });

  it('should return undefined if data is not present', () => {
    const response = {};
    const result = extractDataFromResponse(response as any);
    expect(result).toBeUndefined();
  });

  it('should construct correct URLs for given IDs and data type', () => {
    const ids = [1, 2, 3];
    const type = CardDataType.HOUSE;
    const result = constructUrlByIds(ids, type);
    expect(result).toEqual([
      'https://anapioficeandfire.com/api/houses/1',
      'https://anapioficeandfire.com/api/houses/2',
      'https://anapioficeandfire.com/api/houses/3',
    ]);
  });

  it('should handle empty ID array gracefully', () => {
    const ids: number[] = [];
    const type = CardDataType.CHARACTER;
    const result = constructUrlByIds(ids, type);
    expect(result).toEqual([]);
  });
});
