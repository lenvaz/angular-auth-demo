import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    inValidLogin: boolean;
    constructor(
        private router: Router,
        private auth: AuthService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            this.router.navigate(['/']);
        }
    }

    login(credentials) {
        this.auth.login(credentials)
            .subscribe((res) => {
                if (res) {
                    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
                    this.router.navigate([returnUrl || '/']);
                }
                else
                    this.inValidLogin = true;
            });
    }

}
