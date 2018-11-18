import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { AuthConfig } from 'angular2-jwt';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
    orders: any[];
    constructor(private OS: OrdersService) { }

    ngOnInit() {
        this.OS.getOrders()
            .subscribe((orders) => {
                this.orders = orders;
            });
    }

}
