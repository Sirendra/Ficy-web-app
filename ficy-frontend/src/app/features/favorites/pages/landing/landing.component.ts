import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFavoritesByType } from '../../../../store/favorites/favorites.selectors';
import {
  FavoriteItem,
  FavoriteType,
} from '../../../../common/interfaces/favorite.interface';
import { removeFavorite } from '../../../../store/favorites/favorites.actions';
import { CommonModule } from '@angular/common';
import { CommonPictureComponent } from '../../../../common/components/header-section/header-section.component';
import { CommonCardComponent } from '../../../../common/components/card-list/common-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './landing.component.html',
  imports: [
    CommonModule,
    CommonCardComponent,
    CommonPictureComponent,
    RouterLink,
  ],
})
export class LandingComponent {
  books$: Observable<FavoriteItem[]>;
  characters$: Observable<FavoriteItem[]>;
  houses$: Observable<FavoriteItem[]>;
  public sectionData: {
    title: string;
    data$: Observable<FavoriteItem[]>;
    type: FavoriteType;
    imgPrefix: string;
  }[] = [];

  public title = 'Your Legacy in the World of Ice and Fire';
  public description =
    'Every banner you pledged to, every tale that stirred your soul — this is your personal tapestry of the Seven Kingdoms. Relive the legends, the loyalties, and the lore you hold most dear.';
  public exploreTitle = 'Your Sacred Collection';
  public exploreDesc =
    'Wander farther across the Narrow Sea, uncover forgotten bloodlines, and forge new alliances. The chronicles of Westeros are far from complete — and your legend is still being written.';

  constructor(private store: Store) {
    this.books$ = this.store.select(selectFavoritesByType('book'));
    this.characters$ = this.store.select(selectFavoritesByType('character'));
    this.houses$ = this.store.select(selectFavoritesByType('house'));
    this.sectionData = [
      {
        title: 'BOOKS',
        data$: this.books$,
        type: 'book',
        imgPrefix: 'book',
      },
      {
        title: 'CHARACTERS',
        data$: this.characters$,
        type: 'character',
        imgPrefix: 'character',
      },
      {
        title: 'HOUSES',
        data$: this.houses$,
        type: 'house',
        imgPrefix: 'house',
      },
    ];
  }
}
