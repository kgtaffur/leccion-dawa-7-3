import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Donacion } from 'src/app/types/donacion.type';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  nombre = '';
  apellido = '';
  valor = '';
  fecha = '';
  total = 0;
  busqueda_nombre = '';
  busqueda_apellido = '';

  listaDonaciones: Donacion[] = [];
  filtrada: Donacion[] = [];
  donacionesEfectuadas: Donacion[] = [];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      valor: ['', Validators.required],
      fecha: ['', Validators.required],
    });

    this.filtrada = this.listaDonaciones;
  }

  agregarDonacion(): void {
    const donacion: Donacion = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      valor: this.form.value.valor,
      fecha: this.form.value.fecha,
    };

    this.listaDonaciones.push(donacion);
    this.form.reset();
  }

  eliminarDonacion(donacion: Donacion): void {
    this.filtrada = this.filtrada.filter((d: Donacion) => {
      return donacion.nombre !== d.nombre && donacion.apellido !== d.apellido;
    });
    this.listaDonaciones = this.listaDonaciones.filter((d: Donacion) => {
      return donacion.nombre !== d.nombre && donacion.apellido !== d.apellido;
    });
    this.donacionesEfectuadas.push(donacion);
    this.totalDonaciones();
  }

  totalDonaciones(): number {
    return this.donacionesEfectuadas.reduce(
      (acc: number, donacion: Donacion) => {
        return donacion.valor + acc;
      },
      0
    );
  }

  buscar(): void {
    let values = this.listaDonaciones.filter(
      (d) =>
        d.nombre === this.busqueda_nombre &&
        d.apellido === this.busqueda_apellido
    );

    this.filtrada = values ? values : this.listaDonaciones;
  }

  limpiar(): void {
    this.filtrada = this.listaDonaciones;
    this.busqueda_apellido = '';
    this.busqueda_nombre = '';
  }
}
