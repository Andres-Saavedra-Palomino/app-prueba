import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { HomeComponent } from './home/home.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ListadoComponent } from './listado/listado.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, FormularioComponent, ListadoComponent],
  imports: [CommonModule, ReactiveFormsModule, ServiciosRoutingModule],
  exports: [HomeComponent, FormularioComponent, ListadoComponent],
})
export class ServiciosModule {}
