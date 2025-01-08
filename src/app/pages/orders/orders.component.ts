import { Component } from '@angular/core';
import { AddOrderService } from './add-orders/add-order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  showBtopHeader = true;
  constructor(public orderService: AddOrderService ){

  }

}
