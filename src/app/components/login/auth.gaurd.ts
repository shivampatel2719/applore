import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map,tap } from "rxjs/operators";
import { LoginServices } from "./login.services";

@Injectable({providedIn: 'root'})
export class AuthGaurd implements CanActivate {
    constructor(
        private loginService : LoginServices,
        private router: Router) {
    }
    
    canActivate(route : ActivatedRouteSnapshot,router: RouterStateSnapshot) : boolean | 
    Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{
        return this.loginService.loggedUser.pipe(map(user => {
            const isAuth = !!user;
            if(isAuth) {
                return isAuth;
            }
            else {
                return this.router.createUrlTree(['/login']);
            }
        }));
    }
}