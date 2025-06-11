import { of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { HousesEffects } from './houses.effects';
import * as HouseActions from './houses.actions';
import { Store } from '@ngrx/store';
import { HousesService } from '../../shared/services/houses.service';

describe('HousesEffects', () => {
  let actions$: any;
  let effects: HousesEffects;
  let storeMock: Partial<Store>;
  let housesServiceMock: Partial<HousesService>;

  beforeEach(() => {
    actions$ = null;

    storeMock = {
      select: jest.fn(),
    };

    housesServiceMock = {
      getHousesByIds: jest.fn(),
      getHousesByPagination: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        HousesEffects,
        { provide: Store, useValue: storeMock },
        { provide: HousesService, useValue: housesServiceMock },
      ],
    });

    effects = TestBed.inject(HousesEffects);
  });

  describe('loadHousesByIds$', () => {
    it('should dispatch loadHousesFromCacheByIds when all IDs are loaded', () => {
      const ids = ['1', '2'];
      const action = HouseActions.loadHousesByIds({ ids });
      const loadedIds = ['1', '2'];

      storeMock.select = jest.fn(() => of(loadedIds));

      actions$ = of(action);

      const expectedAction = HouseActions.loadHousesFromCacheByIds({ ids });

      effects.loadHousesByIds$.subscribe((result) => {
        expect(result).toEqual(expectedAction);
      });
    });

    it('should fetch missing houses by IDs and dispatch success', () => {
      const ids = ['1', '2', '3'];
      const action = HouseActions.loadHousesByIds({ ids });
      const loadedIds = ['1'];

      const missingIds = ['2', '3'];
      const houses = [{ id: '2' }, { id: '3' }];

      storeMock.select = jest.fn(() => of(loadedIds));
      (housesServiceMock as any).getHousesByIds = jest.fn(() => of(houses));

      actions$ = of(action);

      const expectedAction = HouseActions.loadHousesSuccess({
        houses: houses as any,
      });

      effects.loadHousesByIds$.subscribe((result) => {
        expect(result).toEqual(expectedAction);
      });
    });

    it('should dispatch failure on error', () => {
      const ids = ['1', '2'];
      const action = HouseActions.loadHousesByIds({ ids });
      const loadedIds: any = [];

      const error = new Error('API error');

      storeMock.select = jest.fn(() => of(loadedIds));
      housesServiceMock.getHousesByIds = jest.fn(() => throwError(() => error));

      actions$ = of(action);

      const expectedAction = HouseActions.loadHousesFailure({ error });

      effects.loadHousesByIds$.subscribe((result) => {
        expect(result).toEqual(expectedAction);
      });
    });
  });

  describe('loadHousesByPagination$', () => {
    it('should dispatch loadHousesFromCache when page data exists', () => {
      const page = 1;
      const pageSize = 10;
      const pageData = {
        1: [{ id: 'a' }, { id: 'b' }],
      };

      storeMock.select = jest.fn(() => of(pageData));

      const action = HouseActions.loadHousesByPagination({ page, pageSize });
      actions$ = of(action);

      const expectedAction = HouseActions.loadHousesFromCache({ page });

      effects.loadHousesByPagination$.subscribe((result) => {
        expect(result).toEqual(expectedAction);
      });
    });

    it('should fetch page data from API and dispatch success', () => {
      const page = 2;
      const pageSize = 10;
      const pageData = {};
      const response = { data: [{ id: 'c' }, { id: 'd' }] };

      storeMock.select = jest.fn(() => of(pageData));
      (housesServiceMock as any).getHousesByPagination = jest.fn(() =>
        of(response)
      );

      const action = HouseActions.loadHousesByPagination({ page, pageSize });
      actions$ = of(action);

      const expectedAction = HouseActions.loadHousesByPaginationSuccess({
        houses: response.data as any,
        page,
      });

      effects.loadHousesByPagination$.subscribe((result) => {
        expect(result).toEqual(expectedAction);
      });
    });

    it('should dispatch failure on error', () => {
      const page = 3;
      const pageSize = 10;
      const error = new Error('API error');

      storeMock.select = jest.fn(() => of(pageData));
      housesServiceMock.getHousesByPagination = jest.fn(() =>
        throwError(() => error)
      );

      const action = HouseActions.loadHousesByPagination({ page, pageSize });
      actions$ = of(action);

      const expectedAction = HouseActions.loadHousesFailure({ error });

      effects.loadHousesByPagination$.subscribe((result) => {
        expect(result).toEqual(expectedAction);
      });
    });
  });
});
