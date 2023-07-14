import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtén el token de autenticación desde donde sea que lo tengas almacenado

    const authToken = localStorage.getItem("token");

    // Clona la solicitud y agrega el encabezado de autorización con el token
    const authRequest = request.clone({
      headers: request.headers.set('x-access-token', `${authToken}`)
    });

    // Continúa con la solicitud modificada
    return next.handle(authRequest);
  }
}
