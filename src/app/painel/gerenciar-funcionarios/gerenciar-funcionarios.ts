import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { cargoFuncionario, Funcionario, setorFuncionario } from '../../models/funcionarios.model';
import { FuncionariosService } from '../../services/funcionarios.service';

@Component({
  imports: [RouterLink, CommonModule, FormsModule],
  selector: 'app-gerenciar-funcionarios',
  styleUrls: ['../painel.css', './gerenciar-funcionarios.css'],
  templateUrl: './gerenciar-funcionarios.html',
})
export class GerenciarFuncionarios implements OnInit {
  private service = inject(FuncionariosService);

  listaFuncionarios = signal<Funcionario[]>([]);
  busca: string = '';

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
    this.service.listar().subscribe({
      next: (funcionarios) => {
        this.listaFuncionarios.set(funcionarios);
      },
      error: () => alert('Não foi possível carregar os funcionários. Verifique se a API está rodando.')
    });
  }

  excluir(funcionario: Funcionario) {
    if (!confirm(`Deseja excluir o funcionário ${funcionario.nome}?`)) {
      return;
    }

    this.service.excluir(funcionario.id).subscribe({
      next: () => {
        this.listaFuncionarios.update(lista => lista.filter(f => f.id !== funcionario.id));
      }
    });
  }

  //filtra a lista pelo nome ou matrícula digitados na busca
  filtrarFuncionarios(): Funcionario[] {
    const texto = this.busca.toLowerCase();
    return this.listaFuncionarios().filter(f =>
      f.nome.toLowerCase().includes(texto) || f.matricula.toLowerCase().includes(texto)
    );
  }
}
