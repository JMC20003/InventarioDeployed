import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Producto } from '../../models/producto';
import { ProductoServiceService } from '../../services/producto-service.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClient } from '@angular/common/http';

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
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'tallas','stock','categoria','imagen','acciones'];
  

  constructor(private servicioProducto:ProductoServiceService, private http: HttpClient){}

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
        if(this.producto.nombre ==='' || this.producto.precio === 0 || this.producto.stock === 0 || this.producto.talla ==='' || this.producto.categoria ==='' || this.producto.descripcion ==='' || this.producto.imagen===''){
          alert("complete todos los campos")
        }
        else{
        console.log('Producto agregado:', nuevoProducto);
        alert('producto agregado correctamente')
        this.CargarDatos();
        this.resetForm();
        }
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
 limpiarFormulario(){
  this.resetForm();
 }
  applyFilter(event: Event) {
    let busqueda = (event.target as HTMLInputElement).value;
    this.dsLista.filter = busqueda.trim();
  }

  // Método llamado cuando se selecciona o arrastra un archivo
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    if (files.length > 0) {
      const droppedFile = files[0];
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.selectedFile = file;
          this.selectedFileName = file.name;
          console.log('Archivo seleccionado:', this.selectedFile);
        });
      } else {
        // Es un directorio, no es lo que esperamos para una imagen
        console.warn('Solo se permiten archivos. Se detectó un directorio.');
        this.selectedFile = null;
        this.selectedFileName = 'Solo se permiten archivos';
      }
    } else {
      this.selectedFile = null;
      this.selectedFileName = 'Ningún archivo seleccionado';
    }
  }

  // Método para subir la imagen y luego guardar el producto
  public uploadImageAndSaveProduct(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    // Endpoint para subir la imagen (ej: /api/upload)
    this.http.post('http://localhost:8080/api/upload', formData).subscribe(
      (response: any) => {
        // Asumiendo que el backend devuelve la URL de la imagen guardada
        this.producto.imagen = response.imageUrl; // O el nombre del archivo, según tu backend
        console.log('Imagen subida con éxito. URL:', this.producto.imagen);

        // Ahora que tenemos la URL de la imagen, podemos guardar el producto
        this.servicioProducto.postProduct(this.producto).subscribe(
          (res) => {
            console.log('Producto agregado con éxito', res);
            alert('Producto y imagen guardados con éxito!');
            this.limpiarFormulario();
            // Recargar tabla o actualizar lista si es necesario
          },
          (error) => {
            console.error('Error al agregar el producto:', error);
            alert('Error al agregar el producto. Consulta la consola.');
          }
        );
         this.CargarDatos();
        this.resetForm();
      },
      (error) => {
        console.error('Error al subir la imagen:', error);
        alert('Error al subir la imagen. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
