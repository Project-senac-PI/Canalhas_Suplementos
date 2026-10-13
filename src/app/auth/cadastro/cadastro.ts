import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-cadastro',
  styleUrls: ['../auth.css', './cadastro.css'],
  templateUrl: './cadastro.html',
})
export class Cadastro {
  constructor(private router: Router) {}

  cadastrar(evento: Event) {
    evento.preventDefault();
    this.router.navigate(['/login']);
  }
}
