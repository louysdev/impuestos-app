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

  salarioDeducido = computed(() => this.salario() - this.impuesto());


  calcularImpuesto(salario: number) {
    const salarioAnual = salario * 12;

    console.log(salarioAnual);

    if (salarioAnual <= PRIMER_RANGO.salarioMinimo) {
      this.salario.set(0);
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
    console.log("Segundo rango");

    const salarioAnual = salario * 12;
    const salarioAnualDeducido = salarioAnual - SEGUNDO_RANGO.salarioMinimo!;
    const impuestoSalarioAnual = salarioAnualDeducido * SEGUNDO_RANGO.tasa!;
    const salarioAnualDeducidoMensual = impuestoSalarioAnual / 12;

    this.salario.set(salario);
    this.impuesto.set(salarioAnualDeducidoMensual);
    this.rangoUsuario.set('II');
  }

  private calcularTercerRango(salario: number) {
    console.log("Tercer rango");

    const salarioAnual = salario * 12;
    const salarioAnualDeducido = salarioAnual - TERCER_RANGO.salarioMinimo!;
    const impuestoSalarioAnual =
      (salarioAnualDeducido + TERCER_RANGO.deduccion!) * TERCER_RANGO.tasa!;
    const salarioAnualDeducidoMensual = impuestoSalarioAnual / 12;

    this.salario.set(salario);
    this.impuesto.set(salarioAnualDeducidoMensual);
    this.rangoUsuario.set('III');
  }

  private calcularCuartoRango(salario: number) {
    console.log("Cuarto rango");

    const salarioAnual = salario * 12;
    const salarioAnualDeducido = salarioAnual - CUARTO_RANGO.salarioMinimo!;
    const impuestoSalarioAnual =
      (salarioAnualDeducido + CUARTO_RANGO.deduccion!) * CUARTO_RANGO.tasa!;
    const salarioAnualDeducidoMensual = salarioAnualDeducido / 12;

    this.salario.set(salario);
    this.impuesto.set(salarioAnualDeducidoMensual);
    this.rangoUsuario.set('IV');

    return impuestoSalarioAnual / 12;
  }
}
