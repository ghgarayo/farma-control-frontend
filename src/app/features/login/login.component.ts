import {Component, signal, inject} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {LoginRequest, LoginResponse} from '@shared/models/auth.model';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    ToastModule,
  ],
  providers: [MessageService],
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html'
})

export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  // Signals para gerenciar estado local da UI
  isLoading = signal(false);

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  handleLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading.set(true);

    const credentials: LoginRequest = this.loginForm.getRawValue();

    this.authService.login(credentials).subscribe({
      next: (response: LoginResponse) => {
        console.log('Login realizado com sucesso:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Login realizado com sucesso!',
          life: 3000
        });
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        console.error('Erro no login:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.message || 'Credenciais inválidas ou erro de conexão.',
          life: 5000
        });
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }
}
