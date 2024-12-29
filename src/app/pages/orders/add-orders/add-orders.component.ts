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
  selectedStatus: string = 'pending'; // Default status

  onStatusChange(event: any): void {
    console.log('Selected Status:', this.selectedStatus);
    // Perform additional logic like sending status to the backend
  }

  searchProducts($event){

    let v = $event.target.value;
    this.orderService.searchProducts(v);

  }
}
