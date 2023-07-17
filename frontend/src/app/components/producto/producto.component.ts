import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/modelos/photo';
import { ProductoServiceService } from 'src/app/servicios/producto-service.service';
import { ToastrService } from 'ngx-toastr';

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
    private productoService: ProductoServiceService, private toastr: ToastrService
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
          this.toastr.warning('Pedido ya en el carrito', 'Sistema');
          break; // Ya agregaste este producto al carrito
        }
      }
    }

    if (!productoDuplicado) {
      this.toastr.success('Pedido agregado al carrito con éxito', 'Sistema');
      this.productoService.productosCarrito.push(this.producto);
    }
  }
}
