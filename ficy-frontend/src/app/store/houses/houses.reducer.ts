import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as HouseActions from './houses.actions';
import { House } from '../../common/interfaces/house.interface';

export interface HousesState extends EntityState<House> {
  pageData: {
    [pageNumber: number]: House[];
  };
  loading: boolean;
  error: any | null;
}

export const houseAdapter = createEntityAdapter<House>({
  selectId: (house) => house.url,
});

export const initialState: HousesState = houseAdapter.getInitialState({
  pageData: {},
  loading: false,
  error: null,
});

export const housesReducer = createReducer(
  initialState,
  on(HouseActions.loadHousesByIds, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(HouseActions.loadHousesSuccess, (state, { houses }) =>
    houseAdapter.upsertMany(houses, { ...state, loading: false, error: null })
  ),
  on(HouseActions.loadHousesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(HouseActions.loadHousesByPagination, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(HouseActions.loadHousesByPaginationSuccess, (state, { houses, page }) => ({
    ...state,
    pageData: {
      ...state.pageData,
      [page]: houses,
    },
    loading: false,
    error: null,
  })),
  on(HouseActions.loadHousesFromCache, (state, { page }) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(HouseActions.loadHousesFromCacheByIds, (state) => ({
    ...state,
    loading: false,
    error: null,
  }))
);
