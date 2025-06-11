import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from './modules/material/material.module';
import { InicioComponent } from './components/inicio/inicio.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { FormsModule } from '@angular/forms';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { ProductoComponent } from './components/producto/producto.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductoAdultosComponent } from './components/producto-adultos/producto-adultos.component';
import { ProductoMenoresComponent } from './components/producto-menores/producto-menores.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CarritoComponent } from './components/carrito/carrito.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- Asegúrate de tenerlo

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    ContactoComponent,
    ProductoDetalleComponent,
    ProductoComponent,
    ProductoAdultosComponent,
    ProductoMenoresComponent,
    LoginComponent,
    RegisterComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
     {
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
