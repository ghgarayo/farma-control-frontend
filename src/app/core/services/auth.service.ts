import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';
import { BaseService } from './base.service';
import {LoginResponse, LoginRequest} from '@shared/models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  private http = inject(HttpClient);
  private currentUser = signal<LoginResponse | null>(null);

  login(credentials: LoginRequest) {
    const url = `${this.apiUrl}/v1/auth`;

    return this.http.post<LoginResponse>(url, credentials, this.httpOptions)
      .pipe(
        map(this.extractData), // Usa o método da Base
        tap(res => {
          console.log(res)
          console.log(this.extractData)
        }),
        catchError(this.handleError) // Usa o tratamento de erro da Base
      );
  }

  getUserName() {
    console.log(this.currentUser)
    return this.currentUser.name;
  }
}
