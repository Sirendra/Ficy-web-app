import { charactersReducer, initialState } from './characters.reducer';
import * as CharacterActions from './characters.actions';

describe('Characters Reducer', () => {
  const sampleCharacters: any[] = [{ url: 'char1' }, { url: 'char2' }];
  const sampleError = new Error('Sample error');

  it('should return the initial state', () => {
    const state = charactersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  describe('loadCharactersByIds and loadCharactersByPagination', () => {
    it('should set loading to true and clear error on load actions', () => {
      const actionTypes = [
        CharacterActions.loadCharactersByIds({ ids: ['url'] }),
        CharacterActions.loadCharactersByPagination({ page: 1, pageSize: 10 }),
      ];
      actionTypes.forEach((action) => {
        const newState = charactersReducer(initialState, action);
        expect(newState.loading).toBe(true);
        expect(newState.error).toBeNull();
      });
    });
  });

  describe('loadCharactersSuccess', () => {
    it('should upsert many characters and set loading false', () => {
      const prevState = {
        ...initialState,
        loading: true,
      };
      const newState = charactersReducer(
        prevState,
        CharacterActions.loadCharactersSuccess({ characters: sampleCharacters })
      );
      expect(newState.loading).toBe(false);
      expect(Object.keys(newState.entities)).toEqual(
        expect.arrayContaining(sampleCharacters.map((c) => c.url))
      );
    });
  });

  describe('loadCharactersFailure', () => {
    it('should set loading false and store error', () => {
      const newState = charactersReducer(
        initialState,
        CharacterActions.loadCharactersFailure({ error: sampleError })
      );
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(sampleError);
    });
  });

  describe('loadCharactersByPaginationSuccess', () => {
    it('should store characters under page and set loading false', () => {
      const pageNumber = 1;
      const newState = charactersReducer(
        initialState,
        CharacterActions.loadCharactersByPaginationSuccess({
          characters: sampleCharacters,
          page: pageNumber,
        })
      );
      expect(newState.pageData[pageNumber]).toEqual(sampleCharacters);
      expect(newState.loading).toBe(false);
    });
  });

  describe('loadCharactersFromCache', () => {
    it('should set loading false and clear error', () => {
      const prevState = { ...initialState, loading: true };
      const newState = charactersReducer(
        prevState,
        CharacterActions.loadCharactersFromCache({ page: 1 })
      );
      expect(newState.loading).toBe(false);
      expect(newState.error).toBeNull();
    });
  });

  describe('loadCharactersFromCacheByIds', () => {
    it('should set loading false and clear error', () => {
      const prevState = { ...initialState, loading: true };
      const newState = charactersReducer(
        prevState,
        CharacterActions.loadCharactersFromCacheByIds({ ids: ['url'] })
      );
      expect(newState.loading).toBe(false);
      expect(newState.error).toBeNull();
    });
  });
});
