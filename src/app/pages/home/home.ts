import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produto } from '../../models/produtos.model';
import { ProdutosService } from '../../services/produtos.service';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  imports: [RouterLink, CommonModule],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {

  produtosMaisVendidos = signal<Produto[]>([]);

  constructor(
    private produtosService: ProdutosService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    this.produtosService.listar().subscribe({
      next: (dados) => {
        this.produtosMaisVendidos.set(dados.filter(p => p.maisVendido));
      },
      error: (err) => console.error('Erro ao carregar produtos:', err)
    });
  }

  adicionarAoCarrinho(produto: Produto): void {
    this.carrinhoService.adicionarAoCarrinho(produto);
  }
}
