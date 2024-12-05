import { Component } from '@angular/core';
import { AddOrderService } from './add-order.service';

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrl: './add-orders.component.scss'
})
export class AddOrdersComponent {



  constructor(public orderService: AddOrderService ) {

  }

  ngOnInit(): void {

  }

  async getTotalOfProductCost(){

    let cost = 0;
    // const c = await this.orderService.totalOfProductCost()
    // console.log(c);
    return cost;
  }


  async onSubmit(model) {

  }

}
