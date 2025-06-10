import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { HttpClient } from '@angular/common/http';
import { Productodto } from '../models/productodto';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  //private baseUrl = 'https://backendinventarioventas.onrender.com/api/productos';

  private baseUrl = 'http://localhost:8080/api/productos';
  constructor(private clientHTTP: HttpClient ) { }
  getAllProducts(){
    return this.clientHTTP.get<Producto[]>(this.baseUrl + "/listar")
  }
  postProduct(producto: Producto){
    return this.clientHTTP.post<Producto>(this.baseUrl +"/registrar",producto)
  }
  getCard(){
    return this.clientHTTP.get<Producto[]>(this.baseUrl + "/cards" )
  }
  deleteProduct(id: number) {
    return this.clientHTTP.delete(this.baseUrl +"/eliminar/"+ id.toString());
  }
  obtenerProductoPorId(id: number) {
  return this.clientHTTP.get<Productodto>(this.baseUrl +"/" + id.toString());
  }
}
