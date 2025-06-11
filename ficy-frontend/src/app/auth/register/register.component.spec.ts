import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/services/auth.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

jest.mock('../../auth/services/auth.service');

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let toastrService: ToastrService;
  let router: Router;

  beforeEach(async () => {
    const toastrServiceMock = {
      error: jest.fn(),
      success: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: AuthService, useClass: AuthService },
        { provide: ToastrService, useValue: toastrServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    toastrService = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display validation errors for invalid form', () => {
    component.form.controls['email'].setValue('');
    component.form.controls['password'].setValue('');
    component.form.controls['confirm'].setValue('');
    component.form.controls['fullName'].setValue('');
    component.submit();
    fixture.detectChanges();

    const emailError = fixture.nativeElement.querySelector('p');
    expect(emailError).toBeTruthy();
    expect(emailError.textContent).toContain('Email is required');
  });

  it('should call AuthService.register and navigate on successful registration', () => {
    const registerSpy = jest
      .spyOn(authService, 'register')
      .mockReturnValue(of({} as any));
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['password'].setValue('password123');
    component.form.controls['confirm'].setValue('password123');
    component.form.controls['fullName'].setValue('Test User');
    component.submit();

    expect(registerSpy).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      fullName: 'Test User',
    });
    expect(toastrService.success).toHaveBeenCalledWith(
      'Registration successful',
      'Success'
    );
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should display error toast on registration failure', () => {
    const registerSpy = jest
      .spyOn(authService, 'register')
      .mockReturnValue(throwError(() => new Error('Registration failed')));
    const errorSpy = jest.spyOn(toastrService, 'error');

    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['password'].setValue('password123');
    component.form.controls['confirm'].setValue('password123');
    component.form.controls['fullName'].setValue('Test User');
    component.submit();

    expect(registerSpy).toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith('Registration failed', 'Error');
  });
});
