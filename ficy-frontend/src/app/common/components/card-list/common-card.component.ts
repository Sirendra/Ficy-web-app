import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { selectFavoritesByUrl } from '../../../store/favorites/favorites.selectors';
import * as FavoriteActions from '../../../store/favorites/favorites.actions';
import { FavoriteType } from '../../interfaces/favorite.interface';

@Component({
  selector: 'app-common-card',
  templateUrl: './common-card.component.html',
  imports: [CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonCardComponent implements OnInit {
  @Input() url!: string;
  @Input() header!: string;
  @Input() subTitle!: string;
  @Input() backgroundUrl = '/character1.jpeg';
  @Input() dataType: FavoriteType = 'book';

  isFavorite$: Observable<boolean> = new Observable<boolean>();

  constructor(
    private toastService: ToastrService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.isFavorite$ = this.store
      .select(selectFavoritesByUrl(this.dataType, this.url))
      .pipe(map((items) => items.length > 0));
  }

  toggleFavorite(event: MouseEvent): void {
    event.stopPropagation();
    this.isFavorite$
      .pipe(
        take(1),
        map((isFav) => {
          if (isFav) {
            this.store.dispatch(
              FavoriteActions.removeFavorite({ url: this.url })
            );
            this.toastService.success('Removed from favorites', 'Success');
          } else {
            this.store.dispatch(
              FavoriteActions.addFavorite({
                item: {
                  url: this.url,
                  type: this.dataType,
                  title: this.header,
                  subTitle: this.subTitle,
                },
              })
            );
            this.toastService.success('Added to favorites', 'Success');
          }
        })
      )
      .subscribe();
  }

  navigateToDetailPage(): void {
    const basePath = {
      book: 'books',
      character: 'characters',
      house: 'houses',
    }[this.dataType];

    this.router.navigate([`/${basePath}/${this.url.split('/').pop()}`]);
  }
}
