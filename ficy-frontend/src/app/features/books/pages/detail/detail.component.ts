import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, firstValueFrom, Observable, of, take } from 'rxjs';
import { Book } from '../../../../common/interfaces/book.interface';
import * as CharacterActions from '../../../../store/characters/characters.actions';
import { selectBookById } from '../../../../store/books/books.selectors';
import { Character } from '../../../../common/interfaces/character.interface';
import {
  selectFilteredCharactersByIdsAndSearch,
  selectMultipleCharactersByIds,
} from '../../../../store/characters/characters.selectors';
import { CommonPictureComponent } from '../../../../common/components/header-section/header-section.component';
import { CardDetailComponent } from '../../components/card-details/card-details.component';
import { CommonModule } from '@angular/common';
import { CommonCardComponent } from '../../../../common/components/card-list/common-card.component';
import { CommonPaginationComponent } from '../../../../common/components/pagination/common-pagination.component';
import { CommonSearchBoxComponent } from '../../../../common/components/search-box/common-search-box.component';

@Component({
  selector: 'app-book-detail',
  imports: [
    CommonModule,
    CommonPictureComponent,
    CardDetailComponent,
    CommonCardComponent,
    CommonPaginationComponent,
    CommonSearchBoxComponent,
  ],
  templateUrl: './detail.component.html',
})
export class DetailComponent {
  book!: Book;
  characters$!: Observable<Character[]>;
  bookEntries!: { key: string; value: any }[];
  totalCharacterLength = 0;
  totalPage = 1;
  page = 1;
  title = '';
  subTitle = '';
  epxloreTitle = '';
  exploreDesc = '';
  searchedCharacter: Character[] = [];

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    const bookUrl = `https://anapioficeandfire.com/api/books/${id}`;
    this.store
      .select(selectBookById(bookUrl))
      .pipe(
        filter((book): book is Book => !!book),
        take(1)
      )
      .subscribe((book) => {
        this.bookEntries = Object.entries(book)
          .filter(
            ([key]) =>
              ![
                '_id',
                'name',
                'url',
                'authors',
                'characters',
                'povCharacters',
                '__v',
              ].includes(key)
          )
          .map(([key, value]) => ({ key, value }));
        this.book = book;
        this.title = book.name;
        this.subTitle = book.authors.join(', ');

        const characterUrls = book.characters || [];
        this.totalCharacterLength = book.characters?.length || 0;
        const firstPageIds = characterUrls.slice(
          0,
          this.totalCharacterLength > 12 ? 12 : this.totalCharacterLength
        );
        this.totalPage = Math.ceil(characterUrls.length / 12) || 1;

        if (firstPageIds.length) {
          this.store.dispatch(
            CharacterActions.loadCharactersByIds({ ids: characterUrls })
          );
          this.characters$ = this.characterFetchById(firstPageIds);
        }
      });
  }
  trackByUrl(_index: number, character: Character): string {
    return character.url;
  }
  handlePageChangeEvent(pageNumber: number) {
    if (this.page !== pageNumber) {
      this.page = pageNumber;
      const ids = this.book.characters.slice(
        (pageNumber - 1) * 12,
        pageNumber * 12
      );
      this.characters$ = this.characterFetchById(ids);
    }
  }

  characterFetchById(ids: string[]) {
    return this.store
      .select(selectMultipleCharactersByIds(ids))
      .pipe(filter((characters) => characters.length > 0));
  }

  searchInCharacter(searchTerm: string) {
    return this.store
      .select(
        selectFilteredCharactersByIdsAndSearch(this.book.characters, searchTerm)
      )
      .pipe(take(1));
  }

  async onSearchChanged(searchTerm: string) {
    if (!searchTerm) {
      this.page = 1;
      this.totalPage = Math.ceil(this.book.characters.length / 12) || 1;
      const firstPageIds = this.book.characters.slice(
        0,
        this.totalCharacterLength > 12 ? 12 : this.totalCharacterLength
      );
      this.characters$ = this.characterFetchById(firstPageIds);
      this.searchedCharacter = [];
    } else {
      this.searchedCharacter = await firstValueFrom(
        this.searchInCharacter(searchTerm)
      );
      this.page = 1;
      this.totalPage = Math.ceil(this.searchedCharacter.length / 12) || 1;
      this.characters$ = of(this.searchedCharacter.slice(0, 12));
    }
  }
}
