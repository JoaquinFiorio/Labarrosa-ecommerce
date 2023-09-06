import { Component } from '@angular/core';
import { ProductoServiceService } from 'src/app/servicios/producto-service.service';
import { AuthServiceService } from 'src/app/servicios/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isChecked: boolean = false;

  constructor(public auth: AuthServiceService, public producto: ProductoServiceService) {}

}
