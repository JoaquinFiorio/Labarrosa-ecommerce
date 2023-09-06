import { Component } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-pagina-web',
  templateUrl: './pagina-web.component.html',
  styleUrls: ['./pagina-web.component.css']
})
export class PaginaWebComponent {

  ngAfterViewInit() {
    this.initSwiper();
    this.initNav();
  }

  initNav() {
    window.addEventListener("scroll", function(){
      var header = document.querySelector("header");
      header?.classList.toggle("menuFixed", window.scrollY>50);
  });
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
      },
    });
  }
}
