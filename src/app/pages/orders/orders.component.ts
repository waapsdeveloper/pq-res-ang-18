import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddOrderService } from './add-orders/add-order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  isAddOrderRoute: boolean = false;
  showBtopHeader = true;

  constructor(private router: Router, public orderService: AddOrderService) {}

  ngOnInit(): void {
    this.isAddOrderRoute = this.router.url.includes('orders/add');
  }
}
