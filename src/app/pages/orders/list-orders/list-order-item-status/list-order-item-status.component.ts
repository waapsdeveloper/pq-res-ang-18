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

  async updateStatus(status,item) {
    let obj = {
      status: status
    };
    console.log(obj , item);
    this.item.status = status;
    await this.network.orderStatus(item.id, obj);

    this.utility.presentSuccessToast(`Order Status Updated to ${obj.status}`);
  }
  openStatusDropdown(item: any) {
    const options = this.statuses.map(status => ({ value: status, label: this.titleCase(status) }));

    this.utility.showCustomDropdown(
      'Update Order Status',
      'status-dropdown',
      options,
      item.status,
      'Update Status',
      (newStatus: string) => {
        this.updateStatus(newStatus, item);
      }
    );
  }
  titleCase(str: string): string {
    return str.toLowerCase().split(' ').map(function (word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }
}
