import { Injectable, signal, computed } from '@angular/core';
import { Renta } from '../interfaces/rentas.interfaces';
import {
  CUARTO_RANGO,
  PRIMER_RANGO,
  SEGUNDO_RANGO,
  TERCER_RANGO,
} from '../constants/rentas-rango';

@Injectable({
  providedIn: 'root',
})
export class ImpuestosService {
  salario = signal<number>(0);
  impuesto = signal<number>(0);
  rangoUsuario = signal<string>('-');
  error = signal<boolean>(false);

  salarioDeducido = computed(() => this.salario() - this.impuesto());

  limpiar() {
    this.salario.set(0);
    this.impuesto.set(0);
    this.rangoUsuario.set('-');
    this.error.set(false);
  }

  calcularImpuesto(salario: number) {
    this.limpiar();

    const salarioAnual = salario * 12;

    console.log(salarioAnual);

    if (salario < 0) {
      this.salario.set(0);
      this.impuesto.set(0);
      this.rangoUsuario.set('-');
      this.error.set(true);
      return;
    }

    if (salarioAnual <= PRIMER_RANGO.salarioMinimo) {
      this.salario.set(salario);
      this.impuesto.set(0);
      this.rangoUsuario.set('I');
    } else if (
      salarioAnual > PRIMER_RANGO.salarioMinimo &&
      salarioAnual <= SEGUNDO_RANGO.salarioMaximo!
    ) {
      this.calcularSegundoRango(salario);
    } else if (
      salarioAnual > SEGUNDO_RANGO.salarioMaximo! &&
      salarioAnual <= TERCER_RANGO.salarioMaximo!
    ) {
      this.calcularTercerRango(salario);
    } else if (salarioAnual > TERCER_RANGO.salarioMaximo!) {
      this.calcularCuartoRango(salario);
    }
  }

  private calcularSegundoRango(salario: number) {
    console.log('Segundo rango');

    const salarioAnual = salario * 12;
    const salarioAnualDeducido = salarioAnual - SEGUNDO_RANGO.salarioMinimo!;
    const impuestoSalarioAnual = salarioAnualDeducido * SEGUNDO_RANGO.tasa!;
    const salarioAnualDeducidoMensual = impuestoSalarioAnual / 12;

    this.salario.set(salario);
    this.impuesto.set(salarioAnualDeducidoMensual);
    this.rangoUsuario.set('II');
  }

  private calcularTercerRango(salario: number) {
    console.log('Tercer rango');

    const salarioAnual = salario * 12;
    const salarioAnualDeducido = salarioAnual - TERCER_RANGO.salarioMinimo!;
    const impuestoSalarioAnual =
      // (salarioAnualDeducido + TERCER_RANGO.deduccion!) * TERCER_RANGO.tasa!;
      salarioAnualDeducido * TERCER_RANGO.tasa! + TERCER_RANGO.deduccion!;
    const salarioAnualDeducidoMensual = impuestoSalarioAnual / 12;

    this.salario.set(salario);
    this.impuesto.set(salarioAnualDeducidoMensual);
    this.rangoUsuario.set('III');
  }

  private calcularCuartoRango(salario: number) {
    console.log('Cuarto rango');

    const salarioAnual = salario * 12;
    const salarioAnualDeducido = salarioAnual - CUARTO_RANGO.salarioMinimo!;
    const impuestoSalarioAnual =
      salarioAnualDeducido * CUARTO_RANGO.tasa! + CUARTO_RANGO.deduccion!;
    const salarioAnualDeducidoMensual = impuestoSalarioAnual / 12;

    this.salario.set(salario);
    this.impuesto.set(salarioAnualDeducidoMensual);
    this.rangoUsuario.set('IV');
  }
}
