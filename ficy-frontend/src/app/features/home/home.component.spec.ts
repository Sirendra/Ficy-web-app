import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { Book } from '../../common/interfaces/book.interface';
import { House } from '../../common/interfaces/house.interface';
import { Character } from '../../common/interfaces/character.interface';

const mockBooksService = {
  getBooksByIds: jest.fn(),
};
const mockHousesService = {
  getHousesByIds: jest.fn(),
};
const mockCharactersService = {
  getCharactersByIds: jest.fn(),
};

describe('HomeComponent', () => {
  let component: HomeComponent;

  beforeEach(() => {
    component = new HomeComponent(
      mockBooksService as any,
      mockHousesService as any,
      mockCharactersService as any
    );
  });

  it('should fetch data and set properties correctly', (done) => {
    const books: Book[] = [{ id: 1, title: 'Book 1' }];
    const houses: House[] = [{ id: 1, name: 'House 1' }];
    const characters: Character[] = [{ id: 1, name: 'Character 1' }];

    mockBooksService.getBooksByIds.mockReturnValue(of(books));
    mockHousesService.getHousesByIds.mockReturnValue(of(houses));
    mockCharactersService.getCharactersByIds.mockReturnValue(of(characters));

    component.ngOnInit();

    setTimeout(() => {
      expect(component.books).toEqual(books);
      expect(component.houses).toEqual(houses);
      expect(component.characters).toEqual(characters);
      expect(component.loading).toBe(false);
      done();
    }, 0);
  });
});
