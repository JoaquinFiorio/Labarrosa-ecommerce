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
  valor: String = "";

  constructor(private producto: ProductoServiceService, private router: Router) {}

  ngOnInit() {
    this.producto.getPhotos()
      .subscribe({
        next: res => {
          res.forEach((e) => {
            if(e.estado !== "Pedido") {
              this.productos.push(e)
            }
          })
        },
        error: err => console.log(err)
      })
      console.log(this.productos)
  }

  getPorcentajeDescuento(producto: any): number {
    return Math.ceil(producto);
  }

  selectedCard(id: string) {
    this.router.navigate(['/producto', id]);
  }

  mostrarValor(valor: string) {
    this.valor = valor;
    if(valor === 'Todos los productos') {
      this.filter = false;
    } else {
      this.filter = true;
      this.filteredProductos = this.productos.filter(p => p.categoria === valor )
    }
  }

  submitForm(formValue: any) {
    this.filter = true;
    this.valor = formValue.producto;
    this.filteredProductos = this.productos.filter(p => p.title.includes(formValue.producto))
  }

}
