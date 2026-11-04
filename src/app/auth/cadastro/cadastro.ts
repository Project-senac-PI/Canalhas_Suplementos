import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cliente } from '../../models/clientes.model';
import { ClientesService } from '../../services/clientes.service';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-cadastro',
  styleUrls: ['../auth.css', './cadastro.css'],
  templateUrl: './cadastro.html',
})
export class Cadastro implements OnInit {
  private service = inject(ClientesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  cliente = signal<Cliente>({ newsletter: false } as Cliente);
  confirmarSenha: string = '';

  //se tiver id na rota é alteração feita pelo painel, senão é o cadastro do site
  clienteId: string | null = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    if (this.clienteId) {
      this.service.buscarPorId(this.clienteId).subscribe({
        next: (cliente) => {
          this.confirmarSenha = cliente.senha ?? '';
          this.cliente.set(cliente);
        },
        error: () => alert('Cliente não encontrado!')
      });
    }
  }

  salvar() {
    if (this.cliente().senha !== this.confirmarSenha) {
      alert('As senhas não são iguais.');
      return;
    }

    if (this.clienteId) {
      this.service.editar(this.cliente()).subscribe({
        next: () => {
          alert('Cliente alterado com sucesso!');
          this.router.navigate(['/colaborador/clientes']);
        }
      });
    } else {
      this.service.incluir(this.cliente()).subscribe({
        next: () => {
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
