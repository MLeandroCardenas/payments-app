import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ServiceCard } from '../../services/service-card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CardResponse } from '../../models/card-response.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'list-cards',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule,
    MatPaginator, 
    MatPaginatorModule
  ],
  templateUrl: './list-cards.html',
  styleUrl: './list-cards.css',
})
export class ListCards implements OnInit, AfterViewInit {

  public cardService = inject(ServiceCard);
  dataSource = new MatTableDataSource<CardResponse>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['pan', 'tipo', 'estado', 'numeroValidacion', 'identificador'];  
  private _snackBar = inject(MatSnackBar);

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadCars();
  }

  public loadCars() {
    this.cardService.getAllCards().subscribe({
      next: (cards)=> {
        this.dataSource.data = cards;
      }, error: (err)=> {
        this._snackBar.open('No se obtuvieron las tarjetas!!', 'Cerrar', {
           duration: 4000,
           panelClass: ['snackbar-error']
         });
        throw new Error('No se obtuvieron las tarjetas!!', err);
      }
    })
  }
  
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
