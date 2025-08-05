import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../services/cart.service';
import { Productodto } from '../../models/productodto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrito',
  standalone: false,
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  productosCarrito: CartItem[] = [];
  subtotal: number = 0;
  totalItems: number = 0;
  URL = 'https://api.tiendarjsc.site'
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.productosCarrito = items;
      this.actualizarTotales();
    });
  }

  actualizarTotales(): void {
    this.totalItems = this.productosCarrito.reduce((acc, item) => acc + item.cantidad, 0);
    this.subtotal = this.productosCarrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  }

 cambiarCantidad(producto: CartItem, cambio: number): void {
  const nuevaCantidad = producto.cantidad + cambio;

  const tallaStock = producto.tallas?.find(t => t.talla === producto.tallaSeleccionada);
  const stockDisponible = tallaStock?.stock ?? Infinity;

  if (nuevaCantidad <= 0) {
    this.eliminarDelCarrito(producto.id, producto.tallaSeleccionada);
  } else if (nuevaCantidad <= stockDisponible) {
    this.cartService.updateItemQuantity(producto.id, producto.tallaSeleccionada, nuevaCantidad);
  } else {
    alert(`Solo hay ${stockDisponible} unidades disponibles de la talla ${producto.tallaSeleccionada}.`);
  }
  }

  eliminarDelCarrito(id: string, talla: string): void {
    this.cartService.removeItemFromCart(id, talla);
  }

  comprarPorWhatsapp(): void {
    const mensaje = this.generarMensajeWhatsapp();
    const numero = '+5491170266475'; // Reemplaza con el número real
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }

  generarMensajeWhatsapp(): string {
    let mensaje = '¡Hola! Quiero comprar los siguientes productos: ';

    this.productosCarrito.forEach(prod => {
      mensaje += `- ${prod.nombre} (Talla: ${prod.tallaSeleccionada}, Cantidad: ${prod.cantidad}) - ${prod.precio} USD c/u%0A`;
    });

    mensaje += `%0ATotal: ${this.subtotal.toFixed(2)} USD`;
    return mensaje;
  }
}
