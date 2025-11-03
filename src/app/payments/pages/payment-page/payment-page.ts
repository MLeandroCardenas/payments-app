import { Component, inject, ViewChild } from '@angular/core';
import { ListPayments } from "../../components/list-payments/list-payments";
import { MatDialog } from '@angular/material/dialog';
import { AddPayment } from '../../components/add-payment/add-payment';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [ListPayments, MatButtonModule],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.css',
})
export class PaymentPage {

  readonly dialog = inject(MatDialog);
  @ViewChild(ListPayments) listPayments!: ListPayments;

   public openDialogInsertPayments(enterAnimationDuration: string, exitAnimationDuration: string): void {
        const dialogRef = this.dialog.open(AddPayment, {
          width: '500px',
          enterAnimationDuration,
          exitAnimationDuration,
        });
  
        dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Datos recibidos:', result);
           this.listPayments.getAllTransactions();
        }
      });
    }

}
