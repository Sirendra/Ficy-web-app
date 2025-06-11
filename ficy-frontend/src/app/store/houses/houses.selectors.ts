import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HousesState, houseAdapter } from './houses.reducer';
import { House } from '../../common/interfaces/house.interface';

export const selectHousesState = createFeatureSelector<HousesState>('houses');

const { selectEntities } = houseAdapter.getSelectors(selectHousesState);

export const selectHouseEntities = selectEntities;

export const selectHousesLoading = createSelector(
  selectHousesState,
  (state) => state.loading
);

export const selectHousesError = createSelector(
  selectHousesState,
  (state) => state.error
);

export const selectHouseIds = createSelector(
  selectHousesState,
  (state): string[] => {
    const fromIds = state.ids as string[];
    const fromPageData = Object.values(state.pageData)
      .flat()
      .map((char) => char.url);
    const uniqueIds = new Set([...fromIds, ...fromPageData]);
    return Array.from(uniqueIds);
  }
);

export const selectLoadedHouseIds = selectHouseIds;

export const selectHousesByCurrentPage = (page: number) =>
  createSelector(selectHousesState, (state) => state.pageData[page] || []);

export const selectAllHouses = createSelector(selectHousesState, (state) =>
  Object.values(state.pageData).flat()
);

export const selectAllHousesMerged = createSelector(
  selectHouseEntities,
  selectAllHouses,
  (entities, paged) => {
    const map = new Map<string, (typeof paged)[0]>();
    Object.values(entities).forEach((char) => {
      if (char) {
        map.set(char.url, char);
      }
    });
    paged.forEach((char) => map.set(char.url, char));
    return map;
  }
);

export const selectMultipleHousesByIds = (ids: string[]) =>
  createSelector(selectAllHousesMerged, (entities) =>
    ids
      .map((id) => entities.get(id))
      .filter((char): char is House => char !== undefined)
  );

export const selectFilteredHousesByIdsAndSearch = (
  ids: string[],
  searchTerm: string
) =>
  createSelector(selectAllHousesMerged, (houses) => {
    const lowerSearch = searchTerm.trim().toLowerCase();
    return ids
      .map((id) => houses.get(id))
      .filter((char): char is House => char !== undefined)
      .filter(
        (char) =>
          char!.name?.toLowerCase().includes(lowerSearch) ||
          char!.founded?.toLowerCase().includes(lowerSearch) ||
          char!.founded?.toLowerCase().includes(lowerSearch) ||
          char!.coatOfArms?.toLowerCase().includes(lowerSearch) ||
          char!.titles?.some((alias: string) =>
            alias.toLowerCase().includes(lowerSearch)
          ) ||
          char!.seats?.some((alias: string) =>
            alias.toLowerCase().includes(lowerSearch)
          )
      );
  });
