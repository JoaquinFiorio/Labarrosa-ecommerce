import { Component } from '@angular/core';
import { AuthServiceService } from '../../servicios/auth-service.service';

@Component({
  selector: 'app-olvido',
  templateUrl: './olvido.component.html',
  styleUrls: ['./olvido.component.css']
})
export class OlvidoComponent {

  mensaje = "";

  constructor(private auth: AuthServiceService) {}

  mandarEmail(formulario:any) {
    const userEmail = {
      email: formulario.value.email
    }
    this.auth.forgot(userEmail).subscribe({
      next: res => {
        this.mensaje = "Email enviado";
      },
      error: err => {
        if (err.error.message === "no se encontro el usuario") {
          this.mensaje = "No se encontro el usuario";
        }
      }
    })
  }

}
