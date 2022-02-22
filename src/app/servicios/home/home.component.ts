import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Elemento } from '../Entities/Elemento.entity';
import { ServiciosService } from '../../services/servicios.service';
import { merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  elementos: Elemento[] = [];
  categoria: string = '';

  constructor(
    private rutaActiva: ActivatedRoute,
    private readonly serviciosService: ServiciosService
  ) {}

  ngOnInit() {
    merge(this.rutaActiva.paramMap, this.serviciosService.onActualizar)
      .pipe(
        switchMap((pars: any) => {
          if (pars)
            this.categoria = pars.params.categoria ? pars.params.categoria : '';
          return this.serviciosService.listar(this.categoria);
        })
      )
      .subscribe((elementos) => (this.elementos = elementos));
  }
}
