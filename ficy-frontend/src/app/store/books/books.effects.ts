import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BookActions from './books.actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { selectAllBooks } from './books.selectors';
import { Store } from '@ngrx/store';
import { BooksService } from '../../shared/services/books.service';

@Injectable()
export class BooksEffects {
  private actions$ = inject(Actions);
  private bookService = inject(BooksService);
  private store = inject(Store);
  constructor() {}

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.loadBooks),
      withLatestFrom(this.store.select(selectAllBooks)),
      switchMap(([_, books]) => {
        if (books.length > 0) {
          return of(BookActions.loadBooksFromCache());
        }
        return this.bookService.getBooks().pipe(
          map((books) => BookActions.loadBooksSuccess({ books: books.data })),
          catchError((error) => of(BookActions.loadBooksFailure({ error })))
        );
      })
    )
  );
}
