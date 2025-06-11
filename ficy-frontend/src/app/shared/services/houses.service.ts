import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GenericResponse } from '../../common/interfaces/generic-response.interface';
import { House } from '../../common/interfaces/house.interface';

@Injectable({ providedIn: 'root' })
export class HousesService {
  private apiUrl = 'api/houses/';

  constructor(private http: HttpClient) {}

  getHousesByPagination(
    page: number = 1,
    pageSize: number = 5
  ): Observable<GenericResponse<House[]>> {
    return this.http.get<GenericResponse<House[]>>(
      `${this.apiUrl}?page=${page}&limit=${pageSize}`
    );
  }

  getHousesById(id: number = 1): Observable<GenericResponse<House>> {
    return this.http.get<GenericResponse<House>>(`${this.apiUrl}/${id}`);
  }

  getHouses(): Observable<GenericResponse<House[]>> {
    return this.http.get<GenericResponse<House[]>>(this.apiUrl);
  }

  getHouseByUrl(url: string): Observable<GenericResponse<House>> {
    return this.http.get<GenericResponse<House>>(url);
  }

  getHousesByIds(ids: string[]): Observable<House[]> {
    return this.http
      .post<GenericResponse<House[]>>(this.apiUrl, { ids })
      .pipe(map((x) => x.data));
  }

  searchHouses(searchTerm: string) {
    return this.http
      .get<GenericResponse<House[]>>(
        `${this.apiUrl}search?keyword=${searchTerm}`
      )
      .pipe(map((x) => x.data));
  }
}
