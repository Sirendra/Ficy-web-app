import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommonPictureComponent } from '../../../../common/components/header-section/header-section.component';
import { Character } from '../../../../common/interfaces/character.interface';
import { filter, first, firstValueFrom, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectCharactersByCurrentPage,
  selectCharactersError,
  selectCharactersLoading,
} from '../../../../store/characters/characters.selectors';
import * as CharacterActions from '../../../../store/characters/characters.actions';
import { CommonCardComponent } from '../../../../common/components/card-list/common-card.component';
import { CommonPaginationComponent } from '../../../../common/components/pagination/common-pagination.component';
import { CommonSearchBoxComponent } from '../../../../common/components/search-box/common-search-box.component';
import { fadeIn } from '../../../../common/helpers/animation.helper';
import { CharactersService } from '../../../../shared/services/characters.service';

@Component({
  selector: 'app-character-landing',
  imports: [
    CommonModule,
    CommonPictureComponent,
    CommonCardComponent,
    CommonPaginationComponent,
    CommonSearchBoxComponent,
  ],
  templateUrl: './landing.component.html',
  animations: [fadeIn],
})
export class LandingComponent {
  character$!: Observable<Character[]>;
  loading$: Observable<any>;
  error$: Observable<any>;
  page = 1;
  totalPage = 178;
  isLoading = false;
  public title = 'Meet the Characters of Westeros and Beyond';
  public description =
    "Dive into the lives of noble lords, fierce warriors, cunning spies, and mysterious outcasts from George R. R. Martin's epic saga";
  public exploreTitle = 'Explore more about characters';
  public exploreDesc =
    'Uncover the histories, alliances, and secrets of the characters who shape the fate of the Seven Kingdoms and the lands beyond.';

  searchedCharacters: Character[] = [];

  constructor(
    private store: Store,
    private characterService: CharactersService
  ) {
    this.loading$ = this.store.select(selectCharactersLoading);
    this.error$ = this.store.select(selectCharactersError);
  }

  ngOnInit(): void {
    this.loadPage(this.page);
  }

  private loadPage(pageNumber: number) {
    if (this.searchedCharacters.length) {
      this.character$ = of(
        this.searchedCharacters.slice((pageNumber - 1) * 12, pageNumber * 12)
      );
    } else {
      this.store.dispatch(
        CharacterActions.loadCharactersByPagination({
          page: pageNumber,
          pageSize: 12,
        })
      );

      this.character$ = this.store.select(
        selectCharactersByCurrentPage(pageNumber)
      );
    }
  }

  handlePageChangeEvent(pageNumber: number) {
    if (this.page !== pageNumber) {
      this.page = pageNumber;
      this.loadPage(pageNumber);
    }
  }

  async onSearchChanged(searchTerm: string) {
    if (!searchTerm) {
      this.store.dispatch(
        CharacterActions.loadCharactersByPagination({
          page: 1,
          pageSize: 12,
        })
      );
      this.page = 1;
      this.totalPage = 178;
      this.character$ = this.store.select(
        selectCharactersByCurrentPage(this.page)
      );
      this.searchedCharacters = [];
    } else {
      this.isLoading = true;
      this.searchedCharacters = await firstValueFrom(
        this.characterService.searchCharacters(searchTerm)
      );
      this.isLoading = false;
      this.page = 1;
      this.totalPage = Math.ceil(this.searchedCharacters.length / 12) || 1;

      this.character$ = of(this.searchedCharacters.slice(0, 12));
    }
  }
  trackByUrl(_index: number, character: Character): string {
    return character.url;
  }
}
