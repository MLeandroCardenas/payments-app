import { Component, inject, ViewChild } from '@angular/core';
import { ListCards } from "../../components/list-cards/list-cards";
import { MatDialog } from '@angular/material/dialog';
import { AddCard } from '../../components/add-card/add-card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [ListCards, MatButtonModule],
  templateUrl: './card-page.html',
  styleUrl: './card-page.css',
})
export class CardPage {
  readonly dialog = inject(MatDialog);
   @ViewChild(ListCards) listCards!: ListCards;

  public openDialogInsertCards(enterAnimationDuration: string, exitAnimationDuration: string): void {
      const dialogRef = this.dialog.open(AddCard, {
        width: '500px',
        enterAnimationDuration,
        exitAnimationDuration,
      });

      dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos recibidos:', result);
         this.listCards.loadCars();
      }
    });
  }

}
