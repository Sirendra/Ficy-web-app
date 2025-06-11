import { of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { BooksEffects } from './books.effects';
import * as BookActions from './books.actions';
import { Store } from '@ngrx/store';
import { BooksService } from '../../shared/services/books.service';

describe('BooksEffects', () => {
  let actions$: any;
  let effects: BooksEffects;
  let storeMock: Partial<Store>;
  let booksServiceMock: Partial<BooksService>;

  beforeEach(() => {
    actions$ = null;

    storeMock = {
      select: jest.fn(),
    };

    booksServiceMock = {
      getBooks: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        BooksEffects,
        { provide: Store, useValue: storeMock },
        { provide: BooksService, useValue: booksServiceMock },
      ],
    });

    effects = TestBed.inject(BooksEffects);
  });

  describe('loadBooks$', () => {
    it('should dispatch loadBooksFromCache when books are already in store', () => {
      const booksInStore = [{ id: 1, title: 'Book 1' }];

      storeMock.select = jest.fn(() => of(booksInStore));

      actions$ = of(BookActions.loadBooks());

      const expected$ = of(BookActions.loadBooksFromCache());

      effects.loadBooks$.subscribe((result) => {
        expect(result).toEqual(expected$);
      });
    });

    it('should fetch books from API and dispatch success action', () => {
      const booksFromApi = { data: [{ id: 2, title: 'Book 2' }] };

      storeMock.select = jest.fn(() => of([]));

      (booksServiceMock as any).getBooks = jest.fn(() => of(booksFromApi));

      actions$ = of(BookActions.loadBooks());

      const expectedAction = BookActions.loadBooksSuccess({
        books: booksFromApi.data as any,
      });

      effects.loadBooks$.subscribe((result) => {
        expect(result).toEqual(expectedAction);
      });
    });

    it('should dispatch failure action on error', () => {
      const error = new Error('API error');

      storeMock.select = jest.fn(() => of([]));

      booksServiceMock.getBooks = jest.fn(() => throwError(() => error));

      actions$ = of(BookActions.loadBooks());

      const expectedAction = BookActions.loadBooksFailure({ error });

      effects.loadBooks$.subscribe((result) => {
        expect(result).toEqual(expectedAction);
      });
    });
  });
});
