import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CharactersService } from './characters.service';
import { Character } from '../../common/interfaces/character.interface';
import { GenericResponse } from '../../common/interfaces/generic-response.interface';

describe('CharactersService', () => {
  let service: CharactersService;
  let httpMock: HttpTestingController;

  const apiUrl = 'api/characters/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharactersService],
    });
    service = TestBed.inject(CharactersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getCharactersByPagination', () => {
    it('should fetch characters with pagination parameters', () => {
      const mockResponse: GenericResponse<Character[]> = {
        message: 'Fetched characters successfully',
        data: [{ url: 'char1' }, { url: 'char2' }] as Character[],
      };

      service.getCharactersByPagination(2, 10).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}?page=2&limit=10`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('#getCharactersById', () => {
    it('should fetch a character by id', () => {
      const mockResponse: GenericResponse<Character> = {
        message: 'Character fetched successfully',
        data: { url: 'char1' } as Character,
      };

      service.getCharactersById(1).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('#getCharacters', () => {
    it('should fetch all characters', () => {
      const mockResponse: GenericResponse<Character[]> = {
        message: 'All characters fetched',
        data: [{ url: 'char1' }] as Character[],
      };

      service.getCharacters().subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('#getCharacterByUrl', () => {
    it('should fetch character by URL', () => {
      const url = 'http://example.com/character/123';
      const mockResponse: GenericResponse<Character> = {
        message: 'Character fetched by URL',
        data: { url: 'char1' } as Character,
      };

      service.getCharacterByUrl(url).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('#searchCharacters', () => {
    it('should search characters by search term', () => {
      const searchTerm = 'John Doe';
      const mockResponse: GenericResponse<Character[]> = {
        message: 'Search results',
        data: [{ url: 'char1' }] as Character[],
      };

      service.searchCharacters(searchTerm).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}search?keyword=${searchTerm}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
