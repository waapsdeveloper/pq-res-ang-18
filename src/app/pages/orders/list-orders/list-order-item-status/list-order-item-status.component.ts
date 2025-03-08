import { Component, Input } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-list-order-item-status',
  templateUrl: './list-order-item-status.component.html',
  styleUrl: './list-order-item-status.component.scss'
})
export class ListOrderItemStatusComponent {
  @Input() item:any;
  statuses = ['pending', 'confirmed', 'preparing', 'ready_for_pickup', 'out_for_delivery', 'delivered', 'completed', 'cancelled'];
  selectedStatus = '';
  
  constructor(private network: NetworkService, private utility: UtilityService) {}
 
  async updateStatus(item) {
    let obj = {
      status: this.selectedStatus
    };
    console.log(obj);

    await this.network.orderStatus(item.id, obj);

    this.utility.presentSuccessToast(`Order Status Updated to ${obj.status}`);
  }
}
