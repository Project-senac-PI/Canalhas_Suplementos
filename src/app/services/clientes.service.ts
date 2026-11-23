import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/clientes.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly API = 'http://localhost:3000/clientes';
  private clienteHTTP = inject(HttpClient);

  listar(): Observable<Cliente[]> {
    return this.clienteHTTP.get<Cliente[]>(this.API);
  }

  buscarPorId(id: string): Observable<Cliente> {
    return this.clienteHTTP.get<Cliente>(`${this.API}/${id}`);
  }

  incluir(cliente: Cliente): Observable<Cliente> {
    return this.clienteHTTP.post<Cliente>(this.API, cliente);
  }

  editar(cliente: Cliente): Observable<Cliente> {
    return this.clienteHTTP.put<Cliente>(`${this.API}/${cliente.id}`, cliente);
  }

  excluir(id: number): Observable<void> {
    return this.clienteHTTP.delete<void>(`${this.API}/${id}`);
  }
}
