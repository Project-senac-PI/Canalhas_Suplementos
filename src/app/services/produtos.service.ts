import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produtos.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private API = 'http://localhost:3000/produtos';
  private produtoHTTP = inject(HttpClient);

  listar(): Observable<Produto[]> {
    return this.produtoHTTP.get<Produto[]>(this.API);
  }

  buscarPorId(id: string): Observable<Produto> {
    return this.produtoHTTP.get<Produto>(`${this.API}/${id}`);
  }

  incluir(produto: Produto): Observable<Produto> {
    return this.produtoHTTP.post<Produto>(this.API, produto);
  }

  editar(produto: Produto): Observable<Produto> {
    return this.produtoHTTP.put<Produto>(`${this.API}/${produto.id}`, produto);
  }

  excluir(id: number): Observable<void> {
    return this.produtoHTTP.delete<void>(`${this.API}/${id}`);
  }
}
