export type FavoriteType = 'book' | 'character' | 'house';

export interface FavoriteItem {
  url: string;
  type: FavoriteType;
  title: string;
  subTitle: string;
}
