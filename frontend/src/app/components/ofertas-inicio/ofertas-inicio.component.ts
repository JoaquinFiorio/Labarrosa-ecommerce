import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoServiceService } from 'src/app/servicios/producto-service.service';

@Component({
  selector: 'app-ofertas-inicio',
  templateUrl: './ofertas-inicio.component.html',
  styleUrls: ['./ofertas-inicio.component.css']
})
export class OfertasInicioComponent {
  productos: any = [];
  productosDestacados: any[] = [];

  constructor(private producto: ProductoServiceService, private router: Router) {}

  ngOnInit() {
    this.producto.getPhotos()
      .subscribe({
        next: res => {
          this.productos = res;
          this.productosDestacados = this.productos.filter((p:any) => p.categoria === 'Jarrones' )
        },
        error: err => console.log(err)
      })
  }

  selectedCard(id: string) {
    this.router.navigate(['/producto', id]);
  }
}
