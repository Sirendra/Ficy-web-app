import { housesReducer, initialState, HousesState } from './houses.reducer';
import * as HouseActions from './houses.actions';

describe('Houses Reducer', () => {
  const sampleHouses: any[] = [{ url: 'url1' }, { url: 'url2' }];

  it('should return the initial state', () => {
    const state = housesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  describe('loadHousesByIds', () => {
    it('should set loading to true and clear error', () => {
      const newState = housesReducer(
        initialState,
        HouseActions.loadHousesByIds({ ids: ['1'] })
      );
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });
  });

  describe('loadHousesSuccess', () => {
    it('should upsert houses and set loading false', () => {
      const prevState: HousesState = {
        ...initialState,
        loading: true,
      };
      const newState = housesReducer(
        prevState,
        HouseActions.loadHousesSuccess({ houses: sampleHouses })
      );
      expect(newState.loading).toBe(false);
      expect(newState.entities).toBeDefined();
      expect(Object.keys(newState.entities)).toHaveLength(sampleHouses.length);
    });
  });

  describe('loadHousesFailure', () => {
    it('should set loading false and store error', () => {
      const error = new Error('Error loading');
      const newState = housesReducer(
        initialState,
        HouseActions.loadHousesFailure({ error })
      );
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(error);
    });
  });

  describe('loadHousesByPagination', () => {
    it('should set loading true and clear error', () => {
      const newState = housesReducer(
        initialState,
        HouseActions.loadHousesByPagination({ page: 1, pageSize: 10 })
      );
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });
  });

  describe('loadHousesByPaginationSuccess', () => {
    it('should update pageData with new houses, set loading false', () => {
      const housesPage = [{ url: 'url3' }, { url: 'url4' }];
      const page = 2;

      const newState = housesReducer(
        initialState,
        HouseActions.loadHousesByPaginationSuccess({
          houses: housesPage as any,
          page,
        })
      );
      expect(newState.loading).toBe(false);
      expect(newState.pageData[page]).toEqual(housesPage);
    });
  });

  describe('loadHousesFromCache', () => {
    it('should set loading false and clear error', () => {
      const newState = housesReducer(
        { ...initialState, loading: true },
        HouseActions.loadHousesFromCache({ page: 1 })
      );
      expect(newState.loading).toBe(false);
    });
  });

  describe('loadHousesFromCacheByIds', () => {
    it('should set loading false and clear error', () => {
      const newState = housesReducer(
        { ...initialState, loading: true },
        HouseActions.loadHousesFromCacheByIds({ ids: ['1'] })
      );
      expect(newState.loading).toBe(false);
    });
  });
});
