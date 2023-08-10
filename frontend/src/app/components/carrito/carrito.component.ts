import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/servicios/auth-service.service';
import { ProductoServiceService } from 'src/app/servicios/producto-service.service';
import { User } from 'src/app/modelos/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  total = 0;
  usuario: User = {}
  botonDeshabilitado = false;

  constructor(public productoService : ProductoServiceService,
    private auth: AuthServiceService,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.calcularTotal();
    this.getUser();
  }

  calcularTotal() {
    this.productoService.productosCarrito.forEach((producto) => {
      this.total += parseFloat(producto.precio) - producto.descuento
    })
  }

  eliminarDelCarrito(producto: any) {
    Swal.fire({
      title: '¿Estás seguro de eliminar esto del carrito?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.productoService.productosCarrito = this.productoService.productosCarrito.filter(p => p._id !== producto._id)
        this.total -= parseFloat(producto.precio) - producto.descuento
        this.toastr.error('Producto eliminado del carrito', 'Sistema');
      } else if (result.dismiss === 'cancel') {
        this.toastr.warning('No lo eliminaste del carrito', 'Sistema');
      }
    });
  }

  getUser() {
    this.auth.getUsuario().subscribe({
      next: res => {
        this.usuario = res;
      },
      error: err => {
        console.log(err)
      }
    })
  }

  agregarPedido() {
    if(this.productoService.productosCarrito.length !== 0) {
      this.botonDeshabilitado = true;
      const pedido = {
        producto: this.productoService.productosCarrito,
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
      this.auth.mercadoPago(pedido).subscribe({
        next: res => {
          this.toastr.success('Pedido realizado con éxito', 'Sistema');
          this.productoService.productosCarrito = []
          this.total = 0
          window.location.href = res.init_point
        },
        error: err => {
          console.log(err)
        }
      })
    } else {
      this.toastr.error('No hay productos en el carrito', 'Sistema');
    }
  }
}
