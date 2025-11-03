import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuTop } from "./shared/components/menu-top/menu-top";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuTop],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('payments-app');
}
