import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { categoriaProduto, Produto } from '../../models/produtos.model';
import { ProdutosService } from '../../services/produtos.service';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-produto-form',
  styleUrls: ['../painel.css', './produto-form.css'],
  templateUrl: './produto-form.html',
})
export class ProdutoForm implements OnInit {
  private service = inject(ProdutosService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  //começa com uma categoria padrão selecionada
  produto = signal<Produto>({ categoria: categoriaProduto.PROTEINAS, maisVendido: false } as Produto);

  //se tiver id na rota é alteração, senão é cadastro
  produtoId: string | null = this.route.snapshot.paramMap.get('id');

  categorias = [
    categoriaProduto.PROTEINAS,
    categoriaProduto.CREATINA,
    categoriaProduto.PRE_TREINO,
    categoriaProduto.VITAMINAS,
    categoriaProduto.VESTIMENTAS,
    categoriaProduto.ACESSORIOS
  ];

  ngOnInit(): void {
    if (this.produtoId) {
      this.service.buscarPorId(this.produtoId).subscribe({
        next: (produto) => {
          this.produto.set(produto);
        },
        error: () => alert('Produto não encontrado!')
      });
    }
  }

  salvar() {
    if (this.produtoId) {
      this.service.editar(this.produto()).subscribe({
        next: () => {
          alert('Produto alterado com sucesso!');
          this.router.navigate(['/colaborador/produtos']);
        }
      });
    } else {
      this.service.incluir(this.produto()).subscribe({
        next: () => {
          alert('Produto cadastrado com sucesso!');
          this.router.navigate(['/colaborador/produtos']);
        }
      });
    }
  }
}
