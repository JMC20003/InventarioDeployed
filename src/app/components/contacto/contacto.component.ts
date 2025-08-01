import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contacto',
  standalone: false,
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  contacto = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };
  
  constructor(private dialogRef: MatDialogRef<ContactoComponent>) {}

  enviar() {
    console.log('Formulario enviado:', this.contacto);
    this.dialogRef.close();
  }

  cerrar() {
    this.dialogRef.close();
  }
}
