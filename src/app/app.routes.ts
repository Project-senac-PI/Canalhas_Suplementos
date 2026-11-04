import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './auth/login/login';
import { Cadastro } from './auth/cadastro/cadastro';
import { Produtos } from './pages/produtos/produtos';
import { LoginColaborador } from './auth/login-colaborador/login-colaborador';
import { CadastroColaborador } from './auth/cadastro-colaborador/cadastro-colaborador';
import { Cart } from './pages/cart/cart';
import { GerenciarProdutos } from './painel/gerenciar-produtos/gerenciar-produtos';
import { ProdutoForm } from './painel/produto-form/produto-form';
import { GerenciarFuncionarios } from './painel/gerenciar-funcionarios/gerenciar-funcionarios';
import { FuncionarioForm } from './painel/funcionario-form/funcionario-form';
import { GerenciarClientes } from './painel/gerenciar-clientes/gerenciar-clientes';

export const routes: Routes = [
    { path:'', component:Home },
    { path:'login', component:Login },
    { path:'cadastro', component:Cadastro},
    { path:'colaborador/login', component:LoginColaborador },
    { path:'colaborador/cadastro', component:CadastroColaborador },

    //painel - produtos
    { path:'colaborador/produtos', component:GerenciarProdutos },
    { path:'colaborador/produtos/novo', component:ProdutoForm },
    { path:'colaborador/produtos/editar/:id', component:ProdutoForm },

    //painel - funcionários
    { path:'colaborador/funcionarios', component:GerenciarFuncionarios },
    { path:'colaborador/funcionarios/novo', component:FuncionarioForm },
    { path:'colaborador/funcionarios/editar/:id', component:FuncionarioForm },

    //painel - clientes (o cadastro e a alteração usam a mesma tela de cadastro do site)
    { path:'colaborador/clientes', component:GerenciarClientes },
    { path:'colaborador/clientes/editar/:id', component:Cadastro },

    { path:'produtos', component:Produtos},
    { path:'cart', component:Cart}

];
