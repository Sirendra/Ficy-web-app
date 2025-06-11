import { favoritesReducer, initialState } from './favorites.reducer';
import { addFavorite, removeFavorite } from './favorites.actions';

describe('Favorites Reducer', () => {
  const sampleItem1: any = { url: 'url1', type: 'favorite' };
  const sampleItem2: any = { url: 'url2', type: 'typeB' };

  it('should return the initial state', () => {
    const state = favoritesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  describe('addFavorite', () => {
    it('should add a new item to items', () => {
      const newState = favoritesReducer(
        initialState,
        addFavorite({ item: sampleItem1 })
      );
      expect(newState.items).toContainEqual(sampleItem1);
    });

    it('should not add duplicate items', () => {
      const prevState = {
        ...initialState,
        items: [sampleItem1],
      };
      const newState = favoritesReducer(
        prevState,
        addFavorite({ item: sampleItem1 })
      );
      expect(newState.items.length).toBe(1);
    });
  });

  describe('removeFavorite', () => {
    it('should remove item by url', () => {
      const prevState = {
        ...initialState,
        items: [sampleItem1, sampleItem2],
      };
      const newState = favoritesReducer(
        prevState,
        removeFavorite({ url: 'url1' })
      );
      expect(newState.items).not.toContainEqual(sampleItem1);
      expect(newState.items).toContainEqual(sampleItem2);
    });

    it('should do nothing if url not found', () => {
      const prevState = {
        ...initialState,
        items: [sampleItem1],
      };
      const newState = favoritesReducer(
        prevState,
        removeFavorite({ url: 'nonexistent' })
      );
      expect(newState.items).toEqual(prevState.items);
    });
  });
});
