import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from '../../servicios/auth-service.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css', '../../../responsive.css']
})
export class RegistroComponent {

  error = "";
  satisfactorio = false;
  miFormulario2: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthServiceService) {
    this.miFormulario2 = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', [Validators.required, this.validarTelefono]],
      pais: ['', Validators.required],
      ciudad: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  validarTelefono(control : any) {
    const telefonoPattern = /^\+\d{13}$/; // Expresión regular para validar el formato del teléfono

    if (control.value && !telefonoPattern.test(control.value)) {
      return { formatoInvalido: true };
    }

    return null;
  }

  registrarUsuario(formulario:any) {
    if(!formulario.valid) {
      return
    }
    const user = {
      nombre: formulario.value.nombre,
      apellido: formulario.value.apellido,
      pais: formulario.value.pais,
      ciudad: formulario.value.ciudad,
      telefono: formulario.value.telefono,
      email: formulario.value.email,
      password: formulario.value.password,
    }
    try {
      this.auth.registro(user).subscribe({
        next: res => {
          this.satisfactorio = true;
          setTimeout(() => {
            this.router.navigate(["/login"])
          }, 5000);
        },
        error: err => {
          console.log(err)
          if(err.error.message === "Mail ya tiene una cuenta"){
            this.error = "Mail en uso"
          }
          if(err.error.message === "Telefono ya en uso"){
            this.error = "Telefono en uso"
          }
        }
      })
    } catch (err) {
      console.log(err);
    }
  }

}
