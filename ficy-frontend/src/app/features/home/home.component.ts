import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from '../../shared/components/book-card/book-card.component';
import { CharacterCardComponent } from '../../shared/components/character-card/character-card.component';
import { HouseCardComponent } from '../../shared/components/house-card/house-card.component';
import { Book } from '../../common/interfaces/book.interface';
import { House } from '../../common/interfaces/house.interface';
import { Character } from '../../common/interfaces/character.interface';
import { CommonPictureComponent } from '../../common/components/header-section/header-section.component';
import { constructUrlByIds } from '../../common/helpers/url.helper';
import { getThreeUniqueRandomNumbers } from '../../common/helpers/random.helper';
import { CardDataType } from '../../common/enums/card-data-type.enum';
import { BooksService } from '../../shared/services/books.service';
import { HousesService } from '../../shared/services/houses.service';
import { CharactersService } from '../../shared/services/characters.service';

const MAX_BOOK_LENGTH = 12;
const MAX_CHARACTER_LENGTH = 2134;
const MAX_HOUSE_LENGTH = 444;

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    BookCardComponent,
    CharacterCardComponent,
    HouseCardComponent,
    CommonPictureComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  houses: House[] = [];
  characters: Character[] = [];
  loading = true;

  constructor(
    private booksService: BooksService,
    private housesService: HousesService,
    private charactersService: CharactersService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    forkJoin({
      books: this.booksService.getBooksByIds(
        constructUrlByIds(
          getThreeUniqueRandomNumbers(MAX_BOOK_LENGTH),
          CardDataType.BOOK
        )
      ),
      houses: this.housesService.getHousesByIds(
        constructUrlByIds(
          getThreeUniqueRandomNumbers(MAX_HOUSE_LENGTH),
          CardDataType.HOUSE
        )
      ),
      characters: this.charactersService.getCharactersByIds(
        constructUrlByIds(
          getThreeUniqueRandomNumbers(MAX_CHARACTER_LENGTH),
          CardDataType.CHARACTER
        )
      ),
    }).subscribe({
      next: ({ books, houses, characters }) => {
        this.books = books;
        this.houses = houses;
        this.characters = characters;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
