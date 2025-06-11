import { createAction, props } from '@ngrx/store';
import { Character } from '../../common/interfaces/character.interface';

export const loadCharactersByIds = createAction(
  '[Characters] Load Characters By Ids',
  props<{ ids: string[] }>()
);

export const loadCharactersSuccess = createAction(
  '[Characters] Load Characters Success',
  props<{ characters: Character[] }>()
);

export const loadCharactersFailure = createAction(
  '[Characters] Load Characters Failure',
  props<{ error: any }>()
);

export const loadCharactersByPagination = createAction(
  '[Characters] Load Characters By Pagination',
  props<{ page: number; pageSize: number }>()
);

export const loadCharactersByPaginationSuccess = createAction(
  '[Characters] Load Characters By Pagination Success',
  props<{ characters: Character[]; page: number }>()
);

export const loadCharactersFromCache = createAction(
  '[Characters] Load Characters From Cache',
  props<{ page: number }>()
);

export const loadCharactersFromCacheByIds = createAction(
  '[Characters] Load Characters From Cache By Ids',
  props<{ ids: string[] }>()
);
