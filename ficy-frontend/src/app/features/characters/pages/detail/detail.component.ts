import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, take } from 'rxjs';
import { Book } from '../../../../common/interfaces/book.interface';
import * as CharacterActions from '../../../../store/characters/characters.actions';
import { selectBookByIds } from '../../../../store/books/books.selectors';
import { Character } from '../../../../common/interfaces/character.interface';
import { selectMultipleCharactersByIds } from '../../../../store/characters/characters.selectors';
import { CommonPictureComponent } from '../../../../common/components/header-section/header-section.component';
import { CommonModule } from '@angular/common';
import { CommonCardComponent } from '../../../../common/components/card-list/common-card.component';
import { CardDetailComponent } from '../../components/card-details/card-details.component';

@Component({
  selector: 'app-character-detail',
  imports: [
    CommonModule,
    CommonPictureComponent,
    CardDetailComponent,
    CommonCardComponent,
  ],
  templateUrl: './detail.component.html',
})
export class DetailComponent {
  book$!: Observable<Book[]>;
  character!: Character;
  characterEntries!: { key: string; value: any }[];
  title = '';
  subTitle = '';

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    const characterUrl = `https://anapioficeandfire.com/api/characters/${id}`;
    this.store.dispatch(
      CharacterActions.loadCharactersByIds({ ids: [characterUrl] })
    );
    this.characterFetchById([characterUrl]).subscribe((character) => {
      this.characterEntries = Object.entries(character[0])
        .filter(
          ([key]) =>
            ![
              '_id',
              'name',
              'url',
              'authors',
              'povBooks',
              'books',
              'allegiances',
              '__v',
              'gender',
            ].includes(key)
        )
        .map(([key, value]) => ({ key, value }));
      this.character = character[0];
      this.title = character[0].name || character[0].aliases[0];
      this.subTitle = character[0].gender;
      this.book$ = this.store.select(
        selectBookByIds([
          ...(character[0].books?.length ? character[0].books : []),
        ])
      );
    });
  }

  characterFetchById(ids: string[]) {
    return this.store.select(selectMultipleCharactersByIds(ids)).pipe(
      filter((characters) => characters.length > 0),
      take(1)
    );
  }
}
