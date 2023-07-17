import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from '../../servicios/auth-service.service';
import { Router } from '@angular/router';
import { User } from 'src/app/modelos/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  error = "";
  satisfactorio = false;
  miFormulario2: FormGroup;
  usuario: User = {};

  constructor(private toastr: ToastrService, private fb: FormBuilder, private auth: AuthServiceService) {
    this.miFormulario2 = this.fb.group({
      nombre: [this.usuario.nombre || '', Validators.required],
      apellido: [this.usuario.apellido || '', Validators.required],
      telefono: [this.usuario.telefono || '', [Validators.required, this.validarTelefono]],
      pais: [this.usuario.pais || '', Validators.required],
      ciudad: [this.usuario.ciudad || '', Validators.required],
      direccion: [this.usuario.direccion || '', Validators.required]
    });
  }

  ngOnInit() {
    this.getUser();
  }

  validarTelefono(control : any) {
    const telefonoPattern = /^\+\d{13}$/; // Expresión regular para validar el formato del teléfono

    if (control.value && !telefonoPattern.test(control.value)) {
      return { formatoInvalido: true };
    }

    return null;
  }

  getUser() {
    this.auth.getUsuario().subscribe({
      next: res => {
        this.usuario = res;
        this.miFormulario2.patchValue(this.usuario); //patchValue() se encargará de actualizar los valores del formulario con los valores actuales del objeto usuario. Luego, cuando ejecutes la función cambiarInfo(), deberías obtener los valores actualizados en el formulario.
      },
      error: err => {
        console.log(err)
      }
    })
  }

  cambiarInfo(formulario: any) {
    const user = {
      nombre: formulario.value.nombre,
      apellido: formulario.value.apellido,
      pais: formulario.value.pais,
      ciudad: formulario.value.ciudad,
      telefono: formulario.value.telefono,
      direccion: formulario.value.direccion
    }
    try {
      this.auth.changeUserInfo(user).subscribe({
        next: res => {
          this.toastr.success('Información cambiada con éxito', 'Sistema');
        },
        error: err => {
          this.toastr.success('Algo salió mal', 'Sistema');
        }
      })
    } catch (err) {
      console.log(err);
    }
  }
}
