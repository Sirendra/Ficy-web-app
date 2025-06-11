import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ILogin } from '../interface/login.interface';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastrService
  ) {}

  submit() {
    if (this.form.valid) {
      this.authService
        .login(this.form.value as ILogin)
        .pipe(take(1))
        .subscribe({
          next: (token) => {
            this.authService.setToken(token);
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Login failed', error);
            this.toastService.error('Invalid email or password', 'Error');
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
