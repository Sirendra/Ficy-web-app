import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { DetailComponent } from './detail.component';
import * as CharacterActions from '../../../../store/characters/characters.actions';
import { selectMultipleCharactersByIds } from '../../../../store/characters/characters.selectors';
import { selectBookByIds } from '../../../../store/books/books.selectors';
import { CommonPictureComponent } from '../../../../common/components/header-section/header-section.component';
import { CommonCardComponent } from '../../../../common/components/card-list/common-card.component';
import { CardDetailComponent } from '../../components/card-details/card-details.component';
import { Component } from '@angular/core';

@Component({ selector: 'app-common-picture', standalone: true, template: '' })
class CommonPictureMock {}
@Component({ selector: 'app-common-card', standalone: true, template: '' })
class CommonCardMock {}
@Component({ selector: 'app-card-detail', standalone: true, template: '' })
class CardDetailMock {}

describe('DetailComponent (standalone)', () => {
  let fixture: ComponentFixture<DetailComponent>;
  let store: MockStore;
  const id = '123';
  const characterUrl = `https://anapioficeandfire.com/api/characters/${id}`;
  const mockChar = {
    name: 'Arya Stark',
    aliases: ['No One'],
    gender: 'Female',
    books: ['book1', 'book2'],
    url: characterUrl,
  };
  const mockBooks = [{ title: 'Book 1' }, { title: 'Book 2' }];
  const mockRoute = { snapshot: { paramMap: { get: () => id } } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailComponent],
      providers: [
        provideMockStore(),
        { provide: ActivatedRoute, useValue: mockRoute },
      ],
    })
      .overrideComponent(DetailComponent, {
        remove: {
          imports: [
            CommonPictureComponent,
            CommonCardComponent,
            CardDetailComponent,
          ],
        },
        add: {
          imports: [CommonPictureMock, CommonCardMock, CardDetailMock],
        },
      })
      .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(DetailComponent);
  });

  it('dispatches loadCharactersByIds on init', () => {
    const spy = jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(
      CharacterActions.loadCharactersByIds({ ids: [characterUrl] })
    );
  });

  it('does not dispatch or subscribe if no id in route', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [DetailComponent],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null } } },
        },
      ],
    }).compileComponents();

    const localStore = TestBed.inject(MockStore);
    const spy = jest.spyOn(localStore, 'dispatch');
    const localFixture = TestBed.createComponent(DetailComponent);
    localFixture.detectChanges();

    expect(spy).not.toHaveBeenCalled();
    const comp = localFixture.componentInstance;
    expect(comp.character).toBeUndefined();
  });
});
