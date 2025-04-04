import { Renta } from '../interfaces/rentas.interfaces';

export const PRIMER_RANGO: Renta = {
  salarioMinimo: 416220,
};

export const SEGUNDO_RANGO: Renta = {
  tasa: 0.15,
  salarioMinimo: 416220,
  salarioMaximo: 624329.0,
};

export const TERCER_RANGO: Renta = {
  tasa: 0.2,
  salarioMinimo: 624329,
  salarioMaximo: 867123,
  deduccion: 31210,
};

export const CUARTO_RANGO: Renta = {
  tasa: 0.25,
  salarioMinimo: 867123,
  deduccion: 79776,
};
