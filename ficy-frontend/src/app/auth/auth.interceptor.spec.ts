import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let handlerMock: Partial<HttpHandler>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptor],
    });
    interceptor = TestBed.inject(AuthInterceptor);
    handlerMock = {
      handle: jest.fn(),
    };
    localStorage.clear();
  });

  it('should add Authorization header when token exists', () => {
    localStorage.setItem('token', 'test-token');

    const mockRequest = new HttpRequest('GET', '/api/test');
    (handlerMock.handle as jest.Mock).mockReturnValue(of({} as any));

    interceptor.intercept(mockRequest, handlerMock as HttpHandler);

    expect(handlerMock.handle).toHaveBeenCalled();

    const calledRequest = (handlerMock.handle as jest.Mock).mock.calls[0][0];

    expect(calledRequest.headers.has('Authorization')).toBe(true);
    expect(calledRequest.headers.get('Authorization')).toBe(
      'Bearer test-token'
    );
  });

  it('should not add Authorization header when token does not exist', () => {
    const mockRequest = new HttpRequest('GET', '/api/test');
    (handlerMock.handle as jest.Mock).mockReturnValue(of({} as any));

    interceptor.intercept(mockRequest, handlerMock as HttpHandler);

    expect(handlerMock.handle).toHaveBeenCalled();

    const calledRequest = (handlerMock.handle as jest.Mock).mock.calls[0][0];

    expect(calledRequest.headers.has('Authorization')).toBe(false);
  });
});
