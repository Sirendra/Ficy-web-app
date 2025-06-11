import { of } from 'rxjs';
import { LandingComponent } from './landing.component';
import { selectFavoritesByType } from '../../../../store/favorites/favorites.selectors';

describe('LandingComponent', () => {
  let mockStore: any;

  beforeEach(() => {
    mockStore = {
      select: jest.fn(),
    };
  });

  it('should initialize sectionData with observables from store', () => {
    const mockBooks = [{ id: 1, name: 'Book 1' }];
    const mockCharacters = [{ id: 2, name: 'Character 1' }];
    const mockHouses = [{ id: 3, name: 'House 1' }];

    mockStore.select = jest.fn((selector: any) => {
      if (selector === selectFavoritesByType('book')) {
        return of(mockBooks);
      } else if (selector === selectFavoritesByType('character')) {
        return of(mockCharacters);
      } else if (selector === selectFavoritesByType('house')) {
        return of(mockHouses);
      }
      return of([]);
    });

    const component = new LandingComponent(mockStore);

    expect(component.sectionData.length).toBe(3);

    component.sectionData.forEach((section) => {
      section.data$.subscribe((data) => {
        if (section.type === 'book') {
          expect(data).toEqual(mockBooks);
        } else if (section.type === 'character') {
          expect(data).toEqual(mockCharacters);
        } else if (section.type === 'house') {
          expect(data).toEqual(mockHouses);
        }
      });
    });
  });
});
