import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy = { navigate: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: Router, useValue: routerSpy }],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should call API and store token', () => {
      const dummyResponse = { data: { token: 'fake-jwt-token' } };
      const loginData = { email: 'test@example.com', password: 'pass' };

      service.login(loginData).subscribe((token) => {
        expect(token).toBe('fake-jwt-token');
      });

      const req = httpMock.expectOne('api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(dummyResponse);
    });
  });

  describe('setToken', () => {
    it('should store token in localStorage', () => {
      service.setToken('test-token');
      expect(localStorage.getItem('token')).toBe('test-token');
    });
  });

  describe('logout', () => {
    it('should remove token and navigate to login', () => {
      localStorage.setItem('token', 'test');
      service.logout();
      expect(localStorage.getItem('token')).toBeNull();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('isUserLoggedIn', () => {
    it('should return false if no token', () => {
      expect(service.isUserLoggedIn()).toBe(false);
    });

    it('should return false if token is expired', () => {
      const expiredToken = generateExpiredToken();
      localStorage.setItem('token', expiredToken);
      expect(service.isUserLoggedIn()).toBe(false);
    });
  });
});

function generateExpiredToken() {
  return 'expired';
}
function generateValidToken() {
  'valid';
}
