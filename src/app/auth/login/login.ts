import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-login',
  styleUrls: ['../auth.css', './login.css'],
  templateUrl: './login.html',
})
export class Login {
  constructor(private router: Router) {}

  entrar(evento: Event) {
    evento.preventDefault();
    this.router.navigate(['/']);
  }
}
