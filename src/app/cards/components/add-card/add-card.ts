import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ServiceCard } from '../../services/service-card';
import { Card } from '../../models/card.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'add-card',
  imports: [
    MatButtonModule, 
    MatDialogActions, 
    MatDialogTitle, 
    MatDialogContent,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add-card.html',
  styleUrl: './add-card.css',
})
export class AddCard {
  readonly dialogRef = inject(MatDialogRef<AddCard>);
  private _snackBar = inject(MatSnackBar);
  private serviceCard = inject(ServiceCard);
  private fb = inject(FormBuilder);

  cardForm = this.fb.group({
  pan: [
    '',
    [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(19),
      Validators.pattern(/^\d+$/)
    ]
  ],
  titular: [
    '',
    [
      Validators.required,
      Validators.pattern(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/)
    ]
  ],
  cedula: [
    '',
    [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.minLength(10),
      Validators.maxLength(15)
    ]
  ],
  tipo: ['C', Validators.required],
  phone: [
    '',
    [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.minLength(10),
      Validators.maxLength(10)
    ]
  ],
});


   public onSubmit(): void {
    if (this.cardForm.valid) {
      const newCard = this.cardForm.value as unknown as Card;
      this.serviceCard.createCard(newCard).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
        },
        error: (err) => {
          this._snackBar.open('Error al crear la tarjeta', 'Cerrar', {
            duration: 4000,
            panelClass: ['snackbar-error']
          });
        }
      });
    } else {
      this.cardForm.markAllAsTouched();
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

}
