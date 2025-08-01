import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { Producto } from '../../models/producto';
import { ProductoServiceService } from '../../services/producto-service.service';
import { CartItem, CartService } from '../../services/cart.service';
import { Productodto } from '../../models/productodto';

@Component({
  selector: 'app-producto-detalle',
  standalone: false,
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css'
})
export class ProductoDetalleComponent {
  URL = 'http://localhost:8080' 
  producto!: Productodto;
  tallaSeleccionada: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoServiceService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.productoService.obtenerProductoPorId(id).subscribe({
        next: (producto) => {
          this.producto = producto;
        },
        error: (error) => {
          console.error('Error al obtener el producto', error);
        }
      });
    }
  }

  seleccionarTalla(talla: string): void {
  if (this.tallaSeleccionada === talla) {
    // Si ya está seleccionada, deselecciona
    this.tallaSeleccionada = null;
  } else {
    // Si no, selecciona
    this.tallaSeleccionada = talla;
  }
}

  isTallaDisponible(talla: string): boolean {
    const tallaObj = this.producto.tallas.find(t => t.talla === talla);
    return tallaObj ? tallaObj.stock > 0 : false;
  }

  guardarEnCarrito(producto: Productodto): void {
  if (!this.tallaSeleccionada) return;

  const item: CartItem = {
    id: producto.id.toString(),
    nombre: producto.nombre,
    precio: producto.precio,
    imagen: producto.imagen,
    descripcion: producto.descripcion,
    cantidad: 1,
    tallaSeleccionada: this.tallaSeleccionada,
    tallas: producto.tallas,
  };

  this.cartService.addToCart(item);
  alert('Producto añadido al carrito');
}

  obtenerStockDeTallaSeleccionada(): number {
  if (!this.tallaSeleccionada) return 0;

  const tallaObj = this.producto.tallas.find(t => t.talla === this.tallaSeleccionada);
  return tallaObj ? tallaObj.stock : 0;
  }

}
