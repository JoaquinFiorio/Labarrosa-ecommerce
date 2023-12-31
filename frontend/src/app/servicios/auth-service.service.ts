import { Injectable } from '@angular/core';
import { User } from '../modelos/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  url = "https://labarrosa-ecommerce-production.up.railway.app/api";
  user = "";
  usuarioActual = {}

  constructor(private http: HttpClient, private router: Router) { }

  registro(user : User): Observable<any>{
    return this.http.post(this.url + "/user/signup", user)
  }

  verificacionEmail(id : any): Observable<any>{
    return this.http.put(this.url + "/user/" + id, id)
  }

  logIn(user : User): Observable<any>{
    return this.http.post(this.url + "/user/signin", user)
  }

  logedIn() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.user = "";
    this.router.navigate(["/login"]);
  }

  forgot(email : any): Observable<any> {
    return this.http.post<any>(this.url + "/forgot", email)
  }

  resetPassword(id : string, password : any): Observable<any>{
    return this.http.put(this.url + "/forgot/" + id, password)
  }

  getUsuario() {
    return this.http.get(this.url + "/user/usuarioUnico")
  }

  changeUserInfo(user: any) {
    return this.http.put(this.url + "/user/user", user)
  }

  deletePedido(id: any) {
    return this.http.put(this.url + "/pedidos", id)
  }

  mercadoPago(precio: any) {
    return this.http.post<any>(this.url + "/pagar/createOrder", precio)
  }

}
