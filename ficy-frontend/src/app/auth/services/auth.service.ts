import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { GenericResponse } from '../../common/interfaces/generic-response.interface';
import { IRegister } from '../interface/register.interface';
import { ILogin } from '../interface/login.interface';
import { JwtPayload } from '../interface/jwt-payload.interface';

export interface DecodedToken {
  sub: string;
  isAdmin: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(loginData: ILogin): Observable<string> {
    return this.http
      .post<GenericResponse<{ token: string }>>(
        `${this.apiUrl}/login`,
        loginData
      )
      .pipe(map((response) => response?.data?.token));
  }

  register(data: IRegister): Observable<GenericResponse<string>> {
    return this.http.post<GenericResponse<string>>(
      `${this.apiUrl}/register`,
      data
    );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  handleRefresh() {
    const token = localStorage.getItem('token');
    if (!token) this.logout();
  }

  isUserLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        return this.checkIfTokenExpired(token);
      } catch (e) {
        console.error('Failed to decode');
        return false;
      }
    }
    return false;
  }

  checkIfTokenExpired(token: string): boolean {
    const { exp } = jwtDecode<JwtPayload>(token);
    return Date.now() >= (Number(exp) || -1) * 1000;
  }
}
