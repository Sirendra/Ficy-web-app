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
import * as HouseActions from './houses.actions';
import { Store } from '@ngrx/store';
import { selectLoadedHouseIds } from './houses.selectors';
import { HousesService } from '../../shared/services/houses.service';

@Injectable()
export class HousesEffects {
  private actions$ = inject(Actions);
  private houseService = inject(HousesService);
  private store = inject(Store);
  loadHousesByIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HouseActions.loadHousesByIds),
      withLatestFrom(this.store.select(selectLoadedHouseIds)),
      map(([action, loadedIds]) => {
        const missingIds = action.ids.filter((id) => !loadedIds.includes(id));
        return { missingIds, action };
      }),
      filter(({ missingIds, action }) => missingIds.length > 0),
      switchMap(({ missingIds, action }) => {
        if (missingIds.length === 0) {
          return of(
            HouseActions.loadHousesFromCacheByIds({
              ids: action.ids,
            })
          );
        }
        return this.houseService.getHousesByIds(missingIds).pipe(
          map((houses) => HouseActions.loadHousesSuccess({ houses })),
          catchError((error) => of(HouseActions.loadHousesFailure({ error })))
        );
      })
    )
  );

  loadHousesByPagination$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HouseActions.loadHousesByPagination),
      withLatestFrom(this.store.select((state) => state.houses.pageData)),
      switchMap(([action, pageData]) => {
        const { page, pageSize } = action;

        if (pageData[page]) {
          return of(HouseActions.loadHousesFromCache({ page }));
        }

        return this.houseService.getHousesByPagination(page, pageSize).pipe(
          map((response) =>
            HouseActions.loadHousesByPaginationSuccess({
              houses: response.data,
              page,
            })
          ),
          catchError((error) => of(HouseActions.loadHousesFailure({ error })))
        );
      })
    )
  );

  constructor() {}
}
