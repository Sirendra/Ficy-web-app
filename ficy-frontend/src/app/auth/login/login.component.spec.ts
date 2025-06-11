import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    const toastrServiceMock = {
      error: jest.fn(),
    };

    const authServiceMock = {
      login: jest.fn(),
      setToken: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create the LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login when form is valid and submit is called', () => {
    const loginSpy = jest
      .spyOn(authService, 'login')
      .mockReturnValue(of('fake-token'));
    const setTokenSpy = jest.spyOn(authService, 'setToken');
    const navigateSpy = jest.spyOn(component['router'], 'navigate');

    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['password'].setValue('password123');
    component.submit();

    expect(loginSpy).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(setTokenSpy).toHaveBeenCalledWith('fake-token');
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  it('should show an error toast when login fails', () => {
    const loginSpy = jest
      .spyOn(authService, 'login')
      .mockReturnValue(throwError(() => new Error('Login failed')));
    const errorSpy = jest.spyOn(toastrService, 'error');

    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['password'].setValue('password123');
    component.submit();

    expect(loginSpy).toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith('Invalid email or password', 'Error');
  });
});
