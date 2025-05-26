import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoServiceService } from '../../services/producto-service.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-producto-menores',
  standalone: false,
  templateUrl: './producto-menores.component.html',
  styleUrl: './producto-menores.component.css'
})
export class ProductoMenoresComponent {
  productoId: string | null = null;

  constructor(private route: ActivatedRoute, private servicioProducto:ProductoServiceService) {}

  productos: Producto[] = [];
  productosNinos: Producto[] = [];

  ngOnInit() {
    this.cargarProductosMenores();
    
  }

cargarProductosMenores(): void {
    this.servicioProducto.getAllProducts().subscribe({
      next: (productos: Producto[]) => {
        // Filtramos solo los productos con categoría 'niños' (case insensitive y trim)
        this.productosNinos = productos.filter(p => 
          p.categoria?.toLowerCase().trim() === 'niños'
        );
      },
      error: (err) => {
        console.error('Error cargando productos:', err);
      }
    });
  }
}
