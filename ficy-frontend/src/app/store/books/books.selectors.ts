import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState, bookAdapter } from './books.reducer';
import { Book } from '../../common/interfaces/book.interface';

export const selectBooksState = createFeatureSelector<BooksState>('books');

const { selectAll, selectEntities } =
  bookAdapter.getSelectors(selectBooksState);

export const selectAllBooks = selectAll;
export const selectBookEntities = selectEntities;

export const selectBooksLoading = createSelector(
  selectBooksState,
  (state) => state.loading
);

export const selectBooksError = createSelector(
  selectBooksState,
  (state) => state.error
);

export const selectBookById = (id: string) =>
  createSelector(selectBookEntities, (entities) => entities[id]);

export const selectBookByIds = (ids: string[]) =>
  createSelector(selectBookEntities, (entities) =>
    ids
      .map((bookUrl) => entities[bookUrl])
      .filter((book): book is Book => book !== undefined)
  );
