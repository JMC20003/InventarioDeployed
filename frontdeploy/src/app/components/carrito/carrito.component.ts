import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../services/cart.service';
import { Producto } from '../../models/producto';
import { Productodto } from '../../models/productodto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrito',
  standalone: false,
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit, OnDestroy {
  productosCarrito: CartItem[] = []; // Asegúrate de que sea de tipo CartItem
  subtotal: number = 0;
  totalItems: number = 0;
  private cartSubscription: Subscription = new Subscription(); // Para desuscribirse al destruir el componente

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // Suscribirse a los cambios del carrito
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.productosCarrito = items;
      this.calcularTotales();
    });
  }

  ngOnDestroy(): void {
    // Es importante desuscribirse para evitar fugas de memoria
    this.cartSubscription.unsubscribe();
  }

  calcularTotales(): void {
    this.subtotal = 0;
    this.totalItems = 0;
    for (const item of this.productosCarrito) {
      this.subtotal += item.precio * item.cantidad;
      this.totalItems += item.cantidad;
    }
  }

  cambiarCantidad(item: CartItem, cambio: number): void {
    // Asegúrate de que la cantidad no sea menor que 1
    const nuevaCantidad = item.cantidad + cambio;
    if (nuevaCantidad > 0) {
      this.cartService.updateItemQuantity(item.id, item.tallaSeleccionada, nuevaCantidad);
    } else {
      // Si la cantidad llega a 0 o menos, eliminar el producto
      this.eliminarDelCarrito(item.id, item.tallaSeleccionada);
    }
  }

  eliminarDelCarrito(id: string, tallaSeleccionada: string): void {
    // Llama al servicio de carrito para remover el item específico
    this.cartService.removeItemFromCart(id, tallaSeleccionada);
  }

  comprarPorWhatsapp(): void {
    // Generar el mensaje de WhatsApp
    let mensaje = "¡Hola! Me gustaría comprar los siguientes productos:\n\n";
    this.productosCarrito.forEach(item => {
      mensaje += `- ${item.nombre} (Talla: ${item.tallaSeleccionada}, Cantidad: ${item.cantidad}, Precio unitario: $${item.precio.toFixed(2)})\n`;
    });
    mensaje += `\nTotal a pagar: $${this.subtotal.toFixed(2)}`;

    // Codificar el mensaje para la URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    // Número de WhatsApp (ejemplo, reemplaza con tu número real)
    const numeroWhatsapp = "5491170266475"; // Reemplaza con tu número de WhatsApp real (incluyendo el código de país sin el +)

    const url = `https://wa.me/${numeroWhatsapp}?text=${mensajeCodificado}`;
    window.open(url, '_blank'); // Abre en una nueva pestaña
  }
}
