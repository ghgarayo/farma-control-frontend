import {Component, signal, inject, OnInit} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink, ActivatedRoute} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {LoginRequest, LoginResponse} from '@shared/models/auth.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule
  ],
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  // Signals para gerenciar estado local da UI
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  private returnUrl: string = '/home';

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  ngOnInit(): void {
    // Capturar a URL de retorno dos query params
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    // Se já estiver autenticado, redirecionar
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  handleLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage.set('Por favor, preencha todos os campos corretamente.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const credentials: LoginRequest = this.loginForm.getRawValue();

    this.authService.login(credentials).subscribe({
      next: (response: LoginResponse) => {
        console.log('Login realizado com sucesso:', response);
        this.successMessage.set('Login realizado com sucesso!');

        // Redirecionar após um pequeno delay para mostrar a mensagem
        setTimeout(() => {
          this.router.navigate([this.returnUrl]);
        }, 1000);
      },
      error: (err: any) => {
        console.error('Erro no login:', err);
        this.errorMessage.set(err.message || 'Credenciais inválidas ou erro de conexão.');
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }
}
