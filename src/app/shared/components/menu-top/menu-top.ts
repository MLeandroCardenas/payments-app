import {Component} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'menu-top',
  imports: [MatButtonModule, MatMenuModule, RouterLink],
  templateUrl: './menu-top.html',
  styleUrl: './menu-top.css',
})
export class MenuTop {

}
