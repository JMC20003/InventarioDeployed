import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoAdultosComponent } from './components/producto-adultos/producto-adultos.component';
import { ProductoMenoresComponent } from './components/producto-menores/producto-menores.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { adminGuard } from './guards/admin.guard';
import { CarritoComponent } from './components/carrito/carrito.component';
import { RenderMode} from '@angular/ssr';



const routes: Routes = [
  { path:"",component:InicioComponent},
  { path:"inicio",component:InicioComponent},
  { path:"producto-detalle/:id", component: ProductoDetalleComponent, data: { renderMode: RenderMode.Client }},
  {path:"categorias/adultos", component:ProductoAdultosComponent},
  {path:"categorias/ninos", component:ProductoMenoresComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  { path: "carrito", component: CarritoComponent }


];  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
