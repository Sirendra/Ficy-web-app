import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GenericResponse } from '../../common/interfaces/generic-response.interface';
import { Book } from '../../common/interfaces/book.interface';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiUrl = 'api/books/';

  constructor(private http: HttpClient) {}

  getBooksByPagination(
    page: number = 1,
    pageSize: number = 5
  ): Observable<GenericResponse<Book[]>> {
    return this.http
      .get<GenericResponse<Book[]>>(
        `${this.apiUrl}?page=${page}&limit=${pageSize}`
      )
      .pipe();
  }

  getBooksById(id: number = 1): Observable<GenericResponse<Book>> {
    return this.http.get<GenericResponse<Book>>(`${this.apiUrl}/${id}`);
  }

  getBooksByIds(ids: string[]): Observable<Book[]> {
    return this.http
      .post<GenericResponse<Book[]>>(this.apiUrl, { ids })
      .pipe(map((x) => x.data));
  }

  getBooks(): Observable<GenericResponse<Book[]>> {
    return this.http.get<GenericResponse<Book[]>>(this.apiUrl);
  }

  getBookByUrl(url: string): Observable<GenericResponse<Book>> {
    return this.http.get<GenericResponse<Book>>(url);
  }

  searchBooks(searchTerm: string) {
    return this.http
      .get<GenericResponse<Book[]>>(
        `${this.apiUrl}search?keyword=${searchTerm}`
      )
      .pipe(map((x) => x.data));
  }
}
