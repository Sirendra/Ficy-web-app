import { Component, OnInit } from '@angular/core';
import { Book } from '../../../../common/interfaces/book.interface';
import { firstValueFrom, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectAllBooks,
  selectBooksError,
  selectBooksLoading,
} from '../../../../store/books/books.selectors';
import * as BookActions from '../../../../store/books/books.actions';
import { CommonModule } from '@angular/common';
import { CommonPictureComponent } from '../../../../common/components/header-section/header-section.component';
import { CommonCardComponent } from '../../../../common/components/card-list/common-card.component';
import { CommonPaginationComponent } from '../../../../common/components/pagination/common-pagination.component';
import { CommonSearchBoxComponent } from '../../../../common/components/search-box/common-search-box.component';
import { fadeIn } from '../../../../common/helpers/animation.helper';
import { BooksService } from '../../../../shared/services/books.service';

@Component({
  selector: 'app-book-landing',
  imports: [
    CommonModule,
    CommonCardComponent,
    CommonPictureComponent,
    CommonPaginationComponent,
    CommonSearchBoxComponent,
  ],
  templateUrl: './landing.component.html',
  animations: [fadeIn],
})
export class LandingComponent implements OnInit {
  public title = 'Journey Through the Chronicles of Westeros';
  public description =
    'Delve into the pages of A Song of Ice and Fire, George R. R. Martin’s epic saga that weaves politics, prophecy, and power. Discover the books that laid the foundation for the world of Westeros and beyond.';
  public exploreTitle = 'Explore Each Volume';
  public exploreDesc =
    'Uncover key plots, legendary characters, and pivotal moments from each book in the series. From the cold Wall in the North to the fiery cities of Essos, every chapter holds secrets waiting to be revealed.';

  public isLoading = false;
  books$: Observable<Book[]>;
  loading$: Observable<any>;
  error$: Observable<any>;
  page: number = 1;
  totalPage: number = 1;

  constructor(private store: Store, private bookService: BooksService) {
    this.books$ = this.store.select(selectAllBooks);
    this.loading$ = this.store.select(selectBooksLoading);
    this.error$ = this.store.select(selectBooksError);
  }

  ngOnInit(): void {
    this.store.dispatch(BookActions.loadBooks());
  }

  handlePageChangeEvent(pageNumber: number) {
    this.page = pageNumber;
  }

  async onSearchChanged(searchTerm: string) {
    if (searchTerm) {
      this.books$ = this.bookService.searchBooks(searchTerm);
    } else {
      this.books$ = this.store.select(selectAllBooks);
    }
  }

  trackByUrl(_index: number, book: Book): string {
    return book.url;
  }
}
