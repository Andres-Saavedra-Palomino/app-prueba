import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiciosService } from '../../services/servicios.service';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  id: number = -1;
  grupo: FormGroup;
  grabando: boolean = false;
  suscripcion: Subscription;

  constructor(private readonly serviciosService: ServiciosService) {
    this.grupo = new FormGroup({
      titulo: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      categorias: new FormControl([], Validators.required),
    });
    this.suscripcion = this.serviciosService.onEditar
      .pipe(
        switchMap((id) => {
          this.id = id;
          return this.serviciosService.obtenerUno(id);
        })
      )
      .subscribe((elemento) => {
        this.grupo.patchValue(elemento);
      });
  }

  cancelar() {
    this.grupo.reset();
    this.id = -1;
  }

  grabar() {
    console.log(this.grupo.getRawValue());
    this.grabando = true;
    if (this.id != -1) {
      this.serviciosService
        .actualizar(this.id, this.grupo.getRawValue())
        .subscribe((respuesta) => {
          this.grabando = false;
          this.grupo.reset();
          this.id = -1;
          this.serviciosService.onActualizar.emit();
        });
    } else {
      this.serviciosService
        .insertar(this.grupo.getRawValue())
        .subscribe((respuesta) => {
          this.grabando = false;
          this.grupo.reset();
          this.serviciosService.onActualizar.emit();
        });
    }
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }
}
