import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  constructor(private clientHTTP: HttpClient ) { }
  getAllProducts(){
    return this.clientHTTP.get<Producto[]>("http://localhost:8080/api/productos/listar")
  }
  postProduct(producto: Producto){
    return this.clientHTTP.post<Producto>("http://localhost:8080/api/productos/registrar",producto)
  }
  deleteProduct(id: number) {
    return this.clientHTTP.delete("http://localhost:8080/api/productos/eliminar/"+ id.toString());
  }
  obtenerProductoPorId(id: number) {
  return this.clientHTTP.get<Producto>("http://localhost:8080/api/productos/"+ id.toString());
  }
}
