import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class Menu {
  ehAdmin() {
    return localStorage.getItem('admin') === 'sim';
  }

  sair() {
    localStorage.removeItem('admin');
  }
}
