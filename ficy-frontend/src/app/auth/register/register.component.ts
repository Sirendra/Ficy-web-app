import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { IRegister } from '../../auth/interface/register.interface';
import { take } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  form = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', Validators.required],
      fullName: ['', Validators.required],
    },
    { validators: this.match('password', 'confirm') }
  );

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastrService
  ) {}

  submit() {
    if (this.form.valid) {
      const { fullName, email, password } = this.form.value;
      this.authService
        .register({
          email,
          password,
          fullName,
        } as IRegister)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.toastService.success('Registration successful', 'Success');
            this.router.navigate(['/login']);
          },
          error: () => {
            this.toastService.error('Registration failed', 'Error');
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  match(controlA: string, controlB: string) {
    return (group: { get: (arg0: string) => any }) => {
      const a = group.get(controlA);
      const b = group.get(controlB);
      return a && b && a.value === b.value ? null : { mismatch: true };
    };
  }
}
