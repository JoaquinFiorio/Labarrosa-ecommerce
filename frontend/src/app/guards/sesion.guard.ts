import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthServiceService } from '../servicios/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class SesionGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthServiceService) {}

  canActivate(): boolean {
    if(!this.authService.logedIn()) {
      return true;
    }

    this.router.navigate(["/home"]);
    return false;
  }

}
