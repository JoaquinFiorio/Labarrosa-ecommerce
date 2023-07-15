import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from 'src/app/modelos/photo';
import { ProductoServiceService } from 'src/app/servicios/producto-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  productos: Photo[] = [];
  filter = false;
  filteredProductos: Photo[] = [];

  constructor(private producto: ProductoServiceService, private router: Router) {}

  ngOnIit() {

  }

  ngOnInit() {
    this.producto.getPhotos()
      .subscribe({
        next: res => {
          this.productos = res;
        },
        error: err => console.log(err)
      })
  }

  selectedCard(id: string) {
    this.router.navigate(['/producto', id]);
  }

  mostrarValor(valor: string) {
    if(valor === 'Todos los productos') {
      this.filter = false;
    } else {
      this.filter = true;
      this.filteredProductos = this.productos.filter(p => p.categoria === valor )
    }
  }

  submitForm(formValue: any) {
    this.filter = true;
    this.filteredProductos = this.productos.filter(p => p.title.includes(formValue.producto))
  }

}
