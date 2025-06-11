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
      // Filtramos por categoría adultos
      const filtrados = productos.filter(p =>
        p.categoria?.toLowerCase().trim() === 'adultos'
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
      this.productosAdultos = Object.values(agrupados);
    },
    error: (err) => {
      console.error('Error cargando productos:', err);
    }
  });
}

  //getTallasString(talla: string | string[]): string {
    //return Array.isArray(talla) ? talla.join(', ') : talla;
  //}

}
