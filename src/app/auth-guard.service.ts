import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import { ContactService } from '../app/pages/service/contact.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  currentToken: string;

  constructor(private authService: ContactService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.currentToken = localStorage.getItem("token");

    if(this.currentToken == '' || this.currentToken == null) {

        this.router.navigate(['']);
        return false;
    }
    return true;
}
}
