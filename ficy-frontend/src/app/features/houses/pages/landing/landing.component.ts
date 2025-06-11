import { Component } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { House } from '../../../../common/interfaces/house.interface';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { CommonCardComponent } from '../../../../common/components/card-list/common-card.component';
import { CommonPictureComponent } from '../../../../common/components/header-section/header-section.component';
import { CommonSearchBoxComponent } from '../../../../common/components/search-box/common-search-box.component';
import { CommonPaginationComponent } from '../../../../common/components/pagination/common-pagination.component';
import {
  selectHousesByCurrentPage,
  selectHousesError,
  selectHousesLoading,
} from '../../../../store/houses/houses.selectors';
import * as HousesActions from '../../../../store/houses/houses.actions';
import { HousesService } from '../../../../shared/services/houses.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    CommonCardComponent,
    CommonPictureComponent,
    CommonSearchBoxComponent,
    CommonPaginationComponent,
  ],
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  house$!: Observable<House[]>;
  loading$: Observable<any>;
  error$: Observable<any>;
  page = 1;
  totalPage = 37;
  isLoading = false;

  public title = 'Explore the Great Houses of Westeros and Beyond';
  public description =
    'From the frozen North to sunlit Dorne, the noble Houses shape the fate of the Seven Kingdoms in George R. R. Martin’s epic saga.';
  public exploreTitle = 'Discover the Noble Houses';
  public exploreDesc =
    'Uncover the legacies, loyalties, and rivalries of Westeros’ great families and their fight for the Iron Throne.';

  searchedHouses: House[] = [];

  constructor(private store: Store, private houseService: HousesService) {
    this.loading$ = this.store.select(selectHousesLoading);
    this.error$ = this.store.select(selectHousesError);
  }

  ngOnInit(): void {
    this.loadPage(this.page);
  }

  private loadPage(pageNumber: number) {
    if (this.searchedHouses.length) {
      this.house$ = of(
        this.searchedHouses.slice((pageNumber - 1) * 12, pageNumber * 12)
      );
    } else {
      this.store.dispatch(
        HousesActions.loadHousesByPagination({
          page: pageNumber,
          pageSize: 12,
        })
      );
      this.house$ = this.store.select(selectHousesByCurrentPage(pageNumber));
    }
  }

  handlePageChangeEvent(pageNumber: number) {
    if (this.page !== pageNumber) {
      this.page = pageNumber;
      this.loadPage(pageNumber);
    }
  }

  async onSearchChanged(searchTerm: string) {
    if (!searchTerm) {
      this.store.dispatch(
        HousesActions.loadHousesByPagination({
          page: 1,
          pageSize: 12,
        })
      );
      this.page = 1;
      this.totalPage = 37;
      this.house$ = this.store.select(selectHousesByCurrentPage(this.page));
      this.searchedHouses = [];
    } else {
      this.isLoading = true;
      this.searchedHouses = await firstValueFrom(
        this.houseService.searchHouses(searchTerm)
      );
      this.isLoading = false;
      this.page = 1;
      this.totalPage = Math.ceil(this.searchedHouses.length / 12) || 1;
      this.house$ = of(this.searchedHouses.slice(0, 12));
    }
  }

  trackByUrl(_index: number, house: House): string {
    return house.url;
  }
}
