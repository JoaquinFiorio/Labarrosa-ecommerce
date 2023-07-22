import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '../modelos/photo';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  constructor(private http: HttpClient) { }

  URI = 'https://labarrosa-admin-production.up.railway.app/api/photos';
  productosCarrito: any[] = []

  getPhotos() {
    return this.http.get<Photo[]>(this.URI);
  }

  getPhoto(id: string) {
    return this.http.get<Photo>(`${this.URI}/${id}`);
  }

}
