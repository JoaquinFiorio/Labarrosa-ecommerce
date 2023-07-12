import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/modelos/photo';
import { ProductoServiceService } from 'src/app/servicios/producto-service.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  id: string = "";
  producto: Photo | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoServiceService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.productoService.getPhoto(this.id)
        .subscribe({
          next: res => {
            this.producto = res;
          },
          error: err => console.log(err)
        })
    });
  }

  agregarAlCarrito() {
    let productoDuplicado = false;

    if (this.productoService.productosCarrito.length !== 0) {
      for (const producto of this.productoService.productosCarrito) {
        if (producto._id === this.producto?._id) {
          productoDuplicado = true;
          break; // Ya agregaste este producto al carrito
        }
      }
    }

    if (!productoDuplicado) {
      this.productoService.productosCarrito.push(this.producto);
    }
  }
}
