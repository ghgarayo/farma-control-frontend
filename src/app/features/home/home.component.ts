import { Component, signal, OnDestroy, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {
  private authService = inject(AuthService);

  // Signal para a hora atual
  currentTime = signal(new Date().toISOString());

  // Atualizador do relógio (padrão sênior: limpar o intervalo ao destruir)
  private timerId = setInterval(() => {
    this.currentTime.set(new Date().toISOString());
  }, 1000);

  get userName(): string {
    return this.authService.getUserName();
  }

  handleLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy() {
    clearInterval(this.timerId);
  }
}
