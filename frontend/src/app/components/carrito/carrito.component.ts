import { Component } from '@angular/core';
import { ProductoServiceService } from 'src/app/servicios/producto-service.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  total = 0;

  constructor(public productoService : ProductoServiceService) {}

  ngOnInit() {
    this.calcularTotal();
  }

  calcularTotal() {
    this.productoService.productosCarrito.forEach((producto) => {
      this.total += parseFloat(producto.precio)
    })
  }

  eliminarDelCarrito(producto: any) {
    this.productoService.productosCarrito = this.productoService.productosCarrito.filter(p => p._id !== producto._id)
    this.total -= parseFloat(producto.precio)
  }
}
