import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  

  productoId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.productoId = this.route.snapshot.paramMap.get('id');
    // Aquí puedes llamar a un servicio para obtener el producto por ID
  }

  productos = [
    {
      nombre: 'Camiseta Barcelona',
      descripcion: 'Temporada 2024 - Local',
      precio: 59.99,
      imagen: 'https://www.aisope.com.pe/images/HZQM/NDBH0550_10.jpg'
    },
    {
      nombre: 'Camiseta Real Madrid',
      descripcion: 'Temporada 2024 - Visitante',
      precio: 64.99,
      imagen: 'https://www.aisope.com.pe/images/HZQM/NDBH0550_10.jpg'
    },
    {
      nombre: 'Camiseta PSG',
      descripcion: 'Temporada 2024 - Local',
      precio: 69.99,
      imagen: 'https://www.aisope.com.pe/images/HZQM/NDBH0550_10.jpg'
    },
    {
      nombre: 'Camiseta Argentina',
      descripcion: 'Campeón del Mundo 2022',
      precio: 74.99,
      imagen: 'https://www.aisope.com.pe/images/HZQM/NDBH0550_10.jpg'
    },
    {
      nombre: 'Camiseta Argentina',
      descripcion: 'Campeón del Mundo 2022',
      precio: 74.99,
      imagen: 'https://www.aisope.com.pe/images/HZQM/NDBH0550_10.jpg'
    },
    {
      nombre: 'Camiseta PSG',
      descripcion: 'Temporada 2024 - Local',
      precio: 69.99,
      imagen: 'https://www.aisope.com.pe/images/HZQM/NDBH0550_10.jpg'
    }
     // Puedes seguir agregando más...
  ];
}
