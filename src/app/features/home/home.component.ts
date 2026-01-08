import { Component, signal, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe], // Para formatar a data no HTML
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {

  // Signal para a hora atual
  currentTime = signal(new Date().toISOString());

  // Atualizador do relógio (padrão sênior: limpar o intervalo ao destruir)
  private timerId = setInterval(() => {
    this.currentTime.set(new Date().toISOString());
  }, 1000);

  ngOnDestroy() {
    clearInterval(this.timerId);
  }
}
