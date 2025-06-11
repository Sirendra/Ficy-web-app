import { createAction, props } from '@ngrx/store';
import { House } from '../../common/interfaces/house.interface';

export const loadHousesByIds = createAction(
  '[Houses] Load Houses By Ids',
  props<{ ids: string[] }>()
);

export const loadHousesSuccess = createAction(
  '[Houses] Load Houses Success',
  props<{ houses: House[] }>()
);

export const loadHousesFailure = createAction(
  '[Houses] Load Houses Failure',
  props<{ error: any }>()
);

export const loadHousesByPagination = createAction(
  '[Houses] Load Houses By Pagination',
  props<{ page: number; pageSize: number }>()
);

export const loadHousesByPaginationSuccess = createAction(
  '[Houses] Load Houses By Pagination Success',
  props<{ houses: House[]; page: number }>()
);

export const loadHousesFromCache = createAction(
  '[Houses] Load Houses From Cache',
  props<{ page: number }>()
);

export const loadHousesFromCacheByIds = createAction(
  '[Houses] Load Houses From Cache By Ids',
  props<{ ids: string[] }>()
);
