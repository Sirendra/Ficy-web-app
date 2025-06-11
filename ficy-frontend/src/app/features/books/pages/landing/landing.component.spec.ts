import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LandingComponent } from './landing.component';
import * as BookActions from '../../../../store/books/books.actions';
import {
  selectAllBooks,
  selectBooksLoading,
  selectBooksError,
} from '../../../../store/books/books.selectors';
import { of } from 'rxjs';
import { BooksService } from '../../../../shared/services/books.service';
import { HttpClientModule } from '@angular/common/http';

describe('LandingComponent', () => {
  let fixture: ComponentFixture<LandingComponent>;
  let store: MockStore;
  let bookService: BooksService;

  const initialState = { books: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LandingComponent, HttpClientModule],
      providers: [provideMockStore()],
    });

    store = TestBed.inject(MockStore);

    bookService = TestBed.inject(BooksService);

    fixture = TestBed.createComponent(LandingComponent);
  });

  it('dispatches loadBooks on init', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(BookActions.loadBooks());
  });

  it('handles page change event', () => {
    const component = fixture.componentInstance;
    component.handlePageChangeEvent(2);
    expect(component.page).toBe(2);
  });

  it('updates books$ on search term change', () => {
    const component = fixture.componentInstance;
    const mockSearchResult = [{ title: 'Search Result' }];
    jest
      .spyOn(component['bookService'], 'searchBooks')
      .mockReturnValue(of(mockSearchResult as any));

    component.onSearchChanged('search term');
    component.books$.subscribe((books) => {
      expect(books).toEqual(mockSearchResult);
    });
  });
});
