import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LandingComponent } from './landing.component';
import * as CharacterActions from '../../../../store/characters/characters.actions';
import { CharactersService } from '../../../../shared/services/characters.service';
import { HttpClientModule } from '@angular/common/http';

describe('LandingComponent', () => {
  let fixture: ComponentFixture<LandingComponent>;
  let store: MockStore;
  let characterService: CharactersService;

  const initialState = { characters: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LandingComponent, HttpClientModule],
      providers: [provideMockStore()],
    });

    store = TestBed.inject(MockStore);
    characterService = TestBed.inject(CharactersService);
    fixture = TestBed.createComponent(LandingComponent);
  });

  it('dispatches loadCharactersByPagination on init', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(
      CharacterActions.loadCharactersByPagination({ page: 1, pageSize: 12 })
    );
  });

  it('handles page change event', () => {
    const component = fixture.componentInstance;
    component.handlePageChangeEvent(2);
    expect(component.page).toBe(2);
  });
});
