import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-carrito',
  standalone: false,
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  productosCarrito: any[] = [];
  producto!: Producto;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.productosCarrito = this.cartService.getItems();
  }
  cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    this.productosCarrito = carrito;
  }
  comprarPorWhatsapp() {
    const mensaje = encodeURIComponent('Hola, quiero comprar estos productos:\n' +
      this.productosCarrito.map(p => `- ${p.nombre}`).join('\n'));
    const telefonoAdmin = '51999999999'; // reemplazar con número del admin
    window.open(`https://wa.me/${telefonoAdmin}?text=${mensaje}`, '_blank');
  }
  eliminarDelCarrito(id: number) {
    const carrito: any[] = JSON.parse(localStorage.getItem('cart') || '[]');

  // Elimina SOLO la primera coincidencia por ID
  const index = carrito.findIndex(p => p.id === id);
  if (index !== -1) {
    carrito.splice(index, 1);
  }

  // Actualiza el localStorage
  localStorage.setItem('cart', JSON.stringify(carrito));

  // Refresca la vista
  this.productosCarrito = carrito;
}
}
