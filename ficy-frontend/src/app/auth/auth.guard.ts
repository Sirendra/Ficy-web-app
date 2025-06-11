import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastrService
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    this.authService.handleRefresh();
    try {
      const isExpired = this.authService.checkIfTokenExpired(token);

      if (isExpired) {
        this.toastService.warning(
          'Token expired. Please login again',
          'Warning'
        );
        this.authService.logout();
        return false;
      }

      return true;
    } catch (e) {
      console.warn('Invalid token:', e);
      this.authService.logout();
      return false;
    }
  }
}
