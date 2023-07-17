import { Component } from '@angular/core';
import { AuthServiceService } from '../../servicios/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-olvido',
  templateUrl: './olvido.component.html',
  styleUrls: ['./olvido.component.css']
})
export class OlvidoComponent {

  mensaje = "";

  constructor(private auth: AuthServiceService, private toastr: ToastrService) {}

  mandarEmail(formulario:any) {
    const userEmail = {
      email: formulario.value.email
    }
    this.auth.forgot(userEmail).subscribe({
      next: res => {
        this.mensaje = "Email enviado";
        this.toastr.success("Email enviado con éxito", "Sistema")
      },
      error: err => {
        if (err.error.message === "no se encontro el usuario") {
          this.mensaje = "No se encontro el usuario";
          this.toastr.error("No se encontro el usuario", "Sistema")
        }
      }
    })
  }

}
