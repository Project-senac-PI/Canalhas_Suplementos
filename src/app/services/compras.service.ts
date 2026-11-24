import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compra } from '../models/compras.model';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private readonly API = 'http://localhost:3000/compras';
  private compraHTTP = inject(HttpClient);

  listar(): Observable<Compra[]> {
    return this.compraHTTP.get<Compra[]>(this.API);
  }

  incluir(compra: Compra): Observable<Compra> {
    return this.compraHTTP.post<Compra>(this.API, compra);
  }
}
