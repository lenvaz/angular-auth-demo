import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class Authguard implements CanActivate {

    constructor(
        private router: Router,
        private auth: AuthService,
    ) { }

    canActivate(route, state: RouterStateSnapshot) {
        if(this.auth.isLoggedIn()) return true;

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    }
}
