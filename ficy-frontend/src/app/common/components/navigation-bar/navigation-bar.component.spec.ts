import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../auth/services/auth.service';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let authServiceMock: { logout: jest.Mock };

  beforeEach(async () => {
    authServiceMock = {
      logout: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [NavigationComponent, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update isScrolled when window scrolls', () => {
    Object.defineProperty(window, 'pageYOffset', {
      value: 500,
      writable: true,
    });
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();

    expect(component.isScrolled).toBe(true);

    Object.defineProperty(window, 'pageYOffset', {
      value: 100,
      writable: true,
    });
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();

    expect(component.isScrolled).toBe(false);
  });

  it('should toggle mobileMenuOpen when toggleMobileMenu is called', () => {
    expect(component.mobileMenuOpen).toBe(false);
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen).toBe(true);
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen).toBe(false);
  });

  it('should call authService.logout on logOut()', () => {
    component.logOut();
    expect(authServiceMock.logout).toHaveBeenCalled();
  });

  it('should handle window scroll listener via @HostListener', () => {
    Object.defineProperty(window, 'pageYOffset', { value: 600 });
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(component.isScrolled).toBe(true);
  });
});
