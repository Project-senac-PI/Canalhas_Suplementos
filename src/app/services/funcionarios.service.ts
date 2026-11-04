import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionarios.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  private readonly API = 'http://localhost:3000/funcionarios';
  private funcionarioHTTP = inject(HttpClient);

  listar(): Observable<Funcionario[]> {
    return this.funcionarioHTTP.get<Funcionario[]>(this.API);
  }

  buscarPorId(id: string): Observable<Funcionario> {
    return this.funcionarioHTTP.get<Funcionario>(`${this.API}/${id}`);
  }

  incluir(funcionario: Funcionario): Observable<Funcionario> {
    return this.funcionarioHTTP.post<Funcionario>(this.API, funcionario);
  }

  editar(funcionario: Funcionario): Observable<Funcionario> {
    return this.funcionarioHTTP.put<Funcionario>(`${this.API}/${funcionario.id}`, funcionario);
  }

  excluir(id: number): Observable<void> {
    return this.funcionarioHTTP.delete<void>(`${this.API}/${id}`);
  }
}
