import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { cargoFuncionario, Funcionario, setorFuncionario } from '../../models/funcionarios.model';
import { FuncionariosService } from '../../services/funcionarios.service';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-cadastro-colaborador',
  styleUrls: ['../auth.css', './cadastro-colaborador.css'],
  templateUrl: './cadastro-colaborador.html',
})
export class CadastroColaborador {
  private service = inject(FuncionariosService);
  private router = inject(Router);

  //começa com um cargo e um setor padrão selecionados
  funcionario = signal<Funcionario>({ cargo: cargoFuncionario.VENDEDOR, setor: setorFuncionario.VENDAS } as Funcionario);
  confirmarSenha: string = '';

  cargos = [
    cargoFuncionario.VENDEDOR,
    cargoFuncionario.ATENDENTE,
    cargoFuncionario.ESTOQUISTA,
    cargoFuncionario.GERENTE,
    cargoFuncionario.ADMINISTRADOR
  ];

  setores = [
    setorFuncionario.VENDAS,
    setorFuncionario.ATENDIMENTO,
    setorFuncionario.ESTOQUE_LOGISTICA,
    setorFuncionario.FINANCEIRO,
    setorFuncionario.ADMINISTRACAO
  ];

  cadastrar() {
    if (this.funcionario().senha !== this.confirmarSenha) {
      alert('As senhas não são iguais.');
      return;
    }

    this.service.incluir(this.funcionario()).subscribe({
      next: () => {
        alert('Colaborador cadastrado com sucesso!');
        this.router.navigate(['/colaborador/login']);
      }
    });
  }
}
