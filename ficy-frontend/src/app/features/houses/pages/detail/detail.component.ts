import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommonCardComponent } from '../../../../common/components/card-list/common-card.component';
import { CardDetailComponent } from '../../components/card-details/card-details.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Character } from '../../../../common/interfaces/character.interface';
import { filter, map, Observable, take } from 'rxjs';
import * as HouseActions from '../../../../store/houses/houses.actions';
import * as CharacterActions from '../../../../store/characters/characters.actions';
import { CommonPictureComponent } from '../../../../common/components/header-section/header-section.component';
import { House } from '../../../../common/interfaces/house.interface';
import { selectMultipleHousesByIds } from '../../../../store/houses/houses.selectors';
import { selectMultipleCharactersByIds } from '../../../../store/characters/characters.selectors';

@Component({
  selector: 'app-house-detail',
  imports: [
    CommonPictureComponent,
    CommonModule,
    CommonCardComponent,
    CardDetailComponent,
  ],
  templateUrl: './detail.component.html',
})
export class DetailComponent {
  swornMember$!: Observable<Character[]>;
  house!: House;
  sectionData: { title: string; data$: Observable<Character> }[] = [];
  houseEntries!: { key: string; value: any }[];
  title = '';
  subTitle = '';

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    const houseUrl = `https://anapioficeandfire.com/api/houses/${id}`;
    this.store.dispatch(HouseActions.loadHousesByIds({ ids: [houseUrl] }));
    this.houseFetchById([houseUrl]).subscribe(
      this.setDisplayForHouseDetails.bind(this)
    );
  }

  houseFetchById(ids: string[]) {
    return this.store.select(selectMultipleHousesByIds(ids)).pipe(
      filter((characters) => characters.length > 0),
      take(1)
    );
  }

  setDisplayForHouseDetails(houses: House[]) {
    const house = houses[0];
    this.houseEntries = Object.entries(house)
      .filter(([key]) =>
        [
          'coatOfArms',
          'words',
          'titles',
          'seats',
          'founded',
          'ancestralWeapons',
        ].includes(key)
      )
      .map(([key, value]) => ({ key, value }));
    this.house = house;
    this.title = house.name;
    this.subTitle = house.region || house.coatOfArms;
    this.store.dispatch(
      CharacterActions.loadCharactersByIds({
        ids: Array.of(
          ...new Set([
            ...this.house.swornMembers,
            ...(this.house.currentLord ? [this.house.currentLord] : []),
            ...(this.house.heir ? [this.house.heir] : []),
            ...(this.house.founder ? [this.house.founded] : []),
          ])
        ),
      })
    );
    this.fetchAllCharactersToDisplay();
  }

  fetchAllCharactersToDisplay() {
    this.swornMember$ = this.store
      .select(
        selectMultipleCharactersByIds([...(this.house.swornMembers || [])])
      )
      .pipe(
        filter((character) => character.length > 0),
        take(1)
      );
    const charProps = ['currentLord', 'founder', 'heir'] as const;
    charProps.forEach((prop) => {
      if (this.house[prop]) {
        this.sectionData.push({
          title: prop === charProps[0] ? 'Current Lord' : prop,
          data$: this.characterFetchById(this.house[prop]),
        });
      }
    });
  }

  characterFetchById(id: string) {
    return this.store.select(selectMultipleCharactersByIds([id])).pipe(
      filter((character) => character.length > 0),
      take(1),
      map((x) => x[0])
    );
  }
}
