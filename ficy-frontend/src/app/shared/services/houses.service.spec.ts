import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HousesService } from './houses.service';
import { House } from '../../common/interfaces/house.interface';
import { GenericResponse } from '../../common/interfaces/generic-response.interface';

describe('HousesService', () => {
  let service: HousesService;
  let httpMock: HttpTestingController;

  const apiUrl = 'api/houses/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HousesService],
    });
    service = TestBed.inject(HousesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getHousesByPagination', () => {
    it('should fetch houses with pagination parameters', () => {
      const mockResponse: GenericResponse<House[]> = {
        message: 'Fetched houses with pagination',
        data: [{ url: 'house1' }, { url: 'house2' }] as House[],
      };

      service.getHousesByPagination(2, 10).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}?page=2&limit=10`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('#getHousesById', () => {
    it('should fetch a house by id', () => {
      const mockResponse: GenericResponse<House> = {
        message: 'House fetched successfully',
        data: { url: 'house1' } as House,
      };

      service.getHousesById(1).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('#getHouses', () => {
    it('should fetch all houses', () => {
      const mockResponse: GenericResponse<House[]> = {
        message: 'All houses fetched',
        data: [{ url: 'house1' }] as House[],
      };

      service.getHouses().subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('#getHouseByUrl', () => {
    it('should fetch a house by URL', () => {
      const url = 'http://example.com/house/123';
      const mockResponse: GenericResponse<House> = {
        message: 'House fetched by URL',
        data: { url: 'house1' } as House,
      };

      service.getHouseByUrl(url).subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('#getHousesByIds', () => {
    it('should fetch multiple houses by IDs', () => {
      const ids = ['id1', 'id2'];
      const mockResponse: GenericResponse<House[]> = {
        message: 'Houses fetched by IDs',
        data: [{ url: 'house1' }, { url: 'house2' }] as House[],
      };

      service.getHousesByIds(ids).subscribe((res) => {
        expect(res).toEqual(mockResponse.data);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ ids });
      req.flush(mockResponse);
    });
  });

  describe('#searchHouses', () => {
    it('should search houses by search term', () => {
      const searchTerm = 'Beachfront';
      const mockResponse: GenericResponse<House[]> = {
        message: 'Search results for houses',
        data: [{ url: 'house1' }] as House[],
      };

      service.searchHouses(searchTerm).subscribe((res) => {
        expect(res).toEqual(mockResponse.data);
      });

      const req = httpMock.expectOne(`${apiUrl}search?keyword=${searchTerm}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
