import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Producto } from '../../models/producto';
import { ProductoServiceService } from '../../services/producto-service.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClient } from '@angular/common/http';
import { Productodto } from '../../models/productodto';

@Component({
  selector: 'app-producto',
  standalone: false,
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})

export class ProductoComponent implements OnInit{
  files: NgxFileDropEntry[] = [];
  selectedFile: File | null = null; 
  selectedFileName: string = 'Ningún archivo seleccionado';

  producto: Productodto = {
    id:0,
    nombre: '',
    precio: 0,
    tallas:[],
    categoria: '',
    descripcion:'',
    imagen: '',
  };
  dataSource !:Producto[];

  dsLista = new MatTableDataSource<Productodto>();
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'tallas','stock','categoria','imagen','acciones'];
  

  constructor(private servicioProducto:ProductoServiceService, private http: HttpClient){}

  ngOnInit(){
    this.CargarDatos();
  }
  CargarDatos(){
    this.servicioProducto.obtenerTodosLosProductos().subscribe({
      next:(data:Productodto[])=>{this.dsLista.data =data;},
      error:(err)=>(console.log(err))})
  }

  AgregarProducto(): void {
  }

  resetForm(): void {
    
  }
  
  ModificarProducto(){}

  EliminarProducto(id:number){
   
  }
 limpiarFormulario(){

 }
  applyFilter(event: Event) {
    let busqueda = (event.target as HTMLInputElement).value;
    this.dsLista.filter = busqueda.trim();
  }
}
