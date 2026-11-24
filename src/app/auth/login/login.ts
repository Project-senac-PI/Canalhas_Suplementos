import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-login',
  styleUrls: ['../auth.css', './login.css'],
  templateUrl: './login.html',
})
export class Login {
  private service = inject(ClientesService);
  private router = inject(Router);

  usuario: string = '';
  senha: string = '';

  //procura um cliente com o e-mail (ou CPF) e a senha digitados
  entrar() {
    if (this.usuario === 'admin@canalhas.com' && this.senha === 'admin') {
      localStorage.setItem('admin', 'sim');
      alert('Bem-vindo Admin!');
      this.router.navigate(['/']);
      return;
    }

    this.service.listar().subscribe({
      next: (clientes) => {
        const cliente = clientes.find(c =>
          (c.email === this.usuario || c.cpf === this.usuario) && c.senha === this.senha
        );

        if (cliente) {
          localStorage.removeItem('admin');
          alert(`Bem-vindo ${cliente.nome}!`);
          this.router.navigate(['/']);
        } else {
          alert('E-mail/CPF ou senha inválidos.');
        }
      }
    });
  }
}
