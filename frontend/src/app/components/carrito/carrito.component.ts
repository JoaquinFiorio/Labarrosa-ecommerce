import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/servicios/auth-service.service';
import { ProductoServiceService } from 'src/app/servicios/producto-service.service';
import { User } from 'src/app/modelos/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  total = 0;
  usuario: User = {}

  constructor(public productoService : ProductoServiceService,
    private auth: AuthServiceService,
    private toastr: ToastrService,
    private router: Router) {}

  ngOnInit() {
    this.calcularTotal();
    this.getUser();
  }

  calcularTotal() {
    this.productoService.productosCarrito.forEach((producto) => {
      this.total += parseFloat(producto.precio)
    })
  }

  eliminarDelCarrito(producto: any) {
    this.productoService.productosCarrito = this.productoService.productosCarrito.filter(p => p._id !== producto._id)
    this.total -= parseFloat(producto.precio)
    this.toastr.error('Producto eliminado del carrito', 'Sistema');
  }

  getUser() {
    this.auth.getUsuario().subscribe({
      next: res => {
        this.usuario = res;
        console.log(res)
      },
      error: err => {
        console.log(err)
      }
    })
  }

  agregarPedido() {
    this.productoService.productosCarrito.forEach((producto) =>{
      const pedido = {
        producto: producto,
        precio: this.total,
        infoUsuario: {
          nombre: this.usuario.nombre,
          apellido: this.usuario.apellido,
          pais: this.usuario.pais,
          ciudad: this.usuario.ciudad,
          telefono: this.usuario.telefono,
          direccion: this.usuario.direccion
        }
      }
      this.auth.hacerPedido(pedido).subscribe({
        next: res => {
          this.toastr.success('Pedido realizado con éxito', 'Sistema');
          this.productoService.productosCarrito = []
          this.router.navigate(["/pedidos"])
        },
        error: err => {
          console.log(err)
        }
      })
    })
  }
}
