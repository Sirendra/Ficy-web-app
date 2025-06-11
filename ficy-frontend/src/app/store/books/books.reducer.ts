import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as BookActions from './books.actions';
import { Book } from '../../common/interfaces/book.interface';

export interface BooksState extends EntityState<Book> {
  loading: boolean;
  error: any | null;
}

export const bookAdapter = createEntityAdapter<Book>({
  selectId: (book) => book.url,
});

export const initialState: BooksState = bookAdapter.getInitialState({
  loading: false,
  error: null,
});

export const booksReducer = createReducer(
  initialState,
  on(BookActions.loadBooks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BookActions.loadBooksSuccess, (state, { books }) =>
    bookAdapter.setAll(books, { ...state, loading: false, error: null })
  ),
  on(BookActions.loadBooksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(BookActions.loadBooksFromCache, (state) => ({
    ...state,
    loading: false,
  }))
);
