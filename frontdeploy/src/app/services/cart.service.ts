// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TallaStockDTO } from '../models/TallaStockDTO';

export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  tallaSeleccionada: string;
  cantidad: number;
  descripcion?: string;
  tallas?: TallaStockDTO[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'carrito';
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.getCartFromLocalStorage());
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() { }

  private getCartFromLocalStorage(): CartItem[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  private saveCartToLocalStorage(items: CartItem[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(items));
    this.cartItemsSubject.next(items); // Notifica a los suscriptores
  }

  addToCart(item: CartItem): void {
    const currentItems = this.getCartFromLocalStorage();
    const existingItemIndex = currentItems.findIndex(
      cartItem => cartItem.id === item.id && cartItem.tallaSeleccionada === item.tallaSeleccionada
    );

    if (existingItemIndex > -1) {
      currentItems[existingItemIndex].cantidad += item.cantidad;
    } else {
      currentItems.push(item);
    }
    this.saveCartToLocalStorage(currentItems);
  }

  // **NUEVO MÉTODO: Actualizar cantidad de un item**
  updateItemQuantity(itemId: string, talla: string, newQuantity: number): void {
    const currentItems = this.getCartFromLocalStorage();
    const itemToUpdateIndex = currentItems.findIndex(
      cartItem => cartItem.id === itemId && cartItem.tallaSeleccionada === talla
    );

    if (itemToUpdateIndex > -1) {
      currentItems[itemToUpdateIndex].cantidad = newQuantity;
      this.saveCartToLocalStorage(currentItems);
    }
  }

  getCartItems(): CartItem[] {
    return this.getCartFromLocalStorage();
  }

  clearCart(): void {
    this.saveCartToLocalStorage([]);
  }

  // Modificación en removeItemFromCart para usar talla
  removeItemFromCart(itemId: string, talla: string): void {
    let currentItems = this.getCartFromLocalStorage();
    currentItems = currentItems.filter(item => !(item.id === itemId && item.tallaSeleccionada === talla));
    this.saveCartToLocalStorage(currentItems);
  }
}