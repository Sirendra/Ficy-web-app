import { Book } from '../../../common/interfaces/book.interface';
import { BookCardComponent } from './book-card.component';

describe('BookCardComponent', () => {
  let component: BookCardComponent;

  beforeEach(() => {
    component = new BookCardComponent();
  });

  it('should set input properties correctly', () => {
    const mockBook: any = {
      url: '101',
      name: 'A Game of Thrones',
      authors: 'George R.R. Martin',
    };
    const index = 5;

    component.book = mockBook;
    component.index = index;

    expect(component.book).toEqual(mockBook);
    expect(component.index).toBe(index);
  });
});
