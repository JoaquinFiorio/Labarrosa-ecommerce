import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../servicios/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../responsive.css']
})
export class LoginComponent {

  error = ""

  constructor(private router: Router, private auth: AuthServiceService) {}

  iniciarSesion(formulario:any) {
    const user = {
      email: formulario.value.email,
      password: formulario.value.password,
    }
      this.auth.logIn(user).subscribe({
        next: res => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", res.userFound.verificado);

          const storedUser = localStorage.getItem("user");
          if (storedUser !== null) {
            this.auth.user = storedUser;
          }
          this.router.navigate(['/home']);
        },
        error: err => {
          console.log(err)
          if(err.error.message === "User Not Found"){
            this.error = "Email equivocado"
          }
          if(err.error.message === "Invalid Password"){
            this.error = "Contraseña inválida"
          }
        }
      })
  }

}
