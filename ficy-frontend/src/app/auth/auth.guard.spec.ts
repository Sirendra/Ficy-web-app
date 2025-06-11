import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy = { navigate: jest.fn() };
  let authServiceMock: Partial<AuthService>;
  let toastSpy: Partial<ToastrService>;

  beforeEach(() => {
    authServiceMock = {
      handleRefresh: jest.fn(),
      checkIfTokenExpired: jest.fn(),
      logout: jest.fn(),
    };

    toastSpy = {
      warning: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastrService, useValue: toastSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to login if no token', () => {
    const result = guard.canActivate({} as any, {} as any);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    expect(result).toBe(false);
  });

  it('should call handleRefresh and allow route if token is valid', () => {
    localStorage.setItem('token', 'validToken');
    (authServiceMock.checkIfTokenExpired as jest.Mock).mockReturnValue(false);

    const result = guard.canActivate({} as any, {} as any);
    expect(authServiceMock.handleRefresh).toHaveBeenCalled();
    expect(authServiceMock.checkIfTokenExpired).toHaveBeenCalledWith(
      'validToken'
    );
    expect(result).toBe(true);
  });

  it('should logout and show warning if token expired', () => {
    localStorage.setItem('token', 'expiredToken');
    (authServiceMock.checkIfTokenExpired as jest.Mock).mockReturnValue(true);

    const result = guard.canActivate({} as any, {} as any);
    expect(authServiceMock.logout).toHaveBeenCalled();
    expect(toastSpy.warning).toHaveBeenCalledWith(
      'Token expired. Please login again',
      'Warning'
    );
    expect(result).toBe(false);
  });

  it('should handle errors and logout if token is invalid', () => {
    localStorage.setItem('token', 'invalidToken');
    (authServiceMock.checkIfTokenExpired as jest.Mock).mockImplementation(
      () => {
        throw new Error('Invalid token');
      }
    );

    const result = guard.canActivate({} as any, {} as any);
    expect(authServiceMock.logout).toHaveBeenCalled();
    expect(result).toBe(false);
  });
});
