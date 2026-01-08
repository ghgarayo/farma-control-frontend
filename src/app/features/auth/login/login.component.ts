import { Component, signal, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  styleUrl: './login.component.scss',
  template: `
    <div class="page-container">
      <section class="image-side">
        <div class="brand-info">
          <h1>Farma Control</h1>
          <p>Gestão inteligente para sua farmácia.</p>
        </div>
      </section>

      <section class="form-side">
        <div class="auth-container">
          <h2>Acessar Sistema</h2>
          <p class="subtitle">Bem-vindo de volta! Por favor, insira seus dados.</p>

          <form [formGroup]="loginForm" (ngSubmit)="handleLogin()">
            <div class="form-field">
              <label>E-mail</label>
              <input type="email" formControlName="email" placeholder="exemplo@farma.com">
            </div>

            <div class="form-field">
              <label>Senha</label>
              <input type="password" formControlName="password" placeholder="••••••••">
            </div>

            @if (errorMessage()) {
              <div class="error-message">{{ errorMessage() }}</div>
            }

            <button type="submit" [disabled]="loginForm.invalid || isLoading()">
              {{ isLoading() ? 'Autenticando...' : 'Entrar no Sistema' }}
            </button>
          </form>

          <div class="footer-links">
            <a routerLink="/auth/forgot-password">Esqueceu sua senha?</a>
            <p>Não tem conta? <a routerLink="/auth/register">Falar com administrador</a></p>
          </div>
        </div>
      </section>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);

  // Signals para gerenciar estado local da UI
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async handleLogin() {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      // Simulação de chamada de API (Substituiremos pelo Service depois)
      console.log('Dados do login:', this.loginForm.getRawValue());
      await new Promise(resolve => setTimeout(resolve, 1500));
      this.router.navigate(['/dashboard']);
    } catch (err) {
      this.errorMessage.set('Credenciais inválidas ou erro de conexão.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
