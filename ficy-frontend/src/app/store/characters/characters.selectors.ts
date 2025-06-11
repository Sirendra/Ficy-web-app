import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharactersState, characterAdapter } from './characters.reducer';
import { Character } from '../../common/interfaces/character.interface';

export const selectCharactersState =
  createFeatureSelector<CharactersState>('characters');

const { selectEntities } = characterAdapter.getSelectors(selectCharactersState);
export const selectCharacterEntities = selectEntities;

export const selectAllCharacterIds = createSelector(
  selectCharactersState,
  (state): string[] => {
    const fromIds = state.ids as string[];
    const fromPageData = Object.values(state.pageData)
      .flat()
      .map((char) => char.url);
    const uniqueIds = new Set([...fromIds, ...fromPageData]);
    return Array.from(uniqueIds);
  }
);

export const selectLoadedCharacterIds = selectAllCharacterIds;

export const selectCharactersLoading = createSelector(
  selectCharactersState,
  (state) => state.loading
);

export const selectCharactersError = createSelector(
  selectCharactersState,
  (state) => state.error
);

export const selectCharactersByCurrentPage = (page: number) =>
  createSelector(selectCharactersState, (state) => state.pageData[page] || []);

export const selectAllCharacters = createSelector(
  selectCharactersState,
  (state) => Object.values(state.pageData).flat()
);

export const selectAllCharactersMerged = createSelector(
  selectCharacterEntities,
  selectAllCharacters,
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

export const selectMultipleCharactersByIds = (ids: string[]) =>
  createSelector(selectAllCharactersMerged, (entities) =>
    ids
      .map((id) => entities.get(id))
      .filter((char): char is Character => char !== undefined)
  );

export const selectFilteredCharactersByIdsAndSearch = (
  ids: string[],
  searchTerm: string
) =>
  createSelector(selectAllCharactersMerged, (characters) => {
    const lowerSearch = searchTerm.trim().toLowerCase();
    return ids
      .map((id) => characters.get(id))
      .filter((char): char is Character => char !== undefined)
      .filter(
        (char) =>
          char!.name?.toLowerCase().includes(lowerSearch) ||
          char!.gender?.toLowerCase().includes(lowerSearch) ||
          char!.aliases?.some((alias: string) =>
            alias.toLowerCase().includes(lowerSearch)
          )
      );
  });
