import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ContactoComponent } from '../contacto/contacto.component';
@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
@ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private dialog: MatDialog) {}

  abrirFormularioContacto() {
    this.dialog.open(ContactoComponent, {
      width: '400px'
    });
  }
}
