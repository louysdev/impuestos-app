import { DecimalPipe } from '@angular/common';
import { ImpuestosService } from '../../services/impuestos.service';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  imports: [DecimalPipe]
})
export class ResultPageComponent {
  impuestosService = inject(ImpuestosService);

  calcularImpuestos(salarioBase: number): void {
    this.impuestosService.calcularImpuesto(salarioBase);
  }

}
