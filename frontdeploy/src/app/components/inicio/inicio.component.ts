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
  // allRawProducts: Producto[] = []; // Opcional: para guardar los datos crudos si alguna vez los necesitas
  allGroupedProducts: Producto[] = []; // Todos los productos agrupados por nombre y con tallas en un array
  filteredProducts: Producto[] = []; // Productos actualmente mostrados en la UI
  activeFilter: string = 'todos'; // Filtro activo (ej: 'todos', 'adultos', 'niños', etc.)

  constructor(
    private productoService: ProductoServiceService,
    private cartService: CartService // Si lo vas a usar para añadir al carrito desde aquí
  ) { }

  ngOnInit(): void {
    // Carga todos los productos de una vez al iniciar el componente
    this.productoService.getAllProducts().subscribe({
      next: (data: Producto[]) => {
        // Opcional: Filtrar productos inactivos si tienes esa lógica
        const activeProducts = data

        // Agrupa TODOS los productos por nombre y consolida sus tallas.
        // Este es el paso clave: agrupamos una sola vez.
        this.allGroupedProducts = this.groupProductsByName(activeProducts);

        // Inicialmente, muestra los primeros 6 productos agrupados o todos si hay menos
        this.filteredProducts = [...this.allGroupedProducts].slice(0, 6);

        console.log('Productos crudos recibidos:', data);
        console.log('Productos agrupados (allGroupedProducts):', this.allGroupedProducts);
        console.log('Productos iniciales (filteredProducts):', this.filteredProducts);
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }

  // --- Lógica de Agrupación (reutilizada y centralizada) ---
  private groupProductsByName(products: Producto[]): Producto[] {
    const grouped: { [nombre: string]: Producto } = {};

    products.forEach(producto => {
      const nombre = producto.nombre.trim().toLowerCase(); // Normaliza el nombre para agrupar (ej: "Camiseta" y "camiseta" sean lo mismo)
      const talla = producto.talla as string; // Asumimos que 'talla' viene como string aquí

      if (!grouped[nombre]) {
        // Primera vez que vemos este nombre, creamos una entrada con la talla como array
        grouped[nombre] = { ...producto, talla: [talla] };
      } else {
        // Ya existe, añadimos la talla si no está ya
        const currentTallas = grouped[nombre].talla as string[];
        if (!currentTallas.includes(talla)) {
          currentTallas.push(talla);
          // Opcional: Actualizar otras propiedades si la imagen/precio podría variar y quieres la del primer o último visto
          // grouped[nombre].precio = producto.precio;
          // grouped[nombre].imagen = producto.imagen;
        }
      }
    });

    return Object.values(grouped);
  }

  // --- Lógica de Filtrado (ahora basada en la lista ya agrupada) ---
  setFilter(filter: string): void {
    this.activeFilter = filter; // Actualiza el filtro activo para la UI

    // Siempre filtramos desde la lista completa de productos ya agrupados
    let productsToProcess = [...this.allGroupedProducts]; // Crear una copia para no modificar el original

    if (filter === 'todos') {
      // Si el filtro es 'todos', mostramos los primeros 6 de la lista agrupada completa
      this.filteredProducts = productsToProcess.slice(0, 6);
    } else {
      // Si es cualquier otro filtro (ej. 'adultos', 'niños', 'futbol', etc.)
      this.filteredProducts = productsToProcess.filter(p =>
        // Filtramos por categoría (normalizamos a minúsculas para coincidencia)
        p.categoria?.toLowerCase().trim() === filter.toLowerCase()
        // Puedes añadir más condiciones de filtro aquí si necesitas filtrar por otros criterios
        // || p.nombre.toLowerCase().includes(filter.toLowerCase()) // Ejemplo: buscar el filtro en el nombre
      );
    }
    console.log('Productos filtrados:', this.filteredProducts);
  }

  // --- Método para ver detalles del producto (opcional, como se discutió antes) ---
  viewProductDetails(product: Producto): void {
    // Aquí puedes navegar a una página de detalles donde muestres todas las tallas
    // disponibles para este producto específico (por su nombre o ID principal si existe).
    console.log(`Ver detalles para el producto: ${product.nombre}. Tallas: ${ (product.talla as string[]).join(', ')}`);
    // Por ejemplo: this.router.navigate(['/productos/detalle', product.nombre]);
  }
}