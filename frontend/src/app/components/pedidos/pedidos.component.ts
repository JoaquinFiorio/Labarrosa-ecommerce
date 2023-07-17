import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/modelos/user';
import { AuthServiceService } from 'src/app/servicios/auth-service.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  usuario: User = {}

  constructor(private auth: AuthServiceService, private toastr: ToastrService) {}

  ngOnInit() {
    this.getUser();
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

  cancelarPedido(idPedido: any) {
    const pedido = {
      id: idPedido
    }
    this.auth.deletePedido(pedido).subscribe({
      next: res => {
        this.usuario = {}
        this.getUser();
        this.toastr.success('Pedido cancelado con éxito', 'Sistema');
      },
      error: err => {
        this.toastr.error('Error cancelado este pedido', 'Sistema');
      }
    })
  }

}
