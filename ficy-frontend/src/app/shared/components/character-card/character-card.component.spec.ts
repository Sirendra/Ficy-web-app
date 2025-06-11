import { Character } from '../../../common/interfaces/character.interface';
import { CharacterCardComponent } from './character-card.component';

describe('CharacterCardComponent', () => {
  let component: CharacterCardComponent;

  beforeEach(() => {
    component = new CharacterCardComponent();
  });

  it('should set input properties correctly', () => {
    const mockCharacter = {
      url: '1',
      name: 'Jon Snow',
      culture: 'Northmen',
    } as Character;
    const index = 2;

    component.character = mockCharacter;
    component.index = index;

    expect(component.character).toEqual(mockCharacter);
    expect(component.index).toBe(index);
  });
});
