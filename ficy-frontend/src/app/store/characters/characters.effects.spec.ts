import { of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { CharactersEffects } from './characters.effects';
import * as CharacterActions from './characters.actions';
import { Store } from '@ngrx/store';
import { CharactersService } from '../../shared/services/characters.service';

describe('CharactersEffects', () => {
  let actions$: any;
  let effects: CharactersEffects;
  let storeMock: Partial<Store>;
  let charactersServiceMock: Partial<CharactersService>;

  beforeEach(() => {
    actions$ = null;

    storeMock = {
      select: jest.fn(),
    };

    charactersServiceMock = {
      getCharactersByIds: jest.fn(),
      getCharactersByPagination: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        CharactersEffects,
        { provide: Store, useValue: storeMock },
        { provide: CharactersService, useValue: charactersServiceMock },
      ],
    });

    effects = TestBed.inject(CharactersEffects);
  });

  describe('loadCharactersByIds$', () => {
    it('should dispatch loadCharactersFromCacheByIds when all IDs are loaded', () => {
      const action = CharacterActions.loadCharactersByIds({ ids: ['1', '2'] });
      const loadedIds = [1, 2];

      storeMock.select = jest.fn(() => of(loadedIds));

      actions$ = of(action);

      const expectedAction = CharacterActions.loadCharactersFromCacheByIds({
        ids: ['1', '2'],
      });

      effects.loadCharactersByIds$.subscribe((result) => {
        expect(result).toEqual(expectedAction);
      });
    });

    it('should fetch missing characters by IDs and dispatch success', () => {
      const action = CharacterActions.loadCharactersByIds({
        ids: ['1', '2', '3'],
      });
      const loadedIds = ['1'];

      storeMock.select = jest.fn(() => of(loadedIds));
      const characters = [{ url: '2' }, { url: '3' }];

      (charactersServiceMock as any).getCharactersByIds = jest.fn(() =>
        of(characters)
      );

      actions$ = of(action);

      const expectedAction = CharacterActions.loadCharactersSuccess({
        characters: characters as any,
      });

      effects.loadCharactersByIds$.subscribe((result) => {
        expect(result).toEqual(expectedAction);
      });
    });

    it('should dispatch failure on error', () => {
      const action = CharacterActions.loadCharactersByIds({ ids: ['1', '2'] });
      const loadedIds: any = [];

      storeMock.select = jest.fn(() => of(loadedIds));
      const error = new Error('API error');

      charactersServiceMock.getCharactersByIds = jest.fn(() =>
        throwError(() => error)
      );

      actions$ = of(action);

      const expectedAction = CharacterActions.loadCharactersFailure({ error });

      effects.loadCharactersByIds$.subscribe((result) => {
        expect(result).toEqual(expectedAction);
      });
    });
  });

  describe('loadCharactersByPagination$', () => {
    it('should dispatch loadCharactersFromCache when page data exists', () => {
      const page = 1;
      const pageSize = 10;
      const pageData = {
        1: [{ id: 1 }, { id: 2 }],
      };

      storeMock.select = jest.fn(() => of(pageData));

      const action = CharacterActions.loadCharactersByPagination({
        page,
        pageSize,
      });
      actions$ = of(action);

      const expectedAction = CharacterActions.loadCharactersFromCache({ page });

      effects.loadCharactersByPagination$.subscribe((result) => {
        expect(result).toEqual(expectedAction);
      });
    });

    it('should fetch page data from API and dispatch success', () => {
      const page = 2;
      const pageSize = 10;
      const pageData = {};
      const response = { data: [{ id: 3 }, { id: 4 }] };

      storeMock.select = jest.fn(() => of(pageData));
      (charactersServiceMock as any).getCharactersByPagination = jest.fn(() =>
        of(response)
      );

      const action = CharacterActions.loadCharactersByPagination({
        page,
        pageSize,
      });
      actions$ = of(action);

      const expectedAction = CharacterActions.loadCharactersByPaginationSuccess(
        {
          characters: response.data as any,
          page,
        }
      );

      effects.loadCharactersByPagination$.subscribe((result) => {
        expect(result).toEqual(expectedAction);
      });
    });

    it('should dispatch failure on error', () => {
      const page = 3;
      const pageSize = 10;
      const pageData = {};
      const error = new Error('API error');

      storeMock.select = jest.fn(() => of(pageData));
      charactersServiceMock.getCharactersByPagination = jest.fn(() =>
        throwError(() => error)
      );

      const action = CharacterActions.loadCharactersByPagination({
        page,
        pageSize,
      });
      actions$ = of(action);

      const expectedAction = CharacterActions.loadCharactersFailure({ error });

      effects.loadCharactersByPagination$.subscribe((result) => {
        expect(result).toEqual(expectedAction);
      });
    });
  });
});
