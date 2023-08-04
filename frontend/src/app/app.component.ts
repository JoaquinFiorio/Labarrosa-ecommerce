import { Component } from '@angular/core';
import { AuthServiceService } from './servicios/auth-service.service';
import { ProductoServiceService } from './servicios/producto-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  isChecked: boolean = false;

  constructor(public auth: AuthServiceService, public producto: ProductoServiceService) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const storedUser = localStorage.getItem("user");

    if (storedUser !== null) {
      this.auth.user = storedUser;
    }
  }

}
