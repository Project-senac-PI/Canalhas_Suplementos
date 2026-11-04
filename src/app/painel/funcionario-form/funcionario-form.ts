import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { cargoFuncionario, Funcionario, setorFuncionario } from '../../models/funcionarios.model';
import { FuncionariosService } from '../../services/funcionarios.service';

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-funcionario-form',
  styleUrls: ['../painel.css', './funcionario-form.css'],
  templateUrl: './funcionario-form.html',
})
export class FuncionarioForm implements OnInit {
  private service = inject(FuncionariosService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  //começa com um cargo e um setor padrão selecionados
  funcionario = signal<Funcionario>({ cargo: cargoFuncionario.VENDEDOR, setor: setorFuncionario.VENDAS } as Funcionario);
  confirmarSenha: string = '';

  //se tiver id na rota é alteração, senão é cadastro
  funcionarioId: string | null = this.route.snapshot.paramMap.get('id');

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

  ngOnInit(): void {
    if (this.funcionarioId) {
      this.service.buscarPorId(this.funcionarioId).subscribe({
        next: (funcionario) => {
          this.confirmarSenha = funcionario.senha ?? '';
          this.funcionario.set(funcionario);
        },
        error: () => alert('Funcionário não encontrado!')
      });
    }
  }

  salvar() {
    if (this.funcionario().senha !== this.confirmarSenha) {
      alert('As senhas não são iguais.');
      return;
    }

    if (this.funcionarioId) {
      this.service.editar(this.funcionario()).subscribe({
        next: () => {
          alert('Funcionário alterado com sucesso!');
          this.router.navigate(['/colaborador/funcionarios']);
        }
      });
    } else {
      this.service.incluir(this.funcionario()).subscribe({
        next: () => {
          alert('Funcionário cadastrado com sucesso!');
          this.router.navigate(['/colaborador/funcionarios']);
        }
      });
    }
  }
}
