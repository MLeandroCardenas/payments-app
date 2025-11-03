import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '../../services/payment-service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PaymentResponse } from '../../models/payment-response.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'list-payments',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule,
    MatPaginator, 
    MatPaginatorModule,
    DatePipe
  ],
  templateUrl: './list-payments.html',
  styleUrl: './list-payments.css',
})
export class ListPayments implements OnInit, AfterViewInit {
  public paymentService = inject(PaymentService);
  dataSource = new MatTableDataSource<PaymentResponse>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['numeroReferencia', 'totalCompra', 'estadoTransaccion', 'fechaTransaccion', 'fechaAnulacion'];
  private _snackBar = inject(MatSnackBar);

  
  ngOnInit(): void {
    this.getAllTransactions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public getAllTransactions() {
    this.paymentService.getAllPayments().subscribe({
      next: (pay)=> {
        this.dataSource.data = pay;
      }, error: (err)=> {
        this._snackBar.open('No se obtuvieron las transacciones!!', 'Cerrar', {
           duration: 4000,
           panelClass: ['snackbar-error']
         });
        throw new Error('No se obtuvieron las transacciones!!', err);
      }
    })
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
