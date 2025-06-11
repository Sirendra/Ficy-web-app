import { createReducer, on } from '@ngrx/store';
import { addFavorite, removeFavorite } from './favorites.actions';
import { FavoriteItem } from '../../common/interfaces/favorite.interface';

export interface FavoritesState {
  items: FavoriteItem[];
}

export const initialState: FavoritesState = {
  items: [],
};

export const favoritesReducer = createReducer(
  initialState,
  on(addFavorite, (state, { item }) => {
    if (state.items.find((i) => i.url === item.url && i.type === item.type)) {
      return state;
    }
    return {
      ...state,
      items: [...state.items, item],
    };
  }),
  on(removeFavorite, (state, { url }) => ({
    ...state,
    items: state.items.filter((item) => item.url !== url),
  }))
);
