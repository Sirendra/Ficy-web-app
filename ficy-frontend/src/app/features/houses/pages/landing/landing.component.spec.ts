import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LandingComponent } from './landing.component';
import * as HousesActions from '../../../../store/houses/houses.actions';
import {
  selectHousesByCurrentPage,
  selectHousesLoading,
  selectHousesError,
} from '../../../../store/houses/houses.selectors';
import { of } from 'rxjs';
import { HousesService } from '../../../../shared/services/houses.service';
import { HttpClientModule } from '@angular/common/http';

describe('LandingComponent (houses)', () => {
  let fixture: ComponentFixture<LandingComponent>;
  let store: MockStore;
  let houseService: HousesService;

  const mockHouses = [{ name: 'Stark', url: 'u1' }];
  const pagedSelector = selectHousesByCurrentPage(1);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingComponent, HttpClientModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: pagedSelector, value: mockHouses },
            { selector: selectHousesLoading, value: false },
            { selector: selectHousesError, value: null },
          ],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    houseService = TestBed.inject(HousesService);
    fixture = TestBed.createComponent(LandingComponent);
  });

  it('dispatches loadHousesByPagination on init', () => {
    const spy = jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(
      HousesActions.loadHousesByPagination({ page: 1, pageSize: 12 })
    );
  });

  it('updates house$ via service on search', async () => {
    jest
      .spyOn(houseService, 'searchHouses')
      .mockReturnValue(of(mockHouses as any));

    fixture.detectChanges();
    const comp = fixture.componentInstance;
    await comp.onSearchChanged('north');
    comp.house$.subscribe((hs) => {
      expect(hs).toEqual(mockHouses);
    });
  });

  it('resets to store select when search term cleared', () => {
    const spy = jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
    const comp = fixture.componentInstance;
    comp.onSearchChanged('');
    expect(spy).toHaveBeenCalledWith(
      HousesActions.loadHousesByPagination({ page: 1, pageSize: 12 })
    );
  });

  it('changes page on handlePageChangeEvent', () => {
    const comp = fixture.componentInstance;
    comp.handlePageChangeEvent(2);
    expect(comp.page).toBe(2);
  });
});
