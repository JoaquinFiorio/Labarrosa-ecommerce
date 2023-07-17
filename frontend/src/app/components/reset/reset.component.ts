import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../servicios/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
  id = "";

  constructor(private route: ActivatedRoute,
    private router: Router, private auth: AuthServiceService,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  resetPassword(formulario : any) {
    const userPassword = {
      password: formulario.value.password
    }

    this.auth.resetPassword(this.id, userPassword).subscribe({
      next: res => {
        this.router.navigate(["/login"]);
        this.toastr.success("Contraseña recuperada y cambiada correctamente", "Sistema")
      },
      error: err => {
        if (err.error.message === "Usuario no encontrado") {
          this.toastr.error("No se encontro el usuario", "Sistema")
        }
      }
    })
  }
}
