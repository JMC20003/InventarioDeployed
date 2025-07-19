import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoServiceService } from '../../services/producto-service.service';
import { Producto } from '../../models/producto';
import { Productodto } from '../../models/productodto';

@Component({
  selector: 'app-producto-menores',
  standalone: false,
  templateUrl: './producto-menores.component.html',
  styleUrl: './producto-menores.component.css'
})
export class ProductoMenoresComponent {
  productosNinos: Productodto[] = [];

  constructor(private productoService: ProductoServiceService) {}

  ngOnInit(): void {
    this.cargarProductosAdultos();
  }

  cargarProductosAdultos(): void {
    this.productoService.obtenerTodosLosProductos().subscribe({
      next: (productos) => {
        // Filtrar los productos que tienen categoría 'adultos' (sin importar mayúsculas/minúsculas)
        this.productosNinos = productos.filter(
          producto => producto.categoria.toLowerCase() === 'niños'
        );
      },
      error: (err) => {
        console.error('Error al cargar productos para adultos', err);
      }
    });
  }
}
