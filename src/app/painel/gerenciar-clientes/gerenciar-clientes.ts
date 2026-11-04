import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Cliente } from '../../models/clientes.model';
import { ClientesService } from '../../services/clientes.service';

@Component({
  imports: [RouterLink, CommonModule, FormsModule],
  selector: 'app-gerenciar-clientes',
  styleUrls: ['../painel.css', './gerenciar-clientes.css'],
  templateUrl: './gerenciar-clientes.html',
})
export class GerenciarClientes implements OnInit {
  private service = inject(ClientesService);

  listaClientes = signal<Cliente[]>([]);
  busca: string = '';

  ngOnInit(): void {
    this.service.listar().subscribe({
      next: (clientes) => {
        this.listaClientes.set(clientes);
      },
      error: () => alert('Não foi possível carregar os clientes. Verifique se a API está rodando.')
    });
  }

  excluir(cliente: Cliente) {
    if (!confirm(`Deseja excluir o cliente ${cliente.nome}?`)) {
      return;
    }

    this.service.excluir(cliente.id).subscribe({
      next: () => {
        this.listaClientes.update(lista => lista.filter(c => c.id !== cliente.id));
      }
    });
  }

  //filtra a lista pelo nome ou CPF digitados na busca
  filtrarClientes(): Cliente[] {
    const texto = this.busca.toLowerCase();
    return this.listaClientes().filter(c =>
      c.nome.toLowerCase().includes(texto) || c.cpf.includes(texto)
    );
  }

  contarNewsletter(): number {
    return this.listaClientes().filter(c => c.newsletter).length;
  }
}
