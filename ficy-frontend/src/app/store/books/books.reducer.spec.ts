import { booksReducer, initialState } from './books.reducer';
import * as BookActions from './books.actions';

describe('Books Reducer', () => {
  const sampleBooks: any[] = [{ url: 'book1' }, { url: 'book2' }];

  it('should return the initial state', () => {
    const state = booksReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  describe('loadBooks', () => {
    it('should set loading to true and clear error', () => {
      const newState = booksReducer(initialState, BookActions.loadBooks());
      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });
  });

  describe('loadBooksSuccess', () => {
    it('should set all books and set loading false', () => {
      const prevState = {
        ...initialState,
        loading: true,
      };
      const newState = booksReducer(
        prevState,
        BookActions.loadBooksSuccess({ books: sampleBooks })
      );
      expect(newState.loading).toBe(false);
      expect(Object.keys(newState.entities)).toHaveLength(sampleBooks.length);
    });
  });

  describe('loadBooksFailure', () => {
    it('should set loading false and store error', () => {
      const error = new Error('Error loading books');
      const newState = booksReducer(
        initialState,
        BookActions.loadBooksFailure({ error })
      );
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(error);
    });
  });

  describe('loadBooksFromCache', () => {
    it('should set loading false', () => {
      const prevState = {
        ...initialState,
        loading: true,
      };
      const newState = booksReducer(
        prevState,
        BookActions.loadBooksFromCache()
      );
      expect(newState.loading).toBe(false);
    });
  });
});
