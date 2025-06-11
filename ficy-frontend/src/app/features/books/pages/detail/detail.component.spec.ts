import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { DetailComponent } from './detail.component';

const mockBook = {
  _id: '1',
  name: 'Mock Book',
  authors: ['Author1', 'Author2'],
  characters: [
    'char1',
    'char2',
    'char3',
    'char4',
    'char5',
    'char6',
    'char7',
    'char8',
    'char9',
    'char10',
    'char11',
    'char12',
    'char13',
  ],
  url: 'book-url',
};

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let mockStore: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockStore = {
      select: jest.fn(),
      dispatch: jest.fn(),
    };

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue('1'),
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [DetailComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
  });

  it('should change page and fetch characters on page change', () => {
    component.book = mockBook as any;
    component.page = 1;
    component.totalCharacterLength = mockBook.characters.length;

    jest.spyOn(component, 'characterFetchById').mockReturnValue(of([]));

    component.handlePageChangeEvent(2);

    expect(component.page).toBe(2);
    expect(component.characterFetchById).toHaveBeenCalledWith(
      mockBook.characters.slice(12, 24)
    );
  });

  it('should handle search with empty string', async () => {
    component.book = mockBook as any;
    component.totalCharacterLength = mockBook.characters.length;
    component.searchedCharacter = [];
    component.page = 3;
    component.totalPage = 5;

    jest
      .spyOn(component, 'characterFetchById')
      .mockReturnValue(of(mockBook.characters as any));

    await component.onSearchChanged('');

    expect(component.page).toBe(1);
    expect(component.totalPage).toBe(
      Math.ceil(mockBook.characters.length / 12)
    );
  });
});
