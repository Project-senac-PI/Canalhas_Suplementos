import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FuncionariosService } from '../../services/funcionarios.service';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-login-colaborador',
  styleUrls: ['../auth.css', './login-colaborador.css'],
  templateUrl: './login-colaborador.html',
})
export class LoginColaborador {
  private service = inject(FuncionariosService);
  private router = inject(Router);

  usuario: string = '';
  senha: string = '';

  //procura um funcionário com a matrícula (ou e-mail) e a senha digitados
  entrar() {
    this.service.listar().subscribe({
      next: (funcionarios) => {
        const funcionario = funcionarios.find(f =>
          (f.matricula === this.usuario || f.email === this.usuario) && f.senha === this.senha
        );

        if (funcionario) {
          alert(`Bem-vindo ${funcionario.nome}!`);
          this.router.navigate(['/colaborador/produtos']);
        } else {
          alert('Matrícula/e-mail ou senha inválidos.');
        }
      }
    });
  }
}
