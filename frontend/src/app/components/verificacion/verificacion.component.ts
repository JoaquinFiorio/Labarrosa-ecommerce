import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../servicios/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.css']
})
export class VerificacionComponent {
  id = "";
  mensaje = "";

  constructor(private route: ActivatedRoute,
    private router: Router, private auth: AuthServiceService, private toastr: ToastrService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  verificarEmail() {
    this.auth.verificacionEmail(this.id).subscribe({
      next: res => {
        this.router.navigate(["/home"]);
        this.auth.user = "";
        localStorage.removeItem("user");
        this.toastr.success("Usuario verificado con éxito", "Sistema")
      },
      error: err => {
        if(err.error.message === "Usuario no encontrado"){
          this.toastr.error("Usuario no encontrado", "Sistema")
        }
      }
    })
  }
}
