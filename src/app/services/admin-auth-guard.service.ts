import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private auth: AuthService
    ) { }

    canActivate() {
        if(this.auth.currentUser.admin) return true;
        this.router.navigate(['/access-denied'])
    }
}
