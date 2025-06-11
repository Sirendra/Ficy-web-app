import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router, NavigationEnd } from '@angular/router';
import { of, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/services/auth.service';
import { loadBooks } from './store/books/books.actions';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockRouter: any;
  let mockStore: any;
  let mockAuthService: any;
  let eventsSubject: Subject<any>;

  beforeEach(async () => {
    eventsSubject = new Subject();

    mockRouter = {
      url: '/dashboard',
      events: eventsSubject.asObservable(),
    };

    mockStore = {
      dispatch: jest.fn(),
    };

    mockAuthService = {
      isUserLoggedIn: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: Store, useValue: mockStore },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to top on NavigationEnd event', () => {
    const scrollSpy = jest
      .spyOn(window, 'scrollTo')
      .mockImplementation(() => {});
    eventsSubject.next(new NavigationEnd(1, '/old', '/new'));
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    scrollSpy.mockRestore();
  });

  it('should dispatch loadBooks if user is logged in', () => {
    mockAuthService.isUserLoggedIn.mockReturnValue(true);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    expect(mockStore.dispatch).toHaveBeenCalledWith(loadBooks());
  });

  it('should not dispatch loadBooks if user is not logged in', () => {
    mockStore.dispatch.mockClear();
    mockAuthService.isUserLoggedIn.mockReturnValue(false);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });

  it('should show navbar for non-hidden routes', () => {
    mockRouter.url = '/dashboard';
    expect(component.shouldShowNavbar()).toBe(true);
  });

  it('should hide navbar for /login route', () => {
    mockRouter.url = '/login';
    expect(component.shouldShowNavbar()).toBe(false);
  });

  it('should hide navbar for /register route', () => {
    mockRouter.url = '/register';
    expect(component.shouldShowNavbar()).toBe(false);
  });
});
