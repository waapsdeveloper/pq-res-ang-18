import { Component } from '@angular/core';
import { AddOrderService } from './add-order.service';
import { NavService } from 'src/app/services/basic/nav.service';

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrl: './add-orders.component.scss'
})
export class AddOrdersComponent {



  constructor(public nav: NavService, public orderService: AddOrderService ) {

  }

  ngOnInit(): void {

  }


  async onSubmit($event) {
    const res = await this.orderService.submitOrder();
    if(res){
      this.nav.pop();
    }
    
  }

}
