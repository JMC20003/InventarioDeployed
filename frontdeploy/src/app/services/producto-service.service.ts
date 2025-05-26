import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  private baseUrl = 'https://backendinventarioventas.onrender.com/api/productos';

  constructor(private clientHTTP: HttpClient ) { }
  getAllProducts(){
    return this.clientHTTP.get<Producto[]>(this.baseUrl + "/listar")
  }
  postProduct(producto: Producto){
    return this.clientHTTP.post<Producto>(this.baseUrl +"/registrar",producto)
  }
  deleteProduct(id: number) {
    return this.clientHTTP.delete(this.baseUrl +"/eliminar/"+ id.toString());
  }
  obtenerProductoPorId(id: number) {
  return this.clientHTTP.get<Producto>(this.baseUrl +"/" + id.toString());
  }
}
