import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoServiceService } from 'src/app/servicios/producto-service.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-ofertas-inicio',
  templateUrl: './ofertas-inicio.component.html',
  styleUrls: ['./ofertas-inicio.component.css', '../../../responsive.css']
})
export class OfertasInicioComponent implements AfterViewInit{
  productos: any = [];
  productosMacetas: any = [];
  productosPlatos: any = [];

  constructor(private productoService: ProductoServiceService, private router: Router, private toastr: ToastrService) {}

  ngAfterViewInit() {
    this.initSwiper()
  }

  initSwiper() {
    const windowWidth = window.innerWidth;
    let slidesPerView = 2;
    let spaceBetween = 20;

    // Definir breakpoints y ajustar opciones según el ancho de pantalla
    if (windowWidth <= 769) {
      slidesPerView = 1;
      spaceBetween = 10;
    }

    new Swiper('.swiper-container', {
      slidesPerView: slidesPerView,
      spaceBetween: spaceBetween,
      loop: true,
      autoplay: {
        delay: 1000 // 1000 milisegundos (1 segundo) entre cada desplazamiento
      }
    });
  }

  ngOnInit() {
    this.productoService.getPhotos()
      .subscribe({
        next: res => {
          res.forEach((e) => {
            if(e.estado !== "Pedido") {
              this.productos.push(e)
            }
            if(this.productosPlatos.length < 3 && e.categoria === 'Platos') {
              this.productosPlatos.push(e)
            } else if(this.productosMacetas.length < 3 && e.categoria === 'Macetas') {
              this.productosMacetas.push(e)
            }
          });
        },
        error: err => console.log(err)
      })
  }

  getPorcentajeDescuento(producto: any): number {
    return Math.ceil(producto);
  }

  selectedCard(id: string) {
    this.router.navigate(['/producto', id]);
  }

  agregarAlCarrito(producto: any) {
    let productoDuplicado = false;

    if (this.productoService.productosCarrito.length !== 0) {
      for (const p of this.productoService.productosCarrito) {
        if (p._id === producto._id) {
          productoDuplicado = true;
          this.toastr.warning('Pedido ya en el carrito', 'Sistema');
          break; // Ya agregaste este producto al carrito
        }
      }
    }

    if (!productoDuplicado) {
      this.toastr.success('Pedido agregado al carrito con éxito', 'Sistema');
      this.productoService.productosCarrito.push(producto);
    }
  }
}
