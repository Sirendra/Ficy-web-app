import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from './favorites.reducer';
import { FavoriteType } from '../../common/interfaces/favorite.interface';

export const selectFavoritesState =
  createFeatureSelector<FavoritesState>('favorites');

export const selectAllFavorites = createSelector(
  selectFavoritesState,
  (state) => state.items
);

export const selectFavoritesByType = (type: FavoriteType) =>
  createSelector(selectAllFavorites, (items) =>
    items.filter((i) => i.type === type)
  );

export const selectFavoritesByUrl = (type: FavoriteType, url: string) =>
  createSelector(selectAllFavorites, (items) =>
    items.filter((i) => i.type === type && i.url === url)
  );
