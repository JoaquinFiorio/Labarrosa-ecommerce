import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ResetComponent } from './components/reset/reset.component';
import { OlvidoComponent } from './components/olvido/olvido.component';
import { VerificacionComponent } from './components/verificacion/verificacion.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ProductoComponent } from './components/producto/producto.component';
import { SesionGuard } from './guards/sesion.guard';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: "home", component: HomeComponent},
  { path: "contacto", component: ContactoComponent},
  { path: "login", component: LoginComponent, canActivate: [SesionGuard]},
  { path: "registro", component: RegistroComponent, canActivate: [SesionGuard]},
  { path: "reset/:id", component: ResetComponent},
  { path: "producto/:id", component: ProductoComponent},
  { path: "olvidar", component: OlvidoComponent},
  { path: "verificacion/:id", component: VerificacionComponent},
  { path: "usuario", component: UsuarioComponent, canActivate: [AuthGuard]},
  { path: "pedidos", component: PedidosComponent, canActivate: [AuthGuard]},
  { path: "carrito", component: CarritoComponent},
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
