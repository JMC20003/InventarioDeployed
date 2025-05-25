import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { Producto } from '../../models/producto';
import { ProductoServiceService } from '../../services/producto-service.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-producto-detalle',
  standalone: false,
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css'
})
export class ProductoDetalleComponent {
  producto!: Producto;
  id:number=0;
  constructor(private route: ActivatedRoute, private productoService: ProductoServiceService, private cartService:CartService){}
  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productoService.obtenerProductoPorId(+id).subscribe((data) => {
        this.producto = data;
      });
    }  
  }

  guardarEnCarrito(producto: any) {
    this.cartService.addToCart(producto);
    alert('Producto agregado al carrito');
  }
}
