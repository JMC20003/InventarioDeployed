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
      // Filtramos por categoría adultos
      const filtrados = productos.filter(p =>
        p.categoria?.toLowerCase().trim() === 'niños'
      );

      // Agrupar por nombre de producto
      const agrupados: { [nombre: string]: Producto } = {};

      filtrados.forEach(producto => {
        const nombre = producto.nombre.trim();

        if (!agrupados[nombre]) {
          // Clonar el producto y empezar a juntar tallas
          agrupados[nombre] = { ...producto, talla: [producto.talla as string] };
        } else {
          // Si ya existe, agregar talla al array (si no está repetida)
          const tallas = agrupados[nombre].talla as string[];
          if (!tallas.includes(producto.talla as string)) {
            tallas.push(producto.talla as string);
          }
        }
      });

      // Convertimos el objeto agrupado en array
      this.productosNinos = Object.values(agrupados);
    },
    error: (err) => {
      console.error('Error cargando productos:', err);
    }
  });
  }
}
