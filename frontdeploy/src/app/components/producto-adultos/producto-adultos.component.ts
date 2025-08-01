import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductoServiceService } from '../../services/producto-service.service';
import { Productodto } from '../../models/productodto';

@Component({
  selector: 'app-producto-adultos',
  standalone: false,
  templateUrl: './producto-adultos.component.html',
  styleUrl: './producto-adultos.component.css'
})
export class ProductoAdultosComponent {
  productosAdultos: Productodto[] = [];
  URL = 'http://localhost:8080'
  
  constructor(private productoService: ProductoServiceService) {}

  ngOnInit(): void {
    this.cargarProductosAdultos();
  }

  cargarProductosAdultos(): void {
    this.productoService.obtenerTodosLosProductos().subscribe({
      next: (productos) => {
        // Filtrar los productos que tienen categoría 'adultos' (sin importar mayúsculas/minúsculas)
        this.productosAdultos = productos.filter(
          producto => producto.categoria.toLowerCase() === 'adultos'
        );
      },
      error: (err) => {
        console.error('Error al cargar productos para adultos', err);
      }
    });
  }

}
