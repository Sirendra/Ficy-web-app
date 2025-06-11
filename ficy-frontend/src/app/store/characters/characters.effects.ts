import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import * as CharacterActions from './characters.actions';
import { Store } from '@ngrx/store';
import { selectLoadedCharacterIds } from './characters.selectors';
import { CharactersService } from '../../shared/services/characters.service';

@Injectable()
export class CharactersEffects {
  private actions$ = inject(Actions);
  private characterService = inject(CharactersService);
  private store = inject(Store);
  loadCharactersByIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.loadCharactersByIds),
      withLatestFrom(this.store.select(selectLoadedCharacterIds)),
      map(([action, loadedIds]) => {
        const missingIds = action.ids.filter((id) => !loadedIds.includes(id));
        return { missingIds, action };
      }),
      filter(({ missingIds, action }) => missingIds.length > 0),
      switchMap(({ missingIds, action }) => {
        if (missingIds.length === 0) {
          return of(
            CharacterActions.loadCharactersFromCacheByIds({
              ids: action.ids,
            })
          );
        }
        return this.characterService.getCharactersByIds(missingIds).pipe(
          map((characters) =>
            CharacterActions.loadCharactersSuccess({ characters })
          ),
          catchError((error) =>
            of(CharacterActions.loadCharactersFailure({ error }))
          )
        );
      })
    )
  );

  loadCharactersByPagination$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.loadCharactersByPagination),
      withLatestFrom(this.store.select((state) => state.characters.pageData)),
      switchMap(([action, pageData]) => {
        const { page, pageSize } = action;

        if (pageData[page]) {
          return of(CharacterActions.loadCharactersFromCache({ page }));
        }

        return this.characterService
          .getCharactersByPagination(page, pageSize)
          .pipe(
            map((response) =>
              CharacterActions.loadCharactersByPaginationSuccess({
                characters: response.data,
                page,
              })
            ),
            catchError((error) =>
              of(CharacterActions.loadCharactersFailure({ error }))
            )
          );
      })
    )
  );

  constructor() {}
}
