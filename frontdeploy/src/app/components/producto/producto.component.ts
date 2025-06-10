import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Producto } from '../../models/producto';
import { ProductoServiceService } from '../../services/producto-service.service';

@Component({
  selector: 'app-producto',
  standalone: false,
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})

export class ProductoComponent implements OnInit{
  producto: Producto = {
    nombre: '',
    precio: 0,
    stock: 0,
    talla:'',
    categoria: '',
    descripcion:'',
    imagen: '',
  };
  dataSource !:Producto[];

  dsLista = new MatTableDataSource<Producto>();
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'stock','categoria','imagen','acciones'];
  

  constructor(private servicioProducto:ProductoServiceService){}

  ngOnInit(){
    this.CargarDatos();
  }
  CargarDatos(){
    this.servicioProducto.getAllProducts().subscribe({
      next:(data:Producto[])=>{this.dsLista.data =data;},
      error:(err)=>(console.log(err))})
  }

  AgregarProducto(): void {
    const productoSinId = { ...this.producto };
    delete productoSinId.id;

    this.servicioProducto.postProduct(productoSinId).subscribe({
      next: (nuevoProducto) => {
        console.log('Producto agregado:', nuevoProducto);
        alert('producto agregado correctamente')
        this.CargarDatos();
        this.resetForm();
      },
      error: (err) => console.error('Error al agregar producto:', err)
    });
  }

  resetForm(): void {
    this.producto = {
      nombre: '',
      precio: 0,
      stock: 0,
      talla:'',
      categoria: '',
      descripcion:'',
      imagen: ''
    };
  }
  
  ModificarProducto(){}
  EliminarProducto(id:number){
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.servicioProducto.deleteProduct(id).subscribe({
        next: () => {
          console.log('Producto eliminado');
          this.CargarDatos();
        },
        error: (err) => console.error('Error al eliminar producto:', err)
      });
    }
  }
 limiparFormulario(){
  this.resetForm();
 }
  applyFilter(event: Event) {
    let busqueda = (event.target as HTMLInputElement).value;
    this.dsLista.filter = busqueda.trim();
  }
}
