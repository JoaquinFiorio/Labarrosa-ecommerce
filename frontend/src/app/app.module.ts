import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { VerificacionComponent } from './components/verificacion/verificacion.component';
import { HomeComponent } from './components/home/home.component';
import { OlvidoComponent } from './components/olvido/olvido.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ResetComponent } from './components/reset/reset.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ProductoComponent } from './components/producto/producto.component';
import { AuthGuard } from './guards/auth.guard';
import { SesionGuard } from './guards/sesion.guard';
import { DataGuard } from './guards/data.guard';
import { TokenInterceptor } from './token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    CarritoComponent,
    LoginComponent,
    RegistroComponent,
    VerificacionComponent,
    HomeComponent,
    OlvidoComponent,
    UsuarioComponent,
    PedidosComponent,
    ResetComponent,
    ContactoComponent,
    ProductoComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot()
  ],
  providers: [
    AuthGuard,
    SesionGuard,
    DataGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
