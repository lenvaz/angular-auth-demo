import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class OrdersService {

    constructor(private http: AuthHttp) { }

    getOrders() {
        // let headers = new Headers();
        // let token = localStorage.getItem('token');
        // headers.append('Authorization', 'Bearer ' + token);
        // let options = new RequestOptions({ headers: headers });

        // Above code should be used if Http library is used directly instead on AuthHttp
        return this.http.get('/api/orders')
            .map((response) => response.json());
    }
}
