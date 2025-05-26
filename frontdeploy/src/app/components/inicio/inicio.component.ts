import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductoServiceService } from '../../services/producto-service.service';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  
  productos: Producto[] = []; // Array para almacenar los productos que se mostrarán

  constructor(private servicioProducto: ProductoServiceService) {}

  ngOnInit(): void {
    // Llama al servicio para obtener TODOS los productos
    this.servicioProducto.getAllProducts().subscribe(
      (data: Producto[]) => {
        // Usa slice(0, 6) para obtener solo los primeros 6 elementos del array
        this.productos = data.slice(0, 6);
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
        // Aquí podrías mostrar un mensaje de error en la UI
      }
    );
  }
}
