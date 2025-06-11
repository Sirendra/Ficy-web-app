import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GenericResponse } from '../../common/interfaces/generic-response.interface';
import { Character } from '../../common/interfaces/character.interface';

@Injectable({ providedIn: 'root' })
export class CharactersService {
  private apiUrl = 'api/characters/';

  constructor(private http: HttpClient) {}

  getCharactersByPagination(
    page: number = 1,
    pageSize: number = 5
  ): Observable<GenericResponse<Character[]>> {
    return this.http.get<GenericResponse<Character[]>>(
      `${this.apiUrl}?page=${page}&limit=${pageSize}`
    );
  }

  getCharactersById(id: number = 1): Observable<GenericResponse<Character>> {
    return this.http.get<GenericResponse<Character>>(`${this.apiUrl}/${id}`);
  }

  getCharacters(): Observable<GenericResponse<Character[]>> {
    return this.http.get<GenericResponse<Character[]>>(this.apiUrl);
  }

  getCharacterByUrl(url: string): Observable<GenericResponse<Character>> {
    return this.http.get<GenericResponse<Character>>(url);
  }

  getCharactersByIds(ids: string[]): Observable<Character[]> {
    return this.http
      .post<GenericResponse<Character[]>>(this.apiUrl, { ids })
      .pipe(map((x) => x.data));
  }

  searchCharacters(searchTerm: string) {
    return this.http
      .get<GenericResponse<Character[]>>(
        `${this.apiUrl}search?keyword=${searchTerm}`
      )
      .pipe(map((x) => x.data));
  }
}
