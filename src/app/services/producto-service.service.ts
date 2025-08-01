import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { HttpClient } from '@angular/common/http';
import { Productodto } from '../models/productodto';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  //private baseUrl = 'https://api.tiendarjsc.site/api/productos';
  private baseUrl = 'http://localhost:8080/api/productos';
  constructor(private clientHTTP: HttpClient ) { }
  obtenerTodosLosProductos(){
    return this.clientHTTP.get<Productodto[]>(this.baseUrl + "/listar")
  }
  obtenerProductoPorId(id: number) {
  return this.clientHTTP.get<Productodto>(this.baseUrl +"/" + id.toString());
  }
}
