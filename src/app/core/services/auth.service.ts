import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, Observable } from 'rxjs';
import { BaseService } from './base.service';
import {LoginResponse, LoginRequest} from '@shared/models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  private http = inject(HttpClient);
  private currentUser = signal<LoginResponse | null>(null);

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const url = `${this.apiUrl}/v1/auth`;

    return this.http.post<LoginResponse>(url, credentials, this.httpOptions)
      .pipe(
        tap(res => {
          console.log('Response:', res);
          this.currentUser.set(res);
        }),
        catchError((error) => this.handleError(error))
      );
  }

  getUserName() {
    console.log(this.currentUser)
    return this.currentUser.name;
  }
}
