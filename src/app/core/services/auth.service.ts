import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import {LoginResponse, LoginRequest} from '@shared/models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private currentUser = signal<LoginResponse | null>(null);
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  constructor() {
    super();
    // Restaurar sessão ao inicializar o serviço
    this.loadStoredSession();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const url = `${this.apiUrl}/v1/auth`;

    return this.http.post<LoginResponse>(url, credentials, this.httpOptions)
      .pipe(
        tap(res => {
          console.log('Response:', res);
          this.setSession(res);
        }),
        catchError((error) => this.handleError(error))
      );
  }

  private setSession(authResult: LoginResponse): void {
    this.currentUser.set(authResult);

    // Armazenar token e dados do usuário no localStorage
    if (authResult.token) {
      localStorage.setItem(this.TOKEN_KEY, authResult.token);
    }
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResult));
  }

  private loadStoredSession(): void {
    const storedUser = localStorage.getItem(this.USER_KEY);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUser.set(user);
      } catch (error) {
        console.error('Erro ao carregar sessão:', error);
        this.clearSession();
      }
    }
  }

  private clearSession(): void {
    this.currentUser.set(null);
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const user = this.currentUser();
    return !!token && !!user;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): LoginResponse | null {
    return this.currentUser();
  }

  getUserName(): string {
    const user = this.currentUser();
    return user?.user?.name || '';
  }
}
