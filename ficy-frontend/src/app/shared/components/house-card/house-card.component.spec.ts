import { House } from '../../../common/interfaces/house.interface';
import { HouseCardComponent } from './house-card.component';

describe('HouseCardComponent', () => {
  let component: HouseCardComponent;

  beforeEach(() => {
    component = new HouseCardComponent();
  });

  it('should set input properties correctly', () => {
    const mockHouse = {
      url: '1',
      name: 'House Stark',
      region: 'The North',
    } as House;
    const index = 0;

    component.house = mockHouse;
    component.index = index;

    expect(component.house).toEqual(mockHouse);
    expect(component.index).toBe(index);
  });
});
