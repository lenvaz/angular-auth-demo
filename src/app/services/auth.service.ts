import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper, tokenNotExpired } from "angular2-jwt";
@Injectable()
export class AuthService {

    constructor(private http: Http) { }

    login(credentials) {
        return this.http.post('/api/authenticate', credentials)
            .map((response) => {
                let result = response.json();
                if (result && result.token) {
                    this.setToken(result.token);
                    return true;
                }
                else
                    return false;
            });
    }

    isLoggedIn() {
        return tokenNotExpired();

        ////////////////////////////////////////////////////////////////////
        // ** What the global tokenNotExpired() method does internally ** //
        ////////////////////////////////////////////////////////////////////
        
        // let jwtHelper = new JwtHelper();
        // let token = localStorage.getItem('token');
        // if (!token)
        //     return false;
        // jwtHelper.getTokenExpirationDate(token);
        // jwtHelper.isTokenExpired(token);
        // if (!jwtHelper.isTokenExpired(token))
        //     return true;
        // else
        //     return false;
    }

    get currentUser() {
        let token = this.getToken();
        return new JwtHelper().decodeToken(token);
    }

    logout() {
        this.removeToken();
    }

    removeToken() {
        localStorage.removeItem('token');
    }

    private getToken() {
        return localStorage.getItem('token');
    }

    private setToken(token) {
        localStorage.setItem('token', token);
    }
}
