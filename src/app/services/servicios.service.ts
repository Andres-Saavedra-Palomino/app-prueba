import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Elemento } from '../servicios/Entities/Elemento.entity';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  onEditar = new EventEmitter<number>();
  onActualizar = new EventEmitter();

  private autoIncremental: number;

  private elementos: Elemento[] = [
    {
      id: 1,
      titulo: 'Electricidad',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      categorias: ['autos', 'hogar'],
    },
    {
      id: 2,
      titulo: 'Auxilio mecánico',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      categorias: ['autos'],
    },
    {
      id: 3,
      titulo: 'Chofer reemplazo',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      categorias: ['autos'],
    },
    {
      id: 4,
      titulo: 'Médico a domicilio',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      categorias: ['salud', 'hogar'],
    },
    {
      id: 5,
      titulo: 'Ambulancia',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      categorias: ['salud', 'hogar'],
    },
  ];

  constructor() {
    this.autoIncremental = this.elementos.length + 1;
  }

  listar(categoria: string): Observable<Elemento[]> {
    let els: Elemento[];

    if (categoria.trim() != '') {
      els = this.elementos.filter((el) => {
        return el.categorias.indexOf(categoria) > -1;
      });
    } else {
      els = this.elementos;
    }
    return of(els).pipe(delay(1000));
  }

  obtenerUno(id: number): Observable<Elemento | any> {
    const elemento = this.elementos.find((item) => item.id == id);
    return of(elemento);
  }

  insertar(elemento: Elemento): Observable<any> {
    elemento.id = this.autoIncremental++;
    this.elementos.push(elemento);

    return of([]).pipe(delay(1000));
  }

  eliminar(id: number): Observable<any> {
    const indice = this.elementos.findIndex((item) => item.id == id);
    this.elementos.splice(indice, 1);

    return of([]).pipe(delay(1000));
  }

  actualizar(id: number, elemento: Elemento): Observable<any> {
    const indice = this.elementos.findIndex((item) => item.id == id);
    this.elementos[indice] = elemento;

    return of([]).pipe(delay(1000));
  }
}
