import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as CharacterActions from './characters.actions';
import { Character } from '../../common/interfaces/character.interface';

export interface CharactersState extends EntityState<Character> {
  pageData: {
    [pageNumber: number]: Character[];
  };
  loading: boolean;
  error: any | null;
}

export const characterAdapter = createEntityAdapter<Character>({
  selectId: (char) => char.url,
});

export const initialState: CharactersState = characterAdapter.getInitialState({
  pageData: {},
  loading: false,
  error: null,
});

export const charactersReducer = createReducer(
  initialState,
  on(CharacterActions.loadCharactersByIds, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CharacterActions.loadCharactersByPagination, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CharacterActions.loadCharactersSuccess, (state, { characters }) =>
    characterAdapter.upsertMany(characters, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(CharacterActions.loadCharactersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(
    CharacterActions.loadCharactersByPaginationSuccess,
    (state, { characters, page }) => ({
      ...state,
      pageData: {
        ...state.pageData,
        [page]: characters,
      },
      loading: false,
      error: null,
    })
  ),
  on(CharacterActions.loadCharactersFromCache, (state, { page }) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(CharacterActions.loadCharactersFromCacheByIds, (state) => ({
    ...state,
    loading: false,
    error: null,
  }))
);
