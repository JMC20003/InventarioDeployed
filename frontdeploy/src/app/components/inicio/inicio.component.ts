import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductoServiceService } from '../../services/producto-service.service';
import { CartService } from '../../services/cart.service';
import { Productodto } from '../../models/productodto';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
 productos: Productodto[] = [];
  filteredProducts: Productodto[] = [];
  activeFilter: string = 'todos';

  constructor(private productoService: ProductoServiceService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.obtenerTodosLosProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.filtrarProductos(); // Aplica filtro inicial
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
      }
    });
  }

  setFilter(filtro: string): void {
    this.activeFilter = filtro;
    this.filtrarProductos();
  }

  filtrarProductos(): void {
    if (this.activeFilter === 'todos') {
      this.filteredProducts = this.productos;
    } else {
      this.filteredProducts = this.productos.filter(
        producto => producto.categoria.toLowerCase() === this.activeFilter.toLowerCase()
      );
    }
  }
}