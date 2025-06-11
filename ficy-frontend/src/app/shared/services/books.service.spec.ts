import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { BooksService } from './books.service';
import { Book } from '../../common/interfaces/book.interface';
import { GenericResponse } from '../../common/interfaces/generic-response.interface';

describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;

  const apiUrl = 'api/books/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BooksService],
    });
    service = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getBooksByPagination', () => {
    it('should fetch books with pagination parameters', () => {
      const mockResponse: GenericResponse<Book> = {
        message: 'blah blah',
        data: { url: 'book1' } as any,
      };

      service.getBooksByPagination(2, 10).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}?page=2&limit=10`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('#getBooksById', () => {
    it('should fetch a book by id', () => {
      const mockResponse: GenericResponse<Book> = {
        message: 'blah blah',
        data: { url: 'book1' } as any,
      };

      service.getBooksById(1).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('#getBooksByIds', () => {
    it('should fetch multiple books by IDs', () => {
      const ids = ['id1', 'id2'];
      const mockResponse: GenericResponse<Book[]> = {
        message: 'blah blah',
        data: [{ url: 'book1' }, { url: 'book2' }] as any,
      };

      service.getBooksByIds(ids).subscribe((res) => {
        expect(res).toEqual(mockResponse.data);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ ids });
      req.flush(mockResponse);
    });
  });

  describe('#getBooks', () => {
    it('should fetch all books', () => {
      const mockResponse: GenericResponse<Book> = {
        message: 'blah blah',
        data: { url: 'book1' } as any,
      };

      service.getBooks().subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('#getBookByUrl', () => {
    it('should fetch a book by URL', () => {
      const url = 'http://example.com/book/123';
      const mockResponse: GenericResponse<Book> = {
        message: 'blah blah',
        data: { url: 'book1' } as any,
      };

      service.getBookByUrl(url).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('#searchBooks', () => {
    it('should search books by search term', () => {
      const searchTerm = 'Harry Potter';
      const mockResponse: GenericResponse<Book[]> = {
        message: 'blah blah',
        data: [{ url: 'book1' } as any],
      };

      service.searchBooks(searchTerm).subscribe((res) => {
        expect(res).toEqual(mockResponse.data);
      });

      const req = httpMock.expectOne(`${apiUrl}search?keyword=${searchTerm}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
