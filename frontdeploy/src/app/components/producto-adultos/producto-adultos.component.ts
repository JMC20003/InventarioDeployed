import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductoServiceService } from '../../services/producto-service.service';

@Component({
  selector: 'app-producto-adultos',
  standalone: false,
  templateUrl: './producto-adultos.component.html',
  styleUrl: './producto-adultos.component.css'
})
export class ProductoAdultosComponent {
  productoId: string | null = null;

  constructor(private route: ActivatedRoute, private servicioProducto:ProductoServiceService) {}

  productos: Producto[] = [];
  productosAdultos: Producto[] = [];

  ngOnInit() {
    this.cargarProductosAdultos();
    
  }
  cargarProductosAdultos(): void {
    this.servicioProducto.getAllProducts().subscribe({
      next: (productos: Producto[]) => {
        // Filtramos solo los productos con categoría 'adultos' (case insensitive y trim)
        this.productosAdultos = productos.filter(p => 
          p.categoria?.toLowerCase().trim() === 'adultos'
        );
      },
      error: (err) => {
        console.error('Error cargando productos:', err);
      }
    });
  }

}
