import { createAction, props } from '@ngrx/store';
import { FavoriteItem } from '../../common/interfaces/favorite.interface';

export const addFavorite = createAction(
  '[Favorites] Add Favorite',
  props<{ item: FavoriteItem }>()
);

export const removeFavorite = createAction(
  '[Favorites] Remove Favorite',
  props<{ url: string }>()
);
