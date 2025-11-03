import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentService } from '../../services/payment-service';
import { Payment } from '../../models/Payment.interface';

@Component({
  selector: 'add-payment',
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
  templateUrl: './add-payment.html',
  styleUrl: './add-payment.css',
})
export class AddPayment {
  readonly dialogRef = inject(MatDialogRef<AddPayment>);
  private _snackBar = inject(MatSnackBar);
  private servicePayment = inject(PaymentService);
  private fb = inject(FormBuilder);

  payForm = this.fb.group({
  identificador: [
    '',
    [
      Validators.required,
      Validators.minLength(64),
      Validators.maxLength(64),
      Validators.pattern(/^[a-fA-F0-9]+$/) // solo caracteres hexadecimales
    ]
  ],
  numeroReferencia: [
    '',
    [
      Validators.required,
      Validators.pattern(/^\d+$/), // solo números
      Validators.minLength(6),
      Validators.maxLength(6)
    ]
  ],
  totalCompra: [
    '',
    [
      Validators.required,
      Validators.min(1) // no puede ser cero o negativo
    ]
  ],
  direccion: [
    '',
    [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]
  ]
});


  public onCancel(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
      if (this.payForm.valid) {
        const newPay = this.payForm.value as unknown as Payment;
        this.servicePayment.createPayment(newPay).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (err) => {
            this._snackBar.open('Error al crear la transacción', 'Cerrar', {
              duration: 4000,
              panelClass: ['snackbar-error']
            });
          }
        });
      } else {
        this.payForm.markAllAsTouched();
      }
    }

}
