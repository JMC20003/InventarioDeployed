import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductoServiceService } from '../../services/producto-service.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  allProducts: Producto[] = []; // Todos los productos cargados
  filteredProducts: Producto[] = []; // Productos mostrados después de aplicar filtros
  activeFilter: string = 'todos'; // Filtro activo (ej: 'todos', 'futbol', 'basquet')

  constructor(
    private productoService: ProductoServiceService,
    private cartService: CartService // Si vas a añadir productos desde aquí
  ) { }

  ngOnInit(): void {
    // Carga tus productos (puedes obtener solo los destacados si tu API lo permite)
    this.productoService.getAllProducts().subscribe(
      (data: Producto[]) => {
        this.allProducts = data.slice(0, 6);
        this.filteredProducts = data; // Al inicio, muestra todos los destacados

      },
      error => {
        console.error('Error al obtener productos destacados:', error);
      }
    );
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    if (filter === 'todos') {
      this.filteredProducts = [...this.allProducts];
    } else {
      // Asume que tus productos tienen una propiedad 'categoria' o 'tipo'
      // O puedes inferir la categoría por el nombre del producto si es necesario
      this.filteredProducts = this.allProducts.filter(p =>
        p.nombre.toLowerCase().includes(filter.toLowerCase()) ||
        (p.categoria && p.categoria.toLowerCase() === filter.toLowerCase()) // Asume que tienes una 'categoria'
      );
    }
  }
}
