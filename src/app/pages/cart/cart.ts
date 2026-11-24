import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produto } from '../../models/produtos.model';
import { ItemCarrinho } from '../../models/carrinho.model';
import { CarrinhoService } from '../../services/carrinho.service';
import { Compra } from '../../models/compras.model';
import { ComprasService } from '../../services/compras.service';

@Component({
  imports: [RouterLink, CommonModule],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart implements OnInit {

  itens: ItemCarrinho[] = [];
  mostrarPopup = false

  constructor(private carrinhoService: CarrinhoService, private comprasService: ComprasService) { }

  ngOnInit(): void {
    this.carrinhoService.getItens().subscribe({
      next: (dados) => {
        this.itens = dados;
      },
      error: (err) => console.error('Erro ao carregar carrinho:', err)
    });
  }

  adicionarAoCarrinho(produto: Produto): void {
    this.carrinhoService.adicionarAoCarrinho(produto);
  }

  retirarDoCarrinho(produto: Produto): void {
    this.carrinhoService.retirarDoCarrinho(produto);
  }

  diminuirQuantidade(produto: Produto): void {
    this.carrinhoService.diminuirQuantidade(produto);
  }

  calcularTotal(): number {
    let total = 0;

    for (const item of this.itens) {
      total += item.produto.preco * item.quantidade;
    }

    return total;
  }

  finalizarCompra(): void {
    if (this.itens.length === 0) return;

    const compra: Compra = {
      data: new Date().toLocaleString('pt-BR'),
      itens: this.itens,
      total: this.calcularTotal()
    };

    this.comprasService.incluir(compra).subscribe({
      next: () => {
        this.mostrarPopup = true;
      },
      error: () => alert('Não foi possível registrar a compra. Verifique se a API está rodando.')
    });
  }

  fecharPopup(): void {
    this.mostrarPopup = false;
    this.carrinhoService.limparCarrinho();
  }

}
