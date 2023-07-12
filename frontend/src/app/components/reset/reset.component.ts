import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../servicios/auth-service.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
  id = "";

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthServiceService) {}

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
      },
      error: err => console.log(err)
    })
  }
}
