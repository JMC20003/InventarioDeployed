import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { Producto } from '../../models/producto';
import { ProductoServiceService } from '../../services/producto-service.service';
import { CartService } from '../../services/cart.service';
import { Productodto } from '../../models/productodto';

@Component({
  selector: 'app-producto-detalle',
  standalone: false,
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css'
})
export class ProductoDetalleComponent {
  producto!: Productodto;
  id:number=0;
  tallaSeleccionada: string | null = null; // Para almacenar la talla seleccionada

  constructor(private route: ActivatedRoute, private productoService: ProductoServiceService, private cartService:CartService){}
  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productoService.obtenerProductoPorId(+id).subscribe((data) => {
        this.producto = data;
      });
    }  
  }
  
  seleccionarTalla(talla: string): void {
    this.tallaSeleccionada = talla;
    console.log('Talla seleccionada:', this.tallaSeleccionada);
    // Aquí podrías añadir lógica adicional si es necesario, como verificar stock por talla
  }

  isTallaDisponible(talla: string): boolean {
    // Implementa tu lógica para verificar si la talla está disponible.
    // Esto podría implicar verificar el stock para esa talla específica
    // Si tu `stockTotal` ya considera las tallas individuales, esta función
    // podría ser más simple o incluso innecesaria si todas las tallas listadas
    // en `p.tallas` siempre tienen stock.
    // Por ejemplo, si tienes un mapa de stock por talla:
    // return this.producto?.stockPorTalla[talla] > 0;
    return true; // Por ahora, asumimos que todas las tallas listadas están disponibles
  }
   
  guardarEnCarrito(producto: Productodto): void {
    if (this.tallaSeleccionada) {
      const itemParaCarrito = {
        ...producto,
        tallaSeleccionada: this.tallaSeleccionada,
        cantidad: 1 // Puedes añadir un selector de cantidad si lo necesitas
      };
      this.cartService.addToCart(itemParaCarrito);
      alert(`Producto "${producto.nombre}" (Talla: ${this.tallaSeleccionada}) agregado al carrito.`);
      // Opcional: Podrías resetear la talla seleccionada después de añadir al carrito
      // this.tallaSeleccionada = null;
    } else {
      alert('Por favor, selecciona una talla antes de añadir al carrito.');
    }
  }
}
