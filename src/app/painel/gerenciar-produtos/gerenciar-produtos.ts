import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { categoriaProduto, Produto } from '../../models/produtos.model';
import { ProdutosService } from '../../services/produtos.service';

@Component({
  imports: [RouterLink, CommonModule, FormsModule],
  selector: 'app-gerenciar-produtos',
  styleUrls: ['../painel.css', './gerenciar-produtos.css'],
  templateUrl: './gerenciar-produtos.html',
})
export class GerenciarProdutos implements OnInit {
  private service = inject(ProdutosService);

  listaProdutos = signal<Produto[]>([]);
  busca: string = '';

  categorias = [
    categoriaProduto.PROTEINAS,
    categoriaProduto.CREATINA,
    categoriaProduto.PRE_TREINO,
    categoriaProduto.VITAMINAS,
    categoriaProduto.VESTIMENTAS,
    categoriaProduto.ACESSORIOS
  ];

  ngOnInit(): void {
    this.service.listar().subscribe({
      next: (produtos) => {
        this.listaProdutos.set(produtos);
      },
      error: () => alert('Não foi possível carregar os produtos. Verifique se a API está rodando.')
    });
  }

  excluir(produto: Produto) {
    if (!confirm(`Deseja excluir o produto ${produto.nome}?`)) {
      return;
    }

    this.service.excluir(produto.id).subscribe({
      next: () => {
        this.listaProdutos.update(lista => lista.filter(p => p.id !== produto.id));
      }
    });
  }

  //filtra a lista pelo texto digitado na busca
  filtrarProdutos(): Produto[] {
    const texto = this.busca.toLowerCase();
    return this.listaProdutos().filter(p => p.nome.toLowerCase().includes(texto));
  }

  contarMaisVendidos(): number {
    return this.listaProdutos().filter(p => p.maisVendido).length;
  }
}
