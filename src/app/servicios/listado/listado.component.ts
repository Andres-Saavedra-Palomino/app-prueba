import { Component, OnInit, Input } from '@angular/core';
import { Elemento } from '../Entities/Elemento.entity';
import { ServiciosService } from '../../services/servicios.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  @Input() elemento: Elemento | any;

  constructor(private readonly serviciosService: ServiciosService) {}

  ngOnInit() {}

  editar(evt: any) {
    this.serviciosService.onEditar.emit(this.elemento.id);
  }

  eliminar(evt: any) {
    if (confirm('¿Está seguro?')) {
      this.serviciosService
        .eliminar(this.elemento.id)
        .subscribe((res: any) => this.serviciosService.onActualizar.emit());
    }
  }
}
